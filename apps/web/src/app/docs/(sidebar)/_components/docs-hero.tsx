"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Check, Copy, Flame } from "lucide-react";
import { toast } from "sonner";
import { APP_ROUTES } from "@/config/site";

export function DocsHero() {
  const [copied, setCopied] = useState(false);
  const cliCommand = "npx intense-ui add signature-pad";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full pt-4 sm:pt-8 pb-10 sm:pb-14 flex flex-col items-center text-center select-none overflow-visible">
      {/* 1. Dramatic Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[380px] sm:w-[750px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[var(--theme-primary)]/25 via-pink-500/15 to-purple-600/15 blur-3xl -z-10 rounded-full" />

      {/* 2. Top Release Hologram Pill */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-6"
      >
        <span className="flex items-center gap-1.5 text-[var(--theme-primary)] font-extrabold font-mono">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>v0.1.0</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          The Spatial UI Component Architecture
        </span>
      </motion.div>

      {/* 3. Primary Iridescent Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl leading-[1.08]"
      >
        Crafted for Delight.{" "}
        <span className="bg-gradient-to-r from-[var(--theme-primary)] via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Engineered for Speed.
        </span>
      </motion.h1>

      {/* 4. Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-5 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-normal"
      >
        Intense UI brings spatial micro-interactions, mathematical spring physics, and dynamic
        island widgets directly into your React &amp; Tailwind CSS codebase. Zero monolithic lock-in.
      </motion.p>

      {/* 5. Action Buttons & Quick Copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none"
      >
        <Link
          href={APP_ROUTES.INSTALLATION}
          className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--theme-primary)] to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-[var(--theme-primary)]/25 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <span>Get Started Quick</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Quick CLI Copy Pill */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy CLI install command"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-100/90 dark:bg-zinc-800/90 border border-zinc-200/90 dark:border-zinc-700/90 text-zinc-800 dark:text-zinc-200 font-mono text-xs hover:border-[var(--theme-primary)]/60 transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>{cliCommand}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400" />
          )}
        </button>
      </motion.div>

      {/* 6. Floating Metrics Capsule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl text-left"
      >
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">14+</div>
          <div className="text-[10.5px] font-mono text-zinc-500">Live UI Primitives</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="text-xl font-black text-[var(--theme-primary)]">60+ FPS</div>
          <div className="text-[10.5px] font-mono text-zinc-500">Composited Physics</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="text-xl font-black text-emerald-500">100%</div>
          <div className="text-[10.5px] font-mono text-zinc-500">Direct Code Ownership</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="text-xl font-black text-blue-500">&lt;50ms</div>
          <div className="text-[10.5px] font-mono text-zinc-500">Edge Pre-Render SSG</div>
        </div>
      </motion.div>
    </div>
  );
}
