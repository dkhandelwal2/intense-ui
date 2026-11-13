"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { WORLD_MAP_PATH } from "./world-map-path";

export interface DottedGlobeProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function DottedGlobe({ className, ...props }: DottedGlobeProps) {
  return (
    <svg
      viewBox="0 70 1024 530"
      className={cn("w-full h-auto text-zinc-900/30 dark:text-zinc-100/40 transition-colors", className)}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d={WORLD_MAP_PATH} />
    </svg>
  );
}
