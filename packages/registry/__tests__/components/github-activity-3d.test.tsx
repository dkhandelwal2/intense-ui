import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  GithubActivity,
  GithubActivityHeatmap,
  GithubActivity3D,
} from "../../src/components/github-activity";
import { resolveGithubTheme } from "../../src/components/github-activity/github-activity-theme-helpers";
import { resolve3DThemeColors } from "../../src/components/github-activity/github-activity-3d-helpers";

describe("GithubActivity 3D Skyline Mode", () => {
  it("defaults to 2d mode with 2D toggle button pressed", () => {
    render(<GithubActivityHeatmap />);
    const btn2d = screen.getByRole("button", { name: "Flat heat map" });
    const btn3d = screen.getByRole("button", { name: "3D skyline" });
    expect(btn2d).toHaveAttribute("aria-pressed", "true");
    expect(btn3d).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByLabelText(/shown as a 3D skyline/i)).not.toBeInTheDocument();
  });

  it("renders 3D canvas and orbit instructions when mode='3d'", () => {
    render(<GithubActivityHeatmap mode="3d" />);
    const btn3d = screen.getByRole("button", { name: "3D skyline" });
    expect(btn3d).toHaveAttribute("aria-pressed", "true");
    const canvas = screen.getByRole("img", { name: /shown as a 3D skyline/i });
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText(/drag to (orbit|surface)|(double-click|tap twice) to reset/i)).toBeInTheDocument();
  });

  it("switches from 2D to 3D and back using header toggle buttons", () => {
    render(<GithubActivityHeatmap />);
    expect(screen.queryByRole("img", { name: /shown as a 3D skyline/i })).not.toBeInTheDocument();

    const btn3d = screen.getByRole("button", { name: "3D skyline" });
    fireEvent.click(btn3d);
    expect(btn3d).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: /shown as a 3D skyline/i })).toBeInTheDocument();

    const btn2d = screen.getByRole("button", { name: "Flat heat map" });
    fireEvent.click(btn2d);
    expect(btn2d).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("img", { name: /shown as a 3D skyline/i })).not.toBeInTheDocument();
  });

  it("forwards mode prop through root GithubActivity component", () => {
    render(<GithubActivity mode="3d" />);
    expect(screen.getByRole("img", { name: /shown as a 3D skyline/i })).toBeInTheDocument();
  });

  it("renders standalone GithubActivity3D component cleanly", () => {
    const mockWeeks = [
      [
        { date: "2026-01-01", count: 2, level: 1 as const },
        { date: "2026-01-02", count: 5, level: 2 as const },
      ],
    ];
    render(<GithubActivity3D weeks={mockWeeks} theme="emerald" />);
    expect(screen.getByRole("img", { name: /shown as a 3D skyline/i })).toBeInTheDocument();
  });

  it("observes and adapts to theme mode mutations on documentElement", () => {
    const mockWeeks = [
      [
        { date: "2026-01-01", count: 2, level: 1 as const },
      ],
    ];
    render(<GithubActivity3D weeks={mockWeeks} theme="github" />);
    document.documentElement.classList.add("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    document.documentElement.classList.remove("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("accepts and re-renders when dotSize changes (sm, md, lg)", () => {
    const mockWeeks = [
      [
        { date: "2026-01-01", count: 2, level: 1 as const },
      ],
    ];
    const { rerender } = render(<GithubActivity3D weeks={mockWeeks} dotSize="sm" />);
    expect(screen.getByRole("img", { name: /shown as a 3D skyline/i })).toBeInTheDocument();

    rerender(<GithubActivity3D weeks={mockWeeks} dotSize="lg" />);
    expect(screen.getByRole("img", { name: /shown as a 3D skyline/i })).toBeInTheDocument();
  });

  it("supports custom hex theme colors in both 2D CSS vars and 3D palettes", () => {
    const resolved2D = resolveGithubTheme("#ff0084");
    expect(resolved2D.themeStyle).toBeDefined();
    expect((resolved2D.themeStyle as Record<string, string>)["--gh-d4"]).toBe("#ff0084");

    const colors3DLight = resolve3DThemeColors("#ff0084", false);
    const colors3DDark = resolve3DThemeColors("#ff0084", true);
    expect(colors3DLight).toHaveLength(5);
    expect(colors3DDark).toHaveLength(5);
    expect(colors3DDark[4]).toBe("#ff0084");
  });
});
