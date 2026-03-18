"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Ruler, Eye, Flame, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { getAuthenticityGuideByBrand } from "@/data/authenticity-guides";
import { getBrandByPinyin } from "@/data/brand-catalog";

export default function BrandAuthenticityGuidePage() {
  const params = useParams();
  const { t, i18n } = useTranslation("authenticity");
  const isZh = i18n.resolvedLanguage?.startsWith("zh");
  const brandPinyin = params.brand as string;

  // 兼容性处理：chungwa -> zhonghua
  const resolvedBrandPinyin = brandPinyin === 'chungwa' ? 'zhonghua' : brandPinyin;

  const guide = useMemo(() => {
    return getAuthenticityGuideByBrand(resolvedBrandPinyin);
  }, [resolvedBrandPinyin]);

  const brand = useMemo(() => {
    if (!guide) return null;
    return getBrandByPinyin(resolvedBrandPinyin);
  }, [guide, resolvedBrandPinyin]);

  // 优先使用品牌数据中的 logo，其次使用指南中的 logoUrl
  const logoUrl = brand?.logo || guide.logoUrl;

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-[var(--nav-height)] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">❌</p>
            <h1 className="text-xl font-bold text-foreground mb-2">
              {isZh ? "指南不存在" : "Guide Not Found"}
            </h1>
            <Link
              href="/authenticity-guide"
              className="text-sm text-primary hover:underline"
            >
              ← {isZh ? "返回鉴别指南" : "Back to Guides"}
            </Link>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
          {/* Back Button */}
          <Link
            href="/authenticity-guide"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? "返回鉴别指南" : "Back to Guides"}
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={isZh ? guide.brandNameZh : guide.brandNameEn}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-xl font-bold text-muted-foreground">${(isZh ? guide.brandNameZh : guide.brandNameEn).charAt(0)}</div>`;
                    }
                  }}
                />
              ) : (
                <span className="text-xl font-bold text-muted-foreground">
                  {(isZh ? guide.brandNameZh : guide.brandNameEn).charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isZh ? guide.brandNameZh : guide.brandNameEn}
              </h1>
              <p className="text-muted-foreground">
                {isZh ? "真伪鉴别指南" : "Authenticity Verification Guide"}
              </p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-card rounded-lg p-6 border mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              {isZh ? "快速鉴别要点" : "Quick Verification Tips"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guide.generalTips.map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging Verification */}
          <div className="bg-card rounded-lg p-6 border mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              {isZh ? "包装鉴别" : "Packaging Verification"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      {isZh ? "鉴别项目" : "Item"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-green-600">
                      {isZh ? "正品特征" : "Genuine"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-red-600">
                      {isZh ? "假冒特征" : "Fake"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      {isZh ? "重要度" : "Importance"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.packagingVerification.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4 text-foreground">{item.item}</td>
                      <td className="py-3 px-4 text-green-700">{item.genuineFeature}</td>
                      <td className="py-3 px-4 text-red-700">{item.fakeFeature}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.importance === "high"
                              ? "bg-red-100 text-red-700"
                              : item.importance === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.importance === "high"
                            ? isZh
                              ? "高"
                              : "High"
                            : item.importance === "medium"
                            ? isZh
                              ? "中"
                              : "Medium"
                            : isZh
                            ? "低"
                            : "Low"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cigarette Verification */}
          <div className="bg-card rounded-lg p-6 border mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary" />
              {isZh ? "烟支鉴别" : "Cigarette Verification"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      {isZh ? "鉴别项目" : "Item"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      {isZh ? "正品规格" : "Genuine Spec"}
                    </th>
                    {guide.cigaretteVerification[0]?.tolerance && (
                      <th className="text-left py-3 px-4 font-medium">
                        {isZh ? "允许误差" : "Tolerance"}
                      </th>
                    )}
                    <th className="text-left py-3 px-4 font-medium">
                      {isZh ? "检测方法" : "Method"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.cigaretteVerification.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4 text-foreground">{item.item}</td>
                      <td className="py-3 px-4">{item.genuineSpec}</td>
                      {item.tolerance && (
                        <td className="py-3 px-4 text-muted-foreground">
                          {item.tolerance}
                        </td>
                      )}
                      <td className="py-3 px-4">{item.detectionMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Smell & Burn Verification */}
          {(guide.smellVerification || guide.burnVerification) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {guide.smellVerification && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    👃 {isZh ? "气味鉴别" : "Smell Verification"}
                  </h2>
                  <div className="space-y-4">
                    {guide.smellVerification.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-medium text-sm text-foreground mb-2">
                          {item.smellType}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-green-700">
                              {isZh ? "正品：" : "Genuine: "}
                              {item.genuineSmell}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-red-700">
                              {isZh ? "假烟：" : "Fake: "}
                              {item.fakeSmell}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guide.burnVerification && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    {isZh ? "燃烧鉴别" : "Burn Verification"}
                  </h2>
                  <div className="space-y-4">
                    {guide.burnVerification.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-medium text-sm text-foreground mb-2">
                          {item.characteristic}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-green-700">
                              {isZh ? "正品：" : "Genuine: "}
                              {item.genuineBehavior}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-red-700">
                              {isZh ? "假烟：" : "Fake: "}
                              {item.fakeBehavior}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Brand Specific Tips */}
          {guide.brandSpecificTips && guide.brandSpecificTips.length > 0 && (
            <div className="bg-card rounded-lg p-6 border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {isZh ? "品牌专属鉴别要点" : "Brand-Specific Tips"}
              </h2>
              <div className="space-y-4">
                {guide.brandSpecificTips.map((tip, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h3 className="font-medium text-foreground mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Fake Characteristics */}
          {guide.commonFakeCharacteristics && (
            <div className="bg-card rounded-lg p-6 border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                {isZh ? "常见假冒特征" : "Common Fake Characteristics"}
              </h2>
              <div className="space-y-4">
                {guide.commonFakeCharacteristics.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      item.riskLevel === "high"
                        ? "bg-red-50 border border-red-200"
                        : item.riskLevel === "medium"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          item.riskLevel === "high"
                            ? "text-red-600"
                            : item.riskLevel === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium text-foreground text-sm mb-1">
                          {item.characteristic}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isZh ? "识别方法：" : "How to identify: "}
                          {item.howToIdentify}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {guide.checklist && (
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                {isZh ? "鉴别清单（可打印）" : "Verification Checklist (Printable)"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        {isZh ? "检查项目" : "Item"}
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        {isZh ? "检查方法" : "Method"}
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        {isZh ? "正品标准" : "Genuine Standard"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.checklist.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4 text-foreground">{item.item}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item.method}
                        </td>
                        <td className="py-3 px-4 text-green-700">
                          {item.genuineStandard}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
