import SkuDetailPage from "@/legacy-pages/SkuDetail";

type SkuDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SkuDetailRoute({ params }: SkuDetailRouteProps) {
  const { id } = await params;

  return <SkuDetailPage id={id} />;
}
