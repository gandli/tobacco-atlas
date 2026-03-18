"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Sparkles, TrendingUp, Clock, Heart, Eye } from "lucide-react";

import type { Product } from "@/data/product-catalog";
import type { Recommendation } from "@/data/types";
import OptimizedImage from "@/components/OptimizedImage";
import { cn } from "@/lib/utils";

interface RecommendedProductsProps {
  recommendations: (Product & Recommendation)[];
  title?: string;
  showReason?: boolean;
  className?: string;
}

export default function RecommendedProducts({
  recommendations,
  title,
  showReason = true,
  className,
}: RecommendedProductsProps) {
  const { t, i18n } = useTranslation("recommend");
  const isEnglish = i18n.resolvedLanguage === "en-US";

  const getTypeIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "preference":
        return <Heart className="w-3 h-3" />;
      case "popular":
        return <TrendingUp className="w-3 h-3" />;
      case "similar":
        return <Sparkles className="w-3 h-3" />;
      case "new":
        return <Clock className="w-3 h-3" />;
      case "behavior":
        return <Eye className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  const getTypeLabel = (type: Recommendation["type"]) => {
    switch (type) {
      case "preference":
        return t("type.preference");
      case "popular":
        return t("type.popular");
      case "similar":
        return t("type.similar");
      case "new":
        return t("type.new");
      case "behavior":
        return t("type.behavior");
      default:
        return t("type.recommended");
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product.sku_id}
            href={`/sku/${product.sku_id}`}
            className="group relative flex flex-col rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-200 overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
          >
            {/* 产品图片 */}
            <div className="relative aspect-square bg-secondary/30 overflow-hidden">
              <OptimizedImage
                src={product.image || "/placeholder-product.png"}
                alt={isEnglish ? (product.nameEn || product.name) : product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                width={300}
                height={300}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              
              {/* 推荐类型标签 */}
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-[10px] text-muted-foreground">
                {getTypeIcon(product.type)}
                <span className="hidden sm:inline">{getTypeLabel(product.type)}</span>
              </div>
            </div>

            {/* 产品信息 */}
            <div className="flex flex-col flex-1 p-3 space-y-2">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wide">
                  {product.brand}
                </p>
                <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {isEnglish ? (product.nameEn || product.name) : product.name}
                </h3>
              </div>

              {/* 价格 */}
              {product.packPrice && (
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-foreground">
                    ¥{typeof product.packPrice === "number" ? product.packPrice.toFixed(0) : product.packPrice}
                  </span>
                  <span className="text-xs text-muted-foreground">/包</span>
                </div>
              )}

              {/* 推荐原因 */}
              {showReason && product.reasons && product.reasons.length > 0 && (
                <div className="pt-2 mt-auto">
                  <p className="text-[10px] text-muted-foreground/60 line-clamp-2">
                    {product.reasons[0]}
                  </p>
                </div>
              )}
            </div>

            {/* 悬停效果 */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl pointer-events-none transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
