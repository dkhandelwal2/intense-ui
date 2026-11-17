"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { siteConfig } from "@/config/site";

export interface HeaderScrollTransforms {
  isScrolled: boolean;
  scrollProgress: MotionValue<number>;
  headerMaxWidth: MotionValue<number>;
  navOpacity: MotionValue<number>;
  navScale: MotionValue<number>;
  navX: MotionValue<number>;
  navPointerEvents: MotionValue<"none" | "auto">;
  desktopHamburgerWidth: MotionValue<number>;
  desktopHamburgerOpacity: MotionValue<number>;
  desktopHamburgerScale: MotionValue<number>;
  desktopHamburgerMarginLeft: MotionValue<number>;
  desktopHamburgerPointerEvents: MotionValue<"none" | "auto">;
}

/**
 * Custom hook managing 1:1 scroll-scrubbed transforms for the header dynamic island
 */
export function useHeaderScroll(): HeaderScrollTransforms {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollDistance = siteConfig.header.scrollDistance ?? 80;
  const scrollProgress = useTransform(scrollY, [0, scrollDistance], [0, 1], { clamp: true });

  // Update background styling / shadow state smoothly with zero layout thrashing
  useEffect(() => {
    let rafId: number | null = null;
    let isTicking = false;

    const checkScrollState = (target?: EventTarget | null) => {
      let shouldScroll = false;

      // 1. Check window.scrollY
      if (typeof window !== "undefined" && (window.scrollY || document.documentElement.scrollTop || 0) > 15) {
        shouldScroll = true;
      } else if (target && target !== window && target !== document && "scrollTop" in target) {
        // 2. Direct event target scrollTop (O(1), zero DOM queries)
        const el = target as HTMLElement;
        if (el.scrollTop > 15) {
          shouldScroll = true;
        }
      }

      setIsScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
      isTicking = false;
    };

    const handleScroll = (e: Event) => {
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(() => {
          checkScrollState(e.target);
        });
      }
    };

    // Passive scroll listener intercepts scroll events efficiently without blocking main thread
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    checkScrollState();

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scrubbed motion transforms for header dynamic island
  const headerMaxWidth = useTransform(scrollProgress, [0, 1], [1240, 820]);

  // Center navigation tabs scrub out as header contracts
  const navOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0], { clamp: true });
  const navScale = useTransform(scrollProgress, [0, 0.5], [1, 0.88], { clamp: true });
  const navX = useTransform(scrollProgress, [0, 0.5], [0, 16], { clamp: true });
  const navPointerEvents = useTransform(scrollProgress, (p) => (p > 0.4 ? ("none" as const) : ("auto" as const)));

  // Desktop hamburger button scrubs in smoothly as header reaches compact dynamic island
  const desktopHamburgerWidth = useTransform(scrollProgress, [0.2, 0.8], [0, 36], { clamp: true });
  const desktopHamburgerOpacity = useTransform(scrollProgress, [0.2, 0.8], [0, 1], { clamp: true });
  const desktopHamburgerScale = useTransform(scrollProgress, [0.2, 0.8], [0.6, 1], { clamp: true });
  const desktopHamburgerMarginLeft = useTransform(scrollProgress, [0.2, 0.8], [0, 4], { clamp: true });
  const desktopHamburgerPointerEvents = useTransform(scrollProgress, (p) => (p > 0.5 ? ("auto" as const) : ("none" as const)));

  return {
    isScrolled,
    scrollProgress,
    headerMaxWidth,
    navOpacity,
    navScale,
    navX,
    navPointerEvents,
    desktopHamburgerWidth,
    desktopHamburgerOpacity,
    desktopHamburgerScale,
    desktopHamburgerMarginLeft,
    desktopHamburgerPointerEvents,
  };
}
