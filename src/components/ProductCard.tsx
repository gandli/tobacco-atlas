import { Link } from "react-router-dom";
import { Product } from "@/data";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/sku/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer group outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${product.brand} - ${product.name}`}
    >
      <div className="w-full aspect-[4/5] flex items-center justify-center p-4 bg-secondary/30 rounded-xl overflow-hidden border border-transparent group-hover:border-gold/20 transition-all duration-300">
        <img
          src={product.image}
          alt={`${product.brand}（${product.name}）`}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
          width={400}
          height={500}
        />
      </div>
      <div className="flex flex-col items-center gap-0.5 px-1">
        <span className="text-sm font-serif text-ash text-center leading-tight line-clamp-1 group-hover:text-gold transition-colors text-wrap-balance">
          {product.brand}
        </span>
        <span className="text-11 font-sans text-muted-text/60 text-center leading-tight line-clamp-1">
          {product.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
