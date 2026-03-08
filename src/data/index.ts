/**
 * 数据适配层
 * 将原始数据文件 (brands.ts, products.ts) 转换为 UI 组件期望的格式
 */
import rawBrands from "./brands";
import rawProducts from "./products";
import type { Brand as RawBrand, Product as RawProduct } from "./types";

// ============================================================
// 拼音映射表 — 覆盖所有品牌名到 URL-safe 拼音
// ============================================================
const pinyinMap: Record<string, string> = {
  黄鹤楼: "huanghelou",
  娇子: "jiaozi",
  黄金叶: "huangjinye",
  黄山: "huangshan",
  钻石: "zuanshi",
  云烟: "yunyan",
  泰山: "taishan",
  长城雪茄: "changchengxuejia",
  红金龙: "hongjinlong",
  七匹狼: "qipilang",
  金圣: "jinsheng",
  双喜: "shuangxi",
  真龙: "zhenlong",
  玉溪: "yuxi",
  贵烟: "guiyan",
  长白山: "changbaishan",
  白沙: "baisha",
  利群: "liqun",
  王冠: "wangguan",
  南京: "nanjing",
  芙蓉王: "furongwang",
  红塔山: "hongtashan",
  中南海: "zhongnanhai",
  兰州: "lanzhou",
  好猫: "haomao",
  天子: "tianzi",
  将军: "jiangjun",
  泰山雪茄: "taishanxuejia",
  黄鹤楼雪茄: "huanghelouxuejia",
  人民大会堂: "renmindahuitang",
  苏烟: "suyan",
  龙凤呈祥: "longfengchengxiang",
  "双喜·好日子": "shuangxihaoriz",
  红河: "honghe",
  延安: "yanan",
  都宝: "dubao",
  黄果树: "huangguoshu",
  冬虫夏草: "dongchongxiacao",
  牡丹: "mudan",
  狮牌雪茄: "shipaixuejia",
  红旗渠: "hongqiqu",
  中华: "zhonghua",
  "红双喜（上海）": "hongshuangxi",
  哈尔滨: "haerbin",
  大红鹰: "dahongying",
  庐山: "lushan",
  恒大: "hengda",
  茂大雪茄: "maodaxuejia",
  大青山: "daqingshan",
  红三环: "hongsanhuan",
  一品梅: "yipinmei",
  猴王: "houwang",
  北戴河: "beidaihe",
  呼伦贝尔: "hulunbeier",
  宏声: "hongsheng",
  林海灵芝: "linhailingzhi",
  石狮: "shishi",
  红梅: "hongmei",
  金桥: "jinqiao",
  雪莲: "xuelian",
  哈德门: "hademen",
  天下秀: "tianxiaxiu",
  熊猫: "xiongmao",
  甲天下: "jiatianxia",
  紫气东来: "ziqidonglai",
  三沙: "sansha",
  华西村: "huaxicun",
  新石家庄: "xinshijiazhuang",
  钓鱼台: "diaoyutai",
  雄狮: "xiongshi",
  顺百利雪茄: "shunbailixuejia",
  龙烟: "longyan",
  五牛: "wuniu",
  芙蓉: "furong",
  三峡雪茄: "sanxiaxuejia",
  古田: "gutian",
  土楼: "tulou",
  红山茶: "hongshancha",
  红玫: "hongmei2",
  羊城: "yangcheng",
  遵义: "zunyi",
  宝岛: "baodao",
  椰树: "yeshu",
  黄山松: "huangshangsong",
  大前门: "daqianmen",
  工字牌: "gongzipai",
  江山: "jiangshan",
  盛唐: "shengtang",
  黄金龙: "huangjinlong",
  凤凰: "fenghuang",
  飞马: "feima",
  长征: "changzheng",
  永光: "yongguang",
  秦淮: "qinhuai",
  金许昌: "jinxuchang",
  古楼: "gulou",
  渡江: "dujiang",
  桂花: "guihua",
  铁盒: "tiehe",
};

/**
 * 为品牌名生成拼音（URL 安全的标识符）
 * 如果映射表中没有，则使用 brand id 作为后备
 */
function toPinyin(name: string, id: number): string {
  return pinyinMap[name] || `brand-${id}`;
}

// ============================================================
// 地区标签
// ============================================================
export const regionLabels: Record<string, { zh: string; en: string }> = {
  mainland: { zh: "大陆", en: "Mainland" },
  hkmo: { zh: "港澳", en: "HK & Macau" },
  international: { zh: "国际", en: "International" },
  historical: { zh: "历史", en: "Historical" },
};

// ============================================================
// 转换后的品牌类型
// ============================================================
export interface BrandItem {
  id: number;
  name: string;
  pinyin: string;
  logo: string;
  count: number;
  region: string;
  url?: string;
  descriptionEn?: string;
  descriptionCn?: string;
  company?: string;
}

// ============================================================
// 转换品牌数据
// ============================================================
export const brands: BrandItem[] = (rawBrands as RawBrand[]).map((b) => ({
  id: b.id,
  name: b.name,
  pinyin: toPinyin(b.name, b.id),
  logo: b.logo || "",
  count: b.product_count || 0,
  region: "mainland", // 所有品牌归为大陆地区
  url: b.url,
  descriptionEn: b.description_en,
  descriptionCn: b.description_cn,
  company: b.company,
}));

export const totalBrands = brands.length;

