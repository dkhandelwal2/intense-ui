"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { ConfirmationButtonProps } from "./types";
import { ACTION_CONFIGS } from "./constants";

export function ConfirmationButton({
  className,
  size = "md",
  action = "delete",
  type = "pill",
  label,
  confirmLabel,
  cancelLabel,
  successLabel,
  onConfirm,
}: ConfirmationButtonProps) {
  const [state, setState] = useState<"idle" | "confirming" | "success">("idle");
  const cfg = ACTION_CONFIGS[action] || ACTION_CONFIGS.delete, Icon = cfg.icon;

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("success");
    onConfirm?.();
    setTimeout(() => setState("idle"), 1800);
  };

  if (type === "icon") {
    return (
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className={cn(
          "relative rounded-2xl bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shadow-xs overflow-hidden select-none cursor-pointer h-12 transition-colors",
          state === "confirming" ? "w-32 pl-2" : "w-12",
          state === "success" && "border-zinc-300 dark:border-zinc-700",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.button key="icon-idle" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setState("confirming")} className="w-full h-full flex items-center justify-center outline-none text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label={label || cfg.label}>
              <Icon className="w-5 h-5" />
            </motion.button>
          )}
          {state === "confirming" && (
            <motion.div key="icon-confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-between gap-1">
              <motion.div animate={{ rotate: action === "delete" ? -15 : 0 }} className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0">
                <Icon className="w-4 h-4" />
              </motion.div>
              <div className="relative flex items-center gap-1.5 h-12 p-2 rounded-xl bg-zinc-400 dark:bg-zinc-950/80 shrink-0 before:content-[attr(data-label)] before:absolute before:flex before:items-center before:justify-center before:transition-transform before:duration-300 before:ease-out before:w-2 before:h-2 before:left-[-3px] before:zIndex-[-1] dark:before:bg-zinc-950/80 before:rotate-[45deg] before:rounded-[2px] before:bg-zinc-400">
                <button type="button" onClick={handleConfirm} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xs" aria-label={confirmLabel || "Confirm"}>
                  <Check className={cn("w-3.5 h-3.5 stroke-[2.5]", cfg.accent)} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setState("idle"); }} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-xs" aria-label={cancelLabel || "Cancel"}>
                  <X className={cn("w-3.5 h-3.5 stroke-[2.5]")} />
                </button>
              </div>
            </motion.div>
          )}
          {state === "success" && (
            <motion.div key="icon-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full h-full flex items-center justify-center">
              <Check className={cn("w-5 h-5 stroke-[2.5]", cfg.accent)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  const sizeClasses = { sm: "h-8 text-xs", md: "h-10 text-sm", lg: "h-12 text-base" }[size];
  const actionBtnSize = { sm: "w-5 h-5", md: "w-6 h-6", lg: "w-7 h-7" }[size], iconSize = { sm: "w-3 h-3", md: "w-3.5 h-3.5", lg: "w-4 h-4" }[size];
  const widthClasses = state === "confirming" ? { sm: "w-40 px-2.5", md: "w-48 px-3", lg: "w-56 px-3.5" }[size] : { sm: "w-24 px-2", md: "w-28 px-3", lg: "w-32 px-4" }[size];

  return (
    <motion.div layout transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn("relative rounded-full text-white flex items-center justify-center shadow-md overflow-hidden select-none cursor-pointer transition-colors", sizeClasses, widthClasses, cfg.pillBg, className)}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.button key="idle" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setState("confirming")} className="w-full h-full flex items-center justify-center gap-1.5 font-bold tracking-wide outline-none">
            <Icon className={iconSize} /> <span>{label || cfg.label}</span>
          </motion.button>
        )}
        {state === "confirming" && (
          <motion.div key="confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-semibold text-white/90 truncate">{cfg.prompt}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button type="button" onClick={(e) => { e.stopPropagation(); setState("idle"); }} className={cn(actionBtnSize, "rounded-full bg-black/20 hover:bg-black/30 active:scale-95 text-white flex items-center justify-center transition-transform hover:scale-110")} aria-label={cancelLabel || "Cancel"}><X className={iconSize} /></button>
              <button type="button" onClick={handleConfirm} className={cn(actionBtnSize, "rounded-full font-bold transition-transform hover:scale-110 active:scale-95 shadow-xs flex items-center justify-center", cfg.confirmBtn)} aria-label={confirmLabel || "Confirm"}><Check className={cn(iconSize, "stroke-[2.5]")} /></button>
            </div>
          </motion.div>
        )}
        {state === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full h-full flex items-center justify-center gap-1.5 font-bold text-xs text-white">
            <Check className="w-4 h-4 text-emerald-300 stroke-[3]" /> <span>{successLabel || cfg.success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
