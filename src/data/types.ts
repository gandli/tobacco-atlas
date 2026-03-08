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
