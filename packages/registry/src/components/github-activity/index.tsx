"use client";

export { GithubActivity } from "./github-activity";
export { GithubActivityHeatmap } from "./github-activity-heatmap";
export { GithubActivity3D } from "./github-activity-3d";
export { GithubActivity2DMatrix } from "./github-activity-2d-matrix";
export { GithubActivityTimeline } from "./github-activity-timeline";
export { GithubActivityStats } from "./github-activity-stats";
export { GithubActivityStatsCards } from "./github-activity-stats-cards";
export { GithubActivityStatsHero } from "./github-activity-stats-hero";
export { GithubActivityInfoTooltip } from "./github-activity-info-tooltip";
export { GithubActivityLegend } from "./github-activity-legend";
export { GithubActivityEventItem } from "./github-activity-event-item";
export { GithubActivityHeader } from "./github-activity-header";
export { GithubActivityHeaderNav } from "./github-activity-header-nav";
export { GithubActivityYearSelect } from "./github-activity-year-select";
export { GithubActivityTimelineFilter } from "./github-activity-timeline-filter";
export { GithubActivityTimelineSearch } from "./github-activity-timeline-search";
export { GithubActivityCurtain } from "./github-activity-curtain";
export { GithubActivityPulseIcon } from "@/assets/svg";

// Semantic Aliases
export { GithubActivityHeatmap as GithubHeatmap } from "./github-activity-heatmap";
export { GithubActivityTimeline as GithubTimeline } from "./github-activity-timeline";
export { GithubActivityStats as GithubStats } from "./github-activity-stats";
export { GithubActivity as GithubContributionGraph } from "./github-activity";

// Configuration (from global @/config)
export * from "@/config/github-activity";

// Hooks (from global @/hooks)
export { useGithubActivity } from "@/hooks/use-github-activity";

export * from "./types";
export * from "./constants";
export * from "./github-activity-helpers";
