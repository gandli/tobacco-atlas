import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AdminDashboard from "./AdminDashboard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: "Admin Dashboard",
        description: "Review user submitted data",
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        pendingSubmissions: "Pending Submissions",
        pendingDesc: "New submissions requiring your review",
        type: "Type",
        name: "Name",
        submitter: "Submitter",
        date: "Date",
        actions: "Actions",
        approve: "Approve",
        reject: "Reject",
        "submissionTypes.brand": "Brand",
        "submissionTypes.product": "Product",
        "submissionTypes.manufacturer": "Manufacturer",
        "common:edit": "Edit",
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

describe("AdminDashboard", () => {
  it("renders localized submission type badges", () => {
    render(<AdminDashboard />);

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getAllByText("Brand")[0]).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getAllByText("Approve").length).toBeGreaterThan(0);
  });
});
