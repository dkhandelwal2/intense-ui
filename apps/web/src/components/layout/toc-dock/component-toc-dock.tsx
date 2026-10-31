"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DOCK_DIMENSIONS, DOCK_SPRING_CONFIG } from "./constants";
import { generateDockPath } from "./dock-geometry";
import { useDockPosition } from "@/hooks/use-dock-position";
import { useDockPagination } from "@/hooks/use-dock-pagination";
import { DockBouncyBall } from "./dock-bouncy-ball";
import { DockButtonRow } from "./dock-button-row";
import type { ComponentTocDockProps } from "./types";

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

  const centerX = useDockPosition(isInline, centerColumnRef);

  const {
    allItems,
    visibleButtons,
    safeActiveId,
    activeItem,
    totalWidth,
    activeX,
    activeIdx,
    N,
  } = useDockPagination({ tocItems, activeTocId, containerWidth });

  const dockPath = React.useMemo(
    () =>
      generateDockPath(
        activeX,
        totalWidth,
        DOCK_DIMENSIONS.DOCK_HEIGHT,
        DOCK_DIMENSIONS.CORNER_RADIUS
      ),
    [activeX, totalWidth]
  );

  return (
    <div
      style={{
        left: !isInline && centerX !== null ? `${centerX}px` : undefined,
      }}
      className={cn(
        isInline
          ? "relative z-20 pointer-events-auto select-none flex items-center justify-center"
          : "hidden xl:block fixed bottom-6 z-20 pointer-events-none select-none transition-[left] duration-300 ease-out",
        !isInline &&
          (centerX !== null ? "-translate-x-1/2" : "left-1/2 -translate-x-1/2"),
        className
      )}
    >
      <div
        className="relative pointer-events-auto cursor-default"
        style={{
          width: totalWidth,
          height: DOCK_DIMENSIONS.DOCK_HEIGHT,
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/* Seamless Scooped Dock Background SVG */}
        <svg
          width={totalWidth}
          height={DOCK_DIMENSIONS.DOCK_HEIGHT}
          viewBox={`0 0 ${totalWidth} ${DOCK_DIMENSIONS.DOCK_HEIGHT}`}
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

        {/* Floating Active Bouncy Ball */}
        <DockBouncyBall
          activeTocId={activeTocId}
          activeX={activeX}
          activeItem={activeItem}
          allItems={allItems}
        />

        {/* Dock Items Row */}
        <DockButtonRow
          visibleButtons={visibleButtons}
          activeTocId={activeTocId}
          safeActiveId={safeActiveId}
          allItems={allItems}
          activeIdx={activeIdx}
          N={N}
          onItemClick={onItemClick}
        />
      </div>
    </div>
  );
});
