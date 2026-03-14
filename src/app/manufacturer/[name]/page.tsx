import { redirect } from "next/navigation";

type ManufacturerCompatibilityRouteProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function ManufacturerCompatibilityPage({
  params,
}: ManufacturerCompatibilityRouteProps) {
  const { name } = await params;
  redirect(`/maker/${name}`);
}
