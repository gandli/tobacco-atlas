/**
 * 玉溪品牌真伪鉴别指南
 * Yuxi Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const yuxiGuide: AuthenticityGuide = {
  brandPinyin: 'yuxi',
  brandNameZh: '玉溪',
  brandNameEn: 'Yuxi',
  logoUrl: 'https://www.ciggies.app/api/img/brands/235.png',
  
  generalTips: [
    {
      title: '查看防伪标识',
      description: '玉溪烟采用全息防伪、光变油墨等多重防伪技术',
      icon: '🔍',
    },
    {
      title: '检查包装质感',
      description: '正品包装纸质优良，印刷精美，手感细腻',
      icon: '✋',
    },
    {
      title: '闻清香',
      description: '正品玉溪有典型的清香型风格，香气清雅',
      icon: '👃',
    },
    {
      title: '观察烟丝',
      description: '正品烟丝色泽橙黄，油润感强',
      icon: '👀',
    },
  ],

  packagingVerification: [
    {
      item: '全息防伪标识',
      genuineFeature: '全息图案清晰，角度变化时有彩虹效果',
      fakeFeature: '全息图案模糊，无彩虹效果或效果差',
      importance: 'high',
    },
    {
      item: '光变油墨',
      genuineFeature: '特定角度下颜色发生变化',
      fakeFeature: '无光变效果或效果不明显',
      importance: 'high',
    },
    {
      item: '印刷质量',
      genuineFeature: '图案清晰，色彩饱满，套印准确',
      fakeFeature: '图案模糊，色彩暗淡，套印不准',
      importance: 'high',
    },
    {
      item: '拉线',
      genuineFeature: '拉线透明，拉带头规则，易拉',
      fakeFeature: '拉线发白，拉带头不规则，难拉',
      importance: 'medium',
    },
    {
      item: '钢印',
      genuineFeature: '钢印清晰，深浅一致',
      fakeFeature: '钢印模糊，深浅不一',
      importance: 'medium',
    },
  ],

  cigaretteVerification: [
    {
      item: '烟支长度',
      genuineSpec: '84mm',
      tolerance: '±0.5mm',
      detectionMethod: '卡尺测量',
    },
    {
      item: '烟支圆周',
      genuineSpec: '24.2mm',
      tolerance: '±0.3mm',
      detectionMethod: '圆周仪测量',
    },
    {
      item: '烟丝质量',
      genuineSpec: '烟丝橙黄油润，切丝均匀',
      detectionMethod: '拆开观察',
    },
    {
      item: '滤嘴',
      genuineSpec: '滤嘴饱满，接装牢固',
      detectionMethod: '目测检查',
    },
  ],

  smellVerification: [
    {
      smellType: '未点燃时',
      genuineSmell: '清香型烟草本香，香气清雅',
      fakeSmell: '香精味重，或有异味',
    },
    {
      smellType: '点燃后',
      genuineSmell: '清香风格明显，烟气柔和，余味干净',
      fakeSmell: '香气粗糙，刺激性强，余味苦涩',
    },
  ],

  burnVerification: [
    {
      characteristic: '燃烧速度',
      genuineBehavior: '燃烧均匀，速度适中',
      fakeBehavior: '燃烧不稳定',
    },
    {
      characteristic: '烟灰颜色',
      genuineBehavior: '烟灰灰白，有光泽',
      fakeBehavior: '烟灰发黑',
    },
    {
      characteristic: '烟灰形态',
      genuineBehavior: '烟灰紧实，不易散落',
      fakeBehavior: '烟灰松散',
    },
  ],

  brandSpecificTips: [
    {
      title: '玉溪标志',
      description: '正品"玉溪"二字书法流畅，笔画清晰。假烟字体可能变形或模糊。',
    },
    {
      title: '红色主调',
      description: '正品红色鲜艳饱满，假烟红色可能偏暗或偏橙。',
    },
    {
      title: '防伪编码',
      description: '可通过官方渠道验证防伪编码真伪。',
    },
  ],

  commonFakeCharacteristics: [
    {
      characteristic: '价格过低',
      howToIdentify: '明显低于市场价的需警惕',
      riskLevel: 'high',
    },
    {
      characteristic: '防伪无法验证',
      howToIdentify: '防伪编码无法查询或信息不符',
      riskLevel: 'high',
    },
    {
      characteristic: '包装质量差',
      howToIdentify: '印刷模糊、烫金脱落等',
      riskLevel: 'high',
    },
  ],

  checklist: [
    {
      item: '检查全息防伪',
      method: '变换角度观察',
      genuineStandard: '有彩虹效果',
    },
    {
      item: '验证防伪编码',
      method: '官方渠道查询',
      genuineStandard: '可验证且信息匹配',
    },
    {
      item: '检查印刷质量',
      method: '目测',
      genuineStandard: '清晰饱满',
    },
    {
      item: '闻香气',
      method: '未点燃和点燃后',
      genuineStandard: '清香型风格明显',
    },
    {
      item: '观察燃烧',
      method: '点燃观察',
      genuineStandard: '燃烧均匀，烟灰灰白',
    },
  ],
};

export default yuxiGuide;
