"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepCarouselProps {
  totalSteps: number; currentStep?: number; defaultStep?: number; onStepChange?: (step: number) => void;
  isPlaying?: boolean; defaultPlaying?: boolean; onPlayToggle?: (isPlaying: boolean) => void;
  duration?: number; loop?: boolean; pauseOnHover?: boolean; size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "primary"; className?: string; showPlayButton?: boolean; gooey?: boolean;
}

export const STEP_CAROUSEL_SIZES = {
  sm: { container: "h-11 sm:h-12 px-3.5 gap-1", dotWidth: 8, dotHeight: 8, activeWidth: 38, dot: "w-2 h-2", activePill: "w-10 h-2", button: "w-11 h-11 sm:w-12 sm:h-12", icon: "w-3.5 h-3.5" },
  md: { container: "h-11 sm:h-12 px-4 gap-1.5", dotWidth: 9, dotHeight: 9, activeWidth: 46, dot: "w-2.5 h-2.5", activePill: "w-12 h-2.5", button: "w-11 h-11 sm:w-12 sm:h-12", icon: "w-4 h-4" },
  lg: { container: "h-12 sm:h-14 px-5 gap-2", dotWidth: 10, dotHeight: 10, activeWidth: 56, dot: "w-3 h-3", activePill: "w-14 h-3", button: "w-12 h-12 sm:w-14 sm:h-14", icon: "w-4.5 h-4.5" },
} as const;

const SPRING_TRANSITION = { type: "spring", stiffness: 320, damping: 28, mass: 0.8 } as const;

function GooeyFilter({ id }: { id: string }) {
  return (
    <svg className="absolute pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
        </filter>
      </defs>
    </svg>
  );
}

