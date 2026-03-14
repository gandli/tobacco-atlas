import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";

const mockProducts = [
  {
    id: 1,
    brand: "测试品牌",
    name: "测试产品A",
    image: "https://example.com/1.jpg",
    brandPinyin: "test",
  },
  {
    id: 2,
    brand: "测试品牌",
    name: "测试产品B",
    image: "https://example.com/2.jpg",
    brandPinyin: "test",
  },
  {
    id: 3,
    brand: "测试品牌",
    name: "测试产品C",
    image: "https://example.com/3.jpg",
    brandPinyin: "test",
  },
];

// Mock ProductCard
vi.mock("@/components/ProductCard", () => ({
  default: ({ product }: { product: { id: number; name: string } }) => (
    <div data-testid={`product-card-${product.id}`}>{product.name}</div>
  ),
}));

describe("ProductGrid", () => {
  it("should render product grid section", () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    const section = container.querySelector("section#collection");
    expect(section).toBeInTheDocument();
  });

  it("should render grid container", () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
  });

  it("should render mocked products", () => {
    render(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-3")).toBeInTheDocument();
  });

  it("should only render the provided product subset", () => {
    render(
      <ProductGrid
        products={[
          {
            id: 1,
            brand: "测试品牌",
            name: "测试产品A",
            image: "https://example.com/1.jpg",
            brandPinyin: "test",
          },
          {
            id: 2,
            brand: "测试品牌",
            name: "测试产品B",
            image: "https://example.com/2.jpg",
            brandPinyin: "test",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-3")).not.toBeInTheDocument();
  });

  it("should render product names", () => {
    render(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByText("测试产品A")).toBeInTheDocument();
    expect(screen.getByText("测试产品B")).toBeInTheDocument();
    expect(screen.getByText("测试产品C")).toBeInTheDocument();
  });

  it("should have correct grid classes", () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    const grid = container.querySelector('[class*="grid-cols"]');
    expect(grid).toBeInTheDocument();
  });

  it("should use the shared product grid sizing across contexts", () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByTestId("product-grid")).toHaveClass("md:grid-cols-5");
    expect(screen.getByTestId("product-grid")).toHaveClass("lg:grid-cols-6");
    expect(screen.getByTestId("product-grid")).toHaveClass("xl:grid-cols-7");
    expect(screen.getByTestId("product-grid")).toHaveClass("2xl:grid-cols-8");
  });
});
