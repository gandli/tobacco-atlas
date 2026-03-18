/**
 * 南京品牌真伪鉴别指南
 * Nanjing Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const nanjingGuide: AuthenticityGuide = {
  brandPinyin: 'nanjing',
  brandNameZh: '南京',
  brandNameEn: 'Nanjing',
  logoUrl: '/api/img/brands/124.jpg',
  
  generalTips: [
    { title: '查看防伪标识', description: '南京烟采用全息防伪等技术', icon: '🔍' },
    { title: '检查包装', description: '正品包装精美，图案清晰', icon: '✋' },
    { title: '闻香气', description: '正品南京香气独特', icon: '👃' },
  ],

  packagingVerification: [
    { item: '全息防伪', genuineFeature: '图案清晰有动态', fakeFeature: '模糊无动态', importance: 'high' },
    { item: '印刷质量', genuineFeature: '清晰饱满', fakeFeature: '模糊暗淡', importance: 'high' },
    { item: '拉线', genuineFeature: '透明易拉', fakeFeature: '发白难拉', importance: 'medium' },
  ],

  cigaretteVerification: [
    { item: '烟支长度', genuineSpec: '84mm', tolerance: '±0.5mm', detectionMethod: '卡尺测量' },
    { item: '烟丝质量', genuineSpec: '烟丝金黄', detectionMethod: '拆开观察' },
  ],

  smellVerification: [
    { smellType: '未点燃时', genuineSmell: '独特香气', fakeSmell: '香精味' },
    { smellType: '点燃后', genuineSmell: '香气独特', fakeSmell: '杂气重' },
  ],

  burnVerification: [
    { characteristic: '燃烧速度', genuineBehavior: '均匀', fakeBehavior: '不稳定' },
    { characteristic: '烟灰颜色', genuineBehavior: '灰白', fakeBehavior: '发黑' },
  ],

  brandSpecificTips: [
    { title: '南京标志', description: '正品图案清晰' },
    { title: '红色主调', description: '正品红色鲜艳' },
  ],

  commonFakeCharacteristics: [
    { characteristic: '价格异常', howToIdentify: '明显低于市场价', riskLevel: 'high' },
    { characteristic: '防伪异常', howToIdentify: '无法验证', riskLevel: 'high' },
  ],

  checklist: [
    { item: '检查防伪', method: '变换角度', genuineStandard: '有动态' },
    { item: '验证防伪码', method: '官方查询', genuineStandard: '可验证' },
    { item: '闻香气', method: '未点燃和点燃', genuineStandard: '香气独特' },
  ],
};

export default nanjingGuide;
