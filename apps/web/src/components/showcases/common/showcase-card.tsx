"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Code,
  Info,
  X,
  SlidersHorizontal,
  RotateCcw,
  ArrowRight,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StackedCard } from "@/components/ui/stacked-card";
import { WindowHeader } from "@/components/ui/window-header";
import { CodeBlock } from "@/components/ui/code-block";
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
  const [cardView, setCardView] = useState<"preview" | "code">("preview");
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"preview" | "playground">("preview");
  const cardInfoRef = useRef<HTMLDivElement>(null);

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
    };
  }, []);

  // Close info tooltip when clicking outside
  useEffect(() => {
    if (!isCardInfoOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        (cardInfoRef.current && cardInfoRef.current.contains(target)) ||
        target.closest(`[data-info-trigger="${id}"]`)
      ) {
        return;
      }
      setIsCardInfoOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCardInfoOpen, id]);

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

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <StackedCard id={id} index={index} total={total}>
      <section
        id={id}
        onClick={handleCardClick}
        className={cn(
          "group relative mx-auto max-w-3xl scroll-mt-28 transition-[filter,opacity,transform,border-color,box-shadow] duration-300 ease-out select-none",
          "rounded-2xl sm:rounded-3xl border bg-card text-card-foreground overflow-hidden",
          isActive
            ? "border-[var(--theme-primary)]/50 dark:border-[var(--theme-primary)]/60 shadow-xl shadow-[var(--theme-primary)]/10 ring-2 ring-[var(--theme-primary)]/30 scale-100 blur-none opacity-100"
            : "border-zinc-200/80 dark:border-zinc-800/80 shadow-xs blur-[2.5px] opacity-60 scale-[0.985] cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:blur-none hover:opacity-100 hover:scale-[0.995]"
        )}
      >
        {/* Stage Header Toolbar */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-zinc-50/80 dark:bg-zinc-900/40 border-b border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs">
              {formattedIndex}
            </span>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
              {label}
            </h3>
            {isCustomization && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                Playground Studio
              </span>
            )}
            {isCustomization && modifiedCount > 0 && (
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {modifiedCount} mod
              </span>
            )}
          </div>

          {/* Stage Controls: Preview/Code Switcher, Copy, Info */}
          <div className="flex items-center gap-1.5 shrink-0">
            {code && !isCustomization && (
              <div className="flex items-center p-0.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardView("preview");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                    cardView === "preview"
                      ? "bg-white dark:bg-zinc-900 text-[var(--theme-primary)] font-semibold shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden md:block">Preview</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardView("code");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                    cardView === "code"
                      ? "bg-white dark:bg-zinc-900 text-[var(--theme-primary)] font-semibold shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span className="hidden md:block">Code</span>
                </button>
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
                  className={cn(
                    "inline-flex items-center justify-center h-7.5 w-7.5 sm:h-8 sm:w-8 rounded-lg transition-colors cursor-pointer",
                    isCardInfoOpen
                      ? "text-[var(--theme-primary)] bg-[var(--theme-primary)]/15 border border-[var(--theme-primary)]/30"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800"
                  )}
                  title="Specifications"
                  aria-label="Specifications"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Info Popover */}
                <AnimatePresence>
                  {isCardInfoOpen && (
                    <motion.div
                      ref={cardInfoRef}
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96, pointerEvents: "none" }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2.5 z-50 w-[290px] sm:w-[360px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#121318]/95 backdrop-blur-2xl shadow-2xl p-4 text-left origin-top-right cursor-default max-h-[25vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-zinc-100">
                          <Info className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                          <span>Specifications</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCardInfoOpen(false);
                          }}
                          className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                        {infoContent || description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Description Strip (Preview Mode Only) */}
        {description && cardView === "preview" && !isCustomization && (
          <div className="px-4 sm:px-6 py-2 bg-zinc-50/40 dark:bg-black/20 border-b border-zinc-100 dark:border-zinc-800/40 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            {description}
          </div>
        )}

        {/* Regular Showcase: Live Preview Stage */}
        {!isCustomization && cardView === "preview" && (
          <div
            className={cn(
              "relative flex items-center justify-center p-6 sm:p-10 md:p-12 min-h-[190px] sm:min-h-[230px] overflow-visible",
              previewClassName
            )}
          >
            {/* Subtle Studio Canvas Dot Grid */}
            <div
              className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40 dark:opacity-30"
              aria-hidden="true"
            />

            {/* Live Component */}
            <div className="relative z-10 w-full flex items-center justify-center overflow-x-auto no-scrollbar">
              {children}
            </div>
          </div>
        )}

        {/* Regular Showcase: Syntax-Highlighted Code View */}
        {!isCustomization && cardView === "code" && code && (
          <div className="relative bg-zinc-950 max-h-[420px] overflow-y-auto subtle-scrollbar">
            <CodeBlock
              code={code}
              language="tsx"
              showLineNumbers
              className="rounded-none border-0 text-xs"
            />
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
