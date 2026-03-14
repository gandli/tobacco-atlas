import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ChatPage from "@/app/chat/page";
import ChangelogPage from "@/app/changelog/page";
import CommunityPage from "@/app/community/page";
import FeedPage from "@/app/feed/page";

vi.mock("@/legacy-pages/Feed", () => ({
  default: () => <div>feed route content</div>,
}));

vi.mock("@/legacy-pages/Chat", () => ({
  default: () => <div>chat route content</div>,
}));

vi.mock("@/legacy-pages/Community", () => ({
  default: () => <div>community route content</div>,
}));

vi.mock("@/legacy-pages/Changelog", () => ({
  default: () => <div>changelog route content</div>,
}));

describe("App social route wrappers", () => {
  it("renders the feed route", () => {
    render(<FeedPage />);

    expect(screen.getByText("feed route content")).toBeInTheDocument();
  });

  it("renders the chat route", () => {
    render(<ChatPage />);

    expect(screen.getByText("chat route content")).toBeInTheDocument();
  });

  it("renders the community route", () => {
    render(<CommunityPage />);

    expect(screen.getByText("community route content")).toBeInTheDocument();
  });

  it("renders the changelog route", () => {
    render(<ChangelogPage />);

    expect(screen.getByText("changelog route content")).toBeInTheDocument();
  });
});
