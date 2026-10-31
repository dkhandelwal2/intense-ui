"use client";

import * as React from "react";
import {
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  type MotionValue,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { SCREEN_BREAKPOINTS } from "@/components/layout/constants";
import { SIDEBAR_DIMENSIONS } from "@/components/layout/sidebar-components/constants";
import { useMediaQuery } from "./use-media-query";

interface UseSidebarCollapseOptions {
  manualOpen?: boolean;
}

interface UseSidebarCollapseReturn {
  effectiveProgress: MotionValue<number>;
  width: MotionValue<number>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useSidebarCollapse({
  manualOpen = true,
}: UseSidebarCollapseOptions = {}): UseSidebarCollapseReturn {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Responsive breakpoint (<1280px auto-collapses)
  const isSmallScreen = useMediaQuery(`(max-width: ${SCREEN_BREAKPOINTS.XL}px)`);

  const scrollDistance = siteConfig.sidebar.scrollDistance ?? 180;

  // 1:1 Scroll progress (0 = top/expanded, 1 = scrolled/collapsed)
  const scrollProgress = useTransform(scrollY, [0, scrollDistance], [0, 1], {
    clamp: true,
  });

  // Hover expansion progress (0 = not hovered, 1 = hovered/expanded)
  const hoverProgress = useMotionValue(0);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const activeAnimRef = React.useRef<{ stop: () => void } | null>(null);

  // Reset hover on route navigation
  React.useEffect(() => {
    activeAnimRef.current?.stop();
    hoverProgress.set(0);
  }, [pathname, hoverProgress]);

  // Clean up animations and timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      activeAnimRef.current?.stop();
    };
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    if (!siteConfig.sidebar.expandOnHover) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    activeAnimRef.current?.stop();
    activeAnimRef.current = animate(hoverProgress, 1, {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    });
  }, [hoverProgress]);

  const handleMouseLeave = React.useCallback(() => {
    if (!siteConfig.sidebar.expandOnHover) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Crisp 50ms micro-debounce prevents edge cursor jitter
    hoverTimeoutRef.current = setTimeout(() => {
      activeAnimRef.current?.stop();
      activeAnimRef.current = animate(hoverProgress, 0, {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      });
    }, 50);
  }, [hoverProgress]);

  // Check if current route is a component documentation page (/docs/components/*)
  const isComponentPage = Boolean(
    pathname && /^\/docs\/components\/.+/.test(pathname)
  );

  const canCollapseOnScroll =
    siteConfig.sidebar.collapseOnScroll &&
    (!siteConfig.sidebar.collapseOnlyOnComponentPages || isComponentPage);

  // Synchronous MotionValue for collapse eligibility across client route transitions
  const collapseEligibleMotion = useMotionValue(canCollapseOnScroll ? 1 : 0);

  React.useEffect(() => {
    collapseEligibleMotion.set(canCollapseOnScroll ? 1 : 0);
  }, [canCollapseOnScroll, collapseEligibleMotion]);

  // Calculate effective progress (0 = 250px expanded, 1 = 68px collapsed)
  const effectiveProgress = useTransform(
    [scrollProgress, hoverProgress, collapseEligibleMotion],
    ([s, h, c]) => {
      if (siteConfig.sidebar.enableManualToggle) {
        return manualOpen ? 0 : 1;
      }
      if (c === 0 && !isSmallScreen) {
        return 0;
      }
      const base = isSmallScreen ? 1 : (s as number) * (c as number);
      const hover = h as number;
      return Math.max(0, Math.min(1, base * (1 - hover)));
    }
  );

  // Direct 1:1 scroll-driven width
  const width = useTransform(
    effectiveProgress,
    [0, 1],
    [Number(SIDEBAR_DIMENSIONS.EXPANDED_WIDTH), Number(SIDEBAR_DIMENSIONS.COLLAPSED_WIDTH)]
  );

  return {
    effectiveProgress,
    width,
    handleMouseEnter,
    handleMouseLeave,
  };
}
