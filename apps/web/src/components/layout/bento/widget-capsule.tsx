"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Compass, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeatherState } from "./types";
import {
  getWeatherIcon,
  getWeatherDescription,
  getGreeting,
} from "./widget-helpers";
import { AnalogClockMini } from "./analog-clock-mini";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const WidgetCapsule = React.memo(function WidgetCapsule() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [clockMode, setClockMode] = useState<"digital" | "analog">("analog");
  const [showGreeting, setShowGreeting] = useState(true);
  const [weather, setWeather] = useState<WeatherState>({
    temp: null,
    condition: null,
    city: null,
    code: null,
    status: "idle",
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

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            fetchLiveWeather();
          }
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              fetchLiveWeather();
            } else if (permissionStatus.state === "denied") {
              setWeather((prev) => ({ ...prev, status: "denied" }));
            }
          };
        })
        .catch(() => { });
    }
  }, []);

  const fetchLiveWeather = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    setWeather((prev) => ({ ...prev, status: "requesting" }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`
          );
          const data = await res.json();

          let resolvedCity = "";
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            resolvedCity =
              geoData.city || geoData.locality || geoData.principalSubdivision || "";
          } catch { }

          if (!resolvedCity) {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            resolvedCity = tz.split("/")[1]?.replace(/_/g, " ") || "Local";
          }

          const current = data.current;
          const temp = Math.round(current.temperature_2m);
          const code = current.weather_code;

          setWeather({
            temp,
            code,
            condition: getWeatherDescription(code),
            city: resolvedCity,
            status: "success",
          });
        } catch {
          setWeather((prev) => ({ ...prev, status: "error" }));
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setWeather((prev) => ({ ...prev, status: "denied" }));
        } else {
          setWeather((prev) => ({ ...prev, status: "error" }));
        }
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  };

  if (!mounted) {
    return (
      <div className="h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 shadow-sm flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  const hours = currentTime.getHours();
  const rawHours12 = hours % 12 || 12;
  const hoursStr = String(rawHours12).padStart(2, "0");
  const minutesStr = String(currentTime.getMinutes()).padStart(2, "0");
  const secondsStr = String(currentTime.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const fullDateStr = DATE_FORMATTER.format(currentTime);

  const greeting = getGreeting(currentTime);
  const GreetingIcon = greeting.icon;
  const WeatherIcon = getWeatherIcon(weather.code, hours >= 6 && hours < 19);

  return (
    <div className="h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3.5 shadow-sm flex items-center justify-between overflow-hidden relative select-none">
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
            {/* Clock & Date */}
            <div className="flex items-center gap-2 min-w-0">
              {clockMode === "analog" ? (
                <div
                  // onClick={() => setClockMode("digital")}
                  title="Click to switch to digital clock"
                >
                  <AnalogClockMini date={currentTime} />
                </div>
              ) : null}

              <div className="flex flex-col min-w-0 leading-tight">
                {clockMode === "digital" ? (
                  <div className="flex items-baseline gap-1 text-xs font-mono font-bold text-foreground tracking-tight">
                    <span>
                      {hoursStr}:{minutesStr}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      :{secondsStr}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 ml-0.5">
                      {ampm}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-foreground tracking-tight">
                    <span>
                      {hoursStr}:{minutesStr}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      :{secondsStr}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 ml-0.5">
                      {ampm}
                    </span>
                  </div>
                )}
                <span className="text-[9.5px] font-mono text-muted-foreground truncate">
                  {fullDateStr}
                </span>
              </div>
            </div>

            {/* Weather & Switcher */}
            <div className="flex items-center gap-1.5 shrink-0 h-full">
              {weather.status === "success" && weather.temp !== null ? (
                <div
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-xs shadow-xs h-full"
                  title={`${weather.condition} • ${weather.city}`}
                >
                  <WeatherIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <div className="flex flex-col items-center">
                    <div className="font-mono font-bold text-foreground text-[11px]">
                      {weather.temp}°C
                    </div>
                    <div className="font-mono text-[9.5px] text-muted-foreground hidden sm:inline max-w-[65px] truncate">
                      {weather.city}
                    </div>
                  </div>
                </div>
              ) : weather.status === "requesting" ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-[10px] font-mono text-muted-foreground h-full">
                  <Loader2 className="w-3 h-3 animate-spin text-[var(--theme-primary)]" />
                  <span>Locating...</span>
                </div>
              ) : weather.status === "denied" ? (
                <button
                  type="button"
                  onClick={fetchLiveWeather}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-muted/40 border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer h-full"
                  title="Location permission denied. Click to retry."
                >
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>No location</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={fetchLiveWeather}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-[10.5px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs group h-full"
                  title="Click to allow location for live weather"
                >
                  <MapPin className="w-3 h-3 text-[var(--theme-primary)] group-hover:scale-110 transition-transform" />
                  <span>Weather</span>
                </button>
              )}

              {/* <button
                type="button"
                onClick={() => setClockMode(clockMode === "digital" ? "analog" : "digital")}
                className="w-7 h-7 rounded-full bg-muted/60 hover:bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title={clockMode === "digital" ? "Switch to Analog clock" : "Switch to Digital clock"}
              >
                {clockMode === "digital" ? (
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
