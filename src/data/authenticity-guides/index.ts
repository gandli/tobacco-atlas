/**
 * 真伪鉴别指南数据结构
 * Authenticity Verification Guide Data Structure
 */

export interface AuthenticityGuide {
  /** 品牌拼音标识 */
  brandPinyin: string;
  /** 品牌中文名 */
  brandNameZh: string;
  /** 品牌英文名 */
  brandNameEn?: string;
  /** 品牌 Logo URL */
  logoUrl?: string;
  /** 通用鉴别要点 */
  generalTips: VerificationTip[];
  /** 包装鉴别 */
  packagingVerification: PackagingTip[];
  /** 烟支鉴别 */
  cigaretteVerification: CigaretteTip[];
  /** 气味鉴别 */
  smellVerification?: SmellTip[];
  /** 燃烧鉴别 */
  burnVerification?: BurnTip[];
  /** 品牌专属鉴别要点 */
  brandSpecificTips: BrandSpecificTip[];
  /** 常见假冒特征 */
  commonFakeCharacteristics: FakeCharacteristic[];
  /** 鉴别清单（可打印） */
  checklist: ChecklistItem[];
}

export interface VerificationTip {
  /** 要点标题 */
  title: string;
  /** 要点描述 */
  description: string;
  /** 图标或 emoji */
  icon?: string;
}

export interface PackagingTip {
  /** 鉴别项目 */
  item: string;
  /** 正品特征 */
  genuineFeature: string;
  /** 假冒特征 */
  fakeFeature: string;
  /** 重要程度 */
  importance: 'high' | 'medium' | 'low';
}

export interface CigaretteTip {
  /** 鉴别项目 */
  item: string;
  /** 正品规格 */
  genuineSpec: string;
  /** 允许误差 */
  tolerance?: string;
  /** 检测方法 */
  detectionMethod: string;
}

export interface SmellTip {
  /** 气味类型 */
  smellType: string;
  /** 正品气味描述 */
  genuineSmell: string;
  /** 假烟气味描述 */
  fakeSmell: string;
}

export interface BurnTip {
  /** 燃烧特征 */
  characteristic: string;
  /** 正品表现 */
  genuineBehavior: string;
  /** 假烟表现 */
  fakeBehavior: string;
}

export interface BrandSpecificTip {
  /** 鉴别要点标题 */
  title: string;
  /** 详细描述 */
  description: string;
  /** 图片对比（可选） */
  imageComparison?: {
    genuineImageUrl?: string;
    fakeImageUrl?: string;
    caption?: string;
  };
}

export interface FakeCharacteristic {
  /** 假冒特征描述 */
  characteristic: string;
  /** 如何识别 */
  howToIdentify: string;
  /** 风险等级 */
  riskLevel: 'high' | 'medium' | 'low';
}

export interface ChecklistItem {
  /** 检查项目 */
  item: string;
  /** 检查方法 */
  method: string;
  /** 正品标准 */
  genuineStandard: string;
}

/**
 * 获取所有鉴别指南的品牌列表
 */
export function getAuthenticityGuideBrands(): string[] {
  return Object.keys(brandGuides);
}

/**
 * 根据品牌拼音获取鉴别指南
 */
export function getAuthenticityGuideByBrand(brandPinyin: string): AuthenticityGuide | null {
  return brandGuides[brandPinyin] || null;
}

// 导入所有品牌指南
import { chungwaGuide } from './chungwa';
import { huanghelouGuide } from './huanghelou';
import { yuxiGuide } from './yuxi';
import { yunyanGuide } from './yunyan';
import { furongwangGuide } from './furongwang';
import { liqunGuide } from './liqun';
import { nanjingGuide } from './nanjing';
import { huangjinyeGuide } from './huangjinye';
import { taishanGuide } from './taishan';
import { hongtashanGuide } from './hongtashan';
import { baishaGuide } from './baisha';
import { shuangxiGuide } from './shuangxi';
import { zhenlongGuide } from './zhenlong';
import { changbaishanGuide } from './changbaishan';
import { guiyanGuide } from './guiyan';

/**
 * 所有品牌的鉴别指南索引
 */
export const brandGuides: Record<string, AuthenticityGuide> = {
  chungwa: chungwaGuide,
  huanghelou: huanghelouGuide,
  yuxi: yuxiGuide,
  yunyan: yunyanGuide,
  furongwang: furongwangGuide,
  liqun: liqunGuide,
  nanjing: nanjingGuide,
  huangjinye: huangjinyeGuide,
  taishan: taishanGuide,
  hongtashan: hongtashanGuide,
  baisha: baishaGuide,
  shuangxi: shuangxiGuide,
  zhenlong: zhenlongGuide,
  changbaishan: changbaishanGuide,
  guiyan: guiyanGuide,
};
