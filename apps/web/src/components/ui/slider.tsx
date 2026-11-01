"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const Slider = ({ value, min, max, onChange, disabled }: SliderProps) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("relative flex w-full items-center h-5 touch-none select-none", disabled && "opacity-50 pointer-events-none")}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
      />
      <div className="relative w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--theme-primary)]"
          initial={false}
          animate={{ width: `calc(${percentage}% - ${percentage * 0.16}px + 8px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>
      <motion.div
        className="absolute h-4 w-4 bg-background border-2 border-[var(--theme-primary)] rounded-full shadow-md z-10 pointer-events-none"
        initial={false}
        animate={{ left: `calc(${percentage}% - ${percentage * 0.16}px)` }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
};
