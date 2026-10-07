"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  sliderText?: "on/off" | "true/false";
  showDotIcon?: boolean;
  shadowColor?: string;
}

export function Switch({
  checked,
  onChange,
  disabled,
  className,
  orientation = "horizontal",
  size = "md",
  sliderText = "on/off",
  showDotIcon = true,
  shadowColor = "var(--theme-primary)"
}: SwitchProps) {
  const isHor = orientation === "horizontal";

  const sizeClasses = {
    sm: isHor ? "w-16 h-6" : "w-6 h-16",
    md: isHor ? "w-20 h-8" : "w-8 h-20",
    lg: isHor ? "w-28 h-10" : "w-10 h-28"
  };

  const textClasses = {
    sm: "text-[7px]",
    md: "text-[9px]",
    lg: "text-[11px]"
  };

  const dotClasses = {
    sm: "w-1 h-1 shadow-[0_0_4px_rgba(var(--dot-color),0.8)]",
    md: "w-1.5 h-1.5 shadow-[0_0_6px_rgba(var(--dot-color),0.8)]",
    lg: "w-2 h-2 shadow-[0_0_8px_rgba(var(--dot-color),0.8)]"
  };

  const shadowShift = { sm: 2, md: 3, lg: 4 }[size];

  // When ON (checked), we want the ON part (Right/Bottom) to be pressed, 
  // and the OFF part (Left/Top) to be raised.
  const rockY = isHor ? (checked ? 15 : -15) : 0;
  const rockX = isHor ? 0 : (checked ? -15 : 15);

  const labelOff = sliderText === "true/false" ? "FALSE" : "OFF";
  const labelOn = sliderText === "true/false" ? "TRUE" : "ON";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mx-2 my-2",
        sizeClasses[size],
        className
      )}
      style={{ perspective: "9999px" }}
    >
      <div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="w-full h-full rounded-full absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={{
            rotateY: rockY,
            rotateX: rockX,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Base Floor Shadow (Targeted under the raised side) */}
          <motion.div
            className={cn(
              "absolute rounded-full bg-black/20 dark:bg-black/60 blur-[6px]",
              isHor ? "w-[60%] h-full top-0" : "h-[60%] w-full left-0"
            )}
            style={{ transform: "translateZ(-10px)" }}
            animate={{
              [isHor ? "left" : "top"]: checked ? "0%" : "40%",
              x: isHor ? (checked ? -shadowShift : shadowShift) : 0,
              y: isHor ? 0 : (checked ? -shadowShift : shadowShift)
            }}
          />

          {/* 3D Extrusion Wall with slight draft angle to prevent edge bleed */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: shadowColor,
                transform: `translateZ(${-i * 0.5}px) scale(${1 - i * 0.001})`,
                filter: `brightness(${1 - i * 0.015})`
              }}
            />
          ))}

          {/* Top Face */}
          <div
            className={cn("absolute inset-0 rounded-full overflow-hidden flex", isHor ? "flex-row" : "flex-col")}
            style={{ transform: "translateZ(0.5px)", backfaceVisibility: "hidden" }}
          >
            {/* First Half (OFF) */}
            <div className="relative flex-1 w-full h-full">
              <motion.div
                className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700"
                animate={{ opacity: !checked ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 bg-zinc-400 dark:bg-zinc-900"
                animate={{ opacity: !checked ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* OFF Text & Dot */}
              <div className="absolute inset-0 flex items-center justify-center gap-1" style={{ '--dot-color': '239, 68, 68' } as any}>
                {showDotIcon && (
                  <span className={cn(
                    "rounded-full transition-all duration-300",
                    !checked ? "bg-red-500" : "bg-red-500/20 dark:bg-red-950/40",
                    !checked ? dotClasses[size] : dotClasses[size].split(' ')[0] + " " + dotClasses[size].split(' ')[1]
                  )} />
                )}
                <span className={cn(
                  "relative z-10 font-bold tracking-widest transition-all duration-300",
                  textClasses[size],
                  !checked
                    ? "text-zinc-900 dark:text-white dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"
                    : "text-zinc-100 dark:text-zinc-500"
                )}>{labelOff}</span>
              </div>
            </div>

            {/* Second Half (ON) */}
            <div className="relative flex-1 w-full h-full">
              <motion.div
                className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700"
                animate={{ opacity: checked ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 bg-zinc-400 dark:bg-zinc-900"
                animate={{ opacity: checked ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* ON Text & Dot */}
              <div className="absolute inset-0 flex items-center justify-center gap-1" style={{ '--dot-color': '34, 197, 94' } as any}>
                {showDotIcon && (
                  <span className={cn(
                    "rounded-full transition-all duration-300",
                    checked ? "bg-green-500" : "bg-green-500/20 dark:bg-green-950/40",
                    checked ? dotClasses[size] : dotClasses[size].split(' ')[0] + " " + dotClasses[size].split(' ')[1]
                  )} />
                )}
                <span className={cn(
                  "relative z-10 font-bold tracking-widest transition-all duration-300",
                  textClasses[size],
                  checked
                    ? "text-zinc-900 dark:text-white dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"
                    : "text-zinc-100 dark:text-zinc-500"
                )}>{labelOn}</span>
              </div>
            </div>

            {/* The Sharp Physical Crease */}
            <div className={cn(
              "absolute bg-black/20 dark:bg-black/80",
              isHor ? "left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2" : "top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
            )} />
            <div className={cn(
              "absolute bg-white/50 dark:bg-white/10",
              isHor ? "left-1/2 top-0 bottom-0 w-[1px] translate-x-[1px]" : "top-1/2 left-0 right-0 h-[1px] translate-y-[1px]"
            )} />
          </div>

          {/* Subtle Outer Rim Highlight */}
          <div
            className="absolute inset-0 rounded-full border border-black/5 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] pointer-events-none"
            style={{ transform: "translateZ(1px)" }}
          />
        </motion.div>
      </div>
    </button>
  );
}
