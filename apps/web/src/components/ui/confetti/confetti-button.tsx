"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ConfettiButtonProps } from "./types";
import { confetti } from "./confetti";
import {
  fireBasic,
  fireRandomDirection,
  fireFireworks,
  fireSideCannons,
  fireStars,
  fireCustomShapes,
  fireEmoji,
} from "./variants";

export function ConfettiButton({
  options,
  variant = "basic",
  children,
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    if (options) {
      confetti({ ...options, origin: options.origin || origin });
    } else {
      switch (variant) {
        case "random-direction":
          fireRandomDirection(confetti, origin);
          break;
        case "fireworks":
          fireFireworks(confetti);
          break;
        case "side-cannons":
          fireSideCannons(confetti);
          break;
        case "stars":
          fireStars(confetti, origin);
          break;
        case "custom-shapes":
          fireCustomShapes(confetti, origin);
          break;
        case "emoji":
          fireEmoji(confetti, undefined, origin);
          break;
        case "basic":
        default:
          fireBasic(confetti, origin);
          break;
      }
    }

    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer select-none active:scale-95",
        "bg-zinc-900 text-zinc-100 border border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-500 shadow-md hover:shadow-lg dark:shadow-black/40",
        className
      )}
      {...props}
    >
      {children || "Trigger Confetti 🎉"}
    </button>
  );
}
