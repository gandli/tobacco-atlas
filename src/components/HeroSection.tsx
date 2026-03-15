"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, BookOpen, HelpCircle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { homeProductStats } from "@/data/home-catalog";
import zhCNHome from "@/locales/zh-CN/home.json";
import HowItWorksDialog from "./HowItWorksDialog";
import WhyThisExistsDialog from "./WhyThisExistsDialog";

const HeroSection = () => {
  const { t } = useTranslation("home");
  const [mounted, setMounted] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [whyThisExistsOpen, setWhyThisExistsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedProductCount = useMemo(
    () => new Intl.NumberFormat("en-US").format(homeProductStats.totalProducts),
    [],
  );

  const title = mounted ? t("title") : zhCNHome.title;
  const subtitle = mounted ? t("subtitle") : zhCNHome.subtitle;
  const browseCollectionLabel = mounted
    ? t("browseCollection")
    : zhCNHome.browseCollection;
  const howItWorksLabel = mounted ? t("howItWorks") : zhCNHome.howItWorks;
  const whyThisExistsLabel = mounted
    ? t("whyThisExists")
    : zhCNHome.whyThisExists;
  const statsLabel = mounted
    ? t("stats", {
        brands: homeProductStats.totalBrands,
        products: formattedProductCount,
      })
    : zhCNHome.stats
        .replace("{{brands}}", String(homeProductStats.totalBrands))
        .replace("{{products}}", formattedProductCount);

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-[calc(var(--nav-height)_*_12)] px-4 md:px-6 text-center">
        <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-none mb-3 md:mb-4 text-balance">
          {title}
        </h1>
        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6">
          {subtitle}
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-md">
          {statsLabel}
        </p>

        <Button
          onClick={scrollToCollection}
          variant="default"
          className="mb-6 h-11 px-8 text-sm gap-2 rounded-md"
        >
          {browseCollectionLabel}
          <ArrowDown className="w-4 h-4" />
        </Button>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={() => setHowItWorksOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-full hover:bg-secondary transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none min-w-[140px]"
          >
            <BookOpen className="w-4 h-4" />
            {howItWorksLabel}
          </button>
          <button
            onClick={() => setWhyThisExistsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-full hover:bg-secondary transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none min-w-[140px]"
          >
            <HelpCircle className="w-4 h-4" />
            {whyThisExistsLabel}
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground flex items-center gap-3">
          <a
            href="https://x.com/gandli"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors focus-visible:underline outline-none"
          >
            𝕏 by @gandli
          </a>
          <span className="opacity-30">·</span>
          <a
            href="https://github.com/gandli"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1 focus-visible:underline outline-none"
          >
            <Github className="w-3.5 h-3.5" />
            <span>by @gandli</span>
          </a>
        </p>
      </div>

      <HowItWorksDialog
        open={howItWorksOpen}
        onOpenChange={setHowItWorksOpen}
      />
      <WhyThisExistsDialog
        open={whyThisExistsOpen}
        onOpenChange={setWhyThisExistsOpen}
      />
    </>
  );
};

export default HeroSection;
