#!/bin/bash
# Cloudflare Pages 部署脚本 - Next.js 版本
# 用法：./deploy-cloudflare.sh [--branch=main]

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_NAME="tobacco-atlas"
# Next.js 构建输出目录为 .next
DIST_DIR=".next"

echo -e "${GREEN}=== Cloudflare Pages 部署脚本 ===${NC}"

# 检查环境变量
if [ ! -f .env.local ]; then
    echo -e "${RED}错误：.env.local 文件不存在${NC}"
    echo "请创建 .env.local 文件并添加 Cloudflare 凭证"
    exit 1
fi

# 加载环境变量并导出
set -a
source .env.local
set +a

# 验证必需的环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ] && [ -z "$CLOUDFLARE_GLOBAL_API_KEY" ]; then
    echo -e "${RED}错误：Cloudflare 凭证未设置${NC}"
    echo "需要设置 CLOUDFLARE_API_TOKEN 或 (CLOUDFLARE_GLOBAL_API_KEY + CLOUDFLARE_EMAIL)"
    exit 1
fi

# 检查 Wrangler CLI
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}错误：Wrangler CLI 未安装${NC}"
    echo "运行：npm i -g wrangler"
    exit 1
fi

# 解析分支参数
BRANCH="main"
if [[ "$1" == "--branch="* ]]; then
    BRANCH="${1#--branch=}"
fi

# 构建项目
echo -e "${GREEN}构建项目...${NC}"
npm run build

# 检查构建输出
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}错误：构建输出目录 $DIST_DIR 不存在${NC}"
    exit 1
fi

# 部署到 Cloudflare Pages
echo -e "${GREEN}部署到 Cloudflare Pages (分支：$BRANCH)...${NC}"

# 使用 API Token 认证（推荐）或 Global API Key
if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" wrangler pages deploy "$DIST_DIR" \
        --project-name="$PROJECT_NAME" \
        --branch="$BRANCH" \
        --commit-dirty
else
    CLOUDFLARE_API_KEY="$CLOUDFLARE_GLOBAL_API_KEY" \
    CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL" \
    wrangler pages deploy "$DIST_DIR" \
        --project-name="$PROJECT_NAME" \
        --branch="$BRANCH" \
        --commit-dirty
fi

echo -e "${GREEN}=== 部署完成 ===${NC}"
echo -e "访问地址：${YELLOW}https://$PROJECT_NAME.pages.dev${NC}"
