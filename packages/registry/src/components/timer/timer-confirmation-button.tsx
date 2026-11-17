"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Square, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerConfirmationButtonProps } from "./types";

export function TimerConfirmationButton({
  onConfirm,
  label = "Stop timer",
  confirmLabel = "Confirm stop timer",
  cancelLabel = "Cancel stop timer",
  className,
}: TimerConfirmationButtonProps) {
  const [state, setState] = useState<"idle" | "confirming" | "success">("idle");

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
    onConfirm();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn(
        "relative rounded-xl flex items-center justify-center select-none shadow-xs overflow-hidden transition-colors h-8 sm:h-8.5",
        state === "idle" &&
          "w-8 sm:w-8.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-[#242426] dark:hover:bg-[#2e2e30] dark:text-zinc-300 border border-zinc-200 dark:border-white/5",
        state === "confirming" &&
          "w-28 sm:w-29 pl-1.5 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300",
        state === "success" &&
          "w-8 sm:w-8.5 bg-rose-50 dark:bg-[#34151b] border border-rose-200 dark:border-rose-950/60",
        className
      )}
    >
      <AnimatePresence initial={false}>
        {state === "idle" ? (
          <motion.button
            key="icon-idle"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.stopPropagation();
              setState("confirming");
            }}
            aria-label={label}
            className="w-full h-full flex items-center justify-center outline-none cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </motion.button>
        ) : state === "confirming" ? (
          <motion.div
            key="icon-confirming"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full flex items-center justify-between gap-1"
          >
            {/* Tilted icon preview on the left */}
            <motion.div
              animate={{ rotate: -15 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-5 h-5 flex items-center justify-center text-rose-500 shrink-0"
            >
              <Square className="w-3 h-3 fill-rose-500" />
            </motion.div>

            {/* Speech bubble action pill with pointer */}
            <div className="relative flex items-center gap-1 h-full px-1.5 py-1 rounded-lg bg-zinc-300 dark:bg-zinc-950/80 shrink-0 before:content-[attr(data-label)] before:absolute before:flex before:items-center before:justify-center before:transition-transform before:duration-300 before:ease-out before:w-1.5 before:h-1.5 before:left-[-3px] before:zIndex-[-1] dark:before:bg-zinc-950/80 before:rotate-[45deg] before:rounded-[1px] before:bg-zinc-300">
              <button
                type="button"
                onClick={handleConfirm}
                aria-label={confirmLabel}
                className="w-6 h-6 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.8] text-rose-600 dark:text-rose-500" />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                aria-label={cancelLabel}
                className="w-6 h-6 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-xs cursor-pointer border border-zinc-200 dark:border-white/5"
              >
                <X className="w-3.5 h-3.5 stroke-[2.8]" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="icon-success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Check className="w-4 h-4 stroke-[3] text-rose-600 dark:text-rose-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
