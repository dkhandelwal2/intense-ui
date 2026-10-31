"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LAYOUT_CUSTOM_EVENTS } from "@/components/layout/constants";
import {
  ComponentActiveTocContext,
  ComponentActiveTocProvider,
  useComponentActiveToc,
} from "@/context/active-toc-context";
import { getTargetScrollY } from "@/components/layout/toc-dock/toc-scroll-utils";
import type { TocItem } from "@/components/layout/toc-dock/types";

export {
  ComponentActiveTocContext,
  ComponentActiveTocProvider,
  useComponentActiveToc,
};

export interface UseComponentTocOptions {
  tocItems?: TocItem[];
  mounted: boolean;
}

export function useComponentToc({
  tocItems = [],
  mounted,
}: UseComponentTocOptions) {
  const [activeTocId, setActiveTocId] = useState<string | undefined>(
    tocItems[0]?.id
  );
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerCodeLoad = useCallback(() => {
    setIsCodeLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCodeLoading(false), 400);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      isProgrammaticScrollRef.current = true;
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }

      setActiveTocId(id);
      triggerCodeLoad();

      const itemIdx = tocItems.findIndex((item) => item.id === id);
      const targetY = getTargetScrollY(
        id,
        itemIdx >= 0 ? itemIdx : undefined,
        tocItems
      );

      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      // Safety timeout to clear programmatic flag if no scroll events occur
      scrollEndTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 1000);
    },
    [tocItems, triggerCodeLoad]
  );

  const scrollToSectionRef = useRef(scrollToSection);
  scrollToSectionRef.current = scrollToSection;

  useEffect(() => {
    if (!mounted || !tocItems || tocItems.length === 0) return;

    let rafId: number | null = null;

    const findActiveId = (): string | undefined => {
      if (typeof window === "undefined") return tocItems[0]?.id;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. If at or near top of the page, ALWAYS activate the first item
      if (scrollY <= 60) {
        return tocItems[0]?.id;
      }

      // 2. If scrolled significantly and near the bottom of the page, activate the last item
      if (scrollY > 200 && windowHeight + scrollY >= docHeight - 80) {
        return tocItems[tocItems.length - 1]?.id;
      }

      // 3. Focal reading line at 50% viewport height (center of the section)
      const focalLine = windowHeight * 0.5;
      let currentActive = tocItems[0]?.id;
      for (let i = 0; i < tocItems.length; i++) {
        const item = tocItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine) {
            currentActive = item.id;
          }
        }
      }

      return currentActive;
    };

    const updateActiveSection = () => {
      const nextId = findActiveId();
      if (nextId) {
        setActiveTocId((prev) => {
          if (prev === nextId) return prev;
          triggerCodeLoad();
          return nextId;
        });
      }
    };

    const handleScrollOrResize = () => {
      if (isProgrammaticScrollRef.current) {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          updateActiveSection();
        }, 120);
        return;
      }

      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
        rafId = null;
      });
    };

    const handleUserInterrupt = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchmove", handleUserInterrupt, { passive: true });

    updateActiveSection();

    const handleFocusToc = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        scrollToSectionRef.current(customEvent.detail.id);
      }
    };
    window.addEventListener(LAYOUT_CUSTOM_EVENTS.FOCUS_TOC, handleFocusToc);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
      window.removeEventListener(LAYOUT_CUSTOM_EVENTS.FOCUS_TOC, handleFocusToc);
    };
  }, [mounted, tocItems, triggerCodeLoad]);

  return {
    activeTocId,
    setActiveTocId,
    isCodeLoading,
    scrollToSection,
  };
}
