"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RotateCw,
  Terminal,
} from "lucide-react";
import { SpaceCanvas } from "./space-canvas";
import { FloatingAstronaut } from "./floating-astronaut";
import { Illustration500 } from "./illustration-500";
import { Illustration503 } from "./illustration-503";
import { HeaderSearchDialog } from "@/components/layout/header-components";

export type ErrorStatusCode = 404 | 500 | 503;

export interface ErrorViewProps {
  code?: ErrorStatusCode;
  title?: string;
  description?: string;
  error?: Error & { digest?: string };
  reset?: () => void;
}

const ERROR_CONFIGS: Record<
  ErrorStatusCode,
  {
    badge: string;
    headline: string;
    title: string;
    description: string;
    diagnostic: string;
    accentColor: string;
  }
> = {
  404: {
    badge: "Status 404 • Lost in Orbit",
    headline: "Oops!",
    title: "404",
    description: "Your page is currently drifting in deep space.",
    diagnostic: "ERR_NODE_NOT_RESOLVED: 404 (Registry lookup yielded 0 entries)",
    accentColor: "var(--theme-primary)",
  },
  500: {
    badge: "Status 500 • Internal Circuit Flux",
    headline: "Thermal Spike",
    title: "500",
    description:
      "An unexpected anomaly triggered a thermal spike inside the execution pipeline. Diagnostics are actively isolating the fault.",
    diagnostic: "CRITICAL_STATE_FLUX: 500 (Unhandled runtime interruption)",
    accentColor: "#EF4444",
  },
  503: {
    badge: "Status 503 • Orbital Calibration",
    headline: "Scheduled Maintenance",
    title: "503",
    description:
      "Intense UI is synchronizing fresh registry packages and re-aligning quantum cache rings. Service will resume in just a moment.",
    diagnostic: "MAINTENANCE_ACTIVE: 503 (Re-indexing component registry tree)",
    accentColor: "#3B82F6",
  },
};

export function ErrorView({
  code = 404,
  title: customTitle,
  description: customDescription,
  error,
  reset,
}: ErrorViewProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener for interactive command search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentConfig = ERROR_CONFIGS[code];
  const displayDescription = customDescription || currentConfig.description;

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  const handleSearchNavigate = (href: string) => {
    setIsSearchOpen(false);
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-[#000000] text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 select-none">
      {/* ── Space Canvas: Twinkling Uniform Stars, Meteors & Curved Semi-Earth Horizon ── */}
      <SpaceCanvas />

      {/* ── Main Error Content Container ── */}
      <div className="w-full max-w-6xl mx-auto z-20">
        <AnimatePresence mode="wait">
          {code === 404 ? (
            /* ── 404 CINEMATIC LAYOUT (Matching Reference Image) ── */
            <motion.div
              key="404-layout"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* LEFT: Wandering Zero-G Generic Astronaut Spacemaster */}
              <div className="lg:col-span-6 flex justify-center order-1 lg:order-1">
                <FloatingAstronaut />
              </div>

              {/* RIGHT: Typography & Actions matching screenshot */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2 px-2 sm:px-4">
                {/* "Oops!" Header */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-1"
                >
                  Oops!
                </motion.div>

                {/* Giant Crisp "404" Number with Brand Theme 0 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative select-none my-1"
                >
                  <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tight text-white leading-none">
                    4<span className="text-[var(--theme-primary)] drop-shadow-[0_0_35px_rgba(255,0,132,0.6)]">0</span>4
                  </h1>
                </motion.div>

                {/* Explicit "Page Not Found" Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.13 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mt-2"
                >
                  Page Not Found
                </motion.h2>

                {/* Subtitle Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.16 }}
                  className="text-sm sm:text-base text-zinc-400 max-w-md mt-2 mb-8 leading-relaxed font-normal"
                >
                  {displayDescription}
                </motion.p>

                {/* Action Buttons: "Return to home" pill + "Search (⌘K)" */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
                >
                  {/* Clean Primary Pill Button: Return to home */}
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-md"
                  >
                    <span>Return to home</span>
                  </Link>

                  {/* Functional Search Pill Button with ⌘K */}
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-white/40 text-zinc-200 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                    title="Open Command Search (⌘K)"
                  >
                    <Search className="w-4 h-4 text-zinc-300" />
                    <span>Search</span>
                    <kbd className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/10 border border-white/10 text-zinc-300">
                      ⌘K
                    </kbd>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* ── 500 / 503 CENTERED ADVANCED ILLUSTRATION LAYOUT ── */
            <motion.div
              key="system-error-layout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto"
            >
              {/* Illustration */}
              <div className="w-full flex justify-center mb-2">
                {code === 500 && <Illustration500 />}
                {code === 503 && <Illustration503 />}
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3.5 bg-white/[0.06] border border-white/10 text-zinc-300 backdrop-blur-md">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentConfig.accentColor }}
                />
                <span>{currentConfig.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                {customTitle || currentConfig.headline}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-300 max-w-lg mb-8 leading-relaxed font-normal">
                {displayDescription}
              </p>

              {/* Diagnostic Terminal Box */}
              <div className="w-full max-w-lg p-3.5 mb-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-left font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>system_telemetry</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    nodes_online
                  </span>
                </div>
                <div className="text-zinc-400 space-y-1">
                  <p className="truncate">
                    <span className="text-zinc-600">&gt;</span> {currentConfig.diagnostic}
                  </p>
                  {error?.digest && (
                    <p className="truncate text-rose-400">
                      <span className="text-zinc-600">&gt;</span> Digest: {error.digest}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer border border-white/20 bg-white/[0.08] hover:bg-white/[0.15]"
                  style={{
                    boxShadow: `0 0 20px -5px ${currentConfig.accentColor}`,
                  }}
                >
                  Return to home
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Retry Connection</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Interactive Command Search Dialog (⌘K) ── */}
      <HeaderSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />
    </div>
  );
}
