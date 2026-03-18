"use client";

import { useTranslation } from "react-i18next";
import { useCompareStore, type CompareProduct } from "@/lib/compare-store";
import { regionLabels } from "@/data/region-labels";
import OptimizedImage from "@/components/OptimizedImage";

/**
 * 对比表格行属性
 */
interface CompareTableRowProps {
  label: string;
  values: string[];
  highlightDiff?: boolean;
}

/**
 * 对比表格行组件
 */
function CompareTableRow({ label, values, highlightDiff = true }: CompareTableRowProps) {
  // 检查是否有差异
  const hasDiff = highlightDiff && values.some((v, i, arr) => v !== arr[0]);

  return (
    <div className={`grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-px bg-[#ece6de] ${hasDiff ? "bg-[#fef3c7]" : ""}`}>
      <div className="bg-[#f8f7f3] px-3 py-3 md:px-4 md:py-3 text-sm font-medium text-[#666661]">
        {label}
      </div>
      <div className="grid grid-cols-1">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
          {values.map((value, index) => (
            <div
              key={index}
              className={`px-3 py-3 md:px-4 md:py-3 text-sm text-[#22211f] bg-white ${
                hasDiff ? "font-semibold text-[#b45309]" : ""
              }`}
            >
              {value || "—"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 对比表格组件
 * 并排展示 2-4 个产品的参数
 */
export function CompareTable() {
  const { t } = useTranslation("common");
  const { products } = useCompareStore();

  if (products.length === 0) {
    return null;
  }

  // 获取所有产品的某个属性值
  const getProductValue = (
    product: CompareProduct,
    key: keyof CompareProduct
  ): string => {
    const value = product[key];
    if (value === undefined || value === null) return "";
    return String(value);
  };

  // 获取地区标签
  const getRegionLabel = (region?: string): string => {
    if (!region) return "";
    const label = regionLabels[region];
    return label?.zh || region;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ece6de] overflow-hidden shadow-sm">
      {/* 表头：产品图片 */}
      <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] bg-[#f8f7f3] border-b border-[#ece6de]">
        <div className="px-3 py-4 md:px-4 md:py-4" />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {products.map((product) => (
            <div key={product.id} className="px-3 py-4 md:px-4 md:py-4 flex flex-col items-center">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                width={120}
                height={150}
                className="w-20 h-24 md:w-28 md:h-36 object-contain mb-3"
              />
              <div className="text-center">
                <div className="text-sm font-semibold text-[#22211f] mb-1 line-clamp-2">
                  {product.name}
                </div>
                <div className="text-xs text-[#b2ada7]">{product.brand}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 基本信息 */}
      <div className="divide-y divide-[#ece6de]">
        <CompareTableRow
          label={t("compare.brand")}
          values={products.map((p) => p.brand)}
        />
        <CompareTableRow
          label={t("compare.type")}
          values={products.map((p) => p.name)}
          highlightDiff={false}
        />
        <CompareTableRow
          label={t("compare.region")}
          values={products.map((p) => getRegionLabel(p.region))}
        />
      </div>

      {/* 价格信息 */}
      <div className="divide-y divide-[#ece6de]">
        <CompareTableRow
          label={t("compare.retailPrice")}
          values={products.map((p) => 
            p.packPrice ? `¥${p.packPrice}` : p.price ? `¥${p.price}` : ""
          )}
        />
      </div>
    </div>
  );
}

export default CompareTable;
