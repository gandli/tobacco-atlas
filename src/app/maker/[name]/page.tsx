"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import OptimizedImage from "@/components/OptimizedImage";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getMakerByIdentifier } from "@/data/maker-catalog";
import { getProductsByMakerIdentifier } from "@/data/product-catalog";

type MakerDetailRouteProps = {
  params: Promise<{
    name: string;
  }>;
};

type ManufacturerDetailContentProps = {
  name?: string | number;
};

function ManufacturerDetailContent({ name: explicitName }: ManufacturerDetailContentProps) {
  const { t } = useTranslation("details");
  const identifier =
    explicitName ??
    (typeof window !== "undefined"
      ? decodeURIComponent(
          window.location.pathname.match(/^\/(?:maker|manufacturer)\/([^/]+)/)?.[1] ?? "",
        )
      : "");
  const maker = identifier ? getMakerByIdentifier(identifier) : undefined;
  const displayName = maker?.englishName ?? String(identifier ?? "");
  const products = identifier ? getProductsByMakerIdentifier(identifier) : [];
  const brands = Array.from(new Set(products.map((product) => product.brand))).filter(Boolean);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <CollectionPageFrame>
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t("breadcrumbs.home")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/makers">{t("breadcrumbs.makers")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("manufacturer.badge")}
            </div>
            <h1 className="text-4xl font-bold font-serif text-ash mb-4">
              {displayName}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {t("manufacturer.summary", { brands: brands.length, products: products.length })}
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-6 font-sans">
              {t("manufacturer.brandsSection")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map((brandName) => {
                const brandPinyin = products.find((product) => product.brand === brandName)?.brandPinyin;
                return (
                  <Link
                    key={brandName}
                    href={`/brand/${brandPinyin}`}
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

          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 font-sans">
                {t("manufacturer.productsSection")}
              </h2>
              <span className="text-xs text-muted-foreground">
                {t("manufacturer.items", { count: products.length })}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/sku/${product.id}`}
                  className="group flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500"
                >
                  <div className="aspect-[3/4] bg-card border border-border/50 rounded-2xl overflow-hidden flex items-center justify-center p-6 transition-all group-hover:shadow-2xl group-hover:border-gold/30">
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      width={320}
                      height={426}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 320px"
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
        </CollectionPageFrame>
      </main>
      <MobileNav />
    </div>
  );
}

export default async function MakerDetailPage({ params }: MakerDetailRouteProps) {
  const { name } = await params;

  return <ManufacturerDetailContent name={name} />;
}
