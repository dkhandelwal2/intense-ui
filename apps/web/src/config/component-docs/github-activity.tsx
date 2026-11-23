import React from "react";
import { ComponentDocData } from "./types";

export const GITHUB_ACTIVITY_USAGE = `"use client";

import {
  GithubActivity,
  GithubActivityHeatmap,
  GithubActivityTimeline,
  GithubActivityStats,
} from "@/components/ui/github-activity";

export default function GithubActivityDemo() {
  return (
    <div className="w-full max-w-4xl space-y-8 p-6">
      {/* 1. Full Suite Bento with Profile Header, Live API Fetch & Tab Switching */}
      <GithubActivity
        username="octocat"
        variant="compact"
        theme="github"
        weeksCount={52}
        showTabs
      />

      {/* 2. Standalone Contribution Heatmap Matrix */}
      <GithubActivityHeatmap
        username="octocat"
        weeksCount={26}
        theme="emerald"
        showLegend
        showMonthLabels
      />

      {/* 3. Live Activity Stream Timeline */}
      <GithubActivityTimeline
        username="octocat"
        limit={10}
        showFilter
      />

      {/* 4. Metric Streaks & Distribution Stats Card */}
      <GithubActivityStats
        username="octocat"
        theme="purple"
      />
    </div>
  );
}`;

