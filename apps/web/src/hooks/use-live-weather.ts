"use client";

import { useState, useEffect, useCallback } from "react";
import { EXTERNAL_LINKS } from "@/config/site";

export type WeatherStatus = "idle" | "requesting" | "success" | "denied" | "error";

export interface WeatherState {
  temp: number | null;
  condition: string | null;
  city: string | null;
  code: number | null;
  status: WeatherStatus;
}

const DEFAULT_WEATHER_STATE: WeatherState = {
  temp: null,
  condition: null,
  city: null,
  code: null,
  status: "idle",
};

export function getWeatherDescription(code: number | null): string {
  if (code === null) return "Mild";
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

export function useLiveWeather() {
  const [weather, setWeather] = useState<WeatherState>(DEFAULT_WEATHER_STATE);

  const fetchLiveWeather = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    setWeather((prev: WeatherState) => ({ ...prev, status: "requesting" }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const forecastUrl = `${EXTERNAL_LINKS.WEATHER.FORECAST_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`;
          const res = await fetch(forecastUrl);
          const data = await res.json();

          let resolvedCity = "";
          try {
            const geocodeUrl = `${EXTERNAL_LINKS.WEATHER.REVERSE_GEOCODE_API}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
            const geoRes = await fetch(geocodeUrl);
            const geoData = await geoRes.json();
            resolvedCity =
              geoData.city || geoData.locality || geoData.principalSubdivision || "";
          } catch {
            // Geocoding fallback to timezone
          }

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
          setWeather((prev: WeatherState) => ({ ...prev, status: "error" }));
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setWeather((prev: WeatherState) => ({ ...prev, status: "denied" }));
        } else {
          setWeather((prev: WeatherState) => ({ ...prev, status: "error" }));
        }
      },
      { timeout: 8000, maximumAge: 600000 }
    );
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
              setWeather((prev: WeatherState) => ({ ...prev, status: "denied" }));
            }
          };
        })
        .catch(() => {});
    }
  }, [fetchLiveWeather]);

  return { weather, fetchLiveWeather };
}
