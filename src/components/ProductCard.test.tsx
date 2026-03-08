import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Test wrapper with Router
const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock product data
const mockProduct: Product = {
  id: 123,
  brand: "中华",
  name: "软中华",
  image: "https://example.com/image.jpg",
  brandPinyin: "zhonghua",
};

describe("ProductCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render product brand name", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText("中华")).toBeInTheDocument();
  });

  it("should render product name", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText("软中华")).toBeInTheDocument();
  });

  it("should render product image with correct alt text", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "中华（软中华）");
    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  it("should have lazy loading on image", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("should navigate to product detail on click", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const card = screen.getByRole("img").closest("div[class*='cursor-pointer']");
    
    if (card) {
      fireEvent.click(card);
    }

    expect(mockNavigate).toHaveBeenCalledWith(`/sku/${mockProduct.id}`);
  });

  it("should have correct container structure", () => {
    const { container } = renderWithRouter(<ProductCard product={mockProduct} />);
    
    // Check for cursor-pointer class indicating interactivity
    const clickableContainer = container.querySelector(".cursor-pointer");
    expect(clickableContainer).toBeInTheDocument();
  });

  it("should display product with missing optional fields", () => {
    const minimalProduct: Product = {
      id: 456,
      brand: "测试品牌",
      name: "测试产品",
      image: "",
      brandPinyin: "test",
    };

    renderWithRouter(<ProductCard product={minimalProduct} />);
    
    expect(screen.getByText("测试品牌")).toBeInTheDocument();
    expect(screen.getByText("测试产品")).toBeInTheDocument();
  });

  it("should have group class for hover effects", () => {
    const { container } = renderWithRouter(<ProductCard product={mockProduct} />);
    
    const groupElement = container.querySelector(".group");
    expect(groupElement).toBeInTheDocument();
  });
});