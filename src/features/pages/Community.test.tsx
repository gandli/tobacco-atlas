import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Community from "./Community";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "community.eyebrow": "Collector Network",
        "community.title": "Community",
        "community.subtitle": "Collectors with a username, ranked by packs tried.",
        "community.cta": "Sign up to appear on the leaderboard",
        "community.collectors": "Collectors",
        "community.mostTried": "Most tried",
        "community.mostFavorited": "Most favorited",
        "community.brands": "Brands",
        "community.tried": "Tried",
        "community.favorited": "Fav",
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("@/components/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("@/components/MobileNav", () => ({ default: () => <nav data-testid="mobile-nav" /> }));
vi.mock("@/data/community", () => ({
  communityUsers: [
    { id: "1", username: "alice", brands: 2, tried: 7, fav: 3, avatar: "" },
  ],
}));

describe("Community", () => {
  it("renders the shared social hero copy", () => {
    render(<Community />);

    expect(screen.getByText("Collector Network")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Sign up to appear on the leaderboard")).toBeInTheDocument();
    expect(screen.getByTestId("page-frame")).toBeInTheDocument();
    expect(screen.getByTestId("collection-control-bar")).toBeInTheDocument();
    expect(screen.getByTestId("community-row-1")).toHaveClass("museum-inline-panel");
  });
});
