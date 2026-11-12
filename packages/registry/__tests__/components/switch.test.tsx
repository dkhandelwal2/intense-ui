import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Switch } from "../../src/components/switch";

describe("Switch Component", () => {
  it("renders with role switch and correct initial aria-checked state", () => {
    render(<Switch checked={false} onChange={vi.fn()} />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeInTheDocument();
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with toggled value when clicked", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("supports multiple visual variants (pill, cutout, rocker, capsule-text)", () => {
    const { rerender } = render(<Switch checked={true} onChange={vi.fn()} variant="pill" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();

    rerender(<Switch checked={true} onChange={vi.fn()} variant="cutout" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();

    rerender(<Switch checked={true} onChange={vi.fn()} variant="capsule-text" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("disables interaction when disabled prop is true", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} disabled />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeDisabled();
    fireEvent.click(sw);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
