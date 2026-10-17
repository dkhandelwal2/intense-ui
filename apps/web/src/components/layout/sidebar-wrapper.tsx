"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { DocsSidebar } from "./docs-sidebar";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function SidebarWrapper() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Manual toggle state (only used if siteConfig.sidebar.enableManualToggle is true)
  const [manualOpen, setManualOpen] = React.useState(true);

  // Responsive breakpoint (<1280px auto-collapses)
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  const COLLAPSED_WIDTH = 68;
  const EXPANDED_WIDTH = 250;
  const scrollDistance = siteConfig.sidebar.scrollDistance ?? 180;

  // 1:1 Scroll progress (0 = top/expanded, 1 = scrolled/collapsed)
  // Stops moving instantly when the user stops scrolling
  const scrollProgress = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, 1],
    { clamp: true }
  );

  // Hover expansion progress (0 = not hovered, 1 = hovered/expanded)
  const hoverProgress = useMotionValue(0);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const activeAnimRef = React.useRef<{ stop: () => void } | null>(null);

  // Close mobile drawer and reset hover on route navigation
  React.useEffect(() => {
    setIsMobileOpen(false);
    activeAnimRef.current?.stop();
    hoverProgress.set(0);
  }, [pathname, hoverProgress]);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isMobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileOpen]);

  // Auto-collapse on tablet / small desktop (<1280px)
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 1280px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsSmallScreen(e.matches);
    };

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Smooth hover expansion & collapse with seamless direction reversals
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

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      activeAnimRef.current?.stop();
    };
  }, []);

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

  // Calculate effective progress (0 = 250px expanded, 1 = 68px collapsed):
  // Directly tied to page scroll position; stops moving when scroll stops.
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
    [EXPANDED_WIDTH, COLLAPSED_WIDTH]
  );

  return (
    <>
      {/* ─── Mobile Floating Trigger Button ─── */}
      <button
        type="button"
        className="md:hidden fixed bottom-20 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950/90 text-white border border-white/15 shadow-2xl backdrop-blur-xl hover:bg-zinc-900 transition-all active:scale-95 cursor-pointer"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation drawer"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMobileOpen ? (
            <motion.span
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center"
            >
              <PanelLeftClose className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ─── Mobile Slide-Over Glass Modal with Smooth Enter & Exit ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex p-4 pt-20">
            {/* Fade Backdrop */}
            <motion.div
              key="mobile-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Card with Spring Physics */}
            <motion.div
              key="mobile-sidebar-panel"
              initial={{ x: -120, opacity: 0, scale: 0.94 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -120, opacity: 0, scale: 0.94 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 320,
                mass: 0.8,
              }}
              className="relative w-full max-w-[270px] h-[calc(100vh-6.5rem)] rounded-[32px] bg-background/95 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl shadow-2xl py-3.5 px-0 flex flex-col overflow-visible will-change-[transform,opacity]"
            >
              {/* Right-side gradient hairline separator */}
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--theme-primary)]/50 to-transparent pointer-events-none" />
              <DocsSidebar
                onClick={() => setIsMobileOpen(false)}
                isCollapsed={false}
              />
            </motion.div>

            {/* Click-outside backdrop space */}
            <div
              className="flex-1"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ─── Desktop Floating VisionOS Glass Sidebar Card (Scroll Scrubbed + Hover Expand) ─── */}
      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width }}
        className="sticky top-20 z-30 hidden md:flex flex-col h-[calc(100vh-6rem)] shrink-0 py-1 select-none will-change-[width]"
      >
        <div
          className={cn(
            "w-full h-full flex flex-col transition-colors duration-300",
            "bg-background/80 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl",
            "shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/60",
            "relative rounded-[32px] py-3.5 px-0 overflow-hidden"
          )}
        >
          {/* Right-side gradient hairline separator */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--theme-primary)]/50 to-transparent pointer-events-none" />

          <DocsSidebar
            progress={effectiveProgress}
            onToggleCollapse={
              siteConfig.sidebar.enableManualToggle
                ? () => setManualOpen((prev) => !prev)
                : undefined
            }
          />
        </div>
      </motion.aside>
    </>
  );
}
