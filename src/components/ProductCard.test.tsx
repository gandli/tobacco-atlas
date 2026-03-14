import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data";

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
  image: "https://example.com/image.jpg",
  brandPinyin: "zhonghua",
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the product brand and name", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getAllByText("中华")[0]).toBeInTheDocument();
    expect(screen.getAllByText("软中华")[0]).toBeInTheDocument();
  });

  it("renders a sku detail link", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/sku/123");
  });

  it("renders a lazy-loaded image", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "中华（软中华）");
    expect(image).toHaveAttribute("loading", "lazy");
  });
});
