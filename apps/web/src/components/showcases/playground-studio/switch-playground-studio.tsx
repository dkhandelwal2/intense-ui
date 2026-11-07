"use client";

import React from "react";
import { Maximize2, Sliders, Layers } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { SwitchCustomProps, DEFAULT_SWITCH_PROPS } from "@/components/showcases/switch/types";

export interface SwitchPlaygroundStudioProps {
  customProps: SwitchCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SwitchCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const SWITCH_VARIANTS = [
  { id: "rocker" as const, label: "3D Rocker", badge: "3D", spec: "3D physical origami rocker with crease tilt" },
  { id: "pill" as const, label: "Classic Pill", badge: "PIL", spec: "Minimalist smooth rounded pill slider" },
  { id: "cutout" as const, label: "Ring Donut", badge: "RNG", spec: "Neon ring donut thumb sliding in recessed track" },
  { id: "capsule-text" as const, label: "Text Capsule", badge: "TXT", spec: "Capsule outline with inline OFF / ON text" },
  { id: "industrial" as const, label: "Industrial", badge: "IND", spec: "Vertical machinery switch with | and ○" },
  { id: "square" as const, label: "Square Tile", badge: "SQR", spec: "Neo-brutalist tactile square tile with NO / YES" },
  { id: "binary-io" as const, label: "Binary I/O", badge: "BIO", spec: "Morphing neon binary I (ON) and O (OFF)" },
];

const SWITCH_SIZES = [
  { id: "sm" as const, label: "Small (SM)", badge: "SM", spec: "Compact scale for tight navigation bars" },
  { id: "md" as const, label: "Medium (MD)", badge: "MD", spec: "Standard baseline UI dimensions" },
  { id: "lg" as const, label: "Large (LG)", badge: "LG", spec: "Prominent touch-target size for mobile/hero" },
];

export function SwitchPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: SwitchPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variants",
      titleLine1: "Design &",
      titleLine2: "styles",
      categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Design Archetype",
      headerSubtitle: "interactive switch designs",
      headerEmoji: "🔘",
      rows: SWITCH_VARIANTS.map((v) => ({
        id: `var-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {v.badge}
          </span>
        ),
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "sizing",
      titleLine1: "Scale &",
      titleLine2: "geometry",
      categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Scale Options",
      headerSubtitle: "switch sizing across all archetypes",
      headerEmoji: "📐",
      rows: SWITCH_SIZES.map((sz) => ({
        id: `size-${sz.id}`,
        label: sz.label,
        spec: sz.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {sz.badge}
          </span>
        ),
        isSelected: customProps.size === sz.id,
        onSelect: () => onChange((p) => ({ ...p, size: sz.id })),
      })),
    },
    {
      id: "behavior",
      titleLine1: "Labels &",
      titleLine2: "states",
      categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Typography & States",
      headerSubtitle: "labels and interactivity",
      headerEmoji: "🔤",
      rows: [
        {
          id: "state-toggle",
          label: "Active State (Checked)",
          spec: "Toggle current on/off boolean state",
          thumbnail: <span className="text-sm">{customProps.checked ? "✅" : "⚪"}</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.checked,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, checked: c })),
          onSelect: () => onChange((p) => ({ ...p, checked: !p.checked })),
        },
        {
          id: "mode-onoff",
          label: "ON / OFF Text",
          spec: "Standard state text labels",
          thumbnail: <span className="text-[10px] font-mono font-bold">ON</span>,
          isSelected: customProps.sliderText === "on/off",
          onSelect: () => onChange((p) => ({ ...p, sliderText: "on/off" })),
        },
        {
          id: "mode-yesno",
          label: "YES / NO Text",
          spec: "Affirmative decision labels",
          thumbnail: <span className="text-[10px] font-mono font-bold">YES</span>,
          isSelected: customProps.sliderText === "yes/no",
          onSelect: () => onChange((p) => ({ ...p, sliderText: "yes/no" })),
        },
        {
          id: "dot-toggle",
          label: "Status Indicator Dot",
          spec: "Show glowing color status dot inside rocker knob",
          thumbnail: <span className="text-sm">🟢</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.showDotIcon,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, showDotIcon: c })),
          onSelect: () => onChange((p) => ({ ...p, showDotIcon: !p.showDotIcon })),
        },
        {
          id: "disabled-toggle",
          label: "Disabled State",
          spec: "Disables user interaction",
          thumbnail: <span className="text-sm">🚫</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.disabled,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, disabled: c })),
          onSelect: () => onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_SWITCH_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
