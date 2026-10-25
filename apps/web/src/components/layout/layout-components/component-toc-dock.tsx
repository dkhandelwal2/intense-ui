"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TocItem } from "./types";

const BUTTON_WIDTH = 76;
const PADDING_X = 54;
const DOCK_HEIGHT = 66;
const CORNER_RADIUS = 28;

/**
 * Generates a closed SVG path for the dock container.
 * Features a seamless concave scoop notch at coordinate X for the active floating circle.
 * All corners and notch transitions are continuous cubic Beziers with C1 continuity,
 * ensuring a shallow, gentle wave cradle and zero border overlap.
 */
function generateDockPath(X: number, W: number, H = 66, R = 28) {
  const Wn = 58;
  const D = 38;
  const k = R * 0.55228475;

  return [
    `M ${R} 0`,
    `L ${X - Wn} 0`,
    `C ${X - 0.8 * Wn} 0, ${X - 0.7 * Wn} ${0.22 * D}, ${X - 0.5 * Wn} ${0.55 * D}`,
    `C ${X - 0.3 * Wn} ${0.88 * D}, ${X - 0.2 * Wn} ${D}, ${X} ${D}`,
    `C ${X + 0.2 * Wn} ${D}, ${X + 0.3 * Wn} ${0.88 * D}, ${X + 0.5 * Wn} ${0.55 * D}`,
    `C ${X + 0.7 * Wn} ${0.22 * D}, ${X + 0.8 * Wn} 0, ${X + Wn} 0`,
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

export interface ComponentTocDockProps {
  tocItems: TocItem[];
  activeTocId?: string;
  centerColumnRef?: React.RefObject<HTMLElement | null>;
  onItemClick?: (id: string) => void;
  className?: string;
}

export function ComponentTocDock({
  tocItems,
  activeTocId,
  centerColumnRef,
  onItemClick,
  className,
}: ComponentTocDockProps) {
  if (tocItems.length === 0) return null;

  const [centerX, setCenterX] = React.useState<number | null>(null);

  React.useEffect(() => {
    const updatePosition = () => {
      const target =
        (centerColumnRef && centerColumnRef.current) ||
        document.getElementById("center-content-column");

      if (target) {
        const rect = target.getBoundingClientRect();
        setCenterX(rect.left + rect.width / 2);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    const target =
      (centerColumnRef && centerColumnRef.current) ||
      document.getElementById("center-content-column");

    let observer: ResizeObserver | null = null;
    if (target && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updatePosition);
      observer.observe(target);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      observer?.disconnect();
    };
  }, [centerColumnRef]);

  const allItems = tocItems.map((item, idx) => ({ ...item, idx }));
  const N = allItems.length;
  const MAX = 7;
  const activeIdx = allItems.findIndex((i) => i.id === activeTocId) ?? 0;

  type VisibleBtn =
    | { type: "item"; item: (typeof allItems)[0] }
    | { type: "prev" | "next"; count: number; targetIdx: number };

  let visibleButtons: VisibleBtn[] = [];
  if (N <= MAX) {
    visibleButtons = allItems.map((item) => ({ type: "item", item }));
  } else {
    if (activeIdx < 5) {
      visibleButtons = [
        ...allItems.slice(0, 6).map((item) => ({ type: "item" as const, item })),
        { type: "next", count: N - 6, targetIdx: 6 },
      ];
    } else if (activeIdx >= N - 4) {
      visibleButtons = [
        { type: "prev", count: N - 6, targetIdx: N - 7 },
        ...allItems.slice(N - 6, N).map((item) => ({ type: "item" as const, item })),
      ];
    } else {
      visibleButtons = [
        { type: "prev", count: activeIdx - 2, targetIdx: activeIdx - 3 },
        ...allItems.slice(activeIdx - 2, activeIdx + 3).map((item) => ({ type: "item" as const, item })),
        { type: "next", count: N - (activeIdx + 3), targetIdx: activeIdx + 3 },
      ];
    }
  }

  const activeBtnIndex = visibleButtons.findIndex(
    (btn) => btn.type === "item" && btn.item.id === activeTocId
  );
  const safeActiveIndex = activeBtnIndex >= 0 ? activeBtnIndex : 0;
  const activeItem =
    visibleButtons[safeActiveIndex]?.type === "item"
      ? (visibleButtons[safeActiveIndex] as { type: "item"; item: (typeof allItems)[0] }).item
      : allItems[0];

  const totalWidth = PADDING_X * 2 + visibleButtons.length * BUTTON_WIDTH;
  const activeX = PADDING_X + safeActiveIndex * BUTTON_WIDTH + BUTTON_WIDTH / 2;

  const springConfig = {
    type: "spring" as const,
    stiffness: 240,
    damping: 24,
    mass: 0.75,
  };

  const dockPath = generateDockPath(activeX, totalWidth, DOCK_HEIGHT, CORNER_RADIUS);

  return (
    <div
      style={{
        left: centerX !== null ? `${centerX}px` : undefined,
      }}
      className={cn(
        "hidden xl:block fixed bottom-6 z-20 pointer-events-none select-none transition-[left] duration-300 ease-out",
        centerX !== null ? "-translate-x-1/2" : "left-1/2 -translate-x-1/2",
        className
      )}
    >
      <div
        className="relative pointer-events-auto cursor-default"
        style={{ width: totalWidth, height: DOCK_HEIGHT }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/* Seamless Scooped Dock Background with integrated single-path SVG */}
        <svg
          width={totalWidth}
          height={DOCK_HEIGHT}
          viewBox={`0 0 ${totalWidth} ${DOCK_HEIGHT}`}
          style={{ willChange: "contents", transform: "translateZ(0)" }}
          className="absolute inset-0 overflow-visible pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.08)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          <motion.path
            d={dockPath}
            animate={{ d: dockPath }}
            transition={springConfig}
            className="fill-white dark:fill-[#121215] stroke-black/[0.12] dark:stroke-white/15"
            strokeWidth="1"
          />
        </svg>

        {/* Floating Active Circular Action Button (Elevated in Notch) */}
        <motion.div
          className="absolute top-0 left-0 z-20 pointer-events-auto cursor-default flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/15 bg-zinc-900 dark:bg-[#18181c] text-white shadow-[0_6px_16px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
          style={{ willChange: "transform" }}
          animate={{
            x: activeX - 24,
            y: -22,
          }}
          transition={springConfig}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeItem?.id || "default"}
              initial={{ opacity: 0, scale: 0.6, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-8 h-8 flex items-center justify-center [&_svg]:w-7 [&_svg]:h-7 text-2xl sm:text-[28px] leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
            >
              {activeItem?.icon || (
                <div className="w-4 h-4 bg-white rounded-full" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dock Items Row */}
        <div
          className="relative flex items-center h-full z-10 pointer-events-auto cursor-default"
          style={{ paddingLeft: PADDING_X, paddingRight: PADDING_X }}
        >
          <AnimatePresence mode="popLayout">
            {visibleButtons.map((btn) => {
              if (btn.type === "item") {
                const item = btn.item;
                const isActive = activeTocId === item.id;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    key={item.id}
                    onClick={() => {
                      if (onItemClick) {
                        onItemClick(item.id);
                      } else {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.dispatchEvent(
                          new CustomEvent("intense-ui:focus-toc", {
                            detail: { id: item.id },
                          })
                        );
                      }
                    }}
                    className="flex flex-col items-center justify-center h-full w-[76px] relative shrink-0 pointer-events-auto cursor-pointer select-none"
                  >
                    {/* Inactive Icon (+50% size: 24px) */}
                    <div
                      className={cn(
                        "absolute top-[9px] left-1/2 -translate-x-1/2 transition-all duration-300 ease-out flex items-center justify-center w-7 h-7 text-2xl leading-none text-zinc-400 dark:text-zinc-500 [&_svg]:w-6 [&_svg]:h-6",
                        isActive ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
                      )}
                    >
                      {item.icon || (
                        <div className="w-4 h-4 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                      )}
                    </div>

                    {/* Section Label (hidden when active to maintain a pristine, uncluttered scoop cradle) */}
                    <span
                      className={cn(
                        "absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-all duration-300 ease-out max-w-[74px] truncate text-center",
                        isActive
                          ? "pointer-events-none"
                          : "opacity-100 scale-100 text-zinc-500 dark:text-zinc-400 font-medium"
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  key={`more-${btn.type}`}
                  className="flex flex-col items-center justify-center h-full w-[76px] relative shrink-0 pointer-events-auto cursor-default select-none"
                >
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-6 h-6 text-zinc-400 dark:text-zinc-500 flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5">
                    {btn.type === "prev" ? (
                      <ChevronLeft className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                  <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300 text-zinc-500 dark:text-zinc-400 font-medium">
                    +{btn.count} {btn.type === "next" ? "more" : "prev"}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
