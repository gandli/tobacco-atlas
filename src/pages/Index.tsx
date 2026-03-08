import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import FloatingProducts from "@/components/FloatingProducts";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="relative">
          <FloatingProducts />
          <HeroSection />
        </div>
        <ProductGrid />
      </div>
      <MobileNav />
    </div>
  );
};

export default Index;