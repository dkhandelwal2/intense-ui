import { GITHUB_ENDPOINTS } from "@/config/site";
import type { GithubActivityEvent, GithubUserProfile, GithubEventStatus, GithubContributionDay } from "./types";
import { DEFAULT_MOCK_USER, MONTH_LABELS } from "./constants";

export function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return "recently";
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return "just now";
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function generateUserYears(createdAt?: string, currentYear = new Date().getFullYear()): number[] {
  const startYear = createdAt ? new Date(createdAt).getFullYear() : currentYear - 5;
  const validStart = Math.min(startYear, currentYear);
  const years: number[] = [];
  for (let y = currentYear; y >= validStart; y--) {
    years.push(y);
  }
  return years;
}

export function resolveUserInitial(username?: string): GithubUserProfile {
  const resolved = (username || DEFAULT_MOCK_USER.username).trim();
  const isMock = !username || resolved === DEFAULT_MOCK_USER.username;
  return {
    ...DEFAULT_MOCK_USER,
    username: resolved,
    name: isMock ? DEFAULT_MOCK_USER.name : resolved,
    avatarUrl: isMock ? DEFAULT_MOCK_USER.avatarUrl : GITHUB_ENDPOINTS.getUserAvatarUrl(resolved),
    profileUrl: GITHUB_ENDPOINTS.getUserProfileUrl(resolved),
    bio: isMock ? DEFAULT_MOCK_USER.bio : `GitHub contributor @${resolved}`,
    createdAt: isMock ? DEFAULT_MOCK_USER.createdAt : undefined,
  };
}

