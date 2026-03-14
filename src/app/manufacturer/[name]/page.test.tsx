import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ManufacturerDetailPage from "@/app/manufacturer/[name]/page";

vi.mock("@/data/maker-catalog", () => ({
  getMakerByIdentifier: (id: string) => ({ identifier: id, englishName: "manufacturer detail " + id, name: "manufacturer detail " + id })
}));

describe("Manufacturer detail route", () => {
  it("passes the dynamic name param into the manufacturer detail page", () => {
    const page = ManufacturerDetailPage({
      params: { name: "Anhui%20Tobacco" } as any,
    });

    render(page);

    expect(screen.getAllByText("manufacturer detail Anhui%20Tobacco")[0]).toBeInTheDocument();
  });
});
