/**
 * 利群品牌真伪鉴别指南
 * Liqun Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const liqunGuide: AuthenticityGuide = {
  brandPinyin: 'liqun',
  brandNameZh: '利群',
  brandNameEn: 'Liqun',
  logoUrl: '/api/img/brands/81.png',
  
  generalTips: [
    { title: '查看防伪标识', description: '利群采用多重防伪技术', icon: '🔍' },
    { title: '检查包装', description: '正品包装精美', icon: '✋' },
    { title: '闻香气', description: '正品利群香气醇和', icon: '👃' },
  ],

  packagingVerification: [
    { item: '防伪标识', genuineFeature: '清晰有动态效果', fakeFeature: '模糊无效果', importance: 'high' },
    { item: '印刷质量', genuineFeature: '清晰饱满', fakeFeature: '模糊暗淡', importance: 'high' },
    { item: '拉线', genuineFeature: '透明易拉', fakeFeature: '发白难拉', importance: 'medium' },
  ],

  cigaretteVerification: [
    { item: '烟支长度', genuineSpec: '84mm', tolerance: '±0.5mm', detectionMethod: '卡尺测量' },
    { item: '烟丝质量', genuineSpec: '烟丝橙黄', detectionMethod: '拆开观察' },
  ],

  smellVerification: [
    { smellType: '未点燃时', genuineSmell: '醇和烟草香', fakeSmell: '香精味' },
    { smellType: '点燃后', genuineSmell: '香气醇和', fakeSmell: '粗糙' },
  ],

  burnVerification: [
    { characteristic: '燃烧速度', genuineBehavior: '均匀', fakeBehavior: '不稳定' },
    { characteristic: '烟灰颜色', genuineBehavior: '灰白', fakeBehavior: '发黑' },
  ],

  brandSpecificTips: [
    { title: '利群标志', description: '正品字体清晰有力' },
    { title: '绿色主调', description: '正品绿色纯正' },
  ],

  commonFakeCharacteristics: [
    { characteristic: '价格异常', howToIdentify: '明显低于市场价', riskLevel: 'high' },
    { characteristic: '防伪异常', howToIdentify: '无法验证', riskLevel: 'high' },
  ],

  checklist: [
    { item: '检查防伪', method: '变换角度', genuineStandard: '有动态效果' },
    { item: '验证防伪码', method: '官方查询', genuineStandard: '可验证' },
    { item: '闻香气', method: '未点燃和点燃', genuineStandard: '香气醇和' },
  ],
};

export default liqunGuide;
