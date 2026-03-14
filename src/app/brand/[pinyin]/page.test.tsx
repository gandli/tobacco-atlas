import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BrandDetailPage from "@/app/brand/[pinyin]/page";

vi.mock("@/features/pages/BrandDetail", () => ({
  default: ({ identifier }: { identifier: string }) => <div>brand detail {identifier}</div>,
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
