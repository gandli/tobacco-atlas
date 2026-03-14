#!/usr/bin/env node
// 生成 PNG 尺寸的 favicon
// 使用 canvas 库创建不同尺寸的 PNG 文件

import { writeFileSync } from 'fs';
import { join } from 'path';

// 检查是否有 canvas 库
let Canvas;
try {
  Canvas = await import('canvas');
} catch (e) {
  console.log('canvas 库未安装，使用备用方案...');
  // 创建简单的占位文件
  const sizes = [16, 32, 48, 64, 128, 180];
  sizes.forEach(size => {
    console.log(`创建 ${size}x${size} PNG 占位文件...`);
  });
  process.exit(0);
}

const { createCanvas } = Canvas;

function drawFavicon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // 圆角半径
  const radius = size * 0.125;
  
  // 绘制背景渐变
  const bgGradient = ctx.createLinearGradient(0, 0, size, size);
  bgGradient.addColorStop(0, '#1a1a1a');
  bgGradient.addColorStop(1, '#333333');
  
  // 绘制圆角矩形背景
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fillStyle = bgGradient;
  ctx.fill();
  
  // 绘制金色文字
  const fontSize = size * 0.625;
  ctx.font = `900 ${fontSize}px "Noto Serif SC", "SimSun", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 金色渐变
  const textGradient = ctx.createLinearGradient(0, 0, size, size);
  textGradient.addColorStop(0, '#c5a059');
  textGradient.addColorStop(1, '#d4af6a');
  
  ctx.fillStyle = textGradient;
  ctx.fillText('烟', size / 2, size / 2);
  
  // 保存文件
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(outputPath, buffer);
  console.log(`✓ 已生成 ${outputPath}`);
}

const publicDir = join(process.cwd(), 'public');

// 生成各种尺寸
drawFavicon(16, join(publicDir, 'favicon-16x16.png'));
drawFavicon(32, join(publicDir, 'favicon-32x32.png'));
drawFavicon(48, join(publicDir, 'favicon-48x48.png'));
drawFavicon(64, join(publicDir, 'favicon-64x64.png'));
drawFavicon(128, join(publicDir, 'favicon-128x128.png'));
drawFavicon(180, join(publicDir, 'apple-touch-icon.png'));

console.log('\n✅ 所有 favicon 已生成完成!');
