"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import ProductGrid, { productGridLayoutClassName, productGridSectionClassName } from "@/components/ProductGrid";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import type { HomeProductSummary } from "@/data/home-catalog";
import {
  getAvailableFormatKeys,
  getVisibleProductCollection,
  type ProductBrowseFormat,
  type ProductBrowseItem,
  type ProductBrowseRegion,
  type ProductBrowseSort,
} from "@/lib/product-browser";
import { cn } from "@/lib/utils";

const APPEND_DELAY_MS = 150;

interface ProductCollectionBrowserProps<T extends ProductBrowseItem> {
  products: T[];
  sectionId?: string;
  className?: string;
  enableInfiniteScroll?: boolean;
  initialCount?: number;
  batchSize?: number;
  emptyMessage?: string;
  loadMoreHint?: string;
  loadingMoreLabel?: string;
  endOfCollectionLabel?: (count: number) => string;
}

const regionKeys: ProductBrowseRegion[] = ["all", "mainland", "hkmo", "international"];
const sortKeys: ProductBrowseSort[] = ["newest", "price-asc", "price-desc", "name"];

function getSortTranslationKey(sortKey: ProductBrowseSort) {
  switch (sortKey) {
    case "price-asc":
      return "priceAsc";
    case "price-desc":
      return "priceDesc";
    default:
      return sortKey;
  }
}

export default function ProductCollectionBrowser<T extends ProductBrowseItem & HomeProductSummary>({
  products,
  sectionId = "collection",
  className,
  enableInfiniteScroll = false,
  initialCount = 16,
  batchSize = 16,
  emptyMessage,
  loadMoreHint,
  loadingMoreLabel,
  endOfCollectionLabel,
}: ProductCollectionBrowserProps<T>) {
  const translation = useTranslation(["common", "home"]);
  const { t } = translation;
  const resolvedLanguage = translation.i18n?.resolvedLanguage || "zh-CN";
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<ProductBrowseRegion>("all");
  const [format, setFormat] = useState<ProductBrowseFormat>("all");
  const [sort, setSort] = useState<ProductBrowseSort>("newest");
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, products.length));
  const [isAppending, setIsAppending] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const formatKeys = useMemo(() => getAvailableFormatKeys(products), [products]);
  const filteredProducts = useMemo(
    () =>
      getVisibleProductCollection(products, {
        search,
        region,
        format,
        sort,
        language: resolvedLanguage,
      }),
    [products, search, region, format, sort, resolvedLanguage],
  );

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, filteredProducts.length));
  }, [filteredProducts.length, initialCount, search, region, format, sort]);

  const hasMore = enableInfiniteScroll && visibleCount < filteredProducts.length;
  const visibleProducts = enableInfiniteScroll
    ? filteredProducts.slice(0, visibleCount)
    : filteredProducts;

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
          Math.min(current + batchSize, filteredProducts.length),
        );
        setIsAppending(false);
      }, APPEND_DELAY_MS);
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [batchSize, filteredProducts.length, hasMore, isAppending]);

  const controlBar = (
    <CollectionControlBar
      className="mb-6 md:mb-8"
      leading={
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block min-w-0 lg:max-w-[22rem] lg:flex-[1.2]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              aria-label="search-products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("common.productBrowser.searchPlaceholder")}
              className="h-12 w-full rounded-full border border-border/70 bg-background/90 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
              type="search"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="region-filter"
              value={region}
              onChange={(event) => setRegion(event.target.value as ProductBrowseRegion)}
              className="h-11 rounded-full border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
            >
              {regionKeys.map((key) => (
                <option key={key} value={key}>
                  {t(`common.productBrowser.region.${key}`)}
                </option>
              ))}
            </select>
            <select
              aria-label="format-filter"
              value={format}
              onChange={(event) => setFormat(event.target.value as ProductBrowseFormat)}
              className="h-11 rounded-full border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
            >
              <option value="all">{t("common.productBrowser.format.all")}</option>
              {formatKeys.map((key) => (
                <option key={key} value={key}>
                  {t(`common.productBrowser.format.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      }
      trailing={
        <select
          aria-label="sort-products"
          value={sort}
          onChange={(event) => setSort(event.target.value as ProductBrowseSort)}
          className="h-11 rounded-full border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
        >
          {sortKeys.map((key) => (
            <option key={key} value={key}>
              {t(`common.productBrowser.sort.${getSortTranslationKey(key)}`)}
            </option>
          ))}
        </select>
      }
      summary={
        <span>
          {t("common.productBrowser.results")} {visibleProducts.length}
        </span>
      }
    />
  );

  if (filteredProducts.length === 0) {
    return (
      <section
        id={sectionId}
        className={cn(productGridSectionClassName, className)}
      >
        {controlBar}
        <div className="rounded-[24px] border border-dashed border-border/70 bg-secondary/20 px-6 py-16 text-center text-sm text-muted-foreground">
          {emptyMessage || t("common.productBrowser.empty")}
        </div>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className={cn(productGridSectionClassName, className)}
    >
      {controlBar}
      <ProductGrid products={visibleProducts} sectionId={`${sectionId}-grid`} className="px-0 pb-0 pt-0 max-w-none" />
      {hasMore ? (
        <div className="pb-20 pt-6" data-testid="home-product-sentinel-wrapper">
          <div className="flex items-center justify-center pb-4 text-sm text-muted-foreground">
            {isAppending
              ? loadingMoreLabel || t("home.loadingMore")
              : loadMoreHint || t("home.loadMoreHint")}
          </div>
          {isAppending ? (
            <div className={productGridLayoutClassName}>
              {Array.from({ length: Math.min(batchSize, filteredProducts.length - visibleCount) }).map(
                (_, index) => (
                  <ProductCardSkeleton key={index} index={index} />
                ),
              )}
            </div>
          ) : null}
          <div ref={sentinelRef} aria-hidden="true" className="h-8" />
        </div>
      ) : enableInfiniteScroll ? (
        <div className="pb-20 pt-6 text-center text-sm text-muted-foreground">
          {endOfCollectionLabel
            ? endOfCollectionLabel(visibleProducts.length)
            : t("home.endOfCollection", { count: visibleProducts.length })}
        </div>
      ) : null}
    </section>
  );
}
