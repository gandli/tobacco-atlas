import BrandGridSkeleton from "@/components/skeletons/BrandGridSkeleton";
import PageShellSkeleton from "@/components/skeletons/PageShellSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsLoading() {
  return (
    <PageShellSkeleton>
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <Skeleton className="mb-2 h-3 w-24 rounded-full" />
          <Skeleton className="mb-2 h-10 w-48 rounded-2xl md:h-14 md:w-72" />
          <Skeleton className="h-4 w-64 rounded-full" />
        </div>

        <div className="mb-4 flex gap-2 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        <Skeleton className="mb-6 h-10 w-full rounded-lg md:mb-10 md:max-w-md" />
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-3 w-12 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-4 w-8 rounded-full" />
        </div>

        <BrandGridSkeleton />
      </div>
    </PageShellSkeleton>
  );
}
