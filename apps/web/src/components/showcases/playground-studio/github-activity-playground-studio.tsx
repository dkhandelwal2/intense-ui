"use client";

import React from "react";
import { Layers, Palette, SlidersHorizontal, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ColorGrid } from "@/components/ui/color-grid";
import { generateUserYears } from "@/components/ui/github-activity/github-activity-helpers";
import { GithubActivityCustomProps, DEFAULT_GITHUB_ACTIVITY_PROPS } from "@/components/showcases/github-activity/types";
import { GITHUB_ACTIVITY_VARIANTS, GITHUB_THEME_COLORS, GITHUB_THEME_LABELS, WEEKS_PRESETS, GITHUB_USER_PRESETS } from "@/components/showcases/github-activity/constants";

export interface GithubActivityPlaygroundStudioProps {
  customProps: GithubActivityCustomProps;
  onChange: React.Dispatch<React.SetStateAction<GithubActivityCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

export function GithubActivityPlaygroundStudio({
  customProps, onChange, className, hidePreview = true, onViewCode,
}: GithubActivityPlaygroundStudioProps) {
  const [customInputVal, setCustomInputVal] = React.useState<string>(String(customProps.weeksCount));
  React.useEffect(() => { setCustomInputVal(String(customProps.weeksCount)); }, [customProps.weeksCount]);

  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant", titleLine1: "Display", titleLine2: "layout", categoryTag: "01 / 04",
      colorGradient: "bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]",
      icon: <Layers className="w-3.5 h-3.5" />, headerTitle: "Layout", headerSubtitle: "matrix & feed", headerEmoji: "📊",
      customRightContent: (
        <div className="flex flex-col gap-1.5">
          {GITHUB_ACTIVITY_VARIANTS.map((v) => (
            <button
              key={v.id} type="button" onClick={() => onChange((prev) => ({ ...prev, variant: v.id }))}
              className={cn("flex items-start gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer", customProps.variant === v.id ? "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50")}
            >
              <span className="text-base select-none shrink-0">{v.emoji}</span>
              <div className="flex flex-col min-w-0"><span className="text-xs font-semibold">{v.name}</span><span className="text-[11px] text-zinc-500 dark:text-zinc-400">{v.description}</span></div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "theme", titleLine1: "Color", titleLine2: "palette", categoryTag: "02 / 04",
      colorGradient: "bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
      icon: <Palette className="w-3.5 h-3.5" />, headerTitle: "Themes", headerSubtitle: "activity colors", headerEmoji: "🎨",
      customRightContent: (
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Theme</span>
            <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {GITHUB_THEME_COLORS.find((t) => t.id === customProps.theme)?.label || "GitHub Green"}
            </span>
          </div>
          <ColorGrid
            size="sm" columns={4} colors={GITHUB_THEME_COLORS.map((t) => t.color)} labels={GITHUB_THEME_LABELS}
            value={GITHUB_THEME_COLORS.find((t) => t.id === customProps.theme)?.color || "#10b981"}
            onChange={(hex) => {
              const found = GITHUB_THEME_COLORS.find((t) => t.color.toLowerCase() === hex.toLowerCase());
              if (found) onChange((prev) => ({ ...prev, theme: found.id }));
            }}
            showCustomPicker={false} className="p-3.5 gap-3.5 place-items-center border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-xs"
          />
        </div>
      ),
    },
    {
      id: "controls", titleLine1: "Range &", titleLine2: "options", categoryTag: "03 / 04",
      colorGradient: "bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]",
      icon: <SlidersHorizontal className="w-3.5 h-3.5" />, headerTitle: "Controls", headerSubtitle: "year & options", headerEmoji: "⚙️",
      customRightContent: (
        <div className="flex flex-col gap-2.5 py-1">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Year</span>
            <div className="relative">
              <select
                aria-label="Select Year" value={customProps.year || 2026}
                onChange={(e) => onChange((prev) => ({ ...prev, year: Number(e.target.value) }))}
                className="w-full px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none pr-8"
              >
                {generateUserYears().map((yr) => <option key={yr} value={yr}>{yr}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Weeks</span>
              <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">{customProps.weeksCount}W</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {WEEKS_PRESETS.map((weeks) => (
                <button
                  key={weeks} type="button" onClick={() => onChange((prev) => ({ ...prev, weeksCount: weeks }))}
                  className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer text-center", customProps.weeksCount === weeks ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}
                >
                  {weeks}W
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium shrink-0" title="Custom Weeks">Custom:</span>
              <div className="relative flex-1">
                <input
                  type="number" min={1} max={52} placeholder="1 – 52" value={customInputVal}
                  onChange={(e) => {
                    const raw = e.target.value; setCustomInputVal(raw);
                    if (raw && !Number.isNaN(Number(raw))) onChange((prev) => ({ ...prev, weeksCount: Math.max(1, Math.min(52, Number(raw))) }));
                  }}
                  onBlur={() => { if (!customInputVal || Number(customInputVal) < 1) setCustomInputVal(String(customProps.weeksCount || 52)); }}
                  className={cn(
                    "w-full py-1 pl-2.5 pr-10 rounded-lg border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white dark:bg-zinc-900 placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    !WEEKS_PRESETS.includes(customProps.weeksCount) ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  )}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 pointer-events-none">{Number(customProps.weeksCount) === 1 ? "Week" : "Weeks"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">View Mode</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(["2d", "3d"] as const).map((m) => (
                <button key={m} type="button" onClick={() => onChange((prev) => ({ ...prev, mode: m }))} className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center", (customProps.mode || "2d") === m ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>
                  {m === "2d" ? "2D Flat" : "3D Skyline"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Dot Size</span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button key={s} type="button" onClick={() => onChange((prev) => ({ ...prev, dotSize: s }))} className={cn("py-1.5 px-2 rounded-lg border text-xs font-semibold uppercase transition-all cursor-pointer text-center", (customProps.dotSize || "md") === s ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
            {([
              { key: "showYearSelector", label: "Year Selector" }, { key: "showFullYear", label: "Full Year (Jan - Dec)" },
              { key: "showHeader", label: "User Header" }, { key: "showTabs", label: "View Switcher Tabs" }, { key: "showStreaks", label: "Streak Badges" },
            ] as const).map(({ key, label }) => (
              <label key={key} className={cn("flex items-center justify-between text-xs select-none", key === "showFullYear" && customProps.weeksCount !== 52 ? "opacity-40 cursor-not-allowed" : "cursor-pointer")}>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{label}</span>
                <input type="checkbox" disabled={key === "showFullYear" && customProps.weeksCount !== 52} checked={key === "showFullYear" && customProps.weeksCount !== 52 ? false : Boolean(customProps[key])} onChange={(e) => onChange((prev) => ({ ...prev, [key]: e.target.checked }))} className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 disabled:opacity-40 disabled:cursor-not-allowed" />
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "user", titleLine1: "GitHub", titleLine2: "user", categoryTag: "04 / 04",
      colorGradient: "bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]",
      icon: <User className="w-3.5 h-3.5" />, headerTitle: "Profile", headerSubtitle: "username handle", headerEmoji: "👤",
      customRightContent: (
        <div className="flex flex-col gap-3 py-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Username</span>
            <input
              type="text" value={customProps.username} onChange={(e) => onChange((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="e.g. torvalds, shadcn"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            />
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">Presets</span>
            <div className="grid grid-cols-2 gap-2">
              {GITHUB_USER_PRESETS.map((p) => (
                <button
                  key={p.username} type="button" onClick={() => onChange((prev) => ({ ...prev, username: p.username }))}
                  className={cn("text-xs px-2.5 py-1.5 rounded-lg border font-medium text-center transition-all cursor-pointer truncate", customProps.username === p.username ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold ring-1 ring-emerald-500/30" : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps} onReset={() => onChange(DEFAULT_GITHUB_ACTIVITY_PROPS)}
      onViewCode={onViewCode} hidePreview={hidePreview} className={className}
    />
  );
}
