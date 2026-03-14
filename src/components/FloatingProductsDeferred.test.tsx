import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/FloatingProducts", () => ({
  default: () => <div data-testid="floating-products" />,
}));

import FloatingProductsDeferred from "@/components/FloatingProductsDeferred";

describe("FloatingProductsDeferred", () => {
  it("renders floating products after the first paint tick", async () => {
    render(<FloatingProductsDeferred />);

    expect(screen.queryByTestId("floating-products")).not.toBeInTheDocument();

    expect(await screen.findByTestId("floating-products")).toBeInTheDocument();
  });
});
