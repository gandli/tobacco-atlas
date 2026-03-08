# 部署指南

本文档详细说明了 tobacco-atlas-web 项目的部署流程，包括自动部署和手动部署两种方式。

## 目录

- [环境说明](#环境说明)
- [部署架构](#部署架构)
- [自动部署（推荐）](#自动部署推荐)
- [手动部署](#手动部署)
- [环境变量配置](#环境变量配置)
- [回滚操作](#回滚操作)
- [监控与告警](#监控与告警)
- [故障排查](#故障排查)

## 环境说明

| 环境 | 分支 | 域名 | 用途 |
|------|------|------|------|
| Development | 本地 | localhost:8080 | 本地开发 |
| Staging | dev | staging.tobacco-atlas.pages.dev | 预发布测试 |
| Production | main | tobacco-atlas.pages.dev | 正式生产 |

### 分支策略

```
feature/* → dev (staging) → main (production)
```

- **feature/\***: 功能分支，开发完成后合并到 dev
- **dev**: 开发分支，自动部署到 Staging 环境
- **main**: 主分支，自动部署到 Production 环境

## 部署架构

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Actions                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                  │
│  │  Lint   │ →  │  Test   │ →  │  Build  │                  │
│  └─────────┘    └─────────┘    └─────────┘                  │
│                                      │                        │
│                    ┌─────────────────┴─────────────────┐     │
│                    ▼                                   ▼     │
│            ┌───────────────┐                 ┌─────────────┐ │
│            │    Staging    │                 │ Production  │ │
│            │   (dev 分支)  │                 │ (main 分支) │ │
│            └───────┬───────┘                 └──────┬──────┘ │
│                    │                                │        │
└────────────────────┼────────────────────────────────┼────────┘
                     │                                │
         ┌───────────┴───────────┐       ┌───────────┴─────────┐
         │      Vercel           │       │   Cloudflare Pages  │
         │  (可选预览部署)        │       │   (主要部署平台)     │
         └───────────────────────┘       └─────────────────────┘
```

## 自动部署（推荐）

### 前提条件

1. 在 GitHub 仓库中配置以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID
   - `VERCEL_TOKEN`: Vercel 部署 Token（可选）
   - `VERCEL_ORG_ID`: Vercel 组织 ID（可选）
   - `VERCEL_PROJECT_ID`: Vercel 项目 ID（可选）

2. 确保分支保护规则正确设置

### 触发方式

#### 自动触发

- **Push 到 dev 分支**: 自动部署到 Staging 环境
- **Push 到 main 分支**: 自动部署到 Production 环境
- **Pull Request**: 自动创建预览部署

#### 手动触发

在 GitHub 仓库页面，进入 Actions → 选择工作流 → Run workflow

```bash
# 或使用 gh CLI 触发
gh workflow run cloudflare-pages.yml -f environment=staging
gh workflow run cloudflare-pages.yml -f environment=production
```

### 部署流程

1. **代码检查**: ESLint + TypeScript 类型检查
2. **单元测试**: 运行 Vitest 测试
3. **构建**: 使用 Vite 构建项目
4. **部署**: 部署到对应环境

### 查看部署状态

```bash
# 使用 gh CLI 查看最近的运行
gh run list --workflow=cloudflare-pages.yml --limit=5

# 查看特定运行的详情
gh run view <run-id>
```

## 手动部署

### Vercel 部署

#### 前提条件

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 配置 `.env.local` 文件：
   ```bash
   VERCEL_TOKEN=your_token_here
   ```

#### 部署命令

```bash
# 预览部署（开发/测试）
npm run deploy:vercel:preview

# 生产部署
npm run deploy:vercel
```

#### 手动步骤

```bash
# 1. 链接项目（首次）
vercel link

# 2. 构建项目
npm run build

# 3. 部署到预览环境
vercel

# 4. 部署到生产环境
vercel --prod
```

### Cloudflare Pages 部署

#### 前提条件

1. 安装 Wrangler CLI：
   ```bash
   npm i -g wrangler
   ```

2. 配置 `.env.local` 文件：
   ```bash
   CLOUDFLARE_API_TOKEN=your_token_here
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   ```

#### 部署命令

```bash
# 部署到生产环境
npm run deploy:cf

# 部署到 staging 环境
npm run deploy:cf:staging
```

#### 手动步骤

```bash
# 1. 构建项目
npm run build

# 2. 部署到 Cloudflare Pages
wrangler pages deploy dist --project-name=tobacco-atlas

# 3. 指定分支部署
wrangler pages deploy dist --project-name=tobacco-atlas --branch=staging
```

## 环境变量配置

### 环境变量文件结构

```
tobacco-atlas-web/
├── env/
│   ├── .env.development    # 开发环境
│   ├── .env.staging        # 预发布环境
│   └── .env.production     # 生产环境
└── .env.local              # 本地覆盖（不提交）
```

### 配置优先级

1. `.env.local` - 最高优先级（本地开发）
2. `.env.{NODE_ENV}` - 环境特定配置
3. `.env` - 默认配置

### 在 CI/CD 中配置

#### GitHub Secrets

在仓库 Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 |
|-------------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| `VERCEL_TOKEN` | Vercel 部署 Token |
| `VERCEL_ORG_ID` | Vercel 组织 ID |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID |

#### Vercel 环境变量

在 Vercel 项目 Settings → Environment Variables 中添加运行时变量。

#### Cloudflare 环境变量

在 Cloudflare Dashboard → Pages → Settings → Environment variables 中添加。

### 可用环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_APP_ENV` | 应用环境标识 | development, staging, production |
| `VITE_API_URL` | 后端 API 地址 | https://api.example.com |
| `VITE_DEBUG` | 调试模式开关 | true, false |
| `VITE_ENABLE_ANALYTICS` | 启用分析 | true, false |

> ⚠️ **注意**: 以 `VITE_` 开头的变量会打包到前端代码中，不要存储敏感信息！

## 回滚操作

### 快速回滚

#### Vercel 回滚

```bash
# 交互式回滚
npm run rollback:vercel

# 回滚到上一个部署
npm run rollback:vercel latest

# 回滚到指定部署
npm run rollback:vercel https://tobacco-atlas-abc123.vercel.app
```

#### Cloudflare 回滚

```bash
# 交互式回滚
npm run rollback:cf

# 回滚到上一个部署
npm run rollback:cf latest

# 回滚到指定部署
npm run rollback:cf <deployment-id>
```

### 通过 Dashboard 回滚

#### Vercel Dashboard

1. 进入项目 → Deployments
2. 找到要回滚到的部署
3. 点击 "..." → "Promote to Production"

#### Cloudflare Dashboard

1. 进入 Pages → 项目 → Deployments
2. 找到要回滚到的部署
3. 点击 "Rollback to this deployment"

### 回滚流程图

```
发现问题 → 评估影响 → 决定回滚
              │
              ▼
    ┌─────────────────────┐
    │ 选择回滚目标版本    │
    │ (上一个稳定版本)    │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 执行回滚命令        │
    │ 或通过 Dashboard   │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 验证回滚结果        │
    │ 检查网站功能        │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 记录问题原因        │
    │ 创建修复分支        │
    └─────────────────────┘
```

## 监控与告警

### 部署状态监控

#### GitHub Actions 状态

可以在 README.md 中添加状态徽章：

```markdown
![Deploy](https://github.com/owner/repo/actions/workflows/cloudflare-pages.yml/badge.svg)
```

#### 设置 GitHub Actions 失败通知

1. 进入仓库 Settings → Notifications
2. 配置邮件或 Slack 通知

### Cloudflare Analytics

Cloudflare Pages 自带分析功能：

1. 进入 Cloudflare Dashboard → Pages → 项目
2. 点击 Analytics 查看访问数据

### 建议的监控指标

| 指标 | 说明 | 阈值 |
|------|------|------|
| 部署成功率 | 成功部署的比例 | > 95% |
| 部署时长 | 从触发到完成的时间 | < 5 分钟 |
| 构建错误率 | 构建失败的比例 | < 5% |
| 页面加载时间 | 首页加载时间 | < 3 秒 |

## 故障排查

### 常见问题

#### 1. 构建失败

**症状**: GitHub Actions 中 build 步骤失败

**排查步骤**:
```bash
# 本地复现
npm ci
npm run build

# 检查 Node.js 版本
node -v  # 应该是 20.x

# 检查依赖问题
npm audit
```

#### 2. 部署成功但页面空白

**症状**: 部署成功但访问页面显示空白

**排查步骤**:
1. 检查浏览器控制台错误
2. 检查环境变量是否正确配置
3. 检查 API 地址是否可访问

#### 3. 环境变量未生效

**症状**: 代码中读取不到配置的环境变量

**排查步骤**:
1. 确认变量名以 `VITE_` 开头
2. 检查构建时是否正确注入
3. 清除缓存重新构建

```bash
# 清除缓存
rm -rf node_modules/.vite
rm -rf dist

# 重新构建
npm run build
```

#### 4. Cloudflare 部署 404

**症状**: 部署成功但访问显示 404

**排查步骤**:
1. 检查 `vercel.json` 或 `_redirects` 文件配置
2. 确认 SPA 路由重定向规则

```
/* /index.html 200
```

### 获取帮助

如果以上步骤无法解决问题：

1. 查看 [GitHub Issues](https://github.com/owner/repo/issues)
2. 创建新的 Issue，包含：
   - 错误信息截图
   - 复现步骤
   - 环境（Node.js 版本、浏览器版本）