import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MakerDetailPage from "@/app/maker/[name]/page";

vi.mock("@/data/maker-catalog", () => ({
  getMakerByIdentifier: (id: string) => ({ identifier: id, englishName: "maker detail " + id, name: "maker detail " + id })
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
