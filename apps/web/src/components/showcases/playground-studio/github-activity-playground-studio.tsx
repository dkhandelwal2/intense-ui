"use client";

import React from "react";
import { Layers, Palette, SlidersHorizontal, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ColorGrid } from "@/components/ui/color-grid";
import { GithubActivityOptionsStep } from "./github-activity-options-step";
import { GithubActivityCustomProps, DEFAULT_GITHUB_ACTIVITY_PROPS } from "@/components/showcases/github-activity/types";
import { GITHUB_ACTIVITY_VARIANTS, GITHUB_THEME_COLORS, GITHUB_THEME_LABELS, GITHUB_USER_PRESETS } from "@/components/showcases/github-activity/constants";

export interface GithubActivityPlaygroundStudioProps {
  customProps: GithubActivityCustomProps;
  onChange: React.Dispatch<React.SetStateAction<GithubActivityCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

export function GithubActivityPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = true,
  onViewCode,
}: GithubActivityPlaygroundStudioProps) {
  const activeTab = customProps.variant === "compact" ? (customProps.activeTab || "heatmap") : customProps.variant;
  const isHeatmap = activeTab === "heatmap";
  const isCompact = customProps.variant === "compact";

  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant",
      titleLine1: "Display",
      titleLine2: "layout",
      categoryTag: "01 / 04",
      colorGradient: "bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Layout",
      headerSubtitle: "matrix & feed",
      headerEmoji: "📊",
      customRightContent: (
        <div className="flex flex-col gap-1.5">
          {GITHUB_ACTIVITY_VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onChange((prev) => ({
                ...prev,
                variant: v.id,
                activeTab: v.id === "compact" ? (prev.activeTab || "heatmap") : v.id,
              }))}
              className={cn(
                "flex items-start gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer",
                customProps.variant === v.id
                  ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-zinc-900 dark:text-zinc-100 ring-1 ring-[var(--theme-primary)]/30"
                  : "border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <span className="text-base select-none shrink-0">{v.emoji}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold">{v.name}</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{v.description}</span>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "theme",
      titleLine1: "Color",
      titleLine2: "palette",
      categoryTag: "02 / 04",
      colorGradient: "bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Themes",
      headerSubtitle: isHeatmap ? "activity colors" : "heatmap only",
      headerEmoji: "🎨",
      customRightContent: (
        <div className="flex flex-col gap-3 py-1">
          <div className={cn("flex flex-col gap-3 transition-opacity", !isHeatmap && "opacity-35 pointer-events-none select-none")}>
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Theme</span>
              <span className={cn("text-[11px] font-mono font-semibold", isHeatmap ? "text-[var(--theme-primary)]" : "text-zinc-400")}>
                {GITHUB_THEME_COLORS.find((t) => t.id === customProps.theme)?.label || (customProps.theme ? customProps.theme.toUpperCase() : "GitHub Green")}
              </span>
            </div>
            <ColorGrid
              size="sm"
              columns={4}
              colors={GITHUB_THEME_COLORS.map((t) => t.color)}
              labels={GITHUB_THEME_LABELS}
              value={GITHUB_THEME_COLORS.find((t) => t.id === customProps.theme)?.color || customProps.theme || "#10b981"}
              defaultValue="#10b981"
              showCustomPicker={true}
              onChange={(hex) => {
                if (!isHeatmap) return;
                const found = GITHUB_THEME_COLORS.find((t) => t.color.toLowerCase() === hex.toLowerCase());
                onChange((prev) => ({ ...prev, theme: found ? found.id : hex }));
              }}
              onClear={() => {
                if (!isHeatmap) return;
                onChange((prev) => ({ ...prev, theme: "github" }));
              }}
              className="p-3.5 gap-3.5 place-items-center border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-xs"
            />
          </div>
          {!isHeatmap && (
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center font-medium">
              Theme colors only apply to Heatmap view
            </p>
          )}
        </div>
      ),
    },
    {
      id: "controls",
      titleLine1: "Range &",
      titleLine2: "options",
      categoryTag: "03 / 04",
      colorGradient: "bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]",
      icon: <SlidersHorizontal className="w-3.5 h-3.5" />,
      headerTitle: "Controls",
      headerSubtitle: "year & options",
      headerEmoji: "⚙️",
      customRightContent: <GithubActivityOptionsStep customProps={customProps} onChange={onChange} />,
    },
    {
      id: "user",
      titleLine1: "GitHub",
      titleLine2: "user",
      categoryTag: "04 / 04",
      colorGradient: "bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]",
      icon: <User className="w-3.5 h-3.5" />,
      headerTitle: "Profile",
      headerSubtitle: "username handle",
      headerEmoji: "👤",
      customRightContent: (
        <div className="flex flex-col gap-3 py-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Username</span>
            <input
              type="text"
              value={customProps.username}
              onChange={(e) => onChange((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="e.g. torvalds, shadcn"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] shadow-2xs"
            />
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">Presets</span>
            <div className="grid grid-cols-2 gap-2">
              {GITHUB_USER_PRESETS.map((p) => {
                const isSelected = customProps.username?.toLowerCase() === p.username.toLowerCase();
                return (
                  <button
                    key={p.username}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, username: p.username }))}
                    className={cn(
                      "flex flex-col items-start justify-center p-2 rounded-xl border text-left transition-all cursor-pointer min-w-0 w-full min-h-[58px] overflow-hidden",
                      isSelected
                        ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-zinc-900 dark:text-zinc-100 ring-1 ring-[var(--theme-primary)]/30"
                        : "border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    )}
                  >
                    <span className="text-xs font-semibold truncate w-full block leading-snug" title={p.label}>
                      {p.label}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 truncate w-full block" title={p.username}>
                      {p.username}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_GITHUB_ACTIVITY_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
