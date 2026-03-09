import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <HeroSection />
        <ProductGrid />
      </div>
      <MobileNav />
    </main>
  );
}