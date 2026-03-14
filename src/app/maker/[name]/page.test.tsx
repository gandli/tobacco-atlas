import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MakerDetailPage from "@/app/maker/[name]/page";

vi.mock("@/features/pages/ManufacturerDetail", () => ({
  default: ({ name }: { name: string }) => <div>maker detail {name}</div>,
}));

describe("Maker detail route", () => {
  it("passes the dynamic name param into the maker detail page", async () => {
    const page = await MakerDetailPage({
      params: Promise.resolve({ name: "Anhui%20Tobacco" }),
    });

    render(page);

    expect(screen.getByText("maker detail Anhui%20Tobacco")).toBeInTheDocument();
  });
});
