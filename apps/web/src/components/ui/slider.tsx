"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SliderMark = number | string | { value: number; label?: React.ReactNode };

export interface MultiSliderProps {
  values: number[]; min?: number; max?: number; step?: number; onChange: (vals: number[]) => void;
  disabled?: boolean; orientation?: "horizontal" | "vertical";
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "zoom";
  fillColor?: string; color?: string; zoomEffect?: boolean;
  thumbAnimation?: "none" | "pulse" | "glow" | "scale";
  tooltip?: boolean; thumbIcon?: React.ReactNode; marks?: SliderMark[]; className?: string;
}

const INTENT_MAP: Record<string, { track: string; thumb: string; glow: string }> = {
  primary: { track: "bg-[var(--theme-primary)]", thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]", glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]" },
  success: { track: "bg-emerald-500", thumb: "border-emerald-500 text-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]" },
  danger: { track: "bg-rose-500", thumb: "border-rose-500 text-rose-500", glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]" },
  warning: { track: "bg-amber-500", thumb: "border-amber-500 text-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]" },
  info: { track: "bg-sky-500", thumb: "border-sky-500 text-sky-500", glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]" },
  zoom: { track: "bg-[var(--theme-primary)]", thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]", glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]" },
};

function parseMarks(marks: SliderMark[] | undefined, min: number, max: number) {
  if (!marks?.length) return [];
  return marks.map((m, idx) => {
    if (typeof m === "number") return { val: m, lbl: `${m}%`, pct: ((m - min) / (max - min)) * 100 };
    if (typeof m === "string") {
      const pct = (idx / Math.max(1, marks.length - 1)) * 100;
      return { val: min + (pct / 100) * (max - min), lbl: m, pct };
    }
    return { val: m.value, lbl: m.label ?? `${m.value}%`, pct: ((m.value - min) / (max - min)) * 100 };
  });
}

