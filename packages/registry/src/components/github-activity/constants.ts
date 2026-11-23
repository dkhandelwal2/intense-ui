import type {
  GithubActivityTheme, GithubContributionDay, GithubActivityEvent,
  GithubActivityStatsData, GithubUserProfile,
} from "./types";

export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const FULL_MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getOrdinalDay(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  return `${day}${["th", "st", "nd", "rd"][day % 10] || "th"}`;
}

export function formatContributionDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || isNaN(m) || isNaN(d) || m < 1 || m > 12) return dateStr;
  return `${FULL_MONTH_NAMES[m - 1]} ${getOrdinalDay(d)}, ${y}`;
}

export const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export const DOT_SIZES = {
  sm: { box: "w-2.5 h-2.5 sm:w-[9px] sm:h-[9px]", label: "h-2.5 sm:h-[9px]", rounded: "rounded-[2px]" },
  md: { box: "w-2.5 h-2.5 sm:w-[10.5px] sm:h-[10.5px]", label: "h-2.5 sm:h-[10.5px]", rounded: "rounded-[2px] sm:rounded-[2.5px]" },
  lg: { box: "w-4 h-4 sm:w-4 sm:h-4", label: "h-4 sm:h-4", rounded: "rounded-[3px] sm:rounded-[3.5px]" },
} as const;

