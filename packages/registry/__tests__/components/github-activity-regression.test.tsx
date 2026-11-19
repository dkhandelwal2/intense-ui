import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  GithubActivity,
  GithubActivityHeatmap,
  GithubActivityStats,
} from "../../src/components/github-activity";
import type {
  GithubContributionDay,
  GithubActivityEvent,
  GithubActivityStats as StatsType,
} from "../../src/components/github-activity";

const mockDays: GithubContributionDay[] = [
  { date: "2025-01-01", count: 2, level: 1 },
  { date: "2025-06-15", count: 5, level: 2 },
  { date: "2025-12-31", count: 10, level: 3 },
  { date: "2026-11-19", count: 4, level: 2 },
];

const mockEvents: GithubActivityEvent[] = [
  { id: "e1", type: "commit", repo: "test/repo", message: "fix: align Thursday", timestamp: "1h ago" },
  { id: "e2", type: "pull_request", repo: "test/repo", message: "feat: add regression tests", timestamp: "2h ago" },
];

const mockStats: StatsType = {
  totalContributions: 580,
  currentStreak: 12,
  longestStreak: 37,
  commitsCount: 420,
  prsCount: 75,
  issuesCount: 47,
  reviewsCount: 38,
};

describe("GithubActivity Bug Regression Tests", () => {
  it("Bug Fix 1: past year (2025) starts from January and ends in December with 'in 2025' header", () => {
    render(<GithubActivityHeatmap year={2025} showFullYear={false} contributions={mockDays} />);
    expect(screen.getAllByText(/contributions in 2025/i)[0]).toBeInTheDocument();
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Dec")).toBeInTheDocument();
    expect(screen.getByTitle(/on January 1st, 2025/i)).toBeInTheDocument();
    expect(screen.getByTitle(/on December 31st, 2025/i)).toBeInTheDocument();
  });

  it("Bug Fix 2: aligns Thursday (2026-11-19) to row index 4, not Saturday or Sunday", () => {
    render(<GithubActivityHeatmap year={2026} showFullYear={true} contributions={mockDays} />);
    const thuDot = screen.getByTitle(/on November 19th, 2026/i);
    expect(thuDot).toBeInTheDocument();
    const column = thuDot.parentElement;
    expect(column).not.toBeNull();
    const children = Array.from(column?.children || []);
    expect(children.indexOf(thuDot)).toBe(4);
  });

  it("Bug Fix 3: day labels have sufficient container width (w-8) and padding (pr-2) to prevent truncation", () => {
    const { container } = render(<GithubActivityHeatmap showDayLabels={true} />);
    const dayLabelCol = container.querySelector(".w-8");
    expect(dayLabelCol).toBeInTheDocument();
    expect(dayLabelCol?.className).toContain("pr-2");
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });

  it("Bug Fix 4: maintains unbreakable min-gap on mobile and expands with justify-between on desktop", () => {
    const { container } = render(<GithubActivityHeatmap weeksCount={52} />);
    const matrixRows = container.querySelectorAll(".flex-1.pl-2");
    const matrixRow = matrixRows[1] || matrixRows[0];
    expect(matrixRow).toBeInTheDocument();
    expect(matrixRow?.className).toContain("gap-[2px]");
    expect(matrixRow?.className).toContain("justify-between");
  });

  it("Bug Fix 5: switching full year or week range does not trigger full skeleton wipe when data exists", () => {
    const { rerender, container } = render(
      <GithubActivity
        username="octocat"
        variant="heatmap"
        showFullYear={false}
        data={{ contributions: mockDays, events: mockEvents, stats: mockStats }}
      />
    );
    expect(container.querySelectorAll(".bg-zinc-200.animate-pulse").length).toBe(0);

    rerender(
      <GithubActivity
        username="octocat"
        variant="heatmap"
        showFullYear={true}
        data={{ contributions: mockDays, events: mockEvents, stats: mockStats }}
      />
    );
    expect(container.querySelectorAll(".bg-zinc-200.animate-pulse").length).toBe(0);
  });

  it("Bug Fix 6: view transitions switch smoothly without full-screen colored curtain overlays", () => {
    const { container } = render(
      <GithubActivity
        username="octocat"
        variant="compact"
        data={{ contributions: mockDays, events: mockEvents, stats: mockStats }}
        showTabs
      />
    );
    fireEvent.click(screen.getByRole("tab", { name: /timeline/i }));
    expect(screen.getByText("fix: align Thursday")).toBeInTheDocument();
    expect(container.querySelector(".bg-emerald-600.inset-0")).toBeNull();
    expect(container.querySelector(".bg-indigo-600.inset-0")).toBeNull();
  });

  it("Bug Fix 7: clicking a breakdown category in stats view highlights it and blurs other cards", () => {
    render(<GithubActivityStats stats={mockStats} />);
    const reviewBtn = screen.getByRole("button", { name: /highlight reviews/i });
    fireEvent.click(reviewBtn);
    expect(screen.getByText("active")).toBeInTheDocument();
    const totalBox = screen.getByRole("button", { name: /total/i });
    expect(totalBox.className).toContain("blur-[1.5px]");
  });

  it("Bug Fix 8: when 26W or custom weeks is selected, renders the last N weeks with 'in the last N weeks' label", () => {
    render(<GithubActivityHeatmap weeksCount={26} contributions={mockDays} />);
    expect(screen.getAllByText(/in the last 26 weeks/i)[0]).toBeInTheDocument();
    expect(screen.getByTitle(/on November 19th, 2026/i)).toBeInTheDocument();
  });

  it("Bug Fix 9: in past year (2025), selecting 26 weeks slices the last 26 weeks of 2025 ending at Dec 31", () => {
    render(<GithubActivityHeatmap year={2025} weeksCount={26} contributions={mockDays} />);
    expect(screen.getAllByText(/in the last 26 weeks/i)[0]).toBeInTheDocument();
    expect(screen.getByTitle(/on December 31st, 2025/i)).toBeInTheDocument();
  });

  it("Bug Fix 10: 13W renders 13 weeks ending at today (Nov 19, 2026) with month labels aligned directly over columns", () => {
    const { container } = render(<GithubActivityHeatmap weeksCount={13} />);
    expect(screen.getAllByText(/in the last 13 weeks/i)[0]).toBeInTheDocument();
    // Today (Nov 19th) must be present in the last column
    expect(screen.getByTitle(/on November 19th, 2026/i)).toBeInTheDocument();
    // Month labels must be present in the month header aligned over their week columns
    expect(screen.getByText("Nov")).toBeInTheDocument();
    expect(screen.getByText("Oct")).toBeInTheDocument();
    expect(screen.getByText("Sep")).toBeInTheDocument();
    expect(screen.getByText("Aug")).toBeInTheDocument();
    // Month header row and dots row have identical column counts (13)
    const monthCols = container.querySelectorAll(".flex.pl-2.h-4 > div");
    const dotCols = container.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(monthCols.length).toBe(13);
    expect(dotCols.length).toBe(13);
  });

  it("Bug Fix 11: clamps custom weeksCount to min 1 and max 52", () => {
    const { container: cMax } = render(<GithubActivityHeatmap weeksCount={99} />);
    const dotColsMax = cMax.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(dotColsMax.length).toBeLessThanOrEqual(53);
    expect(screen.queryByText(/in the last 99 weeks/i)).toBeNull();

    const { container: cMin } = render(<GithubActivityHeatmap weeksCount={0} />);
    const dotColsMin = cMin.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(dotColsMin.length).toBe(1);
    expect(screen.getAllByText(/in the last 1 week$/i)[0]).toBeInTheDocument();
  });

  it("Bug Fix 12: when weeksCount is apart from 52W (e.g. 13W), full year is disabled and slices 13 weeks", () => {
    const { container } = render(<GithubActivityHeatmap weeksCount={13} showFullYear={true} />);
    const dotCols = container.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(dotCols.length).toBe(13);
    expect(screen.getAllByText(/in the last 13 weeks/i)[0]).toBeInTheDocument();
  });

  it("Bug Fix 13: week slices of 13 and 26 render exactly 13 and 26 columns without blanking", () => {
    const { container: c13 } = render(<GithubActivityHeatmap weeksCount={13} />);
    const dotCols13 = c13.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(dotCols13.length).toBe(13);

    const { container: c26 } = render(<GithubActivityHeatmap weeksCount={26} />);
    const dotCols26 = c26.querySelectorAll(".flex.items-start .flex.pl-2 > div");
    expect(dotCols26.length).toBe(26);
  });
});
