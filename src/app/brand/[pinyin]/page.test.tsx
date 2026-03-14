import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BrandDetailPage from "@/app/brand/[pinyin]/page";

vi.mock("@/legacy-pages/BrandDetail", () => ({
  default: ({ pinyin }: { pinyin: string }) => <div>brand detail {pinyin}</div>,
}));

describe("Brand detail route", () => {
  it("passes the dynamic pinyin param into the brand detail page", async () => {
    const page = await BrandDetailPage({
      params: Promise.resolve({ pinyin: "huangshan" }),
    });

    render(page);

    expect(screen.getByText("brand detail huangshan")).toBeInTheDocument();
  });
});