export function MultiSlider({
  values, min = 0, max = 100, step = 1, onChange, disabled = false, orientation = "horizontal",
  variant = "primary", fillColor, color, zoomEffect = false, thumbAnimation = "none",
  tooltip = false, thumbIcon, marks, className,
}: MultiSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const activeColor = fillColor || color;
  const cfg = INTENT_MAP[variant] || INTENT_MAP.primary;
  const isVertical = orientation === "vertical";
  const isZoomable = zoomEffect || variant === "zoom" || thumbAnimation === "scale";
  const pMarks = isVertical ? [] : parseMarks(marks, min, max);

  const updateVal = (idx: number, v: number) => {
    const next = [...values];
    next[idx] = Math.max(min, Math.min(max, v));
    onChange(next);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = isVertical
      ? Math.max(0, Math.min(100, ((rect.bottom - e.clientY) / rect.height) * 100))
      : Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const clickVal = min + (pct / 100) * (max - min);
    let closest = 0, minD = Infinity;
    values.forEach((v, i) => { const d = Math.abs(clickVal - v); if (d < minD) { minD = d; closest = i; } });
    setActiveIdx(closest);
    updateVal(closest, Math.round(clickVal / step) * step);
  };

  const isSingle = values.length === 1;
  const minV = isSingle ? min : Math.min(...values);
  const maxV = isSingle ? values[0] : Math.max(...values);
  const pMin = Math.max(0, Math.min(100, ((minV - min) / (max - min)) * 100));
  const pMax = Math.max(0, Math.min(100, ((maxV - min) / (max - min)) * 100));

  return (
    <div className={cn("flex flex-col w-full", isVertical && "items-center", className)}>
      <div
        onPointerDown={handlePointerDown} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        className={cn("relative flex items-center touch-none select-none cursor-pointer", isVertical ? "h-48 w-6 justify-center flex-col-reverse" : "w-full h-6", disabled && "opacity-50 pointer-events-none")}
      >
        {values.map((v, i) => (
          <input
            key={i} type="range" min={min} max={max} step={step} value={v} disabled={disabled}
            onChange={(e) => { setActiveIdx(i); updateVal(i, Number(e.target.value)); }}
            onMouseDown={() => { setActiveIdx(i); setIsDragging(true); }} onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => { setActiveIdx(i); setIsDragging(true); }} onTouchEnd={() => setIsDragging(false)}
            className={cn("absolute opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6", isVertical ? "h-full w-full [writing-mode:vertical-lr] [direction:rtl]" : "w-full h-full")}
            style={{ zIndex: activeIdx === i ? 35 : 30 }}
          />
        ))}
        <div className={cn("relative rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 pointer-events-none", isVertical ? "w-2 h-full" : "w-full h-2")}>
          <motion.div
            className={cn("absolute rounded-full", isVertical ? "w-full" : "top-0 h-full", !activeColor && cfg.track)}
            style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
            animate={isVertical ? { bottom: `${pMin}%`, height: `${pMax - pMin}%` } : { left: `${pMin}%`, width: `${pMax - pMin}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        </div>
        {pMarks.map((m, i) => (
          <span key={i} className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400 dark:bg-zinc-600 pointer-events-none z-5" style={{ left: `${m.pct}%`, top: "50%" }} />
        ))}
        {values.map((v, i) => {
          const pct = Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));
          const isSelf = activeIdx === i;
          return (
            <motion.div
              key={i}
              className={cn("absolute bg-background border-2 rounded-full shadow-md z-20 pointer-events-none flex items-center justify-center transition-shadow", thumbIcon ? "h-6 w-6" : "h-4.5 w-4.5", !activeColor && cfg.thumb, thumbAnimation === "glow" && cfg.glow)}
              style={activeColor ? { borderColor: activeColor, color: activeColor } : undefined} initial={false}
              animate={{
                scale: isZoomable && ((isDragging && isSelf) || isHovered) ? (isDragging && isSelf ? 1.25 : 1.15) : 1,
                ...(isVertical ? { bottom: `calc(${pct}% - 9px)` } : { left: `calc(${pct}% - 9px)` }),
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              {isZoomable && (
                <motion.span
                  className={cn("absolute rounded-full pointer-events-none -inset-2.5", !activeColor && "bg-current")}
                  style={activeColor ? { backgroundColor: activeColor } : undefined} initial={false}
                  animate={{ scale: isDragging && isSelf ? 1.4 : isHovered ? 1.15 : 0, opacity: isDragging && isSelf ? 0.35 : isHovered ? 0.22 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {thumbAnimation === "pulse" && <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping pointer-events-none" />}
              {thumbIcon && <span className="flex items-center justify-center text-current">{thumbIcon}</span>}
              {tooltip && (isHovered || isDragging) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: isVertical ? 0 : 3 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={cn("absolute px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-mono font-bold shadow-md pointer-events-none whitespace-nowrap z-30", isVertical ? "left-7 top-1/2 -translate-y-1/2" : "-top-7 left-1/2 -translate-x-1/2")}
                >
                  {v}
                  <div className={cn("absolute border-4 border-transparent", isVertical ? "top-1/2 -translate-y-1/2 -left-1 border-r-zinc-900 dark:border-r-zinc-100" : "top-full left-1/2 -translate-x-1/2 -mt-0.5 border-t-zinc-900 dark:border-t-zinc-100")} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {pMarks.length > 0 && (
        <div className="relative w-full h-4 mt-2 select-none">
          {pMarks.map((m, i) => (
            <button key={i} type="button" onClick={() => updateVal(activeIdx, m.val)} className="absolute text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors -translate-x-1/2 cursor-pointer" style={{ left: `${Math.max(0, Math.min(100, m.pct))}%` }}>
              {m.lbl}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface SliderProps extends Omit<MultiSliderProps, "values" | "onChange"> {
  value: number; onChange: (val: number) => void;
  leftIcon?: React.ReactNode; rightIcon?: React.ReactNode; showInput?: boolean;
}

export function Slider({ value, onChange, leftIcon, rightIcon, showInput = false, className, ...props }: SliderProps) {
  const isVertical = props.orientation === "vertical";
  return (
    <div className={cn("flex flex-col w-full", isVertical && "items-center", className)}>
      <div className={cn("flex items-center gap-3 w-full", isVertical && "justify-center")}>
        {leftIcon && <span onClick={() => onChange(props.min ?? 0)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">{leftIcon}</span>}
        <div className="flex-1 min-w-0">
          <MultiSlider values={[value]} onChange={(vals) => onChange(vals[0])} {...props} />
        </div>
        {rightIcon && <span onClick={() => onChange(props.max ?? 100)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">{rightIcon}</span>}
        {showInput && (
          <input
            type="number" min={props.min ?? 0} max={props.max ?? 100} step={props.step ?? 1} value={value} disabled={props.disabled}
            onChange={(e) => onChange(Math.max(props.min ?? 0, Math.min(props.max ?? 100, Number(e.target.value))))}
            className="w-16 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background text-foreground text-center focus:outline-none focus:ring-1 focus:ring-primary shrink-0"
          />
        )}
      </div>
    </div>
  );
}

export interface RangeSliderProps extends Omit<MultiSliderProps, "values" | "onChange"> {
  value: [number, number]; onChange: (val: [number, number]) => void;
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
