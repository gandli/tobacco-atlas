import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Changelog from "./Changelog";

const mockI18n = {
  language: "zh-CN",
  resolvedLanguage: "zh-CN",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, Record<string, string>> = {
        "zh-CN": {
          "types.feature": "新功能",
          title: "更新日志",
          footer: "感谢您使用烟草图鉴，我们会持续改进产品体验。",
        },
        "en-US": {
          "types.feature": "Feature",
          title: "Changelog",
          footer: "Thank you for using Chinese Cigarette Museum. We will continue to improve the product experience.",
        },
      };

      return translations[mockI18n.resolvedLanguage]?.[key] || key;
    },
    i18n: mockI18n,
  }),
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));

vi.mock("@/components/MobileNav", () => ({
  default: () => <nav data-testid="mobile-nav" />,
}));

describe("Changelog", () => {
  it("renders english changelog copy and localized entries", () => {
    mockI18n.language = "en-US";
    mockI18n.resolvedLanguage = "en-US";

    render(<Changelog />);

    expect(screen.getByText("Changelog")).toBeInTheDocument();
    expect(screen.getAllByText("Feature")[0]).toBeInTheDocument();
    expect(screen.getByText("Added gallery support to brand detail pages")).toBeInTheDocument();
  });
});
