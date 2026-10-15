"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  bgColor?: string;
  className?: string;
}

export function Tooltip({ content, children, position = "top", bgColor, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent",
  };

  const getArrowStyle = () => {
    if (!bgColor) return {};
    switch (position) {
      case "top": return { borderTopColor: bgColor };
      case "bottom": return { borderBottomColor: bgColor };
      case "left": return { borderLeftColor: bgColor };
      case "right": return { borderRightColor: bgColor };
    }
  };

  const initialAnimation = {
    top: { opacity: 0, y: 5, scale: 0.95 },
    bottom: { opacity: 0, y: -5, scale: 0.95 },
    left: { opacity: 0, x: 5, scale: 0.95 },
    right: { opacity: 0, x: -5, scale: 0.95 },
  };

  const animate = {
    top: { opacity: 1, y: 0, scale: 1 },
    bottom: { opacity: 1, y: 0, scale: 1 },
    left: { opacity: 1, x: 0, scale: 1 },
    right: { opacity: 1, x: 0, scale: 1 },
  };

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
            initial={initialAnimation[position]}
            animate={animate[position]}
            exit={initialAnimation[position]}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute px-2 py-1 text-white text-xs rounded shadow-lg whitespace-nowrap pointer-events-none z-[100]",
              !bgColor && "bg-zinc-800",
              positionClasses[position],
              className
            )}
            style={bgColor ? { backgroundColor: bgColor } : {}}
          >
            {content}
            <div 
              className={cn(
                "absolute border-4", 
                arrowClasses[position],
                !bgColor && {
                  "border-t-zinc-800": position === "top",
                  "border-b-zinc-800": position === "bottom",
                  "border-l-zinc-800": position === "left",
                  "border-r-zinc-800": position === "right",
                }
              )} 
              style={getArrowStyle()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
