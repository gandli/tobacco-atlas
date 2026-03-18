// 定义 ciggies-clone 项目的接口类型

export interface ProductImage {
  /**
   * 图片类型 (如: gallery_1, gallery_2 等)
   */
  type: string;
  /**
   * 图片 URL 地址
   */
  url: string;
}

export interface ProductSpecifications {
  /**
   * 焦油量
   */
  Tar?: string;
  /**
   * 尼古丁含量
   */
  Nicotine?: string;
  /**
   * 一氧化碳含量
   */
  CO?: string;
  /**
   * 香烟长度 (毫米)
   */
  Length?: string;
  /**
   * 格式 (如: 细支Count, 中支Count 等)
   */
  Format?: string;
  /**
   * 每盒数量
   */
  "Count/Box"?: string;
  /**
   * 每件数量
   */
  "Boxes/Carton"?: string;
  /**
   * 其他规格参数
   */
  [key: string]: string | undefined;
}

export interface ProductPricing {
  /**
   * 单包价格
   */
  pack?: string;
  /**
   * 整件价格
   */
  carton?: string;
  /**
   * 批发价格
   */
  wholesale?: string;
}

export interface ProductBarcodes {
  /**
   * 盒条码
   */
  box_barcode?: string;
  /**
   * 件条码
   */
  carton_barcode?: string;
}

export interface ProductRatings {
  /**
   * 投票数
   */
  votes?: number;
  /**
   * 口味评分
   */
  taste?: number;
  /**
   * 包装评分
   */
  pack?: number;
  /**
   * 性价比评分
   */
  value?: number;
  /**
   * 综合评分
   */
  overall?: number;
}

export interface Product {
  /**
   * SKU ID
   */
  sku_id: number;
  /**
   * 产品页面 URL
   */
  url?: string;
  /**
   * 抓取时间
   */
  crawled_at?: string;
  /**
   * 产品名称 (中文)
   */
  name: string;
  /**
   * 产品名称 (英文)
   */
  name_en?: string;
  /**
   * 品牌名称
   */
  brand?: string;
  /**
   * 主图 URL
   */
  image?: string;
  /**
   * 价格
   */
  price?: number;
  /**
   * 货币单位
   */
  currency?: string;
  /**
   * 英文描述
   */
  description_en?: string;
  /**
   * 中文描述
   */
  description_cn?: string;
  /**
   * 地区信息
   */
  region?: string;
  /**
   * 产品图片列表
   */
  images?: ProductImage[];
  /**
   * 图片数量
   */
  image_count?: number;
  /**
   * 规格参数
   */
  specifications?: ProductSpecifications;
  /**
   * 价格信息
   */
  pricing?: ProductPricing;
  /**
   * 条码信息
   */
  barcodes?: ProductBarcodes;
  /**
   * 评分信息
   */
  ratings?: ProductRatings;
  /**
   * 品牌 ID
   */
  brand_id?: number;
  /**
   * 品牌名称
   */
  brand_name?: string;
  /**
   * 生产企业
   */
  manufacturer?: string;
}

export interface Brand {
  /**
   * 品牌 ID
   */
  id: number;
  /**
   * 品牌名称
   */
  name: string;
  /**
   * 产品数量
   */
  product_count?: number;
  /**
   * 品牌页面 URL
   */
  url?: string;
  /**
   * 品牌 Logo URL
   */
  logo?: string;
  /**
   * 英文描述
   */
  description_en?: string;
  /**
   * 中文描述
   */
  description_cn?: string;
  /**
   * 公司信息
   */
  company?: string;
}

export interface ProductListItem {
  /**
   * SKU ID
   */
  sku_id: number;
  /**
   * 产品名称
   */
  name: string;
  /**
   * 产品页面 URL
   */
  url: string;
  /**
   * 品牌 ID
   */
  brand_id: number;
  /**
   * 品牌名称
   */
  brand_name: string;
}
export interface Manufacturer {
  /**
   * 制造商名称
   */
  name: string;
  /**
   * 旗下品牌名称列表
   */
  brands: string[];
  /**
   * 关联的产品 SKU ID 列表
   */
  productIds: number[];
}

// ==================== 推荐系统相关类型 ====================

/**
 * 用户口味偏好
 */
export type TastePreference = "strong" | "mild" | "medium";

/**
 * 产品类型偏好
 */
export type ProductTypePreference = "cigarette" | "cigar" | "vape" | "any";

/**
 * 价格区间偏好
 */
export type PriceRangePreference = {
  min: number;
  max: number;
};

/**
 * 用户偏好配置
 */
export interface UserPreferences {
  /**
   * 口味偏好（浓烈/清淡/中等）
   */
  taste: TastePreference;
  /**
   * 价格区间
   */
  priceRange: PriceRangePreference;
  /**
   * 产品类型偏好
   */
  productType: ProductTypePreference;
  /**
   * 偏好的品牌列表
   */
  favoriteBrands: string[];
  /**
   * 焦油量偏好 (mg)
   */
  tarPreference?: {
    min: number;
    max: number;
  };
  /**
   * 偏好设置完成时间
   */
  completedAt?: string;
  /**
   * 偏好设置版本
   */
  version?: number;
}

/**
 * 浏览历史记录项
 */
export interface BrowsingHistoryItem {
  /**
   * 产品 ID
   */
  productId: number;
  /**
   * 浏览时间戳
   */
  timestamp: number;
  /**
   * 来源页面
   */
  referrer?: string;
}

/**
 * 用户行为数据
 */
export interface UserBehavior {
  /**
   * 浏览历史
   */
  browsingHistory: BrowsingHistoryItem[];
  /**
   * 收藏的产品 ID 列表
   */
  favorites: number[];
  /**
   * 对比过的产品 ID 列表
   */
  compared: number[];
  /**
   * 搜索历史记录
   */
  searchHistory: string[];
}

/**
 * 推荐结果项
 */
export interface Recommendation {
  /**
   * 产品 ID
   */
  productId: number;
  /**
   * 推荐分数
   */
  score: number;
  /**
   * 推荐原因
   */
  reasons: string[];
  /**
   * 推荐类型
   */
  type: "preference" | "similar" | "popular" | "new" | "behavior";
}

/**
 * 偏好测试问题
 */
export interface PreferenceQuestion {
  /**
   * 问题 ID
   */
  id: string;
  /**
   * 问题文本 (zh-CN)
   */
  questionZh: string;
  /**
   * 问题文本 (en-US)
   */
  questionEn: string;
  /**
   * 选项列表
   */
  options: {
    /**
     * 选项值
     */
    value: string;
    /**
     * 选项文本 (zh-CN)
     */
    labelZh: string;
    /**
     * 选项文本 (en-US)
     */
    labelEn: string;
    /**
     * 选项描述 (zh-CN)
     */
    descriptionZh?: string;
    /**
     * 选项描述 (en-US)
     */
    descriptionEn?: string;
  }[];
}
