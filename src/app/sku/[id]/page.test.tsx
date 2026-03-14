import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SkuDetailPage from "@/app/sku/[id]/page";

vi.mock("@/features/pages/SkuDetail", () => ({
  default: ({ id }: { id: string }) => <div>sku detail {id}</div>,
}));

describe("Sku detail route", () => {
  it("passes the dynamic id param into the sku detail page", async () => {
    const page = await SkuDetailPage({
      params: Promise.resolve({ id: "3424" }),
    });

    render(page);

    expect(screen.getByText("sku detail 3424")).toBeInTheDocument();
  });
});
