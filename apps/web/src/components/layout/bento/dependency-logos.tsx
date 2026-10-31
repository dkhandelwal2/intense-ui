import React from "react";
import { Sun, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getDependencyLogo,
  FramerMotionLogo,
  LucideLogo,
  TailwindMergeLogo,
  ClsxLogo,
  RadixLogo,
} from "@/components/docs";

export function renderDependencyLogo(name: string, isCompact: boolean = false) {
  const n = name.toLowerCase().trim();
  const iconSize = isCompact ? "w-2.5 h-2.5" : "w-3.5 h-3.5";

  if (n === "react" || n === "react-dom") {
    return (
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        className={cn(
          iconSize,
          "text-[#00d8ff] shrink-0 drop-shadow-[0_0_6px_rgba(0,216,255,0.4)]"
        )}
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (n === "typescript") {
    return (
      <span
        className={cn(
          "font-mono font-bold rounded bg-[#3178c6] text-white leading-none shrink-0 shadow-xs",
          isCompact ? "text-[7px] px-1 py-[0.5px]" : "text-[8.5px] px-1.5 py-0.5"
        )}
      >
        TS
      </span>
    );
  }

  if (n === "next") {
    return (
      <span
        className={cn(
          "font-mono font-bold rounded-md bg-black text-white dark:bg-white dark:text-black leading-none shrink-0 shadow-xs",
          isCompact ? "text-[7px] px-1 py-[0.5px]" : "text-[8.5px] px-1.5 py-0.5"
        )}
      >
        N
      </span>
    );
  }

  if (n === "next-themes") {
    return <Sun className={cn(iconSize, "text-amber-500 shrink-0")} />;
  }

  if (n === "framer-motion") {
    return (
      <FramerMotionLogo
        className={cn(
          isCompact ? "h-2 w-auto" : "h-2.5 w-auto",
          "text-pink-500 dark:text-pink-400 shrink-0 drop-shadow-[0_0_6px_rgba(244,63,94,0.3)]"
        )}
      />
    );
  }

  if (n === "lucide-react") {
    return <LucideLogo className={cn(iconSize, "shrink-0")} />;
  }

  if (n === "tailwind-merge" || n === "tailwindcss") {
    return (
      <TailwindMergeLogo
        className={cn(
          iconSize,
          "text-sky-400 shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]"
        )}
      />
    );
  }

  if (n === "clsx") {
    return <ClsxLogo className={cn(iconSize, "text-violet-500 shrink-0")} />;
  }

  if (n.includes("radix")) {
    return <RadixLogo className={cn(iconSize, "text-purple-400 shrink-0")} />;
  }

  if (n === "cmdk") {
    return <Command className={cn(iconSize, "text-zinc-400 shrink-0")} />;
  }

  return getDependencyLogo(name);
}
