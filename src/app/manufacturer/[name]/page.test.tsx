import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ManufacturerDetailPage from "@/app/manufacturer/[name]/page";

vi.mock("@/features/pages/ManufacturerDetail", () => ({
  default: ({ name }: { name: string }) => <div>manufacturer detail {name}</div>,
}));

describe("Manufacturer detail route", () => {
  it("passes the dynamic name param into the manufacturer detail page", async () => {
    const page = await ManufacturerDetailPage({
      params: Promise.resolve({ name: "Anhui%20Tobacco" }),
    });

    render(page);

    expect(screen.getByText("manufacturer detail Anhui%20Tobacco")).toBeInTheDocument();
  });
});
