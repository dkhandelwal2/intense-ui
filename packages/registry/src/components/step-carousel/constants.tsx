import React from "react";

export const STEP_CAROUSEL_ANIMATIONS = {
  slide: {
    initial: (d: number = 1) => ({ opacity: 0, x: (d ?? 1) >= 0 ? 32 : -32, filter: "blur(4px)" }),
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number = 1) => ({ opacity: 0, x: (d ?? 1) >= 0 ? -32 : 32, filter: "blur(4px)" }),
  },
  zoom: {
    initial: () => ({ opacity: 0, scale: 0.88, filter: "blur(4px)" }),
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: () => ({ opacity: 0, scale: 1.08, filter: "blur(4px)" }),
  },
  flip: {
    initial: (d: number = 1) => ({ opacity: 0, rotateX: (d ?? 1) >= 0 ? 25 : -25, y: 12 }),
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: (d: number = 1) => ({ opacity: 0, rotateX: (d ?? 1) >= 0 ? -25 : 25, y: -12 }),
  },
  stagger: {
    initial: () => ({ opacity: 0, y: 14 }),
    animate: { opacity: 1, y: 0 },
    exit: () => ({ opacity: 0, y: -14 }),
  },
} as const;

export const STEP_CAROUSEL_SIZES = {
  sm: {
    container: "h-11 sm:h-12 px-3.5 gap-1",
    dotWidth: 8,
    dotHeight: 8,
    activeWidth: 38,
    button: "w-11 h-11 sm:w-12 sm:h-12",
    icon: "w-3.5 h-3.5",
  },
  md: {
    container: "h-11 sm:h-12 px-4 gap-1.5",
    dotWidth: 9,
    dotHeight: 9,
    activeWidth: 46,
    button: "w-11 h-11 sm:w-12 sm:h-12",
    icon: "w-4 h-4",
  },
  lg: {
    container: "h-12 sm:h-14 px-5 gap-2",
    dotWidth: 10,
    dotHeight: 10,
    activeWidth: 56,
    button: "w-12 h-12 sm:w-14 sm:h-14",
    icon: "w-4.5 h-4.5",
  },
} as const;

export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.8,
} as const;

export function GooeyFilter({ id }: { id: string }) {
  return (
    <svg className="absolute pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
        </filter>
      </defs>
    </svg>
  );
}
