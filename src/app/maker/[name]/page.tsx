import ManufacturerDetailPage from "@/features/pages/ManufacturerDetail";

type MakerDetailRouteProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function MakerDetailRoute({
  params,
}: MakerDetailRouteProps) {
  const { name } = await params;

  return <ManufacturerDetailPage name={name} />;
}