export const githubActivityDoc: ComponentDocData = {
  usageCode: GITHUB_ACTIVITY_USAGE,
  codeContent: GITHUB_ACTIVITY_USAGE,
  codes: {
    suite: `"use client";\n\nimport { GithubActivity } from "@/components/ui/github-activity";\n\nexport default function FullSuiteActivityDemo() {\n  return (\n    <div className="w-full max-w-4xl p-4">\n      <GithubActivity\n        username="octocat"\n        variant="compact"\n        theme="github"\n        weeksCount={52}\n        showTabs\n        showStreaks\n      />\n    </div>\n  );\n}`,
    heatmap: `"use client";\n\nimport { GithubActivityHeatmap } from "@/components/ui/github-activity";\n\nexport default function HeatmapActivityDemo() {\n  return (\n    <div className="w-full max-w-4xl p-4">\n      <GithubActivityHeatmap\n        username="octocat"\n        weeksCount={52}\n        theme="github"\n        showYearSelector\n        showMonthLabels\n        showDayLabels\n        showLegend\n        showTotalCount\n      />\n    </div>\n  );\n}`,
    timeline: `"use client";\n\nimport { GithubActivityTimeline } from "@/components/ui/github-activity";\n\nexport default function TimelineActivityDemo() {\n  return (\n    <div className="w-full max-w-2xl p-4">\n      <GithubActivityTimeline\n        username="octocat"\n        maxEvents={10}\n        showFilter\n        showCopySha\n      />\n    </div>\n  );\n}`,
    stats: `"use client";\n\nimport { GithubActivityStats } from "@/components/ui/github-activity";\n\nexport default function StatsActivityDemo() {\n  return (\n    <div className="w-full max-w-2xl p-4">\n      <GithubActivityStats\n        username="octocat"\n        theme="github"\n        showBreakdown\n        showStreaks\n      />\n    </div>\n  );\n}`,
  },
  tocItems: [
    {
      id: "suite",
      label: "Full Suite",
      icon: (
        <span role="img" aria-label="Full Suite Bento" className="inline-flex items-center justify-center select-none leading-none">
          🐙
        </span>
      ),
    },
    {
      id: "heatmap",
      label: "Heatmap",
      icon: (
        <span role="img" aria-label="Heatmap Matrix" className="inline-flex items-center justify-center select-none leading-none">
          🟩
        </span>
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: (
        <span role="img" aria-label="Activity Stream" className="inline-flex items-center justify-center select-none leading-none">
          ⚡
        </span>
      ),
    },
    {
      id: "stats",
      label: "Stats",
      icon: (
        <span role="img" aria-label="Metric Stats" className="inline-flex items-center justify-center select-none leading-none">
          📈
        </span>
      ),
    },
  ],
  dependencies: [
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "GithubActivity Props (Root Container)",
      props: [
        { prop: "username", type: "string", defaultValue: '"octocat"', description: "GitHub username to fetch public activity and events from." },
        { prop: "variant", type: '"compact" | "heatmap" | "timeline" | "stats"', defaultValue: '"compact"', description: "Visual display mode of the activity widget." },
        { prop: "mode", type: '"2d" | "3d"', defaultValue: '"2d"', description: "Heatmap visualization mode: 2D flat matrix or interactive 3D skyline canvas with orbit drag." },
        { prop: "showModeToggle", type: "boolean", defaultValue: "true", description: "Whether to render the 2D flat / 3D skyline view mode switcher toggle buttons." },
        { prop: "theme", type: '"github" | "emerald" | "cyan" | "amber" | "purple" | "rose" | "monochrome"', defaultValue: '"github"', description: "Color theme for activity levels and accent indicators." },
        { prop: "year", type: "number", defaultValue: "2026", description: "Target year for contribution query (e.g. 2026, 2025, 2024)." },
        { prop: "showFullYear", type: "boolean", defaultValue: "false", description: "Displays full calendar year (Jan 1 to Dec 31) with visible future dots instead of rolling past year." },
        { prop: "showYearSelector", type: "boolean", defaultValue: "true", description: "Renders interactive segmented year picker pills." },
        { prop: "showHeader", type: "boolean", defaultValue: "true", description: "Whether to display the user profile info and header bar." },
        { prop: "showStreaks", type: "boolean", defaultValue: "true", description: "Whether to render current streak badges in the container footer." },
        { prop: "weeksCount", type: "number", defaultValue: "52", description: "Number of calendar weeks to render (e.g. 12, 26, 52)." },
        { prop: "dotSize", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size of contribution dots and aligned day labels (sm: 10px, md: 13px, lg: 17px)." },
        { prop: "showLegend", type: "boolean", defaultValue: "true", description: "Whether to render the Less -> More activity level legend." },
        { prop: "showMonthLabels", type: "boolean", defaultValue: "true", description: "Whether to render month name headers above the heatmap." },
        { prop: "showSummary", type: "boolean", defaultValue: "true", description: "Displays total contributions and date range summary bar." },
        { prop: "showTabs", type: "boolean", defaultValue: "true", description: "Enables interactive tab switcher between Heatmap, Timeline, and Stats." },
        { prop: "eventsLimit", type: "number", defaultValue: "10", description: "Maximum number of events to render in activity stream." },
        { prop: "data", type: "GithubContributionDay[]", defaultValue: "-", description: "Explicit custom contribution calendar days array (bypasses API fetch)." },
        { prop: "events", type: "GithubActivityEvent[]", defaultValue: "-", description: "Explicit custom activity events stream array." },
        { prop: "stats", type: "GithubActivityStatsData", defaultValue: "-", description: "Explicit custom stats numbers (streaks, totals, breakdown)." },
        { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind CSS classes for root wrapper." },
      ],
    },
    {
      title: "GithubActivityHeatmap Props",
      props: [
        { prop: "username", type: "string", defaultValue: '"octocat"', description: "GitHub username for data fetching fallback." },
        { prop: "mode", type: '"2d" | "3d"', defaultValue: '"2d"', description: "2D flat heat map matrix or 3D skyline isometric canvas." },
        { prop: "showModeToggle", type: "boolean", defaultValue: "true", description: "Whether to render 2D flat / 3D skyline mode toggle buttons." },
        { prop: "weeksCount", type: "number", defaultValue: "52", description: "Number of weeks displayed." },
        { prop: "showFullYear", type: "boolean", defaultValue: "false", description: "Displays full calendar year (Jan 1 to Dec 31) with visible empty dots through Dec 31." },
        { prop: "dotSize", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Contribution square size and aligned day label height." },
        { prop: "theme", type: "GithubActivityTheme", defaultValue: '"github"', description: "Heatmap cell fill theme." },
        { prop: "showLegend", type: "boolean", defaultValue: "true", description: "Shows level legend." },
        { prop: "showStreaks", type: "boolean", defaultValue: "true", description: "Shows streak badges in footer." },
        { prop: "showMonthLabels", type: "boolean", defaultValue: "true", description: "Shows month headers." },
        { prop: "onDayClick", type: "(day: GithubContributionDay) => void", defaultValue: "-", description: "Callback triggered when a day cell is clicked." },
      ],
    },
    {
      title: "GithubActivityTimeline Props",
      props: [
        { prop: "username", type: "string", defaultValue: '"octocat"', description: "GitHub username." },
        { prop: "limit", type: "number", defaultValue: "10", description: "Max count of events shown." },
        { prop: "showFilter", type: "boolean", defaultValue: "true", description: "Shows event type filter tabs." },
        { prop: "theme", type: "GithubActivityTheme", defaultValue: '"github"', description: "Badge color theme." },
      ],
    },
    {
      title: "GithubActivityStats Props",
      props: [
        { prop: "username", type: "string", defaultValue: '"octocat"', description: "GitHub username." },
        { prop: "theme", type: "GithubActivityTheme", defaultValue: '"github"', description: "Accent color theme." },
      ],
    },
  ],
};
