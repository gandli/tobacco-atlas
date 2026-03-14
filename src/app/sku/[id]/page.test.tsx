import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SkuDetailPage from "@/app/sku/[id]/page";

vi.mock("@/data/product-catalog", () => ({
  getProductById: (id: any) => {
    return {
      id,
      brand: "Test Brand",
      name: "sku detail " + id,
      nameEn: "sku detail en " + id,
      brandPinyin: "test",
    };
  },
}));
vi.mock("@/data/brand-catalog", () => ({
  getBrandByPinyin: () => ({ name: "test", pinyin: "test" }),
  brands: []
}));

describe("Sku detail route", () => {
  it("passes the dynamic id param into the sku detail page", async () => {
    const page = await SkuDetailPage({ params: Promise.resolve({ id: "3424" }) } as any);
    render(page);
    await waitFor(() => {
      expect(screen.getByText(/Test Brand/)).toBeInTheDocument();
    });
  });
});
