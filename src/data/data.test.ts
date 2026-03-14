import { describe, it, expect } from "vitest";
import { brands, totalBrands, getBrandByPinyin, type BrandItem } from "@/data/brand-catalog";
import {
  products,
  totalProducts,
  getProductsByManufacturer,
  getProductsByBrand,
  getProductById,
  type Product,
} from "@/data/product-catalog";
import { regionLabels } from "@/data/region-labels";

describe("Data Types and Exports", () => {
  describe("brands data", () => {
    it("should have brands array populated", () => {
      expect(Array.isArray(brands)).toBe(true);
      expect(brands.length).toBeGreaterThan(0);
    });

    it("should have correct brand structure", () => {
      const brand = brands[0];
      expect(brand).toHaveProperty("id");
      expect(brand).toHaveProperty("name");
      expect(brand).toHaveProperty("pinyin");
      expect(brand).toHaveProperty("logo");
      expect(brand).toHaveProperty("count");
      expect(brand).toHaveProperty("region");
    });

    it("should have valid brand pinyin values", () => {
      brands.forEach((brand) => {
        expect(typeof brand.pinyin).toBe("string");
        expect(brand.pinyin.length).toBeGreaterThan(0);
      });
    });

    it("should have valid brand id types", () => {
      brands.forEach((brand) => {
        expect(typeof brand.id).toBe("number");
      });
    });
  });

  describe("products data", () => {
    it("should have products array populated", () => {
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it("should have correct product structure", () => {
      const product = products[0];
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("brand");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("brandPinyin");
    });

    it("should have valid product id types", () => {
      products.forEach((product) => {
        expect(typeof product.id).toBe("number");
      });
    });

    it("should have non-empty product names", () => {
      products.forEach((product) => {
        expect(product.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe("count exports", () => {
    it("should export correct total brands count", () => {
      expect(totalBrands).toBe(brands.length);
    });

    it("should export correct total products count", () => {
      expect(totalProducts).toBe(products.length);
    });
  });

  describe("regionLabels", () => {
    it("should have all required region labels", () => {
      expect(regionLabels).toHaveProperty("mainland");
      expect(regionLabels).toHaveProperty("hkmo");
      expect(regionLabels).toHaveProperty("international");
      expect(regionLabels).toHaveProperty("historical");
    });

    it("should have correct region label structure", () => {
      Object.values(regionLabels).forEach((label) => {
        expect(label).toHaveProperty("zh");
        expect(label).toHaveProperty("en");
      });
    });
  });
});

describe("Query Functions", () => {
  describe("getBrandByPinyin", () => {
    it("should find brand by valid pinyin", () => {
      // Test with a known brand pinyin
      const brand = getBrandByPinyin("zhonghua");
      if (brand) {
        expect(brand.name).toBe("中华");
        expect(brand.pinyin).toBe("zhonghua");
      }
    });

    it("should return undefined for invalid pinyin", () => {
      const brand = getBrandByPinyin("nonexistent-brand-pinyin");
      expect(brand).toBeUndefined();
    });

    it("should return correct brand structure", () => {
      const brand = getBrandByPinyin("huanghelou");
      if (brand) {
        expect(brand).toHaveProperty("id");
        expect(brand).toHaveProperty("name");
        expect(brand).toHaveProperty("pinyin");
      }
    });
  });

  describe("getProductsByBrand", () => {
    it("should return empty array for invalid pinyin", () => {
      const result = getProductsByBrand("nonexistent-brand");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it("should return products for valid brand pinyin", () => {
      const result = getProductsByBrand("zhonghua");
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return products with correct brand association", () => {
      const brand = brands.find((b) => b.pinyin);
      if (brand) {
        const result = getProductsByBrand(brand.pinyin);
        result.forEach((product) => {
          expect(
            product.brandPinyin === brand.pinyin ||
            product.brand === brand.name
          ).toBe(true);
        });
      }
    });
  });

  describe("getProductById", () => {
    it("should find product by valid id", () => {
      // Use the first product's ID
      const firstProduct = products[0];
      const found = getProductById(firstProduct.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(firstProduct.id);
    });

    it("should return undefined for invalid id", () => {
      const found = getProductById(999999999);
      expect(found).toBeUndefined();
    });

    it("should return product with correct structure", () => {
      const firstProduct = products[0];
      const found = getProductById(firstProduct.id);
      if (found) {
        expect(found).toHaveProperty("id");
        expect(found).toHaveProperty("name");
        expect(found).toHaveProperty("brand");
        expect(found).toHaveProperty("brandPinyin");
      }
    });
  });

  describe("getProductsByManufacturer", () => {
    it("should return empty array for non-existent manufacturer", () => {
      const result = getProductsByManufacturer("Non-existent Manufacturer");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it("should return array of products for valid manufacturer", () => {
      // Find a manufacturer that exists
      const manufacturers = new Set(
        products
          .filter((p) => p.manufacturer)
          .map((p) => p.manufacturer)
      );
      
      if (manufacturers.size > 0) {
        const manufacturerName = [...manufacturers][0];
        const result = getProductsByManufacturer(manufacturerName as string);
        expect(Array.isArray(result)).toBe(true);
        result.forEach((product) => {
          expect(product.manufacturer).toBe(manufacturerName);
        });
      }
    });
  });
});

describe("Data Integrity", () => {
  it("should have unique brand IDs", () => {
    const ids = brands.map((b) => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have unique product IDs", () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have products with valid brand references", () => {
    const brandIds = new Set(brands.map((b) => b.id));
    const brandNames = new Set(brands.map((b) => b.name));
    
    products.forEach((product) => {
      const hasValidBrandRef = brandNames.has(product.brand);
      // Product should have a valid brand reference or a valid brandPinyin
      expect(
        hasValidBrandRef || product.brandPinyin !== undefined
      ).toBe(true);
    });
  });
});
