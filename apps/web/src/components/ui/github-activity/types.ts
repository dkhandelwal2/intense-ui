import React, { RefObject } from "react";

export type GithubActivityVariant = "heatmap" | "timeline" | "stats" | "compact";
export type GithubActivityPresetTheme = "github" | "emerald" | "cyan" | "amber" | "rose" | "purple" | "monochrome";
export type GithubActivityTheme = GithubActivityPresetTheme | (string & {});
export type GithubActivityMode = "2d" | "3d";
export type GithubContributionLevel = 0 | 1 | 2 | 3 | 4;
export type GithubEventType = "commit" | "pull_request" | "issue" | "release" | "star";
export type GithubEventStatus = "merged" | "open" | "closed";
export type GithubActivityDotSize = "sm" | "md" | "lg";
export type GithubActivitySortOrder = "desc" | "asc";

export interface GithubContributionDay { date: string; count: number; level: GithubContributionLevel; isFuture?: boolean; }

export interface GithubActivityEvent {
  id: string; type: GithubEventType; repo: string; message: string; timestamp: string;
  createdAt?: string; sha?: string; branch?: string; status?: GithubEventStatus;
  prNumber?: number; issueNumber?: number; additions?: number; deletions?: number; url?: string;
}

export interface GithubActivityStatsData {
  totalContributions: number; currentStreak: number; longestStreak: number;
  commitsCount: number; prsCount: number; issuesCount: number; reviewsCount: number; activeDaysCount?: number;
}
export type GithubActivityStatsModel = GithubActivityStatsData;

export interface GithubUserProfile {
  username: string; name?: string; avatarUrl?: string; bio?: string; company?: string;
  location?: string; profileUrl?: string; followers?: number; following?: number; publicRepos?: number; createdAt?: string;
}

export interface GithubActivityHeatmapProps {
  contributions?: GithubContributionDay[]; username?: string; theme?: GithubActivityTheme;
  mode?: GithubActivityMode; onModeChange?: (mode: GithubActivityMode) => void; weeksCount?: number;
  year?: number; years?: number[]; onYearChange?: (year: number) => void; showFullYear?: boolean;
  showYearSelector?: boolean; showControls?: boolean; showModeToggle?: boolean; showMonthLabels?: boolean;
  showDayLabels?: boolean; dotSize?: GithubActivityDotSize; showLegend?: boolean; showTotalCount?: boolean;
  showStreaks?: boolean; stats?: GithubActivityStatsData; isLoading?: boolean; staticIcons?: boolean;
  onDayClick?: (day: GithubContributionDay) => void; className?: string;
}

export interface GithubActivityTimelineProps {
  events?: GithubActivityEvent[]; username?: string; maxEvents?: number; showFilter?: boolean;
  showSearch?: boolean; showSort?: boolean; defaultSort?: GithubActivitySortOrder;
  defaultFilterOpen?: boolean; showCopySha?: boolean; isLoading?: boolean; staticIcons?: boolean; className?: string;
}

export interface GithubActivityTimelineSearchProps { value: string; onChange: (value: string) => void; placeholder?: string; staticIcons?: boolean; className?: string; }

export interface GithubActivityTimelineFilterProps {
  activeFilter: "all" | GithubEventType; onFilterChange: (filter: "all" | GithubEventType) => void;
  showSort?: boolean; sortOrder?: GithubActivitySortOrder; onSortOrderChange?: (order: GithubActivitySortOrder) => void;
  onOpenChange?: (open: boolean) => void; events?: GithubActivityEvent[]; defaultOpen?: boolean; staticIcons?: boolean; className?: string;
}

export interface GithubActivityStatsProps {
  stats?: GithubActivityStatsData; contributions?: GithubContributionDay[]; username?: string;
  showBreakdown?: boolean; showStreaks?: boolean; theme?: GithubActivityTheme; isLoading?: boolean; staticIcons?: boolean; className?: string;
}

export interface GithubActivityLegendProps { theme?: GithubActivityTheme; totalCount?: number; yearLabel?: string; showStreaks?: boolean; streakCount?: number; staticIcons?: boolean; className?: string; }
export interface GithubActivityEventItemProps { event: GithubActivityEvent; showCopySha?: boolean; searchQuery?: string; className?: string; }

export interface GithubActivityHeaderProps {
  user: GithubUserProfile; stats?: GithubActivityStatsData; totalContributions?: number;
  activeVariant?: GithubActivityVariant; onVariantChange?: (variant: GithubActivityVariant) => void;
  showTabs?: boolean; showStreaks?: boolean; mode?: GithubActivityMode; onModeChange?: (mode: GithubActivityMode) => void;
  showModeToggle?: boolean; year?: number; years?: number[]; onYearChange?: (year: number) => void;
  showYearSelector?: boolean; isLoading?: boolean; staticIcons?: boolean; className?: string;
}

