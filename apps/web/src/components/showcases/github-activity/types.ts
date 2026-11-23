import {
  GithubActivityVariant,
  GithubActivityTheme,
  GithubActivityMode,
} from "@/components/ui/github-activity";

export interface GithubActivityCustomProps {
  variant: GithubActivityVariant;
  theme: GithubActivityTheme;
  mode?: GithubActivityMode;
  username: string;
  year: number;
  dotSize?: "sm" | "md" | "lg";
  weeksCount: number;
  maxEvents?: number;
  showHeader: boolean;
  showTabs: boolean;
  showLegend: boolean;
  showYearSelector: boolean;
  showModeToggle: boolean;
  showStreaks: boolean;
  showBreakdown: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  showFullYear?: boolean;
  staticIcons?: boolean;
  activeTab?: GithubActivityVariant;
}

export const DEFAULT_GITHUB_ACTIVITY_PROPS: GithubActivityCustomProps = {
  variant: "compact",
  theme: "github",
  mode: "2d",
  username: "octocat",
  year: 2026,
  dotSize: "md",
  weeksCount: 52,
  showHeader: true,
  showTabs: true,
  showLegend: true,
  showYearSelector: true,
  showModeToggle: true,
  showStreaks: true,
  showBreakdown: true,
  showSearch: true,
  showFilter: true,
  showSort: true,
  showFullYear: false,
  staticIcons: false,
  activeTab: "heatmap",
};
