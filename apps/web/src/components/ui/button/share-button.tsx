"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { ShareButtonProps, SharePlatform } from "./types";
import { PLATFORM_ICONS, SOLID_PLATFORM_ICONS, DEFAULT_PLATFORMS, SHARE_SIZES } from "./constants";
import { NeumorphicShare } from "./neumorphic-share";

export function ShareButton({
  className,
  size = "md",
  color,
  shareVariant = "default",
  platforms = DEFAULT_PLATFORMS,
  onShare,
}: ShareButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const isNeu = shareVariant === "neumorphic";
  const isGlow = shareVariant === "glow";
  const activeColor = color || (isGlow ? "#2b21cf" : "#3848f5");
  const cfg = SHARE_SIZES[size] || SHARE_SIZES.md;

  const handleSelect = (p: SharePlatform, e: React.MouseEvent) => {
    e.stopPropagation();
    p.onClick ? p.onClick() : p.url && typeof window !== "undefined" && window.open(p.url, "_blank", "noopener,noreferrer");
    onShare?.(p.id);
  };

  if (isNeu) {
    return <NeumorphicShare className={className} size={size} platforms={platforms} onSelect={handleSelect} />;
  }

  // Option 1: Floating Glow
  if (isGlow) {
    return (
      <motion.div
        animate={{ width: expanded ? cfg.expandedWidth : cfg.collapsedWidth }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={cn(
          "relative rounded-full select-none overflow-hidden",
          cfg.height,
          expanded
            ? "shadow-[0_12px_28px_rgba(43,33,207,0.45)]"
            : "bg-white dark:bg-zinc-950 border-[2.5px] shadow-[0_4px_16px_rgba(43,33,207,0.18)] hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
        style={{ borderColor: !expanded ? activeColor : undefined }}
      >
        {/* Layer 1: Blue background with social icons */}
        <motion.div
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute inset-0 rounded-full flex items-center justify-end border border-indigo-400/30",
            size === "sm" ? "pl-10 pr-2.5" : size === "lg" ? "pl-14 pr-4" : "pl-12 pr-3.5",
            !expanded && "pointer-events-none"
          )}
          style={{ background: `linear-gradient(135deg, ${activeColor}, #3c32ea)` }}
        >
          <div className="flex items-center justify-around w-full max-w-[240px] text-white">
            {platforms.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={(e) => handleSelect(p, e)}
                className="text-white hover:scale-125 transition-transform duration-150 cursor-pointer p-1"
                aria-label={p.label || p.id}
                title={p.label || p.id}
              >
                {p.icon || PLATFORM_ICONS[p.id.toLowerCase()] || <Share2 className={cfg.iconSize} />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Layer 2: Sliding White Pill that contracts to the left circle toggle */}
        <motion.div
          animate={{ width: expanded ? cfg.leftContractedWidth : "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={cn(
            "absolute left-0 top-0 bottom-0 overflow-hidden flex items-center cursor-pointer",
            expanded
              ? "rounded-full bg-white dark:bg-zinc-950 border-[2.5px] shadow-sm"
              : "rounded-full bg-transparent"
          )}
          style={{ borderColor: expanded ? activeColor : undefined }}
        >
          <div
            className="h-full flex items-center justify-center"
            style={{ width: cfg.collapsedWidth, minWidth: cfg.collapsedWidth }}
          >
            {!expanded && (
              <span
                className={cn("font-bold tracking-widest uppercase select-none", cfg.textSize)}
                style={{ color: activeColor }}
              >
                SHARE
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Option 3: Bold Solid Capsule
  return (
    <div className="relative inline-flex items-center justify-center py-3 select-none">
      <motion.div
        animate={{ width: expanded ? cfg.expandedWidth : cfg.collapsedWidth }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={cn(
          "relative rounded-full select-none",
          cfg.height,
          expanded
            ? "border-[2.5px] bg-white dark:bg-zinc-950 shadow-md"
            : "text-white shadow-[0_8px_20px_rgba(56,72,245,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
        style={{
          borderColor: expanded ? activeColor : undefined,
          backgroundColor: !expanded ? activeColor : undefined,
        }}
        onClick={(e) => {
          if (!expanded) setExpanded(true);
          else if (e.target === e.currentTarget) setExpanded(false);
        }}
      >
        {/* Layer 1: White Bed with 4 Solid Social Icons */}
        <motion.div
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className={cn("absolute inset-0 px-4 flex items-center justify-around", !expanded && "pointer-events-none")}
          style={{ color: activeColor }}
        >
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={(e) => handleSelect(p, e)}
              className="hover:scale-125 transition-transform duration-150 cursor-pointer p-0.5"
              aria-label={p.label || p.id}
              title={p.label || p.id}
            >
              {SOLID_PLATFORM_ICONS[p.id.toLowerCase()] || p.icon || <Share2 className={cfg.solidIconSize} />}
            </button>
          ))}
        </motion.div>

        {/* Layer 2: Label when collapsed vs Top Tab Badge when expanded */}
        <AnimatePresence initial={false}>
          {!expanded ? (
            <motion.span
              key="solid-label"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className={cn("absolute inset-0 flex items-center justify-center font-bold tracking-widest uppercase select-none pointer-events-none text-white", cfg.textSize)}
            >
              SHARE
            </motion.span>
          ) : (
            <motion.button
              key="solid-badge"
              type="button"
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 450, damping: 26 }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-xs hover:scale-105 active:scale-95 cursor-pointer select-none z-10"
              style={{ backgroundColor: activeColor }}
              aria-label="Collapse"
            >
              SHARE
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
