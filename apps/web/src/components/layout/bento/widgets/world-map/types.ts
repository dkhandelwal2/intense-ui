import type { WeatherState } from "@/hooks/use-live-weather";

export type TimezonePreset = "LOCAL" | "US" | "UK";

export interface WorldDot {
  sinLat: number;
  cosLat: number;
  lonRad: number;
  seg: string;
}

export interface DotBucket {
  min: number;
  className: string;
}

export interface PinState {
  x: number;
  y: number;
  label: string;
  isLeft: boolean;
  ping: boolean;
}

export interface ScreensaverWorldCardProps {
  className?: string;
  currentTime?: Date;
  defaultPreset?: TimezonePreset;
  homeCity?: string;
  homeCoords?: [number, number];
  weather?: WeatherState;
  onFetchWeather?: () => void;
  fullscreen?: boolean;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  headerSlot?: React.ReactNode;
  footerCenterSlot?: React.ReactNode;
}
