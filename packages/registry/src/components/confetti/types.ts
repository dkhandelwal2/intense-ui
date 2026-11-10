import React from "react";

export type ConfettiShape = "square" | "circle" | "star" | "heart" | string;

export interface ConfettiOrigin {
  x?: number;
  y?: number;
}

export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: ConfettiOrigin;
  colors?: string[];
  shapes?: ConfettiShape[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

export interface ConfettiRef {
  fire: (options?: ConfettiOptions) => void;
  reset: () => void;
}

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: ConfettiOptions;
  globalOptions?: { resize?: boolean; useWorker?: boolean };
  manualstart?: boolean;
  children?: React.ReactNode;
}

export type ConfettiVariant =
  | "basic"
  | "random-direction"
  | "fireworks"
  | "side-cannons"
  | "stars"
  | "custom-shapes"
  | "emoji";

export interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options?: ConfettiOptions;
  variant?: ConfettiVariant;
  children?: React.ReactNode;
}
