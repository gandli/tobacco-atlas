import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Star, Circle, Bookmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import {
  getProductById,
  getBrandByPinyin,
  regionLabels,
  type Product,
} from "@/data";

/** 产品图片画廊 — 多图轮播 + 缩略图 */
const ProductImageGallery = ({ product }: { product: Product }) => {
  const allImages = useMemo(() => {
    const imgs: string[] = [];
    // 主图
    if (product.image) imgs.push(product.image);
    // images 数组中的其他图
    if (product.images) {
      for (const img of product.images) {
        if (img.url && !imgs.includes(img.url)) imgs.push(img.url);
      }
    }
    return imgs;
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () =>
    setCurrentIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const goNext = () =>
    setCurrentIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));

  if (allImages.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* 主图区域 */}
      <div className="relative bg-card border border-border rounded-2xl aspect-square sm:aspect-[4/3] flex items-center justify-center overflow-hidden">
        <img
          key={currentIndex}
          alt={`${product.brand}（${product.name}）`}
          className="max-h-full max-w-full object-contain p-6 md:p-10 animate-[fadeUp_0.2s_ease_both]"
          src={allImages[currentIndex]}
        />

        {/* 左右切换箭头（多图时显示） */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-background/70 hover:bg-background border border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center text-lg"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-background/70 hover:bg-background border border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center text-lg"
            >
              ›
            </button>
            {/* 页码 */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span className="font-mono text-[10px] text-muted-foreground bg-background/80 px-2 py-0.5 rounded">
                {currentIndex + 1} / {allImages.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 缩略图条（多图时显示） */}
      {allImages.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto [overscroll-behavior:contain] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {allImages.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`flex-shrink-0 w-14 h-14 bg-card border rounded-lg transition-colors overflow-hidden ${
                i === currentIndex
                  ? "border-foreground/50"
                  : "border-border hover:border-foreground/25"
              }`}
            >
              <img
                src={url}
                alt={`Thumb ${i + 1}`}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SkuDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => getProductById(Number(id)), [id]);
  const brand = useMemo(
    () => (product ? getBrandByPinyin(product.brandPinyin) : undefined),
    [product],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-[var(--nav-height)] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🚬</p>
            <h1 className="text-xl font-bold text-foreground mb-2">
              产品未找到
            </h1>
            <p className="text-muted-foreground mb-4">Product not found</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-foreground underline"
            >
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
    {
      label: "Count / Box",
      value: product.countPerBox ? `${product.countPerBox} pcs` : undefined,
    },
    {
      label: "Boxes / Carton",
      value: product.boxesPerCarton
        ? `${product.boxesPerCarton} boxes`
        : undefined,
    },
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
            <button
              onClick={() => navigate("/")}
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
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
            {/* Product image gallery */}
            <div className="lg:w-[55%] flex-shrink-0">
              <ProductImageGallery product={product} />
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
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs h-9 rounded-lg"
                >
                  <Star className="w-3.5 h-3.5" />
                  Favorite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs h-9 rounded-lg"
                >
                  <Circle className="w-3.5 h-3.5" />
                  Mark tried
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs h-9 rounded-lg"
                >
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
                      <div
                        key={spec.label}
                        className="flex items-center justify-between px-4 py-2.5"
                      >
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="text-xs md:text-sm font-medium text-foreground">
                          {spec.value}
                        </span>
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
                      <div
                        key={p.label}
                        className="flex items-center justify-between px-4 py-2.5"
                      >
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {p.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm font-semibold text-destructive">
                            ¥{p.cny}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ≈ ${(p.cny! * usdRate).toFixed(2)}
                          </span>
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
                    <p className="text-sm text-foreground leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  {product.descriptionZh && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.descriptionZh}
                    </p>
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
