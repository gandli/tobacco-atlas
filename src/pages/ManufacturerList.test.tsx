import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ManufacturerList from "./ManufacturerList";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/data", () => ({
  manufacturers: [
    {
      name: "湖北中烟工业有限责任公司",
      brands: ["黄鹤楼", "红金龙", "黄金龙"],
      productIds: [1, 2, 3, 4, 5],
    },
    {
      name: "四川中烟工业有限责任公司",
      brands: ["娇子", "长城雪茄", "狮牌雪茄"],
      productIds: [6, 7, 8],
    },
  ],
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/MobileNav", () => ({
  default: () => <nav data-testid="mobile-nav">MobileNav</nav>,
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <button type="button">{children}</button>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}));

describe("ManufacturerList", () => {
  it("renders page shell and manufacturer cards", async () => {
    render(<ManufacturerList />);

    expect(screen.getByText("制造商名录")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("湖北中烟工业有限责任公司")).toBeInTheDocument();
      expect(screen.getByText("四川中烟工业有限责任公司")).toBeInTheDocument();
    });
  });

  it("filters manufacturers by search term", async () => {
    render(<ManufacturerList />);

    fireEvent.change(screen.getByPlaceholderText("搜索制造商或品牌..."), {
      target: { value: "湖北" },
    });

    await waitFor(() => {
      expect(screen.getByText("湖北中烟工业有限责任公司")).toBeInTheDocument();
      expect(screen.queryByText("四川中烟工业有限责任公司")).not.toBeInTheDocument();
    });
  });

  it("renders detail links with encoded manufacturer names", async () => {
    render(<ManufacturerList />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /湖北中烟工业有限责任公司/ })).toHaveAttribute(
        "href",
        expect.stringContaining("/manufacturer/"),
      );
    });
  });
});
