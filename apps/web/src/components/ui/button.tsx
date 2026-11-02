"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Share2, X, Check, Trash2, Archive, AlertTriangle } from "lucide-react";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"> {
  children?: React.ReactNode; variant?: "default" | "glow" | "outline" | "subtle" | "share" | "confirm" | "delete";
  size?: "sm" | "md" | "lg"; onShare?: (platform: string) => void;
  confirmAction?: "delete" | "confirm" | "archive" | "discard"; onConfirm?: () => void;
}

const SIZE_STYLES = { sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5", md: "px-4 py-2 text-sm rounded-xl gap-2", lg: "px-6 py-3 text-base rounded-2xl gap-2.5" };
const VARIANT_STYLES = {
  default: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm",
  glow: "relative bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.35)] hover:shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.6)] border border-white/20",
  outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 shadow-2xs",
  subtle: "bg-zinc-100 dark:bg-zinc-800/70 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-none",
};

export function Button({ children, className, variant = "default", size = "md", onShare, confirmAction, onConfirm, ...props }: ButtonProps) {
  if (variant === "share") return <ShareButton size={size} onShare={onShare} className={className} />;
  if (variant === "confirm" || variant === "delete") {
    return <ConfirmButton action={confirmAction || (variant === "delete" ? "delete" : "confirm")} size={size} onConfirm={onConfirm} className={className} />;
  }
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", SIZE_STYLES[size], VARIANT_STYLES[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export interface ConfirmButtonProps {
  className?: string; size?: "sm" | "md" | "lg"; action?: "delete" | "confirm" | "archive" | "discard";
  label?: string; confirmLabel?: string; cancelLabel?: string; successLabel?: string; onConfirm?: () => void;
}

const ACTION_CONFIGS = {
  delete: { label: "Delete", confirmLabel: "Delete", prompt: "Are you sure?", success: "Deleted!", icon: Trash2, bg: "bg-red-600 dark:bg-red-600 hover:bg-red-500", confirmBtn: "bg-white text-red-600" },
  confirm: { label: "Confirm", confirmLabel: "Confirm", prompt: "Proceed?", success: "Confirmed!", icon: Check, bg: "bg-emerald-600 dark:bg-emerald-600 hover:bg-emerald-500", confirmBtn: "bg-white text-emerald-700" },
  archive: { label: "Archive", confirmLabel: "Archive", prompt: "Archive item?", success: "Archived!", icon: Archive, bg: "bg-amber-600 dark:bg-amber-600 hover:bg-amber-500", confirmBtn: "bg-white text-amber-700" },
  discard: { label: "Discard", confirmLabel: "Discard", prompt: "Discard?", success: "Discarded!", icon: AlertTriangle, bg: "bg-zinc-800 dark:bg-zinc-800 hover:bg-zinc-700", confirmBtn: "bg-white text-zinc-950" },
};

export function ConfirmButton({ className, size = "md", action = "delete", label, confirmLabel, successLabel, onConfirm }: ConfirmButtonProps) {
  const [state, setState] = useState<"idle" | "confirming" | "success">("idle");
  const cfg = ACTION_CONFIGS[action] || ACTION_CONFIGS.delete;
  const Icon = cfg.icon;
  const sizeClasses = { sm: "h-8 text-xs", md: "h-10 text-sm", lg: "h-12 text-base" }[size];
  const widthClasses = state === "confirming" ? { sm: "w-52 px-2", md: "w-60 px-3", lg: "w-68 px-4" }[size] : { sm: "w-24 px-2", md: "w-28 px-3", lg: "w-32 px-4" }[size];

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation(); setState("success"); onConfirm?.();
    setTimeout(() => setState("idle"), 1800);
  };

  return (
    <motion.div layout transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn("relative rounded-full text-white flex items-center justify-center shadow-md overflow-hidden select-none cursor-pointer transition-colors", sizeClasses, widthClasses, cfg.bg, className)}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.button key="idle" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setState("confirming")} className="w-full h-full flex items-center justify-center gap-1.5 font-bold tracking-wide outline-none">
            <Icon className="w-3.5 h-3.5" /> <span>{label || cfg.label}</span>
          </motion.button>
        )}
        {state === "confirming" && (
          <motion.div key="confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-semibold text-white/90 truncate">{cfg.prompt}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button type="button" onClick={(e) => { e.stopPropagation(); setState("idle"); }} className="w-6 h-6 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-transform hover:scale-110" aria-label="Cancel"><X className="w-3 h-3" /></button>
              <button type="button" onClick={handleConfirm} className={cn("px-2.5 py-1 rounded-full font-bold text-xs transition-transform hover:scale-105 shadow-xs flex items-center gap-1", cfg.confirmBtn)}><Check className="w-3 h-3" /> {confirmLabel || cfg.confirmLabel}</button>
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

export function ShareButton({ className, size = "md", color = "#2563eb", onShare }: { className?: string; size?: "sm" | "md" | "lg"; color?: string; onShare?: (p: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const sizeClasses = { sm: "h-9 text-xs", md: "h-11 text-sm", lg: "h-13 text-base" }[size];
  const platforms = [
    { id: "whatsapp", label: "WhatsApp", icon: <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
    { id: "instagram", label: "Instagram", icon: <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /></svg> },
    { id: "twitter", label: "X", icon: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  ];

  return (
    <motion.div layout transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn("relative rounded-full text-white flex items-center justify-center shadow-md overflow-hidden select-none cursor-pointer", sizeClasses, expanded ? "w-56 px-2" : "w-28", className)}
      style={{ backgroundColor: color }}
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button key="collapsed" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setExpanded(true)} className="w-full h-full flex items-center justify-center gap-1.5 font-bold tracking-widest uppercase outline-none">
            <Share2 className="w-3.5 h-3.5 stroke-[2.5]" /> <span>SHARE</span>
          </motion.button>
        ) : (
          <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-between px-1">
            <button type="button" onClick={(e) => { e.stopPropagation(); setExpanded(false); }} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform hover:scale-110" aria-label="Close"><X className="w-3.5 h-3.5" /></button>
            <div className="flex items-center gap-3 pr-2">
              {platforms.map((p) => (
                <button key={p.id} type="button" onClick={(e) => { e.stopPropagation(); onShare?.(p.id); }} className="w-6 h-6 flex items-center justify-center hover:scale-125 transition-transform" aria-label={p.label}>{p.icon}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const DeleteButton = ConfirmButton;
export const AnimatedButton = Button;
