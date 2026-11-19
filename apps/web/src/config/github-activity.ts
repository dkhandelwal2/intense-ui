import type {
  GithubActivityHeatmapConfig,
  GithubActivityTimelineConfig,
  GithubActivityStatsConfig,
  GithubActivityConfig,
} from "@/components/ui/github-activity";

/**
 * Initial configuration for the Contribution Heatmap variant
 */
export const GITHUB_ACTIVITY_HEATMAP_CONFIG: GithubActivityHeatmapConfig = {
  theme: "github",
  weeksCount: 52,
  dotSize: "md",
  showMonthLabels: true,
  showDayLabels: true,
  showLegend: true,
  showTotalCount: true,
};

/**
 * Initial configuration for the Event Timeline / Activity Stream variant
 */
export const GITHUB_ACTIVITY_TIMELINE_CONFIG: GithubActivityTimelineConfig = {
  maxEvents: 8,
  showFilter: true,
  showCopySha: true,
};

/**
 * Initial configuration for the Metric Stats & Productivity variant
 */
export const GITHUB_ACTIVITY_STATS_CONFIG: GithubActivityStatsConfig = {
  showBreakdown: true,
  showStreaks: true,
  theme: "github",
};

/**
 * Master configuration defaults for the root GithubActivity component
 */
export const GITHUB_ACTIVITY_CONFIG: GithubActivityConfig = {
  variant: "heatmap",
  theme: "github",
  username: "octocat",
  dotSize: "md",
  weeksCount: 52,
  maxEvents: 8,
  showHeader: true,
  showTabs: true,
};
