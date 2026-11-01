"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLogoLoaderProps {
  size?: "sm" | "md" | "lg" | "fullscreen";
  message?: string;
  className?: string;
}

const SIZE_CONFIG = {
  sm: {
    container: 52,
    orbit: 68,
    glow: 90,
    text: "text-[11px]",
  },
  md: {
    container: 84,
    orbit: 112,
    glow: 140,
    text: "text-xs sm:text-sm",
  },
  lg: {
    container: 112,
    orbit: 148,
    glow: 180,
    text: "text-sm sm:text-base",
  },
  fullscreen: {
    container: 132,
    orbit: 176,
    glow: 220,
    text: "text-sm sm:text-base",
  },
};

const WINGS = [
  { baseAngle: 0, delay: 0 },
  { baseAngle: 120, delay: 0.36 },
  { baseAngle: 240, delay: 0.72 },
];

export function AnimatedLogoLoader({
  size = "md",
  message = "Loading...",
  className,
}: AnimatedLogoLoaderProps) {
  const isFullscreen = size === "fullscreen";
  const cfg = SIZE_CONFIG[size];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center select-none",
        isFullscreen &&
          "fixed inset-0 z-[99999] w-screen h-screen bg-background/95 backdrop-blur-3xl",
        className
      )}
    >
      {/* Ambient Pulsing Atmospheric Aura */}
      <div className="absolute pointer-events-none -z-10 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [0.95, 1.25, 0.95],
            opacity: [0.3, 0.65, 0.3],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: cfg.glow, height: cfg.glow }}
          className="rounded-full bg-gradient-to-tr from-[var(--theme-primary)]/50 via-pink-500/40 to-purple-600/30 blur-2xl sm:blur-3xl"
        />
      </div>

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle Outer Orbital Dashed Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ width: cfg.orbit, height: cfg.orbit }}
          className="absolute rounded-full border border-dashed border-[var(--theme-primary)]/25 pointer-events-none"
        />

        {/* Counter-rotating Inner Arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ width: cfg.container * 1.15, height: cfg.container * 1.15 }}
          className="absolute rounded-full border border-[var(--theme-primary)]/15 pointer-events-none"
        />

        {/* Rotating Vortex Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ width: cfg.container, height: cfg.container }}
          className="relative flex items-center justify-center"
        >
          {/* Symmetrical Wings generated from single optimized wing asset */}
          {WINGS.map(({ baseAngle, delay }, idx) => (
            <motion.div
              key={baseAngle}
              initial={{ opacity: 0, scale: 0.6, rotate: baseAngle - 30 }}
              animate={{ opacity: 1, scale: 1, rotate: baseAngle }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
                delay: idx * 0.08,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transformOrigin: "50% 50%" }}
            >
              {/* Dynamic Breathing Wing Flap along radial axis */}
              <motion.div
                animate={{
                  scale: [1, 1.09, 1],
                  y: [0, -6, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
                className="w-full h-full flex items-center justify-center"
                style={{ transformOrigin: "50% 50%" }}
              >
                <Image
                  src="/logo-wing.webp"
                  alt=""
                  width={cfg.container}
                  height={cfg.container}
                  className="w-full h-full object-contain drop-shadow-[0_2px_14px_rgba(255,0,132,0.55)]"
                  priority
                  unoptimized
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Core Energy Pulse in Center */}
          <motion.div
            animate={{
              scale: [0.75, 1.25, 0.75],
              opacity: [0.5, 0.95, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-[var(--theme-primary)] shadow-[0_0_12px_var(--theme-primary)] pointer-events-none"
          />
        </motion.div>

        {/* Minimalist Subtitle: "Navigating..." or "Loading..." */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className={cn(
              "mt-5 font-medium tracking-widest text-zinc-500 dark:text-zinc-400 select-none flex items-center justify-center gap-2",
              cfg.text
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-ping" />
            <motion.span
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {message}
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
