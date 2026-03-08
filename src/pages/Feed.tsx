import Navbar from "@/components/Navbar";
import { feedItems } from "@/data/products";
import { Check, Heart, Star } from "lucide-react";

const actionIcons = {
  tried: <Check className="w-3.5 h-3.5 text-muted-foreground" />,
  wishlisted: <Star className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />,
  favorited: <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />,
};

const actionColors = {
  tried: "text-foreground",
  wishlisted: "text-amber-600",
  favorited: "text-destructive",
};

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Community Feed
          </h1>
          <p className="text-muted-foreground mb-8">
            Recent activity from the community
          </p>

          <div className="flex flex-col gap-2">
            {feedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.username}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {item.username[0].toUpperCase()}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      @{item.username}
                    </span>
                    <span className={`text-sm ${actionColors[item.action]}`}>
                      {item.action}
                    </span>
                    <span className="text-sm text-foreground truncate">
                      {item.productName}
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      · {item.productNameEn}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.timeAgo}
                  </span>
                </div>

                {/* Action icon */}
                <div className="flex-shrink-0">{actionIcons[item.action]}</div>

                {/* Product image */}
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
