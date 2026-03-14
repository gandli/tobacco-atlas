# Tobacco Atlas Web Next.js App Router Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `tobacco-atlas-web` 从 `Vite + React Router` 迁移为以 `Next.js App Router` 为唯一入口的双端友好应用，并移除旧运行时。

**Architecture:** 采用渐进式整站迁移。先建立可运行的 Next.js 基础设施和共享布局，再按路由批量接管页面与导航，最后删除 Vite/React Router 入口并修复测试与构建链路。页面默认使用 Server Components，交互区域再下沉为 Client Components。

**Tech Stack:** Next.js App Router, React 18/19-compatible patterns, TypeScript, Tailwind CSS, shadcn/ui, next-themes, Vitest, Testing Library

---

## Chunk 1: 基础设施与运行入口

### Task 1: 建立 Next.js 运行与开发脚本

**Files:**
- Modify: `package.json`
- Create: `next.config.ts`
- Modify: `tsconfig.json`
- Modify: `eslint.config.js`
- Modify: `postcss.config.js`
- Modify: `tailwind.config.ts`
- Modify: `README.md`

- [ ] **Step 1: 为 Next.js 配置写失败前检查**

Run: `node -e "const p=require('./package.json'); console.log(Boolean(p.dependencies?.next), p.scripts.dev, p.scripts.build)"`
Expected: 输出 `false vite vite build` 或等价结果，确认项目尚未切到 Next.js

- [ ] **Step 2: 添加 Next.js 依赖与脚本**

在 `package.json` 中：
- 添加 `next`
- 将 `dev/build/start` 脚本切换为 `next dev`、`next build`、`next start`
- 保留 `lint`、`typecheck`、`test`
- 将 Vite 专属脚本标记为待删除或移除

- [ ] **Step 3: 新建 Next.js 配置文件**

在 `next.config.ts` 中配置：
- `reactStrictMode: true`
- `experimental` 只在必要时启用
- 兼容静态资源路径与图片域配置

- [ ] **Step 4: 调整 TypeScript 与 ESLint**

在 `tsconfig.json` 与 `eslint.config.js` 中：
- 兼容 `next-env.d.ts`
- 加入 Next 推荐配置
- 保留现有路径别名 `@/*`

- [ ] **Step 5: 调整 PostCSS 与 Tailwind 的 Next 运行兼容性**

确认 `postcss.config.js`、`tailwind.config.ts` 在 Next 下仍可工作，移除仅 Vite 需要的部分。

- [ ] **Step 6: 更新 README 中的运行说明**

将本地开发、构建、启动说明改为 Next.js 流程，并标注迁移完成后不再使用 Vite。

- [ ] **Step 7: 安装依赖并验证基础脚本可执行**

Run: `npm install`
Expected: 成功安装 Next.js 及相关依赖

- [ ] **Step 8: 运行类型检查和 lint 基线**

Run: `npm run typecheck`
Expected: 可能失败，但失败应聚焦于已知入口或 Next 缺失文件，而不是配置损坏

Run: `npm run lint`
Expected: 可能失败，但 ESLint 能成功启动

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json eslint.config.js postcss.config.js tailwind.config.ts README.md
git commit -m "build: switch project runtime to nextjs"
```

### Task 2: 统一 Next 根布局与全局提供器

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/providers.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/index.css`
- Create: `src/app/not-found.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: 写出根布局预期的失败测试或断言迁移点**

把 `src/App.test.tsx` 改造成针对 App Router 根结构的占位验证，明确不再依赖 `BrowserRouter`。

- [ ] **Step 2: 收敛全局样式入口**

将 `src/index.css` 的设计 token 迁入 `src/app/globals.css` 或让其被统一导入，确保 Next 根布局只依赖一个全局样式入口。

- [ ] **Step 3: 精简 Providers 边界**

在 `src/app/providers.tsx` 中：
- 保留 `ThemeProvider`
- 保留 `Toaster` / `Tooltip`
- 重新评估 `QueryClientProvider` 是否需要全局保留
- 确保 i18n 初始化不会破坏服务端渲染

- [ ] **Step 4: 完成 `layout.tsx`**

在 `src/app/layout.tsx` 中：
- 统一 metadata
- 使用 `next/font`
- 引入全局样式
- 装配 `Providers`

- [ ] **Step 5: 新建 App Router 的 `not-found.tsx`**

将旧 `src/pages/NotFound.tsx` 的语义迁移为标准 Next 404 页面，不依赖 `useLocation`。

- [ ] **Step 6: 验证基础页面可启动**

Run: `npm run dev`
Expected: Next 开发服务器启动成功，访问 `/` 时能返回现有首页或占位首页

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/providers.tsx src/app/globals.css src/index.css src/app/not-found.tsx src/App.test.tsx
git commit -m "refactor: establish next app shell"
```

