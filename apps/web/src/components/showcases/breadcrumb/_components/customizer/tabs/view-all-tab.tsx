"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@registry/components/switch";
import { ColorGrid, getDisplayColor } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BREADCRUMB_VARIANTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
  TabProps,
} from "../constants";
import { BreadcrumbVariant, BreadcrumbSize } from "@/components/ui/breadcrumb";
import { BreadcrumbSeparatorType } from "../../../types";

export function ViewAllTab({ customProps, onChange }: TabProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    const rafId = requestAnimationFrame(updateScrollState);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 320;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const cardMotionProps = (index: number) => ({
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.35,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
    whileHover: {
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  });

  return (
    <div className="space-y-3">
      {/* Scrollable Track: First card has generous left space from divider */}
      <div className="relative -mx-4 sm:-mx-5 -mt-1 sm:-mt-1.5">
        {/* Left gradient indicator */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-3.5 w-6 sm:w-10 bg-gradient-to-r from-zinc-100/90 dark:from-black/90 via-zinc-100/40 dark:via-black/40 to-transparent z-10 transition-opacity duration-200",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Right gradient indicator */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-3.5 w-6 sm:w-10 bg-gradient-to-l from-zinc-100/90 dark:from-black/90 via-zinc-100/40 dark:via-black/40 to-transparent z-10 transition-opacity duration-200",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />

        <motion.div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          className="flex gap-3.5 overflow-x-auto pt-2.5 pl-6 sm:pl-7 pr-6 sm:pr-8 pb-3.5 snap-x snap-mandatory scroll-smooth scroll-px-6 sm:scroll-px-7 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Card 1: Variant & Style */}
          <motion.div
            {...cardMotionProps(0)}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">🏷️</span>
                  <span>Variant & Style</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold capitalize">
                  {customProps.variant}
                </span>
              </div>

              {/* Symmetrical 2-column grid with Ghost centered spanning bottom */}
              <div className="grid grid-cols-2 gap-1.5">
                {BREADCRUMB_VARIANTS.map((v) => {
                  const isSelected = customProps.variant === v.id;
                  const isGhost = v.id === "ghost";
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          variant: v.id as BreadcrumbVariant,
                        }))
                      }
                      className={cn(
                        "px-2.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer border",
                        isGhost && "col-span-2 text-center",
                        isSelected
                          ? "bg-[var(--theme-primary)] text-white font-semibold border-[var(--theme-primary)] shadow-xs"
                          : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800"
                      )}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400">
              Select how breadcrumb links and badges are visually presented.
            </div>
          </motion.div>

          {/* Card 2: Separator Delimiter */}
          <motion.div
            {...cardMotionProps(1)}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">✂️</span>
                  <span>Separator</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold capitalize">
                  {customProps.separator}
                </span>
              </div>

              {/* Symmetrical 2x3 grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {BREADCRUMB_SEPARATORS.map((sep) => {
                  const isSelected = customProps.separator === sep.id;
                  return (
                    <button
                      key={sep.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          separator: sep.id as BreadcrumbSeparatorType,
                        }))
                      }
                      className={cn(
                        "px-2.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer border text-center",
                        isSelected
                          ? "bg-[var(--theme-primary)] text-white font-semibold border-[var(--theme-primary)] shadow-xs"
                          : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800"
                      )}
                    >
                      {sep.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400">
              Customize the delimiter element placed between route segments.
            </div>
          </motion.div>

          {/* Card 3: Sizing & Scale */}
          <motion.div
            {...cardMotionProps(2)}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">📏</span>
                  <span>Sizing Scale</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold uppercase">
                  {customProps.size}
                </span>
              </div>

              {/* Symmetrical 3-column row */}
              <div className="grid grid-cols-3 gap-1.5">
                {BREADCRUMB_SIZES.map((sz) => {
                  const isSelected = customProps.size === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          size: sz.id as BreadcrumbSize,
                        }))
                      }
                      className={cn(
                        "py-2 px-1 text-center text-xs font-medium rounded-xl transition-all cursor-pointer border",
                        isSelected
                          ? "bg-[var(--theme-primary)] text-white font-semibold border-[var(--theme-primary)] shadow-xs"
                          : "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800"
                      )}
                    >
                      <div className="font-semibold">{sz.id.toUpperCase()}</div>
                      <div className="text-[10px] opacity-80">{sz.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400">
              Adjusts typography size, badge padding, and separator spacing.
            </div>
          </motion.div>

          {/* Card 4: Emojis & Dropdown Toggles */}
          <motion.div
            {...cardMotionProps(3)}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">🎭</span>
                  <span>Emojis & Dropdown</span>
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-800/60">
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                      <span>Show Emojis</span>
                      <span className="text-xs">🏠📁</span>
                    </span>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Contextual emoji prefixes
                    </p>
                  </div>
                  <Switch
                    checked={customProps.showIcons}
                    onChange={(checked) =>
                      onChange((prev) => ({ ...prev, showIcons: checked }))
                    }
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-800/60">
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                      <span>Collapsed Dropdown</span>
                      <span className="text-xs">⋯</span>
                    </span>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Hide middle paths in popup
                    </p>
                  </div>
                  <Switch
                    checked={customProps.hasDropdown}
                    onChange={(checked) =>
                      onChange((prev) => ({ ...prev, hasDropdown: checked }))
                    }
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400">
              Toggle visual prefixes and progressive disclosure popups.
            </div>
          </motion.div>

          {/* Card 5: Accent & Colors */}
          <motion.div
            {...cardMotionProps(4)}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">🎨</span>
                  <span>Color Accents</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold">
                  {getDisplayColor(customProps.activeColor || "var(--theme-primary)")}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 block mb-1.5">
                    Active Page Color
                  </span>
                  <ColorGrid
                    value={customProps.activeColor || "var(--theme-primary)"}
                    onChange={(color) =>
                      onChange((prev) => ({ ...prev, activeColor: color }))
                    }
                    onClear={() =>
                      onChange((prev) => ({
                        ...prev,
                        activeColor: "var(--theme-primary)",
                      }))
                    }
                    colors={PALETTE_COLORS}
                  />
                </div>

                <div>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 block mb-1.5">
                    Separator Color
                  </span>
                  <ColorGrid
                    value={customProps.separatorColor || ""}
                    onChange={(color) =>
                      onChange((prev) => ({ ...prev, separatorColor: color }))
                    }
                    onClear={() =>
                      onChange((prev) => ({ ...prev, separatorColor: "" }))
                    }
                    colors={PALETTE_COLORS}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400">
              Customize link highlights and delimiter tinting.
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Nav Arrow Buttons (Bottom Right) */}
      <div className="flex items-center justify-between pt-1 px-1">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
          Scroll horizontally to configure all props
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors cursor-pointer",
              canScrollLeft
                ? "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs"
                : "opacity-30 cursor-not-allowed text-zinc-400 border-transparent"
            )}
            aria-label="Scroll options left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors cursor-pointer",
              canScrollRight
                ? "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs"
                : "opacity-30 cursor-not-allowed text-zinc-400 border-transparent"
            )}
            aria-label="Scroll options right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
