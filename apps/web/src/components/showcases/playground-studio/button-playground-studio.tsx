"use client";

import React from "react";
import { Maximize2, Palette, Sliders } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ButtonCustomProps, DEFAULT_BUTTON_PROPS } from "@/components/showcases/button/types";

export interface ButtonPlaygroundStudioProps {
  customProps: ButtonCustomProps;
  onChange: React.Dispatch<React.SetStateAction<ButtonCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const BUTTON_SIZES = [
  { id: "sm" as const, label: "Small", badge: "SM", spec: "px-3 py-1.5 compact typography" },
  { id: "md" as const, label: "Medium", badge: "MD", spec: "px-4 py-2 standard baseline" },
  { id: "lg" as const, label: "Large", badge: "LG", spec: "px-6 py-3 prominent target" },
];

const BUTTON_VARIANTS = [
  { id: "default" as const, label: "Default Solid", badge: "01", spec: "High contrast primary fill with spring physics" },
  { id: "delete" as const, label: "In-Place Delete", badge: "DEL", spec: "In-place confirmation delete button (no dialog)" },
  { id: "confirm" as const, label: "In-Place Confirm", badge: "OK", spec: "In-place confirmation morphing button" },
  { id: "share" as const, label: "Social Share", badge: "02", spec: "Expandable social sharing morphing pill button" },
  { id: "glow" as const, label: "Neon Radiant Glow", badge: "03", spec: "Drop-shadow primary aura with highlight border" },
  { id: "outline" as const, label: "Minimal Outline", badge: "04", spec: "Hairline border with muted hover background" },
  { id: "subtle" as const, label: "Subtle Neutral", badge: "05", spec: "Soft tonal background for secondary actions" },
];

const CONFIRM_ACTIONS = [
  { id: "delete" as const, label: "Delete Action", badge: "🗑️", spec: "Red destructive deletion confirmation" },
  { id: "confirm" as const, label: "Confirm Action", badge: "✅", spec: "Emerald positive confirmation" },
  { id: "archive" as const, label: "Archive Action", badge: "📦", spec: "Amber storage archive confirmation" },
  { id: "discard" as const, label: "Discard Action", badge: "⚠️", spec: "Neutral discard confirmation" },
];

export function ButtonPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: ButtonPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "sizing",
      titleLine1: "Scale &",
      titleLine2: "sizing",
      categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Scale & Sizing",
      headerSubtitle: "button dimensions",
      headerEmoji: "📐",
      rows: BUTTON_SIZES.map((sz) => ({
        id: `size-${sz.id}`,
        label: `${sz.label} Size`,
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
      id: "style",
      titleLine1: "Visual",
      titleLine2: "variants",
      categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#FF0084] via-[#D0006F] to-[#A00055]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Visual Variants",
      headerSubtitle: "appearance preset",
      headerEmoji: "🎨",
      rows: BUTTON_VARIANTS.map((v) => ({
        id: `variant-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {v.badge}
          </span>
        ),
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "features",
      titleLine1: "State &",
      titleLine2: "features",
      categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Features & Confirmation",
      headerSubtitle: "in-place action presets and toggles",
      headerEmoji: "⚡",
      rows: [
        ...CONFIRM_ACTIONS.map((act) => ({
          id: `act-${act.id}`,
          label: act.label,
          spec: act.spec,
          thumbnail: <span className="text-sm">{act.badge}</span>,
          isSelected: customProps.confirmAction === act.id,
          onSelect: () => onChange((p) => ({ ...p, confirmAction: act.id, variant: "confirm" })),
        })),
        {
          id: "icon",
          label: "Show Leading Icon",
          spec: "Display Lucide icon beside standard button label",
          thumbnail: <span className="text-sm">✨</span>,
          actionType: "toggle" as const,
          toggleChecked: !!customProps.showIcon,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, showIcon: checked })),
          onSelect: () => onChange((p) => ({ ...p, showIcon: !p.showIcon })),
        },
        {
          id: "disabled",
          label: "Disabled State",
          spec: "Prevent hover physics and user pointer events",
          thumbnail: <span className="text-sm">🚫</span>,
          actionType: "toggle" as const,
          toggleChecked: !!customProps.disabled,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, disabled: checked })),
          onSelect: () => onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_BUTTON_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
