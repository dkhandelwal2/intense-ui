"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedTerminalIcon, AnimatedCodeIcon } from "@/assets/icons";
import { InstallTabContent } from "@/components/layout/layout-components/install-tab-content";
import { PlaygroundReorderIcon } from "@/components/showcases/common";
import { DeckCodeViewer } from "./deck-code-viewer";
import { BentoCardDeckProps, DeckCardId } from "./types";
import { SPRING_TRANSITION, DECK_LAYOUT_CONFIGS } from "./constants";

export { DeckCodeViewer };
export type { DeckCodeViewerProps } from "./deck-code-viewer";

interface DeckCardDescriptor {
  id: DeckCardId;
  icon?: React.ComponentType<{ className?: string }>;
  customIcon?: React.ReactNode;
  iconColor?: string;
  title: string;
  badge: string;
  badgeClass?: string;
  paddingClass?: string;
  onClickFront?: () => void;
  renderContent: () => React.ReactNode;
}

export const BentoCardDeck = React.memo(function BentoCardDeck({
  slug,
  activeTocId,
  usageCode,
  dependencies,
  packageManager,
  onPackageManagerChange,
  renderPlaygroundStudio,
  onStartCustomizing,
  currentDisplayedCode,
  propsTable,
  activeDeckCard,
  setActiveDeckCard,
  activeCodeTab,
  setActiveCodeTab,
}: BentoCardDeckProps) {
  const layouts = DECK_LAYOUT_CONFIGS[activeDeckCard] || DECK_LAYOUT_CONFIGS[5];

  const cards: DeckCardDescriptor[] = [
    {
      id: 4,
      customIcon: <AnimatedTerminalIcon size="sm" />,
      title: "CLI Installation",
      badge: "v0.1.0",
      renderContent: () => (
        <InstallTabContent
          slug={slug}
          usageCode={usageCode}
          dependencies={dependencies}
          packageManager={packageManager}
          onPackageManagerChange={onPackageManagerChange}
        />
      ),
    },
    {
      id: 5,
      customIcon: <PlaygroundReorderIcon size="sm" />,
      title: "Playground Studio",
      badge: "Live Sync",
      paddingClass: "p-3 sm:p-3.5",
      onClickFront: onStartCustomizing,
      renderContent: () => (
        <div className="w-full h-full flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">
          {renderPlaygroundStudio()}
        </div>
      ),
    },
    {
      id: 6,
      customIcon: <AnimatedCodeIcon size="sm" />,
      title: "Preview & Source Code",
      badge: "TypeScript",
      badgeClass: "font-bold",
      renderContent: () => (
        <DeckCodeViewer
          activeCodeTab={activeCodeTab}
          setActiveCodeTab={setActiveCodeTab}
          activeTocId={activeTocId}
          currentDisplayedCode={currentDisplayedCode}
          propsTable={propsTable}
        />
      ),
    },
  ];

  return (
    <div className="relative flex-1 min-h-[300px] w-full h-full select-none rounded-[22px] overflow-hidden">
      {cards.map((card) => {
        const layout = layouts[card.id];
        const Icon = card.icon;

        return (
          <motion.div
            key={card.id}
            initial={false}
            onClick={() => setActiveDeckCard(card.id)}
            className={cn(
              "absolute inset-x-0 rounded-[22px] border transition-colors cursor-pointer overflow-hidden flex flex-col justify-start select-none",
              layout.isFront
                ? cn("bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl ring-2 ring-[var(--theme-primary)]/10", card.paddingClass || "p-3.5 sm:p-4")
                : "bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 shadow-xl px-3.5 py-2 hover:brightness-105"
            )}
            style={{ zIndex: layout.zIndex, transformOrigin: "center center" }}
            animate={{ top: layout.top, height: layout.height, scaleX: layout.scaleX }}
            transition={SPRING_TRANSITION}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between shrink-0 h-9">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-2 truncate">
                  {card.customIcon ? card.customIcon : Icon ? <Icon className={cn("w-4 h-4 shrink-0", card.iconColor)} /> : null}
                  <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">{card.title}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1 shrink-0">
                <span className={cn("px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold", card.badgeClass)}>
                  {card.badge}
                </span>
              </div>
            </div>

            {/* Front Card Expanded Content */}
            <AnimatePresence>
              {layout.isFront && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={cn("mt-2 pt-2 border-t border-border flex-1 min-h-0 flex flex-col pr-1", card.id === 6 ? "overflow-hidden" : "overflow-y-auto")}
                  onClick={(e) => {
                    e.stopPropagation();
                    card.onClickFront?.();
                  }}
                >
                  {card.renderContent()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Peeking Indicator */}
            {layout.d > 0 && (
              <div className="mt-auto flex items-center justify-between shrink-0 h-10 px-1 text-foreground/90 select-none pb-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center gap-2 truncate pl-[2px]">
                    {card.customIcon ? card.customIcon : Icon ? <Icon className={cn("w-4 h-4 shrink-0", card.iconColor)} /> : null}
                    <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">{card.title}</span>
                  </div>
                </div>
                <span className={cn("px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold", card.badgeClass)}>
                  {card.badge}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});
