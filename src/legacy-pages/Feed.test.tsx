import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Feed from "./Feed";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "feed.eyebrow": "Social",
        "feed.title": "Community Feed",
        "feed.subtitle": "Recent activity from the community.",
        "feed.activityLabel": "Latest activity",
        "feed.signIn": "Sign In",
        "social:feed.eyebrow": "Social",
        "social:feed.title": "Community Feed",
        "social:feed.subtitle": "Recent activity from the community.",
        "social:feed.activityLabel": "Latest activity",
        "social:feed.signIn": "Sign In",
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

vi.mock("@/data/feed-activity", () => ({
  feedActivities: [
    {
      id: "1",
      user: "toyashtray",
      avatar: "https://example.com/avatar.png",
      action: "wishlisted",
      productNameZh: "威力加（3号）",
      productNameEn: "Villiger Premium No.3",
      productHref: "/sku/3424",
      timestamp: "41m ago",
    },
  ],
}));

describe("Feed", () => {
  it("renders a community activity stream", () => {
    render(<Feed />);

    expect(screen.getByText("Community Feed")).toBeInTheDocument();
    expect(screen.getAllByText("Latest activity").length).toBeGreaterThan(0);
    expect(screen.getByTestId("collection-control-bar")).toBeInTheDocument();
    expect(screen.getByText("@toyashtray", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("威力加（3号）")).toBeInTheDocument();
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
  });
});
