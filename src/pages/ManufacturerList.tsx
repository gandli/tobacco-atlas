import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
import { manufacturers } from '@/data';
import type { Manufacturer } from '@/data';

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
}

function ManufacturerCard({ manufacturer, index }: ManufacturerCardProps) {
  const region = getManufacturerRegion(manufacturer.name);
  const regionLabel = regionLabels[region] || regionLabels.mainland;

  return (
    <Link
      to={`/manufacturer/${encodeURIComponent(manufacturer.name)}`}
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
              {regionLabel.zh}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-gold/5 hover:bg-gold/10 hover:text-gold border-gold/20"
            >
              {manufacturer.brands.length} 品牌
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
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-lg">
        {hasFilter ? '未找到匹配的制造商' : '暂无制造商数据'}
      </p>
      <p className="text-muted-foreground/60 text-sm mt-2">
        {hasFilter ? '尝试调整搜索条件或筛选器' : '请稍后再试'}
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
  const hasFilter = searchTerm || regionFilter !== 'all';

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>
        {hasFilter
          ? `显示 ${filtered} / ${total} 家制造商`
          : `共 ${total} 家制造商`}
      </span>
      {hasFilter && (
        <Badge variant="secondary" className="text-xs">
          已筛选
        </Badge>
      )}
    </div>
  );
}

export default function ManufacturerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('brands');

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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* 页面标题 */}
          <header className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              Manufacturers
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-ash mb-2">
              制造商名录
            </h1>
            <p className="text-muted-foreground max-w-xl">
              浏览中国烟草行业各大制造商及其旗下品牌，了解完整的产品谱系
            </p>
          </header>

          {/* 搜索和筛选栏 */}
          <div className="flex flex-col gap-4 mb-8">
            {/* 搜索框 */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索制造商或品牌..."
                className="pl-10 pr-10"
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

            {/* 筛选和排序控件 */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* 地区筛选 */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部地区</SelectItem>
                    <SelectItem value="mainland">中国大陆</SelectItem>
                    <SelectItem value="international">国际/其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 排序 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="排序" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brands">按品牌数</SelectItem>
                  <SelectItem value="products">按产品数</SelectItem>
                  <SelectItem value="name">按名称</SelectItem>
                </SelectContent>
              </Select>

              {/* 清除筛选 */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  清除筛选
                </Button>
              )}
            </div>

            {/* 统计信息 */}
            <Stats
              total={manufacturers.length}
              filtered={filteredManufacturers.length}
              searchTerm={searchTerm}
              regionFilter={regionFilter}
            />
          </div>

          {/* 制造商网格 */}
          {filteredManufacturers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredManufacturers.map((manufacturer, index) => (
                <ManufacturerCard
                  key={manufacturer.name}
                  manufacturer={manufacturer}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState hasFilter={hasActiveFilters} />
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
