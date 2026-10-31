import React from "react";

export function AnalogClockMini({ date }: { date: Date }) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30;

  return (
    <div className="relative w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-inner flex items-center justify-center shrink-0">
      <span className="absolute top-0.5 w-[1.5px] h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute bottom-0.5 w-[1.5px] h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute left-0.5 w-1 h-[1.5px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute right-0.5 w-1 h-[1.5px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />

      <div
        className="absolute w-[1.5px] h-2 rounded-full bg-zinc-800 dark:bg-zinc-200 origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${hourDeg}deg)`,
        }}
      />
      <div
        className="absolute w-[1px] h-2.5 rounded-full bg-zinc-700 dark:bg-zinc-300 origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${minuteDeg}deg)`,
        }}
      />
      <div
        className="absolute w-[1px] h-3 rounded-full bg-[var(--theme-primary)] origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${secondDeg}deg)`,
        }}
      />
      <div className="relative w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 z-10 border border-white dark:border-zinc-900" />
    </div>
  );
}
