"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCompareStore } from "@/lib/compare-store";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import CompareTable from "@/components/CompareTable";
import EmptyState from "@/components/EmptyState";

/**
 * 对比页面组件
 */
export default function ComparePage() {
  const { t } = useTranslation("common");
  const { products, clearProducts } = useCompareStore();

  if (products.length === 0) {
    return (
      <main className="min-h-screen pb-16 md:pb-0">
        <Navbar />
        <div className="pt-[var(--nav-height)]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
            <EmptyState
              icon={<Package className="w-12 h-12" />}
              title={t("compare.emptyTitle")}
              description={t("compare.emptyDescription")}
              action={
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#22211f] text-white font-medium rounded-lg hover:bg-[#33312e] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("compare.browseProducts")}
                </Link>
              }
            />
          </div>
        </div>
        <MobileNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
          {/* 页面头部 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#22211f] mb-2">
                {t("compare.pageTitle")}
              </h1>
              <p className="text-sm text-[#b2ada7]">
                {t("compare.pageDescription", { count: products.length })}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#666661] hover:text-[#22211f] hover:bg-[#f8f7f3] rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("compare.backToHome")}
              </Link>
              
              <button
                onClick={clearProducts}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#b2ada7] hover:text-[#ff4d3b] hover:bg-[#fff5f5] rounded-lg transition-colors"
                type="button"
              >
                {t("compare.clearAll")}
              </button>
            </div>
          </div>

          {/* 对比表格 */}
          <CompareTable />

          {/* 提示信息 */}
          {products.length < 2 && (
            <div className="mt-8 p-4 bg-[#fef3c7] border border-[#fde68a] rounded-lg">
              <p className="text-sm text-[#b45309]">
                {t("compare.addMoreProducts")}
              </p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </main>
  );
}
