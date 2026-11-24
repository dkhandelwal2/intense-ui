"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GithubActivity, GithubActivityVariant, GithubActivityMode } from "@/components/ui/github-activity";
import { GithubActivityCustomProps } from "./types";

export interface GithubActivityPreviewProps {
  customProps: GithubActivityCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
  className?: string;
  onChange?: React.Dispatch<React.SetStateAction<GithubActivityCustomProps>>;
}

export function GithubActivityPreview({
  customProps,
  activeTocId = "suite",
  isCustomizing = false,
  className,
  onChange,
}: GithubActivityPreviewProps) {
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(customProps.year);
  const [currentMode, setCurrentMode] = React.useState<GithubActivityMode>(customProps.mode || "2d");

  React.useEffect(() => {
    if (customProps.year !== undefined) {
      setSelectedYear(customProps.year);
    }
  }, [customProps.year]);

  React.useEffect(() => {
    if (customProps.mode) {
      setCurrentMode(customProps.mode);
    }
  }, [customProps.mode]);

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
  const activeTab = isFullSuite ? (customProps.activeTab || "heatmap") : effectiveVariant;
  const is3DActive = (activeTab === "heatmap" || effectiveVariant === "heatmap") && currentMode === "3d";

  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-1 sm:p-2 gap-2", className)}>
      <GithubActivity
        key={`preview-${customProps.username || "default"}`}
        variant={effectiveVariant}
        activeVariant={isFullSuite ? (customProps.activeTab || "heatmap") : undefined}
        onVariantChange={(v) => {
          onChange?.((prev) => ({ ...prev, activeTab: v }));
        }}
        theme={customProps.theme}
        mode={currentMode}
        onModeChange={(m) => {
          setCurrentMode(m);
          onChange?.((prev) => ({ ...prev, mode: m }));
        }}
        username={customProps.username || "octocat"}
        repo={customProps.username?.toLowerCase() === "dkhandelwal2" ? "dkhandelwal2/intense-ui" : undefined}
        year={selectedYear}
        onYearChange={setSelectedYear}
        showFullYear={customProps.showFullYear}
        showYearSelector={customProps.showYearSelector}
        showModeToggle={customProps.showModeToggle}
        dotSize={customProps.dotSize}
        weeksCount={customProps.weeksCount}
        maxEvents={customProps.maxEvents}
        showHeader={isFullSuite ? customProps.showHeader : false}
        showTabs={isFullSuite ? customProps.showTabs : false}
        showStreaks={customProps.showStreaks}
        showSearch={customProps.showSearch}
        showFilter={customProps.showFilter}
        showSort={customProps.showSort}
        staticIcons={customProps.staticIcons}
        className="w-full"
      />
      {!is3DActive && (
        <span className="hidden sm:block text-xs font-mono text-muted-foreground text-center pt-2 px-2 line-clamp-2 sm:line-clamp-none">
          {isCustomizing
            ? `Live sync for @${customProps.username || "user"} (${effectiveVariant})`
            : effectiveVariant === "heatmap"
              ? "Interactive contribution calendar matrix with intensity levels & legend"
              : effectiveVariant === "timeline"
                ? "Live event activity stream with commit SHAs, PR badges, and filter tabs"
                : effectiveVariant === "stats"
                  ? "Metric statistics card showing active streaks, longest records, and contribution distribution"
                  : `Full Suite Bento for @${customProps.username || "octocat"} with profile header & contribution matrix`}
        </span>
      )}
    </div>
  );
}
