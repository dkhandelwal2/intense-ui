"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getGreeting } from "./weather-helpers";
import { CapsuleClock } from "./capsule-clock";
import { CapsuleWeather } from "./capsule-weather";
import { WeatherState } from "@/hooks/use-live-weather";

export interface CapsuleDefaultViewProps {
  showGreeting: boolean;
  currentTime: Date;
  fullDateStr: string;
  weather: WeatherState;
  onFetchWeather: () => void;
}

export const CapsuleDefaultView = React.memo(function CapsuleDefaultView({
  showGreeting,
  currentTime,
  fullDateStr,
  weather,
  onFetchWeather,
}: CapsuleDefaultViewProps) {
  const hours = currentTime.getHours();
  const greeting = getGreeting(currentTime);
  const GreetingIcon = greeting.icon;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showGreeting ? (
        <motion.div
          key="greeting"
          initial={false}
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
              <span
                suppressHydrationWarning
                className="text-[10px] font-mono text-muted-foreground truncate"
              >
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
          <CapsuleClock currentTime={currentTime} dateStr={fullDateStr} />
          <div className="flex items-center gap-1.5 shrink-0 h-full">
            <CapsuleWeather
              weather={weather}
              hours={hours}
              onFetchWeather={onFetchWeather}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
