"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TocItem } from "./types";

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
            triggerCodeLoad();
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, tocItems, triggerCodeLoad]);

  return {
    activeTocId,
    setActiveTocId,
    isCodeLoading,
    scrollToSection,
  };
}
