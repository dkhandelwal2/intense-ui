"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlaygroundDockItem, PlaygroundDockProps } from "./types";

const BUTTON_WIDTH = 56;
const PADDING_X = 16;
const DOCK_HEIGHT = 56;
const CORNER_RADIUS = 18;

function generatePlaygroundDockPath(X: number, W: number, H = 56, R = 18) {
  const Wn = 36;
  const D = 22;
  const k = R * 0.55228475;

  return [
    `M ${R} 0`,
    `L ${Math.max(R, X - Wn)} 0`,
    `C ${X - 0.8 * Wn} 0, ${X - 0.7 * Wn} ${0.22 * D}, ${X - 0.5 * Wn} ${0.55 * D}`,
    `C ${X - 0.3 * Wn} ${0.88 * D}, ${X - 0.2 * Wn} ${D}, ${X} ${D}`,
    `C ${X + 0.2 * Wn} ${D}, ${X + 0.3 * Wn} ${0.88 * D}, ${X + 0.5 * Wn} ${0.55 * D}`,
    `C ${X + 0.7 * Wn} ${0.22 * D}, ${X + 0.8 * Wn} 0, ${Math.min(W - R, X + Wn)} 0`,
    `L ${W - R} 0`,
    `C ${W - R + k} 0, ${W} ${R - k}, ${W} ${R}`,
    `L ${W} ${H - R}`,
    `C ${W} ${H - R + k}, ${W - R + k} ${H}, ${W - R} ${H}`,
    `L ${R} ${H}`,
    `C ${R - k} ${H}, 0 ${H - R + k}, 0 ${H - R}`,
    `L 0 ${R}`,
    `C 0 ${R - k}, ${R - k} 0, ${R} 0`,
    `Z`,
  ].join(" ");
}

export function PlaygroundDock({
  items,
  activeId,
  onSelect,
  className,
}: PlaygroundDockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIdx = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );
  const activeItem = items[activeIdx] || items[0];

  const totalWidth = PADDING_X * 2 + items.length * BUTTON_WIDTH;
  const activeX = PADDING_X + activeIdx * BUTTON_WIDTH + BUTTON_WIDTH / 2;

  const springConfig = {
    type: "spring" as const,
    stiffness: 350,
    damping: 28,
    mass: 0.8,
  };

  const dockPath = generatePlaygroundDockPath(
    activeX,
    totalWidth,
    DOCK_HEIGHT,
    CORNER_RADIUS
  );

  return (
    <div className={cn("relative flex flex-col items-center select-none pt-3", className)}>
      {/* Floating Micro-Tooltip */}
      <div className="h-5 flex items-center justify-center mb-1">
        <AnimatePresence mode="wait">
          {hoveredId && (
            <motion.span
              key={hoveredId}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-900/90 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md backdrop-blur-md"
            >
              {items.find((i) => i.id === hoveredId)?.description}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        className="relative"
        style={{ width: totalWidth, height: DOCK_HEIGHT }}
      >
        {/* Seamless Scooped Dock SVG Background with Notch */}
        <svg
          width={totalWidth}
          height={DOCK_HEIGHT}
          viewBox={`0 0 ${totalWidth} ${DOCK_HEIGHT}`}
          className="absolute inset-0 overflow-visible pointer-events-none drop-shadow-md dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        >
          <motion.path
            d={dockPath}
            animate={{ d: dockPath }}
            transition={springConfig}
            className="fill-white dark:fill-[#141418] stroke-zinc-200/90 dark:stroke-zinc-800/90"
            strokeWidth="1"
          />
        </svg>

        {/* Floating Active Circular Action Button (Elevated in Scoop Notch) */}
        {activeItem && (
          <motion.div
            className="absolute top-0 left-0 z-20 pointer-events-none flex items-center justify-center w-9 h-9 rounded-full bg-[var(--theme-primary)] text-white shadow-lg shadow-[var(--theme-primary)]/35 border border-white/20"
            animate={{
              x: activeX - 18,
              y: -14,
            }}
            transition={springConfig}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.6, y: 3 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -3 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center text-lg leading-none select-none"
              >
                {activeItem.emoji}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dock Items Row */}
        <div
          className="relative flex items-center h-full z-10"
          style={{ paddingLeft: PADDING_X, paddingRight: PADDING_X }}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex flex-col items-center justify-center h-full w-[56px] relative shrink-0 cursor-pointer select-none group focus:outline-none"
                aria-label={item.label}
              >
                {/* Inactive Emoji */}
                <span
                  className={cn(
                    "text-base leading-none transition-all duration-200 ease-out",
                    isActive
                      ? "opacity-0 scale-75 pointer-events-none"
                      : "opacity-75 group-hover:opacity-100 group-hover:scale-110"
                  )}
                >
                  {item.emoji}
                </span>

                {/* Inactive Label */}
                <span
                  className={cn(
                    "text-[9px] font-medium tracking-tight mt-1 transition-colors duration-200 uppercase",
                    isActive
                      ? "opacity-0 pointer-events-none"
                      : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
