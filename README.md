# Tobacco Atlas PWA · 中国烟草图鉴

Next.js 14 + TypeScript + Tailwind CSS 的移动端 PWA（离线 + 安装）。

## 开发

```bash
npm install
npm run generate:icons
npm run dev
```

## 生产构建

```bash
npm run build
npm run start
```

## PWA

- `public/manifest.json`：安装信息
- `public/sw.js`：离线缓存（首次访问后缓存静态资源与已访问页面）
- `public/offline.html`：离线兜底页

