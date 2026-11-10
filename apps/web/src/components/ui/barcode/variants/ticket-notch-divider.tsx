"use client";

import React from "react";

export function TicketNotchDivider() {
  return (
    <div className="relative flex items-center justify-between h-0 z-30">
      {/* Left Notch Border Arc */}
      <svg
        className="absolute -left-px -top-3.5 w-3.5 h-7 pointer-events-none"
        viewBox="0 0 14 28"
        fill="none"
      >
        <path
          d="M 0 0 A 14 14 0 0 1 0 28"
          stroke="currentColor"
          strokeWidth="1"
          className="text-zinc-200 dark:text-zinc-800"
        />
      </svg>

      {/* Dashed Tear Line */}
      <div className="flex-1 border-t border-dashed border-zinc-300 dark:border-zinc-800 mx-4" />

      {/* Right Notch Border Arc */}
      <svg
        className="absolute -right-px -top-3.5 w-3.5 h-7 pointer-events-none"
        viewBox="0 0 14 28"
        fill="none"
      >
        <path
          d="M 14 0 A 14 14 0 0 0 14 28"
          stroke="currentColor"
          strokeWidth="1"
          className="text-zinc-200 dark:text-zinc-800"
        />
      </svg>
    </div>
  );
}
