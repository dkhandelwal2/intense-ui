"use client";

import React from "react";
import { Layers, Sliders, Maximize2, Sparkles, Palette } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import {
  BREADCRUMB_VARIANTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
  getBreadcrumbModifiedCount as getModifiedCount,
  BREADCRUMB_DEFAULT_CUSTOM_PROPS as DEFAULT_CUSTOM_PROPS,
} from "./constants";
import { CustomProps, BreadcrumbSeparatorType } from "@/components/showcases/breadcrumb/types";
import { BreadcrumbVariant, BreadcrumbSize } from "@/components/ui/breadcrumb";
import { BreadcrumbVariantRenderer } from "@/components/showcases/breadcrumb/_components/breadcrumb-variant-renderer";

export interface BreadcrumbPlaygroundStudioProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const VARIANT_INFO: Record<string, { label: string; desc: string; emoji: string }> = {
  default: { label: "Default", desc: "clean standard link", emoji: "📄" },
  chips: { label: "Chips / Pills", desc: "rounded badge capsule", emoji: "💊" },
  outline: { label: "Outline", desc: "subtle border badge", emoji: "🔲" },
  ghost: { label: "Ghost", desc: "minimal hover link", emoji: "👻" },
};

const SEPARATOR_INFO: Record<string, { icon: string; label: string; desc: string }> = {
  chevron: { icon: "›", label: "Chevron", desc: "right angle bracket" },
  slash: { icon: "/", label: "Slash", desc: "unix path separator" },
  arrow: { icon: "→", label: "Arrow", desc: "directional arrow" },
  chevrons: { icon: "»", label: "Double", desc: "double chevron" },
  dot: { icon: "•", label: "Bullet", desc: "centered dot marker" },
  none: { icon: "—", label: "None", desc: "whitespace gap" },
};

const SIZE_INFO: Record<string, { label: string; badge: string; desc: string }> = {
  sm: { label: "Small", badge: "SM", desc: "compact font & padding" },
  md: { label: "Medium", badge: "MD", desc: "standard baseline" },
  lg: { label: "Large", badge: "LG", desc: "spacious touch target" },
};

export const BreadcrumbLivePreview = React.memo(function BreadcrumbLivePreview({
  customProps,
}: {
  customProps: CustomProps;
}) {
  return (
    <div className="w-full flex items-center justify-center origin-center">
      <BreadcrumbVariantRenderer id="customization" customProps={customProps} />
    </div>
  );
});

