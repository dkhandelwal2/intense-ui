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
import { resolveUserInitial, parseRawEvents, generateUserYears } from "@/components/ui/github-activity/github-activity-helpers";

export function useGithubActivity(options: UseGithubActivityOptions = {}): UseGithubActivityResult {
  const { username, initialData, autoFetch = true, year, showFullYear } = options;
  const cleanUsername = (username || DEFAULT_MOCK_USER.username).trim();
  const isDefaultUser = !username || cleanUsername === DEFAULT_MOCK_USER.username;
  const initialUser = initialData?.user || resolveUserInitial(username);

  const [selectedYear, setRawSelectedYear] = useState<number>(() => year || new Date().getFullYear());
  const [userSwitchedYear, setUserSwitchedYear] = useState<boolean>(false);
  const isFullYear = showFullYear !== undefined ? showFullYear : (userSwitchedYear || year !== undefined);

  const setSelectedYear = useCallback((y: number) => {
    setUserSwitchedYear(true);
    setRawSelectedYear(y);
  }, []);

  const [availableYears, setAvailableYears] = useState<number[]>(() => generateUserYears(initialUser.createdAt));
  const [contributions, setContributions] = useState<GithubContributionDay[]>(() => initialData?.contributions || generateMockContributions(52, cleanUsername, selectedYear, isFullYear));
  const [events, setEvents] = useState<GithubActivityEvent[]>(() => initialData?.events || generateUserEvents(cleanUsername));
  const [stats, setStats] = useState<GithubActivityStatsData>(() => initialData?.stats || generateUserStats(cleanUsername));
  const [user, setUser] = useState<GithubUserProfile>(() => initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(() => !initialData && !isDefaultUser);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, { user?: GithubUserProfile; contributions: GithubContributionDay[]; events: GithubActivityEvent[]; stats: GithubActivityStatsData; availableYears?: number[] }>>({});

  const prevYearRef = useRef(year);
  useEffect(() => {
    if (year !== undefined && year !== prevYearRef.current) {
      prevYearRef.current = year;
      setSelectedYear(year);
      const cacheKey = `${cleanUsername}-${year || "current"}`;
      if (!isDefaultUser && !cacheRef.current[cacheKey]) setIsLoading(true);
    }
  }, [year, isDefaultUser, cleanUsername]);

  const prevUserRef = useRef(cleanUsername);
  const prevSelectedYearRef = useRef(selectedYear);

  useEffect(() => {
    if (initialData) return;
    const userChanged = cleanUsername !== prevUserRef.current;
    const yearChanged = selectedYear !== prevSelectedYearRef.current;
    prevUserRef.current = cleanUsername;
    prevSelectedYearRef.current = selectedYear;

    if (userChanged || yearChanged) {
      const cacheKey = `${cleanUsername}-${selectedYear || "current"}`;
      if (!isDefaultUser) {
        if (!cacheRef.current[cacheKey]) setIsLoading(true);
      } else {
        const defUser = resolveUserInitial(cleanUsername);
        const mock = generateMockContributions(52, cleanUsername, selectedYear, isFullYear);
        setUser(defUser); setAvailableYears(generateUserYears(defUser.createdAt));
        setContributions(mock); setEvents(generateUserEvents(cleanUsername));
        setStats((prev) => ({ ...prev, totalContributions: mock.reduce((a, b) => a + b.count, 0) }));
        setIsLoading(false);
      }
    }
  }, [cleanUsername, selectedYear, initialData, isDefaultUser, isFullYear]);

  const fetchGithubData = useCallback(async (abortSignal?: AbortSignal) => {
    if (isDefaultUser) { setIsLoading(false); return; }
    const cacheKey = `${cleanUsername}-${selectedYear || "current"}`;
    const cached = cacheRef.current[cacheKey];
    if (cached) {
      setContributions(cached.contributions);
      setEvents(cached.events);
      setStats(cached.stats);
      if (cached.user) setUser(cached.user);
      if (cached.availableYears) setAvailableYears(cached.availableYears);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    let nextUser: GithubUserProfile | undefined;
    let nextYears: number[] | undefined;
    let nextDays: GithubContributionDay[] = [];
    let nextStats: GithubActivityStatsData | undefined;
    let nextEvents: GithubActivityEvent[] = [];

    try {
      const uRes = await fetch(GITHUB_ENDPOINTS.getUserApiUrl(cleanUsername), { signal: abortSignal, headers: { Accept: "application/vnd.github.v3+json" } });
      if (uRes.ok) {
        const u = await uRes.json();
        nextUser = {
          username: u.login, name: u.name || u.login,
          avatarUrl: u.avatar_url || GITHUB_ENDPOINTS.getUserAvatarUrl(cleanUsername),
          bio: u.bio || `Active contributor (${u.public_repos || 0} repos)`,
          profileUrl: u.html_url || GITHUB_ENDPOINTS.getUserProfileUrl(cleanUsername),
          followers: u.followers || 0, following: u.following || 0,
          publicRepos: u.public_repos || 0, createdAt: u.created_at,
        };
        setUser(nextUser);
        if (u.created_at) { nextYears = generateUserYears(u.created_at); setAvailableYears(nextYears); }
      }

      try {
        const targetApiYear = selectedYear !== new Date().getFullYear() ? selectedYear : undefined;
        const cRes = await fetch(GITHUB_ENDPOINTS.getUserContributionsUrl(cleanUsername, targetApiYear), { signal: abortSignal });
        if (cRes.ok) {
          const cData = await cRes.json();
          if (cData?.total && typeof cData.total === "object") {
            const detected = Object.keys(cData.total).filter((k) => /^\d{4}$/.test(k)).map(Number);
            nextYears = Array.from(new Set([...(nextYears || availableYears), ...detected])).sort((a, b) => b - a);
            setAvailableYears(nextYears);
          }
          if (Array.isArray(cData?.contributions) && cData.contributions.length > 0) {
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
            nextDays = cData.contributions.map((d: any) => ({
              date: String(d.date), count: Number(d.count || 0),
              level: Math.min(4, Math.max(0, Number(d.level || 0))) as 0 | 1 | 2 | 3 | 4,
              isFuture: String(d.date) > todayStr || undefined,
            }));
            setContributions(nextDays);
            const total = Number(cData?.total?.[String(selectedYear)] ?? cData?.total?.lastYear ?? nextDays.reduce((a: number, b: any) => a + b.count, 0));
            setStats((prev) => { nextStats = { ...prev, totalContributions: total }; return nextStats; });
          }
        } else {
          setContributions((prev) => (prev.length > 0 ? prev : generateMockContributions(52, cleanUsername, selectedYear, isFullYear)));
        }
      } catch {
        setContributions((prev) => (prev.length > 0 ? prev : generateMockContributions(52, cleanUsername, selectedYear, isFullYear)));
      }

      const eRes = await fetch(GITHUB_ENDPOINTS.getUserEventsUrl(cleanUsername, 30), { signal: abortSignal, headers: { Accept: "application/vnd.github.v3+json" } });
      if (eRes.ok) {
        const evData = await eRes.json();
        if (Array.isArray(evData) && evData.length > 0) {
          const { events: parsed, commits, prs, issues, reviews } = parseRawEvents(evData);
          nextEvents = parsed;
          setEvents(parsed);
          const totalEv = commits + prs + issues + reviews;
          if (totalEv > 0) {
            setStats((prev) => {
              const total = prev.totalContributions || totalEv;
              nextStats = {
                ...prev, commitsCount: Math.max(commits, Math.round(total * (commits / totalEv))),
                prsCount: Math.max(prs, Math.round(total * (prs / totalEv))),
                issuesCount: Math.max(issues, Math.round(total * (issues / totalEv))),
                reviewsCount: Math.max(reviews, Math.round(total * (reviews / totalEv))),
              };
              return nextStats;
            });
          }
        }
      } else {
        setEvents((prev) => (prev.length > 0 ? prev : generateUserEvents(cleanUsername)));
      }

      cacheRef.current[cacheKey] = {
        user: nextUser, contributions: nextDays, events: nextEvents,
        stats: nextStats || stats, availableYears: nextYears || availableYears,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "GitHub fetch error");
    } finally {
      setIsLoading(false);
    }
  }, [cleanUsername, selectedYear, isDefaultUser]);

  useEffect(() => {
    if (!username || !autoFetch) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchGithubData(controller.signal);
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [cleanUsername, autoFetch, fetchGithubData, username, selectedYear]);

  const refetch = useCallback(async () => {
    await fetchGithubData();
  }, [fetchGithubData]);

  return { contributions, events, stats, user, isLoading, error, refetch, selectedYear, setSelectedYear, availableYears };
}
