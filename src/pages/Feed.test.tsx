import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Feed from "./Feed";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "feed.notSignedIn": "Not signed in",
        "feed.signIn": "Sign In",
        "feed.favorites": "Favorites",
        "feed.tried": "Tried",
        "feed.wishlist": "Wishlist",
        "feed.empty": "Sign in to track your collection",
        "social:feed.notSignedIn": "Not signed in",
        "social:feed.signIn": "Sign In",
        "social:feed.favorites": "Favorites",
        "social:feed.tried": "Tried",
        "social:feed.wishlist": "Wishlist",
        "social:feed.empty": "Sign in to track your collection",
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

describe("Feed", () => {
  it("renders translated feed empty state copy", () => {
    render(<Feed />);

    expect(screen.getByText("Not signed in")).toBeInTheDocument();
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Sign in to track your collection")).toBeInTheDocument();
  });
});
