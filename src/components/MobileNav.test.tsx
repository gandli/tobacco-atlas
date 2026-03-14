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

    expect(screen.getByLabelText("collection")).toHaveAttribute("href", "/");
    expect(screen.getByLabelText("brands")).toHaveAttribute("href", "/brands");
    expect(screen.getByLabelText("feed")).toHaveAttribute("href", "/feed");
    expect(screen.getByLabelText("community")).toHaveAttribute("href", "/community");
    expect(screen.queryByLabelText("my")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("chat")).not.toBeInTheDocument();
  });

  it("marks the current mobile tab by pathname styling state", () => {
    mockUsePathname.mockReturnValue("/feed");

    const { container } = render(<MobileNav />);

    expect(container.querySelector('a[href="/feed"]')).toHaveClass("text-foreground");
  });
});
