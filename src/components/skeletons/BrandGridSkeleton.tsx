import { Skeleton } from "@/components/ui/skeleton";

interface BrandGridSkeletonProps {
  count?: number;
}

export default function BrandGridSkeleton({
  count = 18,
}: BrandGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2 md:gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
      data-testid="brand-grid-skeleton"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-xl border border-border p-3 md:p-4"
        >
          <Skeleton className="mb-3 h-12 w-12 rounded-xl md:h-16 md:w-16" />
          <Skeleton className="mb-2 h-3 w-12 rounded-full" />
          <Skeleton className="h-2 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
