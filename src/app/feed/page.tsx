"use client";

import { useMemo, useState } from "react";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";
import FeedActivityList from "@/components/feed/FeedActivityList";
import type { FeedEntryKind } from "@/components/feed/FeedActivityItem";
import { Button } from "@/components/ui/button";
import { feedActivities } from "@/data/feed-activity";

export default function FeedPage() {
  const { t } = useTranslation("social");
  const [activeFilter, setActiveFilter] = useState<"all" | FeedEntryKind>("all");

  const filteredActivities = useMemo(() => {
    if (activeFilter === "all") {
      return feedActivities;
    }

    return feedActivities.filter((activity) => activity.kind === activeFilter);
  }, [activeFilter]);

  const filters = [
    { key: "all", label: t("feed.all") },
    { key: "maker", label: t("feed.makers") },
    { key: "brand", label: t("feed.brands") },
    { key: "product", label: t("feed.products") },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame>
          <CollectionPageHeader
            eyebrow={t("feed.eyebrow")}
            title={t("feed.title")}
            subtitle={t("feed.subtitle")}
            action={
              <Button variant="default" size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                {t("feed.signIn")}
              </Button>
            }
          />

          <CollectionPageSurface className="overflow-hidden">
            <div className="p-3 md:p-4">
              <CollectionControlBar
                leading={
                  <div className="flex gap-1 overflow-x-auto no-scrollbar">
                    {filters.map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`rounded-full px-3 py-1.5 text-xs transition-colors whitespace-nowrap md:px-4 md:py-2 md:text-sm ${
                          activeFilter === filter.key
                            ? "bg-foreground text-primary-foreground"
                            : "bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                }
                trailing={
                  <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                    {t("feed.streamLabel")}
                  </span>
                }
                summary={
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                      {t("feed.summaryLabel")}
                    </span>
                    <span>{filteredActivities.length}</span>
                  </div>
                }
              />
            </div>
            <FeedActivityList
              activities={filteredActivities}
              sectionLabel={t("feed.activityLabel")}
            />
          </CollectionPageSurface>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
}
