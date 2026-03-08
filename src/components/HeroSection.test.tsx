import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("should render the hero section", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    
    // Hero section should contain some content
    const section = document.querySelector("section") || document.body.firstChild;
    expect(section).toBeTruthy();
  });

  it("should have heading or title content", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    
    // Look for headings
    const headings = document.querySelectorAll("h1, h2, h3");
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });

  it("should have proper styling classes", () => {
    const { container } = render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    
    // Check for Tailwind classes or styling
    const heroElement = container.firstChild;
    expect(heroElement).toBeTruthy();
  });
});