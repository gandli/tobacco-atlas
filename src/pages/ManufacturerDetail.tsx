import { useParams, Link } from "react-router-dom";
import { getProductsByManufacturer } from "@/data";
import Navbar from "@/components/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ManufacturerDetail = () => {
  const { name } = useParams();
  const products = name ? getProductsByManufacturer(name) : [];

  // 获取该厂家的品牌列表 (去重)
  const brands = Array.from(new Set(products.map((p) => p.brand))).filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">首页</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/brands">品牌</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            生产企业 · Manufacturer
          </div>
          <h1 className="text-4xl font-bold font-serif text-ash mb-4">
            {name}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            共收录该厂家旗下的 {brands.length} 个品牌，{products.length}{" "}
            款产品。
          </p>
        </header>

        {/* 品牌列表 */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-6 font-sans">
            旗下的品牌 / Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brandName) => {
              const brandPinyin = products.find(
                (p) => p.brand === brandName,
              )?.brandPinyin;
              return (
                <Link
                  key={brandName}
                  to={`/brand/${brandPinyin}`}
                  className="group relative bg-card border border-border/50 hover:border-gold/30 p-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative z-10 text-center">
                    <span className="font-serif text-lg text-ash group-hover:text-gold transition-colors">
                      {brandName}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* 产品网格 */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 font-sans">
              相关产品 / Products
            </h2>
            <span className="text-xs text-muted-foreground">
              {products.length} items
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/sku/${product.id}`}
                className="group flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500"
              >
                <div className="aspect-[3/4] bg-card border border-border/50 rounded-2xl overflow-hidden flex items-center justify-center p-6 transition-all group-hover:shadow-2xl group-hover:border-gold/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1 px-1 text-center sm:text-left">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-sans">
                    {product.brand}
                  </div>
                  <h3 className="font-serif text-[15px] text-ash line-clamp-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  {product.packPrice && (
                    <div className="font-sans text-sm font-bold text-ash/80">
                      ¥{product.packPrice}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManufacturerDetail;
