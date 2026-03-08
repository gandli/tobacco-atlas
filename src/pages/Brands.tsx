import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { brands, regionLabels } from "@/data/products";

const regions = ["mainland", "hkmo", "international", "historical"] as const;

const Brands = () => {
  const [activeRegion, setActiveRegion] = useState<string>("mainland");
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return brands
      .filter((b) => b.region === activeRegion)
      .filter(
        (b) =>
          !search ||
          b.name.includes(search) ||
          b.pinyin.toLowerCase().includes(search.toLowerCase())
      );
  }, [activeRegion, search]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of regions) {
      counts[r] = brands.filter((b) => b.region === r).length;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Archive
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-1">
              卷烟品牌
            </h1>
            <p className="text-muted-foreground">Cigarette Brands</p>
          </div>

          {/* Region tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  activeRegion === r
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {regionLabels[r].zh} {regionLabels[r].en}{" "}
                <span className="opacity-60">{regionCounts[r]}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-10 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-medium text-destructive">
              {regionLabels[activeRegion].zh}
            </span>
            <span className="font-semibold text-foreground">
              {regionLabels[activeRegion].en}
            </span>
            <span className="text-muted-foreground text-sm">
              {filteredBrands.length}
            </span>
          </div>

          {/* Brand grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="border border-border rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow bg-card"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-sm font-medium text-foreground">
                      {brand.name}
                    </span>
                    <span className="text-xs text-destructive font-medium">
                      {brand.count}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {brand.pinyin}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
