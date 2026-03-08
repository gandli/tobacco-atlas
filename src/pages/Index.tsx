import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloatingProducts from "@/components/FloatingProducts";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <FloatingProducts />
        <HeroSection />
      </div>
      <ProductGrid />
    </div>
  );
};

export default Index;