export function StepCarouselButton({
  isPlaying, isCompleted = false, onToggle, className, iconClass, gooey = false, onHoverChange,
}: { isPlaying: boolean; isCompleted?: boolean; onToggle: () => void; className?: string; iconClass?: string; gooey?: boolean; onHoverChange?: (hovered: boolean, pressed: boolean) => void }) {
  const label = isCompleted ? "Replay" : isPlaying ? "Pause autoplay" : "Start autoplay";
  return (
    <motion.button
      type="button" onClick={onToggle}
      onMouseEnter={() => onHoverChange?.(true, false)} onMouseLeave={() => onHoverChange?.(false, false)}
      onMouseDown={() => onHoverChange?.(true, true)} onMouseUp={() => onHoverChange?.(true, false)}
      whileHover={!gooey ? { scale: 1.06 } : undefined} whileTap={!gooey ? { scale: 0.94 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn("relative rounded-full flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", className)}
      aria-label={label} title={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCompleted ? (
          <motion.span key="replay" initial={{ opacity: 0, scale: 0.7, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="flex items-center justify-center relative z-10">
            <RotateCw className={cn("text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        ) : isPlaying ? (
          <motion.span key="pause" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="flex items-center justify-center relative z-10">
            <Pause className={cn("fill-current text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        ) : (
          <motion.span key="play" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="flex items-center justify-center pl-0.5 relative z-10">
            <Play className={cn("fill-current text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function StepCarousel({
  totalSteps, currentStep: controlledStep, defaultStep = 0, onStepChange, isPlaying: controlledPlaying,
  defaultPlaying = false, onPlayToggle, duration = 3500, loop = false, pauseOnHover = false,
  size = "md", colorScheme = "default", className, showPlayButton = true, gooey = false,
}: StepCarouselProps) {
  const isControlledStep = controlledStep !== undefined;
  const isControlledPlay = controlledPlaying !== undefined;
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [uncontrolledPlaying, setUncontrolledPlaying] = useState(defaultPlaying);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [btnState, setBtnState] = useState({ hovered: false, pressed: false });

  const activeIndex = isControlledStep ? controlledStep : uncontrolledStep;
  const activePlaying = isControlledPlay ? controlledPlaying : uncontrolledPlaying;
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const uniqueId = useId().replace(/:/g, "");
  const filterId = `step-carousel-gooey-${uniqueId}`;

  const handleStepChange = useCallback((index: number) => {
    setIsCompleted(false); setProgress(0); startTimeRef.current = null;
    if (!isControlledStep) setUncontrolledStep(index);
    onStepChange?.(index);
  }, [isControlledStep, onStepChange]);

  const togglePlay = useCallback(() => {
    if (isCompleted) {
      setIsCompleted(false); setProgress(0); startTimeRef.current = null;
      if (!isControlledStep) setUncontrolledStep(0);
      onStepChange?.(0);
      if (!isControlledPlay) setUncontrolledPlaying(true);
      onPlayToggle?.(true); return;
    }
    const next = !activePlaying;
    if (!isControlledPlay) setUncontrolledPlaying(next);
    onPlayToggle?.(next);
  }, [isCompleted, activePlaying, isControlledPlay, isControlledStep, onPlayToggle, onStepChange]);

  useEffect(() => {
    if (!isCompleted) { setProgress(0); startTimeRef.current = null; }
  }, [activeIndex, isCompleted]);

  useEffect(() => {
    if (!activePlaying || (pauseOnHover && isHovered)) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); return;
    }
    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed >= duration) {
        if (activeIndex < totalSteps - 1) {
          startTimeRef.current = null; setProgress(0); handleStepChange(activeIndex + 1);
        } else if (loop) {
          startTimeRef.current = null; setProgress(0); handleStepChange(0);
        } else {
          startTimeRef.current = null; setProgress(100); setIsCompleted(true);
          if (!isControlledPlay) setUncontrolledPlaying(false);
          onPlayToggle?.(false);
        }
      } else { animFrameRef.current = requestAnimationFrame(tick); }
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [activePlaying, activeIndex, totalSteps, duration, loop, pauseOnHover, isHovered, handleStepChange, isControlledPlay, onPlayToggle]);

  const sz = STEP_CAROUSEL_SIZES[size];
  const isPrimary = colorScheme === "primary";
  if (totalSteps <= 0) return null;

  const pillTrack = isPrimary ? "bg-[var(--theme-primary)]/25" : "bg-zinc-400/50 dark:bg-zinc-600/60";
  const pillInactive = isPrimary ? "bg-[var(--theme-primary)]/40 hover:bg-[var(--theme-primary)]" : "bg-zinc-400 dark:bg-zinc-500/70 hover:bg-zinc-600 dark:hover:bg-zinc-300";
  const surfaceStyle = "bg-zinc-200/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xs border border-black/[0.04] dark:border-white/[0.06]";

  return (
    <div className={cn("relative inline-flex items-center select-none", className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} role="group" aria-label="Step carousel">
      {gooey && <GooeyFilter id={filterId} />}
      {gooey && (
        <div style={{ filter: `url(#${filterId})` }} className="absolute inset-0 flex items-center pointer-events-none gap-0.5 z-0 drop-shadow-xs">
          <div className="h-full flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          {showPlayButton && (
            <motion.div
              animate={{ scale: btnState.pressed ? 0.94 : btnState.hovered ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn("rounded-full shrink-0 bg-zinc-200 dark:bg-zinc-800", sz.button)}
            />
          )}
        </div>
      )}
      <div className={cn("relative z-10 inline-flex items-center", gooey ? "gap-0.5" : "gap-3")}>
        <motion.div layout transition={SPRING_TRANSITION} className={cn("flex items-center justify-center rounded-full transition-colors relative", !gooey && surfaceStyle, sz.container)}>
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button key={idx} type="button" layout transition={SPRING_TRANSITION} onClick={() => handleStepChange(idx)} className="group/dot relative flex items-center justify-center cursor-pointer min-h-11 sm:min-h-12 py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full touch-manipulation" aria-label={`Jump to step ${idx + 1} of ${totalSteps}`} aria-current={isActive ? "step" : undefined}>
                <motion.div
                  layout transition={SPRING_TRANSITION} animate={{ width: isActive ? sz.activeWidth : sz.dotWidth, height: sz.dotHeight }}
                  className={cn("relative rounded-full overflow-hidden transition-colors duration-200", isActive ? pillTrack : pillInactive)}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                        style={{ width: `${isCompleted ? 100 : progress}%` }}
                        className={cn("h-full rounded-full transition-none", isPrimary ? "bg-[var(--theme-primary)] shadow-xs" : "bg-zinc-950 dark:bg-white shadow-xs")}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
        {showPlayButton && (
          <StepCarouselButton
            isPlaying={activePlaying} isCompleted={isCompleted} onToggle={togglePlay}
            onHoverChange={(hovered, pressed) => setBtnState({ hovered, pressed })}
            className={cn(sz.button, gooey ? "border-none shadow-none bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent" : surfaceStyle)}
            iconClass={sz.icon} gooey={gooey}
          />
        )}
      </div>
    </div>
  );
}
