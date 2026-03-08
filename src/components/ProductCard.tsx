import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/sku/${product.id}`)}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="w-full aspect-[3/4] flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={`${product.brand}（${product.name}）`}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {product.brand}（{product.name}）
      </span>
    </div>
  );
};

export default ProductCard;
