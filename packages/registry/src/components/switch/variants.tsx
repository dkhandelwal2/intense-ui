"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SwitchSize, SwitchSliderText } from "./types";

export function RockerView({
  checked,
  size,
  sliderText,
  showDotIcon,
  shadowColor,
}: {
  checked: boolean;
  size: SwitchSize;
  sliderText: SwitchSliderText;
  showDotIcon?: boolean;
  shadowColor?: string;
}) {
  const rockY = checked ? 15 : -15;
  const textCls = { sm: "text-[7px]", md: "text-[9px]", lg: "text-[11px]" }[size];
  const lOff = sliderText === "true/false" ? "FALSE" : sliderText === "yes/no" ? "NO" : "OFF";
  const lOn = sliderText === "true/false" ? "TRUE" : sliderText === "yes/no" ? "YES" : "ON";

  return (
    <div className="w-full h-full" style={{ transformStyle: "preserve-3d" }}>
      <motion.div
        className="w-full h-full rounded-full absolute inset-0 shadow-md"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: rockY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: shadowColor, transform: "translateZ(-8px)" }} />
        <div className="absolute inset-0 rounded-full overflow-hidden flex flex-row" style={{ transform: "translateZ(1px)" }}>
          <div className="relative flex-1 w-full h-full flex items-center justify-center gap-1">
            <div className={cn("absolute inset-0 transition-opacity", !checked ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-400 dark:bg-zinc-900")} />
            {showDotIcon && <span className={cn("w-1.5 h-1.5 rounded-full z-10", !checked ? "bg-red-500 shadow-[0_0_6px_#ef4444]" : "bg-red-500/20")} />}
            <span className={cn("relative z-10 font-bold tracking-wider", textCls, !checked ? "text-zinc-900 dark:text-white" : "text-zinc-500")}>{lOff}</span>
          </div>
          <div className="relative flex-1 w-full h-full flex items-center justify-center gap-1">
            <div className={cn("absolute inset-0 transition-opacity", checked ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-400 dark:bg-zinc-900")} />
            {showDotIcon && <span className={cn("w-1.5 h-1.5 rounded-full z-10", checked ? "bg-green-500 shadow-[0_0_6px_#22c55e]" : "bg-green-500/20")} />}
            <span className={cn("relative z-10 font-bold tracking-wider", textCls, checked ? "text-zinc-900 dark:text-white" : "text-zinc-500")}>{lOn}</span>
          </div>
          <div className="absolute bg-black/30 left-1/2 top-0 bottom-0 w-px" />
        </div>
      </motion.div>
    </div>
  );
}

export function PillView({ checked }: { checked: boolean }) {
  return (
    <div className={cn("w-full h-full rounded-full transition-colors flex items-center p-0.5", checked ? "justify-end bg-[var(--theme-primary)]" : "justify-start bg-zinc-300 dark:bg-zinc-700")}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="h-full aspect-square rounded-full bg-white shadow-md shrink-0"
      />
    </div>
  );
}

export function CutoutView({ checked }: { checked: boolean }) {
  return (
    <div className={cn("w-full h-full rounded-full bg-zinc-900 border border-zinc-700 flex items-center p-0.5 shadow-inner", checked ? "justify-end" : "justify-start")}>
      <motion.div
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        animate={{
          borderColor: checked ? "#f97316" : "rgba(113, 113, 122, 0.5)",
          backgroundColor: checked ? "rgba(0, 0, 0, 0)" : "rgba(39, 39, 42, 0.4)",
          boxShadow: checked ? "0 0 10px rgba(249, 115, 22, 0.7)" : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        className="h-full aspect-square rounded-full border-[3px] shrink-0"
      />
    </div>
  );
}

export function CapsuleTextView({
  checked,
  size,
  sliderText,
}: {
  checked: boolean;
  size: SwitchSize;
  sliderText: SwitchSliderText;
}) {
  const lOff = sliderText === "true/false" ? "FALSE" : sliderText === "yes/no" ? "NO" : "OFF";
  const lOn = sliderText === "true/false" ? "TRUE" : sliderText === "yes/no" ? "YES" : "ON";
  const txt = { sm: "text-[7px]", md: "text-[8px]", lg: "text-[9px]" }[size];
  return (
    <div className={cn("w-full h-full rounded-full border-2 border-zinc-900 dark:border-white p-0.5 flex items-center relative bg-background overflow-hidden", checked ? "justify-end" : "justify-start")}>
      <span className={cn("absolute left-2 font-bold tracking-wider pointer-events-none transition-opacity", txt, checked ? "opacity-100 text-foreground" : "opacity-0")}>{lOn}</span>
      <span className={cn("absolute right-2 font-bold tracking-wider pointer-events-none transition-opacity", txt, !checked ? "opacity-100 text-foreground" : "opacity-0")}>{lOff}</span>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="h-full aspect-square rounded-full border-2 border-zinc-900 dark:border-white bg-background shrink-0 z-10 shadow-xs"
      />
    </div>
  );
}

export function IndustrialView({ checked, size }: { checked: boolean; size: SwitchSize }) {
  const hCls = { sm: "h-5", md: "h-6", lg: "h-7" }[size];
  return (
    <div className="w-full h-full rounded-lg bg-zinc-900 border-2 border-zinc-700 p-1 flex flex-col items-center justify-between shadow-inner">
      <span className={cn("text-[9px] font-mono font-bold leading-none select-none transition-colors", checked ? "text-green-400 drop-shadow-[0_0_4px_#4ade80]" : "text-zinc-600")}>|</span>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={cn("w-full rounded bg-zinc-700 border border-zinc-500 shadow-md", hCls)}
        style={{ transform: checked ? "perspective(100px) rotateX(15deg)" : "perspective(100px) rotateX(-15deg)" }}
      />
      <span className={cn("text-[9px] font-mono font-bold leading-none select-none transition-colors", !checked ? "text-red-400 drop-shadow-[0_0_4px_#f87171]" : "text-zinc-600")}>○</span>
    </div>
  );
}

export function SquareView({
  checked,
  size,
  sliderText,
}: {
  checked: boolean;
  size: SwitchSize;
  sliderText: SwitchSliderText;
}) {
  const lOff = sliderText === "yes/no" ? "NO" : "OFF";
  const lOn = sliderText === "yes/no" ? "YES" : "ON";
  const txt = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" }[size];
  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      className={cn(
        "w-full h-full rounded-lg border-2 border-black dark:border-white flex items-center justify-center font-black tracking-widest shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] transition-colors",
        txt,
        checked ? "bg-orange-500 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
      )}
    >
      {checked ? lOn : lOff}
    </motion.div>
  );
}

export function BinaryIoView({ checked }: { checked: boolean }) {
  return (
    <div className={cn("w-full h-full rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center p-0.5 shadow-inner", checked ? "justify-end" : "justify-start")}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="h-full aspect-square flex items-center justify-center shrink-0"
      >
        <motion.div
          initial={false}
          animate={{
            width: checked ? "40%" : "100%",
            backgroundColor: checked ? "#22c55e" : "rgba(0, 0, 0, 0)",
            borderColor: checked ? "#22c55e" : "#ef4444",
            boxShadow: checked ? "0 0 10px rgba(34, 197, 94, 0.8)" : "0 0 8px rgba(239, 68, 68, 0.7)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="h-full rounded-full border-[3px]"
        />
      </motion.div>
    </div>
  );
}
