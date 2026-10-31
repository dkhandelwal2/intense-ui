"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getGreeting } from "./widget-helpers";
import { CapsuleClock } from "./capsule-clock";
import { CapsuleWeather } from "./capsule-weather";
import { useLiveWeather } from "@/hooks/use-live-weather";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

interface WidgetCapsuleProps {
  className?: string;
}

export const WidgetCapsule = React.memo(function WidgetCapsule({ className }: WidgetCapsuleProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showGreeting, setShowGreeting] = useState(true);

  const { weather, fetchLiveWeather } = useLiveWeather();

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
    return (
      <div
        className={cn(
          "h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 shadow-sm flex items-center justify-between overflow-hidden",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  const hours = currentTime.getHours();
  const fullDateStr = DATE_FORMATTER.format(currentTime);
  const greeting = getGreeting(currentTime);
  const GreetingIcon = greeting.icon;

  return (
    <div
      className={cn(
        "h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3.5 shadow-sm flex items-center justify-between overflow-hidden relative select-none",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {showGreeting ? (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-muted/80 border border-border flex items-center justify-center shrink-0 shadow-xs">
                <GreetingIcon className={cn("w-4 h-4 animate-pulse", greeting.color)} />
              </div>
              <div className="flex flex-col min-w-0 leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground tracking-tight truncate">
                    {greeting.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground truncate">
                  {fullDateStr}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="clock-weather"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-between gap-2"
          >
            {/* Clock & Date Sub-Component */}
            <CapsuleClock currentTime={currentTime} dateStr={fullDateStr} />

            {/* Weather & Location Sub-Component */}
            <div className="flex items-center gap-1.5 shrink-0 h-full">
              <CapsuleWeather
                weather={weather}
                hours={hours}
                onFetchWeather={fetchLiveWeather}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
