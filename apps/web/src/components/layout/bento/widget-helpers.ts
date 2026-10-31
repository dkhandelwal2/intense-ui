import {
  Sun,
  Moon,
  CloudSun,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud,
} from "lucide-react";

export function getWeatherIcon(code: number | null, isDay = true) {
  if (code === null) return CloudSun;
  if (code === 0) return isDay ? Sun : Moon;
  if (code >= 1 && code <= 3) return isDay ? CloudSun : Cloud;
  if (code >= 51 && code <= 65) return CloudRain;
  if (code >= 71 && code <= 77) return Snowflake;
  if (code >= 95) return CloudLightning;
  return Cloud;
}

export function getWeatherDescription(code: number | null) {
  if (code === null) return "Mild";
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

export function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return {
      title: "Good morning",
      subtitle: "Ready to build components?",
      icon: Sun,
      color: "text-amber-500",
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      title: "Good afternoon",
      subtitle: "Designing fluid physics?",
      icon: CloudSun,
      color: "text-orange-500",
    };
  }
  if (hour >= 17 && hour < 22) {
    return {
      title: "Good evening",
      subtitle: "Wrapping up today's work?",
      icon: Moon,
      color: "text-indigo-400",
    };
  }
  return {
    title: "Good night",
    subtitle: "Night owl mode activated",
    icon: Moon,
    color: "text-purple-400",
  };
}
