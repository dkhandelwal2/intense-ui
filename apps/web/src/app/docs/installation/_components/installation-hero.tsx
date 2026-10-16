"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FolderGit2, Zap, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SetupMode } from "./constants";

export interface InstallationHeroProps {
  setupMode: SetupMode;
  onSetupModeChange: (mode: SetupMode) => void;
}

export function InstallationHero({
  setupMode,
  onSetupModeChange,
}: InstallationHeroProps) {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 w-full min-w-0">
      {/* Hero Header with Floating Tech Badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/25 shadow-[0_0_15px_rgba(255,0,132,0.15)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Intense UI Registry v1.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-ping" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
        >
          <FolderGit2 className="w-3 h-3 text-[var(--theme-primary)]" />
          <span>Zero Lock-in Source Distribution</span>
        </motion.div>
      </div>

      <div className="space-y-3 w-full min-w-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1] break-words"
        >
          Installation &amp;{" "}
          <span className="bg-gradient-to-r from-[var(--theme-primary)] via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Quickstart
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
        >
          Install animated React components directly into your codebase via the official shadcn CLI. Own the code with 100% control over design and physics.
        </motion.p>
      </div>

      {/* Project Setup Persona Switcher */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="w-full sm:w-auto flex flex-col items-start gap-2.5"
      >
        {/* Capsule Dock */}
        <div className="relative grid grid-cols-2 p-1 rounded-full bg-zinc-200/70 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-lg w-full max-w-[340px] sm:max-w-[370px]">
          <button
            onClick={() => onSetupModeChange("fresh")}
            className={cn(
              "relative flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 z-10 active:scale-95",
              setupMode === "fresh"
                ? "text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            {setupMode === "fresh" && (
              <motion.div
                layoutId="setupModePill"
                className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)] via-pink-500 to-purple-600 rounded-full shadow-[0_0_22px_rgba(255,0,132,0.4)]"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Fresh Project</span>
            </span>
          </button>

          <button
            onClick={() => onSetupModeChange("existing")}
            className={cn(
              "relative flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 z-10 active:scale-95",
              setupMode === "existing"
                ? "text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            {setupMode === "existing" && (
              <motion.div
                layoutId="setupModePill"
                className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)] via-pink-500 to-purple-600 rounded-full shadow-[0_0_22px_rgba(255,0,132,0.4)]"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
              <Cpu className="w-3.5 h-3.5 shrink-0" />
              <span>Existing shadcn</span>
            </span>
          </button>
        </div>

        {/* Dynamic Helper Pill */}
        <motion.div
          key={setupMode}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 px-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse shrink-0" />
          <span>
            {setupMode === "fresh"
              ? "Full 3-step guide: includes shadcn init & path config"
              : "Fast-track 2-step: skip init and add components directly"}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
