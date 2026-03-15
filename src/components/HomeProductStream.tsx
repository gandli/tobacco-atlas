"use client";

import { useTranslation } from "react-i18next";

import type { HomeProductSummary } from "@/data/home-catalog";
import ProductCollectionBrowser from "@/components/ProductCollectionBrowser";

interface HomeProductStreamProps {
  products: HomeProductSummary[];
  initialCount?: number;
  batchSize?: number;
}

export default function HomeProductStream({
  products,
  initialCount = 16,
  batchSize = 16,
}: HomeProductStreamProps) {
  const { t } = useTranslation("home");
  return (
    <ProductCollectionBrowser
      products={products}
      sectionId="collection"
      enableInfiniteScroll
      initialCount={initialCount}
      batchSize={batchSize}
      loadMoreHint={t("loadMoreHint")}
      loadingMoreLabel={t("loadingMore")}
      endOfCollectionLabel={(count) => t("endOfCollection", { count })}
    />
  );
}
