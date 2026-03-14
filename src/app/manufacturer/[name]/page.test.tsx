import { describe, expect, it, vi } from "vitest";

const redirectMock = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: (href: string) => redirectMock(href),
}));

import ManufacturerCompatibilityPage from "@/app/manufacturer/[name]/page";

describe("Manufacturer detail compatibility route", () => {
  it("redirects the legacy manufacturer route to the maker route", async () => {
    await ManufacturerCompatibilityPage({
      params: Promise.resolve({
        name: "Anhui%20Tobacco",
      }),
    });

    expect(redirectMock).toHaveBeenCalledWith("/maker/Anhui%20Tobacco");
  });
});
