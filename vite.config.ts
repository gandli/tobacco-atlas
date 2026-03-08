import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 启用 gzip 压缩报告
    reportCompressed: true,
    rollupOptions: {
      output: {
        // 手动分包策略 - 优化加载性能
        manualChunks: (id) => {
          // React 核心
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // React Router
          if (id.includes('node_modules/react-router-dom/')) {
            return 'router';
          }
          // React Query
          if (id.includes('node_modules/@tanstack/react-query/')) {
            return 'query';
          }
          // Radix UI 组件
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix-ui';
          }
          // 图标库
          if (id.includes('node_modules/lucide-react/')) {
            return 'lucide';
          }
          // 工具库
          if (id.includes('node_modules/date-fns/') || 
              id.includes('node_modules/clsx/') || 
              id.includes('node_modules/tailwind-merge/') ||
              id.includes('node_modules/class-variance-authority/')) {
            return 'utils';
          }
          // 表单相关
          if (id.includes('node_modules/react-hook-form/') || 
              id.includes('node_modules/@hookform/') || 
              id.includes('node_modules/zod/')) {
            return 'form';
          }
          // UI 组件库
          if (id.includes('node_modules/@radix-ui/react-slot') ||
              id.includes('node_modules/cmdk/') ||
              id.includes('node_modules/sonner/') ||
              id.includes('node_modules/vaul/') ||
              id.includes('node_modules/embla-carousel-react/')) {
            return 'ui-lib';
          }
          // 数据文件 - 单独分块
          if (id.includes('/src/data/brands.ts') || id.includes('/src/data/types.ts')) {
            return 'data-brands';
          }
          if (id.includes('/src/data/manufacturers.ts')) {
            return 'data-manufacturers';
          }
        },
      },
    },
    // 提高 chunk 大小警告阈值
    chunkSizeWarningLimit: 500,
  },
}));
