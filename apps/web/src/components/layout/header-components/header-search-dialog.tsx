"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHeaderSearch } from "@/hooks/use-header-search";

export interface HeaderSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

/**
 * Interactive search command dialog modal with keyboard navigation (Cmd+K, Escape, Arrows, Enter)
 */
export function HeaderSearchDialog({
  isOpen,
  onClose,
  onNavigate,
}: HeaderSearchDialogProps) {
  const {
    searchInputRef,
    searchQuery,
    setSearchQuery,
    selectedSearchIndex,
    setSelectedSearchIndex,
    filteredSearchItems,
  } = useHeaderSearch({ isOpen, onClose, onNavigate });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="header-search-dialog-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4"
        >
          {/* Modal Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl bg-background/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(249,115,22,0.15)] overflow-hidden z-10"
          >
            {/* Top Search Input */}
            <div className="flex items-center px-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs, components, CLI... (e.g. Accordion, Installation)"
                className="w-full h-14 bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              )}
            </div>

            {/* Search Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              {filteredSearchItems.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-3">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-sm">No matching results found</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    No results for &quot;{searchQuery}&quot;. Try searching for &quot;Accordion&quot; or &quot;Installation&quot;.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredSearchItems.map((item, index) => {
                    const isSelected = index === selectedSearchIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href + item.title}
                        onClick={() => onNavigate(item.href)}
                        onMouseEnter={() => setSelectedSearchIndex(index)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer group",
                          isSelected
                            ? "bg-primary/15 text-foreground border border-primary/30 shadow-xs"
                            : "hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-black/5 dark:bg-white/10 text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-sm font-semibold truncate",
                                  isSelected ? "text-primary" : "text-foreground"
                                )}
                              >
                                {item.title}
                              </span>
                              <span
                                className={cn(
                                  "text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase",
                                  item.category === "Guide"
                                    ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                    : "bg-primary/10 text-primary border border-primary/20"
                                )}
                              >
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate max-w-md mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {isSelected && (
                            <span className="flex items-center gap-1 text-[11px] text-primary font-mono font-medium">
                              <span>Select</span>
                              <CornerDownLeft className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with Keyboard Shortcuts */}
            <div className="px-4 py-3 bg-black/[0.03] dark:bg-white/[0.03] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↵</kbd>
                  <span>to select</span>
                </span>
              </div>
              <span>{filteredSearchItems.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
