/**
 * AI 推荐算法集成测试
 * 测试完整的推荐流程和算法组合
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRecommendations,
  getPreferenceBasedRecommendations,
  getPopularRecommendations,
  getSimilarRecommendations,
  getNewRecommendations,
  getBehaviorBasedRecommendations,
} from '../recommendation-algo';
import type { UserPreferences, UserBehavior } from '../user-preferences';
import { getUserPreferences, getUserBehavior, addBrowsingHistory, addFavorite } from '../user-preferences';

describe('Recommendation Algorithm Integration', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Complete Recommendation Flow', () => {
    it('should handle full recommendation workflow', () => {
      // 1. Get initial recommendations (no preferences)
      const initialRecs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
      });
      expect(Array.isArray(initialRecs)).toBe(true);
      expect(initialRecs.length).toBeGreaterThan(0);

      // 2. Set user preferences
      const preferences: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 10, max: 50 },
        productType: 'cigarette',
        favoriteBrands: ['中华', '黄鹤楼'],
        tarPreference: { min: 0, max: 10 },
        completedAt: new Date().toISOString(),
      };

      // 3. Get preference-based recommendations
      const prefRecs = getPreferenceBasedRecommendations(preferences, 10);
      expect(Array.isArray(prefRecs)).toBe(true);
      
      // All recommendations should match preferences
      prefRecs.forEach(rec => {
        expect(rec.price).toBeGreaterThanOrEqual(10);
        expect(rec.price).toBeLessThanOrEqual(50);
      });

      // 4. Add browsing history
      addBrowsingHistory(1);
      addBrowsingHistory(2);
      addBrowsingHistory(3);

      // 5. Get behavior-based recommendations
      const behaviorRecs = getBehaviorBasedRecommendations(10);
      expect(Array.isArray(behaviorRecs)).toBe(true);

      // 6. Add favorites
      addFavorite(1);
      addFavorite(2);

      // 7. Get similar recommendations
      const similarRecs = getSimilarRecommendations(1, 10);
      expect(Array.isArray(similarRecs)).toBe(true);
      
      // Should not include the original product
      similarRecs.forEach(rec => {
        expect(rec.id).not.toBe(1);
      });

      // 8. Get mixed recommendations with preferences
      const mixedRecs = getRecommendations({
        strategy: 'mixed',
        limit: 20,
        preferences,
        productId: 1,
      });
      expect(Array.isArray(mixedRecs)).toBe(true);
      expect(mixedRecs.length).toBeLessThanOrEqual(20);
    });

    it('should adapt recommendations based on user behavior', () => {
      // Clear initial state
      localStorage.clear();

      // Simulate user browsing expensive products
      const expensiveProducts = [100, 101, 102, 103, 104];
      expensiveProducts.forEach(id => {
        addBrowsingHistory(id);
      });

      // Get behavior-based recommendations
      const recs = getBehaviorBasedRecommendations(10);
      expect(Array.isArray(recs)).toBe(true);

      // Recommendations should reflect browsing pattern
      expect(recs.length).toBeGreaterThan(0);
    });

    it('should handle preference changes', () => {
      // Initial preferences
      const preferences1: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 0, max: 30 },
        productType: 'cigarette',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 8 },
        completedAt: new Date().toISOString(),
      };

      const recs1 = getPreferenceBasedRecommendations(preferences1, 10);
      
      // Changed preferences
      const preferences2: UserPreferences = {
        taste: 'strong',
        priceRange: { min: 50, max: 100 },
        productType: 'cigarette',
        favoriteBrands: ['中华'],
        tarPreference: { min: 10, max: 15 },
        completedAt: new Date().toISOString(),
      };

      const recs2 = getPreferenceBasedRecommendations(preferences2, 10);

      // Recommendations should be different
      expect(recs1).not.toEqual(recs2);
    });
  });

  describe('Strategy Combination', () => {
    it('should combine multiple strategies effectively', () => {
      const preferences: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 20, max: 80 },
        productType: 'any',
        favoriteBrands: ['黄鹤楼'],
        tarPreference: { min: 8, max: 12 },
        completedAt: new Date().toISOString(),
      };

      // Get recommendations from each strategy
      const prefRecs = getPreferenceBasedRecommendations(preferences, 5);
      const popularRecs = getPopularRecommendations(5);
      const similarRecs = getSimilarRecommendations(1, 5);
      const newRecs = getNewRecommendations(5);

      // All should return arrays
      expect(prefRecs).toHaveLength(5);
      expect(popularRecs).toHaveLength(5);
      expect(similarRecs).toHaveLength(5);
      expect(newRecs).toHaveLength(5);

      // Get mixed recommendations
      const mixedRecs = getRecommendations({
        strategy: 'mixed',
        limit: 20,
        preferences,
        productId: 1,
      });

      // Mixed should combine strategies
      expect(mixedRecs.length).toBeGreaterThan(0);
      expect(mixedRecs.length).toBeLessThanOrEqual(20);
    });

    it('should handle strategy fallback', () => {
      // When preferences are not set, should fall back to popular
      const recs = getRecommendations({
        strategy: 'preference',
        limit: 10,
      });

      expect(Array.isArray(recs)).toBe(true);
      expect(recs.length).toBeGreaterThan(0);
    });
  });

  describe('Data Consistency', () => {
    it('should maintain consistent recommendation quality', () => {
      const preferences: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 0, max: 100 },
        productType: 'any',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 30 },
        completedAt: new Date().toISOString(),
      };

      // Get recommendations multiple times
      const recs1 = getRecommendations({
        strategy: 'mixed',
        limit: 10,
        preferences,
      });

      const recs2 = getRecommendations({
        strategy: 'mixed',
        limit: 10,
        preferences,
      });

      // Results should be consistent
      expect(recs1.length).toBe(recs2.length);
      
      // All recommendations should have required fields
      [...recs1, ...recs2].forEach(rec => {
        expect(rec).toHaveProperty('id');
        expect(rec).toHaveProperty('brand');
        expect(rec).toHaveProperty('name');
        expect(rec).toHaveProperty('price');
      });
    });

    it('should handle edge cases gracefully', () => {
      // Empty preferences
      const emptyPrefs: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 0, max: 1000 },
        productType: 'any',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 30 },
      };

      const recs = getPreferenceBasedRecommendations(emptyPrefs, 10);
      expect(Array.isArray(recs)).toBe(true);

      // Invalid product ID
      const invalidRecs = getSimilarRecommendations(999999, 10);
      expect(invalidRecs).toEqual([]);

      // Zero limit
      const zeroRecs = getPopularRecommendations(0);
      expect(zeroRecs).toEqual([]);
    });
  });

  describe('Performance', () => {
    it('should generate recommendations quickly', () => {
      const preferences: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 0, max: 100 },
        productType: 'any',
        favoriteBrands: ['中华', '黄鹤楼', '玉溪'],
        tarPreference: { min: 0, max: 15 },
        completedAt: new Date().toISOString(),
      };

      const startTime = Date.now();

      // Generate 100 recommendation sets
      for (let i = 0; i < 100; i++) {
        getRecommendations({
          strategy: 'mixed',
          limit: 10,
          preferences,
          productId: i % 100,
        });
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      const avgTime = duration / 100;

      // Each recommendation should take less than 50ms on average
      expect(avgTime).toBeLessThan(50);
    });

    it('should handle concurrent requests', async () => {
      const preferences: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 20, max: 80 },
        productType: 'cigarette',
        favoriteBrands: [],
        tarPreference: { min: 8, max: 12 },
        completedAt: new Date().toISOString(),
      };

      const promises = Array.from({ length: 10 }, (_, i) =>
        Promise.resolve(getRecommendations({
          strategy: 'mixed',
          limit: 10,
          preferences,
          productId: i,
        }))
      );

      const results = await Promise.all(promises);

      // All should return valid arrays
      results.forEach(recs => {
        expect(Array.isArray(recs)).toBe(true);
        expect(recs.length).toBeGreaterThan(0);
      });
    });
  });

  describe('User Journey', () => {
    it('should support complete user recommendation journey', () => {
      // 1. New user - no preferences
      const newRecs = getRecommendations({
        strategy: 'mixed',
        limit: 10,
      });
      expect(newRecs.length).toBeGreaterThan(0);

      // 2. User sets preferences
      const preferences: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 30, max: 60 },
        productType: 'cigarette',
        favoriteBrands: ['玉溪'],
        tarPreference: { min: 6, max: 10 },
        completedAt: new Date().toISOString(),
      };

      // 3. User browses products
      addBrowsingHistory(235); // 玉溪
      addBrowsingHistory(236); // 玉溪
      addBrowsingHistory(184); // 黄鹤楼

      // 4. User favorites a product
      addFavorite(235);

      // 5. Get personalized recommendations
      const personalizedRecs = getRecommendations({
        strategy: 'mixed',
        limit: 15,
        preferences,
        productId: 235,
      });

      expect(personalizedRecs.length).toBeGreaterThan(0);
      expect(personalizedRecs.length).toBeLessThanOrEqual(15);

      // 6. Recommendations should reflect preferences
      personalizedRecs.forEach(rec => {
        expect(rec.price).toBeGreaterThanOrEqual(30);
        expect(rec.price).toBeLessThanOrEqual(60);
      });
    });
  });
});
