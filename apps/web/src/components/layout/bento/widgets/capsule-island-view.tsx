"use client";

import React from "react";
import { WeatherState } from "@/hooks/use-live-weather";
import { getWeatherIcon } from "./weather-helpers";

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  // year: "numeric",
});

export interface CapsuleIslandViewProps {
  currentTime: Date;
  weather: WeatherState;
  onFetchWeather: () => void;
}

export const CapsuleIslandView = React.memo(function CapsuleIslandView({
  currentTime,
  weather,
  onFetchWeather,
}: CapsuleIslandViewProps) {
  const hours = currentTime.getHours();
  const rawHours12 = hours % 12 || 12;
  const hoursStr = String(rawHours12).padStart(2, "0");
  const minutesStr = String(currentTime.getMinutes()).padStart(2, "0");
  const isDay = hours >= 6 && hours < 19;
  const WeatherIcon = getWeatherIcon(weather.code, isDay);
  const formattedDate = SHORT_DATE_FORMATTER.format(currentTime);

  return (
    <div className="relative w-full flex items-center justify-between text-white text-xs select-none">
      {/* Left: Short Date in small mono font */}
      <span className="font-mono text-[9.5px] sm:text-[10px] text-zinc-300 font-medium tracking-tight shrink-0">
        {formattedDate}
      </span>

      {/* Center: Live Digital Time (dead centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-0.5 font-mono font-bold tracking-tight text-[11.5px] text-zinc-100 shrink-0">
        <span>
          {hoursStr}:{minutesStr}
        </span>
        <span className="text-[9px] text-zinc-400 font-sans uppercase">
          {hours >= 12 ? "PM" : "AM"}
        </span>
      </div>

      {/* Right: Weather Temp & Icon */}
      <div
        className="flex items-center gap-1 shrink-0"
        title={weather.status !== "success" ? "Click to open screensaver & weather" : weather.condition || "Weather"}
      >
        <span className="font-mono font-semibold text-[11px] text-zinc-200">
          {weather.temp !== null ? `${weather.temp}°` : "--°"}
        </span>
        <WeatherIcon className="size-3.5 text-sky-400 shrink-0" />
      </div>
    </div>
  );
});
