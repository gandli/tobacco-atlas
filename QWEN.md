# 中国烟草图谱 (Chinese Tobacco Atlas) - 项目上下文

## 项目概述

**中国烟草图谱** 是一个基于 Next.js App Router 的 Web 应用程序，作为数字博物馆展示中国香烟品牌和产品。项目采用现代 Web 技术栈，包括 Next.js、TypeScript、React、shadcn/ui 和 Tailwind CSS。

### 在线访问

| 平台 | 地址 |
|------|------|
| **Vercel** | https://tobacco-atlas.vercel.app |
| **Cloudflare** | https://tobacco-atlas.pages.dev |

## 技术栈

### 核心框架
- **Next.js 16** (App Router): 统一的应用运行时、路由与构建框架
- **React 18**: 基于组件的 UI 库
- **TypeScript 5.8**: 类型化的 JavaScript 超集

### UI 与样式
- **Tailwind CSS 3.4**: 实用优先的 CSS 框架
- **shadcn/ui**: 基于 Radix UI 和 Tailwind CSS 构建的可重用组件
- **Lucide React**: 图标库

### 状态管理与数据
- **TanStack Query 5**: 服务器状态管理
- **React Hook Form 7**: 表单管理
- **Zod**: 模式验证

### 国际化
- **i18next 25**: 国际化框架
- **react-i18next**: React 集成

### 测试
- **Vitest 3**: 测试框架
- **Testing Library**: React 测试工具
- **jsdom**: 浏览器环境模拟

## 项目结构

```
tobacco-atlas-web/
├── env/                    # 环境变量配置
│   ├── .env.development
│   ├── .env.staging
│   └── .env.production
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── app/               # Next.js App Router 页面与布局
│   │   ├── brand/[pinyin]/    # 品牌详情页
│   │   ├── brands/            # 品牌列表页
│   │   ├── changelog/         # 更新日志页
│   │   ├── chat/              # 聊天功能页
│   │   ├── community/         # 社区页
│   │   ├── feed/              # 动态页
│   │   ├── maker/[name]/      # 制造商详情页
│   │   ├── makers/            # 制造商列表页
│   │   ├── manufacturer/[name]/ # 厂商详情页
│   │   ├── manufacturers/     # 厂商列表页
│   │   ├── sku/[id]/          # 单品详情页
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── loading.tsx        # 加载状态
│   │   ├── not-found.tsx      # 404 页面
│   │   └── providers.tsx      # 上下文提供者
│   ├── components/         # 可重用的 UI 组件
│   │   ├── ui/            # shadcn/ui 基础组件
│   │   ├── catalog/       # 目录相关组件
│   │   └── ...            # 其他组件
│   ├── data/              # 数据文件和目录
│   │   ├── brand-catalog.ts
│   │   ├── product-catalog.ts
│   │   ├── maker-catalog.ts
│   │   └── ...
│   ├── features/          # 功能模块
│   │   └── pages/        # 页面级组件
│   ├── hooks/             # 自定义 React hooks
│   ├── lib/               # 工具函数
│   │   ├── i18n.ts       # i18n 配置
│   │   └── utils.ts      # 通用工具
│   ├── locales/           # 国际化翻译文件
│   │   ├── zh-CN/
│   │   └── en-US/
│   └── test/              # 测试配置
│       └── setup.ts      # Vitest 测试设置
├── .github/workflows/     # GitHub Actions 工作流
│   └── vercel.yml        # Vercel 自动部署
├── docs/                  # 文档
│   └── DEPLOYMENT.md     # 部署指南
├── scripts/               # 辅助脚本
├── components.json        # shadcn/ui 配置
├── next.config.ts         # Next.js 配置
├── tailwind.config.ts     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── vitest.config.ts       # Vitest 配置
├── vercel.json            # Vercel 部署配置
└── wrangler.toml          # Cloudflare Wrangler 配置
```

## 构建和运行

### 先决条件
- **Node.js 20.x** 或更高版本
- **npm** 或 **bun** 包管理器

### 安装依赖

```bash
npm install
# 或
bun install
```

### 开发模式

```bash
npm run dev
# 或
bun run dev
```

应用程序将在 `http://localhost:3000` 启动（Next.js 默认端口）。

### 生产构建

```bash
# 构建
npm run build
# 或
bun run build

# 启动生产服务器
npm run start
# 或
bun run start
```

### 测试

```bash
# 运行测试
npm run test
# 或
bun run test

# 监听模式
npm run test:watch
```

### 代码质量

```bash
# ESLint 检查
npm run lint

# TypeScript 类型检查
npm run typecheck
```

## 部署

### 环境说明

| 环境 | 分支 | 用途 |
|------|------|------|
| Development | 本地 | 本地开发 |
| Staging | dev | 预发布测试 |
| Production | main | 正式生产 |

