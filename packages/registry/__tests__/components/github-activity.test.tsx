import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  GithubActivity,
  GithubActivityHeatmap,
  GithubActivityTimeline,
  GithubActivityStats,
} from "../../src/components/github-activity";
import type {
  GithubContributionDay,
  GithubActivityEvent,
  GithubActivityStats as StatsType,
} from "../../src/components/github-activity";

const mockDays: GithubContributionDay[] = [
  { date: "2024-01-01", count: 0, level: 0 },
  { date: "2024-01-02", count: 3, level: 1 },
  { date: "2024-01-03", count: 7, level: 2 },
  { date: "2024-01-04", count: 12, level: 3 },
  { date: "2024-01-05", count: 20, level: 4 },
  { date: "2024-01-06", count: 5, level: 2 },
  { date: "2024-01-07", count: 1, level: 1 },
];

const mockEvents: GithubActivityEvent[] = [
  {
    id: "evt-1",
    type: "commit",
    repo: "octocat/Hello-World",
    message: "feat: add super cool feature",
    timestamp: "2 hours ago",
    sha: "a1b2c3d",
  },
  {
    id: "evt-2",
    type: "pull_request",
    repo: "octocat/Spoon-Knife",
    message: "fix: resolve memory leak in pipeline",
    timestamp: "1 day ago",
    prNumber: 42,
  },
];

const mockStats: StatsType = {
  totalContributions: 1420,
  currentStreak: 21,
  longestStreak: 45,
  commitsCount: 850,
  prsCount: 120,
  issuesCount: 35,
  reviewsCount: 90,
};

