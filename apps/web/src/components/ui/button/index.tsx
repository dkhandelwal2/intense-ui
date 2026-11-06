"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "./types";
import { SIZE_STYLES, VARIANT_STYLES } from "./constants";
import { ConfirmationButton } from "./confirmation-button";
import { ShareButton } from "./share-button";

export * from "./types";
export * from "./constants";
export * from "./confirmation-button";
export * from "./share-button";

export function Button({
  children, className, variant = "default", size = "md", color, shareVariant,
  platforms, rounded = false, loading = false, onShare, confirmAction,
  confirmType, onConfirm, onClick, disabled, ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  if (variant === "share") {
    return <ShareButton size={size === "icon" ? "md" : size} color={color} shareVariant={shareVariant} platforms={platforms} onShare={onShare} className={className} />;
  }
  if (variant === "confirmation" || variant === "confirm" || variant === "delete") {
    return (
      <ConfirmationButton
        action={confirmAction || (variant === "delete" ? "delete" : "confirm")}
        type={confirmType || (size === "icon" ? "icon" : "pill")}
        size={size === "icon" ? "md" : size}
        onConfirm={onConfirm}
        className={className}
      />
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    if (variant === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect(), id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    }
    onClick?.(e);
  };

  const is3D = variant === "3d";

  return (
    <motion.button
      whileHover={disabled || loading ? undefined : is3D ? { y: -1 } : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : is3D ? { y: 4 } : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: is3D ? 600 : 400, damping: is3D ? 20 : 25 }}
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        SIZE_STYLES[size], rounded && "rounded-full", VARIANT_STYLES[variant] || VARIANT_STYLES.default, className
      )}
      {...props}
    >
      {variant === "shimmer" && (
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatDelay: 0.4 }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-400/40 to-transparent pointer-events-none -skew-x-12"
        />
      )}
      {variant === "filled-border" && (
        <span className="absolute -inset-1 rounded-[inherit] bg-zinc-900 dark:bg-white -translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10 pointer-events-none" />
      )}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/30 dark:bg-zinc-900/30 pointer-events-none animate-ping" style={{ left: r.x - 12, top: r.y - 12, width: 24, height: 24 }} />
      ))}
      {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : null}
      {size === "icon" && loading ? null : (
        <span className={cn("inline-flex items-center gap-2", loading && "opacity-80", variant === "filled-border" && "group-hover:text-white dark:group-hover:text-zinc-900 transition-colors")}>
          {children}
        </span>
      )}
    </motion.button>
  );
}

export const ConfirmButton = ConfirmationButton, DeleteButton = ConfirmationButton;
