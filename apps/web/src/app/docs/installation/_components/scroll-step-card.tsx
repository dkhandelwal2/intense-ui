"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollStepCardProps {
  stepNumber: string;
  badgeText: string;
  badgeColor?: string;
  icon: React.ReactNode;
  glowColor?: string;
  numberGradient?: string;
  numberShadow?: string;
  iconGradient?: string;
  borderHoverColor?: string;
  children: React.ReactNode;
}

export function ScrollStepCard({
  stepNumber,
  badgeText,
  badgeColor = "text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/20",
  icon,
  glowColor = "from-[var(--theme-primary)]/40 to-pink-500/20",
  numberGradient = "from-[var(--theme-primary)] via-pink-400 to-purple-400",
  numberShadow = "drop-shadow-[0_10px_35px_rgba(255,0,132,0.25)]",
  iconGradient = "bg-gradient-to-br from-[var(--theme-primary)] to-pink-600 shadow-[0_0_25px_rgba(255,0,132,0.45)]",
  borderHoverColor = "hover:border-[var(--theme-primary)]/40",
  children,
}: ScrollStepCardProps) {
  return (
    <div className="relative w-full min-w-0 pt-20 sm:pt-28 md:pt-36 pb-2">
      {/* Atmospheric Radial Blur Glow Behind Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "pointer-events-none absolute top-2 sm:top-4 right-2 sm:right-8 w-[180px] sm:w-[280px] h-[140px] sm:h-[200px] rounded-full blur-3xl -z-10 bg-gradient-to-tr",
          glowColor
        )}
      />

      {/* Huge 3D Cinematic Watermark Number that reacts to scroll */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.82, y: 30 }}
        whileInView={{ opacity: 0.9, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        className={cn(
          "pointer-events-none select-none absolute top-1 sm:top-2 md:top-3 right-3 sm:right-8 md:right-10 font-black tracking-tighter text-[96px] sm:text-[150px] md:text-[190px] lg:text-[210px] leading-none bg-gradient-to-br bg-clip-text text-transparent z-0",
          numberGradient,
          numberShadow
        )}
      >
        {stepNumber}
      </motion.div>

      {/* Content Card Emerging Out of the Number */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 130, damping: 22, delay: 0.05 }}
        className={cn(
          "relative z-10 w-full min-w-0 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-white/85 dark:bg-[#0c0c0e]/85 p-4 sm:p-7 md:p-8 backdrop-blur-xl shadow-2xl space-y-5 transition-all duration-300",
          borderHoverColor
        )}
      >
        {/* Step Header with Holographic Icon Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl text-white border border-white/20 shrink-0",
                iconGradient
              )}
            >
              {icon}
            </motion.div>
            <div>
              <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest border", badgeColor)}>
                {badgeText}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-bold">
            STEP {stepNumber}
          </span>
        </div>

        {/* Step Specific Content */}
        {children}
      </motion.div>
    </div>
  );
}
