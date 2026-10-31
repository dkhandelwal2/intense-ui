"use client";

import React from "react";
import { Loader2, MapPin } from "lucide-react";
import { WeatherState } from "@/hooks/use-live-weather";
import { getWeatherIcon } from "./widget-helpers";

interface CapsuleWeatherProps {
  weather: WeatherState;
  hours: number;
  onFetchWeather: () => void;
}

export const CapsuleWeather = React.memo(function CapsuleWeather({
  weather,
  hours,
  onFetchWeather,
}: CapsuleWeatherProps) {
  const isDay = hours >= 6 && hours < 19;
  const WeatherIcon = getWeatherIcon(weather.code, isDay);

  if (weather.status === "success" && weather.temp !== null) {
    return (
      <div
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-xs shadow-xs h-full"
        title={`${weather.condition} • ${weather.city}`}
      >
        <WeatherIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
        <div className="flex flex-col items-center gap-0.5">
          <div className="font-mono font-bold text-foreground text-[11px]">
            {weather.temp}°C
          </div>
          <div className="font-mono text-[9.5px] text-muted-foreground max-w-[65px] truncate">
            {weather.city}
          </div>
        </div>
      </div>
    );
  }

  if (weather.status === "requesting") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-[10px] font-mono text-muted-foreground h-full">
        <Loader2 className="w-3 h-3 animate-spin text-[var(--theme-primary)]" />
        <span>Locating...</span>
      </div>
    );
  }

  if (weather.status === "denied") {
    return (
      <button
        type="button"
        onClick={onFetchWeather}
        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-muted/40 border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer h-full"
        title="Location permission denied. Click to retry."
      >
        <MapPin className="w-3 h-3 text-rose-400" />
        <span>No location</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onFetchWeather}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-[10.5px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs group h-full"
      title="Click to allow location for live weather"
    >
      <MapPin className="w-3 h-3 text-[var(--theme-primary)] group-hover:scale-110 transition-transform" />
      <span>Weather</span>
    </button>
  );
});
