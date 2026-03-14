import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ManufacturerDetail from "./ManufacturerDetail";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, number>) => {
      const translations: Record<string, string> = {
        "breadcrumbs.home": "Home",
        "breadcrumbs.brands": "Brands",
        "manufacturer.badge": "Manufacturer",
        "manufacturer.summary": `${options?.brands ?? 0} brands · ${options?.products ?? 0} products`,
        "manufacturer.brandsSection": "Brands",
        "manufacturer.productsSection": "Products",
        "manufacturer.items": `${options?.count ?? 0} items`,
        "details:breadcrumbs.home": "Home",
        "details:breadcrumbs.brands": "Brands",
        "details:manufacturer.badge": "Manufacturer",
        "details:manufacturer.summary": `${options?.brands ?? 0} brands · ${options?.products ?? 0} products`,
        "details:manufacturer.brandsSection": "Brands",
        "details:manufacturer.productsSection": "Products",
        "details:manufacturer.items": `${options?.count ?? 0} items`,
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/data/product-catalog", () => ({
  getProductsByManufacturer: (name: string) =>
    name === "Anhui Tobacco"
      ? [
          {
            id: 3424,
            brand: "黄山",
            brandPinyin: "huangshan",
            name: "小红方印",
            image: "https://example.com/a.png",
            packPrice: 32,
          },
          {
            id: 3425,
            brand: "黄山",
            brandPinyin: "huangshan",
            name: "大红方印",
            image: "https://example.com/b.png",
            packPrice: 36,
          },
          {
            id: 3550,
            brand: "迎客松",
            brandPinyin: "yingkesong",
            name: "迎客松",
            image: "https://example.com/c.png",
            packPrice: 24,
          },
        ]
      : [],
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));

describe("ManufacturerDetail", () => {
  it("renders translated labels from the current path", { timeout: 15000 }, () => {
    window.history.replaceState({}, "", "/maker/Anhui%20Tobacco");
    render(<ManufacturerDetail />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByText("Brands").length).toBeGreaterThan(0);
    expect(screen.getByText("2 brands · 3 products")).toBeInTheDocument();
    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("still supports the legacy manufacturer path", () => {
    window.history.replaceState({}, "", "/manufacturer/Anhui%20Tobacco");
    render(<ManufacturerDetail />);

    expect(screen.getAllByText("Anhui Tobacco").length).toBeGreaterThan(0);
  });

  it("prefers the explicit name prop when provided", () => {
    render(<ManufacturerDetail name="Anhui Tobacco" />);

    expect(screen.getAllByText("Anhui Tobacco").length).toBeGreaterThan(0);
    expect(screen.getAllByText("黄山").length).toBeGreaterThan(0);
    expect(screen.getAllByText("迎客松").length).toBeGreaterThan(0);
  });
});
