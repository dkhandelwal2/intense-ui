import React from "react";

export interface SharePlatform {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  url?: string;
  onClick?: () => void;
}

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"> {
  children?: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "subtle" | "text" | "ghost" | "3d" | "shimmer" | "ripple" | "filled-border" | "confirmation" | "confirm" | "delete" | "share";
  size?: "sm" | "md" | "lg" | "icon";
  color?: string;
  shareVariant?: "default" | "glow" | "neumorphic";
  platforms?: SharePlatform[];
  rounded?: boolean;
  loading?: boolean;
  onShare?: (platform: string) => void;
  confirmAction?: "delete" | "confirm" | "archive" | "discard";
  confirmType?: "pill" | "icon";
  onConfirm?: () => void;
}

export interface ConfirmationButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  action?: "delete" | "confirm" | "archive" | "discard";
  type?: "pill" | "icon";
  label?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  successLabel?: string;
  onConfirm?: () => void;
}

export interface ShareButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  shareVariant?: "default" | "glow" | "neumorphic";
  platforms?: SharePlatform[];
  onShare?: (platform: string) => void;
}
