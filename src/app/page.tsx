import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import FloatingProductsDeferred from "@/components/FloatingProductsDeferred";
import { products } from "@/data";

const HOME_HERO_PRODUCTS = 24;
const HOME_SECONDARY_PRODUCTS = 32;

export default function HomePage() {
  const featuredProducts = products.slice(0, HOME_HERO_PRODUCTS);
  const archiveProducts = products.slice(
    HOME_HERO_PRODUCTS,
    HOME_HERO_PRODUCTS + HOME_SECONDARY_PRODUCTS,
  );

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="relative">
          <FloatingProductsDeferred />
          <HeroSection />
        </div>
        <ProductGrid products={featuredProducts} />
        {archiveProducts.length > 0 ? (
          <section className="mx-auto max-w-[1600px] px-4 pb-20 md:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Archive Glimpse
                </p>
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  More from the collection
                </h2>
              </div>
              <p className="max-w-sm text-right text-sm text-muted-foreground">
                Keep the first screen light, then continue exploring the museum archive below.
              </p>
            </div>
            <ProductGrid
              products={archiveProducts}
              sectionId="archive-glimpse"
              className="px-0 pb-0 pt-0"
            />
          </section>
        ) : null}
      </div>
      <MobileNav />
    </main>
  );
}