export function parseRawEvents(rawList: unknown[]): {
  events: GithubActivityEvent[];
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
} {
  let commits = 0; let prs = 0; let issues = 0; let reviews = 0;
  for (const item of rawList) {
    if (!item || typeof item !== "object") continue;
    const t = String((item as Record<string, any>).type || "");
    if (t === "PushEvent") commits++;
    else if (t === "PullRequestEvent") prs++;
    else if (t === "IssuesEvent" || t === "IssueCommentEvent") issues++;
    else if (t === "PullRequestReviewEvent" || t === "PullRequestReviewCommentEvent") reviews++;
  }

  const events: GithubActivityEvent[] = rawList.slice(0, 15).map((item, idx) => {
    const ev = (item && typeof item === "object") ? (item as Record<string, any>) : {};
    const t = String(ev.type || "");
    const payload = ev.payload || {};
    const repoName = String(ev.repo?.name || "github/repo");
    const seed = Math.abs(Number(ev.id) || idx + 1);

    let type: GithubActivityEvent["type"] = "commit";
    let sha: string | undefined; let branch: string | undefined;
    let status: GithubEventStatus | undefined;
    let prNumber: number | undefined; let issueNumber: number | undefined;
    let additions: number | undefined; let deletions: number | undefined;

    if (t === "PushEvent") {
      type = "commit";
      branch = payload.ref ? String(payload.ref).replace(/^refs\/(heads|tags)\//, "") : "main";
      const rawSha = (payload.commits || [])[0]?.sha || payload.head;
      sha = rawSha ? String(rawSha).substring(0, 7) : (seed * 17).toString(16).slice(0, 7).padStart(7, "0");
      const size = Number(payload.size || (payload.commits?.length) || 1);
      additions = size * ((seed % 42) + 14);
      deletions = Math.round(additions * 0.22) + (seed % 5);
    } else if (t === "PullRequestEvent") {
      type = "pull_request";
      branch = payload.pull_request?.head?.ref || "main";
      status = payload.pull_request?.merged ? "merged" : (payload.pull_request?.state === "closed" ? "closed" : "open");
      prNumber = payload.pull_request?.number ? Number(payload.pull_request.number) : undefined;
      additions = payload.pull_request?.additions ?? ((seed % 140) + 25);
      deletions = payload.pull_request?.deletions ?? ((seed % 35) + 6);
    } else if (t === "IssuesEvent") {
      type = "issue";
      status = payload.issue?.state === "closed" ? "closed" : "open";
      issueNumber = payload.issue?.number ? Number(payload.issue.number) : undefined;
    } else if (t === "ReleaseEvent") {
      type = "release"; branch = payload.release?.tag_name || "v1.0.0";
    } else if (t === "WatchEvent") {
      type = "star";
    }

    const commitMsg = (payload.commits || [])[0]?.message;
    const message = t === "PushEvent"
      ? (commitMsg || (branch ? `Pushed ${payload.size ? `${payload.size} commit${payload.size > 1 ? "s" : ""}` : "changes"} to ${branch}` : `Pushed to ${repoName}`))
      : t === "PullRequestEvent" ? String(payload.pull_request?.title || `PR #${prNumber || ""}`)
      : t === "IssuesEvent" ? String(payload.issue?.title || `Issue #${issueNumber || ""}`)
      : t === "ReleaseEvent" ? String(payload.release?.name || payload.release?.tag_name || `Release in ${repoName}`)
      : t === "WatchEvent" ? `Starred ${repoName}` : `Activity in ${repoName}`;

    return {
      id: String(ev.id || `ev-${idx}`), type, repo: repoName, message,
      timestamp: formatRelativeTime(ev.created_at), sha, branch, status,
      prNumber, issueNumber, additions, deletions,
      url: payload.pull_request?.html_url || (repoName && sha ? `https://github.com/${repoName}/commit/${sha}` : undefined),
    };
  });

  return { events, commits, prs, issues, reviews };
}

export function buildContributionMatrix(
  contributions: GithubContributionDay[],
  isFullYear: boolean,
  effectiveYear: number,
  weeksCount: number,
  showMonthLabels = true
): {
  weeks: GithubContributionDay[][];
  monthPositions: { label: string; weekIndex: number }[];
  totalContributions: number;
} {
  if (!isFullYear && contributions.length > 0 && contributions.length <= 7) {
    const sum = contributions.reduce((acc, d) => acc + (d.count || 0), 0);
    const m = contributions[0]?.date ? parseInt(contributions[0].date.slice(5, 7), 10) - 1 : -1;
    return { weeks: [contributions], monthPositions: showMonthLabels && m >= 0 ? [{ label: MONTH_LABELS[m], weekIndex: 0 }] : [], totalContributions: sum };
  }

  const dayMap = new Map<string, GithubContributionDay>();
  for (const d of contributions) if (d.date) dayMap.set(d.date, d);

  const now = new Date(), currentYear = now.getFullYear(), isPastYear = effectiveYear < currentYear;
  const safeWeeks = typeof weeksCount === "number" && !Number.isNaN(weeksCount) ? Math.max(1, Math.min(52, weeksCount)) : 52;
  const shouldRenderFullYear = isFullYear || (isPastYear && safeWeeks >= 52);
  const todayStr = `${currentYear}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  let startSun: Date, endSat: Date, numWeeks: number;

  if (shouldRenderFullYear) {
    const jan1 = new Date(effectiveYear, 0, 1), dec31 = new Date(effectiveYear, 11, 31);
    startSun = new Date(effectiveYear, 0, 1 - jan1.getDay());
    endSat = new Date(effectiveYear, 11, 31 + (6 - dec31.getDay()));
    numWeeks = Math.ceil((endSat.getTime() - startSun.getTime()) / (86400000 * 7));
  } else if (isPastYear) {
    const dec31 = new Date(effectiveYear, 11, 31);
    endSat = new Date(effectiveYear, 11, 31 + (6 - dec31.getDay()));
    numWeeks = safeWeeks;
    startSun = new Date(endSat.getFullYear(), endSat.getMonth(), endSat.getDate() - (numWeeks * 7 - 1));
  } else {
    endSat = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
    startSun = new Date(endSat.getFullYear(), endSat.getMonth(), endSat.getDate() - (safeWeeks * 7 - 1));
    numWeeks = safeWeeks;
  }

  const resultWeeks: GithubContributionDay[][] = [];
  const months: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1; let lastMonthWeek = -99;
  let sum = 0;

  for (let w = 0; w < numWeeks; w++) {
    const weekDays: GithubContributionDay[] = [];
    for (let r = 0; r < 7; r++) {
      const d = new Date(startSun.getFullYear(), startSun.getMonth(), startSun.getDate() + (w * 7 + r));
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dt = String(d.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dt}`;

      const existing = dayMap.get(dateStr);
      const isOutOfYear = shouldRenderFullYear && y !== effectiveYear;
      const isFuture = shouldRenderFullYear ? isOutOfYear : dateStr > todayStr;
      const count = existing ? existing.count : 0;
      const level = existing ? existing.level : 0;

      if (!isFuture && !isOutOfYear) sum += count;
      weekDays.push({ date: dateStr, count, level, isFuture: isFuture || isOutOfYear || undefined });
    }

    resultWeeks.push(weekDays);

    if (showMonthLabels) {
      const validDay = weekDays.find((d) => (shouldRenderFullYear ? d.date.startsWith(String(effectiveYear)) : true)) || weekDays[0];
      if (validDay?.date) {
        const m = parseInt(validDay.date.slice(5, 7), 10) - 1;
        if (m >= 0 && m < 12 && m !== lastMonth && (w - lastMonthWeek >= 2)) {
          months.push({ label: MONTH_LABELS[m], weekIndex: w });
          lastMonth = m; lastMonthWeek = w;
        }
      }
    }
  }

  return { weeks: resultWeeks, monthPositions: months, totalContributions: sum };
}
