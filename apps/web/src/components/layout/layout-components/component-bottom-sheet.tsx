"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { SCREEN_BREAKPOINTS } from "../constants";
import { ComponentActiveTab } from "./types";
import { ComponentTabControls } from "./component-tab-controls";
import { ComponentTitleBadge } from "./component-title-badge";

export interface ComponentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug?: string;
  icon?: React.ComponentType<{ className?: string }>;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  children: React.ReactNode;
  hasPlayground?: boolean;
}

export function ComponentBottomSheet({
  isOpen,
  onClose,
  title,
  slug,
  icon,
  activeTab,
  onTabChange,
  children,
  hasPlayground = true,
}: ComponentBottomSheetProps) {
  const dragControls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll on tab or open change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab, isOpen]);

  // Lock body scroll safely only when actually open on mobile/tablet (< 1280px)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= SCREEN_BREAKPOINTS.XL) return;

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-close on desktop resize (>= 1280px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= SCREEN_BREAKPOINTS.XL && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="bottom-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs xl:hidden"
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <motion.div
          key="bottom-sheet-modal"
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_e, info) => {
            if (info.offset.y > 100 || info.velocity.y > 350) {
              onClose();
            }
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", pointerEvents: "none" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 md:left-[68px] z-[71] h-[96dvh] sm:h-[88dvh] max-h-[96dvh] rounded-t-[32px] sm:rounded-t-[36px] bg-background/95 dark:bg-[#0c0c0e]/98 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden will-change-transform xl:hidden"
        >
          {/* Grab handle indicator zone (drag trigger) */}
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="w-full flex flex-col items-center pt-2.5 pb-1.5 cursor-grab active:cursor-grabbing touch-none select-none"
          >
            <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors" />
          </div>

          {/* Sheet Header */}
          <div
            onPointerDown={(e) => {
              const target = e.target as HTMLElement;
              if (!target.closest("button, a, input, select, textarea")) {
                dragControls.start(e);
              }
            }}
            className="px-3 sm:px-6 pb-2.5 pt-1 flex items-center justify-between gap-1.5 sm:gap-3 border-b border-zinc-200/80 dark:border-white/10 shrink-0 select-none cursor-grab active:cursor-grabbing touch-none relative z-20 min-w-0"
          >
            <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
              <ComponentTitleBadge title={title} slug={slug} icon={icon} showStudioTag={false} />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ComponentTabControls
                activeTab={activeTab}
                onTabChange={onTabChange}
                hasPlayground={hasPlayground}
                layoutIdPrefix="bottom-sheet"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ml-0.5 touch-manipulation"
                aria-label="Close bottom sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Sheet Content Body */}
          <div
            ref={contentRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] hide-scrollbar flex flex-col"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
