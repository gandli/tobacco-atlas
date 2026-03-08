# Tobacco Atlas Web 项目架构

## 技术栈

- **前端框架**: React.js + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **包管理**: Bun
- **部署**: Cloudflare Pages + Vercel

## 项目结构

```
src/
├── components/     # 可复用组件
│   ├── ui/         # UI 基础组件
│   └── layout/     # 布局组件
├── pages/          # 页面组件
│   ├── BrandList.tsx
│   ├── ManufacturerList.tsx
│   ├── AdminDashboard.tsx
│   └── SubmitData.tsx
├── data/           # 数据层
├── hooks/          # 自定义 Hook
├── lib/            # 工具函数
└── App.tsx         # 根组件
```

## 状态管理

- 使用 React Context API 进行全局状态管理
- 表单状态使用 React Hook Form
- 数据获取使用 SWR 或原生 fetch

## 路由

- 使用 React Router v6
- 支持客户端路由和服务器端渲染

## 测试策略

- 组件测试: Vitest + React Testing Library
- E2E 测试: Playwright (待实现)
- 代码覆盖率目标: >= 80%

## 部署流程

1. **开发**: `bun dev` - 本地开发服务器
2. **构建**: `bun run build` - 生成生产版本
3. **预览**: Cloudflare Pages Preview 或 Vercel Preview
4. **生产**: 自动部署到 Cloudflare Pages 和 Vercel

## 性能优化

- 代码分割 (Code Splitting)
- 图片懒加载
- 关键资源预加载
- PWA 支持