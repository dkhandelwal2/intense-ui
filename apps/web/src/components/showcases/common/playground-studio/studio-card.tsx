import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { RING_VARIANTS } from "./constants";
import { getScoopedCardPath } from "@/assets/svg";
import { PlaygroundStudioHeroCard } from "./hero-card";
import { PlaygroundStudioOptionsPanel } from "./options-panel";
import type { PlaygroundStudioStepData } from "./types";

export interface PlaygroundStudioCardProps {
  currentStep: PlaygroundStudioStepData;
  activeIndex: number;
  stepsCount: number;
  isLastStep: boolean;
  direction: number;
  activeGradient: string;
  cardClipId: string;
  onPrev: () => void;
  onNext: () => void;
  onViewCode: (e?: React.MouseEvent) => void;
  onGoToStep?: (index: number) => void;
}

export const PlaygroundStudioCard = React.memo(function PlaygroundStudioCard({
  currentStep,
  activeIndex,
  stepsCount,
  isLastStep,
  direction,
  activeGradient,
  cardClipId,
  onPrev,
  onNext,
  onViewCode,
  onGoToStep,
}: PlaygroundStudioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const updateSize = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const notchW = 90;
  const notchH = 40;

  const scoopedPath = useMemo(() => {
    if (cardSize.width <= 0 || cardSize.height <= 0) return "";
    return getScoopedCardPath(cardSize.width, cardSize.height, 24, notchW, notchH, 14, 0);
  }, [cardSize.width, cardSize.height]);

  const scoopedStrokePath = useMemo(() => {
    if (cardSize.width <= 0 || cardSize.height <= 0) return "";
    return getScoopedCardPath(cardSize.width, cardSize.height, 24, notchW, notchH, 14, 0.5);
  }, [cardSize.width, cardSize.height]);

  return (
    <div className="relative w-full h-full min-h-0 select-none">
      {scoopedPath && (
        <svg aria-hidden="true" className="absolute w-px h-px overflow-hidden pointer-events-none opacity-0">
          <defs>
            <clipPath id={cardClipId} clipPathUnits="userSpaceOnUse">
              <path d={scoopedPath} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Top-Right Shelf: Circular Navigation Buttons */}
      <div className="absolute top-0.75 right-2 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="w-7 h-7 rounded-full flex items-center justify-center select-none cursor-pointer transition-all bg-zinc-800 text-zinc-300 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white border border-white/10 shadow-sm hover:scale-105 active:scale-95 disabled:opacity-25 disabled:pointer-events-none"
          aria-label="Previous step"
          title="Previous step"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={isLastStep ? onViewCode : onNext}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center select-none cursor-pointer transition-all border border-black/10 dark:border-white/20 shadow-sm font-bold hover:scale-105 active:scale-95",
            isLastStep
              ? "bg-[var(--theme-primary)] text-white hover:brightness-110"
              : "bg-white text-zinc-950 hover:bg-zinc-100"
          )}
          aria-label={isLastStep ? "View Code" : "Next step"}
          title={isLastStep ? "View Code" : "Next step"}
        >
          {isLastStep ? <Code className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {scoopedStrokePath && (
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <path d={scoopedStrokePath} fill="none" className="stroke-zinc-200/90 dark:stroke-zinc-800/90" strokeWidth="1" />
        </svg>
      )}

      {/* Scooped Notch Card Container */}
      <div
        ref={cardRef}
        style={{
          clipPath: scoopedPath ? `url(#${cardClipId})` : undefined,
          WebkitClipPath: scoopedPath ? `url(#${cardClipId})` : undefined,
          perspective: 1200,
        }}
        className="relative w-full h-full min-h-0 overflow-hidden rounded-[24px] bg-[#fafafc] dark:bg-[#0a0a0e] shadow-xl p-0"
      >
        {/* Cool Blueprint Box Grid Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.45] dark:opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(120, 120, 150, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(120, 120, 150, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            maskImage: "radial-gradient(ellipse at 70% 30%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse at 70% 30%, black 40%, transparent 95%)",
          }}
        />

        {/* Ambient Glow Bloom matching Active Gradient */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute -right-8 -top-8 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700",
            activeGradient
          )}
        />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep.id}
            custom={direction}
            variants={RING_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full grid grid-cols-[115px_1fr] sm:grid-cols-[135px_1fr] 2xl:grid-cols-[160px_1fr] gap-0"
          >
            {/* Left Hero Card with Bottom-Aligned Content */}
            <PlaygroundStudioHeroCard
              step={currentStep}
              activeGradient={activeGradient}
              tagText={currentStep.categoryTag || `0${activeIndex + 1} / 0${stepsCount}`}
            />

            {/* Right Options Panel */}
            <PlaygroundStudioOptionsPanel
              step={currentStep}
              activeGradient={activeGradient}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});
