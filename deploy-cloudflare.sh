#!/bin/bash
# Cloudflare Pages 部署脚本

echo "加载环境变量..."
source .env.local

echo "构建项目..."
npm run build

echo "部署到 Cloudflare Pages..."
CLOUDFLARE_API_KEY="$CLOUDFLARE_GLOBAL_API_KEY" CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL" wrangler pages deploy --project-name=tobacco-atlas dist

echo "部署完成！"