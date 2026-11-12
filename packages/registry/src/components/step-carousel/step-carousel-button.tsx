"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepCarouselButtonProps } from "./types";

export function StepCarouselButton({
  isPlaying,
  isCompleted = false,
  onToggle,
  className,
  iconClass,
  gooey = false,
  onHoverChange,
}: StepCarouselButtonProps) {
  const label = isCompleted ? "Replay" : isPlaying ? "Pause autoplay" : "Start autoplay";
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      onMouseEnter={() => onHoverChange?.(true, false)}
      onMouseLeave={() => onHoverChange?.(false, false)}
      onMouseDown={() => onHoverChange?.(true, true)}
      onMouseUp={() => onHoverChange?.(true, false)}
      whileHover={!gooey ? { scale: 1.06 } : undefined}
      whileTap={!gooey ? { scale: 0.94 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative rounded-full flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCompleted ? (
          <motion.span
            key="replay"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="flex items-center justify-center relative z-10"
          >
            <RotateCw className={cn("text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        ) : isPlaying ? (
          <motion.span
            key="pause"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="flex items-center justify-center relative z-10"
          >
            <Pause className={cn("fill-current text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="flex items-center justify-center pl-0.5 relative z-10"
          >
            <Play className={cn("fill-current text-zinc-900 dark:text-zinc-100", iconClass)} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
