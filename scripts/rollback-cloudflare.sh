#!/bin/bash
# Cloudflare Pages 回滚脚本
# 用法: ./rollback-cloudflare.sh [deployment-id|latest]
# 示例: ./rollback-cloudflare.sh abc123
#       ./rollback-cloudflare.sh latest

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME="tobacco-atlas"

echo -e "${GREEN}=== Cloudflare Pages 回滚脚本 ===${NC}"

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
if [ -z "$CLOUDFLARE_API_TOKEN" ] && [ -z "$CLOUDFLARE_GLOBAL_API_KEY" ]; then
    echo -e "${RED}错误: Cloudflare 凭证未设置${NC}"
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo -e "${RED}错误: CLOUDFLARE_ACCOUNT_ID 未设置${NC}"
    exit 1
fi

# 检查 Wrangler CLI
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}错误: Wrangler CLI 未安装${NC}"
    echo "运行: npm i -g wrangler"
    exit 1
fi

# 检查 curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}错误: curl 未安装${NC}"
    exit 1
fi

# 检查 jq
if ! command -v jq &> /dev/null; then
    echo -e "${RED}错误: jq 未安装${NC}"
    echo "运行: brew install jq (macOS) 或 apt install jq (Linux)"
    exit 1
fi

# 获取部署列表
echo -e "${YELLOW}获取最近的部署列表...${NC}"

# 使用 Cloudflare API 获取部署列表
DEPLOYMENTS_RESPONSE=$(curl -s -X GET \
    "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

# 检查 API 响应
if ! echo "$DEPLOYMENTS_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
    echo -e "${RED}错误: API 请求失败${NC}"
    echo "$DEPLOYMENTS_RESPONSE" | jq '.' 2>/dev/null || echo "$DEPLOYMENTS_RESPONSE"
    exit 1
fi

# 解析部署列表
DEPLOYMENTS=$(echo "$DEPLOYMENTS_RESPONSE" | jq -r '.result[] | "\(.id) | \(.environment) | \(.deployment_trigger.metadata.commit_message // "N/A") | \(.created_on)"')

if [ -z "$DEPLOYMENTS" ]; then
    echo -e "${RED}错误: 未找到部署记录${NC}"
    exit 1
fi

# 显示最近的部署
echo ""
echo -e "${GREEN}最近的部署:${NC}"
echo -e "${BLUE}ID | 环境 | 提交信息 | 时间${NC}"
echo "$DEPLOYMENTS" | head -10 | nl
echo ""

# 处理参数
TARGET=$1

if [ -z "$TARGET" ]; then
    echo -e "${YELLOW}用法: $0 [deployment-id|latest]${NC}"
    echo ""
    echo "选项:"
    echo "  deployment-id - 指定要回滚到的部署 ID"
    echo "  latest        - 回滚到上一个成功的部署"
    echo ""
    echo -e "${YELLOW}请输入要回滚到的部署 ID:${NC}"
    read -p "部署 ID: " TARGET
fi

# 获取目标部署 ID
if [ "$TARGET" == "latest" ]; then
    # 获取上一个成功的部署（跳过当前部署）
    TARGET_ID=$(echo "$DEPLOYMENTS_RESPONSE" | jq -r '.result[1].id')
    
    if [ -z "$TARGET_ID" ] || [ "$TARGET_ID" == "null" ]; then
        echo -e "${RED}错误: 未找到上一个部署${NC}"
        exit 1
    fi
else
    TARGET_ID="$TARGET"
fi

# 验证部署 ID 存在
if ! echo "$DEPLOYMENTS" | grep -q "$TARGET_ID"; then
    echo -e "${RED}错误: 部署 ID $TARGET_ID 不存在${NC}"
    exit 1
fi

echo -e "${YELLOW}目标部署 ID: $TARGET_ID${NC}"
echo ""

# 获取部署详情
DEPLOYMENT_DETAIL=$(echo "$DEPLOYMENTS_RESPONSE" | jq -r ".result[] | select(.id == \"$TARGET_ID\")")
DEPLOYMENT_ENV=$(echo "$DEPLOYMENT_DETAIL" | jq -r '.environment')
DEPLOYMENT_URL=$(echo "$DEPLOYMENT_DETAIL" | jq -r '.url')
DEPLOYMENT_TIME=$(echo "$DEPLOYMENT_DETAIL" | jq -r '.created_on')

echo -e "${GREEN}部署详情:${NC}"
echo "  ID: $TARGET_ID"
echo "  环境: $DEPLOYMENT_ENV"
echo "  URL: $DEPLOYMENT_URL"
echo "  时间: $DEPLOYMENT_TIME"
echo ""

# 确认回滚
echo -e "${RED}⚠️  警告: 此操作将回滚到指定部署${NC}"
read -p "确认回滚? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}已取消回滚${NC}"
    exit 0
fi

# 执行回滚
echo -e "${GREEN}正在回滚...${NC}"

# Cloudflare Pages 回滚 API
ROLLBACK_RESPONSE=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$TARGET_ID/rollback" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

# 检查回滚响应
if echo "$ROLLBACK_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
    echo ""
    echo -e "${GREEN}=== 回滚完成 ===${NC}"
    echo -e "已回滚到部署: ${YELLOW}$TARGET_ID${NC}"
    echo ""
else
    echo -e "${RED}回滚失败${NC}"
    echo "$ROLLBACK_RESPONSE" | jq '.' 2>/dev/null || echo "$ROLLBACK_RESPONSE"
    exit 1
fi