import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import HomeProductStream from "@/components/HomeProductStream";
import FloatingProductsDeferred from "@/components/FloatingProductsDeferred";
import { homeProducts } from "@/data/home-catalog";

const HOME_INITIAL_PRODUCTS = 16;
const HOME_BATCH_SIZE = 16;

export default function HomePage() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="relative">
          <FloatingProductsDeferred />
          <HeroSection />
        </div>
        <HomeProductStream
          products={homeProducts}
          initialCount={HOME_INITIAL_PRODUCTS}
          batchSize={HOME_BATCH_SIZE}
        />
      </div>
      <MobileNav />
    </main>
  );
}
