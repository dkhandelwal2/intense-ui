"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GithubActivityInfoTooltipProps } from "./types";

export function GithubActivityInfoTooltip({
  title,
  description,
  className,
  iconClassName,
  titleClassName,
  align = "left",
  position = "top",
}: GithubActivityInfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [effectivePosition, setEffectivePosition] = useState<"top" | "bottom">(position);
  const [effectiveAlign, setEffectiveAlign] = useState<"left" | "center" | "right">(align);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setEffectivePosition(position);
      setEffectiveAlign(align);
      return;
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (position === "top" && rect.top < 85) {
        setEffectivePosition("bottom");
      } else if (position === "bottom" && window.innerHeight - rect.bottom < 85 && rect.top >= 85) {
        setEffectivePosition("top");
      } else {
        setEffectivePosition(position);
      }

      if (align === "left" && rect.left + 192 > window.innerWidth - 16) {
        setEffectiveAlign("right");
      } else if (align === "right" && rect.right - 192 < 16) {
        setEffectiveAlign("left");
      } else if (align === "center") {
        if (rect.left - 96 < 16) setEffectiveAlign("left");
        else if (rect.right + 96 > window.innerWidth - 16) setEffectiveAlign("right");
        else setEffectiveAlign("center");
      } else {
        setEffectiveAlign(align);
      }
    }
  }, [isOpen, position, align]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn("relative inline-flex items-center justify-center select-none", isOpen ? "z-50" : "z-20", className)}
    >
      <span
        tabIndex={0}
        aria-label={`${title} info`}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
        className={cn(
          "inline-flex items-center justify-center p-1.5 -m-1.5 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500",
          isOpen && "text-emerald-600 dark:text-emerald-400"
        )}
      >
        <Info className={cn("size-3 shrink-0", iconClassName)} />
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, scale: 0.94, y: effectivePosition === "top" ? 3 : -3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: effectivePosition === "top" ? 3 : -3 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "absolute z-50 flex flex-col w-44 sm:w-48 max-w-[calc(100vw-32px)] p-2.5 rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-[10px] font-sans font-normal leading-tight shadow-xl shadow-zinc-950/10 dark:shadow-2xl dark:shadow-black/70 border border-zinc-200/90 dark:border-zinc-800 text-left normal-case pointer-events-auto",
              effectivePosition === "top" ? "bottom-full mb-2" : "top-full mt-2",
              effectiveAlign === "left" && "left-0",
              effectiveAlign === "center" && "left-1/2 -translate-x-1/2",
              effectiveAlign === "right" && "right-0 left-auto"
            )}
          >
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className={cn("font-semibold font-mono text-[9px] uppercase tracking-wider", titleClassName || "text-emerald-600 dark:text-emerald-400")}>
                {title}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white p-0.5 -mr-1 -mt-0.5 sm:hidden cursor-pointer"
                aria-label="Close info"
              >
                ✕
              </button>
            </div>
            <span className="text-zinc-600 dark:text-zinc-300 font-sans font-normal leading-relaxed">
              {description}
            </span>
            <span
              className={cn(
                "absolute size-2 rotate-45 bg-white dark:bg-zinc-950 border-zinc-200/90 dark:border-zinc-800",
                effectivePosition === "top"
                  ? "-bottom-1 border-r border-b"
                  : "-top-1 border-l border-t",
                effectiveAlign === "left" && "left-2",
                effectiveAlign === "center" && "left-1/2 -translate-x-1/2",
                effectiveAlign === "right" && "right-2 left-auto"
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
