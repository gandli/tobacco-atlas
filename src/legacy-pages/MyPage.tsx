import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  User, 
  Heart, 
  History, 
  Settings, 
  LogIn, 
  PlusCircle,
  FileText,
  Bell
} from "lucide-react";
import SocialPageHero from "@/components/social/SocialPageHero";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";

const MyPage = () => {
  const { t } = useTranslation("account");
  // TODO: Replace with actual authentication state
  const isLoggedIn = false;

  const menuItems = [
    {
      icon: Heart,
      label: t("menu.favorites.label"),
      description: t("menu.favorites.description"),
      href: "/my/favorites",
      color: "text-red-500"
    },
    {
      icon: History,
      label: t("menu.history.label"),
      description: t("menu.history.description"),
      href: "/my/history",
      color: "text-blue-500"
    },
    {
      icon: PlusCircle,
      label: t("menu.submissions.label"),
      description: t("menu.submissions.description"),
      href: "/my/submissions",
      color: "text-green-500"
    },
    {
      icon: Bell,
      label: t("menu.notifications.label"),
      description: t("menu.notifications.description"),
      href: "/my/notifications",
      color: "text-yellow-500"
    },
    {
      icon: Settings,
      label: t("menu.settings.label"),
      description: t("menu.settings.description"),
      href: "/my/settings",
      color: "text-gray-500"
    },
    {
      icon: FileText,
      label: t("menu.changelog.label"),
      description: t("menu.changelog.description"),
      href: "/changelog",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame className="space-y-6">
          <SocialPageHero
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          {!isLoggedIn ? (
            <Card className="max-w-md rounded-[28px] border-border/60 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t("loginCardTitle")}
                </CardTitle>
                <CardDescription>
                  {t("loginCardDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Link to="/login">
                    <Button className="w-full">
                      <LogIn className="w-4 h-4 mr-2" />
                      {t("login")}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="w-full">
                      {t("register")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} to={item.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className={`w-5 h-5 ${item.color}`} />
                          {item.label}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">{t("quickActions")}</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/submit">
                <Button variant="outline" size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  {t("submitData")}
                </Button>
              </Link>
              <Link to="/brands">
                <Button variant="outline" size="sm">
                  {t("browseBrands")}
                </Button>
              </Link>
              <Link to="/manufacturers">
                <Button variant="outline" size="sm">
                  {t("browseManufacturers")}
                </Button>
              </Link>
            </div>
          </div>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </div>
  );
};

export default MyPage;
