/**
 * 端到端集成测试
 * 测试完整的用户流程和跨功能集成
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CompareStoreProvider, useCompareStore } from '../compare-store';
import {
  getRecommendations,
  getPreferenceBasedRecommendations,
} from '../recommendation-algo';
import { getUserPreferences, saveUserPreferences, addBrowsingHistory, addFavorite } from '../user-preferences';
import { getAuthenticityGuideByBrand, getAllAuthenticityGuides } from '../../authenticity-guides/index';
import { preservationTips, troubleshooting } from '../../cigar-preservation/index';

describe('End-to-End Integration', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  function wrapper({ children }: { children: React.ReactNode }) {
    return <CompareStoreProvider>{children}</CompareStoreProvider>;
  }

  describe('Complete User Journey', () => {
    it('should support full user workflow', () => {
      // 1. User visits homepage and browses products
      addBrowsingHistory(1); // 中华
      addBrowsingHistory(2); // 黄鹤楼
      addBrowsingHistory(3); // 玉溪

      // 2. User sets preferences
      const preferences = {
        taste: 'mild' as const,
        priceRange: { min: 20, max: 60 },
        productType: 'cigarette' as const,
        favoriteBrands: ['中华'],
        tarPreference: { min: 6, max: 10 },
        completedAt: new Date().toISOString(),
      };
      saveUserPreferences(preferences);

      // 3. User gets recommendations
      const recs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
        preferences,
      });
      expect(recs.length).toBeGreaterThan(0);

      // 4. User adds products to compare
      const { result } = renderHook(() => useCompareStore(), { wrapper });
      
      act(() => {
        result.current.addProduct({
          id: 1,
          brand: '中华',
          name: '中华（硬）',
          nameEn: 'Zhonghua Hard',
          image: '/api/img/brands/140.jpg',
          brandPinyin: 'zhonghua',
          region: 'mainland',
          price: 45,
          packPrice: 45,
        });
        result.current.addProduct({
          id: 2,
          brand: '黄鹤楼',
          name: '黄鹤楼（软）',
          nameEn: 'Huanghelou Soft',
          image: '/api/img/brands/184.jpg',
          brandPinyin: 'huanghelou',
          region: 'mainland',
          price: 65,
          packPrice: 65,
        });
      });

      expect(result.current.products).toHaveLength(2);

      // 5. User views authenticity guide
      const guide = getAuthenticityGuideByBrand('zhonghua');
      expect(guide).toBeTruthy();
      expect(guide?.brandNameZh).toBe('中华');

      // 6. User favorites a product
      addFavorite(1);

      // 7. User gets updated recommendations
      const updatedRecs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
        preferences,
      });
      expect(updatedRecs.length).toBeGreaterThan(0);

      // 8. User compares products
      expect(result.current.isInCompare(1)).toBe(true);
      expect(result.current.isInCompare(2)).toBe(true);

      // 9. User clears compare
      act(() => {
        result.current.clearProducts();
      });
      expect(result.current.products).toHaveLength(0);
    });
  });

  describe('Cross-Feature Integration', () => {
    it('should integrate recommendations with compare', () => {
      // Set preferences
      const preferences = {
        taste: 'medium' as const,
        priceRange: { min: 30, max: 80 },
        productType: 'any' as const,
        favoriteBrands: [],
        tarPreference: { min: 8, max: 12 },
        completedAt: new Date().toISOString(),
      };

      // Get recommendations
      const recs = getPreferenceBasedRecommendations(preferences, 5);
      expect(recs.length).toBeGreaterThan(0);

      // Add recommended products to compare
      const { result } = renderHook(() => useCompareStore(), { wrapper });
      
      act(() => {
        recs.slice(0, 3).forEach(rec => {
          result.current.addProduct({
            id: rec.id,
            brand: rec.brand,
            name: rec.name,
            nameEn: rec.nameEn,
            image: rec.image,
            brandPinyin: rec.brandPinyin,
            region: rec.region,
            price: rec.price,
            packPrice: rec.packPrice,
          });
        });
      });

      expect(result.current.products).toHaveLength(3);

      // All compared products should match preferences
      result.current.products.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(30);
        expect(product.price).toBeLessThanOrEqual(80);
      });
    });

    it('should integrate authenticity guides with browsing', () => {
      // User browses products
      addBrowsingHistory(1); // 中华
      addBrowsingHistory(140); // 中华

      // User should be able to access authenticity guide
      const guide = getAuthenticityGuideByBrand('zhonghua');
      expect(guide).toBeTruthy();

      // Guide should have comprehensive information
      expect(guide?.generalTips.length).toBeGreaterThan(0);
      expect(guide?.packagingVerification.length).toBeGreaterThan(0);
      expect(guide?.checklist.length).toBeGreaterThan(0);
    });

    it('should integrate cigar preservation with product types', () => {
      // User views cigar products
      addBrowsingHistory(1000); // Assume this is a cigar

      // User should access preservation tips
      expect(preservationTips.humidity.length).toBeGreaterThan(0);
      expect(preservationTips.temperature.length).toBeGreaterThan(0);

      // User might encounter issues
      expect(troubleshooting.mold).toHaveProperty('severity', 'high');
      expect(troubleshooting.beetles).toHaveProperty('severity', 'high');
    });
  });

  describe('State Persistence', () => {
    it('should maintain state across features', () => {
      // Set preferences
      const preferences = {
        taste: 'mild' as const,
        priceRange: { min: 20, max: 50 },
        productType: 'cigarette' as const,
        favoriteBrands: ['玉溪'],
        tarPreference: { min: 6, max: 10 },
        completedAt: new Date().toISOString(),
      };
      saveUserPreferences(preferences);

      // Add to compare
      const { result: compareResult } = renderHook(() => useCompareStore(), { wrapper });
      
      act(() => {
        compareResult.current.addProduct({
          id: 235,
          brand: '玉溪',
          name: '玉溪（软）',
          nameEn: 'Yuxi Soft',
          image: '/api/img/brands/235.png',
          brandPinyin: 'yuxi',
          region: 'mainland',
          price: 23,
          packPrice: 23,
        });
      });

      // Add to favorites
      addFavorite(235);

      // Verify all state is persisted
      const storedPrefs = getUserPreferences();
      expect(storedPrefs.completedAt).toBeTruthy();
      expect(storedPrefs.favoriteBrands).toContain('玉溪');

      const behavior = getUserBehavior();
      expect(behavior.favorites).toContain(235);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing data gracefully', () => {
      // Try to get non-existent guide
      const nonExistentGuide = getAuthenticityGuideByBrand('nonexistent');
      expect(nonExistentGuide).toBeNull();

      // Try to get recommendations with invalid preferences
      const invalidPrefs = {
        taste: 'invalid' as any,
        priceRange: { min: 1000, max: 0 }, // Invalid range
        productType: 'any' as const,
        favoriteBrands: [],
        tarPreference: { min: 0, max: 30 },
      };

      const recs = getPreferenceBasedRecommendations(invalidPrefs, 10);
      expect(Array.isArray(recs)).toBe(true);
    });

    it('should handle concurrent operations', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // Concurrent add operations
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.addProduct({
            id: i,
            brand: `Brand ${i}`,
            name: `Product ${i}`,
            nameEn: `Product ${i}`,
            image: '',
            brandPinyin: `brand${i}`,
            region: 'mainland',
            price: i * 10,
            packPrice: i * 10,
          });
        }
      });

      // Should only have 4 (max capacity)
      expect(result.current.products).toHaveLength(4);
    });
  });

  describe('Performance Integration', () => {
    it('should perform well under load', () => {
      const startTime = Date.now();

      // Simulate heavy usage
      for (let i = 0; i < 50; i++) {
        // Add browsing history
        addBrowsingHistory(i);

        // Get recommendations
        getRecommendations({
          strategy: 'mixed',
          limit: 10,
        });

        // Get authenticity guide
        getAuthenticityGuideByBrand('zhonghua');
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
    });
  });

  describe('Real-World Scenarios', () => {
    it('should support comparison shopping flow', () => {
      // User browses multiple products
      [1, 2, 3, 4, 5].forEach(id => addBrowsingHistory(id));

      // User compares top choices
      const { result } = renderHook(() => useCompareStore(), { wrapper });
      
      act(() => {
        [1, 2, 3, 4].forEach(id => {
          result.current.addProduct({
            id,
            brand: `Brand ${id}`,
            name: `Product ${id}`,
            nameEn: `Product ${id}`,
            image: '',
            brandPinyin: `brand${id}`,
            region: 'mainland',
            price: id * 10,
            packPrice: id * 10,
          });
        });
      });

      expect(result.current.products).toHaveLength(4);
      expect(result.current.isFull).toBe(true);

      // User removes one and adds another
      act(() => {
        result.current.removeProduct(2);
        result.current.addProduct({
          id: 5,
          brand: 'Brand 5',
          name: 'Product 5',
          nameEn: 'Product 5',
          image: '',
          brandPinyin: 'brand5',
          region: 'mainland',
          price: 50,
          packPrice: 50,
        });
      });

      expect(result.current.products).toHaveLength(4);
      expect(result.current.isInCompare(2)).toBe(false);
      expect(result.current.isInCompare(5)).toBe(true);
    });

    it('should support discovery flow', () => {
      // New user with no preferences
      const initialRecs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
      });
      expect(initialRecs.length).toBeGreaterThan(0);

      // User discovers and favorites products
      [1, 2, 3].forEach(id => addFavorite(id));

      // User sets preferences based on discoveries
      const preferences = {
        taste: 'medium' as const,
        priceRange: { min: 20, max: 60 },
        productType: 'cigarette' as const,
        favoriteBrands: ['中华', '黄鹤楼'],
        tarPreference: { min: 8, max: 12 },
        completedAt: new Date().toISOString(),
      };
      saveUserPreferences(preferences);

      // Get personalized recommendations
      const personalizedRecs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
        preferences,
      });
      expect(personalizedRecs.length).toBeGreaterThan(0);

      // User views authenticity guides for favorited brands
      const zhonghuaGuide = getAuthenticityGuideByBrand('zhonghua');
      const huanghelouGuide = getAuthenticityGuideByBrand('huanghelou');
      
      expect(zhonghuaGuide).toBeTruthy();
      expect(huanghelouGuide).toBeTruthy();
    });
  });
});
