/**
 * 真伪鉴别指南集成测试
 * 测试完整的数据结构和查询功能
 */

import { describe, it, expect } from 'vitest';
import {
  brandGuides,
  getAuthenticityGuideByBrand,
} from '../../authenticity-guides/index';

// Helper to get all guides
function getAllAuthenticityGuides() {
  return Object.values(brandGuides);
}
import { getBrandByPinyin } from '../../brand-catalog';

describe('Authenticity Guides Integration', () => {
  describe('Data Structure Validation', () => {
    it('should have all required brand guides', () => {
      const requiredBrands = [
        'zhonghua',
        'huanghelou',
        'yuxi',
        'yunyan',
        'furongwang',
        'liqun',
        'nanjing',
        'huangjinye',
        'taishan',
        'hongtashan',
        'baisha',
        'shuangxi',
        'zhenlong',
        'changbaishan',
        'guiyan',
      ];

      requiredBrands.forEach(brand => {
        expect(brandGuides).toHaveProperty(brand);
        const guide = brandGuides[brand];
        expect(guide.brandPinyin).toBe(brand);
      });
    });

    it('should have complete guide structure for all brands', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        // Required fields
        expect(guide).toHaveProperty('brandPinyin');
        expect(guide).toHaveProperty('brandNameZh');
        expect(guide).toHaveProperty('generalTips');
        expect(guide).toHaveProperty('packagingVerification');
        expect(guide).toHaveProperty('cigaretteVerification');
        expect(guide).toHaveProperty('brandSpecificTips');
        expect(guide).toHaveProperty('commonFakeCharacteristics');
        expect(guide).toHaveProperty('checklist');

        // Data types
        expect(typeof guide.brandPinyin).toBe('string');
        expect(typeof guide.brandNameZh).toBe('string');
        expect(Array.isArray(guide.generalTips)).toBe(true);
        expect(Array.isArray(guide.packagingVerification)).toBe(true);
        expect(Array.isArray(guide.cigaretteVerification)).toBe(true);
        expect(Array.isArray(guide.brandSpecificTips)).toBe(true);
        expect(Array.isArray(guide.commonFakeCharacteristics)).toBe(true);
        expect(Array.isArray(guide.checklist)).toBe(true);

        // Logo URL format
        expect(guide.logoUrl).toMatch(/^https:\/\/www\.ciggies\.app\/api\/img\/brands\/\d+\.(jpg|png)$/);
      });
    });

    it('should have valid general tips structure', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.generalTips.length).toBeGreaterThan(0);
        
        guide.generalTips.forEach(tip => {
          expect(tip).toHaveProperty('title');
          expect(tip).toHaveProperty('description');
          expect(typeof tip.title).toBe('string');
          expect(typeof tip.description).toBe('string');
          expect(tip.title.length).toBeGreaterThan(0);
          expect(tip.description.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have valid packaging verification structure', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.packagingVerification.length).toBeGreaterThan(0);
        
        guide.packagingVerification.forEach(item => {
          expect(item).toHaveProperty('item');
          expect(item).toHaveProperty('genuineFeature');
          expect(item).toHaveProperty('fakeFeature');
          expect(item).toHaveProperty('importance');
          expect(['high', 'medium', 'low']).toContain(item.importance);
        });
      });
    });

    it('should have valid cigarette verification structure', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.cigaretteVerification.length).toBeGreaterThan(0);
        
        guide.cigaretteVerification.forEach(item => {
          expect(item).toHaveProperty('item');
          expect(item).toHaveProperty('genuineSpec');
          expect(item).toHaveProperty('detectionMethod');
        });
      });
    });
  });

  describe('Query Functions', () => {
    it('should return correct guide by brand pinyin', () => {
      const zhonghua = getAuthenticityGuideByBrand('zhonghua');
      expect(zhonghua).toBeTruthy();
      expect(zhonghua?.brandNameZh).toBe('中华');
      expect(zhonghua?.brandPinyin).toBe('zhonghua');

      const huanghelou = getAuthenticityGuideByBrand('huanghelou');
      expect(huanghelou).toBeTruthy();
      expect(huanghelou?.brandNameZh).toBe('黄鹤楼');
    });

    it('should return null for non-existent brand', () => {
      const nonExistent = getAuthenticityGuideByBrand('nonexistent');
      expect(nonExistent).toBeNull();
    });

    it('should handle chungwa alias (backward compatibility)', () => {
      // chungwa should not work anymore (migrated to zhonghua)
      const chungwa = getAuthenticityGuideByBrand('chungwa');
      expect(chungwa).toBeNull();
    });

    it('should return all guides', () => {
      const allGuides = getAllAuthenticityGuides();
      expect(Array.isArray(allGuides)).toBe(true);
      expect(allGuides.length).toBeGreaterThanOrEqual(15);
      
      // All guides should have unique pinyin
      const pinyins = allGuides.map(g => g.brandPinyin);
      const uniquePinyins = new Set(pinyins);
      expect(pinyins.length).toBe(uniquePinyins.size);
    });
  });

  describe('Brand Data Consistency', () => {
    it('should have matching brand data', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        const brand = getBrandByPinyin(guide.brandPinyin);
        
        // Brand should exist in brand-catalog
        expect(brand).toBeTruthy();
        
        // Brand names should match
        expect(brand?.name).toBe(guide.brandNameZh);
      });
    });

    it('should have consistent logo URLs', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        const brand = getBrandByPinyin(guide.brandPinyin);
        
        if (brand?.logo) {
          // If brand has logo, guide should use it or have valid URL
          expect(guide.logoUrl).toBeTruthy();
          expect(guide.logoUrl).toMatch(/^https:\/\//);
        }
      });
    });
  });

  describe('Content Quality', () => {
    it('should have comprehensive verification tips', () => {
      const zhonghua = brandGuides.zhonghua;
      
      // Should have multiple verification methods
      expect(zhonghua.generalTips.length).toBeGreaterThanOrEqual(3);
      expect(zhonghua.packagingVerification.length).toBeGreaterThanOrEqual(3);
      expect(zhonghua.cigaretteVerification.length).toBeGreaterThanOrEqual(3);
      
      // Should have smell and burn verification
      expect(zhonghua.smellVerification).toBeTruthy();
      expect(zhonghua.burnVerification).toBeTruthy();
      expect(zhonghua.smellVerification!.length).toBeGreaterThan(0);
      expect(zhonghua.burnVerification!.length).toBeGreaterThan(0);
    });

    it('should have brand-specific tips', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.brandSpecificTips.length).toBeGreaterThan(0);
        
        guide.brandSpecificTips.forEach(tip => {
          expect(tip).toHaveProperty('title');
          expect(tip).toHaveProperty('description');
          expect(tip.title.length).toBeGreaterThan(0);
          expect(tip.description.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have fake characteristics', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.commonFakeCharacteristics.length).toBeGreaterThan(0);
        
        guide.commonFakeCharacteristics.forEach(char => {
          expect(char).toHaveProperty('characteristic');
          expect(char).toHaveProperty('howToIdentify');
          expect(char).toHaveProperty('riskLevel');
          expect(['high', 'medium', 'low']).toContain(char.riskLevel);
        });
      });
    });

    it('should have printable checklist', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.checklist.length).toBeGreaterThan(0);
        
        guide.checklist.forEach(item => {
          expect(item).toHaveProperty('item');
          expect(item).toHaveProperty('method');
          expect(item).toHaveProperty('genuineStandard');
        });
      });
    });
  });

  describe('Localization', () => {
    it('should have English names', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide).toHaveProperty('brandNameEn');
        expect(typeof guide.brandNameEn).toBe('string');
        expect(guide.brandNameEn!.length).toBeGreaterThan(0);
      });
    });

    it('should have consistent naming', () => {
      const zhonghua = brandGuides.zhonghua;
      expect(zhonghua.brandNameZh).toBe('中华');
      expect(zhonghua.brandNameEn).toBe('Zhonghua');

      const huanghelou = brandGuides.huanghelou;
      expect(huanghelou.brandNameZh).toBe('黄鹤楼');
      expect(huanghelou.brandNameEn).toBe('Huanghelou');
    });
  });

  describe('Data Integrity', () => {
    it('should not have duplicate brands', () => {
      const pinyins = Object.keys(brandGuides);
      const uniquePinyins = new Set(pinyins);
      expect(pinyins.length).toBe(uniquePinyins.size);
    });

    it('should have valid pinyin format', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.brandPinyin).toMatch(/^[a-z]+$/);
        expect(guide.brandPinyin.length).toBeGreaterThan(0);
      });
    });

    it('should have no empty fields', () => {
      const guides = getAllAuthenticityGuides();

      guides.forEach(guide => {
        expect(guide.brandNameZh.trim()).not.toBe('');
        expect(guide.brandNameEn!.trim()).not.toBe('');
        expect(guide.logoUrl.trim()).not.toBe('');
      });
    });
  });

  describe('Performance', () => {
    it('should load guides quickly', () => {
      const startTime = Date.now();

      // Load all guides multiple times
      for (let i = 0; i < 100; i++) {
        getAllAuthenticityGuides();
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      const avgTime = duration / 100;

      // Each load should take less than 1ms on average
      expect(avgTime).toBeLessThan(1);
    });

    it('should query guides quickly', () => {
      const startTime = Date.now();

      // Query guides multiple times
      for (let i = 0; i < 1000; i++) {
        getAuthenticityGuideByBrand('zhonghua');
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      const avgTime = duration / 1000;

      // Each query should take less than 0.1ms on average
      expect(avgTime).toBeLessThan(0.1);
    });
  });
});
