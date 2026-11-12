"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TooltipProps } from "./types";
import {
  TOOLTIP_POSITION_CLASSES,
  TOOLTIP_ARROW_CLASSES,
  TOOLTIP_INITIAL_ANIMATION,
  TOOLTIP_ANIMATE,
  getTooltipArrowStyle,
} from "./constants";

export function Tooltip({
  content,
  children,
  position = "top",
  bgColor,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={TOOLTIP_INITIAL_ANIMATION[position]}
            animate={TOOLTIP_ANIMATE[position]}
            exit={TOOLTIP_INITIAL_ANIMATION[position]}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute px-2 py-1 text-white text-xs rounded shadow-lg whitespace-nowrap pointer-events-none z-[100]",
              !bgColor && "bg-zinc-800",
              TOOLTIP_POSITION_CLASSES[position],
              className
            )}
            style={bgColor ? { backgroundColor: bgColor } : {}}
          >
            {content}
            <div
              className={cn(
                "absolute border-4",
                TOOLTIP_ARROW_CLASSES[position],
                !bgColor && {
                  "border-t-zinc-800": position === "top",
                  "border-b-zinc-800": position === "bottom",
                  "border-l-zinc-800": position === "left",
                  "border-r-zinc-800": position === "right",
                }
              )}
              style={getTooltipArrowStyle(position, bgColor)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export * from "./types";
export * from "./constants";
