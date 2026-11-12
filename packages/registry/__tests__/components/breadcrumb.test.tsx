import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
  parsePathnameToSegments,
} from "../../src/components/breadcrumb";

describe("Breadcrumb Components", () => {
  it("renders basic breadcrumb structure with nav and list", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");

    const currentPage = screen.getByRole("link", { name: /current/i });
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("applies variant styling to links and page", () => {
    render(
      <Breadcrumb variant="chips" size="sm">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Active Chip</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const page = screen.getByRole("link", { name: /active chip/i });
    expect(page.className).toContain("border");
  });

  it("parses pathnames into breadcrumb segments correctly", () => {
    const segments = parsePathnameToSegments("/docs/components/button");
    expect(segments).toEqual([
      { label: "Docs", href: "/docs", isCurrentPage: false },
      { label: "Components", href: "/docs/components", isCurrentPage: false },
      { label: "Button", href: undefined, isCurrentPage: true },
    ]);
  });

  it("renders dynamic breadcrumbs from pathname", () => {
    render(<Breadcrumbs pathname="/dashboard/settings/profile" />);
    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
