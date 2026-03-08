import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft, Star, Circle, Bookmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { getProductById, getBrandByPinyin, regionLabels } from "@/data";

const SkuDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => getProductById(Number(id)), [id]);
  const brand = useMemo(
    () => (product ? getBrandByPinyin(product.brandPinyin) : undefined),
    [product]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-[var(--nav-height)] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🚬</p>
            <h1 className="text-xl font-bold text-foreground mb-2">产品未找到</h1>
            <p className="text-muted-foreground mb-4">Product not found</p>
            <button onClick={() => navigate("/")} className="text-sm text-foreground underline">
              ← Back to collection
            </button>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  const regionLabel = product.region ? regionLabels[product.region] : null;
  const usdRate = 0.14;

  const specs = [
    { label: "Tobacco Type", value: product.tobaccoType },
    { label: "Tar", value: product.tar },
    { label: "Nicotine", value: product.nicotine },
    { label: "CO", value: product.co },
    { label: "Length", value: product.length },
    { label: "Count / Box", value: product.countPerBox ? `${product.countPerBox} pcs` : undefined },
    { label: "Boxes / Carton", value: product.boxesPerCarton ? `${product.boxesPerCarton} boxes` : undefined },
  ].filter((s) => s.value);

  const pricing = [
    { label: "Pack price", cny: product.packPrice },
    { label: "Carton price", cny: product.cartonPrice },
    { label: "Wholesale", cny: product.wholesalePrice },
  ].filter((p) => p.cny);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 md:mb-6 overflow-x-auto no-scrollbar">
            <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors whitespace-nowrap">
              Collection
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/brand/${product.brandPinyin}`)}
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              {product.brand}
            </button>
            <span>/</span>
            <span className="text-foreground truncate">
              {product.brand}（{product.name}）
            </span>
          </div>

          {/* Main layout: image left, info right */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            {/* Product image */}
            <div className="lg:w-[55%] flex-shrink-0">
              <div className="bg-card border border-border rounded-2xl flex items-center justify-center p-8 md:p-12 aspect-square md:aspect-[4/3]">
                <img
                  src={product.image}
                  alt={`${product.brand}（${product.name}）`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              {/* Region badge */}
              {regionLabel && (
                <span className="inline-block text-[10px] md:text-xs px-2 py-0.5 rounded-full border border-destructive/30 text-destructive font-medium mb-2 md:mb-3">
                  {regionLabel.zh} · {regionLabel.en}
                </span>
              )}

              {/* Title */}
              <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight mb-1">
                {product.brand}（{product.name}）
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-1">
                {product.brand} {product.name}
              </p>
              {product.manufacturer && (
                <p className="text-xs text-muted-foreground mb-4">
                  {product.brand} · {product.manufacturer}
                </p>
              )}

              {/* Price */}
              {product.packPrice && (
                <div className="flex items-baseline gap-2 mb-4 md:mb-5">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    ¥{product.packPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/ pack</span>
                  <span className="text-sm text-muted-foreground">
                    ≈ ${(product.packPrice * usdRate).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 rounded-lg">
                  <Star className="w-3.5 h-3.5" />
                  Favorite
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 rounded-lg">
                  <Circle className="w-3.5 h-3.5" />
                  Mark tried
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 rounded-lg">
                  <Bookmark className="w-3.5 h-3.5" />
                  Wishlist
                </Button>
              </div>

              {/* Specifications */}
              {specs.length > 0 && (
                <div className="border border-border rounded-xl overflow-hidden mb-4">
                  <div className="px-4 py-2.5 bg-secondary/50">
                    <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
                      Specifications
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs md:text-sm text-muted-foreground">{spec.label}</span>
                        <span className="text-xs md:text-sm font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {pricing.length > 0 && (
                <div className="border border-border rounded-xl overflow-hidden mb-4">
                  <div className="px-4 py-2.5 bg-secondary/50">
                    <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
                      Pricing
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {pricing.map((p) => (
                      <div key={p.label} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs md:text-sm text-muted-foreground">{p.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm font-semibold text-destructive">¥{p.cny}</span>
                          <span className="text-xs text-muted-foreground">≈ ${(p.cny! * usdRate).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {(product.description || product.descriptionZh) && (
            <div className="mt-6 md:mt-10 lg:max-w-[55%]">
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/50">
                  <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
                    Description
                  </span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  {product.description && (
                    <p className="text-sm text-foreground leading-relaxed">{product.description}</p>
                  )}
                  {product.descriptionZh && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.descriptionZh}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default SkuDetail;
