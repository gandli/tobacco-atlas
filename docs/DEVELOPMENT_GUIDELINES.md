# Tobacco-Atlas Web 开发规范

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: React Context + Hooks
- **测试**: Vitest + React Testing Library
- **部署**: Vercel + Cloudflare Pages

## 项目结构

```
src/
├── components/     # 可复用组件
│   ├── ui/         # UI 基础组件 (shadcn/ui)
│   └── layout/     # 布局组件
├── pages/          # 页面组件
├── hooks/          # 自定义 Hooks
├── lib/            # 工具函数和库
├── data/           # 静态数据和模拟数据
├── styles/         # 全局样式
└── App.tsx         # 主应用组件
```

## 编码规范

### TypeScript
- 使用严格模式 (`strict: true`)
- 所有类型必须显式声明
- 避免 `any` 类型，使用 `unknown` 或具体类型
- 接口命名使用 PascalCase

### React
- 函数组件优先
- 使用 TypeScript 泛型增强类型安全
- 组件 Props 使用接口定义
- 避免内联函数，使用 useCallback 优化

### 样式
- 优先使用 Tailwind CSS 工具类
- 复杂样式提取到单独的 CSS 文件
- 响应式设计使用 Tailwind 的断点系统
- 颜色使用主题配置，避免硬编码

### 测试
- 每个组件必须有对应的测试文件 (`*.test.tsx`)
- 测试覆盖率目标 > 80%
- 使用 TDD/BDD 开发流程
- 集成测试覆盖主要用户流程

## Git 工作流

- **main**: 生产环境
- **web**: 当前开发主分支
- **dev**: 功能开发分支
- **test**: 测试分支
- **feature/**: 特性分支
- **hotfix/**: 紧急修复分支

## 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/依赖更新
```

## 部署流程

1. 本地测试通过
2. 创建 PR 到 web 分支
3. Code Review 通过
4. 合并到 web 分支
5. 自动部署到预览环境
6. 验证通过后合并到 main

## 环境变量

- `.env.local`: 本地开发环境
- `.env.production`: 生产环境
- 敏感信息不要提交到版本控制

## 性能优化

- 组件懒加载
- 图片优化和懒加载
- 减少不必要的重渲染
- 使用 React.memo 和 useMemo
- 代码分割

## 安全考虑

- XSS 防护：使用安全的 API
- CSRF 防护：使用适当的 token
- 数据验证：前后端双重验证
- 权限控制：基于角色的访问控制