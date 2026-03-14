import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" data-testid="product-card-skeleton">
      <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
        <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      </div>
      <div className="flex flex-col items-center gap-2 px-1">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-full" />
      </div>
    </div>
  );
}
