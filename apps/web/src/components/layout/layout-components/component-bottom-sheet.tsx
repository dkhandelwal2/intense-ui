"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Monitor, Code, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentActiveTab } from "./types";
import { ComponentMoreMenu } from "./component-more-menu";

export interface ComponentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  children: React.ReactNode;
}

export function ComponentBottomSheet({
  isOpen,
  onClose,
  title,
  activeTab,
  onTabChange,
  children,
}: ComponentBottomSheetProps) {
  const dragControls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll on tab or open change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab, isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
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
      if (window.innerWidth >= 1280 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Scrim */}
          <motion.div
            key="bottom-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs xl:hidden"
            aria-hidden="true"
          />

          {/* Draggable Drawer Modal */}
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
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:left-[68px] z-[61] max-h-[85vh] h-[82vh] rounded-t-[32px] sm:rounded-t-[36px] bg-background/95 dark:bg-[#0c0c0e]/98 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden will-change-transform xl:hidden"
          >
            {/* Grab handle indicator zone (drag trigger) */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
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
              className="px-4 sm:px-6 pb-3 pt-1 flex items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 shrink-0 select-none cursor-grab active:cursor-grabbing touch-none"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <h2 className="text-xs sm:text-sm font-bold tracking-tight text-foreground uppercase truncate">
                  {title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onTabChange("install")}
                  className={cn(
                    "px-6 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer min-h-[34px]",
                    activeTab === "install"
                      ? "bg-[var(--theme-primary)] text-white shadow-sm"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                  )}
                >
                  Install
                </button>
                <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
                  <button
                    type="button"
                    onClick={() => onTabChange("info")}
                    className={cn(
                      "p-1.5 rounded-full transition-colors cursor-pointer",
                      activeTab === "info"
                        ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                    )}
                    title="Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onTabChange("code")}
                    className={cn(
                      "p-1.5 rounded-full transition-colors cursor-pointer",
                      activeTab === "code"
                        ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                    )}
                    title="Code"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <ComponentMoreMenu />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ml-1"
                  aria-label="Close bottom sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Sheet Content Body */}
            <div
              ref={contentRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 hide-scrollbar flex flex-col"
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
