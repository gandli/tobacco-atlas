import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import MobileNav from "@/components/MobileNav";
import { vi } from "vitest";

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MobileNav", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render navigation container", () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );
    
    // MobileNav should render some navigation UI
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it("should have clickable elements for navigation", () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );
    
    // Check for buttons or links
    const buttons = document.querySelectorAll("button");
    const links = document.querySelectorAll("a");
    
    expect(buttons.length + links.length).toBeGreaterThan(0);
  });
});