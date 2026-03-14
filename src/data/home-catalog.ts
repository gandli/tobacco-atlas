import rawHomeProducts from "./home-products.json";

export interface HomeProductSummary {
  id: number;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
  brandPinyin: string;
  region?: string;
  price?: number;
  packPrice?: number;
}

export const homeProductStats = {
  totalBrands: 218,
  totalProducts: 3220,
} as const;

export const homeProducts = rawHomeProducts as HomeProductSummary[];
