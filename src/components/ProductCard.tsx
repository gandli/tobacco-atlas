"use client";

import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HomeProductSummary } from "@/data/home-catalog";
import { regionLabels } from "@/data/region-labels";
import { getLocalizedText, isEnglishLanguage } from "@/lib/i18n-utils";
import { useToast } from "@/components/ToastProvider";
import OptimizedImage from "@/components/OptimizedImage";

interface ProductCardProps {
  product: HomeProductSummary;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { i18n } = useTranslation();
  const { showSuccess } = useToast();
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
  const isVeryLongProductName = productName.length > 42;
  const overlayTitleClass = isVeryLongProductName
    ? "text-[10px] leading-tight"
    : isLongProductName
      ? "text-[11px] leading-tight"
      : "text-[12px] md:text-[13px] leading-normal";
  const footerTitleClass = isLongProductName ? "text-[10px]" : "text-11";
  const isLongBrandName = product.brand.length > 15;

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 显示 Toast 反馈
    const messages = {
      favorite: `已收藏：${product.brand} - ${productName}`,
      tried: `已标记尝试：${product.brand} - ${productName}`,
      wishlist: `已加入愿望单：${product.brand} - ${productName}`,
    };
    
    showSuccess(messages[action as keyof typeof messages] || "操作成功");
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
              data-testid="product-card-overlay-text"
              className="flex flex-col gap-1 min-h-0"
            >
              <div
                data-testid="product-card-overlay-title"
                className={`${overlayTitleClass} text-foreground font-medium font-sans ${isVeryLongProductName ? 'line-clamp-2' : 'line-clamp-2 md:line-clamp-3'} break-words`}
                title={productName}
              >
                {productName}
              </div>
              <div
                data-testid="product-card-overlay-brand"
                className={`${isLongBrandName ? 'text-[9px] md:text-[10px]' : 'text-[10px]'} text-muted-foreground/80 font-sans leading-tight line-clamp-1 break-words`}
                title={product.brand}
              >
                {product.brand}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[15px] font-bold text-red-500 tabular-nums md:text-[16px]">
                ¥{product.packPrice || product.price || 0}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Add to favorites"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all hover:bg-red-100 active:scale-95 md:h-8 md:w-8 animate-button-press"
                  onClick={(e) => handleAction(e, "favorite")}
                  type="button"
                >
                  <Star className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" />
                </button>
                <button
                  aria-label="Mark as tried"
                  className="flex h-7 w-7 items-center justify-center text-foreground/40 transition-all hover:text-foreground active:scale-95 md:h-8 md:w-8 animate-button-press"
                  onClick={(e) => handleAction(e, "tried")}
                  type="button"
                >
                  <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
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
