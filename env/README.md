# 环境变量配置说明

本目录包含不同部署环境的环境变量模板文件。

## 文件说明

| 文件 | 用途 | 是否提交到 Git |
|------|------|----------------|
| `.env.development` | 开发环境 | ✅ 可提交 |
| `.env.staging` | 预发布环境 | ✅ 可提交 |
| `.env.production` | 生产环境 | ✅ 可提交 |
| `.env.local` | 本地覆盖 | ❌ 不提交 |

## 环境层级

```
开发环境 (development) → 预发布环境 (staging) → 生产环境 (production)
```

## 配置优先级

环境变量的加载优先级（从高到低）：

1. `.env.local` - 本地开发覆盖（不提交）
2. `.env.{NODE_ENV}.local` - 环境特定的本地覆盖（不提交）
3. `.env.{NODE_ENV}` - 环境特定配置（可提交）
4. `.env` - 默认配置（可提交）

## 使用方法

### 本地开发

```bash
# 使用开发环境
npm run dev

# 使用生产环境变量预览
npm run preview
```

### 构建不同环境

```bash
# 开发环境构建
npm run build:dev

# 预发布环境构建
npm run build:staging

# 生产环境构建
npm run build:production
```

## 敏感信息处理

**重要：** 敏感信息（如 API Token、密钥等）不应提交到 Git！

对于 CI/CD 和生产环境，请使用：

- **GitHub Actions**: 在仓库 Settings → Secrets and variables → Actions 中配置
- **Vercel**: 在项目 Settings → Environment Variables 中配置
- **Cloudflare Pages**: 在项目 Settings → Environment variables 中配置

## 环境变量清单

### 部署相关（CI/CD 使用，不在代码中引用）

| 变量名 | 说明 | 存储位置 |
|--------|------|----------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token | GitHub Secrets |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID | GitHub Secrets |
| `VERCEL_TOKEN` | Vercel 部署 Token | GitHub Secrets |
| `VERCEL_ORG_ID` | Vercel 组织 ID | GitHub Secrets |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | GitHub Secrets |

### 应用运行时（可选，根据项目需求）

| 变量名 | 说明 | 环境 |
|--------|------|------|
| `VITE_API_URL` | 后端 API 地址 | 所有环境 |
| `VITE_ANALYTICS_ID` | 分析工具 ID | staging, production |

## 注意事项

1. 以 `VITE_` 开头的变量会打包到前端代码中，**不要**存储敏感信息
2. 部署相关的 Token 只在 CI/CD 环境中使用
3. 所有环境变量变更需要重新构建才能生效