## Chunk 2: 共享导航与首页接管

### Task 3: 将导航组件从 React Router 迁到 Next 导航 API

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/MobileNav.tsx`
- Modify: `src/components/NavLink.tsx`
- Modify: `src/components/ThemeToggle.tsx`
- Create: `src/lib/routing/navigation.ts`
- Test: `src/components/Navbar.test.tsx`
- Test: `src/components/MobileNav.test.tsx`
- Test: `src/components/NavLink.test.tsx`

- [ ] **Step 1: 写出导航 API 迁移测试**

将现有测试中的 `react-router-dom` mock 迁移为 `next/navigation` 与 `next/link` 兼容测试包装。

- [ ] **Step 2: 抽出统一导航数据与路径辅助**

在 `src/lib/routing/navigation.ts` 中定义主导航项、激活态判断辅助函数与移动端入口配置，避免桌面和移动端分叉。

- [ ] **Step 3: 重写 `NavLink`**

将 `react-router-dom/NavLink` 改为基于 `next/link` 与 `usePathname()` 的实现。

- [ ] **Step 4: 重写 `Navbar` 与 `MobileNav`**

移除 `useNavigate`、`useLocation` 依赖，保留当前视觉行为并提升移动触控可用性。

- [ ] **Step 5: 跑导航测试**

Run: `npm run test -- src/components/NavLink.test.tsx src/components/Navbar.test.tsx src/components/MobileNav.test.tsx`
Expected: 关键导航测试通过

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.tsx src/components/MobileNav.tsx src/components/NavLink.tsx src/components/ThemeToggle.tsx src/lib/routing/navigation.ts src/components/Navbar.test.tsx src/components/MobileNav.test.tsx src/components/NavLink.test.tsx
git commit -m "refactor: migrate shared navigation to next routing"
```

### Task 4: 用 App Router 接管首页

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/FloatingProducts.tsx`
- Modify: `src/components/ProductGrid.tsx`
- Modify: `src/components/ProductCard.tsx`
- Test: `src/components/HeroSection.test.tsx`
- Test: `src/components/ProductGrid.test.tsx`
- Test: `src/components/ProductCard.test.tsx`

- [ ] **Step 1: 为首页组件替换路由依赖写测试**

将 `ProductCard`、`HeroSection`、`ProductGrid` 的测试包装从 `react-router-dom` 改为 `next/link` 兼容方案。

- [ ] **Step 2: 接管 `src/app/page.tsx`**

让首页通过 App Router 使用共享导航、Hero 与产品网格，不再依赖旧 `src/pages/Index.tsx` 作为运行入口。

- [ ] **Step 3: 优化首页双端策略**

在不大改视觉的前提下：
- 保留桌面布局节奏
- 校正移动端首屏间距、底部导航留白和卡片点击区域
- 评估 `FloatingProducts` 在移动端的降级策略

- [ ] **Step 4: 跑首页相关测试**

Run: `npm run test -- src/components/HeroSection.test.tsx src/components/ProductGrid.test.tsx src/components/ProductCard.test.tsx`
Expected: 首页关键组件测试通过

- [ ] **Step 5: 手动验证首页**

Run: `npm run dev`
Expected: `/` 在桌面宽度和移动宽度下都能正常渲染、导航和滚动

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/HeroSection.tsx src/components/FloatingProducts.tsx src/components/ProductGrid.tsx src/components/ProductCard.tsx src/components/HeroSection.test.tsx src/components/ProductGrid.test.tsx src/components/ProductCard.test.tsx
git commit -m "feat: migrate home page to next app router"
```

## Chunk 3: 核心内容页迁移

### Task 5: 迁移品牌与制造商列表页

**Files:**
- Create: `src/app/brands/page.tsx`
- Create: `src/app/manufacturers/page.tsx`
- Modify: `src/pages/BrandList.tsx`
- Modify: `src/pages/ManufacturerList.tsx`
- Modify: `src/data/brands.ts`
- Modify: `src/data/manufacturers.ts`
- Test: `src/pages/ManufacturerList.test.tsx`

