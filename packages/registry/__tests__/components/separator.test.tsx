import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Separator } from "../../src/components/separator";

describe("Separator Component", () => {
  it("renders with separator role and default horizontal orientation", () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByRole("separator");
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute("aria-orientation", "horizontal");
    expect(sep.className).toContain("h-[1px]");
    expect(sep.className).toContain("w-full");
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep.className).toContain("w-[1px]");
    expect(sep.className).toContain("h-full");
  });

  it("applies subtle variant classes", () => {
    render(<Separator variant="subtle" />);
    const sep = screen.getByRole("separator");
    expect(sep.className).toContain("bg-black/10");
  });

  it("applies dashed variant classes", () => {
    render(<Separator variant="dashed" orientation="horizontal" />);
    const sep = screen.getByRole("separator");
    expect(sep.className).toContain("border-dashed");
  });

  it("applies glow shadow when glow is enabled", () => {
    render(<Separator glow />);
    const sep = screen.getByRole("separator");
    expect(sep.className).toContain("shadow-");
  });
});
