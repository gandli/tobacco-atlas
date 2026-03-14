import { products } from "@/data";
import ProductCard from "./ProductCard";
import type { Product } from "@/data";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products?: Product[];
  sectionId?: string;
  className?: string;
}

const ProductGrid = ({
  products: items = products,
  sectionId = "collection",
  className,
}: ProductGridProps) => {
  return (
    <section
      id={sectionId}
      className={cn("px-4 md:px-8 pb-20 pt-8 md:pt-12 max-w-[1600px] mx-auto", className)}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
        {items.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
