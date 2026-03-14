import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SkuDetailPage from "@/app/sku/[id]/page";

vi.mock("@/data/product-catalog", () => ({
  getSkuById: (id: string) => ({ id, name: "sku detail " + id })
}));

describe("Sku detail route", () => {
  it("passes the dynamic id param into the sku detail page", () => {
    const page = SkuDetailPage({
      params: { id: "3424" } as any,
    });

    render(page);

    expect(screen.getByText("sku detail 3424")).toBeInTheDocument();
  });
});
