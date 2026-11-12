"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { StepCarouselProps } from "./types";
import {
  STEP_CAROUSEL_ANIMATIONS,
  STEP_CAROUSEL_SIZES,
  SPRING_TRANSITION,
  GooeyFilter,
} from "./constants";
import { StepCarouselButton } from "./step-carousel-button";

export function StepCarousel({
  totalSteps, currentStep: controlledStep, defaultStep = 0, onStepChange, items,
  animation = "slide", isPlaying: controlledPlaying, defaultPlaying = false, onPlayToggle,
  duration = 3500, loop = false, pauseOnHover = false, size = "md",
  colorScheme = "default", className, showPlayButton = true, gooey = false, maxVisibleSteps = 5,
}: StepCarouselProps) {
  const stepsCount = totalSteps ?? items?.length ?? 1;
  const isControlledStep = controlledStep !== undefined;
  const isControlledPlay = controlledPlaying !== undefined;
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [direction, setDirection] = useState(1);
  const [uncontrolledPlaying, setUncontrolledPlaying] = useState(defaultPlaying);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [btnState, setBtnState] = useState({ hovered: false, pressed: false });

  const activeIndex = isControlledStep ? controlledStep : uncontrolledStep;
  const activePlaying = isControlledPlay ? controlledPlaying : uncontrolledPlaying;
  const animFrameRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const filterId = `step-carousel-gooey-${useId().replace(/:/g, "")}`;

  const handleStepChange = useCallback((index: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    elapsedRef.current = 0;
    lastTimestampRef.current = null;
    setProgress(0);
    setIsCompleted(false);
    setDirection(index >= activeIndex ? 1 : -1);
    if (!isControlledStep) setUncontrolledStep(index);
    onStepChange?.(index);
  }, [isControlledStep, activeIndex, onStepChange]);

  const togglePlay = useCallback(() => {
    if (isCompleted) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      elapsedRef.current = 0;
      lastTimestampRef.current = null;
      setProgress(0);
      setIsCompleted(false);
      handleStepChange(0);
      if (!isControlledPlay) setUncontrolledPlaying(true);
      onPlayToggle?.(true);
      return;
    }
    const next = !activePlaying;
    if (!next) lastTimestampRef.current = null;
    if (!isControlledPlay) setUncontrolledPlaying(next);
    onPlayToggle?.(next);
  }, [isCompleted, activePlaying, isControlledPlay, onPlayToggle, handleStepChange]);

  useEffect(() => {
    if (!activePlaying || (pauseOnHover && isHovered)) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimestampRef.current = null;
      return;
    }
    const tick = (timestamp: number) => {
      if (lastTimestampRef.current !== null) {
        elapsedRef.current += timestamp - lastTimestampRef.current;
      }
      lastTimestampRef.current = timestamp;
      setProgress(Math.min(100, (elapsedRef.current / duration) * 100));
      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        lastTimestampRef.current = null;
        setProgress(0);
        if (activeIndex < stepsCount - 1) handleStepChange(activeIndex + 1);
        else if (loop) handleStepChange(0);
        else {
          setIsCompleted(true);
          if (!isControlledPlay) setUncontrolledPlaying(false);
          onPlayToggle?.(false);
        }
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [activePlaying, activeIndex, stepsCount, duration, loop, pauseOnHover, isHovered, handleStepChange, isControlledPlay, onPlayToggle]);

  const sz = STEP_CAROUSEL_SIZES[size];
  const isPrimary = colorScheme === "primary";
  if (stepsCount <= 0) return null;

  const hasOverflow = stepsCount > maxVisibleSteps;
  const startIdx = hasOverflow && activeIndex >= maxVisibleSteps ? Math.min(activeIndex - maxVisibleSteps + 1, stepsCount - maxVisibleSteps) : 0;
  const visibleIndices = Array.from({ length: Math.min(stepsCount, maxVisibleSteps) }, (_, i) => startIdx + i);
  const remainingAhead = Math.max(0, stepsCount - (startIdx + visibleIndices.length));
  const showOverflowBadge = hasOverflow && remainingAhead > 0;
  const pillTrack = isPrimary ? "bg-[var(--theme-primary)]/25" : "bg-zinc-400/50 dark:bg-zinc-600/60";
  const pillInactive = isPrimary ? "bg-[var(--theme-primary)]/40 hover:bg-[var(--theme-primary)]" : "bg-zinc-400 dark:bg-zinc-500/70 hover:bg-zinc-600 dark:hover:bg-zinc-300";
  const surfaceStyle = "bg-zinc-200/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xs border border-black/[0.04] dark:border-white/[0.06]";

  const dotsBar = (
    <div className="relative inline-flex items-center select-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} role="group" aria-label="Step carousel">
      {gooey && <GooeyFilter id={filterId} />}
      {gooey && (
        <div style={{ filter: `url(#${filterId})` }} className="absolute inset-0 flex items-center pointer-events-none gap-0.5 z-0 drop-shadow-xs">
          <div className="h-full flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          {showPlayButton && <motion.div animate={{ scale: btnState.pressed ? 0.94 : btnState.hovered ? 1.08 : 1 }} className={cn("rounded-full shrink-0 bg-zinc-200 dark:bg-zinc-800", sz.button)} />}
        </div>
      )}
      <div className={cn("relative z-10 inline-flex items-center", gooey ? "gap-0.5" : "gap-3")}>
        <motion.div layout transition={SPRING_TRANSITION} className={cn("flex items-center justify-center rounded-full transition-colors relative overflow-hidden", !gooey && surfaceStyle, sz.container)}>
          {visibleIndices.map((idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button key={idx} type="button" layout transition={SPRING_TRANSITION} onClick={() => handleStepChange(idx)} className="group/dot relative flex items-center justify-center cursor-pointer min-h-11 sm:min-h-12 py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full touch-manipulation" aria-label={`Jump to step ${idx + 1} of ${stepsCount}`} aria-current={isActive ? "step" : undefined}>
                <motion.div layout transition={SPRING_TRANSITION} animate={{ width: isActive ? sz.activeWidth : sz.dotWidth, height: sz.dotHeight }} className={cn("relative rounded-full overflow-hidden transition-colors duration-200", isActive ? pillTrack : pillInactive)}>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ width: `${isCompleted ? 100 : progress}%` }} className={cn("h-full rounded-full transition-none", isPrimary ? "bg-[var(--theme-primary)] shadow-xs" : "bg-zinc-950 dark:bg-white shadow-xs")} />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
          <AnimatePresence mode="popLayout">
            {showOverflowBadge && (
              <motion.button key="overflow-badge" type="button" layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={SPRING_TRANSITION} onClick={() => handleStepChange(Math.min(stepsCount - 1, startIdx + visibleIndices.length))} className="relative flex items-center justify-center px-1.5 py-0.5 rounded-full bg-zinc-300/80 dark:bg-zinc-700/80 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors text-[9px] font-mono font-bold text-zinc-800 dark:text-zinc-200 ml-0.5 cursor-pointer select-none" title={`${remainingAhead} more items`}>
                +{remainingAhead}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        {showPlayButton && (
          <StepCarouselButton isPlaying={activePlaying} isCompleted={isCompleted} onToggle={togglePlay} onHoverChange={(hovered, pressed) => setBtnState({ hovered, pressed })} className={cn(sz.button, gooey ? "border-none shadow-none bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent" : surfaceStyle)} iconClass={sz.icon} gooey={gooey} />
        )}
      </div>
    </div>
  );

  if (!items || items.length === 0) return <div className={cn("relative inline-flex items-center", className)}>{dotsBar}</div>;

  return (
    <div className={cn("flex flex-col items-center gap-6 w-full", className)}>
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={activeIndex} custom={direction} variants={STEP_CAROUSEL_ANIMATIONS[animation]} initial="initial" animate="animate" exit="exit" transition={SPRING_TRANSITION} className="w-full">
            {items[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      {dotsBar}
    </div>
  );
}

export { StepCarouselButton } from "./step-carousel-button";
export * from "./types";
export * from "./constants";
