import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CompareStoreProvider, useCompareStore } from './compare-store';

function wrapper({ children }: { children: React.ReactNode }) {
  return <CompareStoreProvider>{children}</CompareStoreProvider>;
}

describe('CompareStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty products', () => {
    const { result } = renderHook(() => useCompareStore(), { wrapper });
    expect(result.current.products).toEqual([]);
    expect(result.current.isFull).toBe(false);
  });

  it('should add product to compare list', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      result.current.addProduct(testProduct);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe(1);
    expect(result.current.isFull).toBe(false);
  });

  it('should not add duplicate product', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      result.current.addProduct(testProduct);
      result.current.addProduct(testProduct);
    });

    expect(result.current.products).toHaveLength(1);
  });

  it('should limit to 4 products', () => {
    const products = [
      { id: 1, brand: '中华', name: '中华（硬）', nameEn: 'Zhonghua', image: '', brandPinyin: 'zhonghua', region: 'mainland', price: 45, packPrice: 45 },
      { id: 2, brand: '黄鹤楼', name: '黄鹤楼（软）', nameEn: 'Huanghelou', image: '', brandPinyin: 'huanghelou', region: 'mainland', price: 65, packPrice: 65 },
      { id: 3, brand: '玉溪', name: '玉溪（软）', nameEn: 'Yuxi', image: '', brandPinyin: 'yuxi', region: 'mainland', price: 23, packPrice: 23 },
      { id: 4, brand: '云烟', name: '云烟（软）', nameEn: 'Yunyan', image: '', brandPinyin: 'yunyan', region: 'mainland', price: 25, packPrice: 25 },
      { id: 5, brand: '利群', name: '利群（软）', nameEn: 'Liqun', image: '', brandPinyin: 'liqun', region: 'mainland', price: 35, packPrice: 35 },
    ];

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      products.forEach(product => result.current.addProduct(product as any));
    });

    expect(result.current.products).toHaveLength(4);
    expect(result.current.isFull).toBe(true);
  });

  it('should remove product from compare list', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      result.current.addProduct(testProduct);
      result.current.removeProduct(1);
    });

    expect(result.current.products).toHaveLength(0);
  });

  it('should clear all products', () => {
    const products = [
      { id: 1, brand: '中华', name: '中华（硬）', nameEn: 'Zhonghua', image: '', brandPinyin: 'zhonghua', region: 'mainland', price: 45, packPrice: 45 },
      { id: 2, brand: '黄鹤楼', name: '黄鹤楼（软）', nameEn: 'Huanghelou', image: '', brandPinyin: 'huanghelou', region: 'mainland', price: 65, packPrice: 65 },
    ];

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      products.forEach(product => result.current.addProduct(product as any));
      result.current.clearProducts();
    });

    expect(result.current.products).toHaveLength(0);
  });

  it('should check if product is in compare list', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      result.current.addProduct(testProduct);
    });

    expect(result.current.isInCompare(1)).toBe(true);
    expect(result.current.isInCompare(2)).toBe(false);
  });

  it('should persist to localStorage', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    act(() => {
      result.current.addProduct(testProduct);
    });

    const stored = localStorage.getItem('tobacco-atlas-compare-products');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(1);
  });

  it('should load from localStorage on mount', () => {
    const testProduct = {
      id: 1,
      brand: '中华',
      name: '中华（硬）',
      nameEn: 'Zhonghua Hard',
      image: '/api/img/brands/140.jpg',
      brandPinyin: 'zhonghua',
      region: 'mainland',
      price: 45,
      packPrice: 45,
    };

    localStorage.setItem('tobacco-atlas-compare-products', JSON.stringify([testProduct]));

    const { result } = renderHook(() => useCompareStore(), { wrapper });
    
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe(1);
  });
});
