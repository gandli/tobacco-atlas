import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("nav");

  const navItems = [
    { label: t("collection"), path: "/" },
    { label: t("brands"), path: "/brands" },
    { label: t("manufacturers"), path: "/manufacturers" },
    { label: t("community"), path: "/community" },
    { label: t("chat"), path: "/chat" },
    { label: t("my"), path: "/my" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[var(--nav-height)] bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg outline-none"
      >
        <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
          <span className="text-primary-foreground text-13 font-bold leading-none select-none">
            烟
          </span>
        </div>
        <span className="font-medium text-sm tracking-tight text-foreground hidden sm:inline">
          Chinese Cigarette Museum
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
        <Link to="/login">
          <Button variant="default" size="sm" className="text-xs h-8 px-4">
            {t("signIn")}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
