import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MakerDetailPage from "@/app/maker/[name]/page";

vi.mock("@/features/pages/ManufacturerDetail", () => ({
  default: ({ name }: { name: string }) => <div>maker detail {name}</div>,
}));

describe("Maker detail route", () => {
  it("passes the dynamic name param into the maker detail page", () => {
    const page = MakerDetailPage({
      params: { name: "Anhui%20Tobacco" } as any,
    });

    render(page);

    expect(screen.getByText("maker detail Anhui%20Tobacco")).toBeInTheDocument();
  });
});
