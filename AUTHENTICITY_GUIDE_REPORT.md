# Tobacco Atlas 真伪鉴别指南功能开发报告

## 完成时间
2026 年 3 月 18 日

## 功能概述
为 Tobacco Atlas 网站开发了完整的真伪鉴别指南功能，帮助用户识别正品和假冒烟草产品。

## 文件结构

### 数据层 (src/data/authenticity-guides/)
```
authenticity-guides/
├── index.ts              # 类型定义和指南索引 (16 个品牌)
├── chungwa.ts            # 中华鉴别指南 (详细)
├── huanghelou.ts         # 黄鹤楼鉴别指南 (详细)
├── yuxi.ts               # 玉溪鉴别指南
├── yunyan.ts             # 云烟鉴别指南
├── furongwang.ts         # 芙蓉王鉴别指南
├── liqun.ts              # 利群鉴别指南
├── nanjing.ts            # 南京鉴别指南
├── huangjinye.ts         # 黄金叶鉴别指南
├── taishan.ts            # 泰山鉴别指南
├── hongtashan.ts         # 红塔山鉴别指南
├── baisha.ts             # 白沙鉴别指南
├── shuangxi.ts           # 双喜鉴别指南
├── zhenlong.ts           # 真龙鉴别指南
├── changbaishan.ts       # 长白山鉴别指南
└── guiyan.ts             # 贵烟鉴别指南
```

### 页面层 (src/app/authenticity-guide/)
```
authenticity-guide/
├── page.tsx              # 鉴别指南首页（品牌列表 + 通用技巧）
└── [brand]/
    └── page.tsx          # 品牌鉴别详情页
```

### 国际化 (src/locales/)
```
locales/
├── zh/
│   └── authenticity.json # 中文翻译
└── en/
    └── authenticity.json # 英文翻译
```

## 核心功能

### 1. 鉴别指南内容
每个品牌包含以下鉴别维度：

- **通用鉴别要点** (generalTips)
  - 查看防伪标识
  - 检查包装质感
  - 闻气味
  - 观察燃烧

- **包装鉴别** (packagingVerification)
  - 外包装印刷质量
  - 防伪拉线
  - 透明纸
  - 条盒钢印
  - 包装盒材质

- **烟支鉴别** (cigaretteVerification)
  - 烟支长度 (84mm/97mm)
  - 烟支圆周 (24.2mm/17mm)
  - 滤嘴长度
  - 烟丝质量
  - 接装纸

- **气味鉴别** (smellVerification)
  - 未点燃时气味
  - 点燃后气味
  - 烟灰气味

- **燃烧鉴别** (burnVerification)
  - 燃烧速度
  - 烟灰颜色
  - 烟灰形态
  - 燃烧均匀度

- **品牌专属鉴别要点** (brandSpecificTips)
  - 中华：华表图案、天安门图案、金色边框、防伪编码、微缩文字
  - 黄鹤楼：黄鹤楼标志、雅香标识、防伪二维码、内衬纸、特殊系列
  - 其他品牌各有特色鉴别点

- **常见假冒特征** (commonFakeCharacteristics)
  - 价格异常低廉
  - 销售渠道不正规
  - 包装印刷质量差
  - 防伪标识缺失或异常
  - 烟支外观粗糙
  - 气味异常

- **鉴别清单** (checklist)
  - 可打印的检查清单
  - 包含检查项目、方法、正品标准

### 2. 页面功能

#### 首页 (/authenticity-guide)
- 品牌网格展示（15 个品牌）
- 快速鉴别技巧卡片
- 通用鉴别技巧说明
- 支持中英文切换

#### 品牌详情页 (/authenticity-guide/[brand])
- 品牌快速鉴别要点
- 包装鉴别对比表（正品 vs 假冒）
- 烟支规格对照表
- 气味和燃烧鉴别
- 品牌专属鉴别要点
- 常见假冒特征警示
- 可打印鉴别清单

### 3. 技术特性
- TypeScript 类型安全
- React 18 + Next.js 16 App Router
- Tailwind CSS 响应式设计
- shadcn/ui 组件风格
- i18n 国际化支持（中英文）
- 移动端适配

## 覆盖品牌 (15 个)

1. 中华 (Chungwa/Zhonghua)
2. 黄鹤楼 (Huanghelou)
3. 玉溪 (Yuxi)
4. 云烟 (Yunyan)
5. 芙蓉王 (Furong Wang)
6. 利群 (Liqun)
7. 南京 (Nanjing)
8. 黄金叶 (Huangjinye)
9. 泰山 (Taishan)
10. 红塔山 (Hongtashan)
11. 白沙 (Baisha)
12. 双喜 (Shuangxi)
13. 真龙 (Zhenlong)
14. 长白山 (Changbaishan)
15. 贵烟 (Guiyan)

## 内容大纲

### 中华鉴别指南示例
- **包装鉴别**：5 项（印刷、拉线、透明纸、钢印、材质）
- **烟支鉴别**：5 项（长度、圆周、滤嘴、烟丝、接装纸）
- **气味鉴别**：3 项（未点燃、点燃后、烟灰）
- **燃烧鉴别**：4 项（速度、颜色、形态、均匀度）
- **品牌专属**：5 项（华表、天安门、金色边框、防伪码、微缩文字）
- **假冒特征**：6 项（价格、渠道、印刷、防伪、烟支、气味）
- **鉴别清单**：8 项完整检查流程

### 其他品牌
每个品牌包含 3-5 项核心鉴别要点，根据品牌特色有所侧重。

## 访问路径
- 鉴别指南首页：`/authenticity-guide`
- 品牌鉴别详情：`/authenticity-guide/[brand]`
  - 例如：`/authenticity-guide/chungwa`（中华）
  - 例如：`/authenticity-guide/huanghelou`（黄鹤楼）

## 后续建议
1. 添加真假对比图片滑块组件
2. 在产品详情页添加鉴别入口链接
3. 增加更多品牌鉴别指南
4. 添加用户反馈和假冒举报功能
5. 集成官方防伪查询 API

## 文件统计
- 数据文件：16 个 TypeScript 文件
- 页面文件：2 个 TSX 文件
- 翻译文件：2 个 JSON 文件
- 总代码量：约 60KB
