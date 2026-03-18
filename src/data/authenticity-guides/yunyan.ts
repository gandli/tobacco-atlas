/**
 * 云烟品牌真伪鉴别指南
 * Yunyan Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const yunyanGuide: AuthenticityGuide = {
  brandPinyin: 'yunyan',
  brandNameZh: '云烟',
  brandNameEn: 'Yunyan',
  logoUrl: 'https://www.ciggies.app/api/img/brands/319.png',
  
  generalTips: [
    {
      title: '查看防伪标识',
      description: '云烟采用全息防伪、微缩文字等防伪技术',
      icon: '🔍',
    },
    {
      title: '检查包装',
      description: '正品包装精美，云纹图案清晰',
      icon: '✋',
    },
    {
      title: '闻香气',
      description: '正品云烟香气浓郁，有云南烟叶特色',
      icon: '👃',
    },
  ],

  packagingVerification: [
    {
      item: '全息防伪',
      genuineFeature: '全息图案清晰，有动态效果',
      fakeFeature: '图案模糊，无动态效果',
      importance: 'high',
    },
    {
      item: '云纹图案',
      genuineFeature: '云纹清晰，线条流畅',
      fakeFeature: '云纹模糊，线条粗糙',
      importance: 'high',
    },
    {
      item: '印刷质量',
      genuineFeature: '色彩饱满，套印准确',
      fakeFeature: '色彩暗淡，套印不准',
      importance: 'high',
    },
    {
      item: '拉线',
      genuineFeature: '透明易拉',
      fakeFeature: '发白难拉',
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
      item: '烟丝质量',
      genuineSpec: '烟丝金黄油润',
      detectionMethod: '拆开观察',
    },
  ],

  smellVerification: [
    {
      smellType: '未点燃时',
      genuineSmell: '浓郁烟草香',
      fakeSmell: '香精味重',
    },
    {
      smellType: '点燃后',
      genuineSmell: '香气浓郁，烟气饱满',
      fakeSmell: '香气淡，有杂气',
    },
  ],

  burnVerification: [
    {
      characteristic: '燃烧速度',
      genuineBehavior: '均匀适中',
      fakeBehavior: '不稳定',
    },
    {
      characteristic: '烟灰颜色',
      genuineBehavior: '灰白有光泽',
      fakeBehavior: '发黑',
    },
  ],

  brandSpecificTips: [
    {
      title: '云烟标志',
      description: '正品"云烟"二字清晰，书法有力',
    },
    {
      title: '红色色调',
      description: '正品红色鲜艳，假烟可能偏暗',
    },
  ],

  commonFakeCharacteristics: [
    {
      characteristic: '价格异常',
      howToIdentify: '明显低于市场价',
      riskLevel: 'high',
    },
    {
      characteristic: '防伪异常',
      howToIdentify: '无法验证',
      riskLevel: 'high',
    },
  ],

  checklist: [
    {
      item: '检查全息防伪',
      method: '变换角度',
      genuineStandard: '有动态效果',
    },
    {
      item: '验证防伪码',
      method: '官方查询',
      genuineStandard: '可验证',
    },
    {
      item: '闻香气',
      method: '未点燃和点燃',
      genuineStandard: '香气浓郁',
    },
  ],
};

export default yunyanGuide;
