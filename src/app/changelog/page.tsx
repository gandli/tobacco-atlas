"use client";

import { useTranslation } from "react-i18next";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";
import { Badge } from "@/components/ui/badge";
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

export default function ChangelogPage() {
  const { t, i18n } = useTranslation("changelog");

  const changeTypeConfig: Record<
    ChangeType,
    { icon: string; label: string; variant: "default" | "secondary" | "destructive" | "outline" }
  > = {
    feature: { icon: "✅", label: t("types.feature"), variant: "default" },
    fix: { icon: "🐛", label: t("types.fix"), variant: "secondary" },
    improvement: { icon: "🚀", label: t("types.improvement"), variant: "outline" },
    breaking: { icon: "⚠️", label: t("types.breaking"), variant: "destructive" },
    docs: { icon: "📝", label: t("types.docs"), variant: "outline" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame>
          <CollectionPageHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            meta={<span>{changelogData.length}</span>}
          />

          <CollectionPageSurface className="p-3 md:p-4">
            <CollectionControlBar
              leading={
                <span className="rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                  {t("timelineLabel")}
                </span>
              }
              trailing={
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                  {t("releaseLabel")}
                </span>
              }
              summary={
                <div className="flex items-center justify-between gap-3">
                  <span>{changelogData[0]?.version}</span>
                  <span>{changelogData[0]?.date}</span>
                </div>
              }
            />

            <div className="mt-4 border-t border-border/50 pt-5 space-y-6">
              {changelogData.map((version) => (
                <section
                  key={version.version}
                  className="overflow-hidden rounded-[24px] border border-border/60 bg-background/70"
                >
                  <header className="border-b border-border/50 bg-muted/40 px-4 py-4 md:px-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                          {t("releaseLabel")}
                        </p>
                        <h2 className="text-xl font-semibold">{version.version}</h2>
                      </div>
                      <time className="text-sm text-muted-foreground" dateTime={version.date}>
                        {version.date}
                      </time>
                    </div>
                  </header>
                  <div className="px-4 py-4 md:px-5">
                    <ul className="space-y-3">
                      {version.changes.map((change, index) => {
                        const config = changeTypeConfig[change.type];
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <Badge variant={config.variant} className="mt-0.5 shrink-0">
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
                  </div>
                </section>
              ))}
            </div>
          </CollectionPageSurface>

          <p className="text-center text-muted-foreground text-sm mt-8">
            {t("footer")}
          </p>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
}
