import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MobileNav from "@/components/MobileNav";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("MobileNav", () => {
  it("renders primary navigation links", () => {
    mockUsePathname.mockReturnValue("/");

    render(<MobileNav />);

    expect(screen.getByRole("link", { name: "collection" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "brands" })).toHaveAttribute("href", "/brands");
  });

  it("marks the current mobile tab by pathname styling state", () => {
    mockUsePathname.mockReturnValue("/chat");

    render(<MobileNav />);

    expect(screen.getByRole("link", { name: "chat" })).toHaveClass("text-foreground");
  });
});
