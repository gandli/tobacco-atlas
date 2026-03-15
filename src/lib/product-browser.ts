import { getLocalizedText } from "@/lib/i18n-utils";

export type ProductBrowseRegion = "all" | "mainland" | "hkmo" | "international";
export type ProductBrowseSort = "newest" | "price-asc" | "price-desc" | "name";
export type ProductBrowseFormat =
  | "all"
  | "regular"
  | "hard"
  | "soft"
  | "middle"
  | "slim"
  | "short"
  | "capsule"
  | "cigar";

export interface ProductBrowseItem {
  id: number;
  brand: string;
  name: string;
  nameEn?: string;
  region?: string;
  format?: string;
  tobaccoType?: string;
  price?: number;
  packPrice?: number;
}

export interface ProductBrowseState {
  search: string;
  region: ProductBrowseRegion;
  format: ProductBrowseFormat;
  sort: ProductBrowseSort;
  language: string;
}

const FORMAT_RULES: Array<{ key: Exclude<ProductBrowseFormat, "all" | "regular">; patterns: RegExp[] }> = [
  { key: "cigar", patterns: [/cigar/i, /雪茄/] },
  { key: "capsule", patterns: [/capsule/i, /爆珠/] },
  { key: "middle", patterns: [/middle/i, /中支/] },
  { key: "slim", patterns: [/slim/i, /silm/i, /细支/] },
  { key: "short", patterns: [/short/i, /短支/] },
  { key: "soft", patterns: [/\bsoft\b/i, /软/] },
  { key: "hard", patterns: [/\bhard\b/i, /硬/] },
];

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function getComparableName(product: ProductBrowseItem, language: string) {
  return getLocalizedText({
    language,
    zh: product.name,
    en: product.nameEn,
  });
}

function getProductSearchText(product: ProductBrowseItem) {
  return [product.brand, product.name, product.nameEn].filter(Boolean).join(" ").toLowerCase();
}

function getComparablePrice(product: ProductBrowseItem) {
  return product.packPrice ?? product.price ?? Number.POSITIVE_INFINITY;
}

export function getProductBrowseFormatKey(product: ProductBrowseItem): ProductBrowseFormat {
  const source = [product.format, product.tobaccoType, product.name, product.nameEn]
    .filter(Boolean)
    .join(" ");

  for (const rule of FORMAT_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(source))) {
      return rule.key;
    }
  }

  return "regular";
}

export function getAvailableFormatKeys(products: ProductBrowseItem[]): ProductBrowseFormat[] {
  return Array.from(
    new Set(products.map((product) => getProductBrowseFormatKey(product))),
  ).sort();
}

export function getVisibleProductCollection<T extends ProductBrowseItem>(
  products: T[],
  state: ProductBrowseState,
): T[] {
  const query = normalizeSearchValue(state.search);

  return [...products]
    .filter((product) => {
      if (query && !getProductSearchText(product).includes(query)) {
        return false;
      }

      if (state.region !== "all" && product.region !== state.region) {
        return false;
      }

      if (state.format !== "all" && getProductBrowseFormatKey(product) !== state.format) {
        return false;
      }

      return true;
    })
    .sort((left, right) => {
      switch (state.sort) {
        case "price-asc":
          return getComparablePrice(left) - getComparablePrice(right);
        case "price-desc":
          return getComparablePrice(right) - getComparablePrice(left);
        case "name":
          return getComparableName(left, state.language).localeCompare(
            getComparableName(right, state.language),
            state.language === "en-US" ? "en" : "zh",
          );
        case "newest":
        default:
          return right.id - left.id;
      }
    });
}
