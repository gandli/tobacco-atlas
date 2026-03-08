#!/bin/bash
# Vercel 部署脚本

echo "加载环境变量..."
source .env.local

echo "构建项目..."
npm run build

echo "部署到 Vercel..."
vercel --prod --yes --token "$VERCEL_TOKEN"

echo "部署完成！"