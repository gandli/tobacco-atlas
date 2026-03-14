# Tobacco Atlas Web Next.js App Router 迁移设计

## 背景

`tobacco-atlas-web` 当前主体仍然是 `Vite + React Router + React 18 + Tailwind + shadcn/ui` 架构，运行时入口位于 `src/main.tsx` 与 `src/App.tsx`。仓库中已经存在 `src/app/layout.tsx`、`src/app/page.tsx` 与 `src/app/providers.tsx`，说明项目曾尝试引入 Next.js，但迁移尚未完成，当前仍处于双轨混合状态。

本次目标不是单纯替换构建工具，而是将项目升级为标准的 `Next.js App Router` 应用，并以桌面端与移动端同时可用为硬性要求，建立后续持续迭代的稳定基础。

## 目标

- 将项目统一迁移到 `Next.js App Router`
- 保留现有页面信息架构与主要 URL 语义
- 同时支持桌面端与移动端，避免“桌面优先后补移动端”的模式
- 保留现有数据资产、组件资产与 Tailwind 设计 token，减少无谓重写
- 采用 Next.js 最佳实践优化渲染边界、路由结构、性能与可维护性
- 在迁移完成后移除 `Vite` 运行入口与 `react-router-dom` 运行依赖

## 非目标

- 本轮不优先重写全部视觉风格
- 本轮不引入复杂后端服务改造
- 本轮不先做大型 CMS、账号体系或实时系统重构
- 本轮不把所有组件立即重构成全新设计系统

## 当前状态分析

### 已识别的运行时问题

- 页面路由仍由 `src/App.tsx` 中的 `BrowserRouter` 控制
- `src/pages/*` 仍是主要页面来源，`src/app/*` 尚未真正接管项目
- 项目描述文档、依赖和文件结构对“当前是 Vite 还是 Next”并不一致
- `next-themes` 已被使用，但 Next.js 专属能力尚未完整落地
- 响应式能力存在，但整体更接近“桌面布局加移动补丁”，未形成系统性双端策略

### 当前资产中可直接复用的部分

- `src/components/*` 中的大量展示组件与 shadcn/ui 基础组件
- `src/data/*` 中的静态数据、类型和映射关系
- `src/lib/*` 中的工具函数与 i18n 初始化逻辑
- Tailwind 变量、字号、圆角和导航尺寸等设计 token
- 已有的 Vitest 测试基础

## 总体策略

采用“渐进式整站迁移”而不是一次性重写。

具体做法是：

1. 以 `Next.js App Router` 为最终唯一运行时入口
2. 先建立稳定的 Next.js 骨架和目录边界
3. 按路由分批将 `src/pages/*` 迁入 `src/app/*`
4. 在迁移过程中尽量复用组件、数据和样式，而不是同步做大规模视觉翻新
5. 当所有页面完成接管且验证通过后，再删除 `Vite` 和 `React Router` 相关入口

这样可以最小化风险，并避免在迁移过程中同时引入过多变量。

## 架构原则

### 1. App Router 作为唯一页面入口

- 所有可访问页面都迁入 `src/app`
- 使用 `layout.tsx`、动态路由目录、`not-found.tsx` 等标准 App Router 模式
- 迁移完成后不再通过 `src/main.tsx` 和 `src/App.tsx` 启动应用

### 2. Server Component 优先

- 页面默认使用 Server Component
- 仅在以下场景使用 Client Component：
  - 主题切换
  - Toast、Tooltip 等浏览器侧交互
  - 本地状态驱动的筛选、分页、动画和弹层
  - 依赖浏览器 API 的逻辑
- 避免整个页面被 `"use client"` 提升为纯客户端渲染

### 3. 数据模块保持纯净

- `src/data/*` 保持为可直接在服务端导入的纯模块
- 避免在数据模块中混入浏览器副作用
- 将“原始数据”“查询函数”“类型定义”拆分清晰

### 4. 一套信息架构，两套布局策略

- 不为桌面端和移动端维护两套页面
- 在相同 URL 和相同内容模型下，为桌面与移动端提供不同布局与交互形态
- 保证功能一致，但允许控件外观与排列在不同设备上不同

### 5. 迁移优先于美术重做

