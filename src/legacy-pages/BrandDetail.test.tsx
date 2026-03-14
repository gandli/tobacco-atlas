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

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/data/brand-catalog", () => ({
  getBrandByPinyin: (value: string) =>
    value === "huangshan"
      ? {
          id: 23,
          name: "黄山",
          pinyin: "huangshan",
          logo: "https://example.com/logo-hs.png",
          count: 3,
          region: "mainland",
          descriptionEn: "Anhui classic",
          descriptionCn: "安徽经典品牌",
          company: "Anhui Tobacco",
        }
      : {
          id: 1,
          name: "中华",
          pinyin: "zhonghua",
          logo: "https://example.com/logo.png",
          count: 2,
          region: "mainland",
          descriptionEn: "Premium national brand",
          descriptionCn: "经典国烟品牌",
          company: "Shanghai Tobacco",
        },
  getBrandById: (id: number) =>
    id === 23
      ? {
          id: 23,
          name: "黄山",
          pinyin: "huangshan",
          logo: "https://example.com/logo-hs.png",
          count: 3,
          region: "mainland",
          descriptionEn: "Anhui classic",
          descriptionCn: "安徽经典品牌",
          company: "Anhui Tobacco",
        }
      : undefined,
}));

vi.mock("@/data/product-catalog", () => ({
  getProductsByBrand: (value: string) =>
    value === "huangshan"
      ? [
          { id: 3, brand: "黄山", name: "小红方印", image: "", brandPinyin: "huangshan" },
          { id: 4, brand: "黄山", name: "大红方印", image: "", brandPinyin: "huangshan" },
          { id: 5, brand: "黄山", name: "金皖烟", image: "", brandPinyin: "huangshan" },
        ]
      : [
          { id: 1, brand: "中华", name: "软中华", image: "", brandPinyin: "zhonghua" },
          { id: 2, brand: "中华", name: "硬中华", image: "", brandPinyin: "zhonghua" },
        ],
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

vi.mock("@/components/ProductCard", () => ({
  default: ({ product }: { product: { name: string } }) => <div>{product.name}</div>,
}));

describe("BrandDetail", () => {
  it("renders translated english section labels from the current path", { timeout: 15000 }, () => {
    window.history.replaceState({}, "", "/brand/zhonghua");
    render(<BrandDetail />);

    expect(screen.getByText("Brands")).toBeInTheDocument();
    expect(screen.getByText("Collection")).toBeInTheDocument();
    expect(screen.getByText("Manufacturer")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("renders translated english section labels", () => {
    render(<BrandDetail pinyin="zhonghua" />);

    expect(screen.getByText("Brands")).toBeInTheDocument();
    expect(screen.getByText("Collection")).toBeInTheDocument();
    expect(screen.getByText("Manufacturer")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("prefers the explicit pinyin prop when provided", () => {
    render(<BrandDetail pinyin="huangshan" />);

    expect(screen.getByText("3 items")).toBeInTheDocument();
    expect(screen.getAllByText("黄山").length).toBeGreaterThan(0);
  });

  it("supports numeric brand ids in the shared detail component", () => {
    render(<BrandDetail identifier="23" />);

    expect(screen.getByText("3 items")).toBeInTheDocument();
    expect(screen.getByText("Anhui Tobacco")).toBeInTheDocument();
  });
});
