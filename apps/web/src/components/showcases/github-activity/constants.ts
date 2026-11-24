import { GithubActivityVariant, GithubActivityTheme } from "@/components/ui/github-activity";

export const GITHUB_ACTIVITY_VARIANTS: { id: GithubActivityVariant; name: string; emoji: string; description: string }[] = [
  { id: "compact", name: "Full Suite Bento", emoji: "🐙", description: "Integrated profile header with interactive tabs" },
  { id: "heatmap", name: "Heatmap Matrix", emoji: "🟩", description: "52-week contribution calendar matrix" },
  { id: "timeline", name: "Activity Stream", emoji: "⚡", description: "Live recent commits, PRs, and releases feed" },
  { id: "stats", name: "Metric Stats", emoji: "📈", description: "Streaks, total counts, and activity distribution" },
];

export const GITHUB_ACTIVITY_THEMES: { id: GithubActivityTheme; label: string; dotClass: string }[] = [
  { id: "github", label: "GitHub Green", dotClass: "bg-emerald-500" },
  { id: "emerald", label: "Emerald Mint", dotClass: "bg-emerald-400" },
  { id: "cyan", label: "Cyan Ice", dotClass: "bg-cyan-400" },
  { id: "amber", label: "Amber Gold", dotClass: "bg-amber-400" },
  { id: "purple", label: "Purple Void", dotClass: "bg-purple-500" },
  { id: "rose", label: "Rose Neon", dotClass: "bg-rose-500" },
  { id: "monochrome", label: "Monochrome", dotClass: "bg-zinc-400" },
];

export const GITHUB_THEME_COLORS: { id: GithubActivityTheme; color: string; label: string }[] = [
  { id: "github", color: "#10b981", label: "GitHub Green" },
  { id: "emerald", color: "#34d399", label: "Emerald Mint" },
  { id: "cyan", color: "#06b6d4", label: "Cyan Ice" },
  { id: "amber", color: "#f59e0b", label: "Amber Gold" },
  { id: "purple", color: "#a855f7", label: "Purple Void" },
  { id: "rose", color: "#f43f5e", label: "Rose Neon" },
  { id: "monochrome", color: "#71717a", label: "Monochrome" },
];

export const GITHUB_THEME_LABELS: Record<string, string> = {
  "#10b981": "GitHub Green",
  "#34d399": "Emerald Mint",
  "#06b6d4": "Cyan Ice",
  "#f59e0b": "Amber Gold",
  "#a855f7": "Purple Void",
  "#f43f5e": "Rose Neon",
  "#71717a": "Monochrome",
};

export const WEEKS_PRESETS = [13, 26, 52];

export const GITHUB_USER_PRESETS = [
  { username: "octocat", label: "The Octocat" },
  { username: "dkhandelwal2", label: "Deepak K." },
  { username: "shadcn", label: "shadcn" },
  { username: "torvalds", label: "Linus Torvalds" },
];
