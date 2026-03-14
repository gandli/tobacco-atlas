import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({
  count = 16,
}: ProductGridSkeletonProps) {
  return (
    <section
      id="collection"
      className="mx-auto max-w-[1600px] px-4 pb-20 pt-8 md:px-8 md:pt-12"
      data-testid="product-grid-skeleton"
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
