import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BrandList from "@/app/brands/page";

const mockI18n = {
  language: "zh-CN",
  resolvedLanguage: "zh-CN",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, Record<string, string>> = {
        "zh-CN": {
          "nav:archive": "Archive",
          "brands:title": "卷烟品牌",
          "brands:subtitle": "Cigarette Brands",
          "brands:searchPlaceholder": "Search brands…",
        },
        "en-US": {
          "nav:archive": "Archive",
          "brands:title": "Cigarette Brands",
          "brands:subtitle": "Browse brands across the collection",
          "brands:searchPlaceholder": "Search brands…",
        },
      };

      return translations[mockI18n.resolvedLanguage]?.[key] || key;
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
  brands: [
    {
      id: 1,
      name: "中华",
      pinyin: "zhonghua",
      logo: "https://example.com/1.png",
      count: 3,
      region: "mainland",
      descriptionEn: "A premium Chinese brand",
      descriptionCn: "经典国烟品牌",
    },
    {
      id: 2,
      name: "万宝路",
      pinyin: "marlboro",
      logo: "https://example.com/2.png",
      count: 2,
      region: "international",
      descriptionEn: "An international brand",
      descriptionCn: "国际品牌",
    },
  ],
}));

vi.mock("@/data/region-labels", () => ({
  regionLabels: {
    mainland: { zh: "大陆", en: "Mainland" },
    hkmo: { zh: "港澳", en: "HK & Macau" },
    international: { zh: "国际", en: "International" },
    historical: { zh: "历史", en: "Historical" },
  },
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/MobileNav", () => ({
  default: () => <nav data-testid="mobile-nav">MobileNav</nav>,
}));

describe("BrandList", () => {
  it("renders english copy and region labels when the active language is english", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<BrandList />);

    expect(screen.getByText("Cigarette Brands")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search brands…")).toBeInTheDocument();
    expect(screen.getByTestId("collection-control-bar")).toBeInTheDocument();
    expect(screen.getAllByText("Mainland")[0]).toBeInTheDocument();
  });

  it("filters brands by search input", () => {
    mockI18n.language = "zh-CN";
    mockI18n.resolvedLanguage = "zh-CN";

    render(<BrandList />);

    // 等待初始加载完成（骨架屏消失）
    // 页面有 300ms 的模拟加载延迟
    setTimeout(() => {}, 350);

    const searchInput = screen.getByPlaceholderText("Search brands…");
    
    // 搜索 "zhong" 应该匹配 "中华" (zhonghua) 的拼音
    fireEvent.change(searchInput, {
      target: { value: "zhong" },
    });

    // 在 mainland 地区下，搜索 "zhong" 应该找到 "中华"
    expect(screen.getByText("中华")).toBeInTheDocument();
    // "万宝路" 在 international 地区，不应该显示
    expect(screen.queryByText("万宝路")).not.toBeInTheDocument();
  });
});
