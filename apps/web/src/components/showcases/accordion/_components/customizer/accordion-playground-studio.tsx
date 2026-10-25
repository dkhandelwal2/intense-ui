"use client";

import React from "react";
import { Square, Palette, Maximize2, Type, Smile } from "lucide-react";
import {
  PlaygroundStudio,
  PlaygroundStudioStepData,
} from "@/components/showcases/common";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import {
  SIZES,
  WEIGHTS,
  ICON_TYPES,
  ICON_POSITIONS,
  DEFAULT_CUSTOM_PROPS,
  getModifiedCount,
} from "./constants";
import { CustomProps } from "../../types";
import { AccordionVariantRenderer } from "../accordion-variant-renderer";

export interface AccordionPlaygroundStudioProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
  className?: string;
}

export function AccordionLivePreview({
  customProps,
}: {
  customProps: CustomProps;
}) {
  return (
    <div className="w-full max-w-[320px] 2xl:max-w-[380px] flex items-center justify-center py-2 px-1">
      <div className="w-full">
        <AccordionVariantRenderer id="customization" customProps={customProps} />
      </div>
    </div>
  );
}

export function AccordionPlaygroundStudio({
  customProps,
  onChange,
  className,
}: AccordionPlaygroundStudioProps) {
  const modifiedCount = getModifiedCount(customProps);

  const steps: PlaygroundStudioStepData[] = [
    // Step 1: Border & Radius (Palette: Theme Primary - Violet)
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
      rows: [
        {
          id: "bw-0",
          label: "No Border",
          spec: "0px outline border",
          thumbnail: <span className="font-mono text-xs">0px</span>,
          isSelected: customProps.borderWidth === 0,
          onSelect: () => onChange((prev) => ({ ...prev, borderWidth: 0, hideBorder: true })),
        },
        {
          id: "bw-1",
          label: "Hairline Border",
          spec: "1px default outline",
          thumbnail: <span className="font-mono text-xs">1px</span>,
          isSelected: customProps.borderWidth === 1 && !customProps.hideBorder,
          onSelect: () => onChange((prev) => ({ ...prev, borderWidth: 1, hideBorder: false })),
        },
        {
          id: "bw-2",
          label: "Medium Stroke",
          spec: "2px accented border",
          thumbnail: <span className="font-mono text-xs">2px</span>,
          isSelected: customProps.borderWidth === 2,
          onSelect: () => onChange((prev) => ({ ...prev, borderWidth: 2, hideBorder: false })),
        },
        {
          id: "br-8",
          label: "Rounded 8px",
          spec: "Standard curved edge",
          thumbnail: <span className="font-mono text-xs">8px</span>,
          isSelected: customProps.borderRadius === 8,
          onSelect: () => onChange((prev) => ({ ...prev, borderRadius: 8 })),
        },
        {
          id: "br-16",
          label: "Smooth 16px",
          spec: "Generous rounded radius",
          thumbnail: <span className="font-mono text-xs">16px</span>,
          isSelected: customProps.borderRadius === 16,
          onSelect: () => onChange((prev) => ({ ...prev, borderRadius: 16 })),
        },
      ],
    },

    // Step 2: Theme Colors (Palette: Blue)
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
          <div>
            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Border Accent Color
            </span>
            <ColorGrid
              value={customProps.borderColor || ""}
              defaultValue=""
              onChange={(color) =>
                onChange((prev) => ({ ...prev, borderColor: color }))
              }
              onClear={() =>
                onChange((prev) => ({
                  ...prev,
                  borderColor: "",
                }))
              }
              colors={PALETTE_COLORS}
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Heading Title Color
            </span>
            <ColorGrid
              value={customProps.headingColor || ""}
              defaultValue=""
              onChange={(color) =>
                onChange((prev) => ({ ...prev, headingColor: color }))
              }
              onClear={() =>
                onChange((prev) => ({ ...prev, headingColor: "" }))
              }
              colors={PALETTE_COLORS}
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Content Text Color
            </span>
            <ColorGrid
              value={customProps.contentColor || ""}
              defaultValue=""
              onChange={(color) =>
                onChange((prev) => ({ ...prev, contentColor: color }))
              }
              onClear={() =>
                onChange((prev) => ({ ...prev, contentColor: "" }))
              }
              colors={PALETTE_COLORS}
            />
          </div>
        </div>
      ),
    },

    // Step 3: Sizing (Palette: Emerald Green)
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
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {sz}
          </span>
        ),
        isSelected: customProps.size === sz,
        onSelect: () => onChange((prev) => ({ ...prev, size: sz })),
      })),
    },

    // Step 4: Typography & Weight (Palette: Orange)
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
          id: w,
          label: `${w} Weight`,
          spec: `Set trigger font weight to ${w.toLowerCase()}`,
          thumbnail: <span className="font-mono text-xs">{w === "Bold" ? "𝐁" : "B"}</span>,
          isSelected: (customProps.weight || "Default") === w,
          onSelect: () => onChange((prev) => ({ ...prev, weight: w })),
        })),
        {
          id: "underline",
          label: "Heading Underline",
          spec: "Show animated underline on hover",
          thumbnail: <span className="text-xs"><u>Aa</u></span>,
          actionType: "toggle" as const,
          toggleChecked: !!customProps.headingUnderline,
          onToggleChange: (checked: boolean) =>
            onChange((prev) => ({ ...prev, headingUnderline: checked })),
          onSelect: () =>
            onChange((prev) => ({ ...prev, headingUnderline: !prev.headingUnderline })),
        },
      ],
    },

    // Step 5: Icons & Trigger (Palette: Rose Pink)
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
          id: `pos-${pos}`,
          label: `${pos} Alignment`,
          spec: `Place chevron on the ${pos.toLowerCase()}`,
          thumbnail: <span className="text-sm">{pos === "Right" ? "→" : "←"}</span>,
          isSelected: (customProps.iconPosition || "Right") === pos,
          onSelect: () => onChange((prev) => ({ ...prev, iconPosition: pos })),
        })),
        ...ICON_TYPES.map((type) => ({
          id: `type-${type}`,
          label: `${type} Icon`,
          spec: type === "Custom" ? "Star glyph" : "Chevron arrow",
          thumbnail: <span className="text-sm">{type === "Custom" ? "★" : "⌄"}</span>,
          isSelected: (customProps.iconType || "Default") === type,
          onSelect: () => onChange((prev) => ({ ...prev, iconType: type })),
        })),
        {
          id: "hide-icon",
          label: "Hide Trigger Icon",
          spec: "Suppress the indicator completely",
          thumbnail: <span className="text-xs">🚫</span>,
          actionType: "toggle" as const,
          toggleChecked: !!customProps.hideIcon,
          onToggleChange: (checked: boolean) =>
            onChange((prev) => ({ ...prev, hideIcon: checked })),
          onSelect: () =>
            onChange((prev) => ({ ...prev, hideIcon: !prev.hideIcon })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      preview={<AccordionLivePreview customProps={customProps} />}
      modifiedCount={modifiedCount}
      onReset={() => onChange(DEFAULT_CUSTOM_PROPS)}
      className={className}
    />
  );
}
