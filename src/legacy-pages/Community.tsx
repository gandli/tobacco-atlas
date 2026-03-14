import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { communityUsers } from "@/data/community";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import OptimizedImage from "@/components/OptimizedImage";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";

type Tab = "collectors" | "most_tried" | "most_favorited";

const Community = () => {
  const { t } = useTranslation("social");
  const [tab, setTab] = useState<Tab>("collectors");

  const sorted = [...communityUsers].sort((a, b) => {
    if (tab === "most_tried") return b.tried - a.tried;
    if (tab === "most_favorited") return b.fav - a.fav;
    return b.tried - a.tried;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame className="space-y-6">
          <CollectionPageHeader
            eyebrow={t("community.eyebrow")}
            title={t("community.title")}
            subtitle={t("community.subtitle")}
            action={
              <Button variant="default" className="h-10 text-sm">
                {t("community.cta")}
              </Button>
            }
            meta={<span>{sorted.length}</span>}
          />

          <CollectionPageSurface className="p-3 md:p-4">
            <CollectionControlBar
              leading={
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {(
                    [
                      { key: "collectors", label: t("community.collectors") },
                      { key: "most_tried", label: t("community.mostTried") },
                      { key: "most_favorited", label: t("community.mostFavorited") },
                    ] as const
                  ).map((tabOption) => (
                    <button
                      key={tabOption.key}
                      onClick={() => setTab(tabOption.key)}
                      className={`rounded-full px-3 py-1.5 text-xs transition-colors whitespace-nowrap md:px-4 md:py-2 md:text-sm ${
                        tab === tabOption.key
                          ? "bg-foreground text-primary-foreground"
                          : "bg-background/80 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tabOption.label}
                    </button>
                  ))}
                </div>
              }
              trailing={
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                  {t("community.streamLabel")}
                </span>
              }
              summary={
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                    {t("community.sectionLabel")}
                  </span>
                  <span>{sorted.length}</span>
                </div>
              }
            />

            <div className="mt-4 border-t border-border/50 pt-5">
              <div className="flex flex-col gap-1.5 md:gap-2">
                {sorted.map((user, i) => (
                  <div
                    key={user.id}
                    data-testid={`community-row-${user.id}`}
                    className="museum-inline-panel flex items-center gap-3 px-3 py-2.5 transition-colors cursor-pointer hover:bg-secondary/50 md:px-4 md:py-3"
                  >
                    <span className="w-5 flex-shrink-0 text-right text-xs text-muted-foreground md:w-6 md:text-sm">
                      {i + 1}
                    </span>

                    {user.avatar ? (
                      <OptimizedImage
                        src={user.avatar}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="h-8 w-8 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-primary-foreground md:h-10 md:w-10 md:text-sm">
                        {user.username[0].toUpperCase()}
                      </div>
                    )}

                    <span className="flex-1 truncate text-sm font-medium text-foreground">
                      @{user.username}
                    </span>

                    <div className="flex flex-shrink-0 gap-3 text-right md:gap-4">
                      <div>
                        <div className="text-xs font-semibold text-foreground md:text-sm">
                          {user.brands}
                        </div>
                        <div className="text-[9px] text-muted-foreground md:text-[10px]">
                          {t("community.brands")}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground md:text-sm">
                          {user.tried}
                        </div>
                        <div className="text-[9px] text-muted-foreground md:text-[10px]">
                          {t("community.tried")}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-destructive md:text-sm">
                          {user.fav}
                        </div>
                        <div className="text-[9px] text-muted-foreground md:text-[10px]">
                          {t("community.favorited")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollectionPageSurface>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
};

export default Community;
