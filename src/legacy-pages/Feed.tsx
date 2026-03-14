import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import CollectionControlBar from "@/components/catalog/CollectionControlBar";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import CollectionPageHeader from "@/components/catalog/CollectionPageHeader";
import CollectionPageSurface from "@/components/catalog/CollectionPageSurface";
import FeedActivityList from "@/components/feed/FeedActivityList";
import { feedActivities } from "@/data/feed-activity";

const Feed = () => {
  const { t } = useTranslation("social");

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
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                      {t("feed.activityLabel")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {feedActivities.length}
                    </span>
                  </div>
                }
                trailing={
                  <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                    {t("feed.streamLabel")}
                  </span>
                }
              />
            </div>
            <FeedActivityList
              activities={feedActivities}
              sectionLabel={t("feed.activityLabel")}
            />
          </CollectionPageSurface>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
};

export default Feed;
