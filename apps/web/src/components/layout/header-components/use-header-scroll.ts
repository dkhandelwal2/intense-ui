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

  // Update background styling / shadow state smoothly
  useEffect(() => {
    let lastScrolled = false;
    let timeoutId: NodeJS.Timeout | null = null;
    const unsub = scrollProgress.on("change", (latest) => {
      const shouldBeScrolled = latest > 0.25;
      if (shouldBeScrolled !== lastScrolled) {
        lastScrolled = shouldBeScrolled;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsScrolled(shouldBeScrolled);
        }, 0);
      }
    });
    return () => {
      unsub();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollProgress]);

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
