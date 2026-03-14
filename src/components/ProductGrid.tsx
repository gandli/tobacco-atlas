import ProductCard from "./ProductCard";
import type { HomeProductSummary } from "@/data/home-catalog";
import { cn } from "@/lib/utils";

export const productGridSectionClassName =
  "px-4 md:px-8 pb-20 pt-8 md:pt-12 max-w-[1600px] mx-auto";
export const productGridLayoutClassName =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 md:gap-5";

interface ProductGridProps {
  products: HomeProductSummary[];
  sectionId?: string;
  className?: string;
}

const ProductGrid = ({
  products,
  sectionId = "collection",
  className,
}: ProductGridProps) => {
  return (
    <section
      id={sectionId}
      className={cn(productGridSectionClassName, className)}
    >
      <div data-testid="product-grid" className={productGridLayoutClassName}>
        {products.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
