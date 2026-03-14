import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NavLink } from "@/components/NavLink";

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

describe("NavLink", () => {
  it("renders an anchor with href", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/brands">Brands</NavLink>);

    expect(screen.getByRole("link", { name: "Brands" })).toHaveAttribute("href", "/brands");
  });

  it("applies activeClassName when pathname matches", () => {
    mockUsePathname.mockReturnValue("/brands");

    render(
      <NavLink href="/brands" activeClassName="active">
        Brands
      </NavLink>,
    );

    expect(screen.getByRole("link", { name: "Brands" })).toHaveClass("active");
  });

  it("keeps base classes when route is inactive", () => {
    mockUsePathname.mockReturnValue("/community");

    render(
      <NavLink href="/brands" className="base-class" activeClassName="active">
        Brands
      </NavLink>,
    );

    const link = screen.getByRole("link", { name: "Brands" });
    expect(link).toHaveClass("base-class");
    expect(link).not.toHaveClass("active");
  });
});
