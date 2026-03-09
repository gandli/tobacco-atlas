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
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
          <div className="flex flex-col gap-2 mb-4 animate-in fade-in zoom-in-95 duration-300">
            {regionLabel && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-destructive font-medium uppercase tracking-wider">
                <MapPin className="w-3 h-3" />
                {regionLabel.zh}
              </div>
            )}
            {product.manufacturer && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground line-clamp-1 px-2">
                <Building2 className="w-3 h-3 shrink-0" />
                <span className="truncate">{product.manufacturer}</span>
              </div>
            )}
            {product.packPrice && (
              <div className="text-sm font-bold text-foreground mt-1 tabular-nums">
                ¥{product.packPrice}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 animate-in slide-in-from-bottom-2 duration-300">
            <button
              onClick={(e) => handleAction(e, "favorite")}
              className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
              title="Add to Favorites"
            >
              <Star className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => handleAction(e, "tried")}
              className="w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary text-foreground/70 flex items-center justify-center transition-colors"
              title="Mark as Tried"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => handleAction(e, "wishlist")}
              className="w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary text-foreground/70 flex items-center justify-center transition-colors"
              title="Add to Wishlist"
            >
              <Bookmark className="w-4 h-4" />
            </button>
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
