"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const titleTextRef = useRef<HTMLSpanElement | null>(null);
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
  const bilingualRegionLabel = regionLabel
    ? `${regionLabel.zh} · ${regionLabel.en}`
    : null;
  const regionDisplayLabel = bilingualRegionLabel || localizedRegionLabel;
  const isLongProductName = productName.length > 24;
  const isVeryLongProductName = productName.length > 34;
  const isExtremeProductName = productName.length > 52;
  const isExtremeBrandName = product.brand.length > 34;
  const isLongRegionLabel = (regionDisplayLabel?.length || 0) > 18;
  const isVeryLongRegionLabel = (regionDisplayLabel?.length || 0) > 24;
  const overlayCharLoad =
    productName.length + product.brand.length + (regionDisplayLabel?.length || 0);
  const prefersExpandedOverlay =
    productName.length > 16 || overlayCharLoad > 32 || product.brand.length > 14;
  const [hasWrappedTitle, setHasWrappedTitle] = useState(prefersExpandedOverlay);
  const useDenseOverlay =
    isExtremeProductName ||
    overlayCharLoad > 58 ||
    productName.length > 34 ||
    product.brand.length > 24 ||
    isVeryLongRegionLabel;
  const useExpandedOverlay = !useDenseOverlay && hasWrappedTitle;
  const useCompactOverlay =
    isExtremeProductName ||
    isExtremeBrandName ||
    isLongRegionLabel ||
    overlayCharLoad > 42 ||
    productName.length > 24 ||
    product.brand.length > 18;
  const overlayTitleClass = "text-[11px] md:text-[12px] leading-[1.18]";
  const overlayShellClass = useDenseOverlay || useExpandedOverlay
    ? "sku-card-overlay sku-card-overlay-expanded"
    : "sku-card-overlay";
  const overlayBodyClass = useDenseOverlay
    ? "grid min-h-0 flex-1 grid-rows-[40px_18px_24px] gap-2"
    : useExpandedOverlay
      ? "grid min-h-0 flex-1 grid-rows-[40px_18px_24px] gap-2"
      : "grid min-h-0 flex-1 grid-rows-[30px_18px_24px] gap-2";
  const overlayTitleBoxClass = useDenseOverlay
    ? "h-10 overflow-hidden"
    : useExpandedOverlay
      ? "h-[34px] overflow-hidden"
      : "h-[30px] overflow-hidden";
  const overlayBrandBoxClass = "h-[18px] overflow-hidden";
  const overlayBrandTextClass = "text-[10px] md:text-[11px] leading-[1.2]";
  const footerTitleClass = isLongProductName ? "text-[10px]" : "text-11";
  const overlayRegionClass = "text-[8px] px-1.5 py-0.5 max-w-full";
  const overlayContentDensity = useDenseOverlay
    ? "dense"
    : useCompactOverlay
      ? "compact"
      : "default";
  const overlayContentClass = "sku-card-overlay-content";
  const overlayPriceClass = "text-[14px] md:text-[15px]";
  const overlayActionButtonClass = useDenseOverlay
    ? "flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all active:scale-95 md:h-5 md:w-5 animate-button-press"
    : useCompactOverlay
    ? "flex h-5 w-5 items-center justify-center rounded-full transition-all active:scale-95 md:h-6 md:w-6 animate-button-press"
    : "flex h-6 w-6 items-center justify-center rounded-full transition-all active:scale-95 md:h-7 md:w-7 animate-button-press";
  const overlayActionIconClass = useDenseOverlay
    ? "h-2.5 w-2.5 md:h-3 md:w-3"
    : useCompactOverlay
    ? "h-3 w-3 md:h-3.5 md:w-3.5"
    : "h-3.5 w-3.5 md:h-4 md:w-4";

  useEffect(() => {
    const element = titleTextRef.current;
    if (!element || typeof window === "undefined") {
      return;
    }

    const measureWrap = () => {
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight);
      const fallbackLineHeight = Number.isFinite(lineHeight) ? lineHeight : 18;
      const rectHeight = element.getBoundingClientRect().height;
      const contentHeight = Math.max(element.scrollHeight, rectHeight);
      if (!Number.isFinite(contentHeight) || contentHeight <= 0) {
        setHasWrappedTitle(prefersExpandedOverlay);
        return;
      }
      setHasWrappedTitle(contentHeight > fallbackLineHeight * 1.35);
    };

    measureWrap();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      measureWrap();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [productName, prefersExpandedOverlay]);

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
      data-testid="product-card-root"
      data-card-shape="wide-compact"
      className="group block h-full cursor-pointer outline-none rounded-[24px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${product.brand} - ${productName}`}
    >
      <div className="relative grid h-full aspect-[11/16] overflow-hidden rounded-[24px] border border-[#ece6de] bg-[#fdfcf9] shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition-all duration-500 group-hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)] [grid-template-rows:minmax(0,1fr)_88px] md:[grid-template-rows:minmax(0,1fr)_92px]">
        <div className="relative flex min-h-0 items-start justify-center overflow-hidden bg-gradient-to-b from-[#f8f7f3] to-[#f4f1ea] px-4.5 pt-2.5">
          <OptimizedImage
            src={product.image}
            alt={`${product.brand}（${productName}）`}
            width={400}
            height={500}
            className="h-full w-auto max-w-[80%] object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          />
        </div>

        <div className="flex min-h-[88px] flex-col justify-center border-t border-[#efebe5] bg-[#fcfbf8] px-3.5 py-2.5 md:min-h-[92px]">
          <div className="flex flex-col items-start gap-1 overflow-hidden">
            <span
              className="text-[14px] font-semibold text-[#22211f] leading-[1.1] line-clamp-2 font-serif"
              title={productName}
            >
              {productName}
            </span>
            <span
              data-testid="product-card-footer-name"
              className={`${footerTitleClass} font-sans text-[#b2ada7] leading-tight max-w-full truncate`}
              title={product.brand}
            >
              {product.brand}
            </span>
          </div>
        </div>

        <div
          data-testid="product-card-overlay-shell"
          data-overlay-anchor="card-bottom-half"
          className={overlayShellClass}
        >
          <div
            data-testid="product-card-overlay-content"
            data-overlay-variant="floating-sheet"
            data-overlay-density={overlayContentDensity}
            data-overlay-layout="fixed-four-part"
            className={overlayContentClass}
          >
            {regionLabel && (
              <span
                data-testid="product-card-region-badge"
                className={`stamp w-fit ${overlayRegionClass} ${
                  product.region === "mainland"
                    ? "text-red-500 bg-red-50"
                    : "text-gold bg-gold/10"
                }`}
              >
                {regionDisplayLabel}
              </span>
            )}
            <div
              data-testid="product-card-overlay-body"
              data-overlay-rails="fixed"
              className={overlayBodyClass}
            >
              <div
                data-testid="product-card-overlay-title"
                className={`${overlayTitleBoxClass} text-[#666661] font-medium font-sans subpixel-antialiased`}
                title={productName}
              >
                <span
                  ref={titleTextRef}
                  className={`${overlayTitleClass} block break-words`}
                >
                  {productName}
                </span>
              </div>
              <div
                data-testid="product-card-overlay-brand"
                className={`${overlayBrandBoxClass} text-[#b3ada7] font-sans subpixel-antialiased`}
                title={product.brand}
              >
                <span className={`${overlayBrandTextClass} block break-words`}>
                  {product.brand}
                </span>
              </div>
              <div
                data-testid="product-card-overlay-footer"
                className="flex h-full items-center justify-between gap-3"
              >
                <span className={`${overlayPriceClass} font-bold text-[#ff4d3b] tabular-nums`}>
                  ¥{product.packPrice || product.price || 0}
                </span>
                <div className={`flex items-center ${useDenseOverlay ? "gap-2" : useCompactOverlay ? "gap-2.5" : "gap-3"}`}>
                  <button
                    aria-label="Add to favorites"
                    className={`${overlayActionButtonClass} text-[#c9c3bc] hover:text-[#ff6b5b]`}
                    onClick={(e) => handleAction(e, "favorite")}
                    type="button"
                  >
                    <Star className={`${overlayActionIconClass} stroke-[1.75]`} />
                  </button>
                  <button
                    aria-label="Mark as tried"
                    className={`${overlayActionButtonClass} text-[#c9c3bc] hover:text-[#8f8a84]`}
                    onClick={(e) => handleAction(e, "tried")}
                    type="button"
                  >
                    <CheckCircle className={`${overlayActionIconClass} stroke-[1.55]`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
