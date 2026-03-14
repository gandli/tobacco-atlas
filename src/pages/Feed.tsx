import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { User, Heart, Star, Check, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import SocialPageHero from "@/components/social/SocialPageHero";
import SocialEmptyPanel from "@/components/social/SocialEmptyPanel";

const Feed = () => {
  const { t } = useTranslation("social");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
          <SocialPageHero
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

          <div className="rounded-[28px] border border-border/60 bg-background/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t("feed.notSignedIn")}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center gap-1 p-4 rounded-2xl border border-border bg-secondary/20">
              <Heart className="w-5 h-5 text-destructive" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">{t("feed.favorites")}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-4 rounded-2xl border border-border bg-secondary/20">
              <Check className="w-5 h-5 text-foreground" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">{t("feed.tried")}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-4 rounded-2xl border border-border bg-secondary/20">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">{t("feed.wishlist")}</span>
              </div>
            </div>

            <SocialEmptyPanel
              title={t("feed.empty")}
              description={t("feed.helper")}
              action={
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  {t("feed.signIn")}
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Feed;
