#!/bin/bash
# 一键部署到 Vercel 和 Cloudflare Pages
# 用法: ./deploy-all.sh [--preview]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== 开始部署到双平台 ===${NC}"

# 部署到 Vercel
echo -e "\n${YELLOW}[1/2] 部署到 Vercel...${NC}"
./deploy-vercel.sh "$1"

# 部署到 Cloudflare
echo -e "\n${YELLOW}[2/2] 部署到 Cloudflare Pages...${NC}"
./deploy-cloudflare.sh "$1"

echo -e "\n${GREEN}=== 双平台部署完成 ===${NC}"
echo -e "Vercel:      ${YELLOW}https://tobacco-atlas-web.vercel.app${NC}"
echo -e "Cloudflare:  ${YELLOW}https://tobacco-atlas.pages.dev${NC}"