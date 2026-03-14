"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MessageCircle, UserCircle2 } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuthStatus } from "@/lib/auth/useAuthStatus";
import {
  isPathActive,
  primaryNavigationItems,
  secondaryNavigationItems,
} from "@/lib/routing/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { t } = useTranslation("nav");
  const { isLoggedIn } = useAuthStatus();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[var(--nav-height)] bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg outline-none"
      >
        <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-13 font-bold leading-none select-none">
            烟
          </span>
        </div>
        <span className="font-medium text-sm tracking-tight text-foreground hidden sm:inline">
          Chinese Cigarette Museum
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
        {primaryNavigationItems.map((item) => {
          const isActive = isPathActive(pathname, item.path);
          return (
            <Link
              key={item.key}
              href={item.path}
              className={`inline-flex items-center justify-center h-8 px-3 text-sm rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
              aria-current={isActive ? "page" : undefined}
              suppressHydrationWarning
            >
              {t(item.key)}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden lg:flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-1 py-1">
          {secondaryNavigationItems.map((item) => {
            const isActive = isPathActive(pathname, item.path);
            return (
              <Link
                key={item.key}
                href={item.path}
                className={`inline-flex items-center justify-center h-8 px-3 text-sm rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
                aria-current={isActive ? "page" : undefined}
                suppressHydrationWarning
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>
        <Link
          href="/chat"
          aria-label={t("openChat")}
          className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
          suppressHydrationWarning
        >
          <MessageCircle className="h-4 w-4" />
        </Link>
        <LanguageSwitcher />
        <ThemeToggle />
        {isLoggedIn ? (
          <Link
            href="/my"
            className="hidden sm:inline-flex items-center justify-center gap-1 rounded-full border border-border/60 px-3 h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
            suppressHydrationWarning
          >
            <UserCircle2 className="h-3.5 w-3.5" />
            {t("my")}
          </Link>
        ) : null}
        <Link href="/login" className="inline-flex items-center justify-center h-8" suppressHydrationWarning>
          <Button variant="default" size="sm" className="text-xs h-full px-4" suppressHydrationWarning>
            {t("signIn")}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