describe("GithubActivity Component Suite", () => {
  it("renders full suite bento with header and switches tabs", () => {
    render(
      <GithubActivity
        username="octocat"
        variant="compact"
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
        showTabs
      />
    );

    expect(screen.getByRole("heading", { name: /octocat/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /heatmap/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /timeline/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /stats/i })).toBeInTheDocument();

    // Default tab is Heatmap
    expect(screen.getByText("Less")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();

    // Switch to Activity Stream tab
    fireEvent.click(screen.getByRole("tab", { name: /timeline/i }));
    expect(screen.getByText("feat: add super cool feature")).toBeInTheDocument();
    expect(screen.getByText("octocat/Hello-World")).toBeInTheDocument();

    // Switch to Stats tab
    fireEvent.click(screen.getByRole("tab", { name: /stats/i }));
    expect(screen.getByText("1,420")).toBeInTheDocument();
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("renders standalone GithubActivityHeatmap and triggers onDayClick", () => {
    const handleDayClick = vi.fn();
    render(
      <GithubActivityHeatmap
        contributions={mockDays}
        weeksCount={1}
        theme="emerald"
        showLegend
        showMonthLabels
        onDayClick={handleDayClick}
      />
    );

    const activeCell = screen.getByTitle("20 contributions on January 5th, 2024");
    expect(activeCell).toBeInTheDocument();

    fireEvent.click(activeCell);
    expect(handleDayClick).toHaveBeenCalledWith(
      expect.objectContaining({
        date: "2024-01-05",
        count: 20,
        level: 4,
      })
    );
  });

  it("renders standalone GithubActivityTimeline and filters events", () => {
    render(
      <GithubActivityTimeline
        events={mockEvents}
        showFilter
      />
    );

    expect(screen.getByText("feat: add super cool feature")).toBeInTheDocument();
    expect(screen.getByText("fix: resolve memory leak in pipeline")).toBeInTheDocument();

    // Open curtain filter and select Commits
    const filterTrigger = screen.getByRole("button", { name: /filter activity/i });
    fireEvent.click(filterTrigger);
    const commitsFilter = screen.getByRole("button", { name: /commits/i });
    fireEvent.click(commitsFilter);
    expect(screen.getByText("feat: add super cool feature")).toBeInTheDocument();
    expect(screen.queryByText("fix: resolve memory leak in pipeline")).not.toBeInTheDocument();
  });

  it("searches recent activity items in real-time and clears search query", () => {
    render(
      <GithubActivityTimeline
        events={mockEvents}
        showFilter
        showSearch
      />
    );

    const searchInput = screen.getByRole("textbox", { name: /search recent activity/i });
    expect(searchInput).toBeInTheDocument();

    // Type "memory leak"
    fireEvent.change(searchInput, { target: { value: "memory leak" } });
    expect(screen.getByText("memory leak")).toBeInTheDocument();
    expect(screen.getByText("memory leak").tagName.toLowerCase()).toBe("mark");
    expect(screen.queryByText("feat: add super cool feature")).not.toBeInTheDocument();

    // Type query with no match
    fireEvent.change(searchInput, { target: { value: "nonexistent-query-xyz" } });
    expect(screen.getByText(/no activity found matching/i)).toBeInTheDocument();

    // Click "Clear search" button
    const clearBtns = screen.getAllByRole("button", { name: /clear search/i });
    expect(clearBtns.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(clearBtns[0]);
    expect(screen.getByText("feat: add super cool feature")).toBeInTheDocument();
    expect(screen.getByText("fix: resolve memory leak in pipeline")).toBeInTheDocument();
  });

  it("sorts recent activity items by latest / oldest inside filter dropdown", () => {
    const { container } = render(
      <GithubActivityTimeline
        events={mockEvents}
        showSort
        showFilter
      />
    );

    // Initial default: Latest first (evt-1 before evt-2)
    const getEventTitles = () =>
      Array.from(container.querySelectorAll("p")).map((el) => el.textContent?.trim());

    expect(getEventTitles()).toEqual([
      "feat: add super cool feature",
      "fix: resolve memory leak in pipeline",
    ]);

    // Open filter dropdown
    const filterBtn = screen.getByRole("button", { name: /filter activity/i });
    fireEvent.click(filterBtn);

    // Click "Oldest" sort button inside filter dropdown
    const oldestBtn = screen.getByRole("button", { name: /oldest/i });
    expect(oldestBtn).toBeInTheDocument();
    fireEvent.click(oldestBtn);

    // Now evt-2 ("1 day ago") should come before evt-1 ("2 hours ago")
    expect(getEventTitles()).toEqual([
      "fix: resolve memory leak in pipeline",
      "feat: add super cool feature",
    ]);

    // Click "Latest" sort button inside filter dropdown
    const latestBtn = screen.getByRole("button", { name: /latest/i });
    fireEvent.click(latestBtn);
    expect(getEventTitles()).toEqual([
      "feat: add super cool feature",
      "fix: resolve memory leak in pipeline",
    ]);
  });

  it("renders year selector buttons on the right side and triggers onYearChange", () => {
    const handleYearChange = vi.fn();
    render(
      <GithubActivityHeatmap
        year={2026}
        years={[2026, 2025, 2024]}
        onYearChange={handleYearChange}
        showYearSelector
      />
    );

    const button2025 = screen.getByRole("button", { name: "2025" });
    expect(button2025).toBeInTheDocument();
    fireEvent.click(button2025);
    expect(handleYearChange).toHaveBeenCalledWith(2025);
  });

  it("renders standalone GithubActivityStats with streaks and breakdown bars", () => {
    render(
      <GithubActivityStats
        stats={mockStats}
      />
    );

    expect(screen.getByText("1,420")).toBeInTheDocument();
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("Commits")).toBeInTheDocument();
    expect(screen.getByText(/Pull Requests/i)).toBeInTheDocument();

    // Click on Pull Requests in breakdown
    const prSegment = screen.getByRole("button", { name: /highlight pull requests/i });
    fireEvent.click(prSegment);

    // Pull Requests card is now highlighted with active status
    expect(screen.getByText("Merged PRs")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();

    // Other boxes (e.g. Total) receive blur class
    const totalBtn = screen.getByRole("button", { name: /total/i });
    expect(totalBtn.className).toContain("blur-[1.5px]");
  });

  it("renders shimmering skeleton loaders when isLoading is true", () => {
    const { container } = render(
      <GithubActivity
        username="octocat"
        isLoading
        showTabs
      />
    );

    // Should not render the real/mock numbers or real profile
    expect(screen.queryByText("octocat")).not.toBeInTheDocument();
    // Skeleton pulsating elements should be present
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBeGreaterThan(5);
  });

  it("changes week range without triggering loading state and slices columns correctly", () => {
    const { rerender, container } = render(
      <GithubActivity
        username="octocat"
        variant="heatmap"
        weeksCount={52}
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
      />
    );

    expect(screen.getByTitle("20 contributions on January 5th, 2024")).toBeInTheDocument();
    expect(container.querySelectorAll(".bg-zinc-200.animate-pulse").length).toBe(0);

    // Switch to 12 weeks
    rerender(
      <GithubActivity
        username="octocat"
        variant="heatmap"
        weeksCount={12}
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
      />
    );

    expect(screen.getByTitle("20 contributions on January 5th, 2024")).toBeInTheDocument();
    expect(container.querySelectorAll(".bg-zinc-200.animate-pulse").length).toBe(0);
  });

  it("toggles streak badges visibility when showStreaks changes", () => {
    const { rerender } = render(
      <GithubActivity
        username="octocat"
        variant="compact"
        showHeader
        showStreaks={false}
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
      />
    );

    expect(screen.queryByText(/21d streak/i)).not.toBeInTheDocument();

    rerender(
      <GithubActivity
        username="octocat"
        variant="compact"
        showHeader
        showStreaks={true}
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
      />
    );

    expect(screen.getByText(/21d streak/i)).toBeInTheDocument();
  });

  it("renders with custom dotSize and aligns day labels", () => {
    const { container: smContainer } = render(
      <GithubActivityHeatmap contributions={mockDays} dotSize="sm" />
    );
    expect(smContainer.querySelector(".w-2\\.5")).toBeInTheDocument();

    const { container: lgContainer } = render(
      <GithubActivityHeatmap contributions={mockDays} dotSize="lg" />
    );
    expect(lgContainer.querySelector(".w-4")).toBeInTheDocument();
  });

  it("supports showFullYear prop to render full calendar year through Dec 31", () => {
    render(<GithubActivityHeatmap year={2026} showFullYear={true} />);
    expect(screen.getAllByText(/contributions in 2026/i)[0]).toBeInTheDocument();
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Dec")).toBeInTheDocument();
    expect(screen.getByTitle(/on December 31st, 2026/i)).toBeInTheDocument();
  });

  it("shows past year by default in rolling mode and switches to full year on year change", () => {
    render(<GithubActivityHeatmap />);
    expect(screen.getAllByText(/contributions in the past year/i)[0]).toBeInTheDocument();

    const year2025 = screen.getByRole("button", { name: "2025" });
    fireEvent.click(year2025);

    expect(screen.getAllByText(/contributions in 2025/i)[0]).toBeInTheDocument();
  });

  it("supports staticIcons and animatedIcons props to disable continuous icon animations", () => {
    const { container: staticContainer } = render(
      <GithubActivity
        username="octocat"
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
        staticIcons={true}
      />
    );
    expect(staticContainer.querySelector("svg")).toBeInTheDocument();

    const { container: nonAnimatedContainer } = render(
      <GithubActivity
        username="octocat"
        data={{
          contributions: mockDays,
          events: mockEvents,
          stats: mockStats,
        }}
        animatedIcons={false}
      />
    );
    expect(nonAnimatedContainer.querySelector("svg")).toBeInTheDocument();
  });
});
