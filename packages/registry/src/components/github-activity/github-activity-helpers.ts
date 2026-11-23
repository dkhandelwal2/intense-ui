import { GITHUB_ENDPOINTS } from "@/config/site";
import type { GithubActivityEvent, GithubUserProfile, GithubEventStatus } from "./types";
import { DEFAULT_MOCK_USER, KNOWN_USER_PROFILES } from "./constants";

export { buildContributionMatrix } from "./github-activity-matrix";

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
  const start = Math.min(createdAt ? new Date(createdAt).getFullYear() : currentYear - 5, currentYear);
  return Array.from({ length: currentYear - start + 1 }, (_, i) => currentYear - i);
}

export function resolveUserBio(u: {
  bio?: string | null; company?: string | null; location?: string | null;
  publicRepos?: number; public_repos?: number; followers?: number; username?: string; login?: string;
}): string {
  if (u.bio && u.bio.trim()) return u.bio.trim().replace(/\r?\n+/g, " ");
  const parts = [u.company?.trim().replace(/^@/, ""), u.location?.trim()].filter(Boolean) as string[];
  if (parts.length > 0) return parts.join(" • ");
  const repos = u.publicRepos ?? u.public_repos;
  if (repos !== undefined && repos > 0) {
    return `${repos} public repo${repos === 1 ? "" : "s"}${u.followers ? ` • ${u.followers.toLocaleString()} followers` : ""}`;
  }
  const handle = u.username || u.login;
  return handle ? `@${handle} on GitHub` : "Open source contributor";
}

