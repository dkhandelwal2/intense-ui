"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLogoLoader } from "./animated-logo-loader";

interface AppLoaderProps {
  /**
   * Whether to enable the initial splash screen on first visit
   * @default false (disabled by default for instant LCP and optimal Web Vitals)
   */
  showSplash?: boolean;
  /**
   * Whether to enable automatic route transition loading indicator
   * @default true
   */
  showRouteLoader?: boolean;
}

export function AppLoader({
  showSplash: enableSplash = false,
  showRouteLoader = true,
}: AppLoaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);

  // Route Transition State
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Splash Screen on Website First Visit (Opt-in only)
  useEffect(() => {
    if (!enableSplash) return;

    try {
      const hasSeenSplash = sessionStorage.getItem("intense_splash_dismissed");
      if (!hasSeenSplash) {
        setShowSplash(true);

        const timer = setTimeout(() => {
          setShowSplash(false);
          sessionStorage.setItem("intense_splash_dismissed", "true");
        }, 1000);

        return () => clearTimeout(timer);
      }
    } catch {
      setShowSplash(false);
    }
  }, [enableSplash]);

  // 2. Intercept Internal Link Clicks for Route Change Loader
  useEffect(() => {
    if (!showRouteLoader) return;

    const handleLinkClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
        ) {
          setIsNavigating(true);
        }
      } catch {
        // invalid URL, ignore
      }
    };

    const handleCustomStart = () => setIsNavigating(true);
    const handleCustomStop = () => {
      setTimeout(() => setIsNavigating(false), 120);
    };

    document.addEventListener("click", handleLinkClick, true);
    window.addEventListener("intense:route-loading-start", handleCustomStart);
    window.addEventListener("intense:route-loading-stop", handleCustomStop);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener("intense:route-loading-start", handleCustomStart);
      window.removeEventListener("intense:route-loading-stop", handleCustomStop);
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
  }, [showRouteLoader]);

  // 3. Dismiss Route Loader When Route Finishes
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => setIsNavigating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Safety fallback: auto-clear navigation after 2.5 seconds
  useEffect(() => {
    if (isNavigating) {
      const fallback = setTimeout(() => setIsNavigating(false), 2500);
      return () => clearTimeout(fallback);
    }
  }, [isNavigating]);

  return (
    <>
      {/* 🚀 NON-BLOCKING TOP ROUTE PROGRESS BAR (Zero INP / LCP penalty) */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            key="route-progress-bar"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 0.82, opacity: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ transformOrigin: "0% 50%" }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[99999] bg-[var(--theme-primary)] pointer-events-none shadow-[0_0_10px_var(--theme-primary)]"
          />
        )}
      </AnimatePresence>

      {/* 🌟 CINEMATIC FULLSCREEN SPLASH SCREEN (Opt-in only) */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="intense-splash-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(12px)",
              pointerEvents: "none",
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-background/98 backdrop-blur-3xl w-screen h-screen overflow-hidden p-6 cursor-pointer"
            onClick={() => setShowSplash(false)}
            title="Click to skip"
          >
            <AnimatedLogoLoader size="fullscreen" message="Loading..." />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const PageLoader = AppLoader;

export function triggerRouteLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("intense:route-loading-start"));
  }
}

export function dismissRouteLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("intense:route-loading-stop"));
  }
}
