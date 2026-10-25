"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLogoLoader } from "./animated-logo-loader";

interface AppLoaderProps {
  /**
   * Whether to enable the initial splash screen on first visit
   * @default true
   */
  showSplash?: boolean;
  /**
   * Whether to enable automatic route transition loading indicator
   * @default true
   */
  showRouteLoader?: boolean;
}

export function AppLoader({
  showSplash: enableSplash = true,
  showRouteLoader = true,
}: AppLoaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);

  // Route Transition State
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Splash Screen on Website First Visit
  useEffect(() => {
    if (!enableSplash) return;

    try {
      const hasSeenSplash = sessionStorage.getItem("intense_splash_dismissed");
      if (!hasSeenSplash) {
        setShowSplash(true);

        const timer = setTimeout(() => {
          setShowSplash(false);
          sessionStorage.setItem("intense_splash_dismissed", "true");
        }, 1200);

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

    const handleCustomStart = () => {
      setIsNavigating(true);
    };

    const handleCustomStop = () => {
      setTimeout(() => {
        setIsNavigating(false);
      }, 150);
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
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Safety fallback: auto-clear navigation after 3.5 seconds
  useEffect(() => {
    if (isNavigating) {
      const fallback = setTimeout(() => {
        setIsNavigating(false);
      }, 3500);
      return () => clearTimeout(fallback);
    }
  }, [isNavigating]);

  return (
    <>
      {/* 🚀 ROUTE CHANGE FLOATING LOGO LOADER MODAL */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            key="route-change-loader"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md pointer-events-auto"
          >
            <div className="relative p-7 sm:p-9 rounded-3xl bg-background/85 dark:bg-[#0c0c0e]/85 border border-border/40 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
              <AnimatedLogoLoader size="md" message="NAVIGATING..." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 CINEMATIC FULLSCREEN SPLASH SCREEN */}
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
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
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

// Convenient alias for developers
export const PageLoader = AppLoader;

/**
 * Programmatic helper to trigger route loader from code
 */
export function triggerRouteLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("intense:route-loading-start"));
  }
}

/**
 * Programmatic helper to dismiss route loader from code
 */
export function dismissRouteLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("intense:route-loading-stop"));
  }
}