### 自动部署（推荐）

项目配置了 GitHub Actions 自动部署：

- **Push 到 dev 分支**: 自动部署到 Staging 环境
- **Push 到 main 分支**: 自动部署到 Production 环境
- **Pull Request**: 自动创建预览部署

需要在 GitHub Secrets 中配置：
- `VERCEL_TOKEN`: Vercel 部署 Token
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID

### 手动部署

#### Vercel 部署

```bash
# 预览部署
npm run deploy:vercel:preview

# 生产部署
npm run deploy:vercel

# 回滚
npm run rollback:vercel
```

#### Cloudflare Pages 部署

```bash
# 生产部署
npm run deploy:cf

# Staging 部署
npm run deploy:cf:staging

# 回滚
npm run rollback:cf
```

详细部署文档请参阅 [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)。

## 开发约定

### Git 工作流

- **功能分支**: `feature/*` 命名
- **开发分支**: `dev` - 自动部署到 Staging
- **主分支**: `main` - 自动部署到 Production

### Git Worktree（并行开发）

当需要并行开发多个功能时，使用 git worktree：

```bash
# 创建新 worktree
git worktree add ../tobacco-atlas-feature-x feature-x

# 在 worktree 中工作
cd ../tobacco-atlas-feature-x
npm install
npm run dev

# 完成后清理
git worktree remove <path>
```

### 代码规范

- **TypeScript**: 全程使用，但允许 `noImplicitAny: false`
- **组件命名**: PascalCase（如 `ProductCard.tsx`）
- **工具函数**: camelCase（如 `formatCurrency.ts`）
- **导入路径**: 使用 `@/` 别名指向 `src/` 目录

### 测试实践

- 测试文件命名：`*.test.ts` 或 `*.test.tsx`
- 使用 Vitest 作为测试运行器
- 使用 Testing Library 进行组件测试
- 测试设置位于 `src/test/setup.ts`

### 服务器管理

- **单开发服务器规则**: 每个项目只应运行一个开发服务器
- 使用 `lsof -i :<port>` 检查端口占用
- 避免重复启动实例

## 核心功能模块

### 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页/产品收藏 |
| `/brands` | 品牌列表 |
| `/brand/:pinyin` | 品牌详情 |
| `/makers` | 制造商列表 |
| `/maker/:name` | 制造商详情 |
| `/sku/:id` | 单品详情 |
| `/gallery` | 画廊（无限画布） |
| `/feed` | 用户动态 |
| `/community` | 社区 |
| `/chat` | 实时聊天 |
| `/my` | 用户资料 |
| `/changelog` | 更新日志 |

### 数据目录

- **brand-catalog.ts**: 品牌数据目录
- **product-catalog.ts**: 产品目录
- **maker-catalog.ts**: 制造商目录
- **region-labels.ts**: 地区标签映射

### 国际化

支持中文（zh-CN）和英文（en-US）：

```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation('details');
  const isEnglish = isEnglishLanguage(i18n.resolvedLanguage);
}
```

## 设计系统

### 颜色系统

项目使用 CSS 变量定义主题色：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --gold: #c5a059;
  --ash: #0b0b0d;
  /* ... */
}
```

### 字体配置

```typescript
fontFamily: {
  serif: ['"Noto Serif SC"', "serif"],
  sans: ['"DM Sans"', "sans-serif"],
}
```

### 自定义尺寸

```typescript
fontSize: {
  "2xs": ["0.625rem"], // 10px
  "11": ["0.6875rem"], // 11px
  "13": ["0.8125rem"], // 13px
  "36": ["2.25rem"],   // 36px
}
```

## 环境变量

### 配置文件结构

```
env/
├── .env.development    # 开发环境
├── .env.staging        # 预发布环境
└── .env.production     # 生产环境
```

### 可用变量

| 变量名 | 说明 |
|--------|------|
| `VITE_APP_ENV` | 应用环境标识 |
| `VITE_API_URL` | 后端 API 地址 |
| `VITE_DEBUG` | 调试模式开关 |

> ⚠️ **注意**: 以 `VITE_` 开头的变量会打包到前端代码中，不要存储敏感信息！

## 版本发布

使用 standard-version 进行版本管理：

```bash
# 预览发布
npm run release:dry

# 主版本发布
npm run release:major

# 次版本发布
npm run release:minor

# 补丁版本发布
npm run release:patch
```

## 相关文档

- [README.md](./README.md) - 项目概述
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md) - 开发规则
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - 部署指南
- [CIGGIES_DESIGN_DOC.md](./CIGGIES_DESIGN_DOC.md) - 设计文档
- [CHANGELOG.md](./CHANGELOG.md) - 变更日志
