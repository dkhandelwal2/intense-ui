"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ScreensaverWorldCardProps } from "./types";
import {
  projectEquirectangular,
  PRECOMPUTED_LAND_DOTS,
  getSolarPosition,
  getTerminatorPath,
  getDotBuckets,
} from "./world-map-math";
import { WorldMapSvg } from "./world-map-svg";

export function ScreensaverWorldCard({
  className,
  currentTime: propTime,
  homeCity,
  homeCoords,
  weather,
  fullscreen = false,
  onClose,
  onClick,
  headerSlot,
  footerCenterSlot,
}: ScreensaverWorldCardProps) {
  const [internalTime, setInternalTime] = useState<Date>(() => propTime ?? new Date());

  // Sync internal clock
  useEffect(() => {
    if (propTime) {
      setInternalTime(propTime);
      return;
    }
    const timer = setInterval(() => {
      setInternalTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [propTime]);

  // Solar position & illumination
  const solarPos = useMemo(() => getSolarPosition(internalTime), [internalTime]);

  const sunScreenPos = useMemo<[number, number]>(
    () => projectEquirectangular(solarPos[0], solarPos[1]),
    [solarPos]
  );

  const terminatorD = useMemo(() => getTerminatorPath(solarPos), [solarPos]);

  const dotBuckets = useMemo(
    () => getDotBuckets(PRECOMPUTED_LAND_DOTS, solarPos),
    [solarPos]
  );

  // User location is resolved only when weather permission is granted (or explicit homeCoords provided)
  const isLocated =
    weather?.status === "success" &&
    weather.latitude != null &&
    weather.longitude != null;

  const userCoords = useMemo<[number, number] | null>(() => {
    if (isLocated && weather?.latitude != null && weather?.longitude != null) {
      return [weather.latitude, weather.longitude];
    }
    return homeCoords ?? null;
  }, [isLocated, weather?.latitude, weather?.longitude, homeCoords]);

  const userCity = useMemo<string | null>(() => {
    if (isLocated) {
      return weather?.city || "My Location";
    }
    return homeCity ?? null;
  }, [isLocated, weather?.city, homeCity]);

  // Home Screen Coordinates (User Location Pin on Map)
  const homeScreenCoords = useMemo<[number, number] | null>(
    () => (userCoords ? projectEquirectangular(userCoords[0], userCoords[1]) : null),
    [userCoords]
  );

  // Formatted local date and time
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(internalTime);
  }, [internalTime]);

  const formattedTime = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(internalTime);
    } catch {
      return "";
    }
  }, [internalTime]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (fullscreen) {
      if (onClick) {
        onClick(e);
      } else if (onClose) {
        onClose();
      }
    } else {
      e.stopPropagation();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        fullscreen
          ? "w-full h-full flex flex-col justify-between select-none relative overflow-hidden bg-transparent text-zinc-900 dark:text-zinc-100 p-3 sm:p-6 md:p-8 cursor-pointer"
          : "group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900/95 dark:bg-[#0f0f10] border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl transition-all duration-300 hover:border-zinc-700/80 text-zinc-100 min-h-[290px] sm:min-h-[320px] select-none p-5 sm:p-6",
        className
      )}
    >
      {/* Top Header Row */}
      {headerSlot && (
        <div className="w-full z-20 pb-2 sm:pb-4">
          {headerSlot}
        </div>
      )}

      {/* Center Dotted Map Stage with Vertical Fade Mask */}
      <div
        className={cn(
          "relative w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden my-auto",
          fullscreen ? "py-1 sm:py-4" : "py-4"
        )}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className={cn(
            "w-full h-full flex items-center justify-center",
            fullscreen
              ? "max-w-6xl 2xl:max-w-7xl max-h-full"
              : "w-[112%] relative -right-[4%]"
          )}
        >
          <WorldMapSvg
            className={fullscreen ? "w-full h-auto max-h-full object-contain" : undefined}
            dotBuckets={dotBuckets}
            sunScreenPos={sunScreenPos}
            terminatorD={terminatorD}
            homePin={
              homeScreenCoords && userCity
                ? {
                    x: homeScreenCoords[0],
                    y: homeScreenCoords[1],
                    label: userCity.toUpperCase(),
                  }
                : null
            }
            remotePin={null}
            flightArcD={null}
            isArcVisible={false}
          />
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div
        className={cn(
          "relative z-20 flex items-center justify-between",
          fullscreen
            ? "pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex-wrap gap-4"
            : "pt-4 border-t border-zinc-800/60 bg-zinc-950/40 backdrop-blur-xs"
        )}
      >
        {/* Live Date on Left */}
        <p
          suppressHydrationWarning
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium"
        >
          {formattedDate}
        </p>

        {/* Center Slot (ESC exit hint) */}
        {footerCenterSlot && (
          <div className="hidden md:flex items-center justify-center">
            {footerCenterSlot}
          </div>
        )}

        {/* Live Formatted Time on Right */}
        <p
          aria-live="polite"
          suppressHydrationWarning
          className="font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {formattedTime}
        </p>
      </div>

      {/* Subtle Hover Diagonal Ambient Sheen for card mode */}
      {!fullscreen && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.04] to-transparent z-30" />
      )}
    </div>
  );
}
