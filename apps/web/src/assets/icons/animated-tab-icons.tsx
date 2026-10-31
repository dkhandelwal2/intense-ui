"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedIconProps {
  className?: string;
  size?: "sm" | "md";
  active?: boolean;
}

/**
 * Animated Terminal Icon:
 * Vibrant colored CLI prompt (Emerald Chevron '>' + Sunfire Amber Cursor '_')
 * Hardware-accelerated CSS animations offloaded entirely to the GPU compositor.
 */
export const AnimatedTerminalIcon = React.memo(function AnimatedTerminalIcon({
  className,
  size = "md",
  active = false,
}: AnimatedIconProps) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div
      className={cn(
        "flex items-center justify-center cursor-pointer select-none shrink-0 transition-transform hover:scale-110 active:scale-95",
        sizeClass,
        className
      )}
      title="CLI Installation"
      aria-label="CLI Installation"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "w-full h-full overflow-visible transition-all duration-300",
          active
            ? "drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            : "drop-shadow-[0_0_3px_rgba(16,185,129,0.25)]"
        )}
      >
        <style>{`
          @keyframes term-chevron { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, 0); } }
          @keyframes term-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
          .anim-term-chevron { animation: term-chevron 1.4s ease-in-out infinite; will-change: transform; }
          .anim-term-cursor { animation: term-cursor 0.8s ease-in-out infinite; will-change: opacity; }
        `}</style>
        <polyline points="4 17 10 11 4 5" stroke="#10B981" className="anim-term-chevron" />
        <line x1="12" x2="20" y1="19" y2="19" stroke="#F59E0B" className="anim-term-cursor" />
      </svg>
    </div>
  );
});

/**
 * Animated Code Icon:
 * Vibrant colored '</>' (Electric Sky '<' + Intense Hot Pink '/' + Radiant Violet '>')
 * Hardware-accelerated CSS animations offloaded entirely to the GPU compositor.
 */
export const AnimatedCodeIcon = React.memo(function AnimatedCodeIcon({
  className,
  size = "md",
  active = false,
}: AnimatedIconProps) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div
      className={cn(
        "flex items-center justify-center cursor-pointer select-none shrink-0 transition-transform hover:scale-110 active:scale-95",
        sizeClass,
        className
      )}
      title="Preview & Source Code"
      aria-label="Preview & Source Code"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "w-full h-full overflow-visible transition-all duration-300",
          active
            ? "drop-shadow-[0_0_8px_rgba(255,0,132,0.55)]"
            : "drop-shadow-[0_0_3px_rgba(255,0,132,0.25)]"
        )}
      >
        <style>{`
          @keyframes code-left { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-2px, 0); } }
          @keyframes code-right { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, 0); } }
          @keyframes code-slash { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-7deg); } }
          .anim-code-left { animation: code-left 1.6s ease-in-out infinite; will-change: transform; }
          .anim-code-right { animation: code-right 1.6s ease-in-out infinite; will-change: transform; }
          .anim-code-slash { animation: code-slash 1.6s ease-in-out infinite; transform-origin: 12px 12px; will-change: transform; }
        `}</style>
        <polyline points="7 8 2.5 12 7 16" stroke="#38BDF8" className="anim-code-left" />
        <line x1="14" y1="4.5" x2="10" y2="19.5" stroke="#FF0084" className="anim-code-slash" />
        <polyline points="17 8 21.5 12 17 16" stroke="#818CF8" className="anim-code-right" />
      </svg>
    </div>
  );
});
