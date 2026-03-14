import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SkuDetailPage from "@/app/sku/[id]/page";

vi.mock("@/data/product-catalog", () => ({
  getProductById: (id: any) => {
    console.log("Mock getProductById called with id:", id);
    return { id, name: "sku detail " + id, brandPinyin: "test" };
  }
}));
vi.mock("@/data/brand-catalog", () => ({
  getBrandByPinyin: () => ({ name: "test", pinyin: "test" }),
  brands: []
}));

describe("Sku detail route", () => {
  it("passes the dynamic id param into the sku detail page", async () => {
    const page = await SkuDetailPage({ params: { id: "3424" } } as any);
    render(page);
    screen.debug();
    expect(screen.getAllByText("sku detail 3424")[0]).toBeInTheDocument();
  });
});
