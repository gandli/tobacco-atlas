import ProductCardSkeleton from "./ProductCardSkeleton";
import {
  productGridLayoutClassName,
  productGridSectionClassName,
} from "@/components/ProductGrid";

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({
  count = 16,
}: ProductGridSkeletonProps) {
  return (
    <section
      id="collection"
      className={productGridSectionClassName}
      data-testid="product-grid-skeleton"
    >
      <div className={productGridLayoutClassName}>
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
