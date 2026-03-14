import { describe, expect, it } from "vitest";

import { homeProducts, homeProductStats } from "@/data/home-catalog";

describe("home-catalog", () => {
  it("keeps homepage product summaries aligned with the advertised collection size", () => {
    expect(homeProducts.length).toBe(homeProductStats.totalProducts);
  });
});