- [ ] **Step 1: 抽出列表页可复用展示逻辑**

将现有 `BrandList`、`ManufacturerList` 页面中与路由无关的 UI 逻辑整理成可被 App Router 页面直接调用的组件或纯函数。

- [ ] **Step 2: 创建 `brands` 与 `manufacturers` 页面**

在 `src/app/brands/page.tsx` 与 `src/app/manufacturers/page.tsx` 中直接装配数据与展示层。

- [ ] **Step 3: 优化移动端筛选和网格**

保证品牌和制造商列表在移动端：
- 搜索框可用
- 网格不挤压
- 点击区域足够大

- [ ] **Step 4: 修复和迁移列表页测试**

让 `src/pages/ManufacturerList.test.tsx` 不再依赖 `BrowserRouter`，必要时迁移到新的组件级测试文件。

- [ ] **Step 5: 运行测试**

Run: `npm run test -- src/pages/ManufacturerList.test.tsx`
Expected: 测试通过，或已迁到新测试文件并通过

- [ ] **Step 6: Commit**

```bash
git add src/app/brands/page.tsx src/app/manufacturers/page.tsx src/pages/BrandList.tsx src/pages/ManufacturerList.tsx src/data/brands.ts src/data/manufacturers.ts src/pages/ManufacturerList.test.tsx
git commit -m "feat: migrate brand and manufacturer listing pages"
```

### Task 6: 迁移品牌详情、制造商详情和 SKU 详情页

**Files:**
- Create: `src/app/brand/[pinyin]/page.tsx`
- Create: `src/app/manufacturer/[name]/page.tsx`
- Create: `src/app/sku/[id]/page.tsx`
- Modify: `src/pages/BrandDetail.tsx`
- Modify: `src/pages/ManufacturerDetail.tsx`
- Modify: `src/pages/SkuDetail.tsx`
- Modify: `src/components/ProductCard.tsx`

- [ ] **Step 1: 抽出基于参数查询数据的纯函数**

把 `useParams` 依赖改造成接收 `pinyin`、`name`、`id` 参数的纯查询辅助，方便服务端页面直接调用。

- [ ] **Step 2: 创建动态路由页面**

在 `brand/[pinyin]`、`manufacturer/[name]`、`sku/[id]` 中使用 App Router `params` 接口渲染详情页。

- [ ] **Step 3: 补充 404/异常分支**

当参数不存在时：
- 调用 `notFound()`
- 不再依赖客户端导航兜底

- [ ] **Step 4: 优化详情页移动端布局**

保证在小屏下：
- 图片、标题、操作按钮优先展示
- 参数表格可折行或分组
- 长文本和评论区域不压迫首屏

- [ ] **Step 5: 手动验证三类详情页**

Run: `npm run dev`
Expected: `/brand/<pinyin>`、`/manufacturer/<name>`、`/sku/<id>` 可正常渲染并支持桌面/移动宽度浏览

- [ ] **Step 6: Commit**

```bash
git add src/app/brand/[pinyin]/page.tsx src/app/manufacturer/[name]/page.tsx src/app/sku/[id]/page.tsx src/pages/BrandDetail.tsx src/pages/ManufacturerDetail.tsx src/pages/SkuDetail.tsx src/components/ProductCard.tsx
git commit -m "feat: migrate detail pages to dynamic app routes"
```

## Chunk 4: 次级页面与账户页面迁移

### Task 7: 迁移次级内容页

**Files:**
- Create: `src/app/gallery/page.tsx`
- Create: `src/app/community/page.tsx`
- Create: `src/app/chat/page.tsx`
- Create: `src/app/feed/page.tsx`
- Create: `src/app/my/page.tsx`
- Modify: `src/pages/Gallery.tsx`
- Modify: `src/pages/Community.tsx`
- Modify: `src/pages/Chat.tsx`
- Modify: `src/pages/Feed.tsx`
- Modify: `src/pages/MyPage.tsx`

- [ ] **Step 1: 将这些页面切成 App Router 可装配单元**

保留原有视觉和业务逻辑，移除 `useNavigate`、`Link` 等 React Router 依赖。

- [ ] **Step 2: 单独处理 `Gallery` 的客户端边界**

如果 `Gallery` 强依赖键盘交互、缩放和平移，将其保留为局部 Client Component，但页面壳层仍由 Server Component 提供。

- [ ] **Step 3: 手动验证次级页面**

