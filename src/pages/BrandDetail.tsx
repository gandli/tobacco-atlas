import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { getBrandByPinyin, getProductsByBrand, regionLabels } from "@/data";

const BrandDetail = () => {
  const { pinyin } = useParams<{ pinyin: string }>();
  const navigate = useNavigate();

  const brand = useMemo(() => getBrandByPinyin(pinyin || ""), [pinyin]);
  const brandProducts = useMemo(() => getProductsByBrand(pinyin || ""), [pinyin]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-[var(--nav-height)] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🚬</p>
            <h1 className="text-xl font-bold text-foreground mb-2">品牌未找到</h1>
            <p className="text-muted-foreground mb-4">Brand not found</p>
            <button onClick={() => navigate("/brands")} className="text-sm text-foreground underline">
              ← Back to brands
            </button>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  const regionLabel = regionLabels[brand.region];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8">
            <button onClick={() => navigate("/brands")} className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Brands
            </button>
            <span>/</span>
            <span className="text-foreground">{brand.name}</span>
          </div>

          {/* Brand header */}
          <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center border border-border rounded-xl bg-card p-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-destructive/30 text-destructive font-medium">
                  {regionLabel.zh} · {regionLabel.en}
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-0.5">
                {brand.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">{brand.pinyin}</p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-destructive font-semibold">{brand.count}</span> products in collection
              </p>
            </div>
          </div>

          {/* Products section */}
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              Products
              {brandProducts.length > 0 && (
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  {brandProducts.length} in database
                </span>
              )}
            </h2>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
              {brandProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/sku/${product.id}`)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-full aspect-[3/4] flex items-center justify-center p-2 md:p-3 border border-border rounded-xl bg-card group-hover:shadow-md transition-shadow">
                    <img
                      src={product.image}
                      alt={`${product.brand}（${product.name}）`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-foreground font-medium">{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm">No products in our database yet for this brand.</p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default BrandDetail;
