"use client";

import React, { useState, useMemo } from "react";
import { GithubActivityEventItem } from "./github-activity-event-item";
import { GithubActivityTimelineFilter } from "./github-activity-timeline-filter";
import { GithubActivityTimelineSearch } from "./github-activity-timeline-search";
import { GithubActivityPulseIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { GithubActivityTimelineProps, GithubEventType, GithubActivitySortOrder, GithubActivityEvent } from "./types";
import { generateUserEvents } from "./constants";

const TIME_MULTS: Record<string, number> = { m: 60000, h: 3600000, d: 86400000, w: 604800000, mo: 2592000000, y: 31536000000 };

function parseEventTime(ev: GithubActivityEvent): number {
  if (ev.createdAt) {
    const t = new Date(ev.createdAt).getTime();
    if (!Number.isNaN(t)) return t;
  }
  const ts = ev.timestamp?.toLowerCase().trim() || "";
  const now = Date.now();
  if (ts.includes("now")) return now;
  if (ts.includes("recently")) return now - 60000;
  const match = ts.match(/(\d+)\s*(m|h|d|w|mo|y)/);
  if (match) return now - Number(match[1]) * (TIME_MULTS[match[2]] || 1000);
  const parsed = new Date(ts).getTime();
  return !Number.isNaN(parsed) ? parsed : 0;
}

export function GithubActivityTimeline({
  events,
  username,
  maxEvents = 10,
  showFilter = true,
  showSearch = true,
  showSort = true,
  defaultSort = "desc",
  defaultFilterOpen = false,
  showCopySha = true,
  isLoading = false,
  staticIcons = false,
  className,
}: GithubActivityTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | GithubEventType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<GithubActivitySortOrder>(defaultSort);

  const activeEvents = useMemo(() => {
    if (events && events.length > 0) return events;
    return generateUserEvents(username || "octocat");
  }, [events, username]);

  const filteredEvents = useMemo(() => {
    let result = activeEvents;
    if (activeFilter !== "all") result = result.filter((ev) => ev.type === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((ev) => {
        const msg = ev.message?.toLowerCase() || "";
        const repo = ev.repo?.toLowerCase() || "";
        const sha = ev.sha?.toLowerCase() || "";
        const branch = ev.branch?.toLowerCase() || "";
        const pr = ev.prNumber ? String(ev.prNumber) : "";
        const issue = ev.issueNumber ? String(ev.issueNumber) : "";
        return (
          msg.includes(q) || repo.includes(q) || sha.includes(q) ||
          branch.includes(q) || pr.includes(q) || issue.includes(q)
        );
      });
    }
    return result;
  }, [activeEvents, activeFilter, searchQuery]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const tA = parseEventTime(a);
      const tB = parseEventTime(b);
      return sortOrder === "asc" ? tA - tB : tB - tA;
    });
  }, [filteredEvents, sortOrder]);

  const displayedEvents = maxEvents ? sortedEvents.slice(0, maxEvents) : sortedEvents;

  return (
    <div className={cn("relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm h-[320px] sm:h-[285px] overflow-hidden", className)}>
      {/* Sticky Top Header: Always visible with Title, Search & Filter */}
      <div className="shrink-0 flex items-center justify-between gap-2 p-3 border-b border-zinc-100 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-t-2xl z-20">
        <div className="flex items-center gap-2 min-w-0">
          <GithubActivityPulseIcon className="w-4 h-4 text-[var(--theme-primary)] shrink-0" animate={!staticIcons} />
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">Recent Activity</h4>
          {isLoading ? (
            <div className="w-6 h-4 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse shrink-0" />
          ) : (
            <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full shrink-0">
              {filteredEvents.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {showSearch && (
            <GithubActivityTimelineSearch value={searchQuery} onChange={setSearchQuery} staticIcons={staticIcons} />
          )}
          {showFilter && (
            <GithubActivityTimelineFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              showSort={showSort}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              events={activeEvents}
              defaultOpen={defaultFilterOpen}
              staticIcons={staticIcons}
            />
          )}
        </div>
      </div>

      {/* Events List */}
      <div
        className="flex-1 min-h-0 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60 [scrollbar-gutter:stable] subtle-scrollbar px-2 py-1"
      >
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-7 h-7 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 animate-pulse shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="h-3 w-32 rounded bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-2.5 w-48 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
                </div>
              </div>
              <div className="h-3 w-12 rounded bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse shrink-0" />
            </div>
          ))
        ) : displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <GithubActivityEventItem
              key={event.id}
              event={event}
              showCopySha={showCopySha}
              searchQuery={searchQuery}
            />
          ))
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400 dark:text-zinc-500 h-full flex flex-col items-center justify-center gap-1.5">
            <span>
              {searchQuery
                ? `No activity found matching "${searchQuery}"`
                : "No events found for this filter."}
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[11px] text-[var(--theme-primary)] hover:underline font-medium cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
