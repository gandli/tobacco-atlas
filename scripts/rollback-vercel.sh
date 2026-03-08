#!/bin/bash
# Vercel 回滚脚本
# 用法: ./rollback-vercel.sh [deployment-url|latest]
# 示例: ./rollback-vercel.sh https://tobacco-atlas-abc123.vercel.app
#       ./rollback-vercel.sh latest

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Vercel 回滚脚本 ===${NC}"

# 检查环境变量
if [ ! -f .env.local ]; then
    echo -e "${RED}错误: .env.local 文件不存在${NC}"
    exit 1
fi

# 加载环境变量
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
    echo -e "${RED}错误: 项目未链接到 Vercel${NC}"
    echo "请先运行: vercel link"
    exit 1
fi

# 获取项目信息
PROJECT_ID=$(cat .vercel/project.json | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "${BLUE}项目 ID: $PROJECT_ID${NC}"

# 获取部署列表
echo -e "${YELLOW}获取最近的部署列表...${NC}"
DEPLOYMENTS=$(vercel list --token "$VERCEL_TOKEN" 2>&1)

if [ -z "$DEPLOYMENTS" ]; then
    echo -e "${RED}错误: 无法获取部署列表${NC}"
    exit 1
fi

# 显示最近的部署
echo ""
echo -e "${GREEN}最近的部署:${NC}"
echo "$DEPLOYMENTS" | head -10
echo ""

# 处理参数
TARGET=$1

if [ -z "$TARGET" ]; then
    echo -e "${YELLOW}用法: $0 [deployment-url|latest]${NC}"
    echo ""
    echo "选项:"
    echo "  deployment-url - 指定要回滚到的部署 URL"
    echo "  latest         - 回滚到上一个成功的部署"
    echo ""
    echo -e "${YELLOW}请选择要回滚到的部署:${NC}"
    read -p "输入部署 URL 或序号: " TARGET
fi

# 执行回滚
if [ "$TARGET" == "latest" ]; then
    echo -e "${YELLOW}回滚到上一个成功的部署...${NC}"
    # 获取上一个成功的生产部署
    PREVIOUS_DEPLOYMENT=$(echo "$DEPLOYMENTS" | grep -E "https://.*\.vercel\.app" | sed -n '2p' | awk '{print $2}')
    
    if [ -z "$PREVIOUS_DEPLOYMENT" ]; then
        echo -e "${RED}错误: 未找到上一个部署${NC}"
        exit 1
    fi
    
    TARGET="$PREVIOUS_DEPLOYMENT"
fi

echo -e "${YELLOW}目标部署: $TARGET${NC}"
echo ""

# 确认回滚
echo -e "${RED}⚠️  警告: 此操作将立即切换生产流量到指定部署${NC}"
read -p "确认回滚? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}已取消回滚${NC}"
    exit 0
fi

# 执行回滚
echo -e "${GREEN}正在回滚...${NC}"
vercel alias "$TARGET" --token "$VERCEL_TOKEN" 2>&1

echo ""
echo -e "${GREEN}=== 回滚完成 ===${NC}"
echo -e "当前部署: ${YELLOW}$TARGET${NC}"
echo ""
echo "注意: 回滚操作已创建新的别名指向旧部署"
echo "如需再次回滚，请重新运行此脚本"