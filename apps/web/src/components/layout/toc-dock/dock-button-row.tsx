"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LAYOUT_CUSTOM_EVENTS } from "../constants";
import { DOCK_DIMENSIONS } from "./constants";
import type { IndexedTocItem, VisibleDockButton } from "./types";

interface DockButtonRowProps {
  visibleButtons: VisibleDockButton[];
  activeTocId?: string;
  safeActiveId?: string;
  allItems: IndexedTocItem[];
  activeIdx: number;
  N: number;
  onItemClick?: (id: string) => void;
}

export function DockButtonRow({
  visibleButtons,
  activeTocId,
  safeActiveId,
  allItems,
  activeIdx,
  N,
  onItemClick,
}: DockButtonRowProps) {
  const handleItemSelect = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    } else {
      window.dispatchEvent(
        new CustomEvent(LAYOUT_CUSTOM_EVENTS.FOCUS_TOC, {
          detail: { id },
        })
      );
    }
  };

  return (
    <div
      className="relative flex items-center h-full z-10 pointer-events-auto cursor-default"
      style={{
        paddingLeft: DOCK_DIMENSIONS.PADDING_X,
        paddingRight: DOCK_DIMENSIONS.PADDING_X,
      }}
    >
      <AnimatePresence mode="popLayout">
        {visibleButtons.map((btn) => {
          if (btn.type === "item") {
            const item = btn.item;
            const isItemActive = activeTocId
              ? activeTocId === item.id
              : item.id === safeActiveId;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                key={item.id}
                onClick={() => handleItemSelect(item.id)}
                className="flex flex-col items-center justify-center h-full w-[72px] relative shrink-0 pointer-events-auto cursor-pointer select-none"
              >
                {/* Inactive Icon (+50% size: 24px) */}
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
                const jumpIdx =
                  btn.type === "next"
                    ? Math.min(N - 1, activeIdx + 1)
                    : Math.max(0, activeIdx - 1);
                const targetItem = allItems[jumpIdx] || allItems[btn.targetIdx];
                if (targetItem) {
                  handleItemSelect(targetItem.id);
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
                +{btn.count}{" "}
                {btn.type === "next"
                  ? btn.count === 1
                    ? "item"
                    : "items"
                  : "prev"}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
