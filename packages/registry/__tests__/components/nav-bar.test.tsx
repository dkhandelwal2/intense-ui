import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  Navbar,
  NavbarGooey,
  NavbarFloating,
  NavbarLink,
} from "../../src/components/nav-bar";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "/docs" },
  { id: "components", label: "Components", href: "/components" },
  { id: "disabled-item", label: "Disabled", disabled: true },
];

describe("Navbar Components", () => {
  it("renders basic Navbar wrapper element", () => {
    render(<Navbar aria-label="Main Navigation"><div>Logo</div></Navbar>);
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders NavbarGooey items and handles selection", () => {
    const handleSelect = vi.fn();
    render(<NavbarGooey items={NAV_ITEMS} onSelect={handleSelect} defaultActiveId="home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Docs"));
    expect(handleSelect).toHaveBeenCalledWith("docs");
  });

  it("does not select disabled item in NavbarGooey", () => {
    const handleSelect = vi.fn();
    render(<NavbarGooey items={NAV_ITEMS} onSelect={handleSelect} defaultActiveId="home" />);

    fireEvent.click(screen.getByText("Disabled"));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("renders NavbarFloating items", () => {
    const handleSelect = vi.fn();
    render(<NavbarFloating items={NAV_ITEMS} onSelect={handleSelect} />);

    expect(screen.getByText("Components")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Components"));
    expect(handleSelect).toHaveBeenCalledWith("components");
  });

  it("renders NavbarLink with correct href", () => {
    render(<NavbarLink href="/about">About Us</NavbarLink>);
    const link = screen.getByRole("link", { name: /about us/i });
    expect(link).toHaveAttribute("href", "/about");
  });
});
