"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GITHUB_ENDPOINTS } from "@/config/site";
import type {
  UseGithubActivityOptions, UseGithubActivityResult, GithubContributionDay,
  GithubActivityEvent, GithubActivityStatsData, GithubUserProfile,
} from "@/components/ui/github-activity";
import {
  DEFAULT_MOCK_USER, generateMockContributions,
  generateUserStats, generateUserEvents,
} from "@/components/ui/github-activity/constants";
import {
  resolveUserInitial, resolveUserBio, parseRawEvents, parseDirectCommits,
  mergeGithubEvents, generateUserYears,
} from "@/components/ui/github-activity/github-activity-helpers";

export function useGithubActivity(options: UseGithubActivityOptions = {}): UseGithubActivityResult {
  const { username, repo, initialData, autoFetch = true, year, showFullYear } = options;
  const cleanUsername = (username || DEFAULT_MOCK_USER.username).trim();
  const isDefaultUser = !username || cleanUsername.toLowerCase() === DEFAULT_MOCK_USER.username.toLowerCase();
  const initialUser = initialData?.user || resolveUserInitial(cleanUsername);

  const [selectedYear, setRawSelectedYear] = useState<number>(() => year || new Date().getFullYear());
  const [userSwitchedYear, setUserSwitchedYear] = useState<boolean>(false);
  const isFullYear = showFullYear !== undefined ? showFullYear : (userSwitchedYear || year !== undefined);

  const setSelectedYear = useCallback((y: number) => { setUserSwitchedYear(true); setRawSelectedYear(y); }, []);
  const [availableYears, setAvailableYears] = useState<number[]>(() => generateUserYears(initialUser.createdAt));
  const [contributions, setContributions] = useState<GithubContributionDay[]>(() => initialData?.contributions || generateMockContributions(52, cleanUsername, selectedYear, isFullYear));
  const [events, setEvents] = useState<GithubActivityEvent[]>(() => initialData?.events || generateUserEvents(cleanUsername));
  const [stats, setStats] = useState<GithubActivityStatsData>(() => initialData?.stats || generateUserStats(cleanUsername));
  const [user, setUser] = useState<GithubUserProfile>(() => initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(() => !initialData && !isDefaultUser);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, { user?: GithubUserProfile; contributions: GithubContributionDay[]; events: GithubActivityEvent[]; stats: GithubActivityStatsData; availableYears?: number[] }>>({});
  const fetchIdRef = useRef<number>(0);

  const prevYearRef = useRef(year);
  useEffect(() => {
    if (year !== undefined && year !== prevYearRef.current) {
      prevYearRef.current = year; setSelectedYear(year);
      const cacheKey = `${cleanUsername}-${year || "current"}`;
      if (!isDefaultUser && !cacheRef.current[cacheKey]) setIsLoading(true);
    }
  }, [year, isDefaultUser, cleanUsername, setSelectedYear]);

  const prevUserRef = useRef(cleanUsername);
  const prevSelectedYearRef = useRef(selectedYear);

  useEffect(() => {
    if (initialData) return;
    const userChanged = cleanUsername !== prevUserRef.current;
    const yearChanged = selectedYear !== prevSelectedYearRef.current;
    prevUserRef.current = cleanUsername; prevSelectedYearRef.current = selectedYear;

    if (userChanged || yearChanged) {
      const cacheKey = `${cleanUsername}-${selectedYear || "current"}`;
      if (!isDefaultUser) {
        if (userChanged) setUser(resolveUserInitial(cleanUsername));
        if (!cacheRef.current[cacheKey]) setIsLoading(true);
      } else {
        const defUser = resolveUserInitial(cleanUsername);
        const mock = generateMockContributions(52, cleanUsername, selectedYear, isFullYear);
        setUser(defUser); setAvailableYears(generateUserYears(defUser.createdAt));
        setContributions(mock); setEvents(generateUserEvents(cleanUsername));
        setStats({ ...generateUserStats(cleanUsername), totalContributions: mock.reduce((a, b) => a + b.count, 0) });
        setIsLoading(false);
      }
    }
  }, [cleanUsername, selectedYear, initialData, isDefaultUser, isFullYear]);

  const fetchGithubData = useCallback(async () => {
    if (isDefaultUser) { setIsLoading(false); return; }
    const cacheKey = `${cleanUsername}-${selectedYear || "current"}`;
    const cached = cacheRef.current[cacheKey];
    if (cached) {
      setContributions(cached.contributions); setEvents(cached.events);
      setStats(cached.stats); if (cached.user) setUser(cached.user);
      if (cached.availableYears) setAvailableYears(cached.availableYears);
      setIsLoading(false); return;
    }

    const currentFetchId = ++fetchIdRef.current;
    setIsLoading(true); setError(null);
    let nextUser: GithubUserProfile | undefined;
    let nextYears: number[] | undefined;
    let nextDays: GithubContributionDay[] = [];
    let nextStats: GithubActivityStatsData | undefined;
    let nextEvents: GithubActivityEvent[] = [];

    try {
      const uRes = await fetch(GITHUB_ENDPOINTS.getUserApiUrl(cleanUsername), { headers: { Accept: "application/vnd.github.v3+json" } }).catch(() => null);
      if (currentFetchId !== fetchIdRef.current) return;
      if (uRes && uRes.ok) {
        const u = await uRes.json();
        const bio = resolveUserBio({ bio: u.bio, company: u.company, location: u.location, public_repos: u.public_repos, followers: u.followers, username: u.login });
        nextUser = {
          username: u.login || cleanUsername, name: u.name || u.login || cleanUsername,
          avatarUrl: u.avatar_url || GITHUB_ENDPOINTS.getUserAvatarUrl(cleanUsername), bio, company: u.company, location: u.location,
          profileUrl: u.html_url || GITHUB_ENDPOINTS.getUserProfileUrl(cleanUsername), followers: u.followers || 0, following: u.following || 0, publicRepos: u.public_repos || 0, createdAt: u.created_at,
        };
        setUser(nextUser);
        if (u.created_at) { nextYears = generateUserYears(u.created_at); setAvailableYears(nextYears); }
      }

      try {
        const targetApiYear = selectedYear !== new Date().getFullYear() ? selectedYear : undefined;
        const cRes = await fetch(GITHUB_ENDPOINTS.getUserContributionsUrl(cleanUsername, targetApiYear));
        if (currentFetchId !== fetchIdRef.current) return;
        if (cRes.ok) {
          const cData = await cRes.json();
          if (cData?.total && typeof cData.total === "object") {
            const detected = Object.keys(cData.total).filter((k) => /^\d{4}$/.test(k)).map(Number);
            nextYears = Array.from(new Set([...(nextYears || []), ...detected])).sort((a, b) => b - a);
            if (nextYears.length > 0) setAvailableYears(nextYears);
          }
          if (Array.isArray(cData?.contributions) && cData.contributions.length > 0) {
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
            nextDays = cData.contributions.map((d: any) => ({
              date: String(d.date), count: Number(d.count || 0), level: Math.min(4, Math.max(0, Number(d.level || 0))) as 0 | 1 | 2 | 3 | 4,
              isFuture: String(d.date) > todayStr || undefined,
            }));
            setContributions(nextDays);
            const total = Number(cData?.total?.[String(selectedYear)] ?? cData?.total?.lastYear ?? nextDays.reduce((a: number, b: any) => a + b.count, 0));
            setStats((prev) => { nextStats = { ...prev, totalContributions: total }; return nextStats; });
          }
        }
      } catch {
        // Fallback silently if contributions API fails
      }

      const targetRepo = repo || (cleanUsername.toLowerCase() === "dkhandelwal2" ? "dkhandelwal2/intense-ui" : undefined);
      const [eRes, repoCommitsRes] = await Promise.all([
        fetch(GITHUB_ENDPOINTS.getUserEventsUrl(cleanUsername, 30), { headers: { Accept: "application/vnd.github.v3+json" } }).catch(() => null),
        targetRepo ? fetch(GITHUB_ENDPOINTS.getRepoCommitsUrl(targetRepo, cleanUsername, 15), { headers: { Accept: "application/vnd.github.v3+json" } }).catch(() => null) : Promise.resolve(null),
      ]);

      if (currentFetchId !== fetchIdRef.current) return;

      let parsed: GithubActivityEvent[] = [];
      let commits = 0; let prs = 0; let issues = 0; let reviews = 0;
      if (eRes && eRes.ok) {
        const evData = await eRes.json();
        if (Array.isArray(evData) && evData.length > 0) {
          const res = parseRawEvents(evData);
          parsed = res.events; commits = res.commits; prs = res.prs; issues = res.issues; reviews = res.reviews;
        }
      }

      let directCommits: GithubActivityEvent[] = [];
      if (repoCommitsRes && repoCommitsRes.ok) {
        const cData = await repoCommitsRes.json();
        if (Array.isArray(cData) && cData.length > 0) directCommits = parseDirectCommits(cData, targetRepo!);
      }

      const merged = mergeGithubEvents(directCommits, parsed);
      if (merged.length > 0) {
        nextEvents = merged; setEvents(merged);
        const effCommits = Math.max(commits, directCommits.length);
        const totalEv = effCommits + prs + issues + reviews;
        if (totalEv > 0) {
          setStats((prev) => {
            const total = prev.totalContributions || totalEv;
            nextStats = {
              ...prev, commitsCount: Math.max(effCommits, Math.round(total * (effCommits / totalEv))),
              prsCount: Math.max(prs, Math.round(total * (prs / totalEv))),
              issuesCount: Math.max(issues, Math.round(total * (issues / totalEv))),
              reviewsCount: Math.max(reviews, Math.round(total * (reviews / totalEv))),
            };
            return nextStats;
          });
        }
      }

      if (nextDays.length > 0 || nextEvents.length > 0) {
        cacheRef.current[cacheKey] = {
          user: nextUser, contributions: nextDays.length > 0 ? nextDays : contributions,
          events: nextEvents.length > 0 ? nextEvents : events, stats: nextStats || stats, availableYears: nextYears,
        };
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "GitHub fetch error");
    } finally {
      if (currentFetchId === fetchIdRef.current) setIsLoading(false);
    }
  }, [cleanUsername, selectedYear, isDefaultUser, repo]);

  useEffect(() => {
    if (!username || !autoFetch) return;
    const timer = setTimeout(() => { fetchGithubData(); }, 200);
    return () => clearTimeout(timer);
  }, [cleanUsername, autoFetch, fetchGithubData, username, selectedYear]);

  const refetch = useCallback(async () => { await fetchGithubData(); }, [fetchGithubData]);
  return { contributions, events, stats, user, isLoading, error, refetch, selectedYear, setSelectedYear, availableYears };
}
