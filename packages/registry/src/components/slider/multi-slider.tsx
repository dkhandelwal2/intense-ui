"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MultiSliderProps } from "./types";
import { SLIDER_INTENT_MAP, parseMarks } from "./constants";
import { SliderThumb } from "./slider-thumb";

export function MultiSlider({
  values,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  orientation = "horizontal",
  variant = "primary",
  fillColor,
  color,
  zoomEffect = false,
  thumbAnimation = "none",
  tooltip = false,
  thumbIcon,
  marks,
  className,
}: MultiSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const activeColor = fillColor || color;
  const cfg = SLIDER_INTENT_MAP[variant] || SLIDER_INTENT_MAP.primary;
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
    values.forEach((v, i) => {
      const d = Math.abs(clickVal - v);
      if (d < minD) {
        minD = d;
        closest = i;
      }
    });
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
        onPointerDown={handlePointerDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
        className={cn(
          "relative flex items-center touch-none select-none cursor-pointer",
          isVertical ? "h-48 w-6 justify-center flex-col-reverse" : "w-full h-6",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        {values.map((v, i) => (
          <input
            key={i}
            type="range"
            min={min}
            max={max}
            step={step}
            value={v}
            disabled={disabled}
            onChange={(e) => {
              setActiveIdx(i);
              updateVal(i, Number(e.target.value));
            }}
            onMouseDown={() => {
              setActiveIdx(i);
              setIsDragging(true);
            }}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => {
              setActiveIdx(i);
              setIsDragging(true);
            }}
            onTouchEnd={() => setIsDragging(false)}
            className={cn(
              "absolute opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6",
              isVertical ? "h-full w-full [writing-mode:vertical-lr] [direction:rtl]" : "w-full h-full"
            )}
            style={{ zIndex: activeIdx === i ? 35 : 30 }}
          />
        ))}
        <div
          className={cn(
            "relative rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 pointer-events-none",
            isVertical ? "w-2 h-full" : "w-full h-2"
          )}
        >
          <motion.div
            className={cn(
              "absolute rounded-full",
              isVertical ? "w-full" : "top-0 h-full",
              !activeColor && cfg.track
            )}
            style={activeColor ? { backgroundColor: activeColor } : undefined}
            initial={false}
            animate={
              isVertical
                ? { bottom: `${pMin}%`, height: `${pMax - pMin}%` }
                : { left: `${pMin}%`, width: `${pMax - pMin}%` }
            }
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        </div>
        {pMarks.map((m, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400 dark:bg-zinc-600 pointer-events-none z-5"
            style={{ left: `${m.pct}%`, top: "50%" }}
          />
        ))}
        {values.map((v, i) => (
          <SliderThumb
            key={i}
            value={v}
            index={i}
            min={min}
            max={max}
            isSelf={activeIdx === i}
            isDragging={isDragging}
            isHovered={isHovered}
            isVertical={isVertical}
            isZoomable={isZoomable}
            thumbIcon={thumbIcon}
            thumbAnimation={thumbAnimation}
            tooltip={tooltip}
            activeColor={activeColor}
            cfg={cfg}
          />
        ))}
      </div>
      {pMarks.length > 0 && (
        <div className="relative w-full h-4 mt-2 select-none">
          {pMarks.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateVal(activeIdx, m.val)}
              className="absolute text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors -translate-x-1/2 cursor-pointer"
              style={{ left: `${Math.max(0, Math.min(100, m.pct))}%` }}
            >
              {m.lbl}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
