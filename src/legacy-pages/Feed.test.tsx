import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Feed from "./Feed";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "feed.eyebrow": "Archive",
        "feed.title": "Collection Feed",
        "feed.subtitle": "Recent updates across makers, brands, and products.",
        "feed.activityLabel": "Latest entries",
        "feed.streamLabel": "Mixed stream",
        "feed.all": "All",
        "feed.makers": "Makers",
        "feed.brands": "Brands",
        "feed.products": "Products",
        "feed.signIn": "Sign In",
        "social:feed.eyebrow": "Archive",
        "social:feed.title": "Collection Feed",
        "social:feed.subtitle": "Recent updates across makers, brands, and products.",
        "social:feed.activityLabel": "Latest entries",
        "social:feed.streamLabel": "Mixed stream",
        "social:feed.all": "All",
        "social:feed.makers": "Makers",
        "social:feed.brands": "Brands",
        "social:feed.products": "Products",
        "social:feed.signIn": "Sign In",
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));

vi.mock("@/components/MobileNav", () => ({
  default: () => <nav data-testid="mobile-nav" />,
}));

vi.mock("@/data/feed-activity", () => ({
  feedActivities: [
    {
      id: "1",
      kind: "maker",
      title: "Anhui Tobacco",
      titleSecondary: "安徽中烟",
      summary: "Added with 2 brands and 12 linked products.",
      href: "/maker/anhui-tobacco",
      image: "https://example.com/maker.png",
      badge: "Maker added",
      badgeTone: "maker",
      timestamp: "41m ago",
    },
    {
      id: "2",
      kind: "brand",
      title: "黄山",
      titleSecondary: "Huangshan",
      summary: "Brand profile refreshed with new gallery assets.",
      href: "/brand/23-huangshan",
      image: "https://example.com/brand.png",
      badge: "Brand updated",
      badgeTone: "brand",
      timestamp: "1h ago",
    },
    {
      id: "3",
      kind: "product",
      title: "小红方印",
      titleSecondary: "Little Red Seal",
      summary: "New SKU published under Huangshan.",
      href: "/product/3424-xiaohongfangyin",
      image: "https://example.com/product.png",
      badge: "Product added",
      badgeTone: "product",
      timestamp: "41m ago",
    },
  ],
}));

describe("Feed", () => {
  it("renders a mixed collection feed", () => {
    render(<Feed />);

    expect(screen.getByText("Collection Feed")).toBeInTheDocument();
    expect(screen.getAllByText("Latest entries").length).toBeGreaterThan(0);
    expect(screen.getByTestId("collection-control-bar")).toBeInTheDocument();
    expect(screen.getByText("Anhui Tobacco")).toBeInTheDocument();
    expect(screen.getByText("黄山")).toBeInTheDocument();
    expect(screen.getByText("小红方印")).toBeInTheDocument();
    expect(screen.getByText("Maker added")).toBeInTheDocument();
    expect(screen.getByText("Brand updated")).toBeInTheDocument();
    expect(screen.getByText("Product added")).toBeInTheDocument();
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
  });
});
