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
              className={`flex-shrink-0 w-14 h-14 bg-card border rounded-xl transition-colors overflow-hidden ${
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
  const usdRate = 0.143; // 汇率参考

  const specs = [
    { label: "Tobacco Type", value: product.tobaccoType },
    { label: "Tar", value: product.tar },
    { label: "Nicotine", value: product.nicotine },
    { label: "CO", value: product.co },
    { label: "Length", value: product.length },
    { label: "Format", value: product.format },
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

  const ratings = [
    { label: "Taste", value: product.taste },
    { label: "Pack", value: product.packRating },
    { label: "Value", value: product.valueRating },
    { label: "Overall", value: product.overallRating },
  ].filter((r) => r.value !== undefined);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground mb-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigate("/")}
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              Collection
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => navigate(`/brand/${product.brandPinyin}`)}
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              {product.brand}
            </button>
            <span className="opacity-30">/</span>
            <span className="text-foreground truncate">
              {product.brand}（{product.name}）
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16">
            {/* Left Column: Gallery & Description */}
            <div className="space-y-10">
              <ProductImageGallery product={product} />

              {(product.description || product.descriptionZh) && (
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground/60 mb-4">
                    Description
                  </p>
                  <div className="space-y-4">
                    {product.description && (
                      <p className="text-[14px] text-foreground/80 leading-relaxed font-light">
                        {product.description}
                      </p>
                    )}
                    {product.descriptionZh && (
                      <p className="text-[13px] text-muted-foreground leading-loose font-chinese">
                        {product.descriptionZh}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Info & Specs */}
            <div className="space-y-8">
              {/* Header Info */}
              <div>
                {regionLabel && (
                  <span className="inline-flex text-[11px] px-2.5 py-1 rounded-sm bg-destructive/5 text-destructive border border-destructive/20 font-medium mb-4">
                    {regionLabel.zh} · {regionLabel.en}
                  </span>
                )}
                <h1 className="text-3xl font-bold text-foreground leading-tight mb-2 font-chinese">
                  {product.brand}（{product.name}）
                </h1>
                <p className="text-[17px] text-muted-foreground italic mb-2">
                  {product.nameEn}
                </p>
                <div className="flex items-center text-[13px] text-muted-foreground">
                  <button
                    onClick={() => navigate(`/brand/${product.brandPinyin}`)}
                    className="hover:text-foreground transition-colors"
                  >
                    {product.brand}
                  </button>
                  {product.manufacturer && (
                    <>
                      <span className="mx-2 opacity-30">·</span>
                      <span>{product.manufacturer}</span>
                    </>
                  )}
                </div>

                {/* Main Price */}
                {product.packPrice && (
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-[36px] font-bold text-foreground leading-none">
                      ¥{product.packPrice}
                    </span>
                    <span className="text-[13px] text-muted-foreground/60">
                      / pack
                    </span>
                    <span className="text-[14px] text-muted-foreground/50 font-medium">
                      ≈ ${Math.round(product.packPrice * usdRate)}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-medium transition-all bg-secondary/50 text-foreground/60 hover:bg-secondary hover:text-foreground">
                      <span className="text-lg leading-none opacity-40">☆</span>
                      Favorite
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-medium transition-all bg-secondary/50 text-foreground/60 hover:bg-secondary hover:text-foreground">
                      <span className="text-lg leading-none opacity-40">○</span>
                      Mark tried
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-medium transition-all bg-secondary/50 text-foreground/60 hover:bg-secondary hover:text-foreground">
                      <Bookmark className="w-3.5 h-3.5 opacity-40" />
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              {specs.length > 0 && (
                <div className="rounded-2xl border border-border/60 overflow-hidden bg-card/50">
                  <div className="px-5 py-3.5 bg-secondary/30 border-b border-border/40">
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/70">
                      Specifications
                    </p>
                  </div>
                  <div className="divide-y divide-border/30">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center px-5 py-3 hover:bg-secondary/10 transition-colors"
                      >
                        <span className="text-[12px] text-muted-foreground/70 w-36 shrink-0">
                          {spec.label}
                        </span>
                        <span className="text-[13px] text-foreground/80 font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Details */}
              {pricing.length > 0 && (
                <div className="rounded-2xl border border-border/60 overflow-hidden bg-card/50">
                  <div className="px-5 py-3.5 bg-secondary/30 border-b border-border/40">
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/70">
                      Pricing
                    </p>
                  </div>
                  <div className="divide-y divide-border/30">
                    {pricing.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center px-5 py-3 hover:bg-secondary/10 transition-colors"
                      >
                        <span className="text-[12px] text-muted-foreground/70 w-36 shrink-0">
                          {item.label}
                        </span>
                        <span className="text-[15px] font-bold text-foreground">
                          ¥{item.cny}
                        </span>
                        <span className="text-[12px] text-muted-foreground/40 ml-2">
                          ≈ ${(item.cny! * usdRate).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Barcodes */}
              {(product.boxBarcode || product.cartonBarcode) && (
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/40 px-1">
                    Barcodes
                  </p>
                  {product.boxBarcode && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-secondary/20 rounded-xl border border-border/30">
                      <span className="text-[11px] text-muted-foreground/50 w-28 shrink-0 uppercase tracking-wider">
                        Box
                      </span>
                      <span className="text-[12px] text-foreground/60 font-mono tracking-widest bg-background/50 px-2 py-0.5 rounded border border-border/20">
                        {product.boxBarcode}
                      </span>
                    </div>
                  )}
                  {product.cartonBarcode && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-secondary/20 rounded-xl border border-border/30">
                      <span className="text-[11px] text-muted-foreground/50 w-28 shrink-0 uppercase tracking-wider">
                        Carton
                      </span>
                      <span className="text-[12px] text-foreground/60 font-mono tracking-widest bg-background/50 px-2 py-0.5 rounded border border-border/20">
                        {product.cartonBarcode}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Ratings */}
              {ratings.length > 0 && (
                <div className="rounded-2xl border border-border/60 overflow-hidden bg-card/50">
                  <div className="px-5 py-3.5 bg-secondary/30 border-b border-border/40 flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/70">
                      Ratings
                    </p>
                    {product.votes && (
                      <span className="text-[10px] text-muted-foreground/40">
                        {product.votes} votes
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-5">
                    {ratings.map((rating) => (
                      <div key={rating.label}>
                        <div className="flex justify-between mb-2 items-center">
                          <span className="text-[12px] text-muted-foreground font-medium">
                            {rating.label}
                          </span>
                          <span className="text-[13px] font-bold text-foreground">
                            {rating.value?.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground/80 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(rating.value || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default SkuDetail;
