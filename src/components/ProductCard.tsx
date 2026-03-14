"use client";

import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HomeProductSummary } from "@/data/home-catalog";
import { regionLabels } from "@/data/region-labels";
import { getLocalizedText, isEnglishLanguage } from "@/lib/i18n-utils";
import OptimizedImage from "@/components/OptimizedImage";

interface ProductCardProps {
  product: HomeProductSummary;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { i18n } = useTranslation();
  const regionLabel = product.region ? regionLabels[product.region] : null;
  const productId = product.id;
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);
  const productName = getLocalizedText({
    language: i18n.resolvedLanguage,
    zh: product.name,
    en: product.nameEn,
  });
  const localizedRegionLabel = regionLabel
    ? isEnglish
      ? regionLabel.en
      : regionLabel.zh
    : null;
  const isLongProductName = productName.length > 26;
  const overlayTitleClass = isLongProductName ? "text-[11px]" : "text-[12px]";
  const footerTitleClass = isLongProductName ? "text-[10px]" : "text-11";

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Action ${action} for product ${product.id}`);
    // Placeholder for actual action logic (e.g., toast notification)
  };

  return (
    <Link
      href={`/sku/${productId}`}
      className="flex flex-col gap-3 cursor-pointer group outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${product.brand} - ${productName}`}
    >
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-4 bg-secondary/30 rounded-xl overflow-hidden border border-transparent group-hover:border-gold/20 transition-all duration-500">
        <OptimizedImage
          src={product.image}
          alt={`${product.brand}（${productName}）`}
          width={400}
          height={500}
          className="max-h-full max-w-full object-contain group-hover:scale-105 group-hover:blur-[1px] transition-all duration-700 ease-out"
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
        />

        {/* Hover Overlay */}
        <div className="sku-card-overlay">
          <div className="sku-card-overlay-content">
            {regionLabel && (
              <span
                className={`stamp w-fit mb-2 ${
                  product.region === "mainland"
                    ? "text-red-500 bg-red-50"
                    : "text-gold bg-gold/10"
                }`}
              >
                {localizedRegionLabel}
              </span>
            )}
            <div
              data-testid="product-card-overlay-title"
              className={`${overlayTitleClass} text-foreground font-medium leading-snug mb-1 font-sans line-clamp-3`}
            >
              {productName}
            </div>
            <div className="text-[10px] text-muted-foreground/80 mb-3 font-sans truncate">
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
      </div>

      <div className="flex flex-col items-center gap-0.5 px-1 group-hover:translate-y-[-2px] transition-transform duration-300">
        <span
          className="text-sm font-serif text-ash text-center leading-tight line-clamp-1 group-hover:text-gold transition-colors text-wrap-balance max-w-full"
          title={product.brand}
        >
          {product.brand}
        </span>
        <span
          data-testid="product-card-footer-name"
          className={`${footerTitleClass} font-sans text-muted-foreground/70 text-center leading-tight max-w-full truncate`}
          title={productName}
        >
          {productName}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
