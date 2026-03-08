import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { brands, regionLabels } from "@/data";

const regions = ["mainland", "hkmo", "international", "historical"] as const;

const Brands = () => {
  const navigate = useNavigate();
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
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-6 md:mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Archive
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-1">
              卷烟品牌
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">Cigarette Brands</p>
          </div>

          {/* Region tabs - horizontally scrollable on mobile */}
          <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
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
          <div className="relative mb-6 md:mb-10 md:max-w-md">
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
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="text-xs font-medium text-destructive">
              {regionLabels[activeRegion].zh}
            </span>
            <span className="font-semibold text-foreground text-sm md:text-base">
              {regionLabels[activeRegion].en}
            </span>
            <span className="text-muted-foreground text-sm">
              {filteredBrands.length}
            </span>
          </div>

          {/* Brand grid - 3 cols on mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 md:gap-3">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => navigate(`/brand/${brand.pinyin}`)}
                className="border border-border rounded-xl p-3 md:p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow bg-card"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3 flex items-center justify-center">
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
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      {brand.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-destructive font-medium">
                      {brand.count}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    {brand.pinyin}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Brands;
