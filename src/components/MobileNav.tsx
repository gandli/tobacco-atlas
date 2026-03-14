"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Building2,
  Factory,
  Users,
  MessageCircle,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { isPathActive, primaryNavigationItems } from "@/lib/routing/navigation";

const iconMap = {
  collection: LayoutGrid,
  brands: Building2,
  manufacturers: Factory,
  community: Users,
  chat: MessageCircle,
  my: User,
};

const MobileNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation("nav");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {primaryNavigationItems.map((tab) => {
          const isActive = isPathActive(pathname, tab.path);
          const Icon = iconMap[tab.key as keyof typeof iconMap];
          return (
            <Link
              key={tab.path}
              href={tab.path}
              aria-label={t(tab.key)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors focus-visible:bg-accent outline-none rounded-md ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{t(tab.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
