import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

// Test wrapper with Router
const renderWithRouter = (component: React.ReactNode, initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {component}
    </MemoryRouter>
  );
};

describe("NavLink", () => {
  it("should render as an anchor element", () => {
    renderWithRouter(<NavLink to="/test">Test Link</NavLink>);
    
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Test Link");
  });

  it("should have correct href attribute", () => {
    renderWithRouter(<NavLink to="/brands">Brands</NavLink>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/brands");
  });

  it("should apply className prop", () => {
    renderWithRouter(
      <NavLink to="/test" className="custom-class">
        Test
      </NavLink>
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("should apply activeClassName when on active route", () => {
    renderWithRouter(
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>,
      "/"
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("active");
  });

  it("should not apply activeClassName when not on active route", () => {
    renderWithRouter(
      <NavLink to="/other" activeClassName="active">
        Other
      </NavLink>,
      "/"
    );
    
    const link = screen.getByRole("link");
    expect(link).not.toHaveClass("active");
  });

  it("should handle multiple classes correctly", () => {
    renderWithRouter(
      <NavLink to="/test" className="base-class" activeClassName="active">
        Test
      </NavLink>,
      "/test"
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("base-class");
    expect(link).toHaveClass("active");
  });

  it("should render children correctly", () => {
    renderWithRouter(
      <NavLink to="/test">
        <span>Inner Content</span>
      </NavLink>
    );
    
    expect(screen.getByText("Inner Content")).toBeInTheDocument();
  });

  it("should forward ref correctly", () => {
    const ref = { current: null as HTMLAnchorElement | null };
    
    renderWithRouter(<NavLink to="/test" ref={ref}>Test</NavLink>);
    
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("should have correct display name", () => {
    expect(NavLink.displayName).toBe("NavLink");
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    
    renderWithRouter(
      <NavLink to="/test" onClick={handleClick}>
        Test
      </NavLink>
    );
    
    fireEvent.click(screen.getByRole("link"));
    
    expect(handleClick).toHaveBeenCalled();
  });

  it("should support nested routes", () => {
    renderWithRouter(
      <NavLink to="/brands" activeClassName="active">
        Brands
      </NavLink>,
      "/brands/huanghelou"
    );
    
    const link = screen.getByRole("link");
    // For nested routes, the parent route should be active
    expect(link).toHaveClass("active");
  });
});