import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const MyPage = () => {
  // TODO: Replace with actual authentication state
  const isLoggedIn = false;

  const menuItems = [
    {
      icon: Heart,
      label: "我的收藏",
      description: "收藏的品牌和产品",
      href: "/my/favorites",
      color: "text-red-500"
    },
    {
      icon: History,
      label: "浏览历史",
      description: "最近浏览的记录",
      href: "/my/history",
      color: "text-blue-500"
    },
    {
      icon: PlusCircle,
      label: "我的提交",
      description: "提交的数据和审核状态",
      href: "/my/submissions",
      color: "text-green-500"
    },
    {
      icon: Bell,
      label: "通知设置",
      description: "管理通知偏好",
      href: "/my/notifications",
      color: "text-yellow-500"
    },
    {
      icon: Settings,
      label: "账户设置",
      description: "个人信息和安全设置",
      href: "/my/settings",
      color: "text-gray-500"
    },
    {
      icon: FileText,
      label: "更新日志",
      description: "查看最新版本更新",
      href: "/changelog",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            My Account
          </h1>

          {!isLoggedIn ? (
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  登录账户
                </CardTitle>
                <CardDescription>
                  登录后可以收藏品牌、提交数据、参与社区讨论
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Link to="/login">
                    <Button className="w-full">
                      <LogIn className="w-4 h-4 mr-2" />
                      登录
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="w-full">
                      注册新账户
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
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">快速操作</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/submit">
                <Button variant="outline" size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  提交数据
                </Button>
              </Link>
              <Link to="/brands">
                <Button variant="outline" size="sm">
                  浏览品牌
                </Button>
              </Link>
              <Link to="/manufacturers">
                <Button variant="outline" size="sm">
                  浏览制造商
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default MyPage;