- 第一阶段先把运行结构、路由、响应式和性能基线迁稳
- 第二阶段再做更具博物馆叙事感的视觉提升

## 目标目录设计

迁移后建议保留如下结构：

```text
src/
  app/
    layout.tsx
    not-found.tsx
    globals.css
    providers.tsx
    page.tsx
    brands/page.tsx
    brand/[pinyin]/page.tsx
    sku/[id]/page.tsx
    manufacturers/page.tsx
    manufacturer/[name]/page.tsx
    gallery/page.tsx
    community/page.tsx
    chat/page.tsx
    feed/page.tsx
    my/page.tsx
    login/page.tsx
    register/page.tsx
    forgot-password/page.tsx
    submit/page.tsx
    admin/page.tsx
    changelog/page.tsx
  components/
    layout/
    navigation/
    museum/
    brands/
    sku/
    community/
    shared/
    ui/
  data/
    catalog/
    brands/
    manufacturers/
    queries/
    types.ts
  lib/
    i18n/
    routing/
    metadata/
    utils.ts
```

说明：

- `components/ui` 继续承载 shadcn/ui 基础能力
- 业务组件按领域拆分，降低 `components` 根目录继续膨胀的风险
- `app` 中只放路由、布局和紧贴页面的装配逻辑，不堆积复杂业务实现

## 路由迁移设计

### 页面映射

现有页面到 App Router 的映射如下：

- `/` -> `src/app/page.tsx`
- `/gallery` -> `src/app/gallery/page.tsx`
- `/brands` -> `src/app/brands/page.tsx`
- `/brand/:pinyin` -> `src/app/brand/[pinyin]/page.tsx`
- `/sku/:id` -> `src/app/sku/[id]/page.tsx`
- `/community` -> `src/app/community/page.tsx`
- `/chat` -> `src/app/chat/page.tsx`
- `/feed` -> `src/app/feed/page.tsx`
- `/my` -> `src/app/my/page.tsx`
- `/login` -> `src/app/login/page.tsx`
- `/register` -> `src/app/register/page.tsx`
- `/forgot-password` -> `src/app/forgot-password/page.tsx`
- `/submit` -> `src/app/submit/page.tsx`
- `/admin` -> `src/app/admin/page.tsx`
- `/manufacturers` -> `src/app/manufacturers/page.tsx`
- `/manufacturer/:name` -> `src/app/manufacturer/[name]/page.tsx`
- `/changelog` -> `src/app/changelog/page.tsx`

### 布局层设计

- 根布局承载全局字体、主题、Provider、基础元数据
- 顶部导航与移动底部导航在共享布局层装配
- 对未来可能需要登录态隔离的区域保留子布局扩展空间，例如：
  - `(public)`
  - `(account)`
  - `(community)`
  - `(admin)`

本轮不强制先引入 route groups，但目录设计应允许后续平滑演进。

## 响应式设计原则

### 全局原则

- 移动端不是“压缩桌面端”，而是重新安排信息顺序
- 所有主交互控件满足触控尺寸要求
- 减少 hover 依赖，保证无鼠标场景完整可用
- 保持桌面端的信息密度优势，同时避免超宽屏下内容失控

### 首页

- 桌面端保留更强的视觉叙事与并列信息布局
- 移动端采用单列节奏，首屏更强调标题、导览与快速进入内容
- `FloatingProducts` 这类装饰性或性能敏感模块需评估是否在移动端降级

### 列表页

- 桌面端使用多列网格、显式筛选、更多上下文信息
- 移动端采用单列或双列自适应卡片
- 筛选与排序在移动端改为抽屉、底部弹层或分段控件
- 分页、搜索和分类入口需保持在首屏可达范围内

### 详情页

- 移动端优先显示产品核心信息、操作按钮与主要图像
- 次级参数、扩展说明、评论可折叠或分区展示
- 桌面端可保留更完整的参数对照和评论分栏布局

### 导航

- 桌面端使用顶部导航
- 移动端保留底部主导航，并为次级入口提供抽屉或菜单
- 导航组件应尽量共享数据定义，避免双端导航链接分叉

## 性能与 Next.js 最佳实践

### 渲染策略

