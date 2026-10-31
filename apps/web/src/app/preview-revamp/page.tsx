"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Sliders,
  Code2,
  Copy,
  Check,
  Sun,
  Moon,
  ArrowUpRight,
  ShieldAlert,
  MessageCircle,
  X,
  Package,
  Activity,
  ExternalLink,
  Layers,
  Clock,
  Sparkles,
  MapPin,
  CloudSun,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud,
  Compass,
  Loader2,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/icons";
import { SidebarWrapper } from "@/components/layout/sidebar-wrapper";
import { KoraExpandingFooter } from "@/components/layout/kora-expanding-footer";
import { useTheme } from "next-themes";
import { PackageManager } from "@/components/ui/package-manager";
import { CodeBlock } from "@/components/ui/code-block";
import { PropsTable } from "@/components/docs";

// Real existing components and documentation data
import { navBarDoc } from "@/config/component-docs/nav-bar";
import { NAVBAR_EXAMPLES } from "@/components/showcases/nav-bar/constants";
import {
  NavbarVariantRenderer,
} from "@/components/showcases/nav-bar/_components/navbar-variant-renderer";
import {
  NavbarPlaygroundStudio,
  DEFAULT_CUSTOM_PROPS,
} from "@/components/showcases/nav-bar/_components";
import { generateNavbarCode } from "@/components/showcases/nav-bar/code-generator";
import { CustomNavbarProps } from "@/components/showcases/nav-bar/types";
import { ComponentTocDock } from "@/components/layout/layout-components/component-toc-dock";
import { InstallTabContent } from "@/components/layout/layout-components/install-tab-content";
import {
  getDependencyLogo,
  getNpmPackageUrl,
  FramerMotionLogo,
  LucideLogo,
  TailwindMergeLogo,
  ClsxLogo,
  RadixLogo,
} from "@/components/docs";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type DeckCardId = 4 | 5 | 6;

// Real dependencies matching Intense UI and navbar component ecosystem
interface DependencyItem {
  name: string;
  version: string;
  type?: "direct" | "peer";
}

const DIRECT_DEPENDENCIES: DependencyItem[] = [
  { name: "framer-motion", version: "^11.18.2", type: "direct" },
  { name: "lucide-react", version: "^1.52.0", type: "direct" },
  { name: "clsx", version: "^2.1.1", type: "direct" },
  { name: "tailwind-merge", version: "^2.6.1", type: "direct" },
];

const PEER_DEPENDENCIES: DependencyItem[] = [
  { name: "react", version: "19.2.8", type: "peer" },
  { name: "react-dom", version: "19.2.8", type: "peer" },
  { name: "next", version: "16.3.8", type: "peer" },
  { name: "typescript", version: "^5.0.0", type: "peer" },
  { name: "next-themes", version: "^0.4.6", type: "peer" },
  { name: "cmdk", version: "^1.0.4", type: "peer" },
];

const ALL_MARQUEE_ROWS: [DependencyItem[], DependencyItem[], DependencyItem[]] = [
  [
    { name: "framer-motion", version: "^11.18.2", type: "direct" },
    { name: "react", version: "19.2.8", type: "peer" },
    { name: "clsx", version: "^2.1.1", type: "direct" },
    { name: "next-themes", version: "^0.4.6", type: "peer" },
  ],
  [
    { name: "lucide-react", version: "^1.52.0", type: "direct" },
    { name: "react-dom", version: "19.2.8", type: "peer" },
    { name: "tailwind-merge", version: "^2.6.1", type: "direct" },
  ],
  [
    { name: "next", version: "16.3.8", type: "peer" },
    { name: "typescript", version: "^5.0.0", type: "peer" },
    { name: "cmdk", version: "^1.0.4", type: "peer" },
  ],
];

function fillTrack(items: DependencyItem[]): DependencyItem[] {
  let res = [...items];
  while (res.length < 6) {
    res = [...res, ...items];
  }
  return res;
}

function renderDependencyLogo(name: string, isCompact: boolean = false) {
  const n = name.toLowerCase().trim();
  const iconSize = isCompact ? "w-2.5 h-2.5" : "w-3.5 h-3.5";
  if (n === "react" || n === "react-dom") {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className={cn(iconSize, "text-[#00d8ff] shrink-0 drop-shadow-[0_0_6px_rgba(0,216,255,0.4)]")} fill="currentColor">
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }
  if (n === "typescript") {
    return (
      <span className={cn(
        "font-mono font-bold rounded bg-[#3178c6] text-white leading-none shrink-0 shadow-xs",
        isCompact ? "text-[7px] px-1 py-[0.5px]" : "text-[8.5px] px-1.5 py-0.5"
      )}>
        TS
      </span>
    );
  }
  if (n === "next") {
    return (
      <span className={cn(
        "font-mono font-bold rounded-md bg-black text-white dark:bg-white dark:text-black leading-none shrink-0 shadow-xs",
        isCompact ? "text-[7px] px-1 py-[0.5px]" : "text-[8.5px] px-1.5 py-0.5"
      )}>
        N
      </span>
    );
  }
  if (n === "next-themes") {
    return <Sun className={cn(iconSize, "text-amber-500 shrink-0")} />;
  }
  if (n === "framer-motion") {
    return <FramerMotionLogo className={cn(isCompact ? "h-2 w-auto" : "h-2.5 w-auto", "text-pink-500 dark:text-pink-400 shrink-0 drop-shadow-[0_0_6px_rgba(244,63,94,0.3)]")} />;
  }
  if (n === "lucide-react") {
    return <LucideLogo className={cn(iconSize, "shrink-0")} />;
  }
  if (n === "tailwind-merge" || n === "tailwindcss") {
    return <TailwindMergeLogo className={cn(iconSize, "text-sky-400 shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]")} />;
  }
  if (n === "clsx") {
    return <ClsxLogo className={cn(iconSize, "text-violet-500 shrink-0")} />;
  }
  if (n.includes("radix")) {
    return <RadixLogo className={cn(iconSize, "text-purple-400 shrink-0")} />;
  }
  if (n === "cmdk") {
    return <Command className={cn(iconSize, "text-zinc-400 shrink-0")} />;
  }
  return getDependencyLogo(name);
}

