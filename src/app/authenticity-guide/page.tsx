"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Search, Shield, BookOpen, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { brandGuides } from "@/data/authenticity-guides";
import { getBrandByPinyin } from "@/data/brand-catalog";
import { useState } from "react";

interface BrandLogoProps {
  brand: {
    pinyin: string;
    nameZh: string;
    nameEn: string;
    logoUrl?: string | null;
    productCount: number;
  };
  isZh: boolean;
}

function BrandLogo({ brand, isZh }: BrandLogoProps) {
  const displayName = isZh ? brand.nameZh : brand.nameEn;
  const firstChar = displayName.charAt(0);

  // 如果没有 logoUrl，直接显示首字母
  if (!brand.logoUrl) {
    return (
      <div className="aspect-square rounded-lg bg-muted mb-3 overflow-hidden flex items-center justify-center">
        <div className="text-4xl font-bold text-muted-foreground">
          {firstChar}
        </div>
      </div>
    );
  }

  // 使用客户端组件处理图片错误，避免 hydration 错误
  return (
    <BrandLogoImage 
      src={brand.logoUrl} 
      alt={displayName}
      fallback={firstChar}
    />
  );
}

// 独立的图片组件，处理加载错误
function BrandLogoImage({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="aspect-square rounded-lg bg-muted mb-3 overflow-hidden flex items-center justify-center">
        <div className="text-4xl font-bold text-muted-foreground">
          {fallback}
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square rounded-lg bg-muted mb-3 overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function AuthenticityGuidePage() {
  const { t, i18n } = useTranslation("authenticity");
  const isZh = i18n.resolvedLanguage?.startsWith("zh");

  const brands = useMemo(() => {
    return Object.keys(brandGuides).map((pinyin) => {
      const guide = brandGuides[pinyin];
      const brand = getBrandByPinyin(pinyin);
      // 优先使用品牌数据中的 logo，其次使用指南中的 logoUrl
      const logoUrl = brand?.logo || guide.logoUrl;
      return {
        pinyin,
        nameZh: guide.brandNameZh,
        nameEn: guide.brandNameEn || brand?.name || guide.brandNameZh,
        logoUrl,
        productCount: brand?.count || 0,
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isZh ? "真伪鉴别指南" : "Authenticity Verification Guide"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isZh
                ? "帮助您识别正品和假冒烟草产品，保护您的权益和健康"
                : "Help you identify genuine and counterfeit tobacco products to protect your rights and health"}
            </p>
          </div>

          {/* Quick Tips */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  {isZh ? "查看包装" : "Check Packaging"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isZh
                  ? "检查印刷质量、防伪标识、拉线等细节，正品包装精美清晰"
                  : "Check printing quality, anti-counterfeit labels, pull tabs and other details"}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  {isZh ? "了解品牌特征" : "Learn Brand Features"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isZh
                  ? "每个品牌都有独特的鉴别要点，了解这些特征有助于快速识别"
                  : "Each brand has unique identification features to help quick recognition"}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  {isZh ? "警惕假冒特征" : "Watch for Fakes"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isZh
                  ? "价格异常、渠道不正规、包装粗糙等都是假冒的典型特征"
                  : "Abnormal prices, irregular channels, rough packaging are typical fake signs"}
              </p>
            </div>
          </div>

          {/* Brand Guides */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {isZh ? "选择品牌查看鉴别指南" : "Select a Brand to View Guide"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand.pinyin}
                  href={`/authenticity-guide/${brand.pinyin}`}
                  className="group bg-card rounded-lg p-4 border hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <BrandLogo brand={brand} isZh={isZh} />
                  <h3 className="font-medium text-foreground text-sm text-center mb-1">
                    {isZh ? brand.nameZh : brand.nameEn}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center">
                    {brand.productCount} {isZh ? "款产品" : "products"}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* General Tips Section */}
          <div className="bg-card rounded-lg p-6 md:p-8 border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {isZh ? "通用鉴别技巧" : "General Verification Tips"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  {isZh ? "包装鉴别" : "Packaging Verification"}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {isZh ? "检查印刷质量是否清晰精美" : "Check if printing is clear and exquisite"}</li>
                  <li>• {isZh ? "验证防伪标识是否真实有效" : "Verify anti-counterfeit labels are authentic"}</li>
                  <li>• {isZh ? "观察拉线是否透明易拉" : "Check if pull tab is transparent and easy to pull"}</li>
                  <li>• {isZh ? "检查钢印是否清晰一致" : "Check if steel stamp is clear and consistent"}</li>
                  <li>• {isZh ? "感受包装材质是否厚实挺括" : "Feel if packaging material is thick and stiff"}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  {isZh ? "烟支鉴别" : "Cigarette Verification"}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {isZh ? "测量烟支长度和圆周是否符合规格" : "Measure length and circumference match specs"}</li>
                  <li>• {isZh ? "观察烟丝是否金黄油润" : "Check if tobacco is golden and oily"}</li>
                  <li>• {isZh ? "检查滤嘴是否饱满接装牢固" : "Check if filter is full and firmly attached"}</li>
                  <li>• {isZh ? "闻气味是否有独特香气" : "Smell if there is unique aroma"}</li>
                  <li>• {isZh ? "观察燃烧是否均匀烟灰灰白" : "Check if burning is even and ash is gray-white"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
