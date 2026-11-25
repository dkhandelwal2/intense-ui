"use client";

import React from "react";
import { Compass, Palette } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { TooltipCustomProps, DEFAULT_TOOLTIP_PROPS } from "@/components/showcases/tooltip/types";
import { Tooltip } from "@/components/ui/tooltip";

export interface TooltipPlaygroundStudioProps {
  customProps: TooltipCustomProps;
  onChange: React.Dispatch<React.SetStateAction<TooltipCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

export const TooltipLivePreview = React.memo(function TooltipLivePreview({
  customProps,
}: {
  customProps: TooltipCustomProps;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
      <Tooltip
        content={customProps.content}
        position={customProps.position}
        bgColor={customProps.bgColor || undefined}
      >
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-xs shadow-md hover:scale-105 transition-transform"
        >
          Hover / Tap Target
        </button>
      </Tooltip>
      <span className="text-[10px] font-mono text-muted-foreground">
        Position: {customProps.position.toUpperCase()} • {customProps.bgColor || "Default Dark"}
      </span>
    </div>
  );
});

const TOOLTIP_POSITIONS = [
  { id: "top" as const, label: "Top Placement", spec: "Floating above with downward arrow pointer", badge: "TOP" },
  { id: "bottom" as const, label: "Bottom Placement", spec: "Docked below with upward arrow pointer", badge: "BTM" },
  { id: "left" as const, label: "Left Placement", spec: "Positioned to left with right arrow pointer", badge: "LFT" },
  { id: "right" as const, label: "Right Placement", spec: "Positioned to right with left arrow pointer", badge: "RGT" },
];

const TOOLTIP_COLORS = [
  { id: "", label: "Neutral Slate", hex: "#27272a", spec: "Clean dark zinc container" },
  { id: "#3b82f6", label: "Electric Sapphire", hex: "#3b82f6", spec: "Vibrant high-contrast blue" },
  { id: "#a855f7", label: "Neon Amethyst", hex: "#a855f7", spec: "Luminous purple backdrop" },
  { id: "#22c55e", label: "Emerald Green", hex: "#22c55e", spec: "Clean success feedback tone" },
  { id: "#f97316", label: "Sunset Orange", hex: "#f97316", spec: "Warm warning accent hue" },
];

export function TooltipPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: TooltipPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "placement",
      titleLine1: "Docking &",
      titleLine2: "position",
      categoryTag: "01 / 02",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Compass className="w-3.5 h-3.5" />,
      headerTitle: "Placement & Alignment",
      headerSubtitle: "cardinal anchor directions",
      headerEmoji: "🧭",
      rows: TOOLTIP_POSITIONS.map((pos) => ({
        id: `pos-${pos.id}`,
        label: pos.label,
        spec: pos.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {pos.badge}
          </span>
        ),
        isSelected: customProps.position === pos.id,
        onSelect: () => onChange((p) => ({ ...p, position: pos.id })),
      })),
    },
    {
      id: "tones",
      titleLine1: "Bubble &",
      titleLine2: "colors",
      categoryTag: "02 / 02",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Tones & Backgrounds",
      headerSubtitle: "bubble background palette",
      headerEmoji: "🎨",
      rows: TOOLTIP_COLORS.map((clr) => ({
        id: `clr-${clr.id || "default"}`,
        label: clr.label,
        spec: clr.spec,
        thumbnail: (
          <span
            className="w-4 h-4 rounded-full border border-black/20 dark:border-white/20 shadow-sm"
            style={{ backgroundColor: clr.hex }}
          />
        ),
        isSelected: (customProps.bgColor || "") === clr.id,
        onSelect: () => onChange((p) => ({ ...p, bgColor: clr.id })),
      })),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      preview={hidePreview ? undefined : <TooltipLivePreview customProps={customProps} />}
      description="Interact with props below to customize your tooltip bubble in real time."
      onReset={() => onChange(DEFAULT_TOOLTIP_PROPS)}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className={className}
    />
  );
}