export const THEME_LEVEL_CLASSES: Record<GithubActivityTheme, Record<0 | 1 | 2 | 3 | 4, string>> = {
  github: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-emerald-200 dark:bg-[#0e4429] border-emerald-300 dark:border-[#0e4429]", 2: "bg-emerald-400 dark:bg-[#006d32] border-emerald-500 dark:border-[#006d32]", 3: "bg-emerald-500 dark:bg-[#26a641] border-emerald-600 dark:border-[#26a641]", 4: "bg-emerald-600 dark:bg-[#39d353] border-emerald-700 dark:border-[#39d353]" },
  emerald: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-emerald-200 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-900", 2: "bg-emerald-400 dark:bg-emerald-800 border-emerald-500 dark:border-emerald-700", 3: "bg-emerald-500 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-500", 4: "bg-emerald-600 dark:bg-emerald-400 border-emerald-700 dark:border-emerald-300" },
  cyan: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-cyan-200 dark:bg-cyan-950/80 border-cyan-300 dark:border-cyan-900", 2: "bg-cyan-400 dark:bg-cyan-800 border-cyan-500 dark:border-cyan-700", 3: "bg-cyan-500 dark:bg-cyan-600 border-cyan-600 dark:border-cyan-500", 4: "bg-cyan-600 dark:bg-cyan-400 border-cyan-700 dark:border-cyan-300" },
  amber: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-amber-200 dark:bg-amber-950/80 border-amber-300 dark:border-amber-900", 2: "bg-amber-400 dark:bg-amber-800 border-amber-500 dark:border-amber-700", 3: "bg-amber-500 dark:bg-amber-600 border-amber-600 dark:border-amber-500", 4: "bg-amber-600 dark:bg-amber-400 border-amber-700 dark:border-amber-300" },
  rose: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-rose-200 dark:bg-rose-950/80 border-rose-300 dark:border-rose-900", 2: "bg-rose-400 dark:bg-rose-800 border-rose-500 dark:border-rose-700", 3: "bg-rose-500 dark:bg-rose-600 border-rose-600 dark:border-rose-500", 4: "bg-rose-600 dark:bg-rose-400 border-rose-700 dark:border-rose-300" },
  purple: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-purple-200 dark:bg-purple-950/80 border-purple-300 dark:border-purple-900", 2: "bg-purple-400 dark:bg-purple-800 border-purple-500 dark:border-purple-700", 3: "bg-purple-500 dark:bg-purple-600 border-purple-600 dark:border-purple-500", 4: "bg-purple-600 dark:bg-purple-400 border-purple-700 dark:border-purple-300" },
  monochrome: { 0: "bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/40 dark:border-zinc-700/40", 1: "bg-zinc-300 dark:bg-zinc-700 border-zinc-400 dark:border-zinc-600", 2: "bg-zinc-400 dark:bg-zinc-500 border-zinc-500 dark:border-zinc-400", 3: "bg-zinc-600 dark:bg-zinc-400 border-zinc-700 dark:border-zinc-300", 4: "bg-zinc-900 dark:bg-zinc-100 border-zinc-950 dark:border-white" },
};

export const KNOWN_USER_PROFILES: Record<string, Partial<GithubUserProfile>> = {
  octocat: { username: "octocat", name: "The Octocat", avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", bio: "GitHub mascot & open source champion • San Francisco", company: "@github", location: "San Francisco", followers: 18500, publicRepos: 8 },
  dkhandelwal2: { username: "dkhandelwal2", name: "Deepak Khandelwal", avatarUrl: "https://avatars.githubusercontent.com/dkhandelwal2", bio: "Sr. Frontend Engineer", location: "India", followers: 42, publicRepos: 18 },
  shadcn: { username: "shadcn", name: "shadcn", avatarUrl: "https://avatars.githubusercontent.com/shadcn", bio: "I own a computer.", location: "San Francisco, CA", followers: 125000, publicRepos: 24 },
  torvalds: { username: "torvalds", name: "Linus Torvalds", avatarUrl: "https://avatars.githubusercontent.com/torvalds", bio: "Creator of Linux & Git • Linux Foundation", company: "Linux Foundation", location: "Portland, OR", followers: 240000, publicRepos: 6 },
};

export const DEFAULT_MOCK_USER: GithubUserProfile = {
  username: "octocat", name: "The Octocat", avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  bio: "GitHub mascot & open source champion • San Francisco", company: "@github", location: "San Francisco",
  profileUrl: "https://github.com/octocat", followers: 18500, following: 9, publicRepos: 8, createdAt: "2011-01-25T00:00:00Z",
};

export const DEFAULT_MOCK_STATS: GithubActivityStatsData = {
  totalContributions: 1428, currentStreak: 18, longestStreak: 47,
  commitsCount: 1042, prsCount: 164, issuesCount: 78, reviewsCount: 144, activeDaysCount: 238,
};

export const DEFAULT_MOCK_EVENTS: GithubActivityEvent[] = [
  { id: "evt-1", type: "commit", repo: "intense-ui/components", message: "feat(github-activity): add responsive contribution matrix and streak stats", timestamp: "12m ago", sha: "7f8b91a", branch: "main", additions: 384, deletions: 42 },
  { id: "evt-2", type: "pull_request", repo: "intense-ui/core", message: "feat: introduce glassmorphic interactive audio waveform component", timestamp: "2h ago", prNumber: 142, status: "merged", additions: 890, deletions: 120 },
  { id: "evt-3", type: "commit", repo: "intense-ui/components", message: "fix(a11y): improve keyboard navigation and ARIA landmarks", timestamp: "4h ago", sha: "3c4d5e6", branch: "main", additions: 24, deletions: 11 },
  { id: "evt-4", type: "release", repo: "intense-ui/cli", message: "Release v0.4.0 — Zero-config registry installation pipeline", timestamp: "1d ago", branch: "v0.4.0" },
  { id: "evt-5", type: "issue", repo: "shadcn/ui", message: "RFC: Built-in support for spring-driven interactive bento cards", timestamp: "2d ago", issueNumber: 4210, status: "open" },
  { id: "evt-6", type: "star", repo: "tailwindlabs/tailwindcss", message: "Starred repository tailwindlabs/tailwindcss", timestamp: "3d ago" },
];

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

export function generateMockContributions(weeks = 52, seedKey = "octocat", year?: number, fullYear?: boolean): GithubContributionDay[] {
  const days: GithubContributionDay[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const targetYear = year ?? currentYear;
  const isFull = targetYear < currentYear ? true : (fullYear !== undefined ? fullYear : (year !== undefined && year !== null));

  if (isFull) {
    const jan1 = new Date(targetYear, 0, 1);
    const startSun = new Date(targetYear, 0, 1 - jan1.getDay());
    const dec31 = new Date(targetYear, 11, 31);
    const endSat = new Date(targetYear, 11, 31 + (6 - dec31.getDay()));
    const totalDays = Math.round((endSat.getTime() - startSun.getTime()) / 86400000) + 1;
    const todayStr = `${currentYear}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const userHash = hashSeed(`${seedKey}-${targetYear}`);

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startSun.getFullYear(), startSun.getMonth(), startSun.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dt = String(d.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dt}`;

      if (y !== targetYear) {
        days.push({ date: dateStr, count: 0, level: 0, isFuture: true });
        continue;
      }

      const isFutureDate = targetYear >= currentYear && dateStr > todayStr;
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (!isFutureDate) {
        const seed = (i * 17 + (i % 7) * 31 + userHash) % 100;
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const threshold = isWeekend ? 65 : 30;

        if (seed > threshold) {
          if (seed > 90) { count = Math.floor(10 + (seed % 8)); level = 4; }
          else if (seed > 75) { count = Math.floor(6 + (seed % 4)); level = 3; }
          else if (seed > 50) { count = Math.floor(3 + (seed % 3)); level = 2; }
          else { count = Math.floor(1 + (seed % 2)); level = 1; }
        }
      }

      days.push({ date: dateStr, count, level, isFuture: isFutureDate });
    }
  } else {
    const totalDays = weeks * 7;
    const todayStr = `${currentYear}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const userHash = hashSeed(`${seedKey}-current`);
    const endSat = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
    const startSun = new Date(endSat.getFullYear(), endSat.getMonth(), endSat.getDate() - (totalDays - 1));

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startSun.getFullYear(), startSun.getMonth(), startSun.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dt = String(d.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dt}`;

      const isFuture = dateStr > todayStr;
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (!isFuture) {
        const seed = (i * 17 + (i % 7) * 31 + userHash) % 100;
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const threshold = isWeekend ? 65 : 30;

        if (seed > threshold) {
          if (seed > 90) { count = Math.floor(10 + (seed % 8)); level = 4; }
          else if (seed > 75) { count = Math.floor(6 + (seed % 4)); level = 3; }
          else if (seed > 50) { count = Math.floor(3 + (seed % 3)); level = 2; }
          else { count = Math.floor(1 + (seed % 2)); level = 1; }
        }
      }

      days.push({ date: dateStr, count, level, isFuture: isFuture || undefined });
    }
  }

  return days;
}

export function generateUserStats(username: string, repos = 0): GithubActivityStatsData {
  const hash = hashSeed(username);
  const total = repos > 0 ? repos * 22 + (hash % 150) : 340 + (hash % 1100);
  const cW = 55 + (hash % 28);
  const pW = 8 + ((hash >> 3) % 18);
  const iW = 4 + ((hash >> 6) % 12);
  const rW = 2 + ((hash >> 9) % 10);
  const wSum = cW + pW + iW + rW;
  const commits = Math.round((cW / wSum) * total);
  const prs = Math.round((pW / wSum) * total);
  const issues = Math.round((iW / wSum) * total);
  const reviews = Math.max(0, total - commits - prs - issues);

  return {
    totalContributions: total,
    currentStreak: (hash % 14) + 1,
    longestStreak: (hash % 38) + 14,
    commitsCount: commits,
    prsCount: prs,
    issuesCount: issues,
    reviewsCount: reviews,
    activeDaysCount: Math.round(total * 0.42),
  };
}

export function generateUserEvents(username: string): GithubActivityEvent[] {
  const clean = username.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase() || "user";
  const hash = hashSeed(username);
  const sha1 = (hash * 13).toString(16).slice(0, 7).padStart(7, "0");
  const sha2 = (hash * 29).toString(16).slice(0, 7).padStart(7, "0");

  return [
    { id: `ev-${clean}-1`, type: "commit", repo: `${clean}/core`, message: "feat: performance optimizations and clean state dispatchers", timestamp: "3h ago", sha: sha1, branch: "main", additions: 142, deletions: 18 },
    { id: `ev-${clean}-2`, type: "pull_request", repo: `${clean}/ui`, message: "refactor: streamline animation hooks and responsive containers", timestamp: "1d ago", prNumber: (hash % 90) + 1, status: "merged", additions: 320, deletions: 45 },
    { id: `ev-${clean}-3`, type: "commit", repo: `${clean}/web`, message: "fix: prevent unnecessary re-renders in dynamic interactive canvas", timestamp: "2d ago", sha: sha2, branch: "main", additions: 18, deletions: 6 },
    { id: `ev-${clean}-4`, type: "issue", repo: `${clean}/docs`, message: "Docs: comprehensive guide for custom component integrations", timestamp: "4d ago", issueNumber: (hash % 30) + 1, status: "open" },
    { id: `ev-${clean}-5`, type: "release", repo: `${clean}/core`, message: "Release v1.2.0 — Production-grade stability and accessibility", timestamp: "1w ago", branch: "v1.2.0" },
    { id: `ev-${clean}-6`, type: "star", repo: "tailwindlabs/tailwindcss", message: "Starred repository tailwindlabs/tailwindcss", timestamp: "2w ago" },
  ];
}
