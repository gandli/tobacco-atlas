/**
 * 芙蓉王品牌真伪鉴别指南
 * Furongwang Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const furongwangGuide: AuthenticityGuide = {
  brandPinyin: 'furongwang',
  brandNameZh: '芙蓉王',
  brandNameEn: 'Furong Wang',
  logoUrl: '/api/img/brands/260.png',
  
  generalTips: [
    {
      title: '查看防伪标识',
      description: '芙蓉王采用全息防伪、变色油墨等技术',
      icon: '🔍',
    },
    {
      title: '检查包装',
      description: '正品包装精美，芙蓉花图案清晰',
      icon: '✋',
    },
    {
      title: '闻香气',
      description: '正品芙蓉王香气醇厚，有独特风格',
      icon: '👃',
    },
  ],

  packagingVerification: [
    {
      item: '全息防伪',
      genuineFeature: '芙蓉花全息图案清晰，有立体感',
      fakeFeature: '图案模糊，无立体感',
      importance: 'high',
    },
    {
      item: '变色油墨',
      genuineFeature: '角度变化颜色改变',
      fakeFeature: '无变色效果',
      importance: 'high',
    },
    {
      item: '印刷质量',
      genuineFeature: '图案清晰，色彩饱满',
      fakeFeature: '图案模糊，色彩暗淡',
      importance: 'high',
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
      genuineSpec: '烟丝金黄',
      detectionMethod: '拆开观察',
    },
  ],

  smellVerification: [
    {
      smellType: '未点燃时',
      genuineSmell: '醇厚烟草香',
      fakeSmell: '香精味',
    },
    {
      smellType: '点燃后',
      genuineSmell: '香气醇厚，烟气细腻',
      fakeSmell: '香气粗糙',
    },
  ],

  burnVerification: [
    {
      characteristic: '燃烧速度',
      genuineBehavior: '均匀',
      fakeBehavior: '不稳定',
    },
    {
      characteristic: '烟灰颜色',
      genuineBehavior: '灰白',
      fakeBehavior: '发黑',
    },
  ],

  brandSpecificTips: [
    {
      title: '芙蓉花图案',
      description: '正品芙蓉花图案精细，花瓣层次分明',
    },
    {
      title: '蓝色主调',
      description: '正品蓝色深沉，假烟可能偏浅',
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
      genuineStandard: '有立体感',
    },
    {
      item: '验证防伪码',
      method: '官方查询',
      genuineStandard: '可验证',
    },
    {
      item: '闻香气',
      method: '未点燃和点燃',
      genuineStandard: '香气醇厚',
    },
  ],
};

export default furongwangGuide;
