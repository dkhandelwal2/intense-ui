"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_TRANSITION_VARIANT,
  TransitionVariant,
  isViewTransitionSupported,
  calculateTransitionOrigin,
  getThemeTransitionClipPaths,
  getVariantEasing,
  setupViewTransitionRoot,
  cleanupViewTransitionRoot,
} from "@/lib/animated-theme-toggler-utils";

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  variant?: TransitionVariant;
  /** When true, the transition expands from the viewport center instead of the button center */
  fromCenter?: boolean;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function AnimatedThemeToggler({
  className,
  duration = DEFAULT_TRANSITION_DURATION,
  variant = DEFAULT_TRANSITION_VARIANT,
  fromCenter = false,
  theme: controlledTheme,
  onThemeChange,
  children,
  onClick,
  ...props
}: AnimatedThemeTogglerProps) {
  const nextThemes = useTheme();
  const isControlled = controlledTheme !== undefined;

  const [internalTheme, setInternalTheme] = useState<"light" | "dark">("dark");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  // Sync theme state when next-themes is not active
  useEffect(() => {
    if (isControlled) return;
    const isDark = document.documentElement.classList.contains("dark");
    setInternalTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark");
      setInternalTheme(currentDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [isControlled]);

  const activeTheme = isControlled
    ? controlledTheme
    : nextThemes?.resolvedTheme
      ? (nextThemes.resolvedTheme as "light" | "dark")
      : internalTheme;

  const cancelActiveAnimation = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelActiveAnimation();
      cleanupViewTransitionRoot();
    };
  }, [cancelActiveAnimation]);

  const toggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      const button = buttonRef.current;
      if (
        !button ||
        isTransitioningRef.current ||
        document.documentElement.dataset.themeVt === "active"
      ) {
        return;
      }

      const newTheme: "light" | "dark" = activeTheme === "dark" ? "light" : "dark";
      const resolvedShape: TransitionVariant = variant ?? DEFAULT_TRANSITION_VARIANT;

      const applyTheme = () => {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        if (isControlled) {
          onThemeChange?.(newTheme);
        } else if (nextThemes?.setTheme) {
          nextThemes.setTheme(newTheme);
        } else {
          setInternalTheme(newTheme);
          localStorage.setItem("theme", newTheme);
        }
      };

      // Fallback for browsers without View Transitions or when reduced motion is preferred
      if (!isViewTransitionSupported()) {
        applyTheme();
        return;
      }

      const { x, y, maxRadius, viewportWidth, viewportHeight } =
        calculateTransitionOrigin(button, fromCenter);

      const clipPath = getThemeTransitionClipPaths(
        resolvedShape,
        x,
        y,
        maxRadius,
        viewportWidth,
        viewportHeight
      );

      setupViewTransitionRoot(duration, clipPath[0]);

      const cleanup = () => {
        isTransitioningRef.current = false;
        cleanupViewTransitionRoot();
        cancelActiveAnimation();
      };

      isTransitioningRef.current = true;

      const doc = document as Document & {
        startViewTransition: (callback: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      };

      const transition = doc.startViewTransition(() => {
        flushSync(applyTheme);
      });

      if (typeof transition?.finished?.finally === "function") {
        transition.finished.finally(cleanup).catch(() => {});
      } else {
        cleanup();
      }

      const ready = transition?.ready;
      if (ready && typeof ready.then === "function") {
        ready
          .then(() => {
            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration,
                easing: getVariantEasing(resolvedShape),
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            activeAnimRef.current = anim;
          })
          .catch(() => {});
      }
    },
    [
      activeTheme,
      cancelActiveAnimation,
      duration,
      fromCenter,
      isControlled,
      nextThemes,
      onClick,
      onThemeChange,
      variant,
    ]
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white h-9 py-2 w-9 relative",
        className
      )}
      {...props}
    >
      {children || (
        <>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-700 dark:text-zinc-300" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-700 dark:text-zinc-300" />
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export * from "@/lib/animated-theme-toggler-utils";
