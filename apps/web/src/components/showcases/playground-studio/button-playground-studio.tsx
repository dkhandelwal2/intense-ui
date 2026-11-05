"use client";

import React from "react";
import { Maximize2, Palette, Sliders } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ButtonCustomProps, DEFAULT_BUTTON_PROPS } from "@/components/showcases/button/types";

export interface ButtonPlaygroundStudioProps {
  customProps: ButtonCustomProps;
  onChange: React.Dispatch<React.SetStateAction<ButtonCustomProps>>;
  className?: string; hidePreview?: boolean; onViewCode?: () => void;
}

const BUTTON_SIZES = [
  { id: "sm" as const, label: "Small", badge: "SM", spec: "px-3 py-1.5 compact typography" },
  { id: "md" as const, label: "Medium", badge: "MD", spec: "px-4 py-2 standard baseline" },
  { id: "lg" as const, label: "Large", badge: "LG", spec: "px-6 py-3 prominent target" },
  { id: "icon" as const, label: "Icon", badge: "ICN", spec: "w-10 h-10 square icon container" },
];

const BUTTON_VARIANTS = [
  { id: "default" as const, label: "Default Solid", badge: "01", spec: "High contrast fill with spring physics" },
  { id: "confirmation" as const, label: "Confirmation", badge: "CFM", spec: "In-place confirmation morph (pill or icon)" },
  { id: "text" as const, label: "Text Only", badge: "TXT", spec: "Clean text button without outline or background" },
  { id: "ghost" as const, label: "Ghost", badge: "GST", spec: "Subtle hover background with zero idle chrome" },
  { id: "outline" as const, label: "Minimal Outline", badge: "OUT", spec: "Hairline border with muted hover background" },
  { id: "3d" as const, label: "3D Tactile", badge: "3D", spec: "Isometric depth with active push translation" },
  { id: "shimmer" as const, label: "Shimmer Beam", badge: "SHM", spec: "Sweeping specular light beam animation" },
  { id: "ripple" as const, label: "Ripple Wave", badge: "RPL", spec: "Dynamic click coordinates radial ripple" },
  { id: "filled-border" as const, label: "Filled Border", badge: "FLB", spec: "Outline with full hover fill animation" },
  { id: "glow" as const, label: "Radiant Glow", badge: "GLW", spec: "Primary aura drop-shadow with border shine" },
  { id: "share" as const, label: "Social Share", badge: "SHR", spec: "Morphing pill expanding to social channels" },
];

const CONFIRM_ACTIONS = [
  { id: "delete" as const, label: "Delete Action", badge: "🗑️", spec: "Destructive deletion confirmation" },
  { id: "confirm" as const, label: "Confirm Action", badge: "✅", spec: "Positive success confirmation" },
  { id: "archive" as const, label: "Archive Action", badge: "📦", spec: "Storage archive confirmation" },
  { id: "discard" as const, label: "Discard Action", badge: "⚠️", spec: "Neutral discard confirmation" },
];

export function ButtonPlaygroundStudio({ customProps, onChange, className, hidePreview = false, onViewCode }: ButtonPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "sizing", titleLine1: "Scale &", titleLine2: "sizing", categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />, headerTitle: "Scale & Sizing", headerSubtitle: "button dimensions", headerEmoji: "📐",
      rows: BUTTON_SIZES.map((sz) => ({
        id: `size-${sz.id}`, label: `${sz.label} Size`, spec: sz.spec,
        thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">{sz.badge}</span>,
        isSelected: customProps.size === sz.id, onSelect: () => onChange((p) => ({ ...p, size: sz.id })),
      })),
    },
    {
      id: "style", titleLine1: "Visual", titleLine2: "variants", categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#FF0084] via-[#D0006F] to-[#A00055]",
      icon: <Palette className="w-3.5 h-3.5" />, headerTitle: "Visual Variants", headerSubtitle: "appearance preset", headerEmoji: "🎨",
      rows: BUTTON_VARIANTS.map((v) => ({
        id: `variant-${v.id}`, label: v.label, spec: v.spec,
        thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{v.badge}</span>,
        isSelected: customProps.variant === v.id, onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "features", titleLine1: "State &", titleLine2: "features", categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Sliders className="w-3.5 h-3.5" />, headerTitle: "Features & Confirmation", headerSubtitle: "action presets and toggles", headerEmoji: "⚡",
      rows: [
        {
          id: "confirm-mode", label: "Icon-Based Confirmation", spec: "Morphing squircle icon instead of pill text", thumbnail: <span className="text-sm">🔲</span>,
          actionType: "toggle" as const, toggleChecked: customProps.confirmType === "icon",
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, confirmType: checked ? "icon" : "pill", variant: "confirmation" })),
          onSelect: () => onChange((p) => ({ ...p, confirmType: p.confirmType === "icon" ? "pill" : "icon", variant: "confirmation" })),
        },
        ...CONFIRM_ACTIONS.map((act) => ({
          id: `act-${act.id}`, label: act.label, spec: act.spec, thumbnail: <span className="text-sm">{act.badge}</span>,
          isSelected: customProps.confirmAction === act.id && customProps.variant === "confirmation",
          onSelect: () => onChange((p) => ({ ...p, confirmAction: act.id, variant: "confirmation" })),
        })),
        {
          id: "rounded", label: "Rounded Pill", spec: "Fully circular capsule border radius", thumbnail: <span className="text-sm">💊</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.rounded,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, rounded: checked })),
          onSelect: () => onChange((p) => ({ ...p, rounded: !p.rounded })),
        },
        {
          id: "loading", label: "Loading State", spec: "Animated spinner with interaction disabled", thumbnail: <span className="text-sm">⏳</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.loading,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, loading: checked })),
          onSelect: () => onChange((p) => ({ ...p, loading: !p.loading })),
        },
        {
          id: "icon", label: "Show Leading Icon", spec: "Display Lucide icon beside button label", thumbnail: <span className="text-sm">✨</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.showIcon,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, showIcon: checked })),
          onSelect: () => onChange((p) => ({ ...p, showIcon: !p.showIcon })),
        },
        {
          id: "disabled", label: "Disabled State", spec: "Prevent hover physics and user pointer events", thumbnail: <span className="text-sm">🚫</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.disabled,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, disabled: checked })),
          onSelect: () => onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
      ],
    },
  ];

  return <PlaygroundStudio steps={steps} onReset={() => onChange(DEFAULT_BUTTON_PROPS)} onViewCode={onViewCode} className={className} hidePreview={hidePreview} />;
}