// ============================================================
// 转换后的产品类型（UI 使用）
// ============================================================
export interface Product {
  id: number;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
  brandPinyin: string;
  region?: string;
  // 规格
  tobaccoType?: string;
  tar?: string;
  nicotine?: string;
  co?: string;
  length?: string;
  format?: string;
  countPerBox?: number;
  boxesPerCarton?: number;
  // 价格
  price?: number;
  packPrice?: number;
  cartonPrice?: number;
  wholesalePrice?: number;
  // 条码
  boxBarcode?: string;
  cartonBarcode?: string;
  // 评分
  votes?: number;
  taste?: number;
  packRating?: number;
  valueRating?: number;
  overallRating?: number;
  // 描述
  description?: string;
  descriptionZh?: string;
  // 制造商
  manufacturer?: string;
  // 图片列表
  images?: Array<{ type: string; url: string }>;
}

/**
 * 从价格字符串（如 "¥85"）中解析数字
 */
function parsePrice(priceStr?: string): number | undefined {
  if (!priceStr) return undefined;
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? undefined : num;
}

/**
 * 获取品牌的拼音
 */
function getBrandPinyin(brandName?: string, brandId?: number): string {
  if (!brandName) return "unknown";
  return pinyinMap[brandName] || `brand-${brandId || 0}`;
}

// ============================================================
// 转换产品数据
// ============================================================
export const products: Product[] = (rawProducts as RawProduct[]).map((p) => {
  const specs = p.specifications;
  const brandPinyin = getBrandPinyin(p.brand || p.brand_name, p.brand_id);
  const brandInfo = brands.find((b) => b.id === p.brand_id);

  // 解析区域 (例如 "大陆·Mainland China" -> "mainland")
  let region = "mainland";
  if (p.region) {
    if (p.region.includes("港澳")) region = "hkmo";
    else if (p.region.includes("国际")) region = "international";
    else if (p.region.includes("历史")) region = "historical";
  }

  return {
    id: p.sku_id,
    brand: p.brand || p.brand_name || "",
    name: p.name.replace(/^[^（]*（/, "").replace(/）$/, "") || p.name,
    nameEn: p.name_en,
    image: p.image || (p.images && p.images.length > 0 ? p.images[0].url : ""),
    brandPinyin,
    region,
    manufacturer: brandInfo?.company,
    // 规格
    tobaccoType: specs?.["Tobacco Type"] || specs?.["烤烟型"], // 兼容不同字段名
    tar: specs?.Tar ? `${specs.Tar} mg` : undefined,
    nicotine: specs?.Nicotine ? `${specs.Nicotine} mg` : undefined,
    co: specs?.CO ? `${specs.CO} mg` : undefined,
    length: specs?.Length ? `${specs.Length} mm` : undefined,
    format: specs?.Format?.replace(/Count$/, ""),
    countPerBox: specs?.["Count/Box"]
      ? parseInt(specs["Count/Box"])
      : undefined,
    boxesPerCarton: specs?.["Boxes/Carton"]
      ? parseInt(specs["Boxes/Carton"])
      : undefined,
    // 价格
    price: p.price,
    packPrice: parsePrice(p.pricing?.pack) ?? p.price,
    cartonPrice: parsePrice(p.pricing?.carton),
    wholesalePrice: parsePrice(p.pricing?.wholesale),
    // 条码
    boxBarcode: p.barcodes?.box_barcode,
    cartonBarcode: p.barcodes?.carton_barcode,
    // 评分
    votes: p.ratings?.votes,
    taste: p.ratings?.taste,
    packRating: p.ratings?.pack,
    valueRating: p.ratings?.value,
    overallRating: p.ratings?.overall,
    // 描述
    description: p.description_en,
    descriptionZh: p.description_cn,
    // 图片列表
    images: p.images,
  };
});

export const totalProducts = products.length;

// ============================================================
// 查询函数
// ============================================================

/** 通过拼音获取品牌 */
export function getBrandByPinyin(pinyin: string): BrandItem | undefined {
  return brands.find((b) => b.pinyin === pinyin);
}

/** 通过品牌拼音获取关联产品 */
export function getProductsByBrand(pinyin: string): Product[] {
  const brand = getBrandByPinyin(pinyin);
  if (!brand) return [];
  return products.filter(
    (p) => p.brandPinyin === pinyin || p.brand === brand.name,
  );
}

/** 通过 ID (sku_id) 获取产品 */
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// ============================================================
// 社区模拟数据
// ============================================================
export interface CommunityUser {
  id: number;
  username: string;
  avatar?: string;
  brands: number;
  tried: number;
  fav: number;
}

export const communityUsers: CommunityUser[] = [
  { id: 1, username: "smoke_connoisseur", brands: 42, tried: 186, fav: 35 },
  { id: 2, username: "tobacco_scholar", brands: 38, tried: 152, fav: 28 },
  { id: 3, username: "yunnan_lover", brands: 35, tried: 140, fav: 42 },
  { id: 4, username: "dragon_puff", brands: 30, tried: 128, fav: 22 },
  { id: 5, username: "golden_leaf", brands: 28, tried: 115, fav: 31 },
  { id: 6, username: "jade_smoke", brands: 25, tried: 98, fav: 18 },
  { id: 7, username: "silk_road_cigs", brands: 22, tried: 87, fav: 25 },
  { id: 8, username: "panda_smoker", brands: 20, tried: 76, fav: 15 },
  { id: 9, username: "huangshan_fan", brands: 18, tried: 65, fav: 20 },
  { id: 10, username: "nanjing_collector", brands: 15, tried: 54, fav: 12 },
  { id: 11, username: "cigar_master88", brands: 12, tried: 45, fav: 8 },
  { id: 12, username: "zhonghua_daily", brands: 10, tried: 38, fav: 16 },
];