export function resolveUserInitial(username?: string): GithubUserProfile {
  const resolved = (username || DEFAULT_MOCK_USER.username).trim();
  const lower = resolved.toLowerCase();
  const known = KNOWN_USER_PROFILES[lower];
  if (known) {
    return {
      ...DEFAULT_MOCK_USER, ...known, username: resolved,
      profileUrl: GITHUB_ENDPOINTS.getUserProfileUrl(resolved),
    } as GithubUserProfile;
  }
  const isMock = !username || resolved === DEFAULT_MOCK_USER.username;
  return {
    ...DEFAULT_MOCK_USER,
    username: resolved, name: isMock ? DEFAULT_MOCK_USER.name : resolved,
    avatarUrl: isMock ? DEFAULT_MOCK_USER.avatarUrl : GITHUB_ENDPOINTS.getUserAvatarUrl(resolved),
    profileUrl: GITHUB_ENDPOINTS.getUserProfileUrl(resolved),
    bio: isMock ? DEFAULT_MOCK_USER.bio : `@${resolved} on GitHub`,
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
  for (const item of (Array.isArray(rawList) ? rawList : [])) {
    if (!item || typeof item !== "object") continue;
    const t = String((item as Record<string, any>).type || "");
    const payload = (item as Record<string, any>).payload || {};
    if (t === "PushEvent") {
      commits += Array.isArray(payload.commits) && payload.commits.length > 0 ? payload.commits.length : Number(payload.size || 1);
    } else if (t === "PullRequestEvent") prs++;
    else if (t === "IssuesEvent" || t === "IssueCommentEvent") issues++;
    else if (t === "PullRequestReviewEvent" || t === "PullRequestReviewCommentEvent") reviews++;
  }

  const sortedRawList = Array.isArray(rawList)
    ? [...rawList].sort((a: any, b: any) => (b?.created_at ? new Date(b.created_at).getTime() : 0) - (a?.created_at ? new Date(a.created_at).getTime() : 0))
    : [];

  const events: GithubActivityEvent[] = [];

  for (let idx = 0; idx < sortedRawList.length; idx++) {
    const ev = (sortedRawList[idx] && typeof sortedRawList[idx] === "object") ? (sortedRawList[idx] as Record<string, any>) : {};
    const t = String(ev.type || ""); const payload = ev.payload || {};
    const repoName = String(ev.repo?.name || "github/repo"); const seed = Math.abs(Number(ev.id) || idx + 1);

    if (t === "PushEvent") {
      const branch = payload.ref ? String(payload.ref).replace(/^refs\/(heads|tags)\//, "") : "main";
      const rawCommits = Array.isArray(payload.commits) ? payload.commits : [];
      if (rawCommits.length > 0) {
        for (let cIdx = rawCommits.length - 1; cIdx >= 0; cIdx--) {
          const c = rawCommits[cIdx];
          const cSha = c?.sha ? String(c.sha).substring(0, 7) : undefined;
          const additions = ((seed + cIdx) % 42) + 14;
          events.push({
            id: `ev-${ev.id || idx}-${cSha || cIdx}`, type: "commit", repo: repoName,
            message: c?.message ? String(c.message).split("\n")[0] : `Pushed changes to ${branch}`,
            timestamp: formatRelativeTime(ev.created_at), createdAt: ev.created_at, sha: cSha, branch,
            additions, deletions: Math.round(additions * 0.22) + ((seed + cIdx) % 5),
            url: cSha ? `https://github.com/${repoName}/commit/${cSha}` : undefined,
          });
        }
      } else {
        const rawSha = payload.head;
        const sha = rawSha ? String(rawSha).substring(0, 7) : (seed * 17).toString(16).slice(0, 7).padStart(7, "0");
        const size = Number(payload.size || 1);
        const additions = size * ((seed % 42) + 14);
        events.push({
          id: String(ev.id || `ev-${idx}`), type: "commit", repo: repoName,
          message: `Pushed ${size > 1 ? `${size} commits` : "changes"} to ${branch}`,
          timestamp: formatRelativeTime(ev.created_at), createdAt: ev.created_at, sha, branch,
          additions, deletions: Math.round(additions * 0.22) + (seed % 5),
          url: sha ? `https://github.com/${repoName}/commit/${sha}` : undefined,
        });
      }
      continue;
    }

    let type: GithubActivityEvent["type"] = "commit";
    let branch: string | undefined; let status: GithubEventStatus | undefined;
    let prNumber: number | undefined; let issueNumber: number | undefined;
    let additions: number | undefined; let deletions: number | undefined;

    if (t === "PullRequestEvent") {
      type = "pull_request"; branch = payload.pull_request?.head?.ref || "main";
      status = payload.pull_request?.merged ? "merged" : (payload.pull_request?.state === "closed" ? "closed" : "open");
      prNumber = payload.pull_request?.number ? Number(payload.pull_request.number) : undefined;
      additions = payload.pull_request?.additions ?? ((seed % 140) + 25);
      deletions = payload.pull_request?.deletions ?? ((seed % 35) + 6);
    } else if (t === "IssuesEvent") {
      type = "issue"; status = payload.issue?.state === "closed" ? "closed" : "open";
      issueNumber = payload.issue?.number ? Number(payload.issue.number) : undefined;
    } else if (t === "ReleaseEvent") {
      type = "release"; branch = payload.release?.tag_name || "v1.0.0";
    } else if (t === "WatchEvent") {
      type = "star";
    }

    const message = t === "PullRequestEvent" ? String(payload.pull_request?.title || `PR #${prNumber || ""}`)
      : t === "IssuesEvent" ? String(payload.issue?.title || `Issue #${issueNumber || ""}`)
      : t === "ReleaseEvent" ? String(payload.release?.name || payload.release?.tag_name || `Release in ${repoName}`)
      : t === "WatchEvent" ? `Starred ${repoName}` : `Activity in ${repoName}`;

    events.push({
      id: String(ev.id || `ev-${idx}`), type, repo: repoName, message,
      timestamp: formatRelativeTime(ev.created_at), createdAt: ev.created_at,
      branch, status, prNumber, issueNumber, additions, deletions,
      url: payload.pull_request?.html_url || undefined,
    });
  }

  return { events: events.slice(0, 30), commits, prs, issues, reviews };
}

export function parseDirectCommits(rawCommits: unknown[], repoName: string): GithubActivityEvent[] {
  if (!Array.isArray(rawCommits)) return [];
  return rawCommits.filter(Boolean).map((c: any, idx: number) => {
    const rawSha = String(c.sha || "");
    const sha = rawSha ? rawSha.substring(0, 7) : `commit-${idx}`;
    const dateStr = c.commit?.author?.date || c.commit?.committer?.date;
    const msg = (c.commit?.message || "Commit").split("\n")[0];
    const seed = Math.abs(parseInt(sha, 16) || idx + 1);
    const additions = (seed % 45) + 15;
    return {
      id: `commit-${sha}`, type: "commit" as const, repo: repoName, message: msg,
      timestamp: formatRelativeTime(dateStr), createdAt: dateStr, sha, branch: "main",
      additions, deletions: Math.round(additions * 0.25) + (seed % 6),
      url: c.html_url || `https://github.com/${repoName}/commit/${sha}`,
    };
  });
}

export function mergeGithubEvents(
  directCommits: GithubActivityEvent[],
  parsedEvents: GithubActivityEvent[]
): GithubActivityEvent[] {
  const seenShas = new Set<string>();
  const merged: GithubActivityEvent[] = [];

  for (const c of directCommits) {
    if (c.sha) seenShas.add(c.sha.toLowerCase());
    merged.push(c);
  }

  for (const ev of parsedEvents) {
    if (ev.sha && seenShas.has(ev.sha.toLowerCase())) continue;
    merged.push(ev);
  }

  return merged.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
}
