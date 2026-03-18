import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import HomeProductStream from "@/components/HomeProductStream";
import FloatingProductsDeferred from "@/components/FloatingProductsDeferred";
import RecommendationEngine from "@/components/RecommendationEngine";
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
        
        {/* AI 推荐区块 */}
        <section className="py-8 md:py-12 bg-secondary/20 border-y border-border/30">
          <div className="container mx-auto px-4 md:px-6">
            <RecommendationEngine
              limit={10}
              showQuiz={false}
            />
          </div>
        </section>
        
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
