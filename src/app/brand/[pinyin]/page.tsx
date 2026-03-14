import BrandDetailPage from "@/features/pages/BrandDetail";

type BrandDetailRouteProps = {
  params: Promise<{
    pinyin: string;
  }>;
};

export default async function BrandDetailRoute({
  params,
}: BrandDetailRouteProps) {
  const { pinyin } = await params;

  return <BrandDetailPage identifier={pinyin} />;
}
