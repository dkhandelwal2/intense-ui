"use client";

import React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubActivityActiveViewTabs } from "./github-activity-active-view-tabs";
import { generateUserYears } from "@/components/ui/github-activity/github-activity-helpers";
import type { GithubActivityCustomProps } from "@/components/showcases/github-activity/types";
import { WEEKS_PRESETS } from "@/components/showcases/github-activity/constants";

export interface GithubActivityOptionsStepProps {
  customProps: GithubActivityCustomProps;
  onChange: React.Dispatch<React.SetStateAction<GithubActivityCustomProps>>;
}

const ACTIVE_CLASS = "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] ring-1 ring-[var(--theme-primary)]/30 cursor-pointer";
const INACTIVE_CLASS = "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer";
const DISABLED_CLASS = "border-zinc-200/40 dark:border-zinc-800/40 text-zinc-400 cursor-not-allowed";

export function GithubActivityOptionsStep({ customProps, onChange }: GithubActivityOptionsStepProps) {
  const [customInputVal, setCustomInputVal] = React.useState<string>(String(customProps.weeksCount));
  React.useEffect(() => { setCustomInputVal(String(customProps.weeksCount)); }, [customProps.weeksCount]);

  const activeTab = customProps.variant === "compact" ? (customProps.activeTab || "heatmap") : customProps.variant;
  const isHeatmap = activeTab === "heatmap";
  const isTimeline = activeTab === "timeline";
  const isCompact = customProps.variant === "compact";

  const toggleOptions = [
    { key: "showYearSelector" as const, label: "Year Selector", disabled: !isHeatmap },
    { key: "showFullYear" as const, label: "Full Year (Jan - Dec)", disabled: !isHeatmap || customProps.weeksCount !== 52 },
    { key: "showHeader" as const, label: "User Header", disabled: !isCompact },
    { key: "showTabs" as const, label: "View Switcher Tabs", disabled: !isCompact || !customProps.showHeader },
    { key: "showModeToggle" as const, label: "2D / 3D Toggle", disabled: !isHeatmap || (isCompact && !customProps.showHeader) },
    { key: "showStreaks" as const, label: "Streak Badges", disabled: !isHeatmap },
    { key: "showSearch" as const, label: "Timeline Search Bar", disabled: !isTimeline },
    { key: "showFilter" as const, label: "Timeline Filter Menu", disabled: !isTimeline },
    { key: "showSort" as const, label: "Timeline Sort Order", disabled: !isTimeline },
    { key: "staticIcons" as const, label: "Static Icons (No Anim)", disabled: false },
  ];

  return (
    <div className="flex flex-col gap-2.5 py-1">
      {/* Active View Switcher for Full Suite Bento */}
      {isCompact && (
        <GithubActivityActiveViewTabs
          activeTab={activeTab}
          onChange={(tab) => onChange((prev) => ({ ...prev, activeTab: tab }))}
        />
      )}

      {/* Year Selection (Heatmap view only) */}
      <div className={cn("flex flex-col gap-1 transition-opacity", !isHeatmap && "opacity-35 pointer-events-none")}>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Year</span>
        <div className="relative">
          <select
            disabled={!isHeatmap} aria-label="Select Year" value={customProps.year || 2026}
            onChange={(e) => onChange((prev) => ({ ...prev, year: Number(e.target.value) }))}
            className="w-full px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] cursor-pointer appearance-none pr-8 disabled:cursor-not-allowed"
          >
            {generateUserYears().map((yr) => <option key={yr} value={yr}>{yr}</option>)}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Weeks Matrix Presets (Heatmap view only) */}
      <div className={cn("flex flex-col gap-1.5 transition-opacity", !isHeatmap && "opacity-35 pointer-events-none")}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Weeks</span>
          <span className="text-[11px] font-mono font-semibold text-[var(--theme-primary)]">{customProps.weeksCount}W</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {WEEKS_PRESETS.map((weeks) => (
            <button
              key={weeks} type="button" disabled={!isHeatmap} onClick={() => onChange((prev) => ({ ...prev, weeksCount: weeks }))}
              className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all text-center", !isHeatmap ? DISABLED_CLASS : customProps.weeksCount === weeks ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {weeks}W
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium shrink-0" title="Custom Weeks">Custom:</span>
          <div className="relative flex-1">
            <input
              type="number" min={1} max={52} disabled={!isHeatmap} placeholder="1 – 52" value={customInputVal}
              onChange={(e) => {
                const raw = e.target.value; setCustomInputVal(raw);
                if (raw && !Number.isNaN(Number(raw))) onChange((prev) => ({ ...prev, weeksCount: Math.max(1, Math.min(52, Number(raw))) }));
              }}
              onBlur={() => { if (!customInputVal || Number(customInputVal) < 1) setCustomInputVal(String(customProps.weeksCount || 52)); }}
              className={cn("w-full py-1 pl-2.5 pr-10 rounded-lg border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] bg-white dark:bg-zinc-900 placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:cursor-not-allowed", !isHeatmap ? DISABLED_CLASS : !WEEKS_PRESETS.includes(customProps.weeksCount) ? ACTIVE_CLASS : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400")}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 pointer-events-none">
              {Number(customProps.weeksCount) === 1 ? "Week" : "Weeks"}
            </span>
          </div>
        </div>
      </div>

      {/* View Mode (2D/3D) (Heatmap view only) */}
      <div className={cn("flex flex-col gap-1 transition-opacity", !isHeatmap && "opacity-35 pointer-events-none")}>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">View Mode</span>
        <div className="grid grid-cols-2 gap-1.5">
          {(["2d", "3d"] as const).map((m) => (
            <button
              key={m} type="button" disabled={!isHeatmap} onClick={() => onChange((prev) => ({ ...prev, mode: m }))}
              className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all text-center", !isHeatmap ? DISABLED_CLASS : (customProps.mode || "2d") === m ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {m === "2d" ? "2D Flat" : "3D Skyline"}
            </button>
          ))}
        </div>
      </div>

      {/* Dot Size (Heatmap view only) */}
      <div className={cn("flex flex-col gap-1 transition-opacity", !isHeatmap && "opacity-35 pointer-events-none")}>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Dot Size</span>
        <div className="grid grid-cols-3 gap-1.5">
          {(["sm", "md", "lg"] as const).map((s) => (
            <button
              key={s} type="button" disabled={!isHeatmap} onClick={() => onChange((prev) => ({ ...prev, dotSize: s }))}
              className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold uppercase transition-all text-center", !isHeatmap ? DISABLED_CLASS : (customProps.dotSize || "md") === s ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Symmetrical Feature Toggle Checkboxes */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1 pb-1">
          Feature Toggles
        </div>
        {toggleOptions.map(({ key, label, disabled }) => {
          const isChecked = disabled ? false : Boolean(customProps[key]);
          return (
            <div
              key={key}
              onClick={() => { if (!disabled) onChange((prev) => ({ ...prev, [key]: !prev[key] })); }}
              className={cn(
                "w-full py-1.5 px-1.5 flex items-center justify-between transition-colors text-left rounded-lg select-none",
                disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50"
              )}
            >
              <span className={cn("text-xs font-medium truncate pr-2", disabled ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-200")}>
                {label}
              </span>
              <div
                role="checkbox" aria-checked={isChecked}
                className={cn(
                  "w-4 h-4 rounded-[4px] flex items-center justify-center shrink-0 ml-auto transition-colors",
                  disabled
                    ? "border border-zinc-300 dark:border-zinc-700 bg-zinc-200/40 dark:bg-zinc-800/40 text-transparent"
                    : isChecked
                      ? "bg-[var(--theme-primary)] text-white shadow-2xs"
                      : "border border-zinc-400 dark:border-zinc-600 bg-transparent hover:border-zinc-500"
                )}
              >
                {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
