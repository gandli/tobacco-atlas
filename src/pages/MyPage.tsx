import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const MyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            My Account
          </h1>
          <p className="text-muted-foreground">Your personal dashboard will appear here.</p>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default MyPage;