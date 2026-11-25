import type React from "react";
import { THEME_LEVEL_CLASSES } from "./constants";
import type { GithubActivityPresetTheme, GithubActivityTheme } from "./types";

const CUSTOM_THEME_LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40",
  1: "bg-[var(--gh-l1)] dark:bg-[var(--gh-d1)] border-[var(--gh-l1)] dark:border-[var(--gh-d1)]",
  2: "bg-[var(--gh-l2)] dark:bg-[var(--gh-d2)] border-[var(--gh-l2)] dark:border-[var(--gh-d2)]",
  3: "bg-[var(--gh-l3)] dark:bg-[var(--gh-d3)] border-[var(--gh-l3)] dark:border-[var(--gh-d3)]",
  4: "bg-[var(--gh-l4)] dark:bg-[var(--gh-d4)] border-[var(--gh-l4)] dark:border-[var(--gh-d4)]",
};

function normalizeHex(color: string): string | null {
  const trimmed = color.trim();
  if (trimmed.startsWith("var(")) {
    if (typeof window !== "undefined") {
      const match = trimmed.match(/^var\(\s*(--[^,\s)]+)/);
      if (match) {
        const val = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim();
        if (val.startsWith("#")) return normalizeHex(val);
      }
    }
    return trimmed.includes("--theme-primary") ? "#FF0084" : null;
  }

  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (!hexMatch) return null;
  let hex = hexMatch[1];
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  } else if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }
  return `#${hex}`;
}

function mixHex(hexA: string, hexB: string, weightB: number): string {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const weightA = 1 - weightB;

  const r = Math.round(((a >> 16) & 0xff) * weightA + ((b >> 16) & 0xff) * weightB);
  const g = Math.round(((a >> 8) & 0xff) * weightA + ((b >> 8) & 0xff) * weightB);
  const bl = Math.round((a & 0xff) * weightA + (b & 0xff) * weightB);

  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

/** Builds a 5-step (levels 0–4) light/dark contribution palette from any custom color string. */
export function buildCustomThemeScale(color: string): { light: string[]; dark: string[] } | null {
  if (!color || color in THEME_LEVEL_CLASSES) return null;
  const base = normalizeHex(color);
  if (!base) return null;

  return {
    light: [
      "#ebedf0",
      mixHex(base, "#ffffff", 0.72),
      mixHex(base, "#ffffff", 0.45),
      mixHex(base, "#ffffff", 0.18),
      mixHex(base, "#000000", 0.12),
    ],
    dark: [
      "#161b22",
      mixHex(base, "#161b22", 0.72),
      mixHex(base, "#161b22", 0.46),
      mixHex(base, "#161b22", 0.2),
      base,
    ],
  };
}

/** Resolves a preset or custom color theme into 2D Tailwind classes and CSS custom property overrides. */
export function resolveGithubTheme(theme: GithubActivityTheme): {
  themeClasses: Record<0 | 1 | 2 | 3 | 4, string>;
  themeStyle?: React.CSSProperties;
} {
  if (theme in THEME_LEVEL_CLASSES) {
    return { themeClasses: THEME_LEVEL_CLASSES[theme as GithubActivityPresetTheme] };
  }

  const scale = buildCustomThemeScale(theme);
  if (!scale) {
    return { themeClasses: THEME_LEVEL_CLASSES.github };
  }

  const themeStyle = {
    "--gh-l1": scale.light[1],
    "--gh-l2": scale.light[2],
    "--gh-l3": scale.light[3],
    "--gh-l4": scale.light[4],
    "--gh-d1": scale.dark[1],
    "--gh-d2": scale.dark[2],
    "--gh-d3": scale.dark[3],
    "--gh-d4": scale.dark[4],
  } as React.CSSProperties;

  return { themeClasses: CUSTOM_THEME_LEVEL_CLASSES, themeStyle };
}
