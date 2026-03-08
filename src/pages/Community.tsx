import { useState } from "react";
import Navbar from "@/components/Navbar";
import { communityUsers } from "@/data/products";
import { Button } from "@/components/ui/button";

type Tab = "collectors" | "most_tried" | "most_favorited";

const Community = () => {
  const [tab, setTab] = useState<Tab>("collectors");

  const sorted = [...communityUsers].sort((a, b) => {
    if (tab === "most_tried") return b.tried - a.tried;
    if (tab === "most_favorited") return b.fav - a.fav;
    return b.tried - a.tried; // default collectors
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
          <p className="text-muted-foreground mb-6">
            Collectors with a username, ranked by packs tried.
          </p>

          <Button variant="default" className="w-full mb-8 h-12">
            Sign up to appear on the leaderboard
          </Button>

          {/* Tabs */}
          <div className="flex gap-1 mb-6">
            {(
              [
                { key: "collectors", label: "Collectors" },
                { key: "most_tried", label: "Most tried" },
                { key: "most_favorited", label: "Most favorited" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  tab === t.key
                    ? "bg-foreground text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="flex flex-col gap-2">
            {sorted.map((user, i) => (
              <div
                key={user.id}
                className="flex items-center gap-4 px-4 py-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm text-muted-foreground w-6 text-right">
                  {i + 1}
                </span>

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {user.username[0].toUpperCase()}
                  </div>
                )}

                <span className="font-medium text-foreground flex-1">
                  @{user.username}
                </span>

                <div className="flex gap-4 text-right">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {user.brands}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      brands
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {user.tried}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      tried
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-destructive">
                      {user.fav}
                    </div>
                    <div className="text-[10px] text-muted-foreground">fav</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
