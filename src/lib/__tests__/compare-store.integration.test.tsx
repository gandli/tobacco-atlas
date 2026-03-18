/**
 * 产品对比功能集成测试
 * 测试完整的用户对比流程
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CompareStoreProvider, useCompareStore } from '../compare-store';
import type { CompareProduct } from '../compare-store';

function wrapper({ children }: { children: React.ReactNode }) {
  return <CompareStoreProvider>{children}</CompareStoreProvider>;
}

describe('CompareStore Integration', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  const mockProducts: CompareProduct[] = [
    {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    },
    {
      id: 2,
      brand: '黄鹤楼',
      name: '黄鹤楼（软）',
      nameEn: 'Huanghelou Soft',
      image: '/api/img/brands/184.jpg',
      brandPinyin: 'huanghelou',
      region: 'mainland',
      price: 65,
      packPrice: 65,
    },
    {
      id: 3,
      brand: '玉溪',
      name: '玉溪（软）',
      nameEn: 'Yuxi Soft',
      image: '/api/img/brands/235.png',
      brandPinyin: 'yuxi',
      region: 'mainland',
      price: 23,
      packPrice: 23,
    },
    {
      id: 4,
      brand: '云烟',
      name: '云烟（软）',
      nameEn: 'Yunyan Soft',
      image: '/api/img/brands/319.png',
      brandPinyin: 'yunyan',
      region: 'mainland',
      price: 25,
      packPrice: 25,
    },
    {
      id: 5,
      brand: '利群',
      name: '利群（软）',
      nameEn: 'Liqun Soft',
      image: '/api/img/brands/81.png',
      brandPinyin: 'liqun',
      region: 'mainland',
      price: 35,
      packPrice: 35,
    },
  ];

  describe('Complete User Flow', () => {
    it('should handle complete compare workflow', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // 1. Initial state
      expect(result.current.products).toHaveLength(0);
      expect(result.current.isFull).toBe(false);

      // 2. Add first product
      act(() => {
        result.current.addProduct(mockProducts[0]);
      });
      expect(result.current.products).toHaveLength(1);
      expect(result.current.isInCompare(1)).toBe(true);

      // 3. Add more products
      act(() => {
        result.current.addProduct(mockProducts[1]);
        result.current.addProduct(mockProducts[2]);
      });
      expect(result.current.products).toHaveLength(3);

      // 4. Try to add duplicate
      act(() => {
        result.current.addProduct(mockProducts[0]);
      });
      expect(result.current.products).toHaveLength(3); // Should not increase

      // 5. Fill to max capacity
      act(() => {
        result.current.addProduct(mockProducts[3]);
      });
      expect(result.current.products).toHaveLength(4);
      expect(result.current.isFull).toBe(true);

      // 6. Try to add when full
      act(() => {
        result.current.addProduct(mockProducts[4]);
      });
      expect(result.current.products).toHaveLength(4); // Should still be 4

      // 7. Remove one product
      act(() => {
        result.current.removeProduct(2);
      });
      expect(result.current.products).toHaveLength(3);
      expect(result.current.isFull).toBe(false);
      expect(result.current.isInCompare(2)).toBe(false);

      // 8. Add again after removal
      act(() => {
        result.current.addProduct(mockProducts[4]);
      });
      expect(result.current.products).toHaveLength(4);
      expect(result.current.isFull).toBe(true);

      // 9. Clear all
      act(() => {
        result.current.clearProducts();
      });
      expect(result.current.products).toHaveLength(0);
      expect(result.current.isFull).toBe(false);
    });

    it('should persist and restore across sessions', () => {
      // Session 1: Add products
      const { result: result1 } = renderHook(() => useCompareStore(), { wrapper });
      
      act(() => {
        result1.current.addProduct(mockProducts[0]);
        result1.current.addProduct(mockProducts[1]);
      });

      expect(result1.current.products).toHaveLength(2);

      // Session 2: Restore from localStorage
      const { result: result2 } = renderHook(() => useCompareStore(), { wrapper });
      
      expect(result2.current.products).toHaveLength(2);
      expect(result2.current.products[0].id).toBe(1);
      expect(result2.current.products[1].id).toBe(2);

      // Session 3: After clearing localStorage
      localStorage.clear();
      const { result: result3 } = renderHook(() => useCompareStore(), { wrapper });
      
      expect(result3.current.products).toHaveLength(0);
    });

    it('should handle rapid add/remove operations', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // Rapid add operations
      act(() => {
        mockProducts.forEach(product => {
          result.current.addProduct(product);
        });
      });

      // Should only have 4 (max capacity)
      expect(result.current.products).toHaveLength(4);

      // Rapid remove operations
      act(() => {
        [1, 2, 3, 4].forEach(id => {
          result.current.removeProduct(id);
        });
      });

      expect(result.current.products).toHaveLength(0);
    });

    it('should maintain data integrity', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // Add products
      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.addProduct(mockProducts[1]);
      });

      // Verify data integrity
      const products = result.current.products;
      expect(products[0]).toHaveProperty('id', 1);
      expect(products[0]).toHaveProperty('brand', '中华');
      expect(products[0]).toHaveProperty('name', '中华（硬）');
      expect(products[1]).toHaveProperty('id', 2);
      expect(products[1]).toHaveProperty('brand', '黄鹤楼');

      // Verify localStorage data integrity
      const stored = localStorage.getItem('tobacco-atlas-compare-products');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].id).toBe(1);
      expect(parsed[1].id).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid product data', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // Try to add product with missing fields
      const invalidProduct = {
        id: 999,
        brand: '',
        name: '',
      } as CompareProduct;

      act(() => {
        result.current.addProduct(invalidProduct);
      });

      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].id).toBe(999);
    });

    it('should handle null/undefined operations', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      // Remove non-existent product
      act(() => {
        result.current.removeProduct(999);
      });

      expect(result.current.products).toHaveLength(0);

      // Check non-existent product
      expect(result.current.isInCompare(999)).toBe(false);
    });

    it('should handle large product IDs', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      const largeIdProduct = {
        ...mockProducts[0],
        id: 999999,
      };

      act(() => {
        result.current.addProduct(largeIdProduct);
      });

      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].id).toBe(999999);
      expect(result.current.isInCompare(999999)).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should handle multiple operations efficiently', () => {
      const { result } = renderHook(() => useCompareStore(), { wrapper });

      const startTime = Date.now();

      // Perform 100 add/remove cycles
      act(() => {
        for (let i = 0; i < 100; i++) {
          const product = {
            ...mockProducts[i % mockProducts.length],
            id: i,
          };
          result.current.addProduct(product);
          if (result.current.products.length > 0) {
            result.current.removeProduct(0);
          }
        }
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within 100ms
      expect(duration).toBeLessThan(100);
    });
  });
});
