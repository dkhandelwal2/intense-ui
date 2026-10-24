"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@registry/components/slider";
import { Switch } from "@registry/components/switch";
import { ColorGrid, getDisplayColor } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  SIZES,
  WEIGHTS,
  ICON_TYPES,
  ICON_POSITIONS,
  TabProps,
} from "../constants";

export function ViewAllTab({ customProps, onChange }: TabProps) {
  const isBorderZero = customProps.borderWidth === 0;
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
    const scrollAmount = 330;
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
      y: -3,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  });

  return (
    <div className="space-y-2.5">
      {/* ── Scrollable Track (Bilateral Edge-to-Edge with hover headroom) ── */}
      <div className="relative -mx-4 sm:-mx-5 -mt-1 sm:-mt-1.5">
        {/* Subtle left gradient edge indicator when scrolled away from start */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-3.5 w-6 sm:w-10 bg-gradient-to-r from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/30 dark:via-zinc-950/30 to-transparent z-10 transition-opacity duration-200",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Subtle right gradient edge indicator to show cards bleed into right border */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-3.5 w-6 sm:w-10 bg-gradient-to-l from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/30 dark:via-zinc-950/30 to-transparent z-10 transition-opacity duration-200",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />

        <motion.div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          key="all"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="flex flex-nowrap items-stretch overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-3.5 sm:gap-4 px-4 sm:px-5 pb-3.5 pt-3 sm:pt-3.5 snap-x snap-mandatory scroll-smooth scroll-px-4 sm:scroll-px-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Category 1: Border */}
          <motion.div
            {...cardMotionProps(0)}
            className="w-[285px] sm:w-[320px] shrink-0 snap-start self-stretch p-4 sm:p-5 rounded-2xl bg-black/[0.025] dark:bg-white/[0.02] space-y-3.5 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.035] hover:shadow-lg dark:hover:shadow-black/40 transition-colors duration-200 flex flex-col justify-start group cursor-default"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-sm select-none transition-transform duration-300 group-hover:scale-125 inline-block" role="img" aria-label="Border Styling">
                🎨
              </span>
              <span>Border Styling</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>Hide Border</span>
                <Switch
                  checked={!!customProps.hideBorder}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hideBorder: checked }))
                  }
                  size="sm"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1.5",
                  customProps.hideBorder && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Width</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold">
                    {customProps.borderWidth}px
                  </span>
                </div>
                <Slider
                  min={0}
                  max={4}
                  value={customProps.borderWidth || 0}
                  onChange={(v) => onChange((prev) => ({ ...prev, borderWidth: v }))}
                />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1.5",
                  (customProps.hideBorder || isBorderZero) && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Radius</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold">
                    {customProps.borderRadius}px
                  </span>
                </div>
                <Slider
                  min={0}
                  max={32}
                  value={customProps.borderRadius || 0}
                  onChange={(v) => onChange((prev) => ({ ...prev, borderRadius: v }))}
                />
              </div>
              <div
                className={cn(
                  "space-y-1.5 pt-1",
                  (customProps.hideBorder || isBorderZero) && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Border Color
                  </span>
                  {customProps.borderColor && (
                    <span className="text-[10px] font-mono text-[var(--theme-primary)] font-semibold">
                      {getDisplayColor(customProps.borderColor)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <ColorGrid
                    size="sm"
                    colors={PALETTE_COLORS}
                    value={customProps.borderColor || "var(--theme-primary)"}
                    onChange={(c) => onChange((prev) => ({ ...prev, borderColor: c }))}
                    onClear={
                      customProps.borderColor !== "var(--theme-primary)"
                        ? () =>
                            onChange((prev) => ({
                              ...prev,
                              borderColor: "var(--theme-primary)",
                            }))
                        : undefined
                    }
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category 2: Typography */}
          <motion.div
            {...cardMotionProps(1)}
            className="w-[285px] sm:w-[320px] shrink-0 snap-start self-stretch p-4 sm:p-5 rounded-2xl bg-black/[0.025] dark:bg-white/[0.02] space-y-3.5 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.035] hover:shadow-lg dark:hover:shadow-black/40 transition-colors duration-200 flex flex-col justify-start group cursor-default"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-sm select-none transition-transform duration-300 group-hover:scale-125 inline-block" role="img" aria-label="Typography">
                ✍️
              </span>
              <span>Typography</span>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Size</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold uppercase">
                    {customProps.size}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={4}
                  value={SIZES.indexOf((customProps.size || "md") as (typeof SIZES)[number])}
                  onChange={(v) => onChange((prev) => ({ ...prev, size: SIZES[v] }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Weight</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold">
                    {customProps.weight}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  value={customProps.weight === "Bold" ? 1 : 0}
                  onChange={(v) => onChange((prev) => ({ ...prev, weight: WEIGHTS[v] }))}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span>Underline</span>
                <Switch
                  checked={!!customProps.headingUnderline}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, headingUnderline: checked }))
                  }
                  size="sm"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Title Color
                  </span>
                  {customProps.headingColor && (
                    <span className="text-[10px] font-mono text-[var(--theme-primary)] font-semibold">
                      {getDisplayColor(customProps.headingColor)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <ColorGrid
                    size="sm"
                    colors={PALETTE_COLORS}
                    value={customProps.headingColor || ""}
                    onChange={(c) => onChange((prev) => ({ ...prev, headingColor: c }))}
                    onClear={
                      customProps.headingColor
                        ? () => onChange((prev) => ({ ...prev, headingColor: "" }))
                        : undefined
                    }
                    draggable={false}
                  />
                </div>
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Content Color
                  </span>
                  {customProps.contentColor && (
                    <span className="text-[10px] font-mono text-[var(--theme-primary)] font-semibold">
                      {getDisplayColor(customProps.contentColor)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <ColorGrid
                    size="sm"
                    colors={PALETTE_COLORS}
                    value={customProps.contentColor || ""}
                    onChange={(c) => onChange((prev) => ({ ...prev, contentColor: c }))}
                    onClear={
                      customProps.contentColor
                        ? () => onChange((prev) => ({ ...prev, contentColor: "" }))
                        : undefined
                    }
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category 3: Icon */}
          <motion.div
            {...cardMotionProps(2)}
            className="w-[285px] sm:w-[320px] shrink-0 snap-start self-stretch p-4 sm:p-5 rounded-2xl bg-black/[0.025] dark:bg-white/[0.02] space-y-3.5 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.035] hover:shadow-lg dark:hover:shadow-black/40 transition-colors duration-200 flex flex-col justify-start group cursor-default"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-sm select-none transition-transform duration-300 group-hover:scale-125 inline-block" role="img" aria-label="Icon Styling">
                ✨
              </span>
              <span>Icon Styling</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>Hide Icon</span>
                <Switch
                  checked={!!customProps.hideIcon}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hideIcon: checked }))
                  }
                  size="sm"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1.5",
                  customProps.hideIcon && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Type</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold">
                    {customProps.iconType}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  value={customProps.iconType === "Custom" ? 1 : 0}
                  onChange={(v) => onChange((prev) => ({ ...prev, iconType: ICON_TYPES[v] }))}
                />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1.5",
                  customProps.hideIcon && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">Position</span>
                  <span className="font-mono text-[var(--theme-primary)] font-semibold">
                    {customProps.iconPosition}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  value={customProps.iconPosition === "Left" ? 1 : 0}
                  onChange={(v) =>
                    onChange((prev) => ({ ...prev, iconPosition: ICON_POSITIONS[v] }))
                  }
                />
              </div>
              <div
                className={cn(
                  "space-y-1.5 pt-1",
                  customProps.hideIcon && "opacity-40 pointer-events-none"
                )}
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Icon Color
                  </span>
                  {customProps.iconColor && (
                    <span className="text-[10px] font-mono text-[var(--theme-primary)] font-semibold">
                      {getDisplayColor(customProps.iconColor)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <ColorGrid
                    size="sm"
                    colors={PALETTE_COLORS}
                    value={customProps.iconColor || ""}
                    onChange={(c) => onChange((prev) => ({ ...prev, iconColor: c }))}
                    onClear={
                      customProps.iconColor
                        ? () => onChange((prev) => ({ ...prev, iconColor: "" }))
                        : undefined
                    }
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category 4: Behavior */}
          <motion.div
            {...cardMotionProps(3)}
            className="w-[285px] sm:w-[320px] shrink-0 snap-start self-stretch p-4 sm:p-5 rounded-2xl bg-black/[0.025] dark:bg-white/[0.02] space-y-3.5 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.035] hover:shadow-lg dark:hover:shadow-black/40 transition-colors duration-200 flex flex-col justify-start group cursor-default"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-sm select-none transition-transform duration-300 group-hover:scale-125 inline-block" role="img" aria-label="Behavior & Interaction">
                ⚡
              </span>
              <span>Behavior & Interaction</span>
            </div>
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <div>
                  <div>Expanded on Load</div>
                  <div className="text-[11px] text-zinc-500 font-normal">
                    Opens item automatically on mount
                  </div>
                </div>
                <Switch
                  checked={!!customProps.isDefaultExpanded}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, isDefaultExpanded: checked }))
                  }
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                <div>
                  <div>onClick Alert</div>
                  <div className="text-[11px] text-zinc-500 font-normal">
                    Triggers custom click handler callback
                  </div>
                </div>
                <Switch
                  checked={!!customProps.hasOnClick}
                  onChange={(checked) =>
                    onChange((prev) => ({ ...prev, hasOnClick: checked }))
                  }
                  size="sm"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Carousel Navigation Bar (Clean & Relocated) ── */}
      <div className="flex items-center justify-between pt-1 px-1 text-xs">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="uppercase tracking-wider text-[10px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">
            4 Categories
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Scroll or use arrows
          </span>
        </div>

        {/* Clean, Unobstructed Bottom Arrow Controls */}
        <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/[0.04] p-1 rounded-full border border-black/5 dark:border-white/5">
          <motion.button
            whileHover={canScrollLeft ? { scale: 1.08 } : undefined}
            whileTap={canScrollLeft ? { scale: 0.92 } : undefined}
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all select-none",
              canScrollLeft
                ? "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-xs hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] cursor-pointer"
                : "text-zinc-300 dark:text-zinc-700 opacity-40 cursor-not-allowed"
            )}
            title={canScrollLeft ? "Previous category" : "Start reached"}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={canScrollRight ? { scale: 1.08 } : undefined}
            whileTap={canScrollRight ? { scale: 0.92 } : undefined}
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all select-none",
              canScrollRight
                ? "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-xs hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] cursor-pointer text-[var(--theme-primary)]"
                : "text-zinc-300 dark:text-zinc-700 opacity-40 cursor-not-allowed"
            )}
            title={canScrollRight ? "Next category" : "End reached"}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
