import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NotFoundPage from "./not-found";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "notFound.title": "Page not found",
        "notFound.description": "Sorry, the page you requested does not exist or has moved.",
        "notFound.backHome": "Return home",
      };

      return translations[key] || key;
    },
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("NotFoundPage", () => {
  it("renders localized not found copy", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByText("Sorry, the page you requested does not exist or has moved.")).toBeInTheDocument();
    expect(screen.getByText("Return home")).toBeInTheDocument();
  });
});
