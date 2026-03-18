import { describe, it, expect } from 'vitest';
import {
  brandGuides,
  getAuthenticityGuideByBrand,
  getAllAuthenticityGuides,
} from './index';

describe('Authenticity Guides Data', () => {
  describe('brandGuides', () => {
    it('should have all brand guides', () => {
      expect(brandGuides).toHaveProperty('zhonghua');
      expect(brandGuides).toHaveProperty('huanghelou');
      expect(brandGuides).toHaveProperty('yuxi');
      expect(brandGuides).toHaveProperty('yunyan');
      expect(brandGuides).toHaveProperty('furongwang');
      expect(brandGuides).toHaveProperty('liqun');
      expect(brandGuides).toHaveProperty('nanjing');
      expect(brandGuides).toHaveProperty('huangjinye');
      expect(brandGuides).toHaveProperty('taishan');
      expect(brandGuides).toHaveProperty('hongtashan');
      expect(brandGuides).toHaveProperty('baisha');
      expect(brandGuides).toHaveProperty('shuangxi');
      expect(brandGuides).toHaveProperty('zhenlong');
      expect(brandGuides).toHaveProperty('changbaishan');
      expect(brandGuides).toHaveProperty('guiyan');
    });

    it('should have at least 15 brand guides', () => {
      expect(Object.keys(brandGuides).length).toBeGreaterThanOrEqual(15);
    });
  });

  describe('getAuthenticityGuideByBrand', () => {
    it('should return guide for zhonghua', () => {
      const guide = getAuthenticityGuideByBrand('zhonghua');
      expect(guide).toBeTruthy();
      expect(guide?.brandNameZh).toBe('中华');
      expect(guide?.brandPinyin).toBe('zhonghua');
    });

    it('should return guide for huanghelou', () => {
      const guide = getAuthenticityGuideByBrand('huanghelou');
      expect(guide).toBeTruthy();
      expect(guide?.brandNameZh).toBe('黄鹤楼');
    });

    it('should return null for non-existent brand', () => {
      const guide = getAuthenticityGuideByBrand('nonexistent');
      expect(guide).toBeNull();
    });

    it('should return null for chungwa (old pinyin)', () => {
      const guide = getAuthenticityGuideByBrand('chungwa');
      expect(guide).toBeNull();
    });
  });

  describe('getAllAuthenticityGuides', () => {
    it('should return all guides', () => {
      const guides = getAllAuthenticityGuides();
      expect(Array.isArray(guides)).toBe(true);
      expect(guides.length).toBeGreaterThanOrEqual(15);
    });

    it('should have valid guide structure', () => {
      const guides = getAllAuthenticityGuides();
      
      guides.forEach(guide => {
        expect(guide).toHaveProperty('brandPinyin');
        expect(guide).toHaveProperty('brandNameZh');
        expect(guide).toHaveProperty('generalTips');
        expect(guide).toHaveProperty('packagingVerification');
        expect(guide).toHaveProperty('cigaretteVerification');
        expect(Array.isArray(guide.generalTips)).toBe(true);
        expect(Array.isArray(guide.packagingVerification)).toBe(true);
        expect(Array.isArray(guide.cigaretteVerification)).toBe(true);
      });
    });
  });

  describe('Guide Structure', () => {
    it('zhonghua guide should have all required fields', () => {
      const guide = brandGuides.zhonghua;
      
      expect(guide).toHaveProperty('brandPinyin', 'zhonghua');
      expect(guide).toHaveProperty('brandNameZh', '中华');
      expect(guide).toHaveProperty('brandNameEn', 'Zhonghua');
      expect(guide).toHaveProperty('logoUrl');
      expect(guide).toHaveProperty('generalTips');
      expect(guide).toHaveProperty('packagingVerification');
      expect(guide).toHaveProperty('cigaretteVerification');
      expect(guide).toHaveProperty('smellVerification');
      expect(guide).toHaveProperty('burnVerification');
      expect(guide).toHaveProperty('brandSpecificTips');
      expect(guide).toHaveProperty('commonFakeCharacteristics');
      expect(guide).toHaveProperty('checklist');
    });

    it('generalTips should have valid structure', () => {
      const guide = brandGuides.zhonghua;
      
      guide.generalTips.forEach(tip => {
        expect(tip).toHaveProperty('title');
        expect(tip).toHaveProperty('description');
        expect(typeof tip.title).toBe('string');
        expect(typeof tip.description).toBe('string');
      });
    });

    it('packagingVerification should have valid structure', () => {
      const guide = brandGuides.zhonghua;
      
      guide.packagingVerification.forEach(item => {
        expect(item).toHaveProperty('item');
        expect(item).toHaveProperty('genuineFeature');
        expect(item).toHaveProperty('fakeFeature');
        expect(item).toHaveProperty('importance');
        expect(['high', 'medium', 'low']).toContain(item.importance);
      });
    });

    it('cigaretteVerification should have valid structure', () => {
      const guide = brandGuides.zhonghua;
      
      guide.cigaretteVerification.forEach(item => {
        expect(item).toHaveProperty('item');
        expect(item).toHaveProperty('genuineSpec');
        expect(item).toHaveProperty('detectionMethod');
      });
    });
  });

  describe('Logo URLs', () => {
    it('all guides should have valid logo URLs', () => {
      const guides = getAllAuthenticityGuides();
      
      guides.forEach(guide => {
        expect(guide.logoUrl).toBeTruthy();
        expect(guide.logoUrl).toMatch(/^https:\/\/www\.ciggies\.app\/api\/img\/brands\/\d+\.(jpg|png)$/);
      });
    });
  });
});
