import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MyPage from "./MyPage";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        eyebrow: "Personal Hub",
        title: "My Account",
        subtitle: "Manage saved items, submissions, and account preferences from one place.",
        loginCardTitle: "Sign in",
        loginCardDescription: "Sign in to save favorites, submit data, and join community discussions.",
        login: "Sign In",
        register: "Create account",
        quickActions: "Quick actions",
        submitData: "Submit data",
        browseBrands: "Browse brands",
        browseManufacturers: "Browse manufacturers",
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("@/components/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("@/components/MobileNav", () => ({ default: () => <nav data-testid="mobile-nav" /> }));
vi.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("MyPage", () => {
  it("renders the shared account hero and login card", () => {
    render(<MyPage />);

    expect(screen.getByText("Personal Hub")).toBeInTheDocument();
    expect(screen.getByText("My Account")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Quick actions")).toBeInTheDocument();
  });
});
