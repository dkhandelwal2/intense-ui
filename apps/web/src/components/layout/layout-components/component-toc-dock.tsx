"use client";

import React from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TocItem } from "./types";
import { LAYOUT_CUSTOM_EVENTS } from "../constants";

const BUTTON_WIDTH = 72;
const PADDING_X = 42;
const DOCK_HEIGHT = 66;
const CORNER_RADIUS = 26;

/**
 * Generates a closed SVG path for the dock container.
 * Features a seamless concave scoop notch at coordinate X for the active floating circle.
 * All corners and notch transitions are continuous cubic Beziers with C1 continuity,
 * ensuring a shallow, gentle wave cradle and zero border overlap.
 */
function generateDockPath(X: number, W: number, H = 66, R = 26) {
  const Wn = 50;
  const D = 36;
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
  isInline?: boolean;
  containerWidth?: number;
}

const DOCK_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 280,
  damping: 20,
  mass: 0.75,
};

export const ComponentTocDock = React.memo(function ComponentTocDock({
  tocItems,
  activeTocId,
  centerColumnRef,
  onItemClick,
  className,
  isInline,
  containerWidth,
}: ComponentTocDockProps) {
  if (tocItems.length === 0) return null;

  const [centerX, setCenterX] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (isInline) return;

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
  }, [centerColumnRef, isInline]);

  const allItems = React.useMemo(
    () => tocItems.map((item, idx) => ({ ...item, idx })),
    [tocItems]
  );
  const N = allItems.length;
  const maxButtons = containerWidth
    ? Math.max(3, Math.min(5, Math.floor((containerWidth - 70) / BUTTON_WIDTH)))
    : 5;
  const MAX = maxButtons;
  const rawIdx = allItems.findIndex((i) => i.id === activeTocId);
  const activeIdx = rawIdx >= 0 ? rawIdx : 0;

  type VisibleBtn =
    | { type: "item"; item: (typeof allItems)[0] }
    | { type: "prev" | "next"; count: number; targetIdx: number };

  const visibleButtons = React.useMemo<VisibleBtn[]>(() => {
    if (N <= MAX) {
      return allItems.map((item) => ({ type: "item", item }));
    }
    const K = MAX - 1;
    if (activeIdx < K) {
      return [
        ...allItems.slice(0, K).map((item) => ({ type: "item" as const, item })),
        {
          type: "next",
          count: N - K,
          targetIdx: Math.min(N - 1, activeIdx + 1),
        },
      ];
    } else if (activeIdx >= N - (K - 1)) {
      return [
        {
          type: "prev",
          count: N - K,
          targetIdx: Math.max(0, activeIdx - 1),
        },
        ...allItems.slice(N - K, N).map((item) => ({ type: "item" as const, item })),
      ];
    } else {
      const start = activeIdx - Math.floor((K - 1) / 2);
      const end = start + (K - 1);
      return [
        {
          type: "prev",
          count: start,
          targetIdx: Math.max(0, activeIdx - 1),
        },
        ...allItems.slice(start, end).map((item) => ({ type: "item" as const, item })),
        {
          type: "next",
          count: N - end,
          targetIdx: Math.min(N - 1, activeIdx + 1),
        },
      ];
    }
  }, [allItems, N, activeIdx, MAX]);

  const activeBtnIndex = visibleButtons.findIndex(
    (btn) => btn.type === "item" && btn.item.id === activeTocId
  );
  const safeActiveIndex = activeBtnIndex >= 0 ? activeBtnIndex : 0;
  const activeItem =
    visibleButtons[safeActiveIndex]?.type === "item"
      ? (visibleButtons[safeActiveIndex] as { type: "item"; item: (typeof allItems)[0] }).item
      : allItems[0];
  const safeActiveId = activeItem?.id;

  const totalWidth = PADDING_X * 2 + visibleButtons.length * BUTTON_WIDTH;
  const activeX = PADDING_X + safeActiveIndex * BUTTON_WIDTH + BUTTON_WIDTH / 2;

  const dockPath = React.useMemo(
    () => generateDockPath(activeX, totalWidth, DOCK_HEIGHT, CORNER_RADIUS),
    [activeX, totalWidth]
  );

  // Bouncy ball animation controls & state
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
      const prevIdx = allItems.findIndex((i) => i.id === lastActiveIdRef.current);
      const currIdx = allItems.findIndex((i) => i.id === activeTocId);
      const dir = currIdx >= prevIdx ? 1 : -1;
      const distance = Math.max(1, Math.abs(currIdx - prevIdx));
      lastActiveIdRef.current = activeTocId;

      // Arc apex scales with jump distance: single step = 20px, long jump = 34px
      const hopHeight = Math.min(34, 18 + distance * 4);

      // Playful bouncy ball animation:
      // 1. Horizontal flight with spring overshoot
      // 2. High-arc vertical leap + secondary bounce & settle
      // 3. Squash on landing & stretch on takeoff (anchored at base)
      // 4. Directional roll/tilt in the flight path
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
        scaleY: [1, 1.20, 0.80, 1.08, 0.96, 1],
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
    <div
      style={{
        left: !isInline && centerX !== null ? `${centerX}px` : undefined,
      }}
      className={cn(
        isInline
          ? "relative z-20 pointer-events-auto select-none flex items-center justify-center"
          : "hidden xl:block fixed bottom-6 z-20 pointer-events-none select-none transition-[left] duration-300 ease-out",
        !isInline && (centerX !== null ? "-translate-x-1/2" : "left-1/2 -translate-x-1/2"),
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
            transition={DOCK_SPRING_CONFIG}
            className="fill-white dark:fill-[#121215] stroke-black/[0.12] dark:stroke-white/15"
            strokeWidth="1"
          />
        </svg>

        {/* Floating Active Bouncy Ball (Elevated in Notch with Squash, Stretch & Arc Physics) */}
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

        {/* Dock Items Row */}
        <div
          className="relative flex items-center h-full z-10 pointer-events-auto cursor-default"
          style={{ paddingLeft: PADDING_X, paddingRight: PADDING_X }}
        >
          <AnimatePresence mode="popLayout">
            {visibleButtons.map((btn) => {
              if (btn.type === "item") {
                const item = btn.item;
                const isItemActive = activeTocId ? activeTocId === item.id : item.id === safeActiveId;
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
                        window.dispatchEvent(
                          new CustomEvent(LAYOUT_CUSTOM_EVENTS.FOCUS_TOC, {
                            detail: { id: item.id },
                          })
                        );
                      }
                    }}
                    className="flex flex-col items-center justify-center h-full w-[72px] relative shrink-0 pointer-events-auto cursor-pointer select-none"
                  >
                    {/* Inactive Icon (+50% size: 24px) - Completely hidden & invisible when active to eliminate double-render */}
                    <div
                      className={cn(
                        "absolute top-[9px] left-1/2 -translate-x-1/2 transition-all duration-200 ease-out flex items-center justify-center w-7 h-7 text-2xl leading-none text-zinc-400 dark:text-zinc-500 [&_svg]:w-6 [&_svg]:h-6",
                        isItemActive
                          ? "opacity-0 scale-50 pointer-events-none invisible"
                          : "opacity-100 scale-100"
                      )}
                    >
                      {item.icon || (
                        <div className="w-4 h-4 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                      )}
                    </div>

                    {/* Section Label */}
                    <span
                      className={cn(
                        "absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-all duration-300 ease-out max-w-[74px] truncate text-center",
                        isItemActive
                          ? "pointer-events-none text-foreground font-semibold"
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
                  onClick={() => {
                    const jumpIdx = btn.type === "next"
                      ? Math.min(N - 1, activeIdx + 1)
                      : Math.max(0, activeIdx - 1);
                    const targetItem = allItems[jumpIdx] || allItems[btn.targetIdx];
                    if (targetItem) {
                      if (onItemClick) {
                        onItemClick(targetItem.id);
                      } else {
                        window.dispatchEvent(
                          new CustomEvent(LAYOUT_CUSTOM_EVENTS.FOCUS_TOC, {
                            detail: { id: targetItem.id },
                          })
                        );
                      }
                    }
                  }}
                  className="flex flex-col items-center justify-center h-full w-[72px] relative shrink-0 pointer-events-auto cursor-pointer group select-none hover:opacity-90 active:scale-95 transition-all"
                >
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5">
                    {btn.type === "prev" ? (
                      <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                    ) : (
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </div>
                  <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 font-medium">
                    +{btn.count} {btn.type === "next" ? (btn.count === 1 ? "item" : "items") : "prev"}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});
