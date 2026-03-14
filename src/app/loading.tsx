import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import PageShellSkeleton from "@/components/skeletons/PageShellSkeleton";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";

export default function HomeLoading() {
  return (
    <PageShellSkeleton>
      <HeroSkeleton />
      <ProductGridSkeleton />
    </PageShellSkeleton>
  );
}
