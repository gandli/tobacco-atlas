import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Collection", path: "/" },
  { label: "Brands", path: "/brands" },
  { label: "Community", path: "/community" },
  { label: "Chat", path: "/chat" },
  { label: "My", path: "/my" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[var(--nav-height)] bg-background/80 backdrop-blur-md border-b border-border/50">
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <span className="text-lg">🚬</span>
        <span className="font-medium text-sm tracking-tight text-foreground">ciggies.app</span>
      </button>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <Button variant="default" size="sm" className="text-xs h-8 px-4 hidden md:inline-flex">
        Sign In
      </Button>

      {/* Mobile: Sign In only */}
      <Button variant="default" size="sm" className="text-xs h-8 px-4 md:hidden">
        Sign In
      </Button>
    </nav>
  );
};

export default Navbar;
