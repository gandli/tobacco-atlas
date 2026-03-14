import ManufacturerGridSkeleton from "@/components/skeletons/ManufacturerGridSkeleton";
import PageShellSkeleton from "@/components/skeletons/PageShellSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManufacturersLoading() {
  return (
    <PageShellSkeleton>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Skeleton className="mb-4 h-6 w-28 rounded-full" />
          <Skeleton className="mb-2 h-10 w-48 rounded-2xl md:w-64" />
          <Skeleton className="h-4 w-72 rounded-full" />
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-lg md:max-w-md" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-40 rounded-full" />
        </div>

        <ManufacturerGridSkeleton />
      </div>
    </PageShellSkeleton>
  );
}
