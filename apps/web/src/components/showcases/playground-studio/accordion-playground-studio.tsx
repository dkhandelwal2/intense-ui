"use client";

import React from "react";
import { Square, Palette, Maximize2, Type, Smile } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import {
  ACCORDION_SIZES as SIZES,
  ACCORDION_WEIGHTS as WEIGHTS,
  ACCORDION_ICON_TYPES as ICON_TYPES,
  ACCORDION_ICON_POSITIONS as ICON_POSITIONS,
  ACCORDION_DEFAULT_CUSTOM_PROPS as DEFAULT_CUSTOM_PROPS,
  getAccordionModifiedCount as getModifiedCount,
} from "./constants";
import { CustomProps } from "@/components/showcases/accordion/types";
import { AccordionVariantRenderer } from "@/components/showcases/accordion/_components/accordion-variant-renderer";

export interface AccordionPlaygroundStudioProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

export const AccordionLivePreview = React.memo(function AccordionLivePreview({
  customProps,
}: {
  customProps: CustomProps;
}) {
  return (
    <div className="w-full flex items-center justify-center py-2 px-1">
      <div className="w-full">
        <AccordionVariantRenderer id="customization" customProps={customProps} />
      </div>
    </div>
  );
});

const BORDER_OPTIONS = [
  { id: "bw-0", label: "No Border", spec: "0px outline border", text: "0px", apply: { borderWidth: 0, hideBorder: true } },
  { id: "bw-1", label: "Hairline Border", spec: "1px default outline", text: "1px", apply: { borderWidth: 1, hideBorder: false } },
  { id: "bw-2", label: "Medium Stroke", spec: "2px accented border", text: "2px", apply: { borderWidth: 2, hideBorder: false } },
  { id: "br-8", label: "Rounded 8px", spec: "Standard curved edge", text: "8px", apply: { borderRadius: 8 } },
  { id: "br-16", label: "Smooth 16px", spec: "Generous rounded radius", text: "16px", apply: { borderRadius: 16 } },
];

export const AccordionPlaygroundStudio = React.memo(function AccordionPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: AccordionPlaygroundStudioProps) {
  const modifiedCount = React.useMemo(() => getModifiedCount(customProps), [customProps]);
  const handleReset = React.useCallback(() => onChange(DEFAULT_CUSTOM_PROPS), [onChange]);

  const steps: PlaygroundStudioStepData[] = React.useMemo(() => [
    {
      id: "border",
      titleLine1: "Border &",
      titleLine2: "radius",
      categoryTag: "01 / 05",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Square className="w-3.5 h-3.5" />,
      headerTitle: "Borders",
      headerSubtitle: "storehouse",
      headerEmoji: "🔲",
      rows: BORDER_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        spec: opt.spec,
        thumbnail: <span className="font-mono text-xs">{opt.text}</span>,
        isSelected: opt.id === "bw-0" ? customProps.borderWidth === 0 : opt.id === "bw-1" ? customProps.borderWidth === 1 && !customProps.hideBorder : opt.id === "bw-2" ? customProps.borderWidth === 2 : opt.id === "br-8" ? customProps.borderRadius === 8 : customProps.borderRadius === 16,
        onSelect: () => onChange((prev) => ({ ...prev, ...opt.apply })),
      })),
    },
    {
      id: "colors",
      titleLine1: "Theme",
      titleLine2: "colors",
      categoryTag: "02 / 05",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Palette",
      headerSubtitle: "storehouse",
      headerEmoji: "🎨",
      customRightContent: (
        <div className="space-y-3 pt-1">
          {[
            { label: "Border Accent Color", val: customProps.borderColor, key: "borderColor" },
            { label: "Heading Title Color", val: customProps.headingColor, key: "headingColor" },
            { label: "Content Text Color", val: customProps.contentColor, key: "contentColor" },
          ].map((f) => (
            <div key={f.key}>
              <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">{f.label}</span>
              <ColorGrid size="sm" value={f.val || ""} defaultValue="" onChange={(c) => onChange((p) => ({ ...p, [f.key]: c }))} onClear={() => onChange((p) => ({ ...p, [f.key]: "" }))} colors={PALETTE_COLORS} />
            </div>
          ))}
        </div>
      ),
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
      rows: SIZES.map((sz) => ({
        id: sz,
        label: `${sz.toUpperCase()} Size`,
        spec: `Scale font & padding to ${sz}`,
        thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">{sz}</span>,
        isSelected: customProps.size === sz,
        onSelect: () => onChange((prev) => ({ ...prev, size: sz })),
      })),
    },
    {
      id: "typography",
      titleLine1: "Type &",
      titleLine2: "weight",
      categoryTag: "04 / 05",
      colorGradient: "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]",
      icon: <Type className="w-3.5 h-3.5" />,
      headerTitle: "Headings",
      headerSubtitle: "storehouse",
      headerEmoji: "✍️",
      rows: [
        ...WEIGHTS.map((w) => ({
          id: w, label: `${w} Weight`, spec: `Set trigger font weight to ${w.toLowerCase()}`, thumbnail: <span className="font-mono text-xs">{w === "Bold" ? "𝐁" : "B"}</span>, isSelected: (customProps.weight || "Default") === w, onSelect: () => onChange((p) => ({ ...p, weight: w })),
        })),
        {
          id: "underline", label: "Heading Underline", spec: "Show animated underline on hover", thumbnail: <span className="text-xs"><u>Aa</u></span>, actionType: "toggle" as const, toggleChecked: !!customProps.headingUnderline, onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, headingUnderline: checked })), onSelect: () => onChange((p) => ({ ...p, headingUnderline: !p.headingUnderline })),
        },
      ],
    },
    {
      id: "icons",
      titleLine1: "Icon &",
      titleLine2: "trigger",
      categoryTag: "05 / 05",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Smile className="w-3.5 h-3.5" />,
      headerTitle: "Triggers",
      headerSubtitle: "storehouse",
      headerEmoji: "✨",
      rows: [
        ...ICON_POSITIONS.map((pos) => ({
          id: `pos-${pos}`, label: `${pos} Alignment`, spec: `Place chevron on the ${pos.toLowerCase()}`, thumbnail: <span className="text-sm">{pos === "Right" ? "→" : "←"}</span>, isSelected: (customProps.iconPosition || "Right") === pos, onSelect: () => onChange((p) => ({ ...p, iconPosition: pos })),
        })),
        ...ICON_TYPES.map((type) => ({
          id: `type-${type}`, label: `${type} Icon`, spec: type === "Custom" ? "Star glyph" : "Chevron arrow", thumbnail: <span className="text-sm">{type === "Custom" ? "★" : "⌄"}</span>, isSelected: (customProps.iconType || "Default") === type, onSelect: () => onChange((p) => ({ ...p, iconType: type })),
        })),
        {
          id: "hide-icon", label: "Hide Trigger Icon", spec: "Suppress the indicator completely", thumbnail: <span className="text-xs">🚫</span>, actionType: "toggle" as const, toggleChecked: !!customProps.hideIcon, onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, hideIcon: checked })), onSelect: () => onChange((p) => ({ ...p, hideIcon: !p.hideIcon })),
        },
      ],
    },
  ], [customProps, onChange]);

  return (
    <PlaygroundStudio
      steps={steps}
      preview={hidePreview ? undefined : <AccordionLivePreview customProps={customProps} />}
      hidePreview={hidePreview}
      modifiedCount={modifiedCount}
      onReset={handleReset}
      onViewCode={onViewCode}
      className={className}
    />
  );
});
