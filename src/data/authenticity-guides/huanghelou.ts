/**
 * 黄鹤楼品牌真伪鉴别指南
 * Huanghelou Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const huanghelouGuide: AuthenticityGuide = {
  brandPinyin: 'huanghelou',
  brandNameZh: '黄鹤楼',
  brandNameEn: 'Huanghelou',
  logoUrl: '/api/img/brands/184.jpg',
  
  generalTips: [
    {
      title: '查看防伪标识',
      description: '黄鹤楼烟采用多重防伪技术，包括激光全息防伪、温变油墨等',
      icon: '🔍',
    },
    {
      title: '检查包装工艺',
      description: '正品包装精美，烫金工艺精湛，图案层次分明',
      icon: '✋',
    },
    {
      title: '闻香气',
      description: '正品黄鹤楼有独特的"雅香"风格，香气优雅细腻',
      icon: '👃',
    },
    {
      title: '观察烟支',
      description: '正品烟支饱满，滤嘴精致，接装工艺完美',
      icon: '👀',
    },
  ],

  packagingVerification: [
    {
      item: '激光全息防伪',
      genuineFeature: '全息图案清晰，角度变化时图案有动态效果，色彩丰富',
      fakeFeature: '全息图案模糊，无动态效果或效果生硬，色彩单一',
      importance: 'high',
    },
    {
      item: '温变油墨',
      genuineFeature: '特定区域加热后颜色会发生变化，冷却后恢复',
      fakeFeature: '无温变效果或温变不明显',
      importance: 'high',
    },
    {
      item: '烫金工艺',
      genuineFeature: '烫金均匀，光泽度高，无脱落现象',
      fakeFeature: '烫金不均匀，光泽暗淡，易脱落',
      importance: 'high',
    },
    {
      item: '压纹工艺',
      genuineFeature: '压纹清晰，立体感强，手感明显',
      fakeFeature: '压纹模糊，立体感弱，手感不明显',
      importance: 'medium',
    },
    {
      item: '包装材质',
      genuineFeature: '纸质厚实，手感细腻，挺括度高',
      fakeFeature: '纸质单薄，手感粗糙，易变形',
      importance: 'medium',
    },
  ],

  cigaretteVerification: [
    {
      item: '烟支长度',
      genuineSpec: '84mm（常规款）/ 97mm（细支款）',
      tolerance: '±0.5mm',
      detectionMethod: '使用卡尺测量',
    },
    {
      item: '烟支圆周',
      genuineSpec: '24.2mm（常规）/ 17mm（细支）',
      tolerance: '±0.3mm',
      detectionMethod: '使用圆周仪测量',
    },
    {
      item: '滤嘴设计',
      genuineSpec: '滤嘴上有黄鹤楼标志或特殊纹路',
      detectionMethod: '目测检查',
    },
    {
      item: '烟丝质量',
      genuineSpec: '烟丝橙黄油润，切丝宽度均匀，含梗率低',
      detectionMethod: '拆开烟支观察',
    },
    {
      item: '接装工艺',
      genuineSpec: '接装纸粘贴牢固，无气泡，无翘边',
      detectionMethod: '目测和手感检查',
    },
  ],

  smellVerification: [
    {
      smellType: '未点燃时',
      genuineSmell: '优雅的烟草本香，带有独特的"雅香"风格',
      fakeSmell: '香精味浓，或有异味、霉味',
    },
    {
      smellType: '点燃后',
      genuineSmell: '香气优雅细腻，烟气柔和，余味舒适',
      fakeSmell: '香气粗糙，刺激性强，余味苦涩',
    },
    {
      smellType: '空烟味',
      genuineSmell: '烟蒂无明显异味',
      fakeSmell: '烟蒂有刺鼻化学气味',
    },
  ],

  burnVerification: [
    {
      characteristic: '燃烧速度',
      genuineBehavior: '燃烧速度均匀，约 8-10 分钟燃尽一支',
      fakeBehavior: '燃烧速度不稳定，过快或过慢',
    },
    {
      characteristic: '烟灰颜色',
      genuineBehavior: '烟灰呈灰白色，有光泽',
      fakeBehavior: '烟灰发黑或发暗',
    },
    {
      characteristic: '烟灰形态',
      genuineBehavior: '烟灰紧实，不易散落',
      fakeBehavior: '烟灰松散，容易掉落',
    },
    {
      characteristic: '燃烧线',
      genuineBehavior: '燃烧线整齐，无偏烧',
      fakeBehavior: '燃烧线不整齐，有偏烧现象',
    },
  ],

  brandSpecificTips: [
    {
      title: '黄鹤楼标志',
      description: '正品黄鹤楼标志图案精细，楼阁层次分明，线条流畅。假烟标志图案模糊，楼阁结构不清。',
    },
    {
      title: '雅香标识',
      description: '部分黄鹤楼产品标有"雅香"字样，正品字体清晰，烫金精致。假烟字体模糊，烫金粗糙。',
    },
    {
      title: '防伪二维码',
      description: '正品包装上有防伪二维码，扫描后可进入官方验证页面。假烟二维码可能无法扫描或链接到非官方页面。',
    },
    {
      title: '内衬纸',
      description: '正品内衬纸铝箔光亮，印刷清晰，拉线易拉。假烟内衬纸铝箔暗淡，印刷模糊，拉线难拉。',
    },
    {
      title: '特殊系列鉴别',
      description: '黄鹤楼 1916 等高端系列有特殊防伪标识，如镂空窗花、特殊油墨等，需仔细核对。',
    },
  ],

  commonFakeCharacteristics: [
    {
      characteristic: '价格异常',
      howToIdentify: '黄鹤楼各系列价格相对透明，如价格明显低于市场价需警惕。特别是 1916 等高端系列。',
      riskLevel: 'high',
    },
    {
      characteristic: '防伪标识异常',
      howToIdentify: '无防伪标识、防伪标识无法验证、验证信息与产品不符。',
      riskLevel: 'high',
    },
    {
      characteristic: '包装印刷质量差',
      howToIdentify: '图案模糊、颜色不正、套印不准、烫金脱落等。',
      riskLevel: 'high',
    },
    {
      characteristic: '烟支质量差',
      howToIdentify: '烟支松软、滤嘴松动、接装纸翘边、烟丝外露等。',
      riskLevel: 'medium',
    },
    {
      characteristic: '香气异常',
      howToIdentify: '无"雅香"特征，香气粗糙或有异味。',
      riskLevel: 'medium',
    },
  ],

  checklist: [
    {
      item: '检查激光全息防伪',
      method: '变换角度观察全息图案动态效果',
      genuineStandard: '图案清晰，有动态效果，色彩丰富',
    },
    {
      item: '测试温变油墨',
      method: '用手指摩擦或加热特定区域',
      genuineStandard: '颜色发生变化，冷却后恢复',
    },
    {
      item: '检查烫金工艺',
      method: '目测烫金均匀度和光泽度',
      genuineStandard: '烫金均匀，光泽度高',
    },
    {
      item: '验证防伪二维码',
      method: '使用手机扫描二维码',
      genuineStandard: '可扫描并进入官方验证页面',
    },
    {
      item: '检查烟支规格',
      method: '测量烟支长度和圆周',
      genuineStandard: '符合标称规格，误差在允许范围内',
    },
    {
      item: '检查烟丝质量',
      method: '拆开烟支观察烟丝',
      genuineStandard: '烟丝橙黄油润，切丝均匀',
    },
    {
      item: '闻香气',
      method: '未点燃和点燃后分别闻气味',
      genuineStandard: '有独特"雅香"风格，香气优雅细腻',
    },
    {
      item: '观察燃烧',
      method: '点燃后观察燃烧情况',
      genuineStandard: '燃烧均匀，烟灰灰白紧实',
    },
  ],
};

export default huanghelouGuide;
