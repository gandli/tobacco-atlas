"use client";

import Link from "next/link";
import { X, Trash2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCompareStore } from "@/lib/compare-store";
import OptimizedImage from "@/components/OptimizedImage";

/**
 * 底部对比栏组件
 * 显示已选产品，支持移除和清空操作
 */
export function CompareBar() {
  const { t } = useTranslation("common");
  const { products, removeProduct, clearProducts } = useCompareStore();

  // 如果没有产品，不显示对比栏
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#ece6de] shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center gap-4">
          {/* 左侧：产品信息 */}
          <div className="flex-1 flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-medium text-[#666661] flex-shrink-0">
              {t("compare.selected", { count: products.length })}
            </span>
            
            <div className="flex items-center gap-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex items-center gap-2 px-3 py-1.5 bg-[#f8f7f3] rounded-lg border border-[#ece6de]"
                >
                  <Link
                    href={`/sku/${product.id}`}
                    className="flex items-center gap-2"
                  >
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[#22211f] max-w-[120px] truncate">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-[#b2ada7]">
                        {product.brand}
                      </span>
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#efebe5] rounded-full"
                    aria-label={`移除 ${product.name}`}
                    type="button"
                  >
                    <X className="w-3.5 h-3.5 text-[#b2ada7]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clearProducts}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#b2ada7] hover:text-[#ff4d3b] hover:bg-[#fff5f5] rounded-lg transition-colors"
              aria-label={t("compare.clearAll")}
              type="button"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline">{t("compare.clearAll")}</span>
            </button>
            
            <Link
              href="/compare"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#22211f] text-white text-sm font-medium rounded-lg hover:bg-[#33312e] transition-colors"
            >
              {t("compare.startCompare")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareBar;
