"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeatherState } from "@/hooks/use-live-weather";
import { getWeatherIcon } from "./weather-helpers";
import { ScreensaverOrbs } from "./screensaver-orbs";
import { ScreensaverHeader } from "./screensaver-header";
import { ScreensaverClock } from "./screensaver-clock";
import {
  WEEKDAY_FORMATTER,
  FULL_DATE_FORMATTER,
  getDayOfYear,
  getWeekNumber,
} from "./screensaver-helpers";

export interface CapsuleScreensaverProps {
  isOpen: boolean;
  onClose: () => void;
  currentTime: Date;
  weather: WeatherState;
  onFetchWeather: () => void;
}

export function CapsuleScreensaver({
  isOpen,
  onClose,
  currentTime,
  weather,
  onFetchWeather,
}: CapsuleScreensaverProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  const hours = currentTime.getHours();
  const rawHours12 = hours % 12 || 12;
  const hoursStr = String(rawHours12).padStart(2, "0");
  const minutesStr = String(currentTime.getMinutes()).padStart(2, "0");
  const secondsStr = String(currentTime.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const weekdayStr = WEEKDAY_FORMATTER.format(currentTime);
  const fullDateStr = FULL_DATE_FORMATTER.format(currentTime);
  const dayOfYear = getDayOfYear(currentTime);
  const weekNum = getWeekNumber(currentTime);

  const isDay = hours >= 6 && hours < 19;
  const WeatherIcon = getWeatherIcon(weather.code, isDay);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Screensaver clock and weather"
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white backdrop-blur-3xl select-none cursor-pointer overflow-hidden"
        >
          <ScreensaverOrbs />
          <ScreensaverHeader onClose={onClose} />

          {/* Center Main Stage */}
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-9 my-auto text-center z-10 max-w-4xl mx-auto w-full">
            {/* Massive Digital Timer Clock */}
            <ScreensaverClock
              hoursStr={hoursStr}
              minutesStr={minutesStr}
              secondsStr={secondsStr}
              ampm={ampm}
            />

            {/* Day Details + Weather Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 backdrop-blur-md shadow-lg dark:shadow-xl text-sm sm:text-base">
                <span className="font-bold text-zinc-900 dark:text-white tracking-tight">{weekdayStr}</span>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-zinc-600 dark:text-zinc-300 font-medium">{fullDateStr}</span>
                <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-xs font-mono text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                  Day {dayOfYear} / 365
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-xs font-mono text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                  Wk {weekNum}
                </span>
              </div>

              <div
                onClick={(e) => {
                  if (weather.status !== "success") {
                    e.stopPropagation();
                    onFetchWeather();
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 backdrop-blur-md shadow-lg dark:shadow-xl transition-colors",
                  weather.status !== "success" && "hover:bg-zinc-100 dark:hover:bg-zinc-800/90 cursor-pointer"
                )}
                title={weather.status !== "success" ? "Click to fetch live weather" : undefined}
              >
                <div className="size-8 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-500 dark:text-sky-400 shrink-0">
                  <WeatherIcon className="size-4.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-white">
                    {weather.temp !== null ? `${weather.temp}°C` : "--°C"}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                    {weather.condition || "Weather"}
                  </span>
                </div>
                <div className="flex items-center gap-1 pl-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono border-l border-zinc-200 dark:border-zinc-800">
                  <MapPin className="size-3 text-[var(--theme-primary)] shrink-0" />
                  <span className="truncate max-w-[100px]">{weather.city || "Local"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Row */}
          <div className="w-full flex flex-col items-center gap-3 z-10">
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-wider">
              Click anywhere or press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-white/10 border border-zinc-300/80 dark:border-white/15 text-[10px] text-zinc-800 dark:text-zinc-200">
                ESC
              </kbd>{" "}
              to exit
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
