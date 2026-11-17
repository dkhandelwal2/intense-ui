"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDurationPickerState } from "@/hooks/use-duration-picker-state";
import { TimerDurationPickerProps } from "./types";

export function TimerDurationPicker({
  totalSeconds,
  onApply,
  onCancel,
  showHours = true,
  className,
  autoFocus = true,
}: TimerDurationPickerProps) {
  const {
    customHr,
    customMin,
    customSec,
    initialHr,
    hrInputRef,
    minInputRef,
    secInputRef,
    handleApply,
    handleHrChange,
    handleMinChange,
    handleSecChange,
    handleKeyDown,
  } = useDurationPickerState({
    totalSeconds,
    onApply,
    onCancel,
    showHours,
    autoFocus,
  });

  const inputClass = cn(
    "w-6 sm:w-7 text-center font-bold text-xs sm:text-sm font-sans tabular-nums text-zinc-900 dark:text-white",
    "bg-transparent outline-none border-b-2 border-transparent focus:border-amber-500/80 dark:focus:border-amber-400/80 transition-colors",
    "selection:bg-amber-500/30 dark:selection:bg-amber-400/30 selection:text-zinc-900 dark:selection:text-white caret-amber-500 dark:caret-amber-400",
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn(
        "inline-flex items-center gap-1.5 sm:gap-2 p-1.5 pl-2.5 pr-1.5 rounded-full bg-white/95 dark:bg-[#121214]/95 border border-zinc-200/90 dark:border-white/15 shadow-2xl shadow-black/30 dark:shadow-black/60 backdrop-blur-xl select-none ring-1 ring-black/5 dark:ring-white/5",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Unified Time Inputs Group */}
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-zinc-100/90 dark:bg-white/[0.06] border border-zinc-200/60 dark:border-white/10 shadow-inner">
        {/* Hours Segment */}
        {(showHours || initialHr > 0) && (
          <>
            <div className="flex items-center gap-0.5 group">
              <input
                ref={hrInputRef}
                type="number"
                min={0}
                max={99}
                value={customHr}
                onChange={handleHrChange}
                onKeyDown={(e) => handleKeyDown(e, "hr")}
                onFocus={(e) => e.target.select()}
                className={inputClass}
                aria-label="Hours"
              />
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none pr-0.5">
                h
              </span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600 font-bold text-xs select-none px-0.5">
              :
            </span>
          </>
        )}

        {/* Minutes Segment */}
        <div className="flex items-center gap-0.5 group">
          <input
            ref={minInputRef}
            type="number"
            min={0}
            max={showHours ? 59 : 999}
            value={customMin}
            onChange={handleMinChange}
            onKeyDown={(e) => handleKeyDown(e, "min")}
            onFocus={(e) => e.target.select()}
            className={inputClass}
            aria-label="Minutes"
          />
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none pr-0.5">
            m
          </span>
        </div>

        <span className="text-zinc-300 dark:text-zinc-600 font-bold text-xs select-none px-0.5">
          :
        </span>

        {/* Seconds Segment */}
        <div className="flex items-center gap-0.5 group">
          <input
            ref={secInputRef}
            type="number"
            min={0}
            max={59}
            value={customSec}
            onChange={handleSecChange}
            onKeyDown={(e) => handleKeyDown(e, "sec")}
            onFocus={(e) => e.target.select()}
            className={inputClass}
            aria-label="Seconds"
          />
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none pr-0.5">
            s
          </span>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="w-px h-5 bg-zinc-200 dark:bg-white/10 shrink-0" />

      {/* Action Buttons Cluster */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleApply}
          aria-label="Apply custom time"
          title="Apply (Enter)"
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/25 active:scale-90 hover:scale-105 transition-all cursor-pointer shrink-0"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel editing"
          title="Cancel (Esc)"
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/15 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-zinc-200 dark:border-white/5 shadow-2xs active:scale-90 hover:scale-105 transition-all cursor-pointer shrink-0 flex items-center justify-center"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </motion.div>
  );
}