- 静态内容优先使用服务端渲染或静态生成
- 基于本地静态数据的页面可直接在服务端拼装
- 客户端仅承担交互增强，不承担整个页面初始渲染

### 资源策略

- 图片逐步迁移为 `next/image` 方案或兼容封装
- 字体迁移到 `next/font`
- 对重量级交互模块做动态加载与分块控制

### 包体积与依赖治理

- 删除 `react-router-dom` 运行依赖
- 评估是否仍需 `@tanstack/react-query` 全局注入
- 避免把所有 Provider 都提升到根部客户端层
- 检查 barrel import 和无用依赖，减少客户端 bundle 体积

## 国际化与元数据

### 国际化

- 当前仓库已有 `src/locales/*` 与 `src/lib/i18n.ts`
- 第一阶段不强制切换到完整的 Next i18n 路由方案
- 优先保证现有中英文文案能力在 App Router 下继续可用
- 后续如需要按 locale 分路由，可再设计 `/[locale]/*`

### 元数据

- 站点级 metadata 统一在根布局配置
- 品牌页、SKU 页、制造商页逐步补充动态 metadata
- 为分享卡片、搜索引擎摘要和中英双语标题提供基础支持

## 测试策略

### 迁移期间必须保留的验证能力

- `lint`
- `typecheck`
- 单元测试与组件测试
- 核心页面可访问性和渲染验证

### 建议重点覆盖的区域

- 首页渲染
- 品牌列表与品牌详情路由
- SKU 详情路由
- 导航在桌面和移动条件下的关键交互
- 404 页面与动态路由异常处理

### 后续增强

- 引入基于 Next 运行时的页面级测试
- 为移动端关键页面增加真实浏览器回归测试

## 迁移阶段划分

### 阶段 1：建立 Next 运行骨架

- 补齐 Next.js 配置、脚本和入口
- 明确 `app` 目录为唯一运行时入口
- 迁移全局样式、Provider、根布局、404

### 阶段 2：迁移公共布局和核心内容页

- 首页
- 品牌列表
- 品牌详情
- SKU 详情
- 制造商列表与详情

### 阶段 3：迁移次级功能页

- 画廊
- 社区
- 聊天
- 动态
- 我的页面

### 阶段 4：迁移账户与后台页

- 登录
- 注册
- 忘记密码
- 数据提交
- 管理后台
- 更新日志

### 阶段 5：移除旧运行时

- 删除 `src/main.tsx`
- 删除 `src/App.tsx`
- 删除 `react-router-dom` 运行链路
- 删除 Vite 专属入口和不再需要的配置

## 风险与应对

### 风险 1：Vite 与 Next 配置并存导致认知和构建混乱

应对：

- 先建立清晰的迁移目标文件结构
- 在迁移完成前标记哪些入口仍为过渡资产
- 在阶段末彻底删除旧入口，避免长期双轨

### 风险 2：组件 client/server 边界模糊

应对：

- 页面默认 server
- 对交互性强的组件单独下沉为 client
- 通过测试和类型检查及时发现边界错误

### 风险 3：移动端体验在迁移中退化

应对：

- 将移动端作为验收必测项，而不是收尾项
- 导航、列表、详情页都以触控场景单独审查
- 对 hover-only 行为提供移动端替代方案

### 风险 4：迁移时顺手做太多视觉重构，拖慢交付

应对：

- 第一阶段只做必要的结构和适配修复
- 第二阶段再做博物馆风格强化与视觉升级

## 验收标准

迁移完成后，应满足以下标准：

- 全部现有页面都有对应的 App Router 页面实现
- 桌面端与移动端均能完成主要浏览与导航流程
- 全站不再依赖 `BrowserRouter`
- 旧 `Vite` 入口不再参与运行
- 构建、类型检查和核心测试通过
- 样式系统、主题和中英文文案能力未明显回退

## 推荐的下一步

设计确认后，下一步应输出实施计划，明确：

- 先修改哪些配置与脚本
- 哪些页面按什么顺序迁移
- 每个任务涉及哪些文件
- 每一批迁移如何测试
- 何时删除旧入口和旧依赖

该计划应作为实现阶段的唯一执行清单。
