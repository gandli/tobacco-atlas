/**
 * 黄金叶品牌真伪鉴别指南
 * Huangjinye Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const huangjinyeGuide: AuthenticityGuide = {
  brandPinyin: 'huangjinye',
  brandNameZh: '黄金叶',
  brandNameEn: 'Huangjinye',
  logoUrl: '/api/img/brands/230.png',
  
  generalTips: [
    { title: '查看防伪标识', description: '黄金叶采用多重防伪', icon: '🔍' },
    { title: '检查包装', description: '正品包装精美', icon: '✋' },
    { title: '闻香气', description: '正品香气浓郁', icon: '👃' },
  ],

  packagingVerification: [
    { item: '防伪标识', genuineFeature: '清晰有动态', fakeFeature: '模糊', importance: 'high' },
    { item: '印刷质量', genuineFeature: '清晰饱满', fakeFeature: '模糊', importance: 'high' },
    { item: '金色工艺', genuineFeature: '金色光亮', fakeFeature: '暗淡', importance: 'high' },
  ],

  cigaretteVerification: [
    { item: '烟支长度', genuineSpec: '84mm', tolerance: '±0.5mm', detectionMethod: '卡尺' },
    { item: '烟丝质量', genuineSpec: '金黄油润', detectionMethod: '拆开' },
  ],

  smellVerification: [
    { smellType: '未点燃', genuineSmell: '浓郁香', fakeSmell: '香精味' },
    { smellType: '点燃后', genuineSmell: '醇香', fakeSmell: '杂气' },
  ],

  burnVerification: [
    { characteristic: '燃烧', genuineBehavior: '均匀', fakeBehavior: '不稳' },
    { characteristic: '烟灰', genuineBehavior: '灰白', fakeBehavior: '黑' },
  ],

  brandSpecificTips: [
    { title: '黄金叶标志', description: '正品叶片清晰' },
    { title: '金色主调', description: '正品金色纯正' },
  ],

  commonFakeCharacteristics: [
    { characteristic: '价格低', howToIdentify: '低于市场价', riskLevel: 'high' },
    { characteristic: '防伪假', howToIdentify: '无法验证', riskLevel: 'high' },
  ],

  checklist: [
    { item: '防伪检查', method: '变换角度', genuineStandard: '有动态' },
    { item: '验证', method: '官方', genuineStandard: '可验证' },
    { item: '闻香', method: '点燃前后', genuineStandard: '醇香' },
  ],
};

export default huangjinyeGuide;
