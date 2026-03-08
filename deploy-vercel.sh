#!/bin/bash
# Vercel 部署脚本 - 优化版
# 用法: ./deploy-vercel.sh [--preview]

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Vercel 部署脚本 ===${NC}"

# 检查环境变量
if [ ! -f .env.local ]; then
    echo -e "${RED}错误: .env.local 文件不存在${NC}"
    echo "请创建 .env.local 文件并添加 VERCEL_TOKEN"
    exit 1
fi

# 加载环境变量并导出
set -a
source .env.local
set +a

# 验证必需的环境变量
if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${RED}错误: VERCEL_TOKEN 未设置${NC}"
    exit 1
fi

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}错误: Vercel CLI 未安装${NC}"
    echo "运行: npm i -g vercel"
    exit 1
fi

# 检查项目链接
if [ ! -f .vercel/project.json ]; then
    echo -e "${YELLOW}项目未链接到 Vercel，正在链接...${NC}"
    vercel link --yes --token "$VERCEL_TOKEN"
fi

# 构建项目
echo -e "${GREEN}构建项目...${NC}"
npm run build

# 部署
if [ "$1" == "--preview" ]; then
    echo -e "${YELLOW}部署到预览环境...${NC}"
    DEPLOY_URL=$(vercel --token "$VERCEL_TOKEN" 2>&1 | grep -E "https://.*\.vercel\.app" | head -1)
else
    echo -e "${GREEN}部署到生产环境...${NC}"
    DEPLOY_URL=$(vercel --prod --yes --token "$VERCEL_TOKEN" 2>&1 | grep -E "https://.*\.vercel\.app" | head -1)
fi

echo -e "${GREEN}=== 部署完成 ===${NC}"
if [ -n "$DEPLOY_URL" ]; then
    echo -e "访问地址: ${YELLOW}$DEPLOY_URL${NC}"
fi