export interface GithubActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GithubActivityVariant; activeVariant?: GithubActivityVariant; onVariantChange?: (variant: GithubActivityVariant) => void;
  username?: string; repo?: string; theme?: GithubActivityTheme; mode?: GithubActivityMode; onModeChange?: (mode: GithubActivityMode) => void;
  showModeToggle?: boolean; year?: number; years?: number[]; onYearChange?: (year: number) => void; showFullYear?: boolean;
  showYearSelector?: boolean; isLoading?: boolean; data?: { contributions?: GithubContributionDay[]; events?: GithubActivityEvent[]; stats?: GithubActivityStatsData; user?: GithubUserProfile; availableYears?: number[]; };
  weeksCount?: number; dotSize?: GithubActivityDotSize; maxEvents?: number; showTabs?: boolean; showHeader?: boolean;
  showStreaks?: boolean; showFilter?: boolean; showSearch?: boolean; showSort?: boolean; defaultSort?: GithubActivitySortOrder;
  staticIcons?: boolean; animatedIcons?: boolean; onDayClick?: (day: GithubContributionDay) => void;
}

export interface UseGithubActivityOptions {
  username?: string; repo?: string; year?: number; showFullYear?: boolean;
  initialData?: { contributions?: GithubContributionDay[]; events?: GithubActivityEvent[]; stats?: GithubActivityStatsData; user?: GithubUserProfile; };
  weeksCount?: number; autoFetch?: boolean;
}

export interface UseGithubActivityResult {
  contributions: GithubContributionDay[]; events: GithubActivityEvent[]; stats: GithubActivityStatsData;
  user: GithubUserProfile; isLoading: boolean; error: string | null; refetch: () => Promise<void>;
  selectedYear: number; setSelectedYear: (year: number) => void; availableYears: number[];
}

export interface GithubActivityHeatmapConfig { theme: GithubActivityTheme; weeksCount: number; dotSize?: GithubActivityDotSize; showFullYear?: boolean; showMonthLabels: boolean; showDayLabels: boolean; showLegend: boolean; showTotalCount: boolean; }
export interface GithubActivityTimelineConfig { maxEvents: number; showFilter: boolean; showSearch?: boolean; showSort?: boolean; showCopySha: boolean; }
export interface GithubActivityStatsConfig { showBreakdown: boolean; showStreaks: boolean; theme: GithubActivityTheme; }
export interface GithubActivityConfig { variant: GithubActivityVariant; theme: GithubActivityTheme; username: string; dotSize?: GithubActivityDotSize; weeksCount: number; maxEvents: number; showFullYear?: boolean; showHeader: boolean; showTabs: boolean; showModeToggle?: boolean; showFilter?: boolean; showSearch?: boolean; showSort?: boolean; }

export interface GithubActivity3DProps { weeks: GithubContributionDay[][]; monthPositions?: { weekIndex: number; label: string }[]; theme?: GithubActivityTheme; dotSize?: GithubActivityDotSize; isLoading?: boolean; onDayClick?: (day: GithubContributionDay) => void; className?: string; }
export interface GithubActivity2DMatrixProps { weeks: GithubContributionDay[][]; monthMap: Map<number, string>; sizeConfig: { box: string; label: string; rounded: string }; themeClasses: Record<0 | 1 | 2 | 3 | 4, string>; themeStyle?: React.CSSProperties; isJustifyBetween: boolean; showMonthLabels: boolean; showDayLabels: boolean; isLoading: boolean; safeWeeksCount: number; matrixContainerRef: RefObject<HTMLDivElement | null>; onDayClick?: (day: GithubContributionDay) => void; }
export interface GithubActivityYearSelectProps { year?: number; years: number[]; onYearChange?: (year: number) => void; className?: string; disabled?: boolean; }
export interface GithubActivityHeaderNavProps { activeVariant?: GithubActivityVariant; onVariantChange?: (variant: GithubActivityVariant) => void; stats?: GithubActivityStatsData; totalContributions?: number; label?: string; staticIcons?: boolean; className?: string; }
export interface TimelineFilterOption { label: string; value: "all" | GithubEventType; icon: React.ComponentType<{ className?: string; animate?: boolean }>; }
export interface NavItemConfig { value: GithubActivityVariant; label: string; sublabel: string; bgColor: string; color: string; icon: "heatmap" | "timeline" | "stats"; }
export interface GithubActivityInfoTooltipProps { title: string; description: string; className?: string; iconClassName?: string; titleClassName?: string; align?: "left" | "center" | "right"; position?: "top" | "bottom"; }
export interface GithubActivityStatsCardsProps { stats: GithubActivityStatsData; contributions?: GithubContributionDay[]; activeCategory: string | null; activeBreakdownCat: { id: string; label: string; count: number; pct: number; color: string; textColor: string; desc: string; icon: any }; handleToggle: (id: string) => void; setHoveredCat: (id: string | null) => void; showStreaks?: boolean; isLoading?: boolean; staticIcons?: boolean; breakdownSlot?: React.ReactNode; }
export interface GithubActivityStatsHeroProps { totalContributions: number; contributions?: GithubContributionDay[]; currentStreak?: number; longestStreak?: number; isHighlighted: boolean; isDimmed: boolean; isAnyActive: boolean; handleToggle: (id: string) => void; isLoading?: boolean; staticIcons?: boolean; }