// Eye-catching text scramble animation (cyberpunk / matrix decode effect)
const SCRAMBLE_GLYPHS = "0123456789ABCDEF!@#$%&*<>[]{}~_+=";

function ScrambleText({
  text,
  className,
  scrambleSpeed = 32,
}: {
  text: string;
  className?: string;
  scrambleSpeed?: number;
}) {
  const [displayText, setDisplayText] = useState(text);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);
    let iteration = 0;
    const target = text;

    animRef.current = setInterval(() => {
      setDisplayText(() =>
        target
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "-") return char;
            if (index < Math.floor(iteration)) {
              return target[index];
            }
            return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        if (animRef.current) clearInterval(animRef.current);
        setDisplayText(target);
      }
      iteration += 0.55;
    }, scrambleSpeed);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    startScramble();
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [startScramble]);

  return (
    <span
      className={className}
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
}

/* =========================================================================
   REGION 3: DYNAMIC WIDGET CAPSULE
   - Initial time-based greeting message (Good morning / afternoon / evening / night)
   - Clock with Analog & Digital switcher along with full date
   - Location-permission live weather & temperature widget
   ========================================================================= */

interface WeatherState {
  temp: number | null;
  condition: string | null;
  city: string | null;
  code: number | null;
  status: "idle" | "requesting" | "success" | "denied" | "error";
}

function getWeatherIcon(code: number | null, isDay = true) {
  if (code === null) return CloudSun;
  if (code === 0) return isDay ? Sun : Moon;
  if (code >= 1 && code <= 3) return isDay ? CloudSun : Cloud;
  if (code >= 51 && code <= 65) return CloudRain;
  if (code >= 71 && code <= 77) return Snowflake;
  if (code >= 95) return CloudLightning;
  return Cloud;
}

function getWeatherDescription(code: number | null) {
  if (code === null) return "Mild";
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

function getGreeting(date: Date) {
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

function AnalogClockMini({ date }: { date: Date }) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30;

  return (
    <div className="relative w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-inner flex items-center justify-center shrink-0">
      {/* 12, 3, 6, 9 markers */}
      <span className="absolute top-0.5 w-[1.5px] h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute bottom-0.5 w-[1.5px] h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute left-0.5 w-1 h-[1.5px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <span className="absolute right-0.5 w-1 h-[1.5px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />

      {/* Hour Hand */}
      <div
        className="absolute w-[1.5px] h-2 rounded-full bg-zinc-800 dark:bg-zinc-200 origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${hourDeg}deg)`,
        }}
      />

      {/* Minute Hand */}
      <div
        className="absolute w-[1px] h-2.5 rounded-full bg-zinc-700 dark:bg-zinc-300 origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${minuteDeg}deg)`,
        }}
      />

      {/* Second Hand */}
      <div
        className="absolute w-[1px] h-3 rounded-full bg-emerald-500 origin-bottom"
        style={{
          bottom: "50%",
          transform: `rotate(${secondDeg}deg)`,
        }}
      />

      {/* Center Pin */}
      <div className="relative w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 z-10 border border-white dark:border-zinc-900" />
    </div>
  );
}

