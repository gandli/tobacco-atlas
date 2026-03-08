import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock react-router-dom BEFORE importing App
vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => element,
  useNavigate: () => vi.fn(),
}));

// Mock page components
vi.mock("@/pages/Index", () => ({
  default: () => <div data-testid="index-page">Index Page</div>,
}));
vi.mock("@/pages/BrandList", () => ({
  default: () => <div data-testid="brand-list-page">Brand List Page</div>,
}));
vi.mock("@/pages/BrandDetail", () => ({
  default: () => <div data-testid="brand-detail-page">Brand Detail Page</div>,
}));
vi.mock("@/pages/SkuDetail", () => ({
  default: () => <div data-testid="sku-detail-page">SKU Detail Page</div>,
}));
vi.mock("@/pages/Community", () => ({
  default: () => <div data-testid="community-page">Community Page</div>,
}));
vi.mock("@/pages/Chat", () => ({
  default: () => <div data-testid="chat-page">Chat Page</div>,
}));
vi.mock("@/pages/Gallery", () => ({
  default: () => <div data-testid="gallery-page">Gallery Page</div>,
}));
vi.mock("@/pages/Feed", () => ({
  default: () => <div data-testid="feed-page">Feed Page</div>,
}));
vi.mock("@/pages/MyPage", () => ({
  default: () => <div data-testid="my-page">My Page</div>,
}));
vi.mock("@/pages/Login", () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));
vi.mock("@/pages/Register", () => ({
  default: () => <div data-testid="register-page">Register Page</div>,
}));
vi.mock("@/pages/ForgotPassword", () => ({
  default: () => <div data-testid="forgot-password-page">Forgot Password Page</div>,
}));
vi.mock("@/pages/SubmitData", () => ({
  default: () => <div data-testid="submit-data-page">Submit Data Page</div>,
}));
vi.mock("@/pages/AdminDashboard", () => ({
  default: () => <div data-testid="admin-dashboard-page">Admin Dashboard Page</div>,
}));
vi.mock("@/pages/ManufacturerDetail", () => ({
  default: () => <div data-testid="manufacturer-detail-page">Manufacturer Detail Page</div>,
}));
vi.mock("@/pages/ManufacturerList", () => ({
  default: () => <div data-testid="manufacturer-list-page">Manufacturer List Page</div>,
}));
vi.mock("@/pages/Changelog", () => ({
  default: () => <div data-testid="changelog-page">Changelog Page</div>,
}));
vi.mock("@/pages/NotFound", () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

// Import App AFTER mocking
import App from "@/App";

describe("App", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
  });

  it("should contain routes", () => {
    render(<App />);
    expect(screen.getByTestId("routes")).toBeInTheDocument();
  });

  it("should render Index page on root route", () => {
    render(<App />);
    expect(screen.getByTestId("index-page")).toBeInTheDocument();
  });

  it("should render BrandList page", () => {
    render(<App />);
    expect(screen.getByTestId("brand-list-page")).toBeInTheDocument();
  });

  it("should render BrandDetail page", () => {
    render(<App />);
    expect(screen.getByTestId("brand-detail-page")).toBeInTheDocument();
  });

  it("should render SkuDetail page", () => {
    render(<App />);
    expect(screen.getByTestId("sku-detail-page")).toBeInTheDocument();
  });

  it("should render Community page", () => {
    render(<App />);
    expect(screen.getByTestId("community-page")).toBeInTheDocument();
  });

  it("should render Chat page", () => {
    render(<App />);
    expect(screen.getByTestId("chat-page")).toBeInTheDocument();
  });

  it("should render Gallery page", () => {
    render(<App />);
    expect(screen.getByTestId("gallery-page")).toBeInTheDocument();
  });

  it("should render Feed page", () => {
    render(<App />);
    expect(screen.getByTestId("feed-page")).toBeInTheDocument();
  });

  it("should render MyPage", () => {
    render(<App />);
    expect(screen.getByTestId("my-page")).toBeInTheDocument();
  });

  it("should render Login page", () => {
    render(<App />);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("should render Register page", () => {
    render(<App />);
    expect(screen.getByTestId("register-page")).toBeInTheDocument();
  });

  it("should render ForgotPassword page", () => {
    render(<App />);
    expect(screen.getByTestId("forgot-password-page")).toBeInTheDocument();
  });

  it("should render SubmitData page", () => {
    render(<App />);
    expect(screen.getByTestId("submit-data-page")).toBeInTheDocument();
  });

  it("should render AdminDashboard page", () => {
    render(<App />);
    expect(screen.getByTestId("admin-dashboard-page")).toBeInTheDocument();
  });

  it("should render ManufacturerDetail", () => {
    render(<App />);
    expect(screen.getByTestId("manufacturer-detail-page")).toBeInTheDocument();
  });

  it("should render ManufacturerList", () => {
    render(<App />);
    expect(screen.getByTestId("manufacturer-list-page")).toBeInTheDocument();
  });

  it("should render Changelog page", () => {
    render(<App />);
    expect(screen.getByTestId("changelog-page")).toBeInTheDocument();
  });

  it("should render NotFound page", () => {
    render(<App />);
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});