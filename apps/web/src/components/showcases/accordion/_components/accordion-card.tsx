"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { StackedCard } from "@/components/ui/stacked-card";
import { AccordionIcons } from "./accordion-icons";
import { CustomProps } from "../types";
import { AccordionVariantRenderer } from "./accordion-variant-renderer";
import { AccordionCustomizer } from "./accordion-customizer";
import { getAccordionDescription } from "./accordion-descriptions";
import { WindowHeader } from "@/components/ui/window-header";
import { useComponentActiveToc } from "@/components/layout/component-page-layout";

export interface AccordionExampleItem {
  id: string;
  label: string;
  code: string;
}

interface AccordionCardProps {
  item: AccordionExampleItem;
  index: number;
  total: number;
  customProps: CustomProps;
  onCustomPropsChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

export function AccordionCard({
  item,
  index,
  total,
  customProps,
  onCustomPropsChange,
}: AccordionCardProps) {
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const cardInfoRef = useRef<HTMLDivElement>(null);

  // Close card info tooltip when clicking/tapping outside
  useEffect(() => {
    if (!isCardInfoOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardInfoRef.current && !cardInfoRef.current.contains(e.target as Node)) {
        setIsCardInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isCardInfoOpen]);

  const activeTocId = useComponentActiveToc();
  const isActive = activeTocId ? activeTocId === item.id : index === 0;

  const handleCardClick = () => {
    if (!isActive) {
      window.dispatchEvent(
        new CustomEvent("intense-ui:focus-toc", {
          detail: { id: item.id },
        })
      );
    }
  };

  const IconComponent =
    AccordionIcons[item.id as keyof typeof AccordionIcons] ||
    AccordionIcons.basic;

  return (
    <StackedCard index={index} total={total}>
      <section
        id={item.id}
        onClick={handleCardClick}
        className={cn(
          "bg-card text-card-foreground max-w-3xl mx-auto rounded-[1.5rem] overflow-hidden p-3.5 sm:p-6 md:p-8 border scroll-mt-28 transition-[opacity,border-color,box-shadow,transform] duration-300 ease-out",
          isActive
            ? "opacity-100 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_0_25px_var(--theme-primary)]/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_25px_var(--theme-primary)]/15 border-[var(--theme-primary)]/50 dark:border-[var(--theme-primary)]/45 scale-100"
            : "opacity-45 dark:opacity-35 border-black/5 dark:border-white/5 hover:opacity-100 hover:scale-[1.003] focus-within:opacity-100 cursor-pointer"
        )}
      >
        {/* Section Header */}
        <div ref={cardInfoRef} className="relative flex items-start gap-4 py-3.5 sm:py-4">
          <div className="p-2 sm:p-2.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl shrink-0 flex items-center justify-center min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] text-xl sm:text-2xl leading-none">
            <IconComponent className="w-5 h-5 text-xl sm:text-2xl leading-none" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {item.label}
              </h2>
              {item.id === "customization" && (
                <>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live Activity
                  </span>

                  {/* Mobile Info "i" Tooltip Button for Customization Description */}
                  <button
                    type="button"
                    onClick={() => setIsCardInfoOpen((prev) => !prev)}
                    className={cn(
                      "sm:hidden w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer select-none shrink-0",
                      isCardInfoOpen
                        ? "bg-[var(--theme-primary)] text-white"
                        : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                    )}
                    aria-label="Toggle customization description"
                    title="View description"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>

            {/* Description: Hidden on mobile for customization (accessible via "i" tooltip to save viewport space) */}
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-400 leading-snug",
                item.id === "customization" ? "hidden sm:block" : "block"
              )}
            >
              {getAccordionDescription(item.id)}
            </p>
          </div>

          {/* Mobile Description Tooltip: Contained within card width, never cutting off */}
          {item.id === "customization" && (
            <AnimatePresence>
              {isCardInfoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 p-3 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed sm:hidden"
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 text-[11px] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0" />
                    Customization Overview
                  </div>
                  {getAccordionDescription(item.id)}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Preview Frame */}
        <div className={cn("flex flex-col relative overflow-hidden [isolation:isolate] [transform:translateZ(0)]", item.id === "customization" && "border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl rounded-2xl")}>
          {item.id === "customization" && (
            <WindowHeader
              title="preview"
              prompt=">_"
              action={
                <>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                    Real-time reactive visual output
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </>
              }
            />
          )}
          <div
            className={cn(
              "flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden group",
              item.id === "customization"
                ? "h-[340px] sm:h-[380px] md:h-[400px] overflow-y-auto"
                : "min-h-[220px] sm:min-h-[260px]"
            )}
          >
            <div className="w-full relative z-10">
              <AccordionVariantRenderer
                id={item.id}
                customProps={customProps}
              />
            </div>
          </div>

          {/* Optional Interactive Customizer for the Playground */}
          {item.id === "customization" && (
            <AccordionCustomizer
              customProps={customProps}
              onChange={onCustomPropsChange}
            />
          )}
        </div>
      </section>
    </StackedCard>
  );
}
