import ManufacturerDetailPage from "@/features/pages/ManufacturerDetail";

type ManufacturerDetailRouteProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function ManufacturerDetailRoute({
  params,
}: ManufacturerDetailRouteProps) {
  const { name } = await params;

  return <ManufacturerDetailPage name={name} />;
}
