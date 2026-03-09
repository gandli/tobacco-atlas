import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Building2,
  Factory,
  Users,
  MessageCircle,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileNav = () => {
  const location = useLocation();
  const { t } = useTranslation("nav");

  const tabs = [
    { label: t("collection"), path: "/", icon: LayoutGrid },
    { label: t("brands"), path: "/brands", icon: Building2 },
    { label: t("manufacturers"), path: "/manufacturers", icon: Factory },
    { label: t("community"), path: "/community", icon: Users },
    { label: t("chat"), path: "/chat", icon: MessageCircle },
    { label: t("my"), path: "/my", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            (tab.path !== "/" && location.pathname.startsWith(tab.path));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              aria-label={tab.label}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors focus-visible:bg-accent outline-none rounded-md ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
