import { describe, it, expect } from 'vitest';
import {
  getRecommendations,
  getPreferenceBasedRecommendations,
  getPopularRecommendations,
  getSimilarRecommendations,
  getNewRecommendations,
  getBehaviorBasedRecommendations,
} from './recommendation-algo';
import type { UserPreferences } from './user-preferences';

describe('Recommendation Algorithm', () => {
  describe('getPreferenceBasedRecommendations', () => {
    it('should return recommendations based on taste preference', () => {
      const preferences: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 0, max: 50 },
        productType: 'any',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 8 },
      };

      const recommendations = getPreferenceBasedRecommendations(preferences, 5);
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should return recommendations based on price range', () => {
      const preferences: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 20, max: 100 },
        productType: 'any',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 30 },
      };

      const recommendations = getPreferenceBasedRecommendations(preferences, 10);
      expect(Array.isArray(recommendations)).toBe(true);
      
      // All recommendations should be within price range
      recommendations.forEach(rec => {
        expect(rec.price).toBeGreaterThanOrEqual(20);
        expect(rec.price).toBeLessThanOrEqual(100);
      });
    });

    it('should return recommendations based on favorite brands', () => {
      const preferences: UserPreferences = {
        taste: 'medium',
        priceRange: { min: 0, max: 1000 },
        productType: 'any',
        favoriteBrands: ['中华', '黄鹤楼'],
        tarPreference: { min: 0, max: 30 },
      };

      const recommendations = getPreferenceBasedRecommendations(preferences, 5);
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });

  describe('getPopularRecommendations', () => {
    it('should return popular products', () => {
      const recommendations = getPopularRecommendations(10);
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });

    it('should return empty array when limit is 0', () => {
      const recommendations = getPopularRecommendations(0);
      expect(recommendations).toEqual([]);
    });
  });

  describe('getSimilarRecommendations', () => {
    it('should return similar products for a given product', () => {
      // Use a known product ID
      const recommendations = getSimilarRecommendations(1, 5);
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should not include the original product', () => {
      const productId = 1;
      const recommendations = getSimilarRecommendations(productId, 10);
      
      recommendations.forEach(rec => {
        expect(rec.id).not.toBe(productId);
      });
    });

    it('should return empty array for non-existent product', () => {
      const recommendations = getSimilarRecommendations(999999, 5);
      expect(recommendations).toEqual([]);
    });
  });

  describe('getNewRecommendations', () => {
    it('should return new products', () => {
      const recommendations = getNewRecommendations(10);
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getBehaviorBasedRecommendations', () => {
    it('should return recommendations based on browsing history', () => {
      const recommendations = getBehaviorBasedRecommendations(5);
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getRecommendations (mixed strategy)', () => {
    it('should return mixed recommendations', () => {
      const recommendations = getRecommendations({
        strategy: 'mixed',
        limit: 10,
      });
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });

    it('should return preference-based recommendations', () => {
      const preferences: UserPreferences = {
        taste: 'mild',
        priceRange: { min: 0, max: 50 },
        productType: 'any',
        favoriteBrands: [],
        tarPreference: { min: 0, max: 8 },
      };

      const recommendations = getRecommendations({
        strategy: 'preference',
        limit: 5,
        preferences,
      });
      expect(Array.isArray(recommendations)).toBe(true);
    });

    it('should return popular recommendations', () => {
      const recommendations = getRecommendations({
        strategy: 'popular',
        limit: 5,
      });
      expect(Array.isArray(recommendations)).toBe(true);
    });

    it('should return similar recommendations', () => {
      const recommendations = getRecommendations({
        strategy: 'similar',
        limit: 5,
        productId: 1,
      });
      expect(Array.isArray(recommendations)).toBe(true);
    });

    it('should return new recommendations', () => {
      const recommendations = getRecommendations({
        strategy: 'new',
        limit: 5,
      });
      expect(Array.isArray(recommendations)).toBe(true);
    });

    it('should return behavior-based recommendations', () => {
      const recommendations = getRecommendations({
        strategy: 'behavior',
        limit: 5,
      });
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });
});
