/**
 * 双喜品牌真伪鉴别指南
 */

import type { AuthenticityGuide } from './index';

export const shuangxiGuide: AuthenticityGuide = {
  brandPinyin: 'shuangxi',
  brandNameZh: '双喜',
  brandNameEn: 'Shuangxi',
  logoUrl: 'https://www.ciggies.app/api/img/brands/45.jpg',
  generalTips: [
    { title: '防伪', description: '全息防伪', icon: '🔍' },
    { title: '包装', description: '精美', icon: '✋' },
    { title: '香气', description: '高香', icon: '👃' },
  ],
  packagingVerification: [
    { item: '防伪', genuineFeature: '清晰', fakeFeature: '模糊', importance: 'high' },
    { item: '印刷', genuineFeature: '清晰', fakeFeature: '模糊', importance: 'high' },
    { item: '喜字', genuineFeature: '清晰', fakeFeature: '模糊', importance: 'high' },
  ],
  cigaretteVerification: [
    { item: '长度', genuineSpec: '84mm', tolerance: '±0.5mm', detectionMethod: '卡尺' },
    { item: '烟丝', genuineSpec: '金黄', detectionMethod: '拆开' },
  ],
  smellVerification: [
    { smellType: '未点燃', genuineSmell: '高香', fakeSmell: '香精' },
    { smellType: '点燃', genuineSmell: '醇香', fakeSmell: '杂' },
  ],
  burnVerification: [
    { characteristic: '燃烧', genuineBehavior: '均匀', fakeBehavior: '不稳' },
    { characteristic: '烟灰', genuineBehavior: '灰白', fakeBehavior: '黑' },
  ],
  brandSpecificTips: [
    { title: '双喜标志', description: '正品喜字清晰' },
  ],
  commonFakeCharacteristics: [
    { characteristic: '价格', howToIdentify: '低于市场', riskLevel: 'high' },
  ],
  checklist: [
    { item: '防伪', method: '角度', genuineStandard: '动态' },
    { item: '验证', method: '官方', genuineStandard: '可查' },
  ],
};

export default shuangxiGuide;
