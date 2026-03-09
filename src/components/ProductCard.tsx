import { Link } from "react-router-dom";
import { Star, CheckCircle, Bookmark, MapPin, Building2 } from "lucide-react";
import { Product, regionLabels } from "@/data";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const regionLabel = product.region ? regionLabels[product.region] : null;

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Action ${action} for product ${product.id}`);
    // Placeholder for actual action logic (e.g., toast notification)
  };

  return (
    <Link
      to={`/sku/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer group outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${product.brand} - ${product.name}`}
    >
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-4 bg-secondary/30 rounded-xl overflow-hidden border border-transparent group-hover:border-gold/20 transition-all duration-500">
        <img
          src={product.image}
          alt={`${product.brand}（${product.name}）`}
          className="max-h-full max-w-full object-contain group-hover:scale-110 group-hover:blur-[2px] transition-all duration-700 ease-out"
          loading="lazy"
          width={400}
          height={500}
        />

        {/* Hover Overlay */}
        <div className="sku-card-overlay">
          {regionLabel && (
            <span
              className={`stamp w-fit mb-2 ${
                product.region === "mainland"
                  ? "text-red-500 bg-red-50"
                  : "text-gold bg-gold/10"
              }`}
            >
              {regionLabel.zh} · {regionLabel.en}
            </span>
          )}
          <div className="text-[13px] text-foreground font-medium leading-tight mb-0.5 break-words font-sans line-clamp-2">
            {product.nameEn || product.name}
          </div>
          <div className="text-[11px] text-muted-foreground/60 mb-3 font-sans truncate">
            {product.brand}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-bold text-red-500 tabular-nums">
              ¥{product.packPrice || product.price || 0}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Add to favorites"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-red-50 text-red-500 hover:bg-red-100"
                onClick={(e) => handleAction(e, "favorite")}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>
              <button
                aria-label="Mark as tried"
                className="w-8 h-8 flex items-center justify-center transition-all text-foreground/40 hover:text-foreground"
                onClick={(e) => handleAction(e, "tried")}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-0.5 px-1 group-hover:translate-y-[-2px] transition-transform duration-300">
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
