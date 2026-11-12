"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SwitchProps } from "./types";
import { SWITCH_SIZE_CLASSES } from "./constants";
import {
  RockerView,
  PillView,
  CutoutView,
  CapsuleTextView,
  IndustrialView,
  SquareView,
  BinaryIoView,
} from "./variants";

export function Switch({
  checked,
  onChange,
  disabled,
  className,
  variant = "rocker",
  size = "md",
  sliderText = "on/off",
  showDotIcon = true,
  shadowColor = "var(--theme-primary)",
}: SwitchProps) {
  const sz = SWITCH_SIZE_CLASSES[variant][size];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none",
        sz,
        className
      )}
      style={variant === "rocker" ? { perspective: "9999px" } : undefined}
    >
      {variant === "rocker" && (
        <RockerView
          checked={checked}
          size={size}
          sliderText={sliderText}
          showDotIcon={showDotIcon}
          shadowColor={shadowColor}
        />
      )}
      {variant === "pill" && <PillView checked={checked} />}
      {variant === "cutout" && <CutoutView checked={checked} />}
      {variant === "capsule-text" && (
        <CapsuleTextView checked={checked} size={size} sliderText={sliderText} />
      )}
      {variant === "industrial" && <IndustrialView checked={checked} size={size} />}
      {variant === "square" && (
        <SquareView checked={checked} size={size} sliderText={sliderText} />
      )}
      {(variant === "binary-io" || variant === "binary") && (
        <BinaryIoView checked={checked} />
      )}
    </button>
  );
}

export * from "./types";
export * from "./constants";
export * from "./variants";
