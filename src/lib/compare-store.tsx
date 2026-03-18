"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { HomeProductSummary } from "@/data/home-catalog";

/**
 * 对比产品数据类型
 */
export type CompareProduct = Pick<
  HomeProductSummary,
  "id" | "brand" | "name" | "nameEn" | "image" | "region" | "price" | "packPrice"
>;

/**
 * 对比商店上下文接口
 */
interface CompareStoreContextType {
  /** 已选对比的产品列表 */
  products: CompareProduct[];
  /** 添加产品到对比列表 */
  addProduct: (product: CompareProduct) => void;
  /** 从对比列表移除产品 */
  removeProduct: (productId: number) => void;
  /** 清空对比列表 */
  clearProducts: () => void;
  /** 检查产品是否已在对比列表中 */
  isInCompare: (productId: number) => boolean;
  /** 对比列表是否已满（达到 4 个） */
  isFull: boolean;
}

const LOCAL_STORAGE_KEY = "tobacco-atlas-compare-products";
const MAX_COMPARE_PRODUCTS = 4;

const CompareStoreContext = createContext<CompareStoreContextType | undefined>(undefined);

/**
 * 对比商店提供者组件
 */
export function CompareStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CompareProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载对比列表
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CompareProduct[];
        setProducts(parsed);
      }
    } catch (error) {
      console.error("Failed to load compare products from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // 保存对比列表到 localStorage
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save compare products to localStorage:", error);
    }
  }, [products, isLoaded]);

  const addProduct = (product: CompareProduct) => {
    setProducts((prev) => {
      // 如果产品已存在，不重复添加
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      // 如果已满，不添加
      if (prev.length >= MAX_COMPARE_PRODUCTS) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearProducts = () => {
    setProducts([]);
  };

  const isInCompare = (productId: number) => {
    return products.some((p) => p.id === productId);
  };

  const isFull = products.length >= MAX_COMPARE_PRODUCTS;

  return (
    <CompareStoreContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        clearProducts,
        isInCompare,
        isFull,
      }}
    >
      {children}
    </CompareStoreContext.Provider>
  );
}

/**
 * 使用对比商店的 Hook
 */
export function useCompareStore() {
  const context = useContext(CompareStoreContext);
  if (context === undefined) {
    throw new Error("useCompareStore must be used within a CompareStoreProvider");
  }
  return context;
}
