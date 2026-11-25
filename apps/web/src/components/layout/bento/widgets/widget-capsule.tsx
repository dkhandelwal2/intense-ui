"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CapsuleScreensaver } from "./capsule-screensaver";
import { CapsuleDefaultView } from "./capsule-default-view";
import { CapsuleIslandView } from "./capsule-island-view";
import { DynamicIslandNotch } from "./dynamic-island-notch";
import { useIdleScreensaver } from "./use-idle-screensaver";
import { DEFAULT_IDLE_TIMEOUT_MS } from "@/config/screensaver";
import { useLiveWeather } from "@/hooks/use-live-weather";
import { Skeleton } from "@/components/ui/skeleton";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export interface WidgetCapsuleProps {
  className?: string;
  variant?: "default" | "island";
  idleTimeoutMs?: number | null;
  enableIdleScreensaver?: boolean;
}

export const WidgetCapsule = React.memo(function WidgetCapsule({
  className,
  variant = "default",
  idleTimeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
  enableIdleScreensaver = true,
}: WidgetCapsuleProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date(0));
  const [showGreeting, setShowGreeting] = useState(true);
  const [isScreensaverOpen, setIsScreensaverOpen] = useState(false);

  const { weather, fetchLiveWeather } = useLiveWeather();

  useIdleScreensaver({
    enabled: enableIdleScreensaver,
    timeoutMs: idleTimeoutMs,
    onIdle: () => setIsScreensaverOpen(true),
    isScreensaverOpen,
  });

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const greetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(greetingTimer);
    };
  }, []);

  if (!mounted) {
    if (variant === "island") {
      return (
        <div
          className={cn(
            "w-[236px] h-9 rounded-b-xl bg-black/90 dark:bg-zinc-950/90 animate-pulse",
            className
          )}
        />
      );
    }
    return (
      <div
        className={cn(
          "h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3.5 pr-4 shadow-sm flex items-center justify-between overflow-hidden relative select-none",
          className
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex flex-col gap-1.5 min-w-0">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-2 w-14 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-2.5 w-8 rounded-full hidden sm:block" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
      </div>
    );
  }

  const fullDateStr = DATE_FORMATTER.format(currentTime);

  return (
    <>
      {variant === "island" ? (
        <DynamicIslandNotch
          onClick={() => setIsScreensaverOpen(true)}
          className={className}
        >
          <CapsuleIslandView
            currentTime={currentTime}
            weather={weather}
            onFetchWeather={fetchLiveWeather}
          />
        </DynamicIslandNotch>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsScreensaverOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsScreensaverOpen(true);
            }
          }}
          aria-label="Click to open fullscreen screensaver"
          title="Click to open fullscreen screensaver"
          className={cn(
            "h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3.5 shadow-sm flex items-center justify-between overflow-hidden relative select-none",
            "cursor-pointer hover:border-[var(--theme-primary)]/40 hover:shadow-md active:scale-[0.99] transition-all duration-200",
            className
          )}
        >
          <CapsuleDefaultView
            showGreeting={showGreeting}
            currentTime={currentTime}
            fullDateStr={fullDateStr}
            weather={weather}
            onFetchWeather={fetchLiveWeather}
          />
        </div>
      )}

      <CapsuleScreensaver
        isOpen={isScreensaverOpen}
        onClose={() => setIsScreensaverOpen(false)}
        currentTime={currentTime}
        weather={weather}
        onFetchWeather={fetchLiveWeather}
      />
    </>
  );
});
