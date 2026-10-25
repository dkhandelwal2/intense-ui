"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, SlidersHorizontal, RotateCcw, ArrowRight, GripVertical, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { StackedCard } from "@/components/ui/stacked-card";
import { WindowHeader } from "@/components/ui/window-header";
import { useComponentActiveToc } from "@/components/layout/component-page-layout";
import { ShowcaseCardProps } from "./types";

export function ShowcaseCard({
  id,
  label,
  icon,
  description,
  infoContent,
  code,
  index,
  total,
  isCustomization = id === "customization",
  children,
  previewClassName,
  renderPreview,
  renderPlayground,
  modifiedCount = 0,
  onReset,
  liveOutputSummary,
}: ShowcaseCardProps) {
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [isCodeTooltipVisible, setIsCodeTooltipVisible] = useState(false);
  const [mobileTab, setMobileTab] = useState<"preview" | "playground">("preview");
  const cardInfoRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Split-pane resizing state for Desktop Bento Split
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const [splitPercentage, setSplitPercentage] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const rawPercent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      // Clamp between 30% and 68% so neither preview nor playground collapses
      const clamped = Math.max(30, Math.min(68, rawPercent));
      setSplitPercentage(clamped);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Close info tooltip when clicking outside
  useEffect(() => {
    if (!isCardInfoOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        (cardInfoRef.current && cardInfoRef.current.contains(target)) ||
        target.closest(`[data-info-trigger="${id}"]`)
      ) {
        return;
      }
      setIsCardInfoOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isCardInfoOpen, id]);

  const handleCodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("intense-ui:focus-toc", {
        detail: { id },
      })
    );
    window.dispatchEvent(
      new CustomEvent("intense-ui:open-code", {
        detail: { id },
      })
    );
  };

  // Active TOC focus tracking
  const activeTocId = useComponentActiveToc();
  const isActive = activeTocId ? activeTocId === id : index === 0;

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an interactive element (button, link, input), don't hijack focus
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, select, textarea")) {
      return;
    }
    if (!isActive) {
      window.dispatchEvent(
        new CustomEvent("intense-ui:focus-toc", {
          detail: { id },
        })
      );
    }
  };

  // Render Icon (component or node)
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "function" || (typeof icon === "object" && "render" in (icon as any))) {
      const IconComp = icon as React.ComponentType<{ className?: string }>;
      return <IconComp className="w-5 h-5 text-xl sm:text-2xl leading-none" />;
    }
    return icon;
  };

  return (
    <StackedCard index={index} total={total}>
      <section
        id={id}
        onClick={handleCardClick}
        className={cn(
          "bg-card text-card-foreground mx-auto rounded-[1.5rem] overflow-visible p-3.5 sm:p-6 md:p-8 border scroll-mt-28 transition-[border-color,box-shadow,opacity,filter,transform] duration-300 ease-out",
          isCustomization ? "max-w-4xl" : "max-w-3xl",
          isActive
            ? "border-[var(--theme-primary)]/40 dark:border-[var(--theme-primary)]/50 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_0_25px_var(--theme-primary)]/15 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_25px_var(--theme-primary)]/20 scale-100 blur-none opacity-100"
            : "border-zinc-200/80 dark:border-zinc-800/80 shadow-xs blur-[2.5px] opacity-60 hover:blur-none hover:opacity-100 scale-[0.99] cursor-pointer"
        )}
      >
        {/* Section Header */}
        <div className="relative flex items-start gap-4 py-3.5 sm:py-4">
          {icon && (
            <div className="p-2 sm:p-2.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl shrink-0 flex items-center justify-center min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] text-xl sm:text-2xl leading-none">
              {renderIcon()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {label}
              </h2>
              {isCustomization && (
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

            {description && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons: Code & Info Tooltip */}
          {(code || infoContent || description) && (
            <div className="relative shrink-0 flex items-center gap-1 z-30">
              {code && (
                <div className="relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleCodeClick}
                    onMouseEnter={() => setIsCodeTooltipVisible(true)}
                    onMouseLeave={() => setIsCodeTooltipVisible(false)}
                    className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label={`View code for ${label}`}
                  >
                    <Code className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {isCodeTooltipVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.12 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-800 text-[11px] font-medium shadow-md whitespace-nowrap pointer-events-none z-50"
                      >
                        View code
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-800" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {(infoContent || description) && (
                <div className="relative flex items-center justify-center">
                  <button
                    type="button"
                    data-info-trigger={id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCardInfoOpen((prev) => !prev);
                    }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                      setIsCardInfoOpen(true);
                    }}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        setIsCardInfoOpen(false);
                      }, 250);
                    }}
                    className={cn(
                      "p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer",
                      isCardInfoOpen
                        ? "text-[var(--theme-primary)] bg-[var(--theme-primary)]/15"
                        : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    )}
                    aria-label={`Specifications for ${label}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* Rich Floating Tooltip for Specifications */}
                  <AnimatePresence>
                    {isCardInfoOpen && (
                      <motion.div
                        ref={cardInfoRef}
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        }}
                        onMouseLeave={() => {
                          hoverTimeoutRef.current = setTimeout(() => {
                            setIsCardInfoOpen(false);
                          }, 250);
                        }}
                        className="absolute right-0 top-full mt-2.5 z-50 w-[300px] sm:w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-[#131317]/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-5 text-left origin-top-right cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Caret pointing to Info Icon */}
                        <div className="absolute -top-1.5 right-3.5 w-3 h-3 rotate-45 border-t border-l border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#131317]" />

                        {/* Close button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCardInfoOpen(false);
                          }}
                          className="absolute top-3.5 right-3.5 p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer z-10"
                          aria-label="Close specifications"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="relative z-10 pr-5">
                          {infoContent ? (
                            infoContent
                          ) : (
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 text-xs">
                                <Info className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                                <span>Pattern Specifications</span>
                              </div>
                              <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11.5px]">
                                {description}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regular Showcase Preview Frame */}
        {!isCustomization && (
          <div className="flex flex-col relative overflow-visible">
            <div
              className={cn(
                "flex items-center justify-center p-4 sm:p-6 md:p-8 relative group min-h-[160px] sm:min-h-[200px]",
                previewClassName
              )}
            >
              <div className="w-full relative z-20 flex items-center justify-center">
                {children}
              </div>
            </div>
          </div>
        )}

        {/* Customization Card Experience */}
        {isCustomization && (
          <div className="border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl rounded-2xl overflow-hidden [isolation:isolate] [transform:translateZ(0)]">
            {/* ── DESKTOP BENTO SPLIT WITH DRAGGABLE RESIZER (Visible on md: and up) ── */}
            <div
              ref={splitContainerRef}
              className="hidden md:flex relative w-full select-none"
            >
              {/* Left Column: Live Preview */}
              <div
                style={{ width: `${splitPercentage}%` }}
                className="flex flex-col bg-background/50 shrink-0 min-w-0"
              >
                <WindowHeader title="preview" prompt=">_" />
                <div className="flex-1 flex items-center justify-center p-6 min-h-[440px] overflow-x-auto overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="w-full flex items-center justify-center">
                    {renderPreview ? renderPreview() : children}
                  </div>
                </div>
              </div>

              {/* Draggable Resizer Separator */}
              <div
                role="separator"
                aria-orientation="vertical"
                aria-valuenow={Math.round(splitPercentage)}
                aria-valuemin={30}
                aria-valuemax={68}
                aria-label="Resize preview and playground"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    setSplitPercentage((prev) => Math.max(30, prev - 2));
                  } else if (e.key === "ArrowRight") {
                    setSplitPercentage((prev) => Math.min(68, prev + 2));
                  } else if (e.key === "Enter" || e.key === " ") {
                    setSplitPercentage(50);
                  }
                }}
                onDoubleClick={() => setSplitPercentage(50)}
                onPointerDown={handlePointerDown}
                className={cn(
                  "relative w-px shrink-0 z-30 flex items-center justify-center cursor-col-resize select-none touch-none",
                  "bg-zinc-200/80 dark:bg-zinc-800/80 transition-colors duration-150",
                  isDragging
                    ? "bg-[var(--theme-primary)]"
                    : "hover:bg-[var(--theme-primary)]/80"
                )}
              >
                {/* Expanded Invisible Hit Area */}
                <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />

                {/* Visible Central Grip Handle with Icon */}
                <div
                  className={cn(
                    "relative z-40 w-5 h-9 rounded-full flex items-center justify-center shadow-sm border transition-all duration-200",
                    isDragging
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] scale-110 shadow-[0_0_12px_var(--theme-primary)]/40"
                      : "bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/50 hover:shadow-md hover:scale-105"
                  )}
                  title="Drag to resize (Double-click to reset)"
                >
                  <GripVertical className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Right Column: Props Playground Controls */}
              <div
                style={{ width: `${100 - splitPercentage}%` }}
                className="flex flex-col justify-between bg-zinc-50/40 dark:bg-black/30 min-h-[460px] shrink-0 min-w-0"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-1.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100/60 dark:bg-black/40 shrink-0">
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
                  {onReset && (
                    <button
                      type="button"
                      onClick={onReset}
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
                  )}
                </div>

                {/* Playground Content */}
                {renderPlayground && renderPlayground()}
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
                    {renderPreview ? renderPreview() : children}
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
                          LIVE COMPONENT OUTPUT
                        </div>
                        {liveOutputSummary && (
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                            {liveOutputSummary}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {modifiedCount > 0 && onReset && (
                        <button
                          type="button"
                          onClick={onReset}
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
                      {renderPreview ? renderPreview() : children}
                    </div>
                  </div>

                  {/* Playground Controls */}
                  {renderPlayground && renderPlayground()}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </StackedCard>
  );
}
