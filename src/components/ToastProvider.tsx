"use client";

import { createContext, useContext, useCallback } from "react";
import { Toaster, toast } from "sonner";

interface ToastContextType {
  /**
   * 显示成功提示
   */
  showSuccess: (message: string) => void;
  /**
   * 显示错误提示
   */
  showError: (message: string) => void;
  /**
   * 显示信息提示
   */
  showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Toast 通知提供者
 * 
 * 在根布局中使用，提供全局 Toast 通知功能
 * 
 * @example
 * ```tsx
 * // 在 layout.tsx 中
 * <ToastProvider>
 *   {children}
 * </ToastProvider>
 * 
 * // 在组件中使用
 * const { showSuccess } = useToast();
 * showSuccess("操作成功！");
 * ```
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = useCallback((message: string, type: "success" | "error" | "info") => {
    toast[type](message, {
      duration: 2000,
      position: "bottom-center",
      closeButton: true,
    });
  }, []);

  return (
    <ToastContext.Provider value={{
      showSuccess: (msg) => showToast(msg, "success"),
      showError: (msg) => showToast(msg, "error"),
      showInfo: (msg) => showToast(msg, "info"),
    }}>
      {children}
      <Toaster richColors closeButton />
    </ToastContext.Provider>
  );
}

/**
 * 使用 Toast 通知
 * 
 * @example
 * ```tsx
 * const { showSuccess, showError, showInfo } = useToast();
 * 
 * // 成功提示
 * showSuccess("收藏成功！");
 * 
 * // 错误提示
 * showError("操作失败，请重试");
 * 
 * // 信息提示
 * showInfo("正在加载...");
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default ToastProvider;