function WidgetCapsule() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [clockMode, setClockMode] = useState<"digital" | "analog">("digital");
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

    // Initial greeting shows for 4 seconds then gracefully morphs to clock
    const greetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(greetingTimer);
    };
  }, []);

  // Check geolocation permission if already granted
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

          // Resolve city name
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

  const greeting = getGreeting(currentTime);
  const GreetingIcon = greeting.icon;

  const hoursStr = String(currentTime.getHours() % 12 || 12).padStart(2, "0");
  const minutesStr = String(currentTime.getMinutes()).padStart(2, "0");
  const secondsStr = String(currentTime.getSeconds()).padStart(2, "0");
  const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";

  const fullDateStr = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const WeatherIcon = getWeatherIcon(
    weather.code,
    currentTime.getHours() >= 6 && currentTime.getHours() < 19
  );

  return (
    <div className="h-[54px] shrink-0 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 shadow-sm flex items-center justify-between overflow-hidden relative select-none">
      <AnimatePresence mode="wait">
        {showGreeting ? (
          /* =========================================================================
             STAGE 1: INITIAL TIME-BASED GREETING VIEW
             ========================================================================= */
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full flex items-center justify-between gap-2"
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
          /* =========================================================================
             STAGE 2: CLOCK (ANALOG/DIGITAL) + FULL DATE + LIVE WEATHER
             ========================================================================= */
          <motion.div
            key="clock-weather"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full flex items-center justify-between gap-2"
          >
            {/* LEFT: CLOCK & FULL DATE */}
            <div className="flex items-center gap-2 min-w-0">
              {clockMode === "analog" ? (
                <div
                  onClick={() => setClockMode("digital")}
                  className="cursor-pointer"
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
                      {hoursStr}:{minutesStr} {ampm}
                    </span>
                  </div>
                )}
                <span className="text-[9.5px] font-mono text-muted-foreground truncate">
                  {fullDateStr}
                </span>
              </div>
            </div>

            {/* RIGHT: WEATHER & CONTROLS */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Weather Widget */}
              {weather.status === "success" && weather.temp !== null ? (
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs shadow-xs"
                  title={`${weather.condition} • ${weather.city}`}
                >
                  <WeatherIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="font-mono font-bold text-foreground text-[11px]">
                    {weather.temp}°C
                  </span>
                  <span className="font-mono text-[9.5px] text-muted-foreground hidden sm:inline max-w-[65px] truncate">
                    {weather.city}
                  </span>
                </div>
              ) : weather.status === "requesting" ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border text-[10px] font-mono text-muted-foreground">
                  <Loader2 className="w-3 h-3 animate-spin text-sky-500" />
                  <span>Locating...</span>
                </div>
              ) : weather.status === "denied" ? (
                <button
                  type="button"
                  onClick={fetchLiveWeather}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/40 border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Location permission denied. Click to retry."
                >
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>No location</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={fetchLiveWeather}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 hover:bg-muted border border-border text-[10.5px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs group"
                  title="Click to allow location for live weather"
                >
                  <MapPin className="w-3 h-3 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span>Weather</span>
                </button>
              )}

              {/* Analog ↔ Digital Clock Switcher */}
              <button
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
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PreviewRevampPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Region 1 & 2: Active TOC Item & Custom Playground Props from existing flow
  const [activeTocId, setActiveTocId] = useState<string>("gooey");
  const [customProps, setCustomProps] = useState<CustomNavbarProps>(DEFAULT_CUSTOM_PROPS);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Region 4, 5, 6: Interactive Bouncy Card Deck (default 5: Playground Studio open)
  const [activeDeckCard, setActiveDeckCard] = useState<DeckCardId>(5);

  // Region 4: Installation State from existing flow
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  // Region 6: Code Preview State from existing flow
  const [activeCodeTab, setActiveCodeTab] = useState<"example" | "custom" | "props">("example");
  const [copiedCode, setCopiedCode] = useState(false);

  // Region 8: Dependencies State
  const [copiedDeps, setCopiedDeps] = useState(false);
  const [copiedChip, setCopiedChip] = useState<string | null>(null);
  const [depFilter, setDepFilter] = useState<"all" | "direct" | "peer">("all");

  // Dynamic dimension tracker for pixel-perfect seamless Region 1 Molded SVG
  const leftStageRef = useRef<HTMLDivElement>(null);
  const [stageDims, setStageDims] = useState({ width: 1140, height: 700 });
  const [hasMeasured, setHasMeasured] = useState(false);

  // Synchronous pre-paint measurement eliminates layout shift and flicker on hard refresh
  useIsomorphicLayoutEffect(() => {
    if (!leftStageRef.current) return;
    const rect = leftStageRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setStageDims({ width: Math.round(rect.width), height: Math.round(rect.height) });
      setHasMeasured(true);
    }
  }, []);

  useEffect(() => {
    if (!leftStageRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setStageDims({ width: Math.round(width), height: Math.round(height) });
          setHasMeasured(true);
        }
      }
    });
    observer.observe(leftStageRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute exact geometry for the molded L-shaped Region 1
  const w = stageDims.width;
  const h = stageDims.height;
  const r = 36; // outer corner radius
  const rConcave = 36; // inner fillet radius
  // Dependencies block matches Developer Support width (380px) exactly
  const dependenciesWidth = 380;
  const bottomBarHeight = 185; // matching Region 7 and Region 8 height
  const gap = 12; // gap between bento regions
  // Dock gets all the remaining width on the left so it has ample space!
  const dockWidth = Math.max(480, w - dependenciesWidth - gap);
  const cutoutY = Math.max(260, h - bottomBarHeight - gap);

  // Exact continuous SVG path for Region 1
  const region1Path = `
    M ${r} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${cutoutY - r}
    A ${r} ${r} 0 0 1 ${w - r} ${cutoutY}
    L ${dockWidth + rConcave} ${cutoutY}
    A ${rConcave} ${rConcave} 0 0 0 ${dockWidth} ${cutoutY + rConcave}
    L ${dockWidth} ${h - r}
    A ${r} ${r} 0 0 1 ${dockWidth - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `.trim().replace(/\s+/g, " ");

  // Real customized code generated from existing flow
  const customizedCode = generateNavbarCode(customProps);

  // Active example metadata from existing flow
  const activeExample = NAVBAR_EXAMPLES.find((ex) => ex.id === activeTocId) || NAVBAR_EXAMPLES[0];

  // Active code depending on tab selection
  const currentDisplayedCode =
    activeCodeTab === "custom"
      ? customizedCode
      : navBarDoc.codes?.[activeTocId] || navBarDoc.codeContent || customizedCode;

  const handleTocItemClick = (id: string) => {
    setActiveTocId(id);
    setIsCustomizing(false);
  };

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const getInstallCommand = (pkgs: string) => {
    switch (packageManager) {
      case "npm":
        return `npm i ${pkgs}`;
      case "yarn":
        return `yarn add ${pkgs}`;
      case "bun":
        return `bun add ${pkgs}`;
      case "pnpm":
      default:
        return `pnpm add ${pkgs}`;
    }
  };

  const allDepNames = (navBarDoc.dependencies || []).map((d) => d.name).join(" ");
  const installAllDepsCommand = getInstallCommand(allDepNames || "framer-motion clsx tailwind-merge");

  const copyChip = (name: string) => {
    navigator.clipboard.writeText(getInstallCommand(name));
    setCopiedChip(name);
    setTimeout(() => setCopiedChip(null), 1500);
  };

  // 3D Card Stack helper matching reference design (Apple Watch / iOS vertical card stack)
  const getCardDeckLayout = (cardId: DeckCardId) => {
    if (activeDeckCard === 5) {
      // Card 5 is active in center (Card 4 peeks 40px at top, Card 6 peeks 40px at bottom)
      if (cardId === 4) {
        return {
          top: 0,
          height: "calc(100% - 100px)",
          scaleX: 0.93,
          zIndex: 20,
          isFront: false,
          d: -1,
        };
      }
      if (cardId === 5) {
        return {
          top: 50,
          height: "calc(100% - 100px)",
          scaleX: 1.0,
          zIndex: 30,
          isFront: true,
          d: 0,
        };
      }
      // cardId === 6
      return {
        top: 100,
        height: "calc(100% - 100px)",
        scaleX: 0.93,
        zIndex: 20,
        isFront: false,
        d: 1,
      };
    }

    if (activeDeckCard === 4) {
      // Card 4 is active at top (Card 5 peeks 40px below, Card 6 peeks 30px below Card 5)
      if (cardId === 4) {
        return {
          top: 0,
          height: "calc(100% - 90px)",
          scaleX: 1.0,
          zIndex: 30,
          isFront: true,
          d: 0,
        };
      }
      if (cardId === 5) {
        return {
          top: 50,
          height: "calc(100% - 90px)",
          scaleX: 0.93,
          zIndex: 20,
          isFront: false,
          d: 1,
        };
      }
      // cardId === 6
      return {
        top: 90,
        height: "calc(100% - 90px)",
        scaleX: 0.86,
        zIndex: 10,
        isFront: false,
        d: 2,
      };
    }

    // activeDeckCard === 6 (Card 6 active at bottom: Card 4 peeks 30px at top, Card 5 peeks 40px below it)
    if (cardId === 4) {
      return {
        top: 0,
        height: "calc(100% - 90px)",
        scaleX: 0.86,
        zIndex: 10,
        isFront: false,
        d: -2,
      };
    }
    if (cardId === 5) {
      return {
        top: 45,
        height: "calc(100% - 90px)",
        scaleX: 0.93,
        zIndex: 20,
        isFront: false,
        d: -1,
      };
    }
    // cardId === 6
    return {
      top: 90,
      height: "calc(100% - 90px)",
      scaleX: 1.0,
      zIndex: 30,
      isFront: true,
      d: 0,
    };
  };

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-[var(--theme-primary)]/20 selection:text-[var(--theme-primary)] overflow-x-clip">
      {/* Seamless GPU-accelerated marquee keyframes: 100% smooth, zero jerk, full vertical clearance */}
      <style>{`
        @keyframes marquee-ltr {
          from {
            transform: translate3d(calc(-100% - var(--marquee-gap, 10px)), 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes marquee-rtl {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(calc(-100% - var(--marquee-gap, 10px)), 0, 0);
          }
        }
        .marquee-track {
          --marquee-gap: 10px;
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: var(--marquee-gap);
          width: 100%;
          padding-top: 4px;
          padding-bottom: 4px;
        }
        .marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: var(--marquee-gap);
          will-change: transform;
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 32s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 32s linear infinite;
        }
        .marquee-track:hover .animate-marquee-ltr,
        .marquee-track:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}</style>


      {/* Main Workspace Frame: Aligned and viewport bound */}
      <div className="w-full h-[calc(100vh-5.5rem)] min-h-[640px] flex items-stretch p-3 pt-1 gap-3 xl:gap-4 overflow-hidden shrink-0">
        {/* EXISTING SIDEBAR ("No change in sidebar", perfectly aligned at top: 0) */}
        <div className="shrink-0 hidden md:flex h-full">
          <SidebarWrapper isInline={true} />
        </div>

        {/* WORKSPACE BENTO CANVAS: Exact Design Shapes in Native Theme */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col xl:flex-row gap-3 items-stretch overflow-hidden">

          {/* =========================================================================
              LEFT COLUMN:
              Region 1 (Molded L-Shape), Region 2 (Dock in Foot), Region 8 (In Cutout)
              ========================================================================= */}
          <div ref={leftStageRef} className="relative flex-1 min-h-0 min-w-0 h-full">

            {/* 
              REGION 1: THE EXACT CONTINUOUS MOLDED L-SHAPED CONTAINER FROM DESIGN
              Drawn seamlessly as an unbroken SVG path with the exact inner concave fillet ($r=36px$).
              Adapts dynamically to light and dark mode.
            */}
            <svg
              className={cn(
                "absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0 transition-opacity duration-150",
                hasMeasured ? "opacity-100" : "opacity-0"
              )}
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.06))" }}
            >
              <defs>
                <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" className="fill-zinc-300/40 dark:fill-white/[0.05]" />
                </pattern>
              </defs>
              {/* Molded Shape Fill in Light and Dark Mode */}
              <path
                d={region1Path}
                className="fill-white dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="1.5"
              />
              {/* Subtle Texture Grid Overlay */}
              <path
                d={region1Path}
                fill="url(#dot-grid)"
              />
            </svg>

            {/* UPPER STAGE OF REGION 1: Center Presentation Stage (Pure CSS bottom anchor eliminates SSR shift) */}
            <div
              className="absolute top-0 left-0 right-0 bottom-[197px] z-10 flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Stage Top Header: Real Component Title & Active Example Specs */}
              <div className="flex items-center justify-between w-full shrink-0 select-none">
                <div className="flex items-center gap-2.5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isCustomizing ? "customization" : activeTocId}
                      initial={{ opacity: 0, scale: 0.94, y: -2 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 2 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="flex items-center gap-2 sm:gap-2.5"
                    >
                      {/* Left Capsule: Terminal route pill with scramble animation & theme glow */}
                      <div className="group px-3 py-1 rounded-full bg-zinc-900/90 dark:bg-black/70 border border-zinc-700/60 dark:border-zinc-800 text-[11px] font-mono text-foreground flex items-center gap-1.5 shadow-xs backdrop-blur-md hover:border-[var(--theme-primary)]/60 hover:shadow-[0_0_16px_-3px_var(--theme-primary)]/30 transition-all cursor-pointer">
                        <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 animate-pulse" />
                        <span className="text-zinc-400 font-medium">nav-bar /</span>
                        <ScrambleText
                          text={isCustomizing ? "customization" : activeTocId}
                          className="font-bold text-white tracking-wide"
                        />
                      </div>

                      {/* Right Capsule: Dynamic badge pill with scramble animation & emerald beacon */}
                      <div className="group px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-[10px] sm:text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 shadow-xs backdrop-blur-md hover:border-emerald-500/50 hover:shadow-[0_0_16px_-3px_rgba(16,185,129,0.35)] transition-all cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <ScrambleText
                          text={activeExample.spec?.badge || "Fluid Physics"}
                          className="tracking-wide"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="text-[11px] font-mono text-muted-foreground hidden sm:flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isCustomizing ? "customization" : activeTocId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-2"
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <ScrambleText
                        text={activeExample.label}
                        className="text-foreground/90 font-medium cursor-pointer"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Center Presentation Stage: Dynamic Navbar Variant Renderer with smooth transitions */}
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-2 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isCustomizing ? "customization" : activeTocId}
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -10 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    {/* Component Surface */}
                    <div
                      className="p-5 sm:p-7 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-border shadow-md backdrop-blur-xl transition-all duration-300"
                      style={{
                        boxShadow: customProps.activeColor
                          ? `0 20px 40px -15px ${customProps.activeColor}25`
                          : undefined,
                      }}
                    >
                      <NavbarVariantRenderer
                        id={isCustomizing ? "customization" : activeTocId}
                        customProps={customProps}
                      />
                    </div>

                    {/* Real Live Feedback State */}
                    <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border text-[11px] font-mono text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Variant:</span>
                      <strong className="text-foreground capitalize">{isCustomizing ? customProps.variant : activeTocId}</strong>
                      <span className="text-muted-foreground/60">•</span>
                      <span>Scale:</span>
                      <strong className="text-foreground uppercase">{customProps.size}</strong>
                      <span className="text-muted-foreground/60">•</span>
                      <span>Engine:</span>
                      <strong className="text-foreground">Framer Motion Spring</strong>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* 
              REGION 2: THE DOCK SITTING DIRECTLY INSIDE THE LOWER-LEFT FOOT OF REGION 1
              Houses the actual ComponentTocDock from existing flow with scooped notch!
            */}
            <div
              className="absolute z-20 flex items-center justify-center overflow-hidden bottom-3 left-3 h-[185px]"
              style={{
                width: dockWidth - 24,
              }}
            >
              <div className="flex items-center justify-center">
                <ComponentTocDock
                  tocItems={navBarDoc.tocItems || []}
                  activeTocId={isCustomizing ? customProps.variant : activeTocId}
                  onItemClick={handleTocItemClick}
                  isInline={true}
                  className="w-full flex items-center justify-center"
                />
              </div>
            </div>

            {/* 
              REGION 8: DEPENDENCIES CARD IN THE CUTOUT NOTCH OF REGION 1
              - Molded scooped notch shape in upper-right corner
              - Filter: ALL, DIRECT, PEER with active theme primary
              - Ultra-compact marquee chips (reduced >= 50%)
              - Simple heading without pill border and padding
              - Faded top-to-bottom isometric blocks background
            */}
            <div
              className="absolute bottom-0 right-0 z-20 h-[185px] rounded-[26px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between overflow-hidden select-none"
              style={{
                width: dependenciesWidth,
              }}
            >
              {/* Faded Top-to-Bottom Isometric Blocks Background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <defs>
                  <pattern
                    id="dep-iso-blocks-pattern"
                    width="36"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <polygon
                      points="18,0 36,5 18,10 0,5"
                      className="fill-zinc-400/[0.04] dark:fill-white/[0.02] stroke-zinc-300/40 dark:stroke-white/[0.06]"
                      strokeWidth="0.7"
                    />
                    <polygon
                      points="0,5 18,10 18,20 0,15"
                      className="fill-transparent stroke-zinc-300/30 dark:stroke-white/[0.04]"
                      strokeWidth="0.7"
                    />
                    <polygon
                      points="18,10 36,5 36,15 18,20"
                      className="fill-zinc-400/[0.02] dark:fill-white/[0.01] stroke-zinc-300/30 dark:stroke-white/[0.04]"
                      strokeWidth="0.7"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#dep-iso-blocks-pattern)"
                  style={{
                    maskImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
                    WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
                  }}
                />
              </svg>

              {/* Molded Scooped Notch in Upper-Right for Filter Tabs */}
              <svg
                className="absolute top-0 right-0 pointer-events-none overflow-visible z-1"
                width="210"
                height="40"
                viewBox="0 0 210 40"
              >
                {/* Scooped cradle background surface */}
                <path
                  d="M 0 0 C 14 0, 18 36, 32 36 L 210 36 L 210 0 Z"
                  className="fill-zinc-100/60 dark:fill-zinc-950/50"
                />
                {/* Molded Scoop Contour Line */}
                <path
                  d="M 0 0 C 14 0, 18 36, 32 36 L 210 36"
                  className="fill-none stroke-zinc-200/90 dark:stroke-zinc-800"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Header Row: Left Title & Right Filter in the Scooped Notch */}
              <div className="relative z-10 flex items-center justify-between shrink-0 h-9 px-3.5 pt-1.5">
                {/* Left: Simple heading with icon (no border, no padding) */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground select-none">
                  <Package className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>Dependencies</span>
                </div>

                {/* Right: Filter tabs sitting directly inside the scooped cradle */}
                <div className="flex items-center gap-2 select-none">
                  {(
                    [
                      { id: "all", label: "ALL" },
                      { id: "direct", label: "DIRECT" },
                      { id: "peer", label: "PEER" },
                    ] as const
                  ).map((f) => {
                    const isActive = depFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setDepFilter(f.id)}
                        className={cn(
                          "group flex items-center gap-1.5 py-0.5 px-1 rounded transition-all duration-150 select-none cursor-pointer focus:outline-none",
                          isActive
                            ? "text-[var(--theme-primary)] font-bold"
                            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 font-medium"
                        )}
                        title={`Filter by ${f.label.toLowerCase()} dependencies`}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 rounded-[1.5px] transition-all duration-150 shrink-0",
                            isActive
                              ? "bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]"
                              : "border border-zinc-400 dark:border-zinc-600 bg-transparent group-hover:border-zinc-500 dark:group-hover:border-zinc-400"
                          )}
                        />
                        <span className="font-mono text-[9px] tracking-wider uppercase leading-none">
                          {f.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Marquee only on ALL, static unique chips on DIRECT and PEER */}
              {(() => {
                const renderChip = (dep: DependencyItem, key: string) => (
                  <a
                    key={key}
                    href={getNpmPackageUrl(dep.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      copyChip(dep.name);
                    }}
                    className={cn(
                      "group inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-2xs select-none shrink-0 h-[22px]",
                      "bg-white/95 dark:bg-zinc-800/90 border-zinc-200/80 dark:border-zinc-700/70 text-foreground",
                      "hover:bg-white dark:hover:bg-zinc-700 hover:border-[var(--theme-primary)]/50 hover:shadow-xs hover:scale-105 active:scale-95"
                    )}
                    title={`Click to copy ${getInstallCommand(dep.name)}`}
                  >
                    {renderDependencyLogo(dep.name, true)}
                    <span className="text-[10px] font-mono font-medium tracking-tight">
                      {copiedChip === dep.name ? (
                        <span className="text-emerald-500 font-semibold flex items-center gap-0.5 text-[9px]">
                          <Check className="w-2.5 h-2.5" /> Copied!
                        </span>
                      ) : (
                        dep.name
                      )}
                    </span>
                    <span className="text-[7.5px] text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-900/90 px-1 py-[0.5px] rounded border border-zinc-200 dark:border-zinc-800 font-medium leading-none">
                      {dep.version}
                    </span>
                  </a>
                );

                if (depFilter === "all") {
                  return (
                    <motion.div
                      key="marquee-all"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.18 }}
                      className="flex-1 flex flex-col justify-center gap-1.5 py-1.5 overflow-hidden relative z-10"
                    >
                      {/* LINE 1: LTR */}
                      <div className="marquee-track transform-gpu [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                        <div
                          className="marquee-group animate-marquee-ltr"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[0]).map((dep, idx) =>
                            renderChip(dep, `all-r1-a-${dep.name}-${idx}`)
                          )}
                        </div>
                        <div
                          className="marquee-group animate-marquee-ltr"
                          aria-hidden="true"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[0]).map((dep, idx) =>
                            renderChip(dep, `all-r1-b-${dep.name}-${idx}`)
                          )}
                        </div>
                      </div>

                      {/* LINE 2: RTL */}
                      <div className="marquee-track transform-gpu [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                        <div
                          className="marquee-group animate-marquee-rtl"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[1]).map((dep, idx) =>
                            renderChip(dep, `all-r2-a-${dep.name}-${idx}`)
                          )}
                        </div>
                        <div
                          className="marquee-group animate-marquee-rtl"
                          aria-hidden="true"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[1]).map((dep, idx) =>
                            renderChip(dep, `all-r2-b-${dep.name}-${idx}`)
                          )}
                        </div>
                      </div>

                      {/* LINE 3: LTR */}
                      <div className="marquee-track transform-gpu [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                        <div
                          className="marquee-group animate-marquee-ltr"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[2]).map((dep, idx) =>
                            renderChip(dep, `all-r3-a-${dep.name}-${idx}`)
                          )}
                        </div>
                        <div
                          className="marquee-group animate-marquee-ltr"
                          aria-hidden="true"
                          style={{ animationDuration: "32s" }}
                        >
                          {fillTrack(ALL_MARQUEE_ROWS[2]).map((dep, idx) =>
                            renderChip(dep, `all-r3-b-${dep.name}-${idx}`)
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                // FILTER APPLIED (DIRECT or PEER): Static unique chips without marquee
                if (depFilter === "direct") {
                  return (
                    <motion.div
                      key="static-direct"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex-1 flex flex-col justify-center gap-2.5 px-3.5 py-1 z-10"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {renderChip(DIRECT_DEPENDENCIES[0], `d-0-${DIRECT_DEPENDENCIES[0].name}`)}
                        {renderChip(DIRECT_DEPENDENCIES[1], `d-1-${DIRECT_DEPENDENCIES[1].name}`)}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {renderChip(DIRECT_DEPENDENCIES[2], `d-2-${DIRECT_DEPENDENCIES[2].name}`)}
                        {renderChip(DIRECT_DEPENDENCIES[3], `d-3-${DIRECT_DEPENDENCIES[3].name}`)}
                      </div>
                    </motion.div>
                  );
                }

                // PEER DEPENDENCIES: Exactly 6 unique items
                return (
                  <motion.div
                    key="static-peer"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 flex flex-col justify-center gap-2 px-3.5 py-1 z-10"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderChip(PEER_DEPENDENCIES[0], `p-0-${PEER_DEPENDENCIES[0].name}`)}
                      {renderChip(PEER_DEPENDENCIES[1], `p-1-${PEER_DEPENDENCIES[1].name}`)}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderChip(PEER_DEPENDENCIES[2], `p-2-${PEER_DEPENDENCIES[2].name}`)}
                      {renderChip(PEER_DEPENDENCIES[3], `p-3-${PEER_DEPENDENCIES[3].name}`)}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderChip(PEER_DEPENDENCIES[4], `p-4-${PEER_DEPENDENCIES[4].name}`)}
                      {renderChip(PEER_DEPENDENCIES[5], `p-5-${PEER_DEPENDENCIES[5].name}`)}
                    </div>
                  </motion.div>
                );
              })()}

              {/* Bottom Micro Stat Footer */}
              <div className="relative z-10 flex items-center justify-between px-3.5 pb-2 text-[10px] font-mono text-muted-foreground/70">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>
                    {depFilter === "all"
                      ? "4 direct • 6 peer"
                      : depFilter === "direct"
                        ? "4 direct packages"
                        : "6 peer packages"}
                  </span>
                </span>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-600">click chip to copy</span>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN:
              Region 3 (Stadium Capsule), Regions 4, 5, 6 (Cascading Deck), Region 7 (Fanned Cards)
              Strictly viewport bound with internal card scroll
              ========================================================================= */}
          <div className="w-full xl:w-[380px] shrink-0 flex flex-col justify-between gap-3 h-full overflow-hidden">

            {/* REGION 3: DYNAMIC WIDGET SECTION (Greeting, Clock with Analog/Digital Switcher, Full Date & Weather) */}
            <WidgetCapsule />

            {/* 
              REGIONS 4, 5, 6: 3D STACKED CARD DECK (WATCHOS / IOS STACK REFERENCE)
              - 3D perspective layered card deck matching reference design
              - Every card retains its full smooth rounded corners (rounded-[26px])
              - Active card in front (scaleX: 1, zIndex: 30, elevated shadow, interactive)
              - Inactive cards peek above and/or below (scaled width to 0.94/0.88, shaded, zIndex: 20/10)
              - Prominently visible headers on all peeking cards, smoothly promoted on click
            */}
            <div className="relative flex-1 min-h-[300px] w-full h-full select-none rounded-[22px] overflow-hidden">
              {(() => {
                const layout4 = getCardDeckLayout(4);
                const layout5 = getCardDeckLayout(5);
                const layout6 = getCardDeckLayout(6);

                return (
                  <>
                    {/* CARD 4: CLI Installation */}
                    <motion.div
                      initial={false}
                      onClick={() => setActiveDeckCard(4)}
                      className={cn(
                        "absolute inset-x-0 rounded-[22px] border transition-colors cursor-pointer overflow-hidden flex flex-col justify-start select-none",
                        layout4.isFront
                          ? "bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl ring-2 ring-[var(--theme-primary)]/10 p-3.5 sm:p-4"
                          : "bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 shadow-xl px-3.5 py-2 hover:brightness-105"
                      )}
                      style={{
                        zIndex: layout4.zIndex,
                        transformOrigin: "center center",
                      }}
                      animate={{
                        top: layout4.top,
                        height: layout4.height,
                        // scaleX: layout4.scaleX,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
                    >
                      <div className="flex items-center justify-between shrink-0 h-9">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex items-center gap-2 truncate">
                            <Terminal className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-xs font-bold text-foreground tracking-wide truncate">CLI Installation</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pr-1 shrink-0">
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold">
                            v0.1.0
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {layout4.isFront && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 pt-2 border-t border-border flex-1 min-h-0 flex flex-col overflow-y-auto pr-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <InstallTabContent
                              slug="nav-bar"
                              usageCode={navBarDoc.usageCode}
                              dependencies={navBarDoc.dependencies}
                              packageManager={packageManager}
                              onPackageManagerChange={setPackageManager}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* When peeking below active card: show bottom indicator */}
                      {layout4.d > 0 && (
                        <div className="mt-auto flex items-center justify-between shrink-0 h-10 px-1 text-foreground/90 select-none pb-1">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex items-center gap-2 truncate">
                              <Terminal className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="text-xs font-bold text-foreground tracking-wide truncate">CLI Installation</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold">
                            v0.1.0
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* CARD 5: Playground Studio */}
                    <motion.div
                      initial={false}
                      onClick={() => setActiveDeckCard(5)}
                      className={cn(
                        "absolute inset-x-0 rounded-[22px] border transition-colors cursor-pointer overflow-hidden flex flex-col justify-start select-none",
                        layout5.isFront
                          ? "bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl ring-2 ring-[var(--theme-primary)]/10 p-3.5 sm:p-4"
                          : "bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 shadow-xl px-3.5 py-2 hover:brightness-105"
                      )}
                      style={{
                        zIndex: layout5.zIndex,
                        transformOrigin: "center center",
                      }}
                      animate={{
                        top: layout5.top,
                        height: layout5.height,
                        // scaleX: layout5.scaleX,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
                    >
                      <div className="flex items-center justify-between shrink-0 h-9">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex items-center gap-2 truncate">
                            <Sliders className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="text-xs font-bold text-foreground tracking-wide truncate">Playground Studio</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pr-1 shrink-0">
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold">
                            Live Sync
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {layout5.isFront && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 pt-2 border-t border-border flex-1 min-h-0 flex flex-col overflow-hidden w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCustomizing(true);
                            }}
                          >
                            <NavbarPlaygroundStudio
                              customProps={customProps}
                              onChange={(val) => {
                                setCustomProps(val);
                                setIsCustomizing(true);
                              }}
                              hidePreview={true}
                              className="w-full h-full flex-1 min-h-0 flex flex-col"
                              onViewCode={() => {
                                setActiveDeckCard(6);
                                setActiveCodeTab("custom");
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* When peeking below active card: show bottom indicator */}
                      {layout5.d > 0 && (
                        <div className="mt-auto flex items-center justify-between shrink-0 h-10 px-1 text-foreground/90 select-none pb-1">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex items-center gap-2 truncate">
                              <Sliders className="w-4 h-4 text-orange-500 shrink-0" />
                              <span className="text-xs font-bold text-foreground tracking-wide truncate">Playground Studio</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-semibold">
                            Live Sync
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* CARD 6: Preview / Code */}
                    <motion.div
                      initial={false}
                      onClick={() => setActiveDeckCard(6)}
                      className={cn(
                        "absolute inset-x-0 rounded-[22px] border transition-colors cursor-pointer overflow-hidden flex flex-col justify-start select-none",
                        layout6.isFront
                          ? "bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl ring-2 ring-[var(--theme-primary)]/10 p-3.5 sm:p-4"
                          : "bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 shadow-xl px-3.5 py-2 hover:brightness-105"
                      )}
                      style={{
                        zIndex: layout6.zIndex,
                        transformOrigin: "center center",
                      }}
                      animate={{
                        top: layout6.top,
                        height: layout6.height,
                        // scaleX: layout6.scaleX,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
                    >
                      <div className="flex items-center justify-between shrink-0 h-9">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex items-center gap-2 truncate">
                            <Code2 className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="text-xs font-bold text-foreground tracking-wide truncate">Preview &amp; Source Code</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pr-1 shrink-0">
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-bold">
                            TypeScript
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {layout6.isFront && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 pt-2 border-t border-border flex-1 min-h-0 flex flex-col overflow-y-auto pr-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Premium Segmented Sub-tab Navigation */}
                            <div className="mb-3 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 flex items-center gap-1 w-full select-none overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setActiveCodeTab("example")}
                                className={cn(
                                  "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                                  activeCodeTab === "example"
                                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs border border-zinc-200 dark:border-zinc-700"
                                    : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                )}
                              >
                                <span
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full shrink-0",
                                    activeCodeTab === "example" ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"
                                  )}
                                />
                                <span className="truncate">Active</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setActiveCodeTab("custom")}
                                className={cn(
                                  "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                                  activeCodeTab === "custom"
                                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs border border-zinc-200 dark:border-zinc-700"
                                    : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                )}
                              >
                                <Sliders className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                                <span className="truncate">Custom</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setActiveCodeTab("props")}
                                className={cn(
                                  "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                                  activeCodeTab === "props"
                                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs border border-zinc-200 dark:border-zinc-700"
                                    : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                )}
                              >
                                <Layers className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                                <span className="truncate">Props</span>
                              </button>
                            </div>

                            {/* Tab Content */}
                            {activeCodeTab === "props" ? (
                              <div className="p-2 rounded-xl bg-muted/40 border border-border text-foreground">
                                {navBarDoc.propGroups ? (
                                  <PropsTable groups={navBarDoc.propGroups} />
                                ) : (
                                  <p className="text-xs text-muted-foreground">No props documentation available.</p>
                                )}
                              </div>
                            ) : (
                              <div className="rounded-xl overflow-hidden border border-border">
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={activeCodeTab + (activeCodeTab === "example" ? activeTocId : "")}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.16 }}
                                  >
                                    <CodeBlock code={currentDisplayedCode} language="tsx" />
                                  </motion.div>
                                </AnimatePresence>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* When peeking below active card: show bottom indicator */}
                      {layout6.d > 0 && (
                        <div className="mt-auto flex items-center justify-between shrink-0 h-10 px-1 text-foreground/90 select-none pb-1">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex items-center gap-2 truncate">
                              <Code2 className="w-4 h-4 text-blue-500 shrink-0" />
                              <span className="text-xs font-bold text-foreground tracking-wide truncate">Preview &amp; Source Code</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-bold">
                            TypeScript
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </>
                );
              })()}
            </div>

            {/* REGION 7: NEED HELP SECTION WITH FANNED CARDS */}
            <div className="h-[185px] shrink-0 rounded-[30px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-3.5 shadow-sm flex flex-col justify-between relative overflow-hidden select-none">
              {/* Subtle ambient lighting */}
              <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-2xl pointer-events-none" />

              {/* Header: Real Support Metadata & Status */}
              <div className="relative z-10 flex items-center justify-between shrink-0 mb-0.5">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-foreground flex items-center gap-1.5 shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Developer Support</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Community</span>
                  </div>
                  <a
                    href="https://github.com/intense-ui/intense-ui/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Community Discussions"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Real Support Action Cards */}
              <div className="relative z-10 flex items-center justify-between gap-3 my-auto">
                <div className="flex flex-col gap-2 w-[190px] shrink-0">
                  {/* Discord Link */}
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-200/90 dark:border-zinc-700/80 text-xs text-foreground flex items-center justify-between transition-all group cursor-pointer shadow-xs hover:border-indigo-500/40 active:scale-98"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                      </div>
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="font-bold text-[11px] truncate">Discord Community</span>
                        <span className="text-[9.5px] text-muted-foreground truncate">1,800+ Devs • Live QA</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>

                  {/* GitHub Issues Link */}
                  <a
                    href="https://github.com/intense-ui/intense-ui/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-200/90 dark:border-zinc-700/80 text-xs text-foreground flex items-center justify-between transition-all group cursor-pointer shadow-xs hover:border-rose-500/40 active:scale-98"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      </div>
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="font-bold text-[11px] truncate">Report an Issue</span>
                        <span className="text-[9.5px] text-muted-foreground truncate">Bugs &amp; Features</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>
              </div>

              {/* THREE PROMINENT FANNED RECTANGULAR CARDS IN RIGHT SIDE MATCHING SKETCH */}
              <div className="absolute right-3.5 bottom-2.5 pointer-events-none select-none z-0">
                <div className="relative w-[130px] h-[105px]">
                  {/* Back Fanned Card (18 deg) */}
                  <div className="absolute inset-0 rounded-2xl bg-zinc-200/90 dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-700/80 rotate-[18deg] transform translate-x-2 -translate-y-1 shadow-xs" />
                  {/* Middle Fanned Card (10 deg) */}
                  <div className="absolute inset-0 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rotate-[10deg] transform translate-x-1 -translate-y-0.5 shadow-sm" />
                  {/* Front Fanned Card (2 deg) */}
                  <div className="absolute inset-0 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-md flex flex-col justify-between p-2.5 rotate-[2deg]">
                    <div className="flex items-center justify-between">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8.5px] font-mono text-muted-foreground font-semibold">v0.1.0</span>
                    </div>
                    <div className="font-mono text-[10.5px] font-bold text-foreground truncate">
                      &lt;NavbarGooey /&gt;
                    </div>
                    <div className="h-1.5 w-12 rounded-full bg-pink-500" />
                  </div>
                </div>
              </div>

              {/* Bottom Line: Consistent Footer */}
              <div className="relative z-10 flex items-center justify-between gap-3 pt-1 border-t border-border shrink-0">
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-muted-foreground/30" />
                  <div className="flex-1 border-b border-dashed border-border h-0.5" />
                </div>
                <a
                  href="https://github.com/intense-ui/intense-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 border border-border text-[10.5px] font-mono text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>intense-ui / core</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── KORA-STYLE EXPANDING SCALE FOOTER ─── */}
      <KoraExpandingFooter />
    </div>
  );
}
