import { describe, expect, it } from "vitest";

import {
  getAvailableFormatKeys,
  getProductBrowseFormatKey,
  getVisibleProductCollection,
  type ProductBrowseItem,
} from "@/lib/product-browser";

const products: ProductBrowseItem[] = [
  {
    id: 30,
    brand: "黄鹤楼",
    name: "硬珍品",
    nameEn: "Huanghelou Zhenpin Hard",
    region: "mainland",
    packPrice: 30,
  },
  {
    id: 10,
    brand: "云烟",
    name: "细支云龙",
    nameEn: "Yunyan Slim Yunlong",
    region: "hkmo",
    packPrice: 20,
  },
  {
    id: 20,
    brand: "长城雪茄",
    name: "盛世5号",
    nameEn: "Great Wall No.5",
    region: "international",
    packPrice: 80,
    format: "Cigar",
  },
];

describe("product-browser helpers", () => {
  it("matches search terms against chinese name, english name, and brand", () => {
    expect(
      getVisibleProductCollection(products, {
        search: "黄鹤楼",
        region: "all",
        format: "all",
        sort: "newest",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([30]);

    expect(
      getVisibleProductCollection(products, {
        search: "yunlong",
        region: "all",
        format: "all",
        sort: "newest",
        language: "en-US",
      }).map((item) => item.id),
    ).toEqual([10]);

    expect(
      getVisibleProductCollection(products, {
        search: "great wall",
        region: "all",
        format: "all",
        sort: "newest",
        language: "en-US",
      }).map((item) => item.id),
    ).toEqual([20]);
  });

  it("filters by normalized region groups", () => {
    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "mainland",
        format: "all",
        sort: "newest",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([30]);

    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "hkmo",
        format: "all",
        sort: "newest",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([10]);

    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "international",
        format: "all",
        sort: "newest",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([20]);
  });

  it("derives format keys from explicit specs or name heuristics", () => {
    expect(getProductBrowseFormatKey(products[0])).toBe("hard");
    expect(getProductBrowseFormatKey(products[1])).toBe("slim");
    expect(getProductBrowseFormatKey(products[2])).toBe("cigar");
    expect(getAvailableFormatKeys(products)).toEqual(["cigar", "hard", "slim"]);
  });

  it("sorts by newest, price, and localized name", () => {
    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "all",
        format: "all",
        sort: "newest",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([30, 20, 10]);

    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "all",
        format: "all",
        sort: "price-asc",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([10, 30, 20]);

    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "all",
        format: "all",
        sort: "price-desc",
        language: "zh-CN",
      }).map((item) => item.id),
    ).toEqual([20, 30, 10]);

    expect(
      getVisibleProductCollection(products, {
        search: "",
        region: "all",
        format: "all",
        sort: "name",
        language: "en-US",
      }).map((item) => item.id),
    ).toEqual([20, 30, 10]);
  });
});
