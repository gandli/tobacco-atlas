import { Skeleton } from "@/components/ui/skeleton";

interface PageShellSkeletonProps {
  children: React.ReactNode;
}

export default function PageShellSkeleton({
  children,
}: PageShellSkeletonProps) {
  return (
    <div
      className="min-h-screen bg-background pb-16 md:pb-0"
      data-testid="page-shell-skeleton"
    >
      <div className="fixed inset-x-0 top-0 z-50 flex h-[var(--nav-height)] items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-sm" />
          <Skeleton className="hidden h-4 w-40 sm:block" />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>

      <div className="pt-[var(--nav-height)]">{children}</div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-background/90 px-4 py-2 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-2 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
