"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, GripHorizontal, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@registry/components/tooltip";

export interface ColorGridProps {
  colors?: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
  draggable?: boolean;
  orientation?: "horizontal" | "vertical";
  columns?: number;
  size?: "sm" | "md" | "lg";
  showCustomPicker?: boolean;
  className?: string;
}

export type ColorPaletteProps = ColorGridProps;

export const DEFAULT_COLORS = [
  "var(--theme-primary)",
  "var(--palette-1)",
  "var(--palette-2)",
  "var(--palette-3)",
  "var(--palette-4)",
  "var(--palette-5)",
];

export const getDisplayColor = (val: string) => {
  if (val === "var(--theme-primary)") return "Primary";
  if (!val) return "Default";

  const paletteMap: Record<string, string> = {
    "var(--palette-1)": "Blue",
    "var(--palette-2)": "Purple",
    "var(--palette-3)": "Red",
    "var(--palette-4)": "Orange",
    "var(--palette-5)": "Green",
  };

  if (paletteMap[val]) return paletteMap[val];
  return val;
};

const resolveToHex = (val: string) => {
  if (!val) return "#000000";
  if (val === "var(--theme-primary)") return "#FF0084";
  const hexMap: Record<string, string> = {
    "var(--palette-1)": "#3b82f6",
    "var(--palette-2)": "#a855f7",
    "var(--palette-3)": "#ef4444",
    "var(--palette-4)": "#f97316",
    "var(--palette-5)": "#22c55e",
  };
  if (hexMap[val]) return hexMap[val];
  if (/^#[0-9A-Fa-f]{6}$/.test(val)) return val;
  return "#000000";
};

const SIZE_MAP = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const PADDING_MAP = {
  sm: "p-1",
  md: "p-1.5",
  lg: "p-2",
};

const GAP_MAP = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

export function ColorGrid({
  colors = DEFAULT_COLORS,
  value = "",
  defaultValue,
  onChange,
  onClear,
  draggable = false,
  orientation = "horizontal",
  columns,
  size = "md",
  showCustomPicker = true,
  className,
}: ColorGridProps) {
  const isVertical = orientation === "vertical";
  const tooltipPos = isVertical ? "right" : "top";
  const swatchSize = SIZE_MAP[size] || SIZE_MAP.md;

  const isGrid = typeof columns === "number" && columns > 0;
  const hasSelectedValue = Boolean(value) && value !== (defaultValue ?? "");
  const showReset = Boolean(onClear) && hasSelectedValue;

  const Content = (
    <motion.div
      layout
      className={cn(
        "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg",
        PADDING_MAP[size] || PADDING_MAP.md,
        isGrid
          ? cn("grid rounded-2xl", GAP_MAP[size] || GAP_MAP.md)
          : cn(
              "flex items-center rounded-full",
              GAP_MAP[size] || GAP_MAP.md,
              isVertical ? "flex-col" : "flex-row"
            ),
        className
      )}
      style={isGrid ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
    >
      {draggable && !isGrid && (
        <motion.div
          layout
          className={cn(
            "text-zinc-400 dark:text-zinc-600 cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0",
            isVertical ? "pt-1 pb-0.5" : "pl-1 pr-0.5"
          )}
        >
          {isVertical ? <GripHorizontal className="w-4 h-4" /> : <GripVertical className="w-4 h-4" />}
        </motion.div>
      )}

      {colors.map((color, index) => (
        <Tooltip
          key={`${color}-${index}`}
          content={getDisplayColor(color)}
          position={tooltipPos}
          bgColor={color}
        >
          <motion.button
            type="button"
            layout
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange?.(color)}
            className={cn(
              "rounded-full transition-shadow shrink-0 cursor-pointer",
              swatchSize,
              value === color
                ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950"
                : ""
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${getDisplayColor(color)}`}
          />
        </Tooltip>
      ))}

      {/* Native color picker option */}
      {showCustomPicker && (
        <Tooltip
          content="Custom"
          position={tooltipPos}
          bgColor={value && !colors.includes(value) ? value : undefined}
        >
          <motion.div layout className="relative shrink-0">
            <motion.label
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "flex items-center justify-center rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500",
                swatchSize,
                value && !colors.includes(value)
                  ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950 border-transparent"
                  : ""
              )}
              style={{
                backgroundColor:
                  value && !colors.includes(value) ? value : "transparent",
              }}
            >
              {(!value || colors.includes(value)) && (
                <Plus className={cn("text-zinc-400 dark:text-zinc-500", size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")} />
              )}
              <input
                type="color"
                value={resolveToHex(value)}
                onChange={(e) => onChange?.(e.target.value)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                aria-label="Pick custom color"
              />
            </motion.label>
          </motion.div>
        </Tooltip>
      )}

      {/* Reset button */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={cn(
              "flex items-center shrink-0",
              GAP_MAP[size] || GAP_MAP.md,
              isVertical ? "flex-col" : "flex-row"
            )}
          >
            {!isGrid && (
              <div
                className={cn(
                  "bg-zinc-200 dark:bg-zinc-800",
                  isVertical
                    ? size === "sm" ? "h-px w-4 my-0.5" : "h-px w-6 my-0.5"
                    : size === "sm" ? "w-px h-4 mx-0.5" : "w-px h-6 mx-0.5"
                )}
              />
            )}
            <Tooltip content="Reset to default" position={tooltipPos}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className={cn(
                  "flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer",
                  swatchSize
                )}
                aria-label="Reset color"
              >
                <RotateCcw className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
              </motion.button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (draggable && !isGrid) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        className="inline-block relative z-40 touch-none"
      >
        {Content}
      </motion.div>
    );
  }

  return <div className="inline-block relative">{Content}</div>;
}

export const ColorPalette = ColorGrid;
