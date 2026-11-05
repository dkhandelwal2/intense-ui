"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SliderProps {
  value: number; min?: number; max?: number; step?: number; onChange: (val: number) => void;
  disabled?: boolean; orientation?: "horizontal" | "vertical";
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "zoom";
  fillColor?: string; color?: string; zoomEffect?: boolean; thumbAnimation?: "none" | "pulse" | "glow" | "scale";
  tooltip?: boolean; thumbIcon?: React.ReactNode; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode; showInput?: boolean; className?: string;
}

const INTENT_MAP: Record<string, { track: string; thumb: string; glow: string }> = {
  primary: { track: "bg-[var(--theme-primary)]", thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]", glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]" },
  success: { track: "bg-emerald-500", thumb: "border-emerald-500 text-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]" },
  danger: { track: "bg-rose-500", thumb: "border-rose-500 text-rose-500", glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]" },
  warning: { track: "bg-amber-500", thumb: "border-amber-500 text-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]" },
  info: { track: "bg-sky-500", thumb: "border-sky-500 text-sky-500", glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]" },
  zoom: { track: "bg-[var(--theme-primary)]", thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]", glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]" },
};

export function Slider({
  value, min = 0, max = 100, step = 1, onChange, disabled = false, orientation = "horizontal",
  variant = "primary", fillColor, color, zoomEffect = false, thumbAnimation = "none",
  tooltip = false, thumbIcon, leftIcon, rightIcon, showInput = false, className,
}: SliderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const cfg = INTENT_MAP[variant] || INTENT_MAP.primary;
  const isVertical = orientation === "vertical";
  const activeColor = fillColor || color;
  const isZoomable = zoomEffect || variant === "zoom" || thumbAnimation === "scale";

  const renderTrack = () => (
    <div
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
      className={cn("relative flex items-center touch-none select-none", isVertical ? "h-48 w-6 justify-center flex-col-reverse" : "w-full h-6", disabled && "opacity-50 pointer-events-none")}
    >
      <input
        type="range" min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}
        className={cn("absolute opacity-0 cursor-pointer z-20", isVertical ? "h-full w-full [writing-mode:vertical-lr] [direction:rtl]" : "w-full h-full")}
      />
      <div className={cn("relative rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800", isVertical ? "w-2 h-full" : "w-full h-2")}>
        <motion.div
          className={cn("absolute rounded-full", isVertical ? "w-full bottom-0 left-0" : "h-full top-0 left-0", !activeColor && cfg.track)}
          style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
          animate={isVertical ? { height: `${percentage}%` } : { width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      </div>
      <motion.div
        className={cn("absolute bg-background border-2 rounded-full shadow-md z-10 flex items-center justify-center pointer-events-none transition-shadow", thumbIcon ? "h-6 w-6" : "h-4.5 w-4.5", !activeColor && cfg.thumb, thumbAnimation === "glow" && cfg.glow)}
        style={activeColor ? { borderColor: activeColor, color: activeColor } : undefined} initial={false}
        animate={{ scale: isZoomable ? (isDragging ? 1.25 : isHovered ? 1.15 : 1) : 1, ...(isVertical ? { bottom: `calc(${percentage}% - 10px)` } : { left: `calc(${percentage}% - 10px)` }) }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {isZoomable && (
          <motion.span
            className={cn("absolute rounded-full pointer-events-none -inset-2.5", !activeColor && "bg-current")}
            style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
            animate={{ scale: isDragging ? 1.4 : isHovered ? 1.15 : 0, opacity: isDragging ? 0.35 : isHovered ? 0.22 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        )}
        {thumbAnimation === "pulse" && <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping pointer-events-none" />}
        {thumbIcon && <span className="flex items-center justify-center text-current">{thumbIcon}</span>}
        {tooltip && (isHovered || isDragging || !disabled) && (
          <div className={cn("absolute px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-mono font-bold shadow-md pointer-events-none whitespace-nowrap", isVertical ? "left-7 top-1/2 -translate-y-1/2" : "-top-7 left-1/2 -translate-x-1/2")}>
            {value}
            <div className={cn("absolute border-4 border-transparent", isVertical ? "top-1/2 -translate-y-1/2 -left-1 border-r-zinc-900 dark:border-r-zinc-100" : "top-full left-1/2 -translate-x-1/2 -mt-0.5 border-t-zinc-900 dark:border-t-zinc-100")} />
          </div>
        )}
      </motion.div>
    </div>
  );

  if (isVertical) return <div className={cn("inline-flex flex-col items-center gap-2", className)}>{renderTrack()}</div>;

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      {leftIcon && <span onClick={() => onChange(min)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">{leftIcon}</span>}
      <div className="flex-1 min-w-0">{renderTrack()}</div>
      {rightIcon && <span onClick={() => onChange(max)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">{rightIcon}</span>}
      {showInput && (
        <input
          type="number" min={min} max={max} step={step} value={value} disabled={disabled}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
          className="w-16 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background text-foreground text-center focus:outline-none focus:ring-1 focus:ring-primary shrink-0"
        />
      )}
    </div>
  );
}

export interface RangeSliderProps {
  value: [number, number]; min?: number; max?: number; step?: number; onChange: (val: [number, number]) => void;
  disabled?: boolean; variant?: "primary" | "success" | "danger" | "warning" | "info";
  fillColor?: string; color?: string; zoomEffect?: boolean; tooltip?: boolean; className?: string;
}

export function RangeSlider({
  value, min = 0, max = 100, step = 1, onChange, disabled = false,
  variant = "primary", fillColor, color, zoomEffect = false, tooltip = false, className,
}: RangeSliderProps) {
  const [low, high] = value;
  const [activeThumb, setActiveThumb] = useState<"low" | "high">("low");
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const activeColor = fillColor || color;
  const pMin = Math.max(0, Math.min(100, ((low - min) / (max - min)) * 100));
  const pMax = Math.max(0, Math.min(100, ((high - min) / (max - min)) * 100));
  const cfg = INTENT_MAP[variant] || INTENT_MAP.primary;
  const handleLow = (v: number) => onChange([Math.min(v, high - step), high]);
  const handleHigh = (v: number) => onChange([low, Math.max(v, low + step)]);
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const clickVal = min + (pct / 100) * (max - min);
    if (Math.abs(clickVal - low) <= Math.abs(clickVal - high)) {
      setActiveThumb("low"); handleLow(Math.round(clickVal));
    } else {
      setActiveThumb("high"); handleHigh(Math.round(clickVal));
    }
  };

  const renderThumb = (val: number, pct: number, isSelfActive: boolean) => (
    <motion.div
      className={cn("absolute h-4.5 w-4.5 bg-background border-2 rounded-full shadow-md z-20 pointer-events-none flex items-center justify-center", !activeColor && cfg.thumb)}
      style={activeColor ? { borderColor: activeColor, color: activeColor } : undefined} initial={false}
      animate={{ scale: zoomEffect && ((isDragging && isSelfActive) || isHovered) ? (isDragging && isSelfActive ? 1.25 : 1.15) : 1, left: `calc(${pct}% - 9px)` }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      {zoomEffect && (
        <motion.span
          className={cn("absolute rounded-full pointer-events-none -inset-2.5", !activeColor && "bg-current")}
          style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
          animate={{ scale: isDragging && isSelfActive ? 1.4 : isHovered ? 1.15 : 0, opacity: isDragging && isSelfActive ? 0.35 : isHovered ? 0.22 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}
      {tooltip && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-mono font-bold shadow-md whitespace-nowrap">
          {val}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
        </div>
      )}
    </motion.div>
  );

  return (
    <div
      onPointerDown={handlePointerDown} onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
      className={cn("relative flex w-full items-center h-6 touch-none select-none cursor-pointer", disabled && "opacity-50 pointer-events-none", className)}
    >
      <input
        type="range" min={min} max={max} step={step} value={low} disabled={disabled}
        onChange={(e) => { setActiveThumb("low"); handleLow(Number(e.target.value)); }}
        onMouseDown={() => { setActiveThumb("low"); setIsDragging(true); }} onMouseUp={() => setIsDragging(false)}
        className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
        style={{ zIndex: activeThumb === "low" ? 35 : 30 }}
      />
      <input
        type="range" min={min} max={max} step={step} value={high} disabled={disabled}
        onChange={(e) => { setActiveThumb("high"); handleHigh(Number(e.target.value)); }}
        onMouseDown={() => { setActiveThumb("high"); setIsDragging(true); }} onMouseUp={() => setIsDragging(false)}
        className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
        style={{ zIndex: activeThumb === "high" ? 35 : 30 }}
      />
      <div className="relative w-full h-2 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 pointer-events-none">
        <motion.div
          className={cn("absolute top-0 h-full rounded-full", !activeColor && cfg.track)}
          style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
          animate={{ left: `${pMin}%`, width: `${pMax - pMin}%` }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      </div>
      {renderThumb(low, pMin, activeThumb === "low")}
      {renderThumb(high, pMax, activeThumb === "high")}
    </div>
  );
}
