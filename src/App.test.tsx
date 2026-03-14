import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Providers } from "@/app/providers";
import NotFoundPage from "@/app/not-found";

describe("App Router shell", () => {
  it("renders provider children", () => {
    render(
      <Providers>
        <div>Shell content</div>
      </Providers>,
    );

    expect(screen.getByText("Shell content")).toBeInTheDocument();
  });

  it("renders the app-router 404 entry with a home link", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
  });
});
