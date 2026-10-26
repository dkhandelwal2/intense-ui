"use client";

import React from "react";
import { Layers, Maximize2, Sparkles, Palette } from "lucide-react";
import {
  PlaygroundStudio,
  PlaygroundStudioStepData,
} from "@/components/showcases/common";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import {
  NAVBAR_VARIANTS,
  NAVBAR_SIZES,
  getModifiedCount,
  DEFAULT_CUSTOM_PROPS,
} from "./constants";
import { CustomNavbarProps } from "../../types";
import { NavbarVariant, NavbarSize } from "@/components/ui/nav-bar";
import { NavbarVariantRenderer } from "../navbar-variant-renderer";

export interface NavbarPlaygroundStudioProps {
  customProps: CustomNavbarProps;
  onChange: React.Dispatch<React.SetStateAction<CustomNavbarProps>>;
  className?: string;
}

const VARIANT_INFO: Record<
  string,
  { label: string; desc: string; emoji: string }
> = {
  gooey: { label: "Fluid Gooey", desc: "molten spring island morphing", emoji: "🫧" },
  floating: { label: "Floating Capsule", desc: "glassmorphic pill container", emoji: "💊" },
};

const SIZE_INFO: Record<
  string,
  { label: string; badge: string; desc: string }
> = {
  sm: { label: "Small", badge: "SM", desc: "compact font & padding" },
  md: { label: "Medium", badge: "MD", desc: "standard baseline" },
  lg: { label: "Large", badge: "LG", desc: "spacious touch target" },
};

export function NavbarLivePreview({
  customProps,
}: {
  customProps: CustomNavbarProps;
}) {
  return (
    <div className="w-full flex items-center justify-center origin-center">
      <NavbarVariantRenderer id="customization" customProps={customProps} />
    </div>
  );
}

export function NavbarPlaygroundStudio({
  customProps,
  onChange,
  className,
}: NavbarPlaygroundStudioProps) {
  const modifiedCount = getModifiedCount(customProps);

  const steps: PlaygroundStudioStepData[] = [
    // Step 1: Variant
    {
      id: "variant",
      titleLine1: "Variant",
      titleLine2: "style",
      categoryTag: "01 / 04",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Navbar",
      headerSubtitle: "storehouse",
      headerEmoji: "✨",
      rows: NAVBAR_VARIANTS.map((v) => {
        const isSelected = customProps.variant === v.id;
        const info = VARIANT_INFO[v.id] || { label: v.label, desc: "", emoji: "🏷️" };
        return {
          id: v.id,
          label: info.label,
          spec: info.desc,
          thumbnail: <span>{info.emoji}</span>,
          isSelected,
          onSelect: () =>
            onChange((prev) => ({
              ...prev,
              variant: v.id as NavbarVariant,
            })),
        };
      }),
    },

    // Step 2: Sizing
    {
      id: "size",
      titleLine1: "Scale &",
      titleLine2: "sizing",
      categoryTag: "02 / 04",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Dimensions",
      headerSubtitle: "storehouse",
      headerEmoji: "📐",
      rows: NAVBAR_SIZES.map((sz) => {
        const isSelected = customProps.size === sz.id;
        const info = SIZE_INFO[sz.id] || { label: sz.label, badge: sz.id, desc: "" };
        return {
          id: sz.id,
          label: info.label,
          spec: info.desc,
          thumbnail: (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
              {info.badge}
            </span>
          ),
          isSelected,
          onSelect: () =>
            onChange((prev) => ({
              ...prev,
              size: sz.id as NavbarSize,
            })),
        };
      }),
    },

    // Step 3: Features
    {
      id: "features",
      titleLine1: "Extra",
      titleLine2: "features",
      categoryTag: "03 / 04",
      colorGradient: "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      headerTitle: "Toggles",
      headerSubtitle: "storehouse",
      headerEmoji: "🔮",
      rows: [
        {
          id: "icons",
          label: "Show Emojis",
          spec: "Prefix emoji icons to tabs",
          thumbnail: <span className="text-sm">🏠</span>,
          actionType: "toggle",
          toggleChecked: !!customProps.showIcons,
          onToggleChange: (checked) =>
            onChange((prev) => ({ ...prev, showIcons: checked })),
          onSelect: () =>
            onChange((prev) => ({ ...prev, showIcons: !prev.showIcons })),
        },
        {
          id: "badges",
          label: "Status Badges",
          spec: "Display contextual badge tags",
          thumbnail: <span className="text-xs font-mono font-bold">PRO</span>,
          actionType: "toggle",
          toggleChecked: !!customProps.showBadges,
          onToggleChange: (checked) =>
            onChange((prev) => ({ ...prev, showBadges: checked })),
          onSelect: () =>
            onChange((prev) => ({ ...prev, showBadges: !prev.showBadges })),
        },
      ],
    },

    // Step 4: Palette
    {
      id: "colors",
      titleLine1: "Theme",
      titleLine2: "colors",
      categoryTag: "04 / 04",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Palette",
      headerSubtitle: "storehouse",
      headerEmoji: "🎨",
      customRightContent: (
        <div className="space-y-3 pt-1">
          <div>
            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Active Segment Color
            </span>
            <ColorGrid
              value={customProps.activeColor || ""}
              defaultValue=""
              onChange={(color) =>
                onChange((prev) => ({ ...prev, activeColor: color }))
              }
              onClear={() =>
                onChange((prev) => ({
                  ...prev,
                  activeColor: "",
                }))
              }
              colors={PALETTE_COLORS}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      modifiedCount={modifiedCount}
      preview={<NavbarLivePreview customProps={customProps} />}
      className={className}
      description="Interact with props below to customize your navigation bar in real time."
      onReset={() => onChange(DEFAULT_CUSTOM_PROPS)}
    />
  );
}
