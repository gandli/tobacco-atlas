import { notFound } from "next/navigation"
import { ProductDetailScreen } from "@/components/screens/ProductDetailScreen"
import { getProductById } from "@/lib/products"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) notFound()
  return <ProductDetailScreen product={product} />
}

