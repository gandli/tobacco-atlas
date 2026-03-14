# Next.js 部署配置指南

## 概述

项目已从 Vite/React 迁移到 Next.js，所有部署配置已相应更新。

---

## 构建产物目录变更

| 框架 | 构建输出目录 | 配置文件 |
|------|-------------|---------|
| Vite (旧) | `dist/` | - |
| Next.js (新) | `.next/` | `next.config.ts` |

---

## 已更新的配置文件

### 1. vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

**变更**：
- ✅ 添加 `framework: "nextjs"` 声明
- ✅ 修改 `outputDirectory` 从 `dist` 改为 `.next`
- ✅ 移除 Vite SPA 的 `rewrites` 配置（Next.js 自动处理路由）

---

### 2. .github/workflows/vercel.yml

**变更**：
- ✅ Build artifacts 路径：`dist` → `.next`
- ✅ Artifact 命名：`dist-${{ github.sha }}` → `next-build-${{ github.sha }}`
- ✅ 添加缓存排除：`.next/cache/**` 不上传到 artifacts

```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: next-build-${{ github.sha }}
    path: .next
    exclude: |
      .next/cache/**
```

---

### 3. deploy-cloudflare.sh

**变更**：
- ✅ `DIST_DIR` 从 `dist` 改为 `.next`

```bash
# Next.js 构建输出目录为 .next
DIST_DIR=".next"
```

---

### 4. wrangler.toml

**变更**：
- ✅ `pages_build_output_dir` 从 `dist` 改为 `.next`
- ✅ 添加 `@cloudflare/next-on-pages` 使用说明

```toml
pages_build_output_dir = ".next"
```

---

### 5. package.json

**变更**：
- ✅ 包名从 `vite_react_shadcn_ts` 改为 `tobacco-atlas-web`

---

## 部署流程

### Vercel 部署

#### 生产部署（main 分支）
```bash
# 自动部署（GitHub Actions）
git push origin main

# 或手动部署
npm run deploy:vercel
```

#### 预览部署（dev 分支）
```bash
# 自动部署（GitHub Actions）
git push origin dev

# 或手动部署
npm run deploy:vercel:preview
```

---

### Cloudflare Pages 部署

#### 生产部署
```bash
npm run deploy:cf
```

#### Staging 部署
```bash
npm run deploy:cf:staging
```

---

## 环境变量

### Vercel
在 Vercel Dashboard 或 `.env.local` 中配置：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Cloudflare Pages
在 Cloudflare Dashboard 或 `.env.local` 中配置：
- `CLOUDFLARE_API_TOKEN` 或
- `CLOUDFLARE_GLOBAL_API_KEY` + `CLOUDFLARE_EMAIL`

---

## 本地构建验证

```bash
# 构建项目
npm run build

# 验证 .next 目录生成
ls -la .next/

# 预期输出：
# .next/
# ├── build-manifest.json
# ├── cache/
# ├── package.json
# ├── prerender-manifest.json
# ├── routes-manifest.json
# ├── server/
# ├── static/
# └── ...
```

---

## 注意事项

### ⚠️ Cloudflare Pages 部署 Next.js

Cloudflare Pages 部署 Next.js 需要额外的适配：

1. **安装 next-on-pages**：
   ```bash
   npm install -D @cloudflare/next-on-pages
   ```

2. **修改构建命令**：
   ```bash
   npx @cloudflare/next-on-pages
   ```

3. **或使用 Cloudflare Pages 的 Next.js 兼容层**（推荐）：
   - 在 Cloudflare Pages Dashboard 中启用 "Next.js compatibility"
   - 构建输出目录设置为 `.next`

### ⚠️ GitHub Actions Artifact 大小

`.next` 目录包含服务器代码和缓存，可能较大：
- 已配置排除 `.next/cache/**`
- 如仍超过限制，可考虑只部署到 Vercel，不使用 GitHub Actions 上传 artifacts

---

## 相关文件清单

| 文件 | 用途 | 状态 |
|------|------|------|
| `vercel.json` | Vercel 部署配置 | ✅ 已更新 |
| `.github/workflows/vercel.yml` | GitHub Actions 工作流 | ✅ 已更新 |
| `deploy-vercel.sh` | Vercel 手动部署脚本 | ✅ 兼容 Next.js |
| `deploy-cloudflare.sh` | Cloudflare 手动部署脚本 | ✅ 已更新 |
| `wrangler.toml` | Cloudflare Wrangler 配置 | ✅ 已更新 |
| `package.json` | 项目配置 | ✅ 已更新 |
| `next.config.ts` | Next.js 配置 | ✅ 现有 |

---

## 故障排查

### 构建失败

```bash
# 清理缓存
rm -rf .next node_modules/.cache

# 重新构建
npm run build
```

### 部署失败

1. 检查环境变量是否正确配置
2. 验证 CLI 工具版本：
   ```bash
   vercel --version
   wrangler --version
   ```
3. 查看部署日志：
   - Vercel: https://vercel.com/dashboard
   - Cloudflare: https://dash.cloudflare.com/

---

## 参考文档

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 部署 Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Cloudflare Pages + Next.js](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [next-on-pages GitHub](https://github.com/cloudflare/next-on-pages)
