"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import OptimizedImage from "@/components/OptimizedImage";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonBrandCard } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brand-catalog";
import { regionLabels } from "@/data/region-labels";
import { isEnglishLanguage } from "@/lib/i18n-utils";

const regions = ["mainland", "hkmo", "international", "historical"] as const;

export default function BrandsPage() {
  const { t, i18n } = useTranslation(["brands", "nav"]);
  const [activeRegion, setActiveRegion] = useState<string>("mainland");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);

  // 模拟初始加载延迟，展示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredBrands = useMemo(() => {
    return brands
      .filter((b) => b.region === activeRegion)
      .filter(
        (b) =>
          !search ||
          b.name.includes(search) ||
          b.pinyin.toLowerCase().includes(search.toLowerCase()),
      );
  }, [activeRegion, search]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const region of regions) {
      counts[region] = brands.filter((brand) => brand.region === region).length;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame>
          <CollectionPageHeader
            eyebrow={t("nav:archive")}
            title={t("brands:title")}
            subtitle={t("brands:subtitle")}
            meta={<span>{filteredBrands.length} results</span>}
          />

          <CollectionPageSurface className="p-3 md:p-4">
            <CollectionControlBar
              leading={
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setActiveRegion(region)}
                      className={`px-3 py-1.5 text-xs md:text-sm rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
                        activeRegion === region
                          ? "bg-foreground text-primary-foreground border-foreground"
                          : "border-border bg-background/80 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isEnglish ? regionLabels[region].en : regionLabels[region].zh}{" "}
                      <span className="opacity-60">{regionCounts[region]}</span>
                    </button>
                  ))}
                </div>
              }
              trailing={
                <div className="relative w-full md:w-[280px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t("brands:searchPlaceholder")}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-xl border border-border/70 bg-background/90 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                </div>
              }
              summary={
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                      {t("brands:sectionLabel")}
                    </span>
                    <span className="font-semibold text-foreground text-sm md:text-base">
                      {isEnglish
                        ? regionLabels[activeRegion].en
                        : regionLabels[activeRegion].zh}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredBrands.length}
                  </span>
                </div>
              }
            />

            <div className="mt-4 flex items-center gap-3 px-1">
              <span className="font-semibold text-foreground text-sm md:text-base">
                {isEnglish
                  ? regionLabels[activeRegion].en
                  : regionLabels[activeRegion].zh}
              </span>
              <span className="text-muted-foreground text-sm">
                {filteredBrands.length}
              </span>
            </div>

            <div className="mt-4 border-t border-border/50 pt-5">
              {isLoading ? (
                // 骨架屏状态
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <SkeletonBrandCard key={i} />
                  ))}
                </div>
              ) : filteredBrands.length === 0 ? (
                // 空状态
                <EmptyState
                  type="search"
                  title="未找到品牌"
                  description={search ? `"${search}" 没有匹配的品牌，尝试其他关键词` : "该分类下暂无品牌"}
                  action={
                    search && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearch("")}
                      >
                        清除搜索
                      </Button>
                    )
                  }
                />
              ) : (
                // 品牌网格
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
                  {filteredBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brand/${brand.pinyin}`}
                      className="rounded-2xl border border-border/60 bg-card/80 p-3 md:p-4 flex flex-col items-center cursor-pointer transition-all hover:border-gold/30 hover:shadow-md"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3 flex items-center justify-center">
                        <OptimizedImage
                          src={brand.logo}
                          alt={`${brand.name} 品牌标志`}
                          width={64}
                          height={64}
                          className="max-w-full max-h-full object-contain"
                          sizes="64px"
                        />
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-xs md:text-sm font-medium text-foreground">
                            {brand.name}
                          </span>
                          <span className="text-[10px] md:text-xs text-destructive font-medium">
                            {brand.count}
                          </span>
                        </div>
                        <span className="text-[10px] md:text-xs text-muted-foreground">
                          {brand.pinyin}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </CollectionPageSurface>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
}
