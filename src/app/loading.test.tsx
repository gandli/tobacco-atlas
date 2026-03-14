import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomeLoading from "@/app/loading";
import BrandsLoading from "@/app/brands/loading";
import ManufacturersLoading from "@/app/manufacturers/loading";

describe("App loading states", () => {
  it("renders the home loading skeleton", () => {
    render(<HomeLoading />);

    expect(screen.getByTestId("page-shell-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("hero-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("product-grid-skeleton")).toBeInTheDocument();
  });

  it("renders the brands loading skeleton", () => {
    render(<BrandsLoading />);

    expect(screen.getByTestId("page-shell-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("brand-grid-skeleton")).toBeInTheDocument();
  });

  it("renders the manufacturers loading skeleton", () => {
    render(<ManufacturersLoading />);

    expect(screen.getByTestId("page-shell-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("manufacturer-grid-skeleton")).toBeInTheDocument();
  });
});
