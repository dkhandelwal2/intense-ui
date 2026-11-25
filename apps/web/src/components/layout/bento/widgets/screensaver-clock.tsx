"use client";

import React from "react";

interface ScreensaverClockProps {
  hoursStr: string;
  minutesStr: string;
  secondsStr: string;
  ampm: string;
}

export function ScreensaverClock({
  hoursStr,
  minutesStr,
  secondsStr,
  ampm,
}: ScreensaverClockProps) {
  return (
    <div className="flex items-baseline justify-center gap-2 sm:gap-4 font-mono font-black tracking-tighter text-zinc-900 dark:text-white">
      <span className="text-7xl sm:text-9xl md:text-[12rem] xl:text-[14rem] leading-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_15px_45px_rgba(0,0,0,0.9)]">
        {hoursStr}:{minutesStr}
      </span>
      <div className="flex flex-col items-start gap-1 pb-3 sm:pb-6 md:pb-8">
        <span className="text-2xl sm:text-4xl md:text-6xl text-zinc-400 font-bold">
          :{secondsStr}
        </span>
        <span className="px-2.5 py-0.5 rounded-md bg-[var(--theme-primary)]/15 dark:bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/30 dark:border-[var(--theme-primary)]/40 text-xs sm:text-sm font-sans font-extrabold text-[var(--theme-primary)] tracking-wider">
          {ampm}
        </span>
      </div>
    </div>
  );
}
