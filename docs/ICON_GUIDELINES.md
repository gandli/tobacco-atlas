# 图标使用指南 (Icon Guidelines)

> 中国烟草图谱 - 图标系统规范  
> 基于 Design Context 和 WCAG AA 无障碍标准

---

## 📋 目录

1. [图标库选择](#图标库选择)
2. [核心图标清单](#核心图标清单)
3. [使用规范](#使用规范)
4. [无障碍要求](#无障碍要求)
5. [性能优化](#性能优化)

---

## 图标库选择

### 主推方案 - Lucide React

**当前项目已使用** `lucide-react` (0.462.0)，这是最佳选择：

| 优势 | 说明 |
|------|------|
| ✅ 风格统一 | 全部 outline 风格，符合「档案感 + 专业」定位 |
| ✅ 与 shadcn/ui 一致 | 官方推荐图标库，组件无缝搭配 |
| ✅ TypeScript 支持 | 完整类型定义 |
| ✅ Tree Shaking | 按需导入，打包优化 |
| ✅ 维护活跃 | 持续更新，1,703+ 图标 |

### 备选方案（如需扩展）

如需更多图标变体，可添加：

```bash
# Phosphor Icons - 多种风格变体
npm install @phosphor-icons/react

# Tabler Icons - 更多图标数量
npm install @tabler/icons-react

# Simple Icons - 品牌 Logo
npm install @icons-pack/react-simple-icons
```

---

## 核心图标清单

### 1. 导航与布局

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 首页 | `Home` | `lucide:home` | 导航栏、面包屑 |
| 品牌 | `Library` | `lucide:library` | 品牌列表页 |
| 制造商 | `Building2` | `lucide:building-2` | 制造商页面 |
| 社区 | `Users` | `lucide:users` | 社区页 |
| 动态 | `Feed` | `lucide:feed` | 动态流 |
| 聊天 | `MessageCircle` | `lucide:message-circle` | 聊天功能 |
| 用户 | `UserCircle2` | `lucide:user-circle-2` | 用户菜单 |

### 2. 产品操作

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 收藏 | `Bookmark` | `lucide:bookmark` | 产品收藏 |
| 喜欢 | `Heart` | `lucide:heart` | 点赞/喜欢 |
| 评分 | `Star` | `lucide:star` | 产品评分 |
| 尝试过 | `CheckCircle` | `lucide:check-circle` | 标记尝试 |
| 愿望单 | `Heart` (outline) | `lucide:heart` | 愿望清单 |

### 3. 筛选与排序

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 搜索 | `Search` | `lucide:search` | 搜索框 |
| 筛选 | `Filter` | `lucide:filter` | 筛选器 |
| 排序 | `ArrowUpDown` | `lucide:arrow-up-down` | 排序按钮 |
| 网格视图 | `Grid` | `lucide:grid` | 网格布局切换 |
| 列表视图 | `List` | `lucide:list` | 列表布局切换 |

### 4. 导航操作

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 返回 | `ArrowLeft` | `lucide:arrow-left` | 返回按钮 |
| 关闭 | `X` | `lucide:x` | 关闭对话框 |
| 菜单 | `Menu` | `lucide:menu` | 汉堡菜单 |
| 更多 | `MoreHorizontal` | `lucide:more-horizontal` | 更多选项 |
| 展开 | `ChevronDown` | `lucide:chevron-down` | 下拉菜单 |
| 下一步 | `ChevronRight` | `lucide:chevron-right` | 分页/导航 |

### 5. 主题与设置

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 亮色 | `Sun` | `lucide:sun` | 切换到亮色主题 |
| 暗色 | `Moon` | `lucide:moon` | 切换到暗色主题 |
| 系统 | `Monitor` | `lucide:monitor` | 跟随系统 |
| 语言 | `Globe` | `lucide:globe` | 语言切换 |
| 设置 | `Settings` | `lucide:settings` | 设置页面 |

### 6. 状态与反馈

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 成功 | `Check` | `lucide:check` | 成功状态 |
| 错误 | `X` | `lucide:x` | 错误状态 |
| 警告 | `AlertTriangle` | `lucide:alert-triangle` | 警告提示 |
| 信息 | `Info` | `lucide:info` | 信息提示 |
| 加载中 | `Loader2` | `lucide:loader-2` | 加载状态 |

### 7. 分享与导出

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 分享 | `Share2` | `lucide:share-2` | 分享功能 |
| 复制链接 | `Link` | `lucide:link` | 复制链接 |
| 下载 | `Download` | `lucide:download` | 下载 |
| 上传 | `Upload` | `lucide:upload` | 上传 |
| 外部链接 | `ExternalLink` | `lucide:external-link` | 外链标识 |

### 8. 品牌与社会图标

| 用途 | 图标组件 | 导入 | 使用场景 |
|------|---------|------|---------|
| 微信 | `SiWechat` | `simple-icons:wechat` | 微信分享 |
| 微博 | `SiWeibo` | `simple-icons:weibo` | 微博分享 |
| GitHub | `Github` | `lucide:github` | GitHub 链接 |

---

## 使用规范

### 导入方式

```typescript
// ✅ 推荐：按需导入单个图标
import { Home, Search, Filter } from "lucide-react";

// ❌ 避免：导入全部
import * as Icons from "lucide-react";

// ❌ 避免：在循环中动态导入
```

### 尺寸规范

```tsx
// 使用 Tailwind 类控制尺寸
<Home className="h-4 w-4" />      // 16px - 小图标
<Home className="h-5 w-5" />      // 20px - 默认
<Home className="h-6 w-6" />      // 24px - 中等
<Home className="h-8 w-8" />      // 32px - 大图标

// 或使用 size prop
<Home size={20} />
<Home size={24} strokeWidth={2} />
```

### 颜色规范

```tsx
// 使用 Tailwind 颜色类
<Home className="text-foreground" />
<Home className="text-muted-foreground" />
<Home className="text-primary" />
<Home className="text-gold" />  {/* 强调色 */}

// 或使用 color prop
<Home color="hsl(var(--foreground))" />
```

### 组合使用

```tsx
// 图标 + 文字组合
<button className="flex items-center gap-2">
  <Bookmark className="h-4 w-4" />
  <span>收藏</span>
</button>

// 图标按钮（无障碍）
<button aria-label="搜索">
  <Search className="h-5 w-5" />
</button>
```

---

## 无障碍要求

### WCAG AA 标准

1. **对比度要求**: 图标与背景对比度至少 3:1
2. **焦点状态**: 所有可点击图标必须有清晰的焦点环
3. **键盘导航**: 图标按钮必须支持键盘操作

### 语义化使用

```tsx
// ✅ 推荐：提供 aria-label
<button aria-label="关闭对话框">
  <X className="h-5 w-5" />
</button>

// ✅ 推荐：装饰性图标标记
<DecorativeIcon aria-hidden="true" className="h-6 w-6" />

// ❌ 避免：无语义的空图标
<button><X /></button>
```

### 焦点样式

```tsx
// 所有图标按钮必须包含焦点样式
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  <Search className="h-5 w-5" />
</button>
```

---

## 性能优化

### Tree Shaking

```tsx
// ✅ 推荐：按需导入，支持 Tree Shaking
import { Home } from "lucide-react";

// Vite/Next.js 会自动移除未使用的图标
```

### 图标预加载

```tsx
// 关键图标可在布局中预加载
<nav>
  <Home className="h-5 w-5" />
  <Search className="h-5 w-5" />
  <UserCircle2 className="h-5 w-5" />
</nav>
```

### 避免重复导入

```tsx
// ✅ 推荐：在组件文件中直接导入
import { Bookmark } from "lucide-react";

// ❌ 避免：创建统一的图标索引文件（影响 Tree Shaking）
```

---

## 当前项目图标统计

### 使用频率最高的图标

| 排名 | 图标 | 使用次数 | 文件分布 |
|------|------|---------|---------|
| 1 | `Search` | 6 | brands, makers, manufacturers, command, etc. |
| 2 | `X` | 6 | dialog, sheet, toast, makers, etc. |
| 3 | `Check` | 5 | checkbox, select, dropdown, menubar, etc. |
| 4 | `ChevronRight` | 5 | breadcrumb, dropdown, menubar, etc. |
| 5 | `ChevronDown` | 4 | select, navigation-menu, accordion, etc. |
| 6 | `ArrowLeft` | 5 | 返回按钮多处使用 |
| 7 | `Circle` | 4 | radio-group, context-menu, menubar, etc. |
| 8 | `MoreHorizontal` | 2 | breadcrumb, pagination |

### 优化建议

1. **保持一致性**: 所有 `X` 图标统一使用 `X` 组件
2. **命名统一**: `EyeIcon` → `Eye`, `UploadIcon` → `Upload`
3. **尺寸统一**: 导航图标统一使用 `h-4 w-4`

---

## 图标替换清单

如需优化当前代码，以下是推荐的替换：

```typescript
// 当前使用
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { UploadIcon, PlusIcon, XIcon } from 'lucide-react';

// 推荐替换为
import { Eye, EyeOff } from 'lucide-react';
import { Upload, Plus, X } from 'lucide-react';
```

---

## 参考资源

- [Lucide React 官方文档](https://lucide.dev/guide/packages/lucide-react)
- [Iconify 搜索平台](https://icon-sets.iconify.design/)
- [shadcn/ui 图标使用](https://ui.shadcn.com/docs/components/icon)
- [WCAG 2.1 AA 标准](https://www.w3.org/WAI/WCAG21/quickref/)

---

*最后更新：2026-03-15*  
*基于 Design Context v1.0*
