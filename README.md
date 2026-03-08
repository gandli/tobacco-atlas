# 中国烟草图谱 (Chinese Tobacco Atlas)

## 项目概述

这是一个基于 React 的 Web 应用程序，名为"中国烟草图谱"，使用现代 Web 技术构建。该项目是一个数字博物馆，展示中国香烟品牌和产品。项目采用当代技术栈，包括 Vite、TypeScript、React、shadcn/ui 和 Tailwind CSS。

## 技术栈

- **Vite**: 快速的构建工具和开发服务器
- **TypeScript**: 类型化的 JavaScript 超集
- **React**: 基于组件的 UI 库
- **React Router DOM**: 客户端路由
- **Tailwind CSS**: 实用优先的 CSS 框架
- **shadcn/ui**: 基于 Radix UI 和 Tailwind CSS 构建的可重用组件
- **TanStack Query (React Query)**: 服务器状态管理
- **Lucide React**: 图标库
- **Zod**: 模式验证
- **React Hook Form**: 表单管理与验证
- **Vitest**: 测试框架

## 项目结构

```
tobacco-atlas-web/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/         # 可重用的 UI 组件
│   ├── data/              # 数据文件和模拟数据
│   ├── hooks/             # 自定义 React hooks
│   ├── lib/               # 工具函数
│   ├── pages/             # 页面组件
│   ├── App.tsx           # 主应用程序组件
│   ├── main.tsx          # 应用程序入口点
│   └── index.css         # 全局样式
├── components.json        # shadcn/ui 配置
├── package.json           # 依赖项和脚本
├── vite.config.ts         # Vite 配置
├── tailwind.config.ts     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
└── index.html             # HTML 模板
```

## 核心功能

应用程序包含多个路由页面：
- 首页 (`/`)
- 画廊 (`/gallery`)
- 品牌列表 (`/brands`)
- 品牌详情页 (`/brand/:pinyin`)
- SKU 详情页 (`/sku/:id`)
- 社区 (`/community`)
- 聊天功能 (`/chat`)
- 动态 (`/feed`)
- 用户个人资料页 (`/my`)
- 404 未找到页面

## 网站架构分析

### 整体信息架构

网站结构为全面的中国香烟数据库和社区平台，包含以下主要部分：

1. **首页/收藏** (`/`): 主要产品列表页面，展示香烟产品
2. **品牌** (`/brands`): 按地理区域组织（中国大陆、港澳台、国际、历史）
3. **制造商** (`/manufacturers`): 显示烟草公司及其品牌
4. **社区** (`/community`): 用户社区部分（需要登录）
5. **动态** (`/feed`): 显示最近用户互动的活动动态
6. **单品页面** (`/sku/:id`): 详细的产品信息
7. **品牌页面** (`/brand/:id`): 特定品牌下的产品集合
8. **用户资料** (`/my`): 个人用户仪表板
9. **聊天** (`/chat`): 实时社区聊天功能

### 页面功能详情

#### 首页/收藏页面
- 以网格形式展示香烟产品图片
- 包含筛选选项（全部/规格/价格/排序）
- 总共展示 3,220 个产品
- 每个产品卡片显示：
  - 产品图片
  - 中英文名称
  - 品牌名称
  - 地区及英文翻译
  - 价格（如有）
  - 收藏和"标记为已尝试"按钮
- 底部有分页控件

#### 品牌页面
- 按地区组织：中国大陆（98个品牌）、港澳台（10个）、国际（37个）、历史（73个）
- 每个品牌卡片显示：
  - 品牌标志/图片
  - 中英文名称
  - 品牌下的产品数量
  - 拼音表示
- 品牌搜索功能

#### 制造商页面
- 显示制造商信息，包括公司详情（中英文）
- 以网格布局列出该制造商拥有的所有品牌
- 显示制造商的品牌总数
- 包含制造商标志/图片
- 可能显示公司历史、位置等企业信息
- 每个品牌链接到相应品牌页面

#### 单品（SKU）页面
- 大尺寸产品图片展示
- 详细产品信息：
  - 中英文名称
  - 品牌及公司信息
  - 中英文描述
  - 规格表格：
    - 烟草类型
    - 焦油、尼古丁、一氧化碳含量
    - 长度
    - 规格（如细支）
    - 每盒支数
    - 每条盒数
  - 条形码（盒装和条装）
  - 评分部分，包含口味、包装、价值和总体评分
- 交互元素：
  - 收藏按钮
  - 标记为已尝试
  - 愿望清单
- 底部评论区

#### 动态页面
- 按时间顺序显示社区成员活动
- 活动包括：
  - 尝试的产品
  - 添加的收藏
  - 愿望清单添加
- 每个活动显示用户、操作、产品和时间戳

#### 画廊页面
- 无限画布式布局，以网格展示产品
- 使用 WASD 键进行平移，Q/E 键进行缩放的交互式导航
- 默认显示 102% 缩放级别，带有缩放控件
- 包含大量产品，在连续空间中展示
- 每个产品图块显示产品名称
- 点击产品打开其详情页面

#### 聊天功能
- 从大多数页面可访问的实时聊天
- 显示在线用户数量
- 显示最近对话/消息
- 需要登录才能参与

## 构建和运行

### 先决条件
- Node.js 和 npm（或 bun）

### 安装和运行

1. **安装依赖：**
   ```bash
   npm install
   # 或
   bun install
   ```

2. **在开发模式下运行：**
   ```bash
   npm run dev
   # 或
   bun run dev
   ```
   
   应用程序将在 `http://localhost:8080` 提供服务（如 vite.config.ts 中配置）。

3. **构建生产版本：**
   ```bash
   npm run build
   # 或
   bun run build
   ```

4. **预览生产构建：**
   ```bash
   npm run preview
   # 或
   bun run preview
   ```

5. **运行测试：**
   ```bash
   npm run test
   # 或
   bun run test
   ```

6. **代码检查：**
   ```bash
   npm run lint
   # 或
   bun run lint
   ```

## 样式和 UI 框架

项目使用：
- **Tailwind CSS** 进行实用优先的样式设计
- **shadcn/ui** 提供无障碍 UI 组件
- **CSS 变量** 进行主题设置（支持明暗模式）
- **Typography 插件** 增强文本渲染

## 状态管理

- **React Query** 用于服务器状态管理和缓存
- **React hooks** 用于本地组件状态
- **React Router DOM** 用于客户端导航

## 开发约定

- 项目全程使用 TypeScript
- 组件遵循 shadcn/ui 设计系统
- 使用 `@` 别名配置绝对导入以指向 `src` 目录
- 广泛使用 Tailwind CSS 实用类
- 组件组织分离 UI 组件、页面和业务逻辑
- 使用 Tailwind 的响应式工具实现响应式设计

## 特别说明

- 项目配置为使用中文作为主要语言（index.html 中的 HTML lang 属性）
- 字体加载通过 Google Fonts 的预连接链接进行了优化
- 包含社交媒体元标签以更好地分享
- 通过 Radix UI 原语包含无障碍功能
- 在 Tailwind 主题中配置了暗模式支持

## 部署

项目可通过标准的静态站点部署方式进行部署，支持 Vercel、Netlify、GitHub Pages 等平台。