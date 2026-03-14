import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center md:min-h-[calc(var(--nav-height)_*_12)] md:px-6"
      data-testid="hero-skeleton"
    >
      <Skeleton className="mb-4 h-5 w-40 rounded-full" />
      <Skeleton className="mb-4 h-12 w-72 rounded-2xl md:h-20 md:w-[34rem]" />
      <Skeleton className="mb-3 h-4 w-56 rounded-full" />
      <Skeleton className="mb-8 h-4 w-64 rounded-full" />
      <Skeleton className="mb-6 h-11 w-40 rounded-md" />
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Skeleton className="h-10 w-36 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
    </section>
  );
}
