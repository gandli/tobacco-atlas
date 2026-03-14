import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import Chat from "@/app/chat/page";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, number>) => {
      const translations: Record<string, string> = {
        "chat.eyebrow": "Live Lounge",
        "chat.title": "Ciggie Chat",
        "chat.subtitle": "Drop into the live room to swap finds, travel tips, and pack impressions.",
        "chat.online": `${options?.count ?? 0} online`,
        "chat.placeholder": "Sign in to chat...",
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

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("Chat", () => {
  it("renders the shared collection page shell for chat", () => {
    render(<Chat />);

    expect(screen.getByText("Ciggie Chat")).toBeInTheDocument();
    expect(screen.getByTestId("page-frame")).toBeInTheDocument();
    expect(screen.getByTestId("collection-control-bar")).toBeInTheDocument();
    expect(screen.getByTestId("page-frame")).toHaveClass("max-w-[1200px]");
    expect(screen.getByTestId("chat-message-1")).toHaveClass("museum-inline-panel");
  });
});
