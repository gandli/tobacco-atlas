import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import {
  getProductById,
  getBrandByPinyin,
  regionLabels,
  type Product,
} from "@/data";
import { getLocalizedText, isEnglishLanguage } from "@/lib/i18n-utils";

/** 产品图片画廊 — 多图轮播 + 缩略图 */
const ProductImageGallery = ({ product }: { product: Product }) => {
  const { t } = useTranslation("details");
  const allImages = useMemo(() => {
    const imgs: string[] = [];
    if (product.image) imgs.push(product.image);
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
          width={800}
          height={600}
        />

        {/* 左右切换箭头（多图时显示） */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label={t("sku.previousImage")}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-background/70 hover:bg-background border border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center text-lg focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label={t("sku.nextImage")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-background/70 hover:bg-background border border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center text-lg focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              ›
            </button>
            {/* 页码 */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span className="font-mono text-[10px] text-muted-foreground bg-background/80 px-2 py-0.5 rounded slashed-zero tabular-nums">
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
              aria-label={t("sku.viewImage", { index: i + 1 })}
              className={`flex-shrink-0 w-14 h-14 bg-card border rounded-xl transition-colors overflow-hidden focus-visible:ring-2 focus-visible:ring-ring outline-none ${
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
                width={56}
                height={56}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SkuDetail = () => {
  const { t, i18n } = useTranslation("details");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);

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
              {t("notFound.productTitle")}
            </h1>
            <p className="text-muted-foreground mb-4">{t("notFound.productDescription")}</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-foreground underline"
            >
              ← {t("notFound.backToCollection")}
            </button>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  const regionLabel = product.region ? regionLabels[product.region] : null;
  const usdRate = 0.143; // 汇率参考
  const productName = getLocalizedText({
    language: i18n.resolvedLanguage,
    zh: product.name,
    en: product.nameEn,
  });
  const primaryDescription = getLocalizedText({
    language: i18n.resolvedLanguage,
    zh: product.descriptionZh,
    en: product.description,
  });
  const secondaryDescription =
    isEnglish && product.description && product.descriptionZh
      ? product.descriptionZh
      : !isEnglish && product.descriptionZh && product.description
        ? product.description
        : "";

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

  // 格式化货币
  const formatCurrency = (value: number, currency: string = "CNY") => {
    return new Intl.NumberFormat(currency === "CNY" ? "zh-CN" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-[13px] text-muted-foreground mb-8 overflow-x-auto no-scrollbar"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-foreground transition-colors whitespace-nowrap focus-visible:underline outline-none"
            >
              {t("breadcrumbs.collection")}
            </Link>
            <span className="opacity-30" aria-hidden="true">
              /
            </span>
            <Link
              to={`/brand/${product.brandPinyin}`}
              className="hover:text-foreground transition-colors whitespace-nowrap focus-visible:underline outline-none"
            >
              {product.brand}
            </Link>
            <span className="opacity-30" aria-hidden="true">
              /
            </span>
            <span className="text-foreground truncate font-medium">
              {product.brand}（{productName}）
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16">
            {/* Left Column: Gallery & Description */}
            <div className="space-y-10">
              <ProductImageGallery product={product} />

              {primaryDescription && (
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40">
                  <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground/60 mb-4">
                    {t("sku.description")}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-[14px] text-foreground/80 leading-relaxed font-light">
                      {primaryDescription}
                    </p>
                    {secondaryDescription ? (
                      <p className="text-[13px] text-muted-foreground leading-loose font-chinese">
                        {secondaryDescription}
                      </p>
                    ) : null}
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
                    {isEnglish ? regionLabel.en : regionLabel.zh}
                  </span>
                )}
                <h1 className="text-3xl font-bold text-ash leading-tight mb-2 font-serif text-wrap-balance">
                  {product.brand}（{productName}）
                </h1>
                <p className="text-[17px] text-muted-text/60 italic mb-2 font-sans">
                  {isEnglish ? product.name : product.nameEn}
                </p>
                <div className="flex items-center text-[13px] text-muted-text/30 font-sans">
                  <Link
                    to={`/brand/${product.brandPinyin}`}
                    className="hover:text-gold transition-colors focus-visible:underline outline-none"
                  >
                    {product.brand}
                  </Link>
                  {product.manufacturer && (
                    <>
                      <span className="mx-2 opacity-30" aria-hidden="true">
                        ·
                      </span>
                      <Link
                        to={`/manufacturer/${encodeURIComponent(product.manufacturer)}`}
                        className="hover:text-gold transition-colors hover:underline focus-visible:underline outline-none"
                      >
                        {product.manufacturer}
                      </Link>
                    </>
                  )}
                </div>

                {/* Main Price */}
                {product.packPrice && (
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-[36px] font-bold text-foreground leading-none font-variant-numeric-tabular-nums">
                      {formatCurrency(product.packPrice)}
                    </span>
                    <span className="text-[13px] text-muted-foreground/60">
                      {t("sku.perPack")}
                    </span>
                    <span className="text-[14px] text-muted-foreground/50 font-medium">
                      ≈{" "}
                      {formatCurrency(
                        Math.round(product.packPrice * usdRate),
                        "USD",
                      )}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 h-11 text-[13px] font-medium"
                      aria-label={`${t("sku.favorite")} ${productName}`}
                    >
                      <span
                        className="text-lg leading-none opacity-40"
                        aria-hidden="true"
                      >
                        ☆
                      </span>
                      {t("sku.favorite")}
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 h-11 text-[13px] font-medium"
                      aria-label={`${t("sku.markTried")} ${productName}`}
                    >
                      <span
                        className="text-lg leading-none opacity-40"
                        aria-hidden="true"
                      >
                        ○
                      </span>
                      {t("sku.markTried")}
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 h-11 text-[13px] font-medium"
                      aria-label={`${t("sku.wishlist")} ${productName}`}
                    >
                      <Bookmark className="w-3.5 h-3.5 opacity-40" />
                      {t("sku.wishlist")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              {specs.length > 0 && (
                <div className="rounded-2xl border border-border/60 overflow-hidden bg-card/50">
                  <div className="px-5 py-3.5 bg-secondary/30 border-b border-border/40">
                    <h2 className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/70">
                      {t("sku.specifications")}
                    </h2>
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
                        <span className="text-[13px] text-foreground/80 font-medium font-variant-numeric-tabular-nums">
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
                    <h2 className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground/70">
                      {t("sku.pricing")}
                    </h2>
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
                        <span className="text-[15px] font-bold text-foreground font-variant-numeric-tabular-nums">
                          {formatCurrency(item.cny!)}
                        </span>
                        <span className="text-[12px] text-muted-foreground/40 ml-2 font-variant-numeric-tabular-nums">
                          ≈ {formatCurrency(item.cny! * usdRate, "USD")}
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
                    {t("sku.barcodes")}
                  </p>
                  {product.boxBarcode && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-secondary/20 rounded-xl border border-border/30">
                      <span className="text-[11px] text-muted-foreground/50 w-28 shrink-0 uppercase tracking-wider">
                        {t("sku.box")}
                      </span>
                      <span className="text-[12px] text-foreground/60 font-mono tracking-widest bg-background/50 px-2 py-0.5 rounded border border-border/20">
                        {product.boxBarcode}
                      </span>
                    </div>
                  )}
                  {product.cartonBarcode && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-secondary/20 rounded-xl border border-border/30">
                      <span className="text-[11px] text-muted-foreground/50 w-28 shrink-0 uppercase tracking-wider">
                        {t("sku.carton")}
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
                      {t("sku.ratings")}
                    </p>
                    {product.votes && (
                      <span className="text-[10px] text-muted-foreground/40">
                        {t("sku.votes", { count: product.votes })}
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