export const BreadcrumbPlaygroundStudio = React.memo(function BreadcrumbPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: BreadcrumbPlaygroundStudioProps) {
  const modifiedCount = React.useMemo(() => getModifiedCount(customProps), [customProps]);
  const handleReset = React.useCallback(() => onChange(DEFAULT_CUSTOM_PROPS), [onChange]);

  const steps: PlaygroundStudioStepData[] = React.useMemo(() => [
    {
      id: "variant",
      titleLine1: "Variant",
      titleLine2: "style",
      categoryTag: "01 / 05",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Breadcrumb",
      headerSubtitle: "storehouse",
      headerEmoji: "✨",
      rows: BREADCRUMB_VARIANTS.map((v) => {
        const info = VARIANT_INFO[v.id] || { label: v.label, desc: "", emoji: "🏷️" };
        return {
          id: v.id, label: info.label, spec: info.desc, thumbnail: <span>{info.emoji}</span>, isSelected: customProps.variant === v.id,
          onSelect: () => onChange((p) => ({ ...p, variant: v.id as BreadcrumbVariant })),
        };
      }),
    },
    {
      id: "separator",
      titleLine1: "Path",
      titleLine2: "separator",
      categoryTag: "02 / 05",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Delimiter",
      headerSubtitle: "storehouse",
      headerEmoji: "⚡",
      rows: BREADCRUMB_SEPARATORS.map((sep) => {
        const info = SEPARATOR_INFO[sep.id] || { icon: "›", label: sep.label, desc: "" };
        return {
          id: sep.id, label: info.label, spec: info.desc,
          thumbnail: <span className="font-mono font-bold text-base text-[var(--theme-primary)]">{info.icon}</span>,
          isSelected: customProps.separator === sep.id,
          onSelect: () => onChange((p) => ({ ...p, separator: sep.id as BreadcrumbSeparatorType })),
        };
      }),
    },
    {
      id: "size",
      titleLine1: "Scale &",
      titleLine2: "sizing",
      categoryTag: "03 / 05",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Dimensions",
      headerSubtitle: "storehouse",
      headerEmoji: "📐",
      rows: BREADCRUMB_SIZES.map((sz) => {
        const info = SIZE_INFO[sz.id] || { label: sz.label, badge: sz.id, desc: "" };
        return {
          id: sz.id, label: info.label, spec: info.desc,
          thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">{info.badge}</span>,
          isSelected: customProps.size === sz.id,
          onSelect: () => onChange((p) => ({ ...p, size: sz.id as BreadcrumbSize })),
        };
      }),
    },
    {
      id: "features",
      titleLine1: "Extra",
      titleLine2: "features",
      categoryTag: "04 / 05",
      colorGradient: "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      headerTitle: "Toggles",
      headerSubtitle: "storehouse",
      headerEmoji: "🔮",
      rows: [
        {
          id: "icons", label: "Show Emojis", spec: "Prefix emoji icons to links", thumbnail: <span className="text-sm">🏠</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.showIcons,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, showIcons: c })),
          onSelect: () => onChange((p) => ({ ...p, showIcons: !p.showIcons })),
        },
        {
          id: "dropdown", label: "Dropdown Popover", spec: "Collapse items into dropdown", thumbnail: <span className="text-sm">📂</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.hasDropdown,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, hasDropdown: c, hasCollapsed: c ? false : p.hasCollapsed })),
          onSelect: () => onChange((p) => ({ ...p, hasDropdown: !p.hasDropdown, hasCollapsed: !p.hasDropdown ? false : p.hasCollapsed })),
        },
        {
          id: "collapsed", label: "Collapsed Row", spec: "Expand hidden items inline", thumbnail: <span className="text-sm">⋯</span>,
          actionType: "toggle" as const, toggleChecked: !!customProps.hasCollapsed,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, hasCollapsed: c, hasDropdown: c ? false : p.hasDropdown })),
          onSelect: () => onChange((p) => ({ ...p, hasCollapsed: !p.hasCollapsed, hasDropdown: !p.hasCollapsed ? false : p.hasDropdown })),
        },
      ],
    },
    {
      id: "colors",
      titleLine1: "Theme",
      titleLine2: "colors",
      categoryTag: "05 / 05",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Palette",
      headerSubtitle: "storehouse",
      headerEmoji: "🎨",
      customRightContent: (
        <div className="space-y-3 pt-1">
          {[{ label: "Active Page Color", val: customProps.activeColor, key: "activeColor" }, { label: "Separator Delimiter Color", val: customProps.separatorColor, key: "separatorColor" }].map((f) => (
            <div key={f.key}>
              <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">{f.label}</span>
              <ColorGrid size="sm" value={f.val || ""} defaultValue="" onChange={(c) => onChange((p) => ({ ...p, [f.key]: c }))} onClear={() => onChange((p) => ({ ...p, [f.key]: "" }))} colors={PALETTE_COLORS} />
            </div>
          ))}
        </div>
      ),
    },
  ], [customProps, onChange]);

  return (
    <PlaygroundStudio
      steps={steps}
      preview={hidePreview ? undefined : <BreadcrumbLivePreview customProps={customProps} />}
      hidePreview={hidePreview}
      modifiedCount={modifiedCount}
      onReset={handleReset}
      onViewCode={onViewCode}
      description="Interact with props below to customize your breadcrumb trail in real time."
      className={className}
    />
  );
});
