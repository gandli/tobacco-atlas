"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Building2, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";
import { manufacturers } from '@/data/manufacturers';
import type { Manufacturer } from '@/data/types';
import { isEnglishLanguage } from "@/lib/i18n-utils";

/**
 * 获取制造商的地区分类
 * 根据名称特征判断
 */
function getManufacturerRegion(name: string): string {
  if (name.includes('高希霸') || name.includes('Pianissimo') || name.includes('七星')) {
    return 'international';
  }
  return 'mainland';
}

/**
 * 区域标签映射
 */
const regionLabels: Record<string, { zh: string; en: string }> = {
  mainland: { zh: '中国大陆', en: 'Mainland China' },
  international: { zh: '国际/其他', en: 'International' },
};

/**
 * 根据品牌数量对制造商排序
 */
function sortByBrandCount(a: Manufacturer, b: Manufacturer): number {
  return b.brands.length - a.brands.length;
}

/**
 * 制造商卡片组件
 */
interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  index: number;
  isEnglish: boolean;
}

function ManufacturerCard({ manufacturer, index, isEnglish }: ManufacturerCardProps) {
  const { t } = useTranslation("manufacturers");
  const region = getManufacturerRegion(manufacturer.name);
  const regionLabel = regionLabels[region] || regionLabels.mainland;

  return (
    <Link
      href={`/maker/${encodeURIComponent(manufacturer.name)}`}
      className="block group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card className="h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-serif text-ash group-hover:text-gold transition-colors line-clamp-2 leading-tight">
              {manufacturer.name}
            </CardTitle>
            <div className="flex-shrink-0">
              <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* 品牌标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {manufacturer.brands.slice(0, 4).map((brand) => (
              <Badge
                key={brand}
                variant="secondary"
                className="text-xs font-normal px-2 py-0.5 bg-muted/50 hover:bg-gold/10 hover:text-gold transition-colors"
              >
                {brand}
              </Badge>
            ))}
            {manufacturer.brands.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs font-normal px-2 py-0.5"
              >
                +{manufacturer.brands.length - 4}
              </Badge>
            )}
          </div>

          {/* 底部信息 */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground text-xs">
              {isEnglish ? regionLabel.en : regionLabel.zh}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-gold/5 hover:bg-gold/10 hover:text-gold border-gold/20"
            >
              {t("card.brandsCount", { count: manufacturer.brands.length })}
            </Button>
          </div>
        </CardContent>

        {/* 装饰性渐变 */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gold/5 to-transparent rounded-tl-full translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
      </Card>
    </Link>
  );
}

/**
 * 空状态组件
 */
function EmptyState({ hasFilter }: { hasFilter: boolean }) {
  const { t } = useTranslation("manufacturers");

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-lg">
        {hasFilter ? t("empty.filteredTitle") : t("empty.defaultTitle")}
      </p>
      <p className="text-muted-foreground/60 text-sm mt-2">
        {hasFilter ? t("empty.filteredDescription") : t("empty.defaultDescription")}
      </p>
    </div>
  );
}

/**
 * 统计信息组件
 */
interface StatsProps {
  total: number;
  filtered: number;
  searchTerm: string;
  regionFilter: string;
}

function Stats({ total, filtered, searchTerm, regionFilter }: StatsProps) {
  const { t } = useTranslation("manufacturers");
  const hasFilter = searchTerm || regionFilter !== 'all';

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>
        {hasFilter
          ? t("stats.filtered", { filtered, total })
          : t("stats.all", { total })}
      </span>
      {hasFilter && (
        <Badge variant="secondary" className="text-xs">
          {t("stats.filteredBadge")}
        </Badge>
      )}
    </div>
  );
}

export default function ManufacturerList() {
  const { t, i18n } = useTranslation("manufacturers");
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('brands');
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);

  // 过滤和排序后的制造商列表
  const filteredManufacturers = useMemo(() => {
    // 过滤掉无效制造商（名称包含"未知"或空名称）
    let result = manufacturers.filter(
      (m) => m.name && !m.name.includes('未知')
    );

    // 搜索过滤
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.brands.some((b) => b.toLowerCase().includes(term))
      );
    }

    // 地区过滤
    if (regionFilter !== 'all') {
      result = result.filter(
        (m) => getManufacturerRegion(m.name) === regionFilter
      );
    }

    // 排序
    if (sortBy === 'brands') {
      result.sort(sortByBrandCount);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    } else if (sortBy === 'products') {
      result.sort((a, b) => b.productIds.length - a.productIds.length);
    }

    return result;
  }, [searchTerm, regionFilter, sortBy]);

  // 清除所有筛选
  const clearFilters = () => {
    setSearchTerm('');
    setRegionFilter('all');
  };

  const hasActiveFilters = Boolean(searchTerm) || regionFilter !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame>
          <CollectionPageHeader
            eyebrow={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
            meta={
              <Stats
                total={manufacturers.length}
                filtered={filteredManufacturers.length}
                searchTerm={searchTerm}
                regionFilter={regionFilter}
              />
            }
          />

          <CollectionPageSurface className="p-3 md:p-4">
            <CollectionControlBar
              leading={
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    className="border-border/70 bg-background/90 pl-10 pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              }
              trailing={
                <>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                      <SelectTrigger className="w-[150px] bg-background/90">
                        <SelectValue placeholder={t("filters.region")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.allRegions")}</SelectItem>
                        <SelectItem value="mainland">{t("filters.mainland")}</SelectItem>
                        <SelectItem value="international">{t("filters.international")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px] bg-background/90">
                      <SelectValue placeholder={t("filters.sort")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brands">{t("sort.brands")}</SelectItem>
                      <SelectItem value="products">{t("sort.products")}</SelectItem>
                      <SelectItem value="name">{t("sort.name")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="mr-1 h-4 w-4" />
                      {t("filters.clear")}
                    </Button>
                  )}
                </>
              }
              summary={
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                    {t("sectionLabel")}
                  </span>
                  <Stats
                    total={manufacturers.length}
                    filtered={filteredManufacturers.length}
                    searchTerm={searchTerm}
                    regionFilter={regionFilter}
                  />
                </div>
              }
            />

            <div className="mt-4 border-t border-border/50 pt-5">
              {filteredManufacturers.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredManufacturers.map((manufacturer, index) => (
                    <ManufacturerCard
                      key={manufacturer.name}
                      manufacturer={manufacturer}
                      index={index}
                      isEnglish={isEnglish}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState hasFilter={hasActiveFilters} />
              )}
            </div>
          </CollectionPageSurface>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
}
