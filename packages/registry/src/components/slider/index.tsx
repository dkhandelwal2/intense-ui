"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SliderProps, RangeSliderProps } from "./types";
import { MultiSlider } from "./multi-slider";

export function Slider({
  value,
  onChange,
  leftIcon,
  rightIcon,
  showInput = false,
  className,
  ...props
}: SliderProps) {
  const isVertical = props.orientation === "vertical";
  return (
    <div className={cn("flex flex-col w-full", isVertical && "items-center", className)}>
      <div className={cn("flex items-center gap-3 w-full", isVertical && "justify-center")}>
        {leftIcon && (
          <span
            onClick={() => onChange(props.min ?? 0)}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            {leftIcon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <MultiSlider values={[value]} onChange={(vals) => onChange(vals[0])} {...props} />
        </div>
        {rightIcon && (
          <span
            onClick={() => onChange(props.max ?? 100)}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            {rightIcon}
          </span>
        )}
        {showInput && (
          <input
            type="number"
            min={props.min ?? 0}
            max={props.max ?? 100}
            step={props.step ?? 1}
            value={value}
            disabled={props.disabled}
            onChange={(e) =>
              onChange(
                Math.max(
                  props.min ?? 0,
                  Math.min(props.max ?? 100, Number(e.target.value))
                )
              )
            }
            className="w-16 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background text-foreground text-center focus:outline-none focus:ring-1 focus:ring-primary shrink-0"
          />
        )}
      </div>
    </div>
  );
}

export function RangeSlider({ value, onChange, ...props }: RangeSliderProps) {
  return (
    <MultiSlider
      values={value}
      onChange={(vals) => onChange([vals[0], vals[1]])}
      {...props}
    />
  );
}

export { MultiSlider } from "./multi-slider";
export * from "./types";
export * from "./constants";
