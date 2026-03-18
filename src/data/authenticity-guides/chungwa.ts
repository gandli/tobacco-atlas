/**
 * 中华品牌真伪鉴别指南
 * Chungwa (Zhonghua) Authenticity Verification Guide
 */

import type { AuthenticityGuide } from './index';

export const zhonghuaGuide: AuthenticityGuide = {
  brandPinyin: 'zhonghua',
  brandNameZh: '中华',
  brandNameEn: 'Zhonghua',
  logoUrl: 'https://www.ciggies.app/api/img/brands/140.jpg',
  
  generalTips: [
    {
      title: '查看防伪标识',
      description: '中华烟每条盒上都有唯一的防伪编码，可通过官方渠道验证',
      icon: '🔍',
    },
    {
      title: '检查包装质感',
      description: '正品包装纸质厚实，印刷精美，手感光滑',
      icon: '✋',
    },
    {
      title: '闻气味',
      description: '正品中华烟有独特的梅子香味，假烟气味刺鼻或有异味',
      icon: '👃',
    },
    {
      title: '观察燃烧',
      description: '正品燃烧均匀，烟灰呈灰白色，不易散落',
      icon: '🔥',
    },
  ],

  packagingVerification: [
    {
      item: '外包装印刷',
      genuineFeature: '图案清晰，色彩饱满，"中华"二字烫金工艺精细，有立体感',
      fakeFeature: '印刷模糊，色彩暗淡，烫金不均匀或脱落',
      importance: 'high',
    },
    {
      item: '防伪拉线',
      genuineFeature: '拉线透明度高，拉带头呈规则的半圆形，切口平整',
      fakeFeature: '拉线发白或发黄，拉带头形状不规则，切口毛糙',
      importance: 'high',
    },
    {
      item: '透明纸',
      genuineFeature: '透明纸光滑透明，手感滑爽，热封平整',
      fakeFeature: '透明纸发雾，手感发涩，热封有气泡或皱纹',
      importance: 'medium',
    },
    {
      item: '条盒钢印',
      genuineFeature: '钢印清晰，深浅一致，位置准确',
      fakeFeature: '钢印模糊，深浅不一，位置偏移',
      importance: 'high',
    },
    {
      item: '包装盒材质',
      genuineFeature: '纸质坚硬挺括，手感厚实',
      fakeFeature: '纸质松软，手感单薄',
      importance: 'medium',
    },
  ],

  cigaretteVerification: [
    {
      item: '烟支长度',
      genuineSpec: '84mm（软包/硬包常规款）',
      tolerance: '±0.5mm',
      detectionMethod: '使用卡尺测量',
    },
    {
      item: '烟支圆周',
      genuineSpec: '24.2mm',
      tolerance: '±0.3mm',
      detectionMethod: '使用圆周仪测量',
    },
    {
      item: '滤嘴长度',
      genuineSpec: '25mm',
      tolerance: '±0.5mm',
      detectionMethod: '目测对比或测量',
    },
    {
      item: '烟丝质量',
      genuineSpec: '烟丝金黄油润，切丝均匀，无杂质',
      detectionMethod: '拆开烟支观察',
    },
    {
      item: '接装纸',
      genuineSpec: '接装纸粘贴牢固，无翘边，图案清晰',
      detectionMethod: '目测检查',
    },
  ],

  smellVerification: [
    {
      smellType: '未点燃时',
      genuineSmell: '淡淡的烟草本香，略带梅子香气',
      fakeSmell: '香精味浓重，或有霉味、酸味',
    },
    {
      smellType: '点燃后',
      genuineSmell: '香气醇厚，烟气细腻，余味干净',
      fakeSmell: '刺激性强，有杂气，余味苦涩',
    },
    {
      smellType: '烟灰气味',
      genuineSmell: '烟灰无明显异味',
      fakeSmell: '烟灰有刺鼻化学气味',
    },
  ],

  burnVerification: [
    {
      characteristic: '燃烧速度',
      genuineBehavior: '燃烧速度适中，约 8-10 分钟燃尽一支',
      fakeBehavior: '燃烧过快或过慢',
    },
    {
      characteristic: '烟灰颜色',
      genuineBehavior: '烟灰呈灰白色，有光泽',
      fakeBehavior: '烟灰发黑或发暗，无光泽',
    },
    {
      characteristic: '烟灰形态',
      genuineBehavior: '烟灰紧实，不易散落，可保留较长',
      fakeBehavior: '烟灰松散，容易掉落',
    },
    {
      characteristic: '燃烧均匀度',
      genuineBehavior: '燃烧均匀，无偏烧现象',
      fakeBehavior: '燃烧不均匀，一边快一边慢',
    },
  ],

  brandSpecificTips: [
    {
      title: '华表图案',
      description: '正品中华烟的华表图案雕刻精细，线条清晰，立体感强。假烟华表图案模糊，线条粗糙。',
    },
    {
      title: '天安门图案',
      description: '正品天安门图案比例准确，细节清晰。假烟图案可能变形或细节缺失。',
    },
    {
      title: '金色边框',
      description: '正品金色边框色泽均匀，有金属光泽。假烟金色发暗或发白，无光泽。',
    },
    {
      title: '防伪编码',
      description: '每条中华烟都有唯一的 16 位防伪编码，可通过上海烟草官网或电话查询验证。编码字体清晰，排列整齐。',
    },
    {
      title: '微缩文字',
      description: '在放大镜下观察，正品包装上有微缩文字"ZHONGHUA"，假烟通常没有或模糊不清。',
    },
  ],

  commonFakeCharacteristics: [
    {
      characteristic: '价格异常低廉',
      howToIdentify: '中华烟作为高端卷烟，价格相对稳定。如价格明显低于市场价（如低于 400 元/条），需高度警惕。',
      riskLevel: 'high',
    },
    {
      characteristic: '销售渠道不正规',
      howToIdentify: '从非烟草专卖店、路边摊、不明网店购买，风险极高。应选择持有烟草专卖许可证的正规渠道。',
      riskLevel: 'high',
    },
    {
      characteristic: '包装印刷质量差',
      howToIdentify: '字体模糊、颜色不正、套印不准、图案变形等都是假烟的典型特征。',
      riskLevel: 'high',
    },
    {
      characteristic: '防伪标识缺失或异常',
      howToIdentify: '无防伪编码、编码无法查询、防伪标识与正品不符。',
      riskLevel: 'high',
    },
    {
      characteristic: '烟支外观粗糙',
      howToIdentify: '烟支粗细不均、滤嘴松动、接装纸翘边、烟丝外露等。',
      riskLevel: 'medium',
    },
    {
      characteristic: '气味异常',
      howToIdentify: '开包后有刺鼻香精味、霉味或其他异味，而非烟草本香。',
      riskLevel: 'medium',
    },
  ],

  checklist: [
    {
      item: '检查外包装印刷质量',
      method: '目测观察图案清晰度、色彩饱满度、烫金工艺',
      genuineStandard: '图案清晰，色彩饱满，烫金精细有立体感',
    },
    {
      item: '验证防伪编码',
      method: '查看条盒上的 16 位防伪编码，通过官方渠道查询',
      genuineStandard: '编码可查询且信息匹配',
    },
    {
      item: '检查拉线',
      method: '观察拉线透明度、拉带头形状、切口平整度',
      genuineStandard: '拉线透明，拉带头规则半圆形，切口平整',
    },
    {
      item: '检查钢印',
      method: '查看条盒钢印清晰度、深浅、位置',
      genuineStandard: '钢印清晰，深浅一致，位置准确',
    },
    {
      item: '测量烟支规格',
      method: '使用卡尺测量烟支长度、圆周',
      genuineStandard: '长度 84mm±0.5mm，圆周 24.2mm±0.3mm',
    },
    {
      item: '检查烟丝质量',
      method: '拆开烟支观察烟丝颜色、切丝均匀度',
      genuineStandard: '烟丝金黄油润，切丝均匀，无杂质',
    },
    {
      item: '闻气味',
      method: '未点燃时闻烟支气味，点燃后闻烟气',
      genuineStandard: '淡淡烟草香带梅子香，烟气醇厚细腻',
    },
    {
      item: '观察燃烧',
      method: '点燃后观察燃烧速度、烟灰颜色和形态',
      genuineStandard: '燃烧均匀，烟灰灰白紧实',
    },
  ],
};

export default zhonghuaGuide;
