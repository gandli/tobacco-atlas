import { cn } from "@/lib/utils";

/**
 * 基础骨架屏组件
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * ```
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

/**
 * 产品卡片骨架屏
 * 
 * @example
 * ```tsx
 * <SkeletonProductCard />
 * ```
 */
export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3">
      {/* 图片占位 */}
      <div className="relative w-full aspect-[4/5] bg-muted rounded-xl animate-pulse" />
      
      {/* 文本占位 */}
      <div className="flex flex-col gap-1 px-1">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * 品牌卡片骨架屏
 * 
 * @example
 * ```tsx
 * <SkeletonBrandCard />
 * ```
 */
export function SkeletonBrandCard() {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
      <div className="h-4 bg-muted rounded w-20 animate-pulse" />
      <div className="h-3 bg-muted rounded w-16 animate-pulse" />
    </div>
  );
}

/**
 * 产品详情骨架屏
 * 
 * @example
 * ```tsx
 * <SkeletonSkuDetail />
 * ```
 */
export function SkeletonSkuDetail() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16">
      {/* 图片画廊骨架屏 */}
      <div className="space-y-10">
        <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
        <div className="h-48 bg-muted rounded-2xl animate-pulse" />
      </div>
      
      {/* 信息骨架屏 */}
      <div className="space-y-8">
        <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        <div className="space-y-3">
          <div className="h-11 bg-muted rounded animate-pulse" />
          <div className="h-11 bg-muted rounded animate-pulse" />
          <div className="h-11 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-64 bg-muted rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export { Skeleton };
