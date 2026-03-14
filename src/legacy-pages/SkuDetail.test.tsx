import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SkuDetail from "./SkuDetail";

const mockI18n = {
  language: "en-US",
  resolvedLanguage: "en-US",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, number>) => {
      const translations: Record<string, string> = {
        "breadcrumbs.collection": "Collection",
        "sku.perPack": "per pack",
        "sku.favorite": "Favorite",
        "sku.markTried": "Mark tried",
        "sku.wishlist": "Wishlist",
        "sku.specifications": "Specifications",
        "sku.pricing": "Pricing",
        "sku.ratings": "Ratings",
        "sku.votes": `${options?.count ?? 0} votes`,
        "details:breadcrumbs.collection": "Collection",
        "details:sku.perPack": "per pack",
        "details:sku.favorite": "Favorite",
        "details:sku.markTried": "Mark tried",
        "details:sku.wishlist": "Wishlist",
        "details:sku.specifications": "Specifications",
        "details:sku.pricing": "Pricing",
        "details:sku.ratings": "Ratings",
        "details:sku.votes": `${options?.count ?? 0} votes`,
      };

      return translations[key] || key;
    },
    i18n: mockI18n,
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/data/brand-catalog", () => ({
  getBrandByPinyin: () => ({
    id: 1,
    name: "黄山",
    pinyin: "huangshan",
    company: "Anhui Tobacco",
  }),
}));

vi.mock("@/data/product-catalog", () => ({
  getProductById: () => ({
    id: 3424,
    brand: "黄山",
    brandPinyin: "huangshan",
    name: "小红方印",
    nameEn: "Little Red Seal",
    image: "https://example.com/product.png",
    manufacturer: "Anhui Tobacco",
    region: "mainland",
    tobaccoType: "Flue-cured",
    packPrice: 32,
    cartonPrice: 320,
    tar: "10 mg",
    nicotine: "1.0 mg",
    taste: 8.3,
    packRating: 8.1,
    overallRating: 8.5,
    votes: 14,
    images: [],
  }),
}));

vi.mock("@/data/region-labels", () => ({
  regionLabels: {
    mainland: { zh: "大陆", en: "Mainland" },
  },
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));

vi.mock("@/components/MobileNav", () => ({
  default: () => <nav data-testid="mobile-nav" />,
}));

describe("SkuDetail", () => {
  it("renders translated labels from the current path", { timeout: 15000 }, () => {
    window.history.replaceState({}, "", "/sku/3424");
    render(<SkuDetail />);

    expect(screen.getByText("Collection")).toBeInTheDocument();
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Ratings")).toBeInTheDocument();
  });

  it("prefers the explicit id prop when provided", () => {
    render(<SkuDetail id="3424" />);

    expect(screen.getAllByText("黄山").length).toBeGreaterThan(0);
    expect(screen.getByText("Favorite")).toBeInTheDocument();
    expect(screen.getByText("14 votes")).toBeInTheDocument();
  });
});
