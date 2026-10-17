"use client";

import { useState, useEffect } from "react";

export interface GitHubStarsState {
  stars: number | null;
  formattedStars: string;
  starCountText: string;
  isLoading: boolean;
}

const CACHE_KEY = "intense_ui_github_stars";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export function formatStarNumber(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 10000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
}

export function formatStarCount(count: number): string {
  return `★ ${formatStarNumber(count)}`;
}

export function useGitHubStars(repo: string = "dkhandelwal2/intense-ui"): GitHubStarsState {
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check local cache first
    try {
      const cached = localStorage.getItem(`${CACHE_KEY}_${repo}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (
          typeof parsed.timestamp === "number" &&
          Date.now() - parsed.timestamp < CACHE_TTL &&
          typeof parsed.stars === "number"
        ) {
          setStars(parsed.stars);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // LocalStorage unavailable (e.g. incognito or SSR), continue to fetch
    }

    let isMounted = true;

    const fetchStars = async () => {
      try {
        // 2. Query internal API route with Next.js ISR cache
        let count: number | null = null;
        try {
          const internalRes = await fetch("/api/github-stars");
          if (internalRes.ok) {
            const data = await internalRes.json();
            if (typeof data.stars === "number") {
              count = data.stars;
            }
          }
        } catch {
          // Internal API failed, try direct public API
        }

        // 3. Direct GitHub fallback if internal route didn't return a number
        if (count === null) {
          try {
            const ghRes = await fetch(`https://api.github.com/repos/${repo}`, {
              headers: { Accept: "application/vnd.github.v3+json" },
            });
            if (ghRes.ok) {
              const ghData = await ghRes.json();
              if (typeof ghData.stargazers_count === "number") {
                count = ghData.stargazers_count;
              }
            }
          } catch {
            // Direct fetch failed
          }
        }

        if (isMounted && count !== null) {
          setStars(count);
          try {
            localStorage.setItem(
              `${CACHE_KEY}_${repo}`,
              JSON.stringify({ stars: count, timestamp: Date.now() })
            );
          } catch {
            // Ignore quota errors
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStars();

    return () => {
      isMounted = false;
    };
  }, [repo]);

  const formattedStars = stars !== null ? formatStarCount(stars) : "★";
  const starCountText = stars !== null ? formatStarNumber(stars) : "";

  return { stars, formattedStars, starCountText, isLoading };
}