Run: `npm run dev`
Expected: `/gallery`、`/community`、`/chat`、`/feed`、`/my` 全部可访问

- [ ] **Step 4: Commit**

```bash
git add src/app/gallery/page.tsx src/app/community/page.tsx src/app/chat/page.tsx src/app/feed/page.tsx src/app/my/page.tsx src/pages/Gallery.tsx src/pages/Community.tsx src/pages/Chat.tsx src/pages/Feed.tsx src/pages/MyPage.tsx
git commit -m "feat: migrate secondary content pages"
```

### Task 8: 迁移账户与后台相关页面

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`
- Create: `src/app/forgot-password/page.tsx`
- Create: `src/app/submit/page.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/changelog/page.tsx`
- Modify: `src/pages/Login.tsx`
- Modify: `src/pages/Register.tsx`
- Modify: `src/pages/ForgotPassword.tsx`
- Modify: `src/pages/SubmitData.tsx`
- Modify: `src/pages/AdminDashboard.tsx`
- Modify: `src/pages/Changelog.tsx`

- [ ] **Step 1: 迁移所有表单页面的路由 API**

将 `useNavigate` 替换为 `useRouter()` 或直接使用链接跳转。

- [ ] **Step 2: 审查客户端状态与表单处理**

这些页面大概率需要 `"use client"`，但只把表单层设为 client，避免整个页面壳层下沉。

- [ ] **Step 3: 手动验证所有账户与后台路径**

Run: `npm run dev`
Expected: `/login`、`/register`、`/forgot-password`、`/submit`、`/admin`、`/changelog` 可访问

- [ ] **Step 4: Commit**

```bash
git add src/app/login/page.tsx src/app/register/page.tsx src/app/forgot-password/page.tsx src/app/submit/page.tsx src/app/admin/page.tsx src/app/changelog/page.tsx src/pages/Login.tsx src/pages/Register.tsx src/pages/ForgotPassword.tsx src/pages/SubmitData.tsx src/pages/AdminDashboard.tsx src/pages/Changelog.tsx
git commit -m "feat: migrate account and admin pages"
```

## Chunk 5: 清理旧入口并完成验证

### Task 9: 移除 Vite 与 React Router 运行链路

**Files:**
- Delete: `src/main.tsx`
- Delete: `src/App.tsx`
- Delete: `vite.config.ts`
- Modify: `package.json`
- Modify: `vercel.json`
- Modify: `wrangler.toml`
- Modify: `public/_redirects`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: 删除旧运行入口前做引用搜索**

Run: `rg -n "react-router-dom|BrowserRouter|createRoot|vite" src package.json vite.config.ts`
Expected: 只剩少量待清理引用

- [ ] **Step 2: 删除不再使用的运行文件**

删除 `src/main.tsx`、`src/App.tsx`、`vite.config.ts`，并在部署配置中切换为 Next.js 部署方式。

- [ ] **Step 3: 清理依赖**

从 `package.json` 中移除：
- `react-router-dom`
- `vite`
- `@vitejs/plugin-react-swc`
- 其他仅 Vite 使用的构建依赖

- [ ] **Step 4: 运行依赖安装与检查**

Run: `npm install`
Expected: lockfile 更新成功

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vercel.json wrangler.toml public/_redirects src/App.test.tsx
git rm src/main.tsx src/App.tsx vite.config.ts
git commit -m "chore: remove vite and react-router runtime"
```

### Task 10: 完成全量验证与文档收尾

**Files:**
- Modify: `README.md`
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/DEPLOYMENT.md`
- Modify: `docs/README.md`

- [ ] **Step 1: 运行完整类型检查**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 2: 运行完整 lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: 运行完整测试**

Run: `npm run test`
Expected: PASS

- [ ] **Step 4: 做一次手动路由回归**

人工验证以下路径：
- `/`
- `/brands`
- `/brand/<sample>`
- `/sku/<sample>`
- `/manufacturers`
- `/gallery`
- `/login`
- 任意不存在路径

Expected: 全部可访问或正确进入 404，桌面与移动端都可用

- [ ] **Step 5: 更新架构和部署文档**

在项目文档中去除 Vite 描述，统一改为 Next.js App Router 架构。

- [ ] **Step 6: Commit**

```bash
git add README.md docs/ARCHITECTURE.md docs/DEPLOYMENT.md docs/README.md
git commit -m "docs: finalize nextjs migration documentation"
```
