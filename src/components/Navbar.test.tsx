import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Navbar from "@/components/Navbar";

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

vi.mock("@/components/LanguageSwitcher", () => ({
  default: () => <div data-testid="language-switcher" />,
}));

vi.mock("@/components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe("Navbar", () => {
  it("renders the museum home link and auth entry", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    expect(screen.getByRole("link", { name: /Chinese Cigarette Museum/i })).toHaveAttribute("href", "/");
    expect(screen.getByText("feed").closest("a")).toHaveAttribute("href", "/feed");
    expect(screen.getByText("community").closest("a")).toHaveAttribute("href", "/community");
    expect(screen.getByText("chat").closest("a")).toHaveAttribute("href", "/chat");
    expect(screen.getAllByText("my")[0].closest("a")).toHaveAttribute("href", "/my");
    expect(screen.getByText("signIn").closest("a")).toHaveAttribute("href", "/login");
  });

  it("marks the active navigation item from pathname", () => {
    mockUsePathname.mockReturnValue("/brands");

    render(<Navbar />);

    expect(screen.getByRole("link", { name: "brands" })).toHaveAttribute("aria-current", "page");
  });
});
