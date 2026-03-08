# 组件规范

## 核心组件

### 1. 导航组件
- **Navbar**: 顶部导航栏，包含 Logo、主导航链接、用户操作
- **MobileNav**: 移动端导航菜单，响应式设计
- **NavLink**: 导航链接组件，支持高亮当前页面

### 2. 布局组件
- **HeroSection**: 首页英雄区域，包含标题、副标题、行动按钮
- **ProductGrid**: 产品网格布局，支持分页和筛选
- **ProductCard**: 产品卡片，显示品牌/制造商信息、图片、价格范围

### 3. 页面组件
- **BrandList**: 品牌列表页面，支持搜索和分类
- **ManufacturerList**: 制造商列表页面，显示详细信息
- **AdminDashboard**: 管理员仪表板，数据统计和管理功能
- **SubmitData**: 数据提交表单，用于用户贡献数据
- **Login/Register**: 认证相关页面

### 4. 功能组件
- **Toast**: 通知提示组件
- **Modal**: 弹窗对话框
- **Form**: 表单组件，包含验证逻辑

## 技术规范

### 样式系统
- 使用 Tailwind CSS 进行样式开发
- 遵循原子化 CSS 原则
- 响应式设计断点：sm(640px), md(768px), lg(1024px), xl(1280px)

### 状态管理
- 使用 React Context API 进行全局状态管理
- 复杂状态使用 Zustand 或 Redux（如需要）

### 数据获取
- 使用 React Query 进行数据获取和缓存
- API 调用封装在 `src/lib/api` 目录

### 测试要求
- 所有组件必须有对应的测试文件 (`*.test.tsx`)
- 单元测试覆盖率目标：80%+
- E2E 测试覆盖核心用户流程

## 文件结构约定

```
src/
├── components/     # 可复用组件
│   ├── ui/         # 基础 UI 组件
│   └── layout/     # 布局组件
├── pages/          # 页面组件
├── hooks/          # 自定义 Hook
├── lib/            # 工具函数和库
├── data/           # 静态数据和模拟数据
└── types/          # TypeScript 类型定义
```