import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/product-catalog";

const mockI18n = {
  language: "zh-CN",
  resolvedLanguage: "zh-CN",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
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

const mockProduct: Product = {
  id: 123,
  brand: "中华",
  name: "软中华",
  nameEn: "Soft Zhonghua",
  image: "https://example.com/image.jpg",
  brandPinyin: "zhonghua",
  region: "mainland",
};

const longNameProduct: Product = {
  ...mockProduct,
  id: 456,
  name: "中华典藏特别纪念中支限量版",
  nameEn: "Zhonghua Collector's Reserve Limited Edition Slim Cigarette",
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockI18n.language = "zh-CN";
    mockI18n.resolvedLanguage = "zh-CN";
  });

  it("renders the product brand and name", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getAllByText("中华")[0]).toBeInTheDocument();
    expect(screen.getAllByText("软中华")[0]).toBeInTheDocument();
  });

  it("renders a sku detail link", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    expect(container.querySelector("a")).toHaveAttribute("href", "/sku/123");
  });

  it("renders a lazy-loaded image", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("alt", "中华（软中华）");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("prefers the english product name when the active language is english", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={mockProduct} />);

    expect(screen.getAllByText("Soft Zhonghua")).toHaveLength(2);
    expect(screen.getByText("Mainland")).toBeInTheDocument();
  });

  it("uses a more compact title treatment for long names while preserving the full label", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={longNameProduct} />);

    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("text-[11px]");
    expect(screen.getByTestId("product-card-footer-name")).toHaveAttribute(
      "title",
      "Zhonghua Collector's Reserve Limited Edition Slim Cigarette",
    );
    expect(screen.getByTestId("product-card-footer-name")).toHaveClass("truncate");
  });
});
