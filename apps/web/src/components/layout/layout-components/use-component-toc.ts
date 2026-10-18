"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { TocItem } from "./types";

export const ComponentActiveTocContext = createContext<string | undefined>(undefined);

export function useComponentActiveToc() {
  return useContext(ComponentActiveTocContext);
}

export interface UseComponentTocOptions {
  tocItems?: TocItem[];
  mounted: boolean;
}

export function useComponentToc({ tocItems = [], mounted }: UseComponentTocOptions) {
  const [activeTocId, setActiveTocId] = useState<string | undefined>(tocItems[0]?.id);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerCodeLoad = useCallback(() => {
    setIsCodeLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCodeLoading(false), 400);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (activeTocId !== id) {
        setActiveTocId(id);
        triggerCodeLoad();
      }
    },
    [activeTocId, triggerCodeLoad]
  );

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

      // 3. Focal reading line at 45% viewport height
      // In a stacked layout (where earlier cards stick at top: 10vh),
      // the card currently in the foreground is the LAST card in document order
      // whose top has entered the viewing band (top <= focalLine).
      const focalLine = windowHeight * 0.45;
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
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    // Initial check on mount
    updateActiveSection();

    const handleFocusToc = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        setActiveTocId((prev) => {
          if (prev !== customEvent.detail.id) {
            triggerCodeLoad();
            return customEvent.detail.id;
          }
          return prev;
        });
      }
    };
    window.addEventListener("intense-ui:focus-toc", handleFocusToc);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("intense-ui:focus-toc", handleFocusToc);
    };
  }, [mounted, tocItems, triggerCodeLoad]);

  return {
    activeTocId,
    setActiveTocId,
    isCodeLoading,
    scrollToSection,
  };
}
