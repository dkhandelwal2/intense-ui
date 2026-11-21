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
  maxEvents: number;
  showHeader: boolean;
  showTabs: boolean;
  showLegend: boolean;
  showYearSelector: boolean;
  showStreaks: boolean;
  showBreakdown: boolean;
  showFullYear?: boolean;
}

export const DEFAULT_GITHUB_ACTIVITY_PROPS: GithubActivityCustomProps = {
  variant: "compact",
  theme: "github",
  mode: "2d",
  username: "octocat",
  year: 2026,
  dotSize: "md",
  weeksCount: 52,
  maxEvents: 6,
  showHeader: true,
  showTabs: true,
  showLegend: true,
  showYearSelector: true,
  showStreaks: true,
  showBreakdown: true,
  showFullYear: false,
};
