"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PlaygroundReorderIconProps, ReorderTileItem } from "./types";
import { MOTION_TILES } from "./constants";

export const PlaygroundReorderIcon = React.memo(function PlaygroundReorderIcon({
  className,
  size = "md",
  intervalMs = 3500,
}: PlaygroundReorderIconProps) {
  const [items, setItems] = useState<ReorderTileItem[]>(MOTION_TILES);
  const isSmall = size === "sm";

  const shuffle = useCallback(() => {
    setItems((prev) => {
      const next = [...prev];
      let shuffled = [...next].sort(() => Math.random() - 0.5);
      // Guarantee order change on every tick so animation always fires
      if (shuffled.every((item, i) => item.id === prev[i]?.id)) {
        shuffled = [next[1], next[2], next[3], next[0]];
      }
      return shuffled;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        shuffle();
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [shuffle, intervalMs]);

  return (
    <div
      onClick={shuffle}
      title="Shuffle animation (Motion layout animation)"
      className={cn(
        "flex items-center justify-center shadow-xs cursor-pointer select-none transition-transform hover:scale-105 active:scale-95",
        isSmall
          ? "w-4.5 h-4.5 rounded-[5px] shrink-0"
          : "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-xl",
        className
      )}
      aria-label="Reorder animation"
    >
      <div
        className={cn(
          "grid grid-cols-2 items-center justify-center pointer-events-none",
          isSmall ? "gap-[2px] w-3.5 h-3.5" : "gap-[3px] w-5 h-5"
        )}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 24,
              mass: 0.6,
            }}
            className={cn(
              "shadow-2xs",
              isSmall ? "w-[5px] h-[5px] rounded-[1.5px]" : "w-[8px] h-[8px] rounded-[2px]"
            )}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
    </div>
  );
});
