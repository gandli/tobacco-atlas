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

  it("keeps title typography fixed for medium-length english names", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={mediumLengthEnglishProduct} />);

    expect(screen.getByTestId("product-card-overlay-title").firstElementChild).toHaveClass(
      "text-[11px]",
      "md:text-[12px]",
    );
    expect(screen.getByTestId("product-card-overlay-shell")).toHaveClass(
      "sku-card-overlay-expanded",
    );
  });

  it("keeps fixed overlay font sizes for long names while preserving the full label", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={longNameProduct} />);

    expect(screen.getByTestId("product-card-overlay-title").firstElementChild).toHaveClass(
      "text-[11px]",
    );
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    expect(screen.getByTestId("product-card-overlay-shell")).toHaveClass(
      "sku-card-overlay-expanded",
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

    const titleWrapper = screen.getByTestId("product-card-overlay-title");
    expect(titleWrapper).toHaveClass("h-10", "overflow-hidden");
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    const brandWrapper = screen.getByTestId("product-card-overlay-brand");
    expect(brandWrapper).toHaveClass("h-[18px]", "overflow-hidden");
    expect(screen.getByTestId("product-card-overlay-body")).toHaveClass(
      "grid",
      "grid-rows-[40px_18px_22px]",
    );
  });

  it("anchors the hover overlay to the lower half of the card", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId("product-card-root")).toHaveAttribute(
      "data-card-shape",
      "wide-compact",
    );
    expect(screen.getByTestId("product-card-root")).toHaveClass("h-full");
    expect(screen.getByTestId("product-card-overlay-shell")).toHaveAttribute(
      "data-overlay-anchor",
      "card-bottom-half",
    );
    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-variant",
      "floating-sheet",
    );
  });

  it("keeps a fixed card frame regardless of image or copy length", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    expect(container.querySelector('[class*="aspect-[11/16]"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="min-h-[88px]"]')).toBeInTheDocument();
  });

  it("shrinks overlay typography for extreme copy lengths so all key info still fits", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={extremeLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "dense",
    );
    expect(screen.getByTestId("product-card-overlay-title").firstElementChild).toHaveClass(
      "text-[11px]",
      "md:text-[12px]",
    );
    expect(screen.getByTestId("product-card-overlay-brand").firstElementChild).toHaveClass(
      "text-[10px]",
      "md:text-[11px]",
    );
    expect(screen.getByTestId("product-card-region-badge")).toHaveClass("text-[8px]");
  });

  it("switches to compact overlay layout when combined bilingual copy would otherwise overflow", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={combinedLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-content")).toHaveAttribute(
      "data-overlay-density",
      "compact",
    );
    expect(screen.getByTestId("product-card-overlay-title")).toHaveClass("h-[34px]");
    expect(screen.getByTestId("product-card-overlay-brand")).toHaveClass("h-[18px]");
    expect(screen.getByTestId("product-card-overlay-shell")).toHaveClass(
      "sku-card-overlay-expanded",
    );
    expect(screen.getByTestId("product-card-overlay-brand").firstElementChild).toHaveClass(
      "text-[10px]",
      "md:text-[11px]",
    );
    expect(screen.getByText("¥0")).toHaveClass("text-[14px]", "md:text-[15px]");
  });

  it("keeps title, brand, and price rows on fixed overlay rails", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<ProductCard product={combinedLongCopyProduct} />);

    expect(screen.getByTestId("product-card-overlay-body")).toHaveClass(
      "grid",
      "grid-rows-[34px_18px_24px]",
      "gap-1.5",
    );
    expect(screen.getByTestId("product-card-overlay-footer")).toHaveClass(
      "flex",
      "h-full",
      "items-center",
      "justify-between",
      "gap-3",
    );
  });
});
