"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, GripHorizontal, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "./tooltip";

export interface ColorPaletteProps {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
  onClear?: () => void;
  draggable?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const getDisplayColor = (val: string) => {
  if (val === "var(--theme-primary)") return "Primary";
  if (!val) return "Default";
  
  const paletteMap: Record<string, string> = {
    "var(--palette-1)": "Blue",
    "var(--palette-2)": "Purple",
    "var(--palette-3)": "Red",
    "var(--palette-4)": "Orange",
    "var(--palette-5)": "Green"
  };
  
  if (paletteMap[val]) return paletteMap[val];
  
  return val;
}

const resolveToHex = (val: string) => {
  if (!val) return "#000000";
  if (val === "var(--theme-primary)") return "#FF0084";
  const hexMap: Record<string, string> = {
    "var(--palette-1)": "#3b82f6",
    "var(--palette-2)": "#a855f7",
    "var(--palette-3)": "#ef4444",
    "var(--palette-4)": "#f97316",
    "var(--palette-5)": "#22c55e"
  };
  if (hexMap[val]) return hexMap[val];
  if (/^#[0-9A-Fa-f]{6}$/.test(val)) return val;
  return "#000000";
}

export function ColorPalette({ colors, value, onChange, onClear, draggable, orientation = "horizontal", className }: ColorPaletteProps) {
  // Enforce max 5 colors as requested
  const displayColors = colors.slice(0, 6);
  const isVertical = orientation === "vertical";
  const tooltipPos = isVertical ? "right" : "top";

  const Content = (
    <motion.div 
      layout
      className={cn(
        "flex items-center gap-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-full shadow-lg",
        isVertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {draggable && (
        <motion.div layout className={cn(
          "text-zinc-400 dark:text-zinc-600 cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0",
          isVertical ? "pt-1 pb-0.5" : "pl-1 pr-0.5"
        )}>
          {isVertical ? <GripHorizontal className="w-4 h-4" /> : <GripVertical className="w-4 h-4" />}
        </motion.div>
      )}

      {displayColors.map((color, index) => (
        <Tooltip key={`${color}-${index}`} content={getDisplayColor(color)} position={tooltipPos} bgColor={color}>
          <motion.button
            layout
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(color)}
            className={cn(
              "w-6 h-6 rounded-full transition-shadow shrink-0",
              value === color ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950" : ""
            )}
            style={{ backgroundColor: color }}
          />
        </Tooltip>
      ))}

      {/* Native color picker option */}
      <Tooltip 
        content="Custom" 
        position={tooltipPos} 
        bgColor={value && !displayColors.includes(value) ? value : undefined}
      >
        <motion.div layout className="relative shrink-0">
          <motion.label
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500",
              value && !displayColors.includes(value) ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950 border-transparent" : ""
            )}
            style={{ backgroundColor: value && !displayColors.includes(value) ? value : 'transparent' }}
          >
            {(!value || displayColors.includes(value)) && <Plus className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
            <input
              type="color"
              value={resolveToHex(value)}
              onChange={(e) => onChange(e.target.value)}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </motion.label>
        </motion.div>
      </Tooltip>

      <AnimatePresence>
        {onClear && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={cn("flex items-center gap-2 shrink-0", isVertical ? "flex-col" : "flex-row")}
          >
            <div className={cn("bg-zinc-200 dark:bg-zinc-800", isVertical ? "h-px w-6 my-0.5" : "w-px h-6 mx-0.5")} />
            <Tooltip content="Reset to default" position={tooltipPos}>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className="flex items-center justify-center w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </motion.button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (draggable) {
    return (
      <motion.div drag dragMomentum={false} className="inline-block relative z-40 touch-none">
        {Content}
      </motion.div>
    );
  }

  return <div className="inline-block relative">{Content}</div>;
}
