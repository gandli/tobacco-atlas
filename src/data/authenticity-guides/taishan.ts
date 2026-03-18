/**
 * 泰山品牌真伪鉴别指南
 */

import type { AuthenticityGuide } from './index';

export const taishanGuide: AuthenticityGuide = {
  brandPinyin: 'taishan',
  brandNameZh: '泰山',
  brandNameEn: 'Taishan',
  logoUrl: '/api/img/brands/212.png',
  generalTips: [
    { title: '查看防伪', description: '泰山采用全息防伪', icon: '🔍' },
    { title: '检查包装', description: '正品精美', icon: '✋' },
    { title: '闻香气', description: '正品醇香', icon: '👃' },
  ],
  packagingVerification: [
    { item: '防伪', genuineFeature: '清晰', fakeFeature: '模糊', importance: 'high' },
    { item: '印刷', genuineFeature: '清晰', fakeFeature: '模糊', importance: 'high' },
  ],
  cigaretteVerification: [
    { item: '长度', genuineSpec: '84mm', tolerance: '±0.5mm', detectionMethod: '卡尺' },
    { item: '烟丝', genuineSpec: '金黄', detectionMethod: '拆开' },
  ],
  smellVerification: [
    { smellType: '未点燃', genuineSmell: '醇香', fakeSmell: '香精' },
    { smellType: '点燃', genuineSmell: '醇和', fakeSmell: '杂气' },
  ],
  burnVerification: [
    { characteristic: '燃烧', genuineBehavior: '均匀', fakeBehavior: '不稳' },
    { characteristic: '烟灰', genuineBehavior: '灰白', fakeBehavior: '黑' },
  ],
  brandSpecificTips: [
    { title: '泰山标志', description: '正品清晰' },
  ],
  commonFakeCharacteristics: [
    { characteristic: '价格低', howToIdentify: '低于市场', riskLevel: 'high' },
  ],
  checklist: [
    { item: '防伪', method: '角度', genuineStandard: '动态' },
    { item: '验证', method: '官方', genuineStandard: '可查' },
  ],
};

export default taishanGuide;
