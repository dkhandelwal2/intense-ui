"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentPlayground } from "@/components/layout/playground-context";

export interface PlaygroundStudioRowItem {
  id: string;
  label: string;
  spec: string;
  thumbnail: React.ReactNode;
  isSelected?: boolean;
  onSelect: () => void;
  actionType?: "plus" | "toggle";
  toggleChecked?: boolean;
  onToggleChange?: (checked: boolean) => void;
}

export interface PlaygroundStudioStepData {
  id: string;
  titleLine1: string;
  titleLine2: string;
  categoryTag?: string;
  colorGradient?: string;
  icon?: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
  headerEmoji?: string;
  rows?: PlaygroundStudioRowItem[];
  customRightContent?: React.ReactNode;
}

export interface PlaygroundStudioProps {
  steps: PlaygroundStudioStepData[];
  preview?: React.ReactNode;
  currentStepIndex?: number;
  onStepChange?: (index: number) => void;
  modifiedCount?: number;
  onReset?: () => void;
  onViewCode?: () => void;
  className?: string;
  description?: string;
}

export const PLAYGROUND_COLOR_PALETTES = [
  "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]", // Violet / Royal Purple
  "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]", // Electric Azure Blue
  "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]", // Emerald Mint
  "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]", // Sunset Orange
  "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]", // Hot Pink / Fuchsia
  "bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#3730A3]", // Radiant Indigo
  "bg-gradient-to-br from-[#06B6D4] via-[#0891B2] to-[#0E7490]", // Cyber Cyan
  "bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#9F1239]", // Crimson Rose
  "bg-gradient-to-br from-[#8B5CF6] via-[#D946EF] to-[#EC4899]", // Cosmic Magenta
  "bg-gradient-to-br from-[#14B8A6] via-[#0D9488] to-[#0F766E]", // Deep Teal
  "bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309]", // Sunfire Amber
  "bg-gradient-to-br from-[#84CC16] via-[#65A30D] to-[#15803D]", // Aurora Lime
];

