"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GithubActivity, GithubActivityVariant } from "@/components/ui/github-activity";
import { GithubActivityCustomProps } from "./types";

export interface GithubActivityPreviewProps {
  customProps: GithubActivityCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
  className?: string;
}

export function GithubActivityPreview({
  customProps,
  activeTocId = "suite",
  isCustomizing = false,
  className,
}: GithubActivityPreviewProps) {
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(customProps.year);

  React.useEffect(() => {
    if (customProps.year !== undefined) {
      setSelectedYear(customProps.year);
    }
  }, [customProps.year]);

  const effectiveVariant: GithubActivityVariant = isCustomizing
    ? customProps.variant
    : activeTocId === "heatmap"
      ? "heatmap"
      : activeTocId === "timeline"
        ? "timeline"
        : activeTocId === "stats"
          ? "stats"
          : "compact";

  const isFullSuite = effectiveVariant === "compact";

  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-1 sm:p-2 gap-2", className)}>
      <GithubActivity
        key={`preview-${customProps.username || "default"}`}
        variant={effectiveVariant}
        theme={customProps.theme}
        username={customProps.username || "octocat"}
        year={selectedYear}
        onYearChange={setSelectedYear}
        showFullYear={customProps.showFullYear}
        showYearSelector={customProps.showYearSelector}
        dotSize={customProps.dotSize}
        weeksCount={customProps.weeksCount}
        maxEvents={isFullSuite ? 4 : (customProps.maxEvents || 6)}
        showHeader={isFullSuite ? customProps.showHeader : false}
        showTabs={isFullSuite ? customProps.showTabs : false}
        showStreaks={customProps.showStreaks}
        className="w-full shadow-lg"
      />
      <span className="text-xs font-mono text-muted-foreground text-center pt-2 px-2 line-clamp-2 sm:line-clamp-none">
        {isCustomizing
          ? `Live sync for @${customProps.username || "user"} (${effectiveVariant})`
          : effectiveVariant === "heatmap"
            ? "Interactive contribution calendar matrix with intensity levels & legend"
            : effectiveVariant === "timeline"
              ? "Live event activity stream with commit SHAs, PR badges, and filter tabs"
              : effectiveVariant === "stats"
                ? "Metric statistics card showing active streaks, longest records, and contribution distribution"
                : "Full Suite Bento with profile header, contribution matrix, and interactive view switching"}
      </span>
    </div>
  );
}
