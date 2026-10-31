"use client";

import React from "react";
import { AnalogClockMini } from "@/components/ui/analog-clock";

interface CapsuleClockProps {
  currentTime: Date;
  dateStr: string;
}

export const CapsuleClock = React.memo(function CapsuleClock({
  currentTime,
  dateStr,
}: CapsuleClockProps) {
  const hours = currentTime.getHours();
  const rawHours12 = hours % 12 || 12;
  const hoursStr = String(rawHours12).padStart(2, "0");
  const minutesStr = String(currentTime.getMinutes()).padStart(2, "0");
  const secondsStr = String(currentTime.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div title="System Clock">
        <AnalogClockMini date={currentTime} />
      </div>

      <div className="flex flex-col min-w-0 leading-tight">
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-foreground tracking-tight">
          <span>
            {hoursStr}:{minutesStr}
          </span>
          <span className="text-[10px] text-muted-foreground font-normal">
            :{secondsStr}
          </span>
          <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 ml-0.5">
            {ampm}
          </span>
        </div>
        <span className="text-[9.5px] font-mono text-muted-foreground truncate">
          {dateStr}
        </span>
      </div>
    </div>
  );
});
