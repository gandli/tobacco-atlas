import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BrandDetailPage from "@/app/brand/[pinyin]/page";

vi.mock("@/data/brand-catalog", () => ({
  getBrandByPinyin: (id: string) => ({ pinyin: id, name: "brand detail " + id, region: "CN" }),
  getBrandById: (id: number) => ({ pinyin: String(id), name: "brand detail " + id, region: "CN" }),
}));
vi.mock("@/data/region-labels", () => ({
  regionLabels: { "CN": { en: "China", zh: "中国" } }
}));

describe("Brand detail route", () => {
  it("passes the dynamic pinyin param into the brand detail page", () => {
    const page = BrandDetailPage({
      params: { pinyin: "huangshan" } as any,
    });

    render(page);

    expect(screen.getByText("brand detail huangshan")).toBeInTheDocument();
  });

  it("passes numeric brand ids through the same dynamic route", () => {
    const page = BrandDetailPage({
      params: { pinyin: "23" } as any,
    });

    render(page);

    expect(screen.getByText("brand detail 23")).toBeInTheDocument();
  });
});
