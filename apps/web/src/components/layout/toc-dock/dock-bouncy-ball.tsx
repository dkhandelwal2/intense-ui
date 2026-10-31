"use client";

import * as React from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import type { IndexedTocItem } from "./types";

interface DockBouncyBallProps {
  activeTocId?: string;
  activeX: number;
  activeItem?: IndexedTocItem;
  allItems: IndexedTocItem[];
}

export function DockBouncyBall({
  activeTocId,
  activeX,
  activeItem,
  allItems,
}: DockBouncyBallProps) {
  const ballControls = useAnimationControls();
  const lastActiveIdRef = React.useRef<string | undefined>(activeTocId);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastActiveIdRef.current = activeTocId;
      ballControls.set({
        x: activeX - 24,
        y: -22,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
      });
      return;
    }

    if (activeTocId && activeTocId !== lastActiveIdRef.current) {
      const prevIdx = allItems.findIndex(
        (i) => i.id === lastActiveIdRef.current
      );
      const currIdx = allItems.findIndex((i) => i.id === activeTocId);
      const dir = currIdx >= prevIdx ? 1 : -1;
      const distance = Math.max(1, Math.abs(currIdx - prevIdx));
      lastActiveIdRef.current = activeTocId;

      // Arc apex scales with jump distance: single step = 20px, long jump = 34px
      const hopHeight = Math.min(34, 18 + distance * 4);

      ballControls.start({
        x: activeX - 24,
        y: [
          -22,
          -22 - hopHeight,
          -18,
          -22 - hopHeight * 0.3,
          -20.5,
          -22,
        ],
        scaleX: [1, 0.86, 1.22, 0.94, 1.05, 1],
        scaleY: [1, 1.2, 0.8, 1.08, 0.96, 1],
        rotate: [0, dir * 18, dir * -5, dir * 2, 0],
        transition: {
          x: {
            type: "spring",
            stiffness: 290,
            damping: 19,
            mass: 0.7,
          },
          y: {
            duration: 0.52,
            times: [0, 0.28, 0.58, 0.76, 0.88, 1],
            ease: "easeOut",
          },
          scaleX: {
            duration: 0.52,
            times: [0, 0.25, 0.58, 0.76, 0.88, 1],
            ease: "easeInOut",
          },
          scaleY: {
            duration: 0.52,
            times: [0, 0.25, 0.58, 0.76, 0.88, 1],
            ease: "easeInOut",
          },
          rotate: {
            duration: 0.52,
            times: [0, 0.28, 0.58, 0.78, 1],
            ease: "easeOut",
          },
        },
      });
    } else {
      // Smoothly track x without hopping if only the dock layout shifted
      ballControls.start({
        x: activeX - 24,
        y: -22,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 24,
        },
      });
    }
  }, [activeTocId, activeX, allItems, ballControls]);

  return (
    <motion.div
      className="absolute top-0 left-0 z-20 pointer-events-auto cursor-default flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/15 bg-zinc-900 dark:bg-[#18181c] text-white shadow-[0_6px_16px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
      style={{
        willChange: "transform",
        transformOrigin: "50% 85%",
      }}
      animate={ballControls}
      initial={{
        x: activeX - 24,
        y: -22,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={activeItem?.id || "default"}
          initial={{ opacity: 0, scale: 0.4, y: 6 }}
          animate={{ opacity: 1, scale: [0.4, 1.26, 0.94, 1], y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-8 h-8 flex items-center justify-center [&_svg]:w-7 [&_svg]:h-7 text-2xl sm:text-[28px] leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
        >
          {activeItem?.icon || (
            <div className="w-4 h-4 bg-white rounded-full" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
