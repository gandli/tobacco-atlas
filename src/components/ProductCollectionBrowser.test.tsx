import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductCollectionBrowser from "@/components/ProductCollectionBrowser";
import type { ProductBrowseItem } from "@/lib/product-browser";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      resolvedLanguage: "en-US",
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.productBrowser.searchPlaceholder": "Search products...",
        "common.productBrowser.region.all": "All",
        "common.productBrowser.region.mainland": "Mainland",
        "common.productBrowser.region.hkmo": "Hong Kong & Macau",
        "common.productBrowser.region.international": "Imported",
        "common.productBrowser.format.all": "Format",
        "common.productBrowser.format.hard": "Hard",
        "common.productBrowser.format.slim": "Slim",
        "common.productBrowser.sort.newest": "Newest",
        "common.productBrowser.sort.priceAsc": "Price Low to High",
        "common.productBrowser.sort.priceDesc": "Price High to Low",
        "common.productBrowser.sort.name": "Name",
        "common.productBrowser.results": "Results",
        "common.productBrowser.empty": "No matching products",
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("@/components/ProductGrid", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/components/ProductGrid")>();
  return {
    ...actual,
    default: ({ products }: { products: Array<{ id: number; name: string }> }) => (
      <div data-testid="product-grid">
        {products.map((product) => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            {product.name}
          </div>
        ))}
      </div>
    ),
  };
});

const products: ProductBrowseItem[] = [
  {
    id: 30,
    brand: "黄鹤楼",
    name: "硬珍品",
    nameEn: "Huanghelou Zhenpin Hard",
    region: "mainland",
    packPrice: 30,
  },
  {
    id: 10,
    brand: "云烟",
    name: "细支云龙",
    nameEn: "Yunyan Slim Yunlong",
    region: "hkmo",
    packPrice: 20,
  },
  {
    id: 20,
    brand: "长城雪茄",
    name: "盛世5号",
    nameEn: "Great Wall No.5",
    region: "international",
    packPrice: 80,
    format: "Cigar",
  },
];

describe("ProductCollectionBrowser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters and sorts the rendered collection through the shared controls", () => {
    render(<ProductCollectionBrowser products={products} />);

    fireEvent.change(screen.getByPlaceholderText("Search products..."), {
      target: { value: "huanghelou" },
    });
    expect(screen.getByTestId("product-30")).toBeInTheDocument();
    expect(screen.queryByTestId("product-10")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("region-filter"), {
      target: { value: "mainland" },
    });
    expect(screen.getByTestId("product-30")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("search-products"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("region-filter"), {
      target: { value: "all" },
    });
    fireEvent.change(screen.getByLabelText("format-filter"), {
      target: { value: "slim" },
    });
    expect(screen.getByTestId("product-10")).toBeInTheDocument();
    expect(screen.queryByTestId("product-30")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("format-filter"), {
      target: { value: "all" },
    });
    fireEvent.change(screen.getByLabelText("region-filter"), {
      target: { value: "all" },
    });
    fireEvent.change(screen.getByLabelText("sort-products"), {
      target: { value: "price-desc" },
    });

    const renderedProducts = screen.getAllByTestId(/product-\d+/).map((node) => node.textContent);
    expect(renderedProducts).toEqual(["盛世5号", "硬珍品", "细支云龙"]);
  });
});
