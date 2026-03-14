import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { communityUsers } from "@/data/community";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import SocialPageHero from "@/components/social/SocialPageHero";
import OptimizedImage from "@/components/OptimizedImage";

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
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
          <SocialPageHero
            eyebrow={t("community.eyebrow")}
            title={t("community.title")}
            subtitle={t("community.subtitle")}
            action={
              <Button variant="default" className="h-11 md:h-12 text-sm">
                {t("community.cta")}
              </Button>
            }
          />

          <div className="rounded-[28px] border border-border/60 bg-background/70 p-4 md:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">

          <div className="flex gap-1 mb-4 md:mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
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
                className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                  tab === tabOption.key
                    ? "bg-foreground text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tabOption.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2">
            {sorted.map((user, i) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <span className="text-xs md:text-sm text-muted-foreground w-5 md:w-6 text-right flex-shrink-0">
                  {i + 1}
                </span>

                {user.avatar ? (
                  <OptimizedImage
                    src={user.avatar}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                    sizes="40px"
                  />
                ) : (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-xs md:text-sm font-semibold flex-shrink-0">
                    {user.username[0].toUpperCase()}
                  </div>
                )}

                <span className="font-medium text-sm text-foreground flex-1 truncate">
                  @{user.username}
                </span>

                <div className="flex gap-3 md:gap-4 text-right flex-shrink-0">
                  <div>
                    <div className="text-xs md:text-sm font-semibold text-foreground">
                      {user.brands}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-muted-foreground">
                      {t("community.brands")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-semibold text-foreground">
                      {user.tried}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-muted-foreground">
                      {t("community.tried")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-semibold text-destructive">
                      {user.fav}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-muted-foreground">{t("community.favorited")}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Community;
