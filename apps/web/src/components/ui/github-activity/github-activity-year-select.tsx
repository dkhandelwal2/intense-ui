"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GithubActivityYearSelectProps {
  year?: number;
  years: number[];
  onYearChange?: (year: number) => void;
  className?: string;
  disabled?: boolean;
}

export const GithubActivityYearSelect = React.memo(function GithubActivityYearSelect({
  year,
  years,
  onYearChange,
  className,
  disabled = false,
}: GithubActivityYearSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedYear = year || years[0] || 2026;

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!years || years.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left select-none", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select year, current year ${selectedYear}`}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 transition-all cursor-pointer shadow-2xs active:scale-95 touch-manipulation disabled:opacity-50 disabled:pointer-events-none",
          isOpen && "ring-1 ring-[var(--theme-primary)]/50 border-[var(--theme-primary)]/50 bg-white dark:bg-zinc-800"
        )}
      >
        <span>{selectedYear}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[var(--theme-primary)]"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available contribution years"
          className="absolute right-0 top-full mt-1.5 min-w-[105px] max-h-52 overflow-y-auto subtle-scrollbar rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/50 p-1 z-50 flex flex-col gap-0.5"
        >
          {years.map((y) => {
            const isSelected = selectedYear === y;
            return (
              <button
                key={y}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  onYearChange?.(y);
                  handleClose();
                }}
                className={cn(
                  "flex items-center justify-between w-full px-2.5 py-1.5 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                )}
              >
                <span>{y}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
