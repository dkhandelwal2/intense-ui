"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sliders, Code2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallTabContent } from "@/components/layout/layout-components/install-tab-content";
import { BentoCardDeckProps, DeckCardId } from "./types";
import { SPRING_TRANSITION, DECK_LAYOUT_CONFIGS } from "./constants";

interface DeckCodeViewerProps {
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
  activeTocId: string;
  currentDisplayedCode: string;
  propsTable?: React.ReactNode;
}

const DeckCodeViewer = React.memo(function DeckCodeViewer({
  activeCodeTab,
  setActiveCodeTab,
  activeTocId,
  currentDisplayedCode,
  propsTable,
}: DeckCodeViewerProps) {
  const tabs = [
    {
      id: "example" as const,
      label: "Active",
      indicator: (isActive: boolean) => (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"
          )}
        />
      ),
    },
    {
      id: "custom" as const,
      label: "Custom",
      indicator: () => <Sliders className="w-3.5 h-3.5 shrink-0 text-orange-500" />,
    },
    {
      id: "props" as const,
      label: "Props",
      indicator: () => <Layers className="w-3.5 h-3.5 shrink-0 text-indigo-500" />,
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="mb-3 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 flex items-center gap-1 w-full select-none overflow-hidden shrink-0">
        {tabs.map((tab) => {
          const isActive = activeCodeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCodeTab(tab.id)}
              className={cn(
                "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                isActive
                  ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs border border-zinc-200 dark:border-zinc-700"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
              )}
            >
              {tab.indicator(isActive)}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeCodeTab === "props" ? (
        <div className="p-2 rounded-xl bg-muted/40 border border-border text-foreground overflow-y-auto">
          {propsTable || (
            <p className="text-xs text-muted-foreground">No props documentation available.</p>
          )}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-border flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCodeTab + (activeCodeTab === "example" ? activeTocId : "")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <CodeBlock code={currentDisplayedCode} language="tsx" />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
});

interface DeckCardDescriptor {
  id: DeckCardId;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
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
      icon: Terminal,
      iconColor: "text-emerald-500",
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
      icon: Sliders,
      iconColor: "text-orange-500",
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
      icon: Code2,
      iconColor: "text-blue-500",
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
                ? cn(
                  "bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl ring-2 ring-[var(--theme-primary)]/10",
                  card.paddingClass || "p-3.5 sm:p-4"
                )
                : "bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 shadow-xl px-3.5 py-2 hover:brightness-105"
            )}
            style={{
              zIndex: layout.zIndex,
              transformOrigin: "center center",
            }}
            animate={{
              top: layout.top,
              height: layout.height,
              scaleX: layout.scaleX,
            }}
            transition={SPRING_TRANSITION}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between shrink-0 h-9">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-2 truncate">
                  <Icon className={cn("w-4 h-4 shrink-0", card.iconColor)} />
                  <span className="text-xs font-bold text-foreground tracking-wide truncate">
                    {card.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-1 shrink-0">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold",
                    card.badgeClass
                  )}
                >
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
                  className="mt-2 pt-2 border-t border-border flex-1 min-h-0 flex flex-col overflow-y-auto pr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    card.onClickFront?.();
                  }}
                >
                  {card.renderContent()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Peeking Indicator (When Card is Below Active, d > 0) */}
            {layout.d > 0 && (
              <div className="mt-auto flex items-center justify-between shrink-0 h-10 px-1 text-foreground/90 select-none pb-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={cn("w-4 h-4 shrink-0", card.iconColor)} />
                    <span className="text-xs font-bold text-foreground tracking-wide truncate">
                      {card.title}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold",
                    card.badgeClass
                  )}
                >
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
