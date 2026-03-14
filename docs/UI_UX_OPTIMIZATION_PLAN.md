# UI/UX 优化计划 (UI/UX Optimization Plan)

> 中国烟草图谱 - 基于审计报告的系统性优化  
> 创建日期：2026-03-15  
> 目标评分：80.6 → 90+

---

## 📋 优化概览

| 阶段 | 内容 | 工作量 | 优先级 |
|------|------|--------|--------|
| **Phase 1** | 加载状态优化 | 3 小时 | 🔴 高 |
| **Phase 2** | 无障碍修复 | 2 小时 | 🔴 高 |
| **Phase 3** | 反馈机制增强 | 3 小时 | 🔴 高 |
| **Phase 4** | 视觉一致性优化 | 2 小时 | 🟡 中 |
| **Phase 5** | 响应式细节优化 | 2 小时 | 🟡 中 |
| **Phase 6** | 性能优化 | 2 小时 | 🟡 中 |

---

## Phase 1: 加载状态优化 (Loading States)

### 1.1 创建 Skeleton 组件

**文件**: `src/components/ui/skeleton.tsx` (已存在，需增强)

```typescript
// 当前状态：基础骨架屏
// 需要增强：添加变体和组合使用
```

**新增组件**: `src/components/SkeletonCard.tsx`

```tsx
// 产品卡片骨架屏
export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3">
      {/* 图片占位 */}
      <div className="relative w-full aspect-[4/5] bg-muted rounded-xl animate-pulse" />
      
      {/* 文本占位 */}
      <div className="flex flex-col gap-1 px-1">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

// 品牌卡片骨架屏
export function SkeletonBrandCard() {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
      <div className="h-4 bg-muted rounded w-20 animate-pulse" />
      <div className="h-3 bg-muted rounded w-16 animate-pulse" />
    </div>
  );
}
```

### 1.2 应用到 BrandsPage

**文件**: `src/app/brands/page.tsx`

```tsx
// 添加加载状态
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // 模拟加载延迟（实际应从数据获取）
  const timer = setTimeout(() => setIsLoading(false), 500);
  return () => clearTimeout(timer);
}, []);

// 渲染骨架屏
{isLoading ? (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
    {Array.from({ length: 18 }).map((_, i) => (
      <SkeletonBrandCard key={i} />
    ))}
  </div>
) : (
  // 实际内容
)}
```

### 1.3 应用到 SkuDetail

**文件**: `src/app/sku/[id]/page.tsx`

```tsx
// 添加产品详情骨架屏
function SkuDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10">
      {/* 图片画廊骨架屏 */}
      <div className="space-y-10">
        <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
        <div className="h-48 bg-muted rounded-2xl animate-pulse" />
      </div>
      
      {/* 信息骨架屏 */}
      <div className="space-y-8">
        <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        <div className="h-12 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
```

---

## Phase 2: 无障碍修复 (Accessibility Fixes)

### 2.1 对比度修复

**文件**: `src/app/globals.css`

```css
/* 修复对比度不足的问题 */
@layer utilities {
  /* 确保足够的对比度 */
  .text-muted-readable {
    @apply text-muted-foreground/90;
  }
  
  /* 装饰性文本保持低对比度 */
  .text-muted-decorative {
    @apply text-muted-foreground/60;
  }
}
```

**全局替换**:
- `text-muted-foreground/70` → `text-muted-foreground/90` (正文)
- `text-muted-foreground/60` → `text-muted-foreground/80` (次要信息)
- `text-muted-foreground/50` → `text-muted-foreground/70` (装饰性)

### 2.2 添加 ARIA Live 区域

**文件**: `src/components/catalog/CollectionControlBar.tsx`

```tsx
export default function CollectionControlBar({
  leading,
  trailing,
  summary,
  className = "",
}: CollectionControlBarProps) {
  return (
    <div
      data-testid="collection-control-bar"
      className={`...`}
      aria-live="polite"  // 添加：通知屏幕阅读器内容变化
      aria-atomic="true"  // 添加：整体朗读变化
    >
      {/* ... */}
    </div>
  );
}
```

### 2.3 完善 Alt 文本

**文件**: `src/components/OptimizedImage.tsx`

```tsx
interface OptimizedImageProps {
  src: string;
  alt: string;  // 必填，强制提供描述
  // ...
}
```

**使用规范**:
```tsx
// ❌ 避免
<OptimizedImage src={logo} alt="Logo" />

// ✅ 推荐
<OptimizedImage src={logo} alt={`${brandName} 品牌标志`} />
<OptimizedImage src={product.image} alt={`${brand}（${productName}）产品图片`} />
```

### 2.4 添加跳过导航链接

**文件**: `src/app/layout.tsx`

```tsx
// 添加跳过链接
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
             focus:z-50 focus:px-4 focus:py-2 focus:bg-background 
             focus:text-foreground focus:rounded-md focus:shadow-lg"
>
  跳到主要内容
</a>

// 主内容区域添加 ID
<main id="main-content" className="min-h-screen">
  {/* ... */}
</main>
```

---

## Phase 3: 反馈机制增强 (Feedback Enhancement)

### 3.1 添加 Toast 通知系统

**文件**: `src/components/ToastProvider.tsx` (新建)

```tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toaster, toast } from "sonner";

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = useCallback((message: string, type: "success" | "error" | "info") => {
    toast[type](message, {
      duration: 2000,
      position: "bottom-center",
    });
  }, []);

  return (
    <ToastContext.Provider value={{
      showSuccess: (msg) => showToast(msg, "success"),
      showError: (msg) => showToast(msg, "error"),
      showInfo: (msg) => showToast(msg, "info"),
    }}>
      {children}
      <Toaster richColors />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
```