export function PlaygroundStudio({
  steps,
  preview,
  currentStepIndex: controlledIndex,
  onStepChange,
  modifiedCount = 0,
  onReset,
  onViewCode,
  className,
  description,
}: PlaygroundStudioProps) {
  const { openCode, setActiveTab, previewContent: contextPreview } = useComponentPlayground();
  const effectivePreview = preview || contextPreview;
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const handleOpenCode = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onViewCode) {
      onViewCode();
    } else {
      setActiveTab("code");
      openCode();
    }
    window.dispatchEvent(new CustomEvent("intense-ui:open-code"));
  };

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentStep = steps[activeIndex] || steps[0];
  const isLastStep = activeIndex >= steps.length - 1;

  // Stable random gradient mapping generated strictly ONCE on component screen arrival
  const [stepGradients, setStepGradients] = useState<Record<string, string>>({});
  const hasInitializedGradients = useRef(false);

  useEffect(() => {
    if (hasInitializedGradients.current) return;
    hasInitializedGradients.current = true;

    // Pick distinct random colors once when arriving on the component screen
    const shuffled = [...PLAYGROUND_COLOR_PALETTES].sort(() => Math.random() - 0.5);
    const mapping: Record<string, string> = {};
    steps.forEach((step, idx) => {
      mapping[step.id] = shuffled[idx % shuffled.length];
    });
    setStepGradients(mapping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeGradient =
    (currentStep && stepGradients[currentStep.id]) ||
    currentStep?.colorGradient ||
    PLAYGROUND_COLOR_PALETTES[activeIndex % PLAYGROUND_COLOR_PALETTES.length];

  const handleResetClick = () => {
    if (onReset) {
      onReset();
    }
  };

  const goToStep = (newIndex: number, dir: number) => {
    if (newIndex < 0 || newIndex >= steps.length) return;
    setDirection(dir);
    if (onStepChange) {
      onStepChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const handlePrev = () => goToStep(activeIndex - 1, -1);
  const handleNext = () => goToStep(activeIndex + 1, 1);

  const ringVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 50 : -50,
      x: dir > 0 ? 140 : -140,
      z: -160,
      scale: 0.88,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      x: 0,
      z: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 26,
        mass: 0.8,
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -50 : 50,
      x: dir > 0 ? -140 : 140,
      z: -160,
      scale: 0.88,
      opacity: 0,
      transition: {
        duration: 0.22,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <div className={cn("h-full w-full flex-1 min-h-0 flex flex-col select-none gap-3", className)}>
      {/* Universal SVG ClipPath Definition for the Angled Pod Hero Card Shape (Desktop & Mobile) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="playground-hero-shape" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.10 C 0 0.04, 0.04 0, 0.10 0 L 0.65 0 C 0.74 0, 0.82 0.04, 0.88 0.11 L 0.96 0.24 C 1.01 0.30, 1.01 0.44, 0.96 0.50 L 0.84 0.72 C 0.78 0.82, 0.68 1.0, 0.50 1.0 L 0.10 1.0 C 0.04 1.0, 0 0.96, 0 0.90 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Top Header Bar: Above Preview Block (Matches User Design Reference) */}
      <div className="flex flex-col gap-1 px-0.5 shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Playground Studio
            </span>
            {modifiedCount > 0 && (
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]">
                {modifiedCount} mod
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onReset && modifiedCount > 0 && (
              <button
                type="button"
                onClick={handleResetClick}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-200/80 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-2xs"
                title="Reset props to defaults"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Studio Subtitle / Interactive Guide */}
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-tight">
          {description || "Interact with props below to customize variants in real time."}
        </p>
      </div>

      {/* Dynamic 2-Block Equal Height Grid / Flex Container */}
      <div className={cn("flex-1 min-h-0", effectivePreview ? "grid grid-rows-2 gap-3" : "flex flex-col")}>
        {/* Preview Block: Directly Below Header Bar (No Live Component Preview Header) */}
        {effectivePreview && (
          <div className="relative h-full overflow-hidden rounded-[28px] bg-white dark:bg-[#111115] shadow-lg flex items-center justify-center">
            {/* Ambient Soft Dot Grid Pattern */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]"
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto no-scrollbar p-4">
              {effectivePreview}
            </div>
          </div>
        )}

        {/* Main Studio Card Container: Borderless, Left-Aligned Shape, 3D Perspective */}
        <div
          className="relative h-full overflow-hidden rounded-[28px] bg-white dark:bg-[#111115] shadow-lg p-0"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentStep.id}
              custom={direction}
              variants={ringVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-full grid grid-cols-[140px_1fr] 2xl:grid-cols-[165px_1fr] gap-0"
            >
              {/* Left Hero Card: Angled Shield Pod Shape touching left-most corner */}
              <div
                style={{
                  WebkitClipPath: "url(#playground-hero-shape)",
                  clipPath: "url(#playground-hero-shape)",
                }}
                className={cn(
                  "relative text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden select-none h-full transition-colors duration-500",
                  activeGradient
                )}
              >
                {/* Playful Ambient Blobs in Background */}
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/20 blur-md pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-black/15 blur-md pointer-events-none"
                />

                {/* Card Top Row: Section Specific Icon (or Glyph) */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white/95 shadow-xs">
                    {currentStep.icon ? (
                      currentStep.icon
                    ) : (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Stacked Big Typography & Cute Organic Pill Shape */}
                <div className="relative z-10 my-auto py-1">
                  <div className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                    {currentStep.titleLine1}
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white/90 drop-shadow-xs mt-1">
                    {currentStep.titleLine2}
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="relative z-10 pt-1">
                  <span className="text-[9.5px] font-mono font-semibold tracking-wider text-white/85 uppercase">
                    {currentStep.categoryTag || `0${activeIndex + 1} / 0${steps.length}`}
                  </span>
                </div>
              </div>

              {/* Right Side Options Panel ("My storehouse" Table Style - Props shifted upwards) */}
              <div className="relative flex flex-col justify-start pt-2.5 pb-5 sm:pb-6 pr-3 pl-2.5 overflow-y-auto no-scrollbar h-full min-h-0">
                <div>
                  {/* Header: Title + Dynamic Emoji Badge in Top-Right */}
                  <div className="flex items-start justify-between gap-1.5 pb-1">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                        {currentStep.headerTitle}
                      </h3>
                      <h4 className="text-sm sm:text-base font-light tracking-tight text-zinc-500 dark:text-zinc-400 leading-tight truncate">
                        {currentStep.headerSubtitle}
                      </h4>
                    </div>
                    {/* Dynamic Emoji Avatar Badge (Uses the same gradient background as the hero shape) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "w-7 h-7 rounded-full text-white flex items-center justify-center text-xs shadow-xs font-bold select-none shrink-0 border border-white/20 transition-colors duration-500",
                        activeGradient
                      )}
                    >
                      {currentStep.headerEmoji || "😋"}
                    </div>
                  </div>

                  {/* Table Column Headers (Matching Reference: PRODUCT and NO) */}
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase pt-1.5 pb-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span>PRODUCT</span>
                    <span>NO</span>
                  </div>

                  {/* Rows List (Matching "Worktop", "Couch capsule", "Couch cake") */}
                  {currentStep.rows ? (
                    <div className="divide-y divide-zinc-100/90 dark:divide-zinc-800/60">
                      {currentStep.rows.map((row) => (
                        <div
                          key={row.id}
                          onClick={row.actionType === "toggle" ? () => row.onToggleChange?.(!row.toggleChecked) : row.onSelect}
                          className={cn(
                            "w-full py-2 px-1.5 flex items-center justify-between transition-colors text-left cursor-pointer group rounded-lg my-0.5",
                            row.isSelected
                              ? "bg-[var(--theme-primary)]/10 text-zinc-900 dark:text-zinc-100"
                              : "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                          )}
                        >
                          <div className="min-w-0 pr-1.5">
                            <div
                              className={cn(
                                "text-xs font-bold truncate leading-tight",
                                row.isSelected
                                  ? "text-[var(--theme-primary)]"
                                  : "text-zinc-900 dark:text-zinc-100"
                              )}
                            >
                              {row.label}
                            </div>
                            <div className="text-[9.5px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                              {row.spec}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-auto">
                            <div className="text-sm leading-none">{row.thumbnail}</div>
                            {row.actionType === "toggle" ? (
                              <div
                                role="switch"
                                aria-checked={row.toggleChecked}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  row.onToggleChange?.(!row.toggleChecked);
                                }}
                                className={cn(
                                  "w-7 h-4 rounded-full transition-colors relative cursor-pointer p-0.5 flex items-center shrink-0",
                                  row.toggleChecked
                                    ? "bg-[var(--theme-primary)]"
                                    : "bg-zinc-200 dark:bg-zinc-700"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-3 h-3 rounded-full bg-white transition-transform shadow-xs",
                                    row.toggleChecked ? "translate-x-3" : "translate-x-0"
                                  )}
                                />
                              </div>
                            ) : (
                              <span
                                className={cn(
                                  "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shadow-2xs",
                                  row.isSelected
                                    ? "bg-[var(--theme-primary)] text-white scale-105"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                                )}
                              >
                                {row.isSelected ? "✓" : "+"}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    currentStep.customRightContent
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tactile 3D Buttons: Left and Right buttons are paired near each other with Chevrons only */}
      <div className="pt-3.5 sm:pt-4 pb-0.5 flex items-center justify-between px-1 shrink-0">
        {/* Step Dots Indicator on Left */}
        <div className="flex items-center gap-1.5">
          {steps.map((step, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => goToStep(idx, idx > activeIndex ? 1 : -1)}
                className="p-0.5 cursor-pointer focus:outline-none"
                aria-label={`Go to step ${idx + 1}`}
                title={step.titleLine1}
              >
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    isActive
                      ? "w-4 bg-[var(--theme-primary)] shadow-2xs"
                      : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                  )}
                />
              </button>
            );
          })}
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 ml-1">
            0{activeIndex + 1}/0{steps.length}
          </span>
        </div>

        {/* 3D Prev and Next Buttons: Paired near each other, only Chevron icon */}
        <div className="flex items-center gap-1.5">
          {/* 3D Prev Button (Chevron only) */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center select-none cursor-pointer transition-all",
              "bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200/90 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200",
              "shadow-[0_3px_0_theme(colors.zinc.300),0_4px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_3px_0_theme(colors.zinc.950),0_4px_8px_rgba(0,0,0,0.4)]",
              "hover:brightness-105 active:translate-y-0.5 active:shadow-[0_0px_0_theme(colors.zinc.300)] dark:active:shadow-[0_0px_0_theme(colors.zinc.950)]",
              "disabled:opacity-30 disabled:pointer-events-none"
            )}
            aria-label="Previous step"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3D Next Button or View Code on Last Step */}
          {isLastStep ? (
            <button
              type="button"
              onClick={handleOpenCode}
              className={cn(
                "h-8 px-2.5 rounded-xl flex items-center justify-center gap-1.5 select-none cursor-pointer transition-all text-white font-bold text-[11px]",
                "bg-gradient-to-b from-[var(--theme-primary)] to-[var(--theme-primary)]/85 border border-white/20",
                "shadow-[0_3px_0_rgba(0,0,0,0.35),0_4px_10px_var(--theme-primary)]/35",
                "hover:brightness-110 active:translate-y-0.5 active:shadow-none animate-in fade-in zoom-in-95 duration-200"
              )}
              aria-label="View Code"
              title="Inspect generated code with current customized props"
            >
              <Code className="w-3.5 h-3.5" />
              <span>View Code</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center select-none cursor-pointer transition-all text-white",
                "bg-gradient-to-b from-[var(--theme-primary)] to-[var(--theme-primary)]/85 border border-white/20",
                "shadow-[0_3px_0_rgba(0,0,0,0.35),0_4px_10px_var(--theme-primary)]/35",
                "hover:brightness-110 active:translate-y-0.5 active:shadow-none"
              )}
              aria-label="Next step"
              title="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
