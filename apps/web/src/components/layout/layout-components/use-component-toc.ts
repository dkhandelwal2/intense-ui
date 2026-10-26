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

function getTargetScrollY(
  id: string,
  index?: number,
  tocItems?: TocItem[]
): number {
  if (typeof window === "undefined") return 0;

  // 1. If target is the first card, always scroll smoothly to the very top (scrollY = 0)
  if (index === 0 || (tocItems && tocItems.length > 0 && id === tocItems[0].id)) {
    return 0;
  }

  const windowHeight = window.innerHeight;
  const sectionEl = document.getElementById(id);
  const cardHeight = sectionEl?.offsetHeight || 440;

  // Header height (~72px) and bottom dock height (~90px including floating margin)
  const headerOffset = 72;
  const dockOffset = 90;

  // Available height between the header and the bottom dock
  const availableHeight = Math.max(0, windowHeight - headerOffset - dockOffset);

  // Position the card so its vertical center sits at the center of the available section
  // Ensure top is at least headerOffset + 16px to prevent clipping behind the header
  const targetCardTop =
    headerOffset + Math.max(16, Math.round((availableHeight - cardHeight) / 2));

  // Determine the static document top of the target card in normal flow
  // We use the static, non-sticky anchor element rendered right above the card
  let cardDocTop = 0;

  const anchor = document.getElementById(`anchor-${id}`);
  if (anchor) {
    const anchorRect = anchor.getBoundingClientRect();
    // Anchor is in static flow; adding windowHeight * 0.08 accounts for my-[8vh] margin-top
    cardDocTop = anchorRect.top + window.scrollY + windowHeight * 0.08;
  }

  // Fallback if anchor is missing
  if (cardDocTop <= 0 && sectionEl) {
    cardDocTop = sectionEl.getBoundingClientRect().top + window.scrollY;
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - windowHeight);
  const desiredScrollY = cardDocTop - targetCardTop;

  return Math.min(maxScroll, Math.max(0, Math.round(desiredScrollY)));
}

export function useComponentToc({ tocItems = [], mounted }: UseComponentTocOptions) {
  const [activeTocId, setActiveTocId] = useState<string | undefined>(tocItems[0]?.id);
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
      const targetY = getTargetScrollY(id, itemIdx >= 0 ? itemIdx : undefined, tocItems);

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
      // In a stacked layout, the card currently in the foreground is the LAST card
      // in document order whose top has entered the viewing band (top <= focalLine).
      const focalLine = windowHeight * 0.50;
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

    // Initial check on mount
    updateActiveSection();

    const handleFocusToc = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        scrollToSectionRef.current(customEvent.detail.id);
      }
    };
    window.addEventListener("intense-ui:focus-toc", handleFocusToc);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
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
