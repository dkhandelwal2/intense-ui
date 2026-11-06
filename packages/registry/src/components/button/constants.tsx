import React from "react";
import { Trash2, Check, Archive, AlertTriangle } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, XIcon, YouTubeIcon } from "@/assets/svg";
import { SharePlatform } from "./types";

export const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-2xl gap-2.5",
  icon: "w-10 h-10 p-0 rounded-xl gap-0 justify-center shrink-0",
} as const;

export const VARIANT_STYLES = {
  default: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm",
  glow: "relative bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.35)] hover:shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.6)] border border-white/20",
  outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 shadow-2xs",
  subtle: "bg-zinc-100 dark:bg-zinc-800/70 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-none",
  text: "bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-none",
  ghost: "bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-none",
  "3d": "relative bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-t border-t-white/25 dark:border-t-white shadow-[0_5px_0_#09090b,0_10px_20px_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_#09090b,0_3px_6px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_0_#cbd5e1,0_10px_22px_rgba(0,0,0,0.5)] dark:active:shadow-[0_1px_0_#cbd5e1,0_3px_6px_rgba(0,0,0,0.3)] hover:brightness-105 active:brightness-95",
  shimmer: "relative overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm",
  ripple: "relative overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm",
  "filled-border": "relative overflow-hidden isolate [transform:translateZ(0)] border border-zinc-900 dark:border-white text-zinc-900 dark:text-white group z-0",
} as const;

export const ACTION_CONFIGS = {
  delete: { label: "Delete", prompt: "Are you sure?", success: "Deleted!", icon: Trash2, pillBg: "bg-red-600 hover:bg-red-500", accent: "text-red-600 dark:text-red-500", confirmBtn: "bg-white text-red-600 hover:bg-zinc-100" },
  confirm: { label: "Confirm", prompt: "Proceed?", success: "Confirmed!", icon: Check, pillBg: "bg-emerald-600 hover:bg-emerald-500", accent: "text-emerald-600 dark:text-emerald-500", confirmBtn: "bg-white text-emerald-700 hover:bg-zinc-100" },
  archive: { label: "Archive", prompt: "Archive item?", success: "Archived!", icon: Archive, pillBg: "bg-amber-600 hover:bg-amber-500", accent: "text-amber-600 dark:text-amber-500", confirmBtn: "bg-white text-amber-700 hover:bg-zinc-100" },
  discard: { label: "Discard", prompt: "Discard?", success: "Discarded!", icon: AlertTriangle, pillBg: "bg-zinc-800 hover:bg-zinc-700", accent: "text-zinc-600 dark:text-zinc-400", confirmBtn: "bg-white text-zinc-950 hover:bg-zinc-100" },
};

export const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="w-5 h-5" />,
  instagram: <InstagramIcon className="w-5 h-5" />,
  facebook: <FacebookIcon className="w-5 h-5" />,
  x: <XIcon className="w-5 h-5" />,
  twitter: <XIcon className="w-5 h-5" />,
  youtube: <YouTubeIcon className="w-5 h-5" />,
};

export const SOLID_PLATFORM_ICONS: Record<string, React.ReactNode> = {
  whatsapp: <WhatsAppIcon solid className="w-7 h-7" />,
  instagram: <InstagramIcon solid className="w-7 h-7" />,
  facebook: <FacebookIcon solid className="w-7 h-7" />,
  x: <XIcon solid className="w-7 h-7" />,
  twitter: <XIcon solid className="w-7 h-7" />,
  youtube: <YouTubeIcon solid className="w-7 h-7" />,
};

export const DEFAULT_PLATFORMS: SharePlatform[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X" },
  { id: "facebook", label: "Facebook" },
];

export const SHARE_SIZES = {
  sm: {
    height: "h-10",
    collapsedWidth: 140,
    expandedWidth: 248,
    textSize: "text-xs",
    iconSize: "w-4 h-4",
    solidIconSize: "w-5 h-5",
    leftContractedWidth: 36,
  },
  md: {
    height: "h-12",
    collapsedWidth: 160,
    expandedWidth: 288,
    textSize: "text-sm",
    iconSize: "w-5 h-5",
    solidIconSize: "w-6 h-6",
    leftContractedWidth: 44,
  },
  lg: {
    height: "h-14",
    collapsedWidth: 180,
    expandedWidth: 320,
    textSize: "text-base",
    iconSize: "w-6 h-6",
    solidIconSize: "w-7 h-7",
    leftContractedWidth: 52,
  },
} as const;
