import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { User, Heart, Star, Check, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-md mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Avatar & Username */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Not signed in</p>
            <Button variant="default" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl border border-border">
              <Heart className="w-5 h-5 text-destructive" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">Favorites</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl border border-border">
              <Check className="w-5 h-5 text-foreground" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">Tried</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl border border-border">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground">Wishlist</span>
            </div>
          </div>

          {/* Empty state */}
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">
              Sign in to track your collection
            </p>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Feed;
