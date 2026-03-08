import { Button } from "@/components/ui/button";

const navItems = ["Collection", "Brands", "Community", "Feed"];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[var(--nav-height)] bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center gap-2">
        <span className="text-lg">🚬</span>
        <span className="font-medium text-sm tracking-tight text-foreground">ciggies.app</span>
      </div>
      
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item, i) => (
          <button
            key={item}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              i === 0
                ? "bg-foreground text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <Button variant="default" size="sm" className="text-xs h-8 px-4">
        Sign In
      </Button>
    </nav>
  );
};

export default Navbar;
