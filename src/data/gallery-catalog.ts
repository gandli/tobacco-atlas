import rawGalleryProducts from "./gallery-products.json";

export interface GalleryProductSummary {
  id: number;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
}

export const galleryProducts = rawGalleryProducts as GalleryProductSummary[];
