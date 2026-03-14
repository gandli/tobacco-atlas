import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";
import { vi } from "vitest";

// Mock the translation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: "中国卷烟博物馆",
        subtitle: "CHINESE TOBACCO MUSEUM",
        stats: "{{brands}} brands, {{products}} products",
        browseCollection: "Browse Collection",
        howItWorks: "How It Works",
        whyThisExists: "Why This Exists",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the data module
vi.mock("@/data", () => ({
  totalBrands: 100,
  totalProducts: 1000,
}));

describe("HeroSection", () => {
  it("should render the hero section", () => {
    render(<HeroSection />);

    // Check if the main heading is present
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should have the correct title", () => {
    render(<HeroSection />);

    expect(screen.getByText("中国卷烟博物馆")).toBeInTheDocument();
  });

  it("should have the correct subtitle", () => {
    render(<HeroSection />);

    expect(screen.getByText("CHINESE TOBACCO MUSEUM")).toBeInTheDocument();
  });

  it("should have the browse collection button", () => {
    render(<HeroSection />);

    expect(screen.getByText("Browse Collection")).toBeInTheDocument();
  });

  it("should have the how it works button", () => {
    render(<HeroSection />);

    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("should have the why this exists button", () => {
    render(<HeroSection />);

    expect(screen.getByText("Why This Exists")).toBeInTheDocument();
  });

  it("should have social links", () => {
    render(<HeroSection />);

    expect(screen.getByText("𝕏 by @gandli")).toBeInTheDocument();
    expect(screen.getByText("by @gandli")).toBeInTheDocument();
  });
});
