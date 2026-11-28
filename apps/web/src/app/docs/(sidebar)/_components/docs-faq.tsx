"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { DOC_FAQS } from "./constants";
import { cn } from "@/lib/utils";

export function DocsFaq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="relative w-full py-10 sm:py-16 select-none">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/20 mb-3">
          Frequently Asked
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Architecture &amp; Usage FAQ
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
          Everything you need to know about integrating and building with Intense UI.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {DOC_FAQS.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={item.question}
              className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180 text-[var(--theme-primary)]"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/40 dark:border-zinc-800/40">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
