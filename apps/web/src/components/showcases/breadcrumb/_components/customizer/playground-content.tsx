"use client";

import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@registry/components/switch";
import { ColorGrid, getDisplayColor } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BREADCRUMB_VARIANTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
} from "./constants";
import { CustomProps, BreadcrumbSeparatorType } from "../../types";
import { BreadcrumbVariant, BreadcrumbSize } from "@/components/ui/breadcrumb";

export interface PlaygroundContentProps {
  activeTab: string;
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

const VARIANT_INFO: Record<
  string,
  { label: string; desc: string; icon: string }
> = {
  default: {
    label: "Default",
    desc: "Clean standard links with subtle hover effect",
    icon: "📄",
  },
  chips: {
    label: "Chips / Pills",
    desc: "Interactive rounded pill badges with distinct surfaces",
    icon: "💊",
  },
  gooey: {
    label: "Gooey",
    desc: "Fluid spring blob active indicator",
    icon: "✨",
  },
  outline: {
    label: "Outline",
    desc: "Modern subtle border badge segments",
    icon: "🔲",
  },
  ghost: {
    label: "Ghost",
    desc: "Minimalist transparent link buttons",
    icon: "👻",
  },
};

const SEPARATOR_INFO: Record<
  string,
  { icon: string; label: string; desc: string }
> = {
  chevron: { icon: "›", label: "Chevron", desc: "Classic right angle bracket" },
  slash: { icon: "/", label: "Slash", desc: "Modern UNIX path delimiter" },
  arrow: { icon: "→", label: "Arrow", desc: "Direct flow direction arrow" },
  chevrons: { icon: "»", label: "Double", desc: "Prominent double chevron" },
  dot: { icon: "•", label: "Bullet", desc: "Centered dot delimiter" },
  none: { icon: "—", label: "None", desc: "Gap without visual delimiter" },
};

const SIZE_INFO: Record<
  string,
  { label: string; badge: string; desc: string }
> = {
  sm: {
    label: "Small",
    badge: "SM",
    desc: "Compact typography & tight padding for dense headers",
  },
  md: {
    label: "Medium",
    badge: "MD",
    desc: "Balanced standard scale for general application navigation",
  },
  lg: {
    label: "Large",
    badge: "LG",
    desc: "Spacious prominent badges with larger touch targets",
  },
};

export function PlaygroundContent({
  activeTab,
  customProps,
  onChange,
}: PlaygroundContentProps) {
  const contentAnimation = {
    initial: { opacity: 0, y: 6, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.99 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  };

  switch (activeTab) {
    case "variant":
      return (
        <motion.div key="tab-variant" {...contentAnimation} className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <span>🏷️</span>
                <span>Variant & Visual Style</span>
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Structural and background style of trail segments
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-bold capitalize">
              {customProps.variant}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {BREADCRUMB_VARIANTS.map((v) => {
              const isSelected = customProps.variant === v.id;
              const isGhost = v.id === "ghost";
              const info = VARIANT_INFO[v.id] || {
                label: v.label,
                desc: "",
                icon: "🏷️",
              };

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      variant: v.id as BreadcrumbVariant,
                    }))
                  }
                  className={cn(
                    "p-3 rounded-xl transition-all cursor-pointer border text-left flex flex-col justify-between group",
                    isGhost && "col-span-2",
                    isSelected
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-sm font-semibold"
                      : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                  )}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="text-sm">{info.icon}</span>
                      <span>{info.label}</span>
                    </span>
                    {isSelected && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <div
                    className={cn(
                      "text-[10px] mt-1.5 line-clamp-1",
                      isSelected
                        ? "text-white/85"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {info.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      );

    case "separator":
      return (
        <motion.div
          key="tab-separator"
          {...contentAnimation}
          className="space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <span>✂️</span>
                <span>Separator Delimiter</span>
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Delimiter icon placed between navigation segments
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold capitalize">
              {customProps.separator}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {BREADCRUMB_SEPARATORS.map((sep) => {
              const isSelected = customProps.separator === sep.id;
              const info = SEPARATOR_INFO[sep.id] || {
                icon: "›",
                label: sep.label,
                desc: "",
              };

              return (
                <button
                  key={sep.id}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      separator: sep.id as BreadcrumbSeparatorType,
                    }))
                  }
                  className={cn(
                    "p-3 rounded-xl transition-all cursor-pointer border flex flex-col items-center justify-center text-center gap-1.5",
                    isSelected
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-sm font-semibold"
                      : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                  )}
                >
                  <span className="text-base font-mono font-bold leading-none">
                    {info.icon}
                  </span>
                  <span className="text-xs">{info.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      );

    case "size":
      return (
        <motion.div key="tab-size" {...contentAnimation} className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <span>📏</span>
                <span>Sizing & Scale</span>
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Scales typography, badge padding, and separator spacing
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold uppercase">
              {customProps.size}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {BREADCRUMB_SIZES.map((sz) => {
              const isSelected = customProps.size === sz.id;
              const info = SIZE_INFO[sz.id] || {
                label: sz.label,
                badge: sz.id.toUpperCase(),
                desc: "",
              };

              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      size: sz.id as BreadcrumbSize,
                    }))
                  }
                  className={cn(
                    "p-3.5 rounded-xl transition-all cursor-pointer border flex flex-col items-center justify-center text-center gap-1",
                    isSelected
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-sm font-semibold"
                      : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                  )}
                >
                  <span className="text-sm font-bold uppercase">
                    {info.badge}
                  </span>
                  <span
                    className={cn(
                      "text-[10px]",
                      isSelected
                        ? "text-white/80"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {info.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      );

    case "features":
      return (
        <motion.div
          key="tab-features"
          {...contentAnimation}
          className="space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <span>🎭</span>
                <span>Emojis & Popover Disclosure</span>
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Enable expressive visual emojis and collapsed intermediate routes
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-2xs">
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <span>Show Emojis</span>
                  <span className="text-sm">🏠📁</span>
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Display contextual emoji prefixes before segment labels
                </p>
              </div>
              <Switch
                checked={customProps.showIcons}
                onChange={(checked) =>
                  onChange((prev) => ({ ...prev, showIcons: checked }))
                }
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-2xs">
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <span>Collapsed Dropdown</span>
                  <span className="text-sm">⋯</span>
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Collapse intermediate steps into an animated popover
                </p>
              </div>
              <Switch
                checked={customProps.hasDropdown}
                onChange={(checked) =>
                  onChange((prev) => ({ ...prev, hasDropdown: checked }))
                }
                size="sm"
              />
            </div>
          </div>
        </motion.div>
      );

    case "colors":
      return (
        <motion.div
          key="tab-colors"
          {...contentAnimation}
          className="space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <span>🎨</span>
                <span>Color Accents</span>
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Customize active route and separator delimiter color accents
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-bold">
              {getDisplayColor(
                customProps.activeColor || "var(--theme-primary)"
              )}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Active Page Color
              </span>
              <ColorGrid
                value={customProps.activeColor || "var(--theme-primary)"}
                onChange={(color) =>
                  onChange((prev) => ({ ...prev, activeColor: color }))
                }
                onClear={() =>
                  onChange((prev) => ({
                    ...prev,
                    activeColor: "var(--theme-primary)",
                  }))
                }
                colors={PALETTE_COLORS}
              />
            </div>

            <div>
              <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Separator Delimiter Color
              </span>
              <ColorGrid
                value={customProps.separatorColor || ""}
                onChange={(color) =>
                  onChange((prev) => ({ ...prev, separatorColor: color }))
                }
                onClear={() =>
                  onChange((prev) => ({ ...prev, separatorColor: "" }))
                }
                colors={PALETTE_COLORS}
              />
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
