import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Skeleton, CodeSkeleton } from "../../src/components/skeleton";

describe("Skeleton Component", () => {
  it("renders with status role and polite aria-live", () => {
    render(<Skeleton data-testid="skel" />);
    const skel = screen.getByRole("status", { name: /loading/i });
    expect(skel).toBeInTheDocument();
    expect(skel).toHaveAttribute("aria-live", "polite");
    expect(skel.className).toContain("animate-pulse");
  });

  it("applies shimmer styling when variant is shimmer", () => {
    render(<Skeleton variant="shimmer" />);
    const skel = screen.getByRole("status", { name: /loading/i });
    expect(skel.className).toContain("before:animate-[shimmer_2s_infinite]");
  });

  it("renders CodeSkeleton with custom line count", () => {
    const { container } = render(<CodeSkeleton lines={3} />);
    const codeWrapper = screen.getByRole("status", { name: /loading code/i });
    expect(codeWrapper).toBeInTheDocument();
    const bars = container.querySelectorAll(".h-4");
    expect(bars.length).toBe(3);
  });

  it("renders CodeSkeleton with default 5 lines", () => {
    const { container } = render(<CodeSkeleton />);
    const bars = container.querySelectorAll(".h-4");
    expect(bars.length).toBe(5);
  });
});
