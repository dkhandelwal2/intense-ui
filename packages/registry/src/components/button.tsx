"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Share2, X, Check, Trash2, Archive, AlertTriangle, Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"> {
  children?: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "subtle" | "text" | "ghost" | "3d" | "shimmer" | "ripple" | "filled-border" | "confirmation" | "confirm" | "delete" | "share";
  size?: "sm" | "md" | "lg" | "icon";
  rounded?: boolean; loading?: boolean; onShare?: (platform: string) => void;
  confirmAction?: "delete" | "confirm" | "archive" | "discard"; confirmType?: "pill" | "icon"; onConfirm?: () => void;
}

const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5", md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-2xl gap-2.5", icon: "w-10 h-10 p-0 rounded-xl gap-0 justify-center shrink-0",
};

const VARIANT_STYLES = {
  default: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm",
  glow: "relative bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.35)] hover:shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.6)] border border-white/20",
  outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 shadow-2xs",
  subtle: "bg-zinc-100 dark:bg-zinc-800/70 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-none",
  text: "bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-none",
  ghost: "bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-none",
  "3d": "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-b-4 border-zinc-950 dark:border-zinc-300 active:border-b-0 active:translate-y-1 shadow-md hover:brightness-110",
  shimmer: "relative overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm",
  ripple: "relative overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm",
  "filled-border": "relative overflow-hidden border border-zinc-900 dark:border-white text-zinc-900 dark:text-white group z-0",
};

export function Button({ children, className, variant = "default", size = "md", rounded = false, loading = false, onShare, confirmAction, confirmType, onConfirm, onClick, disabled, ...props }: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  if (variant === "share") return <ShareButton size={size === "icon" ? "md" : size} onShare={onShare} className={className} />;
  if (variant === "confirmation" || variant === "confirm" || variant === "delete") {
    return <ConfirmationButton action={confirmAction || (variant === "delete" ? "delete" : "confirm")} type={confirmType || (size === "icon" ? "icon" : "pill")} size={size === "icon" ? "md" : size} onConfirm={onConfirm} className={className} />;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    if (variant === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    }
    onClick?.(e);
  };

  return (
    <motion.button whileHover={disabled || loading ? undefined : { scale: 1.02 }} whileTap={disabled || loading ? undefined : { scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={handleClick} disabled={disabled || loading}
      className={cn("inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", SIZE_STYLES[size], rounded && "rounded-full", VARIANT_STYLES[variant] || VARIANT_STYLES.default, className)}
      {...props}
    >
      {variant === "shimmer" && <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />}
      {variant === "filled-border" && <span className="absolute inset-0 bg-zinc-900 dark:bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10" />}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/30 dark:bg-zinc-900/30 pointer-events-none animate-ping" style={{ left: r.x - 12, top: r.y - 12, width: 24, height: 24 }} />
      ))}
      {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : null}
      {size === "icon" && loading ? null : (
        <span className={cn("inline-flex items-center gap-2", loading && "opacity-80", variant === "filled-border" && "group-hover:text-white dark:group-hover:text-zinc-900 transition-colors")}>{children}</span>
      )}
    </motion.button>
  );
}

export interface ConfirmationButtonProps {
  className?: string; size?: "sm" | "md" | "lg"; action?: "delete" | "confirm" | "archive" | "discard";
  type?: "pill" | "icon"; label?: string; confirmLabel?: string; cancelLabel?: string; successLabel?: string; onConfirm?: () => void;
}

const ACTION_CONFIGS = {
  delete: { label: "Delete", prompt: "Are you sure?", success: "Deleted!", icon: Trash2, pillBg: "bg-red-600 hover:bg-red-500", accent: "text-red-600 dark:text-red-500", confirmBtn: "bg-white text-red-600 hover:bg-zinc-100" },
  confirm: { label: "Confirm", prompt: "Proceed?", success: "Confirmed!", icon: Check, pillBg: "bg-emerald-600 hover:bg-emerald-500", accent: "text-emerald-600 dark:text-emerald-500", confirmBtn: "bg-white text-emerald-700 hover:bg-zinc-100" },
  archive: { label: "Archive", prompt: "Archive item?", success: "Archived!", icon: Archive, pillBg: "bg-amber-600 hover:bg-amber-500", accent: "text-amber-600 dark:text-amber-500", confirmBtn: "bg-white text-amber-700 hover:bg-zinc-100" },
  discard: { label: "Discard", prompt: "Discard?", success: "Discarded!", icon: AlertTriangle, pillBg: "bg-zinc-800 hover:bg-zinc-700", accent: "text-zinc-600 dark:text-zinc-400", confirmBtn: "bg-white text-zinc-950 hover:bg-zinc-100" },
};

export function ConfirmationButton({ className, size = "md", action = "delete", type = "pill", label, confirmLabel, cancelLabel, successLabel, onConfirm }: ConfirmationButtonProps) {
  const [state, setState] = useState<"idle" | "confirming" | "success">("idle");
  const cfg = ACTION_CONFIGS[action] || ACTION_CONFIGS.delete;
  const Icon = cfg.icon;

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation(); setState("success"); onConfirm?.();
    setTimeout(() => setState("idle"), 1800);
  };

  if (type === "icon") {
    return (
      <motion.div layout transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className={cn("relative rounded-2xl bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shadow-xs overflow-hidden select-none cursor-pointer h-12 transition-colors", state === "confirming" ? "w-36 px-2" : "w-12", state === "success" && "border-zinc-300 dark:border-zinc-700", className)}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.button key="icon-idle" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setState("confirming")} className="w-full h-full flex items-center justify-center outline-none text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label={label || cfg.label}>
              <Icon className="w-5 h-5" />
            </motion.button>
          )}
          {state === "confirming" && (
            <motion.div key="icon-confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-between gap-1">
              <motion.div animate={{ rotate: action === "delete" ? -15 : 0 }} className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0"><Icon className="w-4 h-4" /></motion.div>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-950/80 border border-zinc-300/80 dark:border-zinc-800/80 shrink-0">
                <button type="button" onClick={handleConfirm} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xs" aria-label={confirmLabel || "Confirm"}><Check className={cn("w-3.5 h-3.5 stroke-[2.5]", cfg.accent)} /></button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setState("idle"); }} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-xs" aria-label={cancelLabel || "Cancel"}><X className="w-3.5 h-3.5 stroke-[2.5]" /></button>
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
  const actionBtnSize = { sm: "w-5 h-5", md: "w-6 h-6", lg: "w-7 h-7" }[size];
  const iconSize = { sm: "w-3 h-3", md: "w-3.5 h-3.5", lg: "w-4 h-4" }[size];
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

export const ConfirmButton = ConfirmationButton;
export const DeleteButton = ConfirmationButton;
export const AnimatedButton = Button;
