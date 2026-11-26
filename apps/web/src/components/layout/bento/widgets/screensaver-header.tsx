"use client";

import React, { useMemo } from "react";
import { X, Globe, Clock, CloudSun, Loader2, MapPin, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeatherState } from "@/hooks/use-live-weather";
import { getWeatherIcon } from "./weather-helpers";

export interface ScreensaverHeaderProps {
  onClose: () => void;
  viewMode?: "world-map" | "clock";
  onViewModeChange?: (mode: "world-map" | "clock") => void;
  weather?: WeatherState;
  onFetchWeather?: () => void;
  isLandscape?: boolean;
  onToggleOrientation?: () => void;
}

export function ScreensaverHeader({
  onClose,
  viewMode = "world-map",
  onViewModeChange,
  weather,
  onFetchWeather,
  isLandscape,
  onToggleOrientation,
}: ScreensaverHeaderProps) {
  const isDay = useMemo(() => {
    const h = new Date().getHours();
    return h >= 6 && h < 19;
  }, []);

  const WeatherIcon = getWeatherIcon(weather?.code ?? null, isDay);

  return (
    <div className="w-full flex items-center justify-between z-20 gap-3">
      {/* View Mode Switcher */}
      {onViewModeChange ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 p-1 rounded-full bg-zinc-200/80 dark:bg-white/10 border border-zinc-300/80 dark:border-white/15 backdrop-blur-md shadow-xs"
        >
          <button
            type="button"
            onClick={() => onViewModeChange("world-map")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer",
              viewMode === "world-map"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            <Globe className="size-3.5" />
            <span>World Map</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("clock")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer",
              viewMode === "clock"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            <Clock className="size-3.5" />
            <span>Clock</span>
          </button>
        </div>
      ) : (
        <div />
      )}

      {/* Right Controls: Weather status / button + Exit button */}
      <div className="flex items-center gap-2.5">
        {weather && onFetchWeather && (
          <>
            {weather.status === "success" ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/80 dark:bg-white/10 border border-zinc-300/80 dark:border-white/15 backdrop-blur-md text-xs font-mono select-none"
                title={`${weather.condition || "Weather"} in ${weather.city || "your location"}`}
              >
                <WeatherIcon className="size-3.5 text-sky-500 shrink-0" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{weather.temp}°C</span>
                {weather.city && (
                  <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-sans text-xs">
                    <MapPin className="size-3 text-[var(--theme-primary)] shrink-0" />
                    <span className="truncate max-w-[120px]">{weather.city}</span>
                  </span>
                )}
              </div>
            ) : weather.status === "requesting" ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/80 dark:bg-white/10 border border-zinc-300/80 dark:border-white/15 backdrop-blur-md text-xs font-mono text-zinc-600 dark:text-zinc-400 select-none"
              >
                <Loader2 className="size-3.5 animate-spin text-[var(--theme-primary)] shrink-0" />
                <span>Locating...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFetchWeather();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/15 border border-zinc-300/80 dark:border-white/15 backdrop-blur-md text-xs font-mono text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                title="Allow location permission to check live weather and locate on map"
              >
                <CloudSun className="size-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                <span>Check Weather</span>
              </button>
            )}
          </>
        )}

        {/* Orientation Toggle Button (for responsive screens) */}
        {onToggleOrientation && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleOrientation();
            }}
            aria-label={isLandscape ? "Switch to portrait" : "Switch to landscape"}
            title={isLandscape ? "Switch to portrait" : "Switch to landscape"}
            className="size-9 rounded-full bg-zinc-200/70 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/20 border border-zinc-300/80 dark:border-white/15 flex items-center justify-center text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <RotateCw className="size-4" strokeWidth={2} />
          </button>
        )}

        {/* Exit Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Exit screensaver"
          title="Exit screensaver (Esc)"
          className="size-9 rounded-full bg-zinc-200/70 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/20 border border-zinc-300/80 dark:border-white/15 flex items-center justify-center text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

