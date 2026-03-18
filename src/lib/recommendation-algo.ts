/**
 * 推荐算法模块
 * 实现多种推荐策略：基于规则、热门产品、相似产品、新品推荐
 */

import type { Product } from "@/data/product-catalog";
import type { UserPreferences, UserBehavior, Recommendation } from "@/data/types";
import { getUserPreferences, getUserBehavior, getRecentBrowsing } from "./user-preferences";
import { parsePriceToNumber, getTasteFromTar } from "./user-preferences";

/**
 * 获取所有产品（从 product-catalog 导出）
 */
function getAllProducts(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }
  
  try {
    // 动态导入以避免循环依赖
    const { products } = require("@/data/product-catalog") as { products: Product[] };
    return products || [];
  } catch (error) {
    console.error("Failed to load products for recommendation:", error);
    return [];
  }
}

/**
 * 基于规则的推荐 - 匹配用户偏好
 */
function getPreferenceBasedRecommendations(
  preferences: UserPreferences,
  limit: number = 10
): Recommendation[] {
  const products = getAllProducts();
  const recommendations: Recommendation[] = [];

  for (const product of products) {
    let score = 0;
    const reasons: string[] = [];

    // 口味匹配（焦油量）
    if (product.tar) {
      const tarNum = parseFloat(product.tar.replace(/[^0-9.]/g, ""));
      if (!Number.isNaN(tarNum)) {
        const productTaste = getTasteFromTar(tarNum);
        if (productTaste === preferences.taste) {
          score += 3;
          reasons.push(`符合您的${preferences.taste === "strong" ? "浓烈" : preferences.taste === "mild" ? "清淡" : "中等"}口味偏好`);
        }
      }
    }

    // 价格区间匹配
    const price = parsePriceToNumber(product.packPrice);
    if (price >= preferences.priceRange.min && price <= preferences.priceRange.max) {
      score += 2;
      reasons.push("在您偏好的价格区间内");
    }

    // 品牌偏好匹配
    if (preferences.favoriteBrands.includes(product.brand || "")) {
      score += 5;
      reasons.push(`您喜欢的品牌：${product.brand}`);
    }

    // 产品类型匹配
    if (preferences.productType !== "any") {
      // 简单判断：如果产品描述或名称包含相关关键词
      const desc = (product.description || "").toLowerCase();
      const name = (product.name || "").toLowerCase();
      
      if (preferences.productType === "cigar" && (desc.includes("雪茄") || name.includes("雪茄"))) {
        score += 3;
        reasons.push("符合您偏好的雪茄类型");
      } else if (preferences.productType === "vape" && (desc.includes("电子烟") || name.includes("电子烟"))) {
        score += 3;
        reasons.push("符合您偏好的电子烟类型");
      } else if (preferences.productType === "cigarette") {
        score += 1; // 默认香烟
      }
    }

    if (score > 0) {
      recommendations.push({
        productId: product.sku_id,
        score,
        reasons: reasons.slice(0, 3), // 最多显示 3 个原因
        type: "preference",
      });
    }
  }

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * 热门产品推荐 - 基于浏览和收藏计数
 */
function getPopularRecommendations(limit: number = 10): Recommendation[] {
  const products = getAllProducts();
  const behavior = getUserBehavior();
  
  // 计算每个产品的热度分数
  const productScores = new Map<number, { score: number; views: number; favorites: number }>();

  // 统计浏览次数
  for (const item of behavior.browsingHistory) {
    const current = productScores.get(item.productId) || { score: 0, views: 0, favorites: 0 };
    current.views += 1;
    current.score += 1; // 每次浏览 +1 分
    productScores.set(item.productId, current);
  }

  // 统计收藏次数（权重更高）
  for (const productId of behavior.favorites) {
    const current = productScores.get(productId) || { score: 0, views: 0, favorites: 0 };
    current.favorites += 1;
    current.score += 3; // 每次收藏 +3 分
    productScores.set(productId, current);
  }

  // 转换为推荐结果
  const recommendations: Recommendation[] = [];
  
  for (const [productId, data] of productScores.entries()) {
    const reasons: string[] = [];
    
    if (data.views >= 5) {
      reasons.push("热门浏览产品");
    }
    if (data.favorites >= 2) {
      reasons.push("多人收藏");
    }
    if (reasons.length === 0) {
      reasons.push("受欢迎");
    }

    recommendations.push({
      productId,
      score: data.score,
      reasons,
      type: "popular",
    });
  }

  // 如果没有行为数据，返回随机产品
  if (recommendations.length === 0) {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit).map((product) => ({
      productId: product.sku_id,
      score: 1,
      reasons: ["热门推荐"],
      type: "popular" as const,
    }));
  }

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * 相似产品推荐 - 同品牌、同类型、同价位
 */
function getSimilarRecommendations(productId: number, limit: number = 8): Recommendation[] {
  const products = getAllProducts();
  const targetProduct = products.find((p) => p.sku_id === productId);
  
  if (!targetProduct) {
    return [];
  }

  const recommendations: Recommendation[] = [];

  for (const product of products) {
    if (product.sku_id === productId) continue;

    let score = 0;
    const reasons: string[] = [];

    // 同品牌（最高权重）
    if (product.brand === targetProduct.brand) {
      score += 5;
      reasons.push(`同品牌：${product.brand}`);
    }

    // 同价位（±20%）
    const targetPrice = parsePriceToNumber(targetProduct.packPrice);
    const productPrice = parsePriceToNumber(product.packPrice);
    
    if (targetPrice > 0 && productPrice > 0) {
      const priceDiff = Math.abs(targetPrice - productPrice) / targetPrice;
      if (priceDiff <= 0.2) {
        score += 3;
        reasons.push("相似价位");
      }
    }

    // 相似焦油量（±3mg）
    if (targetProduct.tar && product.tar) {
      const targetTar = parseFloat(targetProduct.tar.replace(/[^0-9.]/g, ""));
      const productTar = parseFloat(product.tar.replace(/[^0-9.]/g, ""));
      
      if (!Number.isNaN(targetTar) && !Number.isNaN(productTar)) {
        if (Math.abs(targetTar - productTar) <= 3) {
          score += 2;
          reasons.push("相似口感");
        }
      }
    }

    // 同地区
    if (product.region && targetProduct.region && product.region === targetProduct.region) {
      score += 1;
      reasons.push("相同产地");
    }

    if (score > 0) {
      recommendations.push({
        productId: product.sku_id,
        score,
        reasons: reasons.slice(0, 3),
        type: "similar",
      });
    }
  }

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * 新品推荐 - 最近添加的产品
 */
function getNewRecommendations(limit: number = 10): Recommendation[] {
  const products = getAllProducts();
  
  // 按 SKU ID 倒序（假设 ID 越大越新）
  const sortedProducts = [...products].sort((a, b) => b.sku_id - a.sku_id);
  
  return sortedProducts.slice(0, limit).map((product) => ({
    productId: product.sku_id,
    score: product.sku_id, // 使用 ID 作为分数，ID 越大越新
    reasons: ["新品上架"],
    type: "new",
  }));
}

/**
 * 基于行为的推荐 - 根据浏览历史
 */
function getBehaviorBasedRecommendations(limit: number = 10): Recommendation[] {
  const recentBrowsing = getRecentBrowsing(20);
  
  if (recentBrowsing.length === 0) {
    return [];
  }

  // 为最近浏览的每个产品找相似产品
  const allSimilar: Recommendation[] = [];
  
  for (const productId of recentBrowsing.slice(0, 5)) { // 只考虑最近 5 个
    const similar = getSimilarRecommendations(productId, 3);
    allSimilar.push(...similar);
  }

  // 去重并合并分数
  const scoreMap = new Map<number, { score: number; reasons: string[] }>();
  
  for (const rec of allSimilar) {
    const current = scoreMap.get(rec.productId) || { score: 0, reasons: [] };
    current.score += rec.score;
    current.reasons.push(...rec.reasons);
    scoreMap.set(rec.productId, current);
  }

  const recommendations: Recommendation[] = [];
  
  for (const [productId, data] of scoreMap.entries()) {
    // 排除已经浏览过的产品
    if (recentBrowsing.includes(productId)) continue;

    recommendations.push({
      productId,
      score: data.score,
      reasons: [...new Set(data.reasons)].slice(0, 3),
      type: "behavior",
    });
  }

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * 综合推荐 - 混合多种策略
 */
export function getRecommendations(
  options: {
    limit?: number;
    productId?: number; // 如果是相似推荐，提供产品 ID
    strategy?: "preference" | "popular" | "similar" | "new" | "behavior" | "mixed";
  } = {}
): Recommendation[] {
  const {
    limit = 10,
    productId,
    strategy = "mixed",
  } = options;

  // 单一策略
  if (strategy !== "mixed") {
    const preferences = getUserPreferences();
    switch (strategy) {
      case "preference":
        return getPreferenceBasedRecommendations(preferences, limit);
      case "popular":
        return getPopularRecommendations(limit);
      case "similar":
        if (productId) {
          return getSimilarRecommendations(productId, limit);
        }
        return [];
      case "new":
        return getNewRecommendations(limit);
      case "behavior":
        return getBehaviorBasedRecommendations(limit);
    }
  }

  // 混合策略
  const preferences = getUserPreferences();
  const hasPreferences = !!preferences.completedAt;
  
  const recommendations: Recommendation[] = [];

  // 1. 基于偏好的推荐（如果有设置偏好）
  if (hasPreferences) {
    const prefRecs = getPreferenceBasedRecommendations(preferences, Math.ceil(limit * 0.4));
    recommendations.push(...prefRecs);
  }

  // 2. 热门产品推荐
  const popularRecs = getPopularRecommendations(Math.ceil(limit * 0.25));
  recommendations.push(...popularRecs);

  // 3. 基于行为的推荐
  const behaviorRecs = getBehaviorBasedRecommendations(Math.ceil(limit * 0.25));
  recommendations.push(...behaviorRecs);

  // 4. 新品推荐
  const newRecs = getNewRecommendations(Math.ceil(limit * 0.1));
  recommendations.push(...newRecs);

  // 去重（按 productId）
  const seen = new Set<number>();
  const unique: Recommendation[] = [];
  
  for (const rec of recommendations) {
    if (!seen.has(rec.productId)) {
      seen.add(rec.productId);
      unique.push(rec);
    }
  }

  // 如果特定产品 ID 被提供，排除它
  const filtered = productId
    ? unique.filter((rec) => rec.productId !== productId)
    : unique;

  return filtered.slice(0, limit);
}

/**
 * 获取推荐产品的详细信息
 */
export function getRecommendedProducts(
  recommendations: Recommendation[]
): (Product & Recommendation)[] {
  const products = getAllProducts();
  const productMap = new Map(products.map((p) => [p.sku_id, p]));

  return recommendations
    .map((rec) => {
      const product = productMap.get(rec.productId);
      if (!product) return null;
      return { ...product, ...rec };
    })
    .filter((item): item is Product & Recommendation => item !== null);
}

/**
 * 检查用户是否需要完成偏好设置
 */
export function needsPreferenceSetup(): boolean {
  const preferences = getUserPreferences();
  return !preferences.completedAt;
}
