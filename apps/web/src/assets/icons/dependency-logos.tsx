import React from "react";
import { Boxes, Sun, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export function FramerMotionLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 25.364 9"
      fill="currentColor"
      className={cn("h-2.5 w-auto shrink-0 text-zinc-900 dark:text-white", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M 9.587 0 L 4.57 9 L 0 9 L 3.917 1.972 C 4.524 0.883 6.039 0 7.301 0 Z M 20.794 2.25 C 20.794 1.007 21.817 0 23.079 0 C 24.341 0 25.364 1.007 25.364 2.25 C 25.364 3.493 24.341 4.5 23.079 4.5 C 21.817 4.5 20.794 3.493 20.794 2.25 Z M 10.443 0 L 15.013 0 L 9.997 9 L 5.427 9 Z M 15.841 0 L 20.411 0 L 16.494 7.028 C 15.887 8.117 14.372 9 13.11 9 L 10.825 9 Z" />
    </svg>
  );
}

export function LucideLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-3.5 h-3.5 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557"
        className="stroke-zinc-800 dark:stroke-white"
      />
      <path
        d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21"
        stroke="#F56565"
      />
    </svg>
  );
}

export function TailwindMergeLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-3.5 h-3.5 text-sky-400 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function ClsxLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-3.5 h-3.5 text-indigo-400 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

export function RadixLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-3.5 h-3.5 text-amber-400 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    </svg>
  );
}

export function getDependencyLogo(name: string): React.ReactNode {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes("framer-motion") || normalized.includes("motion") || normalized === "framer") {
    return <FramerMotionLogo />;
  }

  if (normalized.includes("lucide")) {
    return <LucideLogo />;
  }

  if (normalized.includes("tailwind")) {
    return <TailwindMergeLogo />;
  }

  if (normalized === "clsx") {
    return <ClsxLogo />;
  }

  if (normalized.includes("radix")) {
    return <RadixLogo />;
  }

  return <Boxes className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
}

export function renderDependencyLogo(name: string, isCompact = false): React.ReactNode {
  const n = name.toLowerCase().trim();
  const iconSize = isCompact ? "w-2.5 h-2.5" : "w-3.5 h-3.5";

  if (n === "react" || n === "react-dom") {
    return (
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        className={cn(iconSize, "text-[#00d8ff] shrink-0 drop-shadow-[0_0_6px_rgba(0,216,255,0.4)]")}
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
        className={cn(iconSize, "text-sky-400 shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]")}
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
