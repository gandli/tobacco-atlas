import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Building2, Users, MessageCircle, User } from "lucide-react";

const tabs = [
  { label: "Collection", path: "/", icon: LayoutGrid },
  { label: "Brands", path: "/brands", icon: Building2 },
  { label: "Community", path: "/community", icon: Users },
  { label: "Chat", path: "/chat", icon: MessageCircle },
  { label: "My", path: "/feed", icon: User },
];

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
