import { useNavigate } from "react-router-dom";
import { Product } from "@/data";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/sku/${product.id}`)}
      className="flex flex-col gap-3 cursor-pointer group"
    >
      <div className="w-full aspect-[4/5] flex items-center justify-center p-4 bg-secondary/30 rounded-xl overflow-hidden border border-transparent group-hover:border-gold/20 transition-all duration-300">
        <img
          src={product.image}
          alt={`${product.brand}（${product.name}）`}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center gap-0.5 px-1">
        <span className="text-[14px] font-serif text-ash text-center leading-tight line-clamp-1 group-hover:text-gold transition-colors">
          {product.brand}
        </span>
        <span className="text-[11px] font-sans text-muted-text/60 text-center leading-tight line-clamp-1">
          {product.name}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
