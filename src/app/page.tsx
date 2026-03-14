import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import HomeProductStream from "@/components/HomeProductStream";
import FloatingProductsDeferred from "@/components/FloatingProductsDeferred";
import { products } from "@/data";

const HOME_INITIAL_PRODUCTS = 16;
const HOME_BATCH_SIZE = 16;

export default function HomePage() {
  const streamProducts = products.map((product) => ({
    id: product.id,
    brand: product.brand,
    name: product.name,
    nameEn: product.nameEn,
    image: product.image,
    brandPinyin: product.brandPinyin,
    region: product.region,
    price: product.price,
    packPrice: product.packPrice,
  }));

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="relative">
          <FloatingProductsDeferred />
          <HeroSection />
        </div>
        <HomeProductStream
          products={streamProducts}
          initialCount={HOME_INITIAL_PRODUCTS}
          batchSize={HOME_BATCH_SIZE}
        />
      </div>
      <MobileNav />
    </main>
  );
}
