import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomeProductStream from "@/components/HomeProductStream";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) => {
      const translations: Record<string, string> = {
        loadingMore: "Loading more products",
        endOfCollection: `Loaded ${options?.count ?? 0} products`,
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("@/components/ProductGrid", () => ({
  default: ({ products, sectionId }: { products: Array<{ id: number; name: string }>; sectionId?: string }) => (
    <section id={sectionId}>
      {products.map((product) => (
        <div key={product.id} data-testid={`product-card-${product.id}`}>
          {product.name}
        </div>
      ))}
    </section>
  ),
}));

vi.mock("@/components/skeletons/ProductCardSkeleton", () => ({
  default: ({ index }: { index: number }) => <div data-testid={`append-skeleton-${index}`} />,
}));

const products = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  brand: "测试品牌",
  name: `产品 ${index + 1}`,
  image: `https://example.com/${index + 1}.jpg`,
  brandPinyin: "test",
}));

describe("HomeProductStream", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders only the initial batch before the sentinel is triggered", () => {
    render(<HomeProductStream products={products} initialCount={2} batchSize={2} />);

    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-3")).not.toBeInTheDocument();
  });

  it("appends the next batch when the sentinel intersects", async () => {
    render(<HomeProductStream products={products} initialCount={2} batchSize={2} />);

    await act(async () => {
      globalThis.__triggerIntersection?.(true);
    });

    expect(screen.getByTestId("append-skeleton-0")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(160);
    });

    expect(screen.getByTestId("product-card-4")).toBeInTheDocument();
  });

  it("renders a localized end state once all products are visible", async () => {
    render(<HomeProductStream products={products.slice(0, 2)} initialCount={2} batchSize={2} />);

    expect(screen.getByText("Loaded 2 products")).toBeInTheDocument();
  });

  it("can keep appending batches until the full collection is visible", async () => {
    const manyProducts = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      brand: "测试品牌",
      name: `产品 ${index + 1}`,
      image: `https://example.com/${index + 1}.jpg`,
      brandPinyin: "test",
    }));

    render(<HomeProductStream products={manyProducts} initialCount={3} batchSize={3} />);

    for (let i = 0; i < 2; i += 1) {
      await act(async () => {
        globalThis.__triggerIntersection?.(true);
      });

      await act(async () => {
        vi.advanceTimersByTime(160);
      });
    }

    expect(screen.getByTestId("product-card-9")).toBeInTheDocument();
    expect(screen.getByText("Loaded 9 products")).toBeInTheDocument();
  });
});
