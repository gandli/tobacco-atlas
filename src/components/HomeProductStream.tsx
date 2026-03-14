"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { HomeProductSummary } from "@/data/home-catalog";
import ProductGrid from "@/components/ProductGrid";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

interface HomeProductStreamProps {
  products: HomeProductSummary[];
  initialCount?: number;
  batchSize?: number;
}

const APPEND_DELAY_MS = 150;

export default function HomeProductStream({
  products,
  initialCount = 16,
  batchSize = 16,
}: HomeProductStreamProps) {
  const { t } = useTranslation("home");
  const [visibleCount, setVisibleCount] = useState(
    Math.min(initialCount, products.length),
  );
  const [isAppending, setIsAppending] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (!entry?.isIntersecting || isAppending) {
        return;
      }

      setIsAppending(true);

      window.setTimeout(() => {
        setVisibleCount((current) =>
          Math.min(current + batchSize, products.length),
        );
        setIsAppending(false);
      }, APPEND_DELAY_MS);
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [batchSize, hasMore, isAppending, products.length]);

  return (
    <div>
      <ProductGrid products={visibleProducts} />
      {hasMore ? (
        <div className="mx-auto max-w-[1600px] px-4 pb-20 md:px-8" data-testid="home-product-sentinel-wrapper">
          <div className="flex items-center justify-center pb-4 text-sm text-muted-foreground">
            {isAppending ? t("loadingMore") : t("loadMoreHint")}
          </div>
          {isAppending ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 md:gap-8">
              {Array.from({ length: Math.min(batchSize, products.length - visibleCount) }).map(
                (_, index) => (
                  <ProductCardSkeleton key={index} index={index} />
                ),
              )}
            </div>
          ) : null}
          <div ref={sentinelRef} aria-hidden="true" className="h-8" />
        </div>
      ) : (
        <div className="mx-auto max-w-[1600px] px-4 pb-20 text-center text-sm text-muted-foreground md:px-8">
          {t("endOfCollection", { count: visibleProducts.length })}
        </div>
      )}
    </div>
  );
}
