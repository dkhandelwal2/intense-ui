import React from "react";

export type StepCarouselAnimation = "slide" | "zoom" | "flip" | "stagger";

export interface StepCarouselProps {
  totalSteps?: number;
  currentStep?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  items?: React.ReactNode[];
  animation?: StepCarouselAnimation;
  isPlaying?: boolean;
  defaultPlaying?: boolean;
  onPlayToggle?: (isPlaying: boolean) => void;
  duration?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "primary";
  className?: string;
  showPlayButton?: boolean;
  gooey?: boolean;
  maxVisibleSteps?: number;
}

export interface StepCarouselButtonProps {
  isPlaying: boolean;
  isCompleted?: boolean;
  onToggle: () => void;
  className?: string;
  iconClass?: string;
  gooey?: boolean;
  onHoverChange?: (hovered: boolean, pressed: boolean) => void;
}
