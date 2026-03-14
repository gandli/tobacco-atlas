import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/lib/i18n-utils";

type ChangeType = "feature" | "fix" | "improvement" | "breaking" | "docs";

interface ChangeItem {
  type: ChangeType;
  descriptionZh: string;
  descriptionEn: string;
}

interface Version {
  version: string;
  date: string;
  changes: ChangeItem[];
}

const changelogData: Version[] = [
  {
    version: "v1.2.0",
    date: "2026-03-08",
    changes: [
      { type: "feature", descriptionZh: "新增品牌详情页面的图片画廊功能", descriptionEn: "Added gallery support to brand detail pages" },
      { type: "feature", descriptionZh: "支持用户收藏品牌和 SKU", descriptionEn: "Added brand and SKU favorites" },
      { type: "improvement", descriptionZh: "优化移动端导航体验", descriptionEn: "Improved the mobile navigation experience" },
      { type: "fix", descriptionZh: "修复图片加载失败时的占位显示问题", descriptionEn: "Fixed broken-image placeholder handling" },
      { type: "fix", descriptionZh: "修复搜索结果分页不正确的问题", descriptionEn: "Fixed incorrect pagination in search results" },
    ],
  },
  {
    version: "v1.1.0",
    date: "2026-02-20",
    changes: [
      { type: "feature", descriptionZh: "新增社区讨论功能", descriptionEn: "Added community discussions" },
      { type: "feature", descriptionZh: "新增实时聊天室", descriptionEn: "Added the real-time chat room" },
      { type: "improvement", descriptionZh: "重构品牌列表页面，提升加载速度", descriptionEn: "Refactored the brand list page for faster loading" },
      { type: "improvement", descriptionZh: "优化图片懒加载策略", descriptionEn: "Improved the image lazy-loading strategy" },
      { type: "fix", descriptionZh: "修复用户登录状态丢失的问题", descriptionEn: "Fixed login state persistence issues" },
      { type: "docs", descriptionZh: "更新 API 文档", descriptionEn: "Updated the API documentation" },
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-01-15",
    changes: [
      { type: "feature", descriptionZh: "品牌数据库首次发布", descriptionEn: "Initial release of the brand database" },
      { type: "feature", descriptionZh: "支持品牌搜索和筛选", descriptionEn: "Added brand search and filtering" },
      { type: "feature", descriptionZh: "品牌详情页面展示", descriptionEn: "Added brand detail pages" },
      { type: "feature", descriptionZh: "SKU 信息展示", descriptionEn: "Added SKU detail views" },
      { type: "feature", descriptionZh: "生产厂家信息页面", descriptionEn: "Added manufacturer information pages" },
      { type: "improvement", descriptionZh: "响应式设计，支持移动端访问", descriptionEn: "Added responsive support for mobile devices" },
    ],
  },
];

const Changelog = () => {
  const { t, i18n } = useTranslation('changelog');

  const changeTypeConfig: Record<ChangeType, { icon: string; label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    feature: { icon: "✅", label: t('types.feature'), variant: "default" },
    fix: { icon: "🐛", label: t('types.fix'), variant: "secondary" },
    improvement: { icon: "🚀", label: t('types.improvement'), variant: "outline" },
    breaking: { icon: "⚠️", label: t('types.breaking'), variant: "destructive" },
    docs: { icon: "📝", label: t('types.docs'), variant: "outline" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* 主标题 */}
          <h1 className="text-3xl font-bold text-center mb-8">{t('title')}</h1>

          {/* 版本列表 */}
          <div className="space-y-6">
            {changelogData.map((version) => (
              <Card key={version.version} className="overflow-hidden">
                <CardHeader className="bg-muted/50 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl font-semibold">{version.version}</h2>
                    <time className="text-sm text-muted-foreground" dateTime={version.date}>
                      {version.date}
                    </time>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {version.changes.map((change, index) => {
                      const config = changeTypeConfig[change.type];
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <Badge variant={config.variant} className="shrink-0 mt-0.5">
                            <span className="mr-1">{config.icon}</span>
                            {config.label}
                          </Badge>
                          <span className="text-sm leading-relaxed">
                            {getLocalizedText({
                              language: i18n.resolvedLanguage,
                              zh: change.descriptionZh,
                              en: change.descriptionEn,
                            })}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 底部说明 */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            {t('footer')}
          </p>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Changelog;
