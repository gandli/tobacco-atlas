import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BrandDetail from "./BrandDetail";

const mockI18n = {
  language: "en-US",
  resolvedLanguage: "en-US",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, number>) => {
      const translations: Record<string, string> = {
        "breadcrumbs.brands": "Brands",
        "brand.products": "Products",
        "brand.manufacturer": "Manufacturer",
        "brand.collection": "Collection",
        "brand.items": `${options?.count ?? 0} items`,
        "details:breadcrumbs.brands": "Brands",
        "details:brand.products": "Products",
        "details:brand.manufacturer": "Manufacturer",
        "details:brand.collection": "Collection",
        "details:brand.items": `${options?.count ?? 0} items`,
      };

      return translations[key] || key;
    },
    i18n: mockI18n,
  }),
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({ pinyin: "zhonghua" }),
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/data", () => ({
  getBrandByPinyin: () => ({
    id: 1,
    name: "中华",
    pinyin: "zhonghua",
    logo: "https://example.com/logo.png",
    count: 2,
    region: "mainland",
    descriptionEn: "Premium national brand",
    descriptionCn: "经典国烟品牌",
    company: "Shanghai Tobacco",
  }),
  getProductsByBrand: () => [
    { id: 1, brand: "中华", name: "软中华", image: "", brandPinyin: "zhonghua" },
    { id: 2, brand: "中华", name: "硬中华", image: "", brandPinyin: "zhonghua" },
  ],
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

vi.mock("@/components/ProductCard", () => ({
  default: ({ product }: { product: { name: string } }) => <div>{product.name}</div>,
}));

describe("BrandDetail", () => {
  it("renders translated english section labels", () => {
    render(<BrandDetail />);

    expect(screen.getByText("Brands")).toBeInTheDocument();
    expect(screen.getByText("Collection")).toBeInTheDocument();
    expect(screen.getByText("Manufacturer")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });
});
