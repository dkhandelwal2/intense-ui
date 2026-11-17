"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import type { TimerIslandEditorProps } from "./types";

export function TimerIslandEditor({
  initialSeconds,
  onApply,
  onCancel,
}: TimerIslandEditorProps) {
  const [customHr, setCustomHr] = useState<string>(() =>
    Math.floor(initialSeconds / 3600).toString().padStart(2, "0")
  );
  const [customMin, setCustomMin] = useState<string>(() =>
    Math.floor((initialSeconds % 3600) / 60).toString().padStart(2, "0")
  );

  const hrInputRef = useRef<HTMLInputElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomHr(Math.floor(initialSeconds / 3600).toString().padStart(2, "0"));
    setCustomMin(Math.floor((initialSeconds % 3600) / 60).toString().padStart(2, "0"));
  }, [initialSeconds]);

  const handleApply = () => {
    const hr = Math.max(0, parseInt(customHr, 10) || 0);
    const min = Math.max(0, parseInt(customMin, 10) || 0);
    const total = Math.max(1, hr * 3600 + min * 60);
    onApply(total);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "hr" | "min") => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (field === "hr") {
        const next = ((parseInt(customHr, 10) || 0) + 1) % 100;
        setCustomHr(next.toString().padStart(2, "0"));
      } else {
        const next = ((parseInt(customMin, 10) || 0) + 1) % 60;
        setCustomMin(next.toString().padStart(2, "0"));
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (field === "hr") {
        const curr = parseInt(customHr, 10) || 0;
        const next = curr <= 0 ? 99 : curr - 1;
        setCustomHr(next.toString().padStart(2, "0"));
      } else {
        const curr = parseInt(customMin, 10) || 0;
        const next = curr <= 0 ? 59 : curr - 1;
        setCustomMin(next.toString().padStart(2, "0"));
      }
      return;
    }
    if (e.key === "ArrowRight" && field === "hr") {
      minInputRef.current?.focus();
      minInputRef.current?.select();
      return;
    }
    if (e.key === "ArrowLeft" && field === "min") {
      hrInputRef.current?.focus();
      hrInputRef.current?.select();
      return;
    }
  };

  return (
    <div
      key="island-pill-editor"
      className="inline-flex items-center gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Hours Input Box */}
      <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 shadow-2xs">
        <input
          ref={hrInputRef}
          type="number"
          min={0}
          max={99}
          value={customHr}
          onChange={(e) => setCustomHr(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "hr")}
          onFocus={(e) => e.target.select()}
          className="w-6 sm:w-7 text-center font-bold text-xs bg-transparent outline-none text-white tabular-nums selection:bg-amber-500/30 selection:text-white caret-amber-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Hours"
          autoFocus
        />
        <span className="text-[10px] font-bold text-zinc-400 uppercase select-none pr-0.5">
          h
        </span>
      </div>

      {/* Minutes Input Box */}
      <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 shadow-2xs">
        <input
          ref={minInputRef}
          type="number"
          min={0}
          max={59}
          value={customMin}
          onChange={(e) => setCustomMin(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "min")}
          onFocus={(e) => e.target.select()}
          className="w-6 sm:w-7 text-center font-bold text-xs bg-transparent outline-none text-white tabular-nums selection:bg-amber-500/30 selection:text-white caret-amber-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Minutes"
        />
        <span className="text-[10px] font-bold text-zinc-400 uppercase select-none pr-0.5">
          m
        </span>
      </div>

      {/* Apply Check Button */}
      <button
        type="button"
        onClick={handleApply}
        aria-label="Apply custom time"
        title="Apply (Enter)"
        className="w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center cursor-pointer transition-all active:scale-90 hover:scale-105 shadow-xs font-bold"
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </button>

      {/* Cancel Cross Button */}
      <button
        type="button"
        onClick={onCancel}
        aria-label="Cancel editing"
        title="Cancel (Esc)"
        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-90 hover:scale-105 border border-white/10 shadow-xs"
      >
        <X className="w-3 h-3 stroke-[2.5]" />
      </button>
    </div>
  );
}
