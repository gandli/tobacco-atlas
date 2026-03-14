import rawProducts from "./products";
import type { Product as RawProduct } from "./types";
import { brands, getBrandByPinyin } from "./brand-catalog";
import { getMakerByIdentifier } from "./maker-catalog";

export interface Product {
  id: number;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
  brandPinyin: string;
  region?: string;
  tobaccoType?: string;
  tar?: string;
  nicotine?: string;
  co?: string;
  length?: string;
  format?: string;
  countPerBox?: number;
  boxesPerCarton?: number;
  price?: number;
  packPrice?: number;
  cartonPrice?: number;
  wholesalePrice?: number;
  boxBarcode?: string;
  cartonBarcode?: string;
  votes?: number;
  taste?: number;
  packRating?: number;
  valueRating?: number;
  overallRating?: number;
  description?: string;
  descriptionZh?: string;
  manufacturer?: string;
  images?: Array<{ type: string; url: string }>;
}

function parsePrice(priceStr?: string): number | undefined {
  if (!priceStr) return undefined;
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return Number.isNaN(num) ? undefined : num;
}

function getBrandPinyin(brandName?: string, brandId?: number): string {
  if (!brandName) return "unknown";

  const brand = brands.find(
    (item) => item.name === brandName || item.id === (brandId ?? -1),
  );

  return brand?.pinyin || `brand-${brandId || 0}`;
}

const brandCompanyMap: Record<string, string> = {
  黄鹤楼: "湖北中烟工业有限责任公司",
  中华: "上海烟草集团有限责任公司",
  芙蓉王: "湖南中烟工业有限责任公司",
  利群: "浙江中烟工业有限责任公司",
  玉溪: "云南中烟工业有限责任公司",
  玉金: "云南中烟工业有限责任公司",
  云烟: "云南中烟工业有限责任公司",
  南京: "江苏中烟工业有限责任公司",
  白沙: "湖南中烟工业有限责任公司",
  黄山: "安徽中烟工业有限责任公司",
};

export const products: Product[] = (rawProducts as RawProduct[]).map((product) => {
  const specs = product.specifications;
  const brandPinyin = getBrandPinyin(
    product.brand || product.brand_name,
    product.brand_id,
  );
  const brandInfo = brands.find((brand) => brand.id === product.brand_id);

  let region = "mainland";
  if (product.region) {
    if (product.region.includes("港澳")) region = "hkmo";
    else if (product.region.includes("国际")) region = "international";
    else if (product.region.includes("历史")) region = "historical";
  }

  return {
    id: product.sku_id,
    brand: product.brand || product.brand_name || "",
    name:
      product.name.replace(/^[^（]*（/, "").replace(/）$/, "") || product.name,
    nameEn: product.name_en,
    image:
      product.image || (product.images && product.images.length > 0
        ? product.images[0].url
        : ""),
    brandPinyin,
    region,
    manufacturer:
      product.manufacturer ||
      brandCompanyMap[product.brand || ""] ||
      brandInfo?.company,
    tobaccoType: specs?.["Tobacco Type"] || specs?.["烤烟型"],
    tar: specs?.Tar ? `${specs.Tar} mg` : undefined,
    nicotine: specs?.Nicotine ? `${specs.Nicotine} mg` : undefined,
    co: specs?.CO ? `${specs.CO} mg` : undefined,
    length: specs?.Length ? `${specs.Length} mm` : undefined,
    format: specs?.Format?.replace(/Count$/, ""),
    countPerBox: specs?.["Count/Box"]
      ? parseInt(specs["Count/Box"], 10)
      : undefined,
    boxesPerCarton: specs?.["Boxes/Carton"]
      ? parseInt(specs["Boxes/Carton"], 10)
      : undefined,
    price: product.price,
    packPrice: parsePrice(product.pricing?.pack) ?? product.price,
    cartonPrice: parsePrice(product.pricing?.carton),
    wholesalePrice: parsePrice(product.pricing?.wholesale),
    boxBarcode: product.barcodes?.box_barcode,
    cartonBarcode: product.barcodes?.carton_barcode,
    votes: product.ratings?.votes,
    taste: product.ratings?.taste,
    packRating: product.ratings?.pack,
    valueRating: product.ratings?.value,
    overallRating: product.ratings?.overall,
    description: product.description_en,
    descriptionZh: product.description_cn,
    images: product.images,
  };
});

export const totalProducts = products.length;

export function getProductsByManufacturer(manufacturerName: string): Product[] {
  return products.filter((product) => product.manufacturer === manufacturerName);
}

export function getProductsByMakerIdentifier(identifier: string | number): Product[] {
  const maker = getMakerByIdentifier(identifier);
  if (!maker) {
    return [];
  }

  return getProductsByManufacturer(maker.name);
}

export function getProductsByBrand(pinyin: string): Product[] {
  const brand = getBrandByPinyin(pinyin);
  if (!brand) return [];

  return products.filter(
    (product) =>
      product.brandPinyin === pinyin || product.brand === brand.name,
  );
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}
