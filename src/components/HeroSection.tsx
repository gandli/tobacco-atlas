import { ArrowDown, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { totalBrands, totalProducts } from "@/data/products";

const HeroSection = () => {
  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen px-4 md:px-6 text-center">
      <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-none mb-3 md:mb-4">
        中国卷烟博物馆
      </h1>
      <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6">
        Chinese Cigarette Museum
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        {totalBrands} brands · {totalProducts.toLocaleString()} products
      </p>
      
      <Button
        onClick={scrollToCollection}
        variant="default"
        className="mb-6 h-11 px-8 text-sm gap-2"
      >
        Browse collection
        <ArrowDown className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-full hover:bg-secondary transition-colors">
          <BookOpen className="w-4 h-4" />
          How it works
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-full hover:bg-secondary transition-colors">
          <HelpCircle className="w-4 h-4" />
          Why this exists
        </button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        𝕏 by @0x_ultra
      </p>
    </div>
  );
};

export default HeroSection;
