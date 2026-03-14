import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/product-catalog";

const mockI18n = {
  language: "zh-CN",
  resolvedLanguage: "zh-CN",
};

const mockShowSuccess = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: mockI18n,
  }),
}));

vi.mock("@/components/ToastProvider", () => ({
  useToast: () => ({
    showSuccess: mockShowSuccess,
    showError: vi.fn(),
    showToast: vi.fn(),
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

const extremeLongCopyProduct: Product = {
  ...mockProduct,
  id: 789,
  brand: "Shanghai Tobacco Group Limited Reserve Collection International Edition",
  name: "黄鹤楼漫天游九天典藏超长命名礼盒版",
  nameEn:
    "Huanghelou Mantianyou Jiutian Collector Edition Ultra Long Presentation Pack",
};

const combinedLongCopyProduct: Product = {
  ...mockProduct,
  id: 790,
  brand: "黄鹤楼",
  name: "漫天游九天",
  nameEn: "Huanghelou Mantianyou Jiutian",
};

const mediumLengthEnglishProduct: Product = {
  ...mockProduct,
  id: 791,
  brand: "黄鹤楼",
  name: "珍品",
  nameEn: "Huanghelou Zhenpin",
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
    expect(screen.getByText("大陆 · Mainland")).toBeInTheDocument();
  });

  it("shrinks title typography earlier for medium-length english names", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={mediumLengthEnglishProduct} />);

    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass(
      "text-[11px]",
      "md:text-[12px]",
    );
  });

  it("uses a more compact title treatment for long names while preserving the full label", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={longNameProduct} />);

    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("text-[8px]");
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    expect(screen.getByTestId("product-card-footer-name")).toHaveAttribute(
      "title",
      "中华",
    );
    expect(screen.getByTestId("product-card-footer-name")).toHaveClass("truncate");
  });

  it("keeps overlay copy readable for long titles and brands", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(
      <ProductCard
        product={{
          ...longNameProduct,
          brand: "Shanghai Tobacco Group Limited Reserve Collection",
        }}
      />,
    );

    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("line-clamp-3");
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    expect(screen.getByTestId("product-card-overlay-brand")).toHaveClass("line-clamp-2");
    expect(screen.getByTestId("product-card-overlay-text")).toHaveClass("min-h-0");
  });

  it("anchors the hover overlay to the lower half of the card", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId("product-card-root")).toHaveAttribute(
      "data-card-shape",
      "wide-compact",
    );
    expect(screen.getByTestId("product-card-overlay-shell")).toHaveAttribute(
      "data-overlay-anchor",
      "card-bottom-half",
    );
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-variant",
      "floating-sheet",
    );
  });

  it("shrinks overlay typography for extreme copy lengths so all key info still fits", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={extremeLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("text-[8px]");
    expect(screen.getByTestId("product-card-overlay-brand")).toHaveClass("line-clamp-2");
    expect(screen.getByTestId("product-card-region-badge")).toHaveClass("text-[7px]");
  });

  it("switches to compact overlay layout when combined bilingual copy would otherwise overflow", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={combinedLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "compact",
    );
    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("line-clamp-2");
  });

  it("pins the price row to the bottom so bilingual copy gets the remaining vertical space", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={combinedLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-content").className).not.toContain(
      "justify-between",
    );
    expect(screen.getByText("¥0").parentElement).toHaveClass("mt-auto", "shrink-0");
  });
});
