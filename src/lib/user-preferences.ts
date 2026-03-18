/**
 * 用户偏好管理模块
 * 使用 localStorage 存储用户偏好和行为数据，保护用户隐私
 */

import type {
  UserPreferences,
  UserBehavior,
  BrowsingHistoryItem,
  TastePreference,
  ProductTypePreference,
} from "@/data/types";

const PREFERENCES_KEY = "tobacco-atlas-user-preferences";
const BEHAVIOR_KEY = "tobacco-atlas-user-behavior";
const PREFERENCES_VERSION = 1;

/**
 * 默认用户偏好
 */
const DEFAULT_PREFERENCES: UserPreferences = {
  taste: "medium",
  priceRange: { min: 0, max: 1000 },
  productType: "any",
  favoriteBrands: [],
  tarPreference: { min: 0, max: 30 },
  version: PREFERENCES_VERSION,
};

/**
 * 默认用户行为数据
 */
const DEFAULT_BEHAVIOR: UserBehavior = {
  browsingHistory: [],
  favorites: [],
  compared: [],
  searchHistory: [],
};

/**
 * 获取用户偏好
 */
export function getUserPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserPreferences;
      // 版本检查，如果需要迁移可以在这里处理
      return { ...DEFAULT_PREFERENCES, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load user preferences:", error);
  }

  return DEFAULT_PREFERENCES;
}

/**
 * 保存用户偏好
 */
export function saveUserPreferences(preferences: Partial<UserPreferences>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getUserPreferences();
    const updated: UserPreferences = {
      ...current,
      ...preferences,
      version: PREFERENCES_VERSION,
      completedAt: preferences.taste || preferences.priceRange || preferences.productType
        ? new Date().toISOString()
        : current.completedAt,
    };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save user preferences:", error);
  }
}

/**
 * 重置用户偏好
 */
export function resetUserPreferences(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (error) {
    console.error("Failed to reset user preferences:", error);
  }
}

/**
 * 获取用户行为数据
 */
export function getUserBehavior(): UserBehavior {
  if (typeof window === "undefined") {
    return DEFAULT_BEHAVIOR;
  }

  try {
    const stored = localStorage.getItem(BEHAVIOR_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserBehavior;
      return { ...DEFAULT_BEHAVIOR, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load user behavior:", error);
  }

  return DEFAULT_BEHAVIOR;
}

/**
 * 保存用户行为数据
 */
function saveUserBehavior(behavior: Partial<UserBehavior>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getUserBehavior();
    const updated: UserBehavior = { ...current, ...behavior };
    localStorage.setItem(BEHAVIOR_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save user behavior:", error);
  }
}

/**
 * 添加浏览历史记录
 * 限制历史记录数量为 100 条
 */
export function addBrowsingHistory(productId: number, referrer?: string): void {
  const behavior = getUserBehavior();
  const newItem: BrowsingHistoryItem = {
    productId,
    timestamp: Date.now(),
    referrer,
  };

  // 移除重复的产品记录
  const filtered = behavior.browsingHistory.filter((item) => item.productId !== productId);
  
  // 添加到开头并限制数量
  const updated = [newItem, ...filtered].slice(0, 100);
  
  saveUserBehavior({ browsingHistory: updated });
}

/**
 * 添加收藏
 */
export function addFavorite(productId: number): void {
  const behavior = getUserBehavior();
  if (!behavior.favorites.includes(productId)) {
    saveUserBehavior({ favorites: [...behavior.favorites, productId] });
  }
}

/**
 * 移除收藏
 */
export function removeFavorite(productId: number): void {
  const behavior = getUserBehavior();
  saveUserBehavior({ favorites: behavior.favorites.filter((id) => id !== productId) });
}

/**
 * 检查是否已收藏
 */
export function isFavorite(productId: number): boolean {
  const behavior = getUserBehavior();
  return behavior.favorites.includes(productId);
}

/**
 * 添加对比产品
 */
export function addCompared(productId: number): void {
  const behavior = getUserBehavior();
  if (!behavior.compared.includes(productId)) {
    saveUserBehavior({ compared: [...behavior.compared, productId] });
  }
}

/**
 * 添加搜索历史
 * 限制历史记录数量为 50 条
 */
export function addSearchHistory(query: string): void {
  const behavior = getUserBehavior();
  const filtered = behavior.searchHistory.filter((q) => q !== query);
  saveUserBehavior({ searchHistory: [query, ...filtered].slice(0, 50) });
}

/**
 * 清除浏览历史
 */
export function clearBrowsingHistory(): void {
  saveUserBehavior({ browsingHistory: [] });
}

/**
 * 清除搜索历史
 */
export function clearSearchHistory(): void {
  saveUserBehavior({ searchHistory: [] });
}

/**
 * 获取最近浏览的产品 ID 列表
 */
export function getRecentBrowsing(limit: number = 20): number[] {
  const behavior = getUserBehavior();
  return behavior.browsingHistory.slice(0, limit).map((item) => item.productId);
}

/**
 * 检查用户是否完成偏好设置
 */
export function hasCompletedPreferences(): boolean {
  const preferences = getUserPreferences();
  return !!preferences.completedAt;
}

/**
 * 导出用户数据（用于隐私合规）
 */
export function exportUserData(): {
  preferences: UserPreferences;
  behavior: UserBehavior;
  exportedAt: string;
} {
  return {
    preferences: getUserPreferences(),
    behavior: getUserBehavior(),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * 清除所有用户数据
 */
export function clearAllUserData(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PREFERENCES_KEY);
    localStorage.removeItem(BEHAVIOR_KEY);
  } catch (error) {
    console.error("Failed to clear user data:", error);
  }
}

/**
 * 根据焦油量判断口味偏好
 */
export function getTasteFromTar(tarMg?: number): TastePreference {
  if (tarMg === undefined) return "medium";
  
  if (tarMg >= 10) return "strong";
  if (tarMg <= 6) return "mild";
  return "medium";
}

/**
 * 解析价格字符串为数字
 */
export function parsePriceToNumber(price?: string | number): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isNaN(num) ? 0 : num;
}
