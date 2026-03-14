"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import OptimizedImage from "@/components/OptimizedImage";
import ProductGrid from "@/components/ProductGrid";
import { getBrandById, getBrandByPinyin } from "@/data/brand-catalog";
import { getProductsByBrand } from "@/data/product-catalog";
import { regionLabels } from "@/data/region-labels";
import { getLocalizedText, isEnglishLanguage } from "@/lib/i18n-utils";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";

type BrandDetailProps = {
  identifier?: string;
  pinyin?: string;
};

const BrandDetail = ({ identifier, pinyin: explicitPinyin }: BrandDetailProps) => {
  const { t, i18n } = useTranslation("details");
  const brandIdentifier =
    identifier ??
    explicitPinyin ??
    (typeof window !== "undefined"
      ? decodeURIComponent(
          window.location.pathname.match(/^\/brand\/([^/]+)/)?.[1] ?? "",
        )
      : "");
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);

  const brand = useMemo(() => {
    const numericId = Number(brandIdentifier);
    if (brandIdentifier && Number.isInteger(numericId) && numericId > 0) {
      return getBrandById(numericId);
    }

    return getBrandByPinyin(brandIdentifier || "");
  }, [brandIdentifier]);
  const brandProducts = useMemo(
    () => getProductsByBrand(brand?.pinyin || ""),
    [brand?.pinyin],
  );

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-[var(--nav-height)] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🚬</p>
            <h1 className="text-xl font-bold text-foreground mb-2">
              {t("notFound.brandTitle")}
            </h1>
            <p className="text-muted-foreground mb-4">{t("notFound.brandDescription")}</p>
            <Link
              href="/brands"
              className="text-sm text-foreground underline focus-visible:ring-2 focus-visible:ring-ring outline-none rounded"
            >
              ← {t("notFound.backToBrands")}
            </Link>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  const regionLabel = regionLabels[brand.region];
  const primaryDescription = getLocalizedText({
    language: i18n.resolvedLanguage,
    zh: brand.descriptionCn,
    en: brand.descriptionEn,
  });
  const secondaryDescription =
    isEnglish && brand.descriptionEn && brand.descriptionCn
      ? brand.descriptionCn
      : !isEnglish && brand.descriptionCn && brand.descriptionEn
        ? brand.descriptionEn
        : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame className="py-6 md:py-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/brands"
              className="hover:text-foreground transition-colors flex items-center gap-1 focus-visible:underline outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("breadcrumbs.brands")}
            </Link>
            <span className="opacity-30" aria-hidden="true">
              /
            </span>
            <span className="text-foreground font-medium">{brand.name}</span>
          </nav>

          {/* Brand header */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mb-12 lg:mb-16">
            <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center border border-border rounded-2xl bg-card p-3 shadow-sm overflow-hidden">
              <OptimizedImage
                src={brand.logo}
                alt={brand.name}
                width={128}
                height={128}
                className="max-w-full max-h-full object-contain"
                sizes="128px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-destructive/30 text-destructive font-medium uppercase tracking-wider">
                  {isEnglish ? regionLabel.en : regionLabel.zh}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2 text-wrap-balance">
                {brand.name}
              </h1>
              <p className="text-base text-muted-foreground font-medium mb-4">
                {brand.pinyin}
              </p>

              {primaryDescription && (
                <div className="max-w-3xl space-y-3 mb-6">
                  <p className="text-[15px] leading-relaxed text-foreground/80">
                    {primaryDescription}
                  </p>
                  {secondaryDescription ? (
                    <p className="text-sm leading-relaxed text-muted-foreground font-light italic">
                      {secondaryDescription}
                    </p>
                  ) : null}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-destructive font-bold text-lg leading-none tabular-nums">
                    {new Intl.NumberFormat().format(brand.count)}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {t("brand.products")}
                  </span>
                </div>
                {brand.company && (
                  <div
                    className="h-8 w-px bg-border/50 mx-2"
                    aria-hidden="true"
                  />
                )}
                {brand.company && (
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">
                      {brand.company}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                      {t("brand.manufacturer")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products section */}
          <div className="mb-8 border-b border-border/50 pb-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-baseline gap-3 text-wrap-balance">
              {t("brand.collection")}
              {brandProducts.length > 0 && (
                <span className="text-muted-foreground text-sm font-normal tabular-nums">
                  {t("brand.items", { count: brandProducts.length })}
                </span>
              )}
            </h2>
          </div>

          {brandProducts.length > 0 ? (
            <ProductGrid
              products={brandProducts}
              sectionId="legacy-brand-collection"
              className="px-0 pb-0 pt-0 max-w-none"
            />
          ) : (
            <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">
                {t("brand.empty")}
              </p>
            </div>
          )}
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
};

export default BrandDetail;
