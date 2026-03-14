import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
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
            <FeedActivityList
              activities={feedActivities}
              sectionLabel={t("feed.activityLabel")}
            />
          </CollectionPageSurface>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Feed;
