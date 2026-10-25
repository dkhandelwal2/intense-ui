"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, SlidersHorizontal, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StackedCard } from "@/components/ui/stacked-card";
import { BreadcrumbIcons } from "./breadcrumb-icons";
import { CustomProps, BreadcrumbExampleItem } from "../types";
import { BreadcrumbVariantRenderer } from "./breadcrumb-variant-renderer";
import { DEFAULT_CUSTOM_PROPS, getModifiedCount, ViewAllTab } from "./customizer";
import { getDisplayColor } from "@/components/ui/color-grid";
import { getBreadcrumbDescription } from "./breadcrumb-descriptions";
import { WindowHeader } from "@/components/ui/window-header";
import { useComponentActiveToc } from "@/components/layout/component-page-layout";

interface BreadcrumbCardProps {
  item: BreadcrumbExampleItem;
  index: number;
  total: number;
  customProps: CustomProps;
  onCustomPropsChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

export function BreadcrumbCard({
  item,
  index,
  total,
  customProps,
  onCustomPropsChange,
}: BreadcrumbCardProps) {
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"preview" | "playground">("preview");
  const cardInfoRef = useRef<HTMLDivElement>(null);
  const modifiedCount = getModifiedCount(customProps);

  useEffect(() => {
    if (!isCardInfoOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardInfoRef.current && !cardInfoRef.current.contains(e.target as Node)) {
        setIsCardInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isCardInfoOpen]);

  const activeTocId = useComponentActiveToc();
  const isActive = activeTocId ? activeTocId === item.id : index === 0;

  const handleCardClick = () => {
    if (!isActive) {
      window.dispatchEvent(
        new CustomEvent("intense-ui:focus-toc", {
          detail: { id: item.id },
        })
      );
    }
  };

  const IconComponent =
    BreadcrumbIcons[item.id as keyof typeof BreadcrumbIcons] ||
    BreadcrumbIcons.basic;

  return (
    <StackedCard index={index} total={total}>
      <section
        id={item.id}
        onClick={handleCardClick}
        className={cn(
          "bg-card text-card-foreground mx-auto rounded-[1.5rem] overflow-visible p-3.5 sm:p-6 md:p-8 border scroll-mt-28 transition-[opacity,border-color,box-shadow,transform] duration-300 ease-out",
          item.id === "customization" ? "max-w-4xl" : "max-w-3xl",
          isActive
            ? "opacity-100 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_0_25px_var(--theme-primary)]/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_25px_var(--theme-primary)]/15 border-[var(--theme-primary)]/50 dark:border-[var(--theme-primary)]/45 scale-100"
            : "opacity-45 dark:opacity-35 border-black/5 dark:border-white/5 hover:opacity-100 hover:scale-[1.003] focus-within:opacity-100 cursor-pointer"
        )}
      >
        {/* Section Header */}
        <div className="relative flex items-start gap-4 py-3.5 sm:py-4">
          <div className="p-2 sm:p-2.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl shrink-0 flex items-center justify-center min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] text-xl sm:text-2xl leading-none">
            <IconComponent className="w-5 h-5 text-xl sm:text-2xl leading-none" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {item.label}
              </h2>
              {item.id === "customization" && (
                <>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                    Interactive Playground
                  </span>
                  {modifiedCount > 0 && (
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {modifiedCount} {modifiedCount === 1 ? "prop" : "props"} modified
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {item.id === "basic" &&
                "Standard semantic breadcrumb trail adhering to WAI-ARIA breadcrumb pattern."}
              {item.id === "with-icon" &&
                "Navigation links decorated with prefix icons for instant route scannability."}
              {item.id === "custom-separator" &&
                "Custom visual delimiters such as slashes, arrows, bullets, or double chevrons."}
              {item.id === "dropdown" &&
                "Progressive disclosure collapsing intermediate steps into an animated dropdown."}
              {item.id === "gooey" &&
                "Fluid spring pill background that glides smoothly across route segments."}
              {item.id === "chips" &&
                "Modern badge and chip-style pill segments with distinct backgrounds."}
              {item.id === "customization" &&
                "Interactive side-by-side studio to test variants, separators, and colors live."}
            </p>
          </div>

          {/* Info Tooltip Anchor & Button */}
          <div ref={cardInfoRef} className="relative shrink-0 flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCardInfoOpen((prev) => !prev);
              }}
              className={cn(
                "p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
                isCardInfoOpen && "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800"
              )}
              aria-label={`Information about ${item.label}`}
              title="Card info"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Contextual Info Tooltip Popover positioned directly beneath the (i) button */}
            <AnimatePresence>
              {isCardInfoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 p-3.5 sm:p-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-zinc-950/10 dark:shadow-black/50 backdrop-blur-md text-xs leading-relaxed"
                >
                  {getBreadcrumbDescription(item.id)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Regular Showcase Preview Frame */}
        {item.id !== "customization" && (
          <div className="flex flex-col relative overflow-visible">
            <div
              className={cn(
                "flex items-center justify-center p-4 sm:p-6 md:p-8 relative group",
                item.id === "dropdown"
                  ? "min-h-[260px] sm:min-h-[300px] pt-8 pb-20 sm:pb-24"
                  : "min-h-[160px] sm:min-h-[200px]"
              )}
            >
              <div className="w-full relative z-20 flex items-center justify-center">
                <BreadcrumbVariantRenderer
                  id={item.id}
                  customProps={customProps}
                />
              </div>
            </div>
          </div>
        )}

        {/* Customization Card Experience */}
        {item.id === "customization" && (
          <div className="border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl rounded-2xl overflow-hidden [isolation:isolate] [transform:translateZ(0)]">
            {/* ── DESKTOP BENTO SPLIT (Visible on md: and up) ── */}
            <div className="hidden md:grid md:grid-cols-2 divide-x divide-zinc-200/60 dark:divide-zinc-800/60">
              {/* Left Column: Live Preview */}
              <div className="flex flex-col bg-background/50">
                <WindowHeader title="preview" prompt=">_" />
                <div className="flex-1 flex items-center justify-center p-6 min-h-[440px] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="w-full flex items-center justify-center">
                    <BreadcrumbVariantRenderer
                      id={item.id}
                      customProps={customProps}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Props Playground Controls */}
              <div className="flex flex-col bg-zinc-50/40 dark:bg-black/30">
                <div className="flex items-center justify-between px-4 py-1.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100/60 dark:bg-black/40">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Playground
                    </span>
                    {modifiedCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] font-bold">
                        {modifiedCount} mod
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onCustomPropsChange(DEFAULT_CUSTOM_PROPS)}
                    disabled={modifiedCount === 0}
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer",
                      modifiedCount > 0
                        ? "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                        : "opacity-40 pointer-events-none text-zinc-400"
                    )}
                    title="Reset to default props"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 max-h-[460px]">
                  <ViewAllTab
                    customProps={customProps}
                    onChange={onCustomPropsChange}
                  />
                </div>
              </div>
            </div>

            {/* ── MOBILE SEGMENTED TABS (Visible on < md:) ── */}
            <div className="md:hidden flex flex-col">
              <WindowHeader
                title="preview"
                prompt=">_"
                action={
                  <div className="flex items-center gap-2">
                    {/* Segmented Mobile Tab Switcher */}
                    <div className="flex items-center p-0.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileTab("preview");
                        }}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                          mobileTab === "preview"
                            ? "bg-white dark:bg-zinc-900 text-[var(--theme-primary)] font-semibold shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileTab("playground");
                        }}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1",
                          mobileTab === "playground"
                            ? "bg-white dark:bg-zinc-900 text-[var(--theme-primary)] font-semibold shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        <span>Playground</span>
                        {modifiedCount > 0 && (
                          <span className="w-3.5 h-3.5 rounded-full bg-[var(--theme-primary)] text-white text-[9px] flex items-center justify-center font-bold">
                            {modifiedCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                }
              />

              {/* Mobile View 1: Full Preview Stage */}
              {mobileTab === "preview" && (
                <div className="flex flex-col items-center justify-center p-4 min-h-[260px] relative">
                  <div className="w-full pb-10 flex items-center justify-center">
                    <BreadcrumbVariantRenderer
                      id={item.id}
                      customProps={customProps}
                    />
                  </div>

                  {/* Floating CTA to open Playground */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileTab("playground");
                      }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs shadow-lg backdrop-blur-md border border-white/20 dark:border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                      <span>Customize Props</span>
                      {modifiedCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[var(--theme-primary)] text-white text-[10px] flex items-center justify-center font-bold">
                          {modifiedCount}
                        </span>
                      )}
                      <ArrowRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile View 2: Playground with Live Reactive Mini-Bar */}
              {mobileTab === "playground" && (
                <div className="flex flex-col bg-zinc-50/40 dark:bg-black/30">
                  {/* Live Mini-Bar with Real-Time Feedback */}
                  <div className="sticky top-0 z-20 px-3.5 py-2.5 bg-background/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          LIVE BREADCRUMB OUTPUT
                        </div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                          {customProps.variant} • {customProps.size} • {customProps.separator} • {getDisplayColor(customProps.activeColor || "var(--theme-primary)")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {modifiedCount > 0 && (
                        <button
                          type="button"
                          onClick={() => onCustomPropsChange(DEFAULT_CUSTOM_PROPS)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                          title="Reset to default props"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileTab("preview");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 hover:bg-[var(--theme-primary)]/15 transition-colors cursor-pointer"
                      >
                        <span>Full View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Live Mini Preview Box inside the deck */}
                  <div className="px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center">
                    <div className="max-w-sm mx-auto flex items-center justify-center">
                      <BreadcrumbVariantRenderer id={item.id} customProps={customProps} />
                    </div>
                  </div>

                  {/* Playground Controls */}
                  <div className="p-4 space-y-4">
                    <ViewAllTab
                      customProps={customProps}
                      onChange={onCustomPropsChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </StackedCard>
  );
}
