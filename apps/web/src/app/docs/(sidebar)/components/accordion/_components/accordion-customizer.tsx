"use client";

import React from "react";
import { Slider } from "@registry/components/slider";
import { ColorPalette } from "@registry/components/color-palette";
import { Switch } from "@registry/components/switch";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CustomProps } from "../types";

interface AccordionCustomizerProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const WEIGHTS = ["Default", "Bold"] as const;
const ICON_TYPES = ["Default", "Custom"] as const;
const ICON_POSITIONS = ["Right", "Left"] as const;

export function AccordionCustomizer({
  customProps,
  onChange,
}: AccordionCustomizerProps) {
  const isBorderZero = customProps.borderWidth === 0;

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-card text-card-foreground shadow-xs m-4">
      <h3 className="font-semibold text-base sm:text-lg mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[var(--theme-primary)] rounded-full" />
        Interactive Props
      </h3>

      <div className="space-y-8">
        {/* Border Group */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            Border Styling
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                <span>Hide Border</span>
                <Switch
                  checked={!!customProps.hideBorder}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hideBorder: checked }))
                  }
                  size="md"
                />
              </label>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label
                className={cn(
                  "flex justify-between text-xs font-medium mb-2 transition-opacity",
                  customProps.hideBorder && "opacity-50"
                )}
              >
                <span>Border Width</span>
                <span className="text-muted-foreground">
                  {customProps.borderWidth}px
                </span>
              </label>
              <Slider
                min={0}
                max={4}
                value={customProps.borderWidth || 0}
                onChange={(v) =>
                  onChange((prev) => ({ ...prev, borderWidth: v }))
                }
                disabled={!!customProps.hideBorder}
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label
                className={cn(
                  "flex justify-between text-xs font-medium mb-2 transition-opacity",
                  (customProps.hideBorder || isBorderZero) && "opacity-50"
                )}
              >
                <span>Border Radius</span>
                <span className="text-muted-foreground">
                  {customProps.borderRadius}px
                </span>
              </label>
              <Slider
                min={0}
                max={32}
                value={customProps.borderRadius || 0}
                onChange={(v) =>
                  onChange((prev) => ({ ...prev, borderRadius: v }))
                }
                disabled={!!customProps.hideBorder || isBorderZero}
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label
                className={cn(
                  "text-xs font-medium mb-1 transition-opacity",
                  customProps.hideBorder && "opacity-50"
                )}
              >
                Border Color
              </label>
              <div className="flex justify-between items-center min-h-9">
                <ColorPalette
                  colors={PALETTE_COLORS}
                  value={customProps.borderColor || ""}
                  onChange={(c) =>
                    onChange((prev) => ({ ...prev, borderColor: c }))
                  }
                  onClear={
                    customProps.borderColor !== "var(--theme-primary)"
                      ? () =>
                          onChange((prev) => ({
                            ...prev,
                            borderColor: "var(--theme-primary)",
                          }))
                      : undefined
                  }
                  draggable={false}
                  className={cn(
                    (customProps.hideBorder || isBorderZero) &&
                      "opacity-50 pointer-events-none"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />

        {/* Header Typography Group */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            Header Typography
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between text-xs font-medium mb-2">
                <span>Button Size</span>
                <span className="text-muted-foreground">
                  {customProps.size}
                </span>
              </label>
              <Slider
                min={0}
                max={4}
                value={SIZES.indexOf((customProps.size || "md") as (typeof SIZES)[number])}
                onChange={(v) =>
                  onChange((prev) => ({ ...prev, size: SIZES[v] }))
                }
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between text-xs font-medium mb-2">
                <span>Button Weight</span>
                <span className="text-muted-foreground">
                  {customProps.weight}
                </span>
              </label>
              <Slider
                min={0}
                max={1}
                value={customProps.weight === "Bold" ? 1 : 0}
                onChange={(v) =>
                  onChange((prev) => ({ ...prev, weight: WEIGHTS[v] }))
                }
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                <span>Heading Underline</span>
                <Switch
                  checked={!!customProps.headingUnderline}
                  onChange={(checked) =>
                    onChange((prev) => ({
                      ...prev,
                      headingUnderline: checked,
                    }))
                  }
                  size="md"
                />
              </label>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="text-xs font-medium mb-1">Heading Color</label>
              <div className="flex justify-between items-center min-h-9">
                <ColorPalette
                  colors={PALETTE_COLORS}
                  value={customProps.headingColor || ""}
                  onChange={(c) =>
                    onChange((prev) => ({ ...prev, headingColor: c }))
                  }
                  onClear={
                    customProps.headingColor
                      ? () =>
                          onChange((prev) => ({ ...prev, headingColor: "" }))
                      : undefined
                  }
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />

        {/* Icon Group */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            Icon Styling
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                <span>Hide Icon</span>
                <Switch
                  checked={!!customProps.hideIcon}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hideIcon: checked }))
                  }
                  size="md"
                />
              </label>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label
                className={cn(
                  "flex justify-between text-xs font-medium mb-2 transition-opacity",
                  customProps.hideIcon && "opacity-50"
                )}
              >
                <span>Icon Type</span>
                <span className="text-muted-foreground">
                  {customProps.iconType}
                </span>
              </label>
              <Slider
                min={0}
                max={1}
                value={customProps.iconType === "Custom" ? 1 : 0}
                onChange={(v) =>
                  onChange((prev) => ({ ...prev, iconType: ICON_TYPES[v] }))
                }
                disabled={!!customProps.hideIcon}
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label
                className={cn(
                  "flex justify-between text-xs font-medium mb-2 transition-opacity",
                  customProps.hideIcon && "opacity-50"
                )}
              >
                <span>Icon Position</span>
                <span className="text-muted-foreground">
                  {customProps.iconPosition}
                </span>
              </label>
              <Slider
                min={0}
                max={1}
                value={customProps.iconPosition === "Left" ? 1 : 0}
                onChange={(v) =>
                  onChange((prev) => ({
                    ...prev,
                    iconPosition: ICON_POSITIONS[v],
                  }))
                }
                disabled={!!customProps.hideIcon}
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />

        {/* Behavior & Content Group */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            Behavior & Content
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                <span>Expanded</span>
                <Switch
                  checked={!!customProps.isDefaultExpanded}
                  onChange={(checked) =>
                    onChange((prev) => ({
                      ...prev,
                      isDefaultExpanded: checked,
                    }))
                  }
                  size="md"
                />
              </label>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                <span>Enable onClick</span>
                <Switch
                  checked={!!customProps.hasOnClick}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hasOnClick: checked }))
                  }
                  size="md"
                />
              </label>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="text-xs font-medium mb-1">
                Content Text Color
              </label>
              <div className="flex justify-between items-center min-h-9">
                <ColorPalette
                  colors={PALETTE_COLORS}
                  value={customProps.contentColor || ""}
                  onChange={(c) =>
                    onChange((prev) => ({ ...prev, contentColor: c }))
                  }
                  onClear={
                    customProps.contentColor
                      ? () =>
                          onChange((prev) => ({ ...prev, contentColor: "" }))
                      : undefined
                  }
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