### 3.2 应用到 ProductCard

**文件**: `src/components/ProductCard.tsx`

```tsx
import { useToast } from "@/components/ToastProvider";

const ProductCard = ({ product }: ProductCardProps) => {
  const { showSuccess } = useToast();

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 显示反馈
    const messages = {
      favorite: `已收藏：${product.brand} - ${productName}`,
      tried: `已标记尝试：${product.brand} - ${productName}`,
      wishlist: `已加入愿望单：${product.brand} - ${productName}`,
    };
    
    showSuccess(messages[action as keyof typeof messages]);
  };

  // ... 渲染时添加点击反馈
  <button
    className="... active:scale-95 transition-transform"  // 添加按压效果
    onClick={(e) => handleAction(e, "favorite")}
  >
    <Star className="h-3.5 w-3.5" />
  </button>
};
```

### 3.3 添加空状态设计

**文件**: `src/components/EmptyState.tsx` (新建)

```tsx
import { Search, Package } from "lucide-react";

interface EmptyStateProps {
  type?: "search" | "filter" | "default";
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  type = "default", 
  title, 
  description,
  action 
}: EmptyStateProps) {
  const icons = {
    search: <Search className="w-12 h-12 text-muted-foreground/40" />,
    filter: <Package className="w-12 h-12 text-muted-foreground/40" />,
    default: <Package className="w-12 h-12 text-muted-foreground/40" />,
  };

  const defaultTitles = {
    search: "未找到相关结果",
    filter: "暂无符合条件的项目",
    default: "暂无内容",
  };

  const defaultDescriptions = {
    search: "尝试使用其他关键词搜索",
    filter: "尝试调整筛选条件",
    default: "内容即将上线",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">{icons[type]}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || defaultTitles[type]}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {description || defaultDescriptions[type]}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
```

**应用到 BrandsPage**:

```tsx
{filteredBrands.length === 0 ? (
  <EmptyState 
    type="search"
    title="未找到品牌"
    description={`"${search}" 没有匹配的品牌，尝试其他关键词`}
  />
) : (
  // 品牌网格
)}
```

---

## Phase 4: 视觉一致性优化 (Visual Consistency)

### 4.1 统一按钮尺寸

**文件**: `src/components/ui/button.tsx`

```typescript
// 添加新的尺寸变体
size: {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  md: "h-10 rounded-md px-4",  // 新增：标准尺寸
  lg: "h-11 rounded-md px-8",
  xl: "h-12 rounded-md px-6",  // 新增：大尺寸
  icon: "h-10 w-10",
  iconSm: "h-8 w-8",           // 新增：小图标
  iconLg: "h-12 w-12",         // 新增：大图标
}
```

### 4.2 统一卡片内边距

**全局规范**:
- 小卡片：`p-3` (12px)
- 标准卡片：`p-4` (16px)
- 大卡片：`p-6` (24px)

**文件**: `src/components/ui/card.tsx`

```tsx
// 添加预定义变体
<Card className="p-4">标准卡片</Card>
<Card className="p-6">大卡片</Card>
```

---

## Phase 5: 响应式细节优化 (Responsive Refinements)

### 5.1 优化 CollectionControlBar

**文件**: `src/components/catalog/CollectionControlBar.tsx`

```tsx
// 改进响应式布局
<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
  <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
    {leading}
  </div>
  <div className="flex-shrink-0 flex-wrap items-center gap-2">
    {trailing}
  </div>
</div>
```

### 5.2 添加滚动指示器

**文件**: `src/app/globals.css`

```css
/* 横向滚动渐变指示器 */
.scroll-indicator-right {
  mask-image: linear-gradient(
    to right,
    black calc(100% - 20px),
    transparent 100%
  );
}

.scroll-indicator-left {
  mask-image: linear-gradient(
    to left,
    black calc(100% - 20px),
    transparent 100%
  );
}
```

---

## Phase 6: 性能优化 (Performance)

### 6.1 图标 Tree Shaking 验证

**检查清单**:
- [ ] 确认 `lucide-react` 按需导入
- [ ] 验证打包后未使用图标被移除
- [ ] 考虑使用 `lucide-react` 的 tree-shakeable 导入

### 6.2 图片懒加载优化

**文件**: `src/components/OptimizedImage.tsx`

```tsx
// 添加 blur-up 占位
interface OptimizedImageProps {
  // ...
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

// 使用 Next.js Image 的 placeholder 功能
<Image
  placeholder="blur"
  blurDataURL={blurDataURL}
  // ...
/>
```

---

## 📊 验收标准

### Phase 1-3 (高优先级) 完成标准

- [ ] 所有列表页面有骨架屏
- [ ] Lighthouse 无障碍评分 ≥ 90
- [ ] 所有操作有 Toast 反馈
- [ ] 空状态设计完整

### Phase 4-6 (中优先级) 完成标准

- [ ] 按钮尺寸统一
- [ ] 卡片间距一致
- [ ] 响应式布局流畅
- [ ] Lighthouse 性能评分 ≥ 90

---

## 📅 时间表

| 日期 | 阶段 | 交付物 |
|------|------|--------|
| Day 1 | Phase 1 | Skeleton 组件 + 应用 |
| Day 2 | Phase 2 | 无障碍修复完成 |
| Day 3 | Phase 3 | Toast + 空状态 |
| Day 4 | Phase 4 | 视觉一致性优化 |
| Day 5 | Phase 5-6 | 响应式 + 性能优化 |
| Day 6 | 测试验收 | Lighthouse 测试 + 修复 |

---

*创建日期：2026-03-15*  
*预计完成：2026-03-21*
