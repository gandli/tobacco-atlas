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

    const { container } = render(<Navbar />);

    expect(container.querySelector('a[href="/"]')).toBeTruthy();
    expect(container.querySelector('a[href="/makers"]')).toBeTruthy();
    expect(container.querySelector('a[href="/feed"]')).toBeTruthy();
    expect(container.querySelector('a[href="/community"]')).toBeTruthy();
    expect(container.querySelector('a[href="/chat"]')).toBeTruthy();
    expect(container.querySelector('a[href="/changelog"]')).toBeTruthy();
    expect(container.querySelector('a[href="/my"]')).toBeNull();
    expect(container.querySelector('a[href="/login"]')).toBeTruthy();
  });

  it("marks the active navigation item from pathname", () => {
    mockUsePathname.mockReturnValue("/brands");

    const { container } = render(<Navbar />);

    expect(container.querySelector('a[href="/brands"]')).toHaveAttribute("aria-current", "page");
  });
});
