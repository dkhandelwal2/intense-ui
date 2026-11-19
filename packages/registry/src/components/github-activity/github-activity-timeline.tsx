"use client";

import React, { useState, useMemo } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubActivityEventItem } from "./github-activity-event-item";
import { GithubActivityTimelineFilter } from "./github-activity-timeline-filter";
import { generateUserEvents } from "./constants";
import type { GithubActivityTimelineProps, GithubEventType } from "./types";

export function GithubActivityTimeline({
  events,
  username,
  maxEvents = 15,
  showFilter = true,
  defaultFilterOpen = false,
  showCopySha = true,
  isLoading = false,
  className,
}: GithubActivityTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | GithubEventType>("all");

  const activeEvents = useMemo(() => {
    if (events && events.length > 0) return events;
    return generateUserEvents(username || "octocat");
  }, [events, username]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return activeEvents;
    return activeEvents.filter((ev) => ev.type === activeFilter);
  }, [activeEvents, activeFilter]);

  const displayedEvents = maxEvents ? filteredEvents.slice(0, maxEvents) : filteredEvents;

  return (
    <div className={cn("flex flex-col justify-between gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-h-[285px] sm:h-[285px]", className)}>
      {/* Header with Title and Interactive Curtain Filter */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h4>
          {isLoading ? (
            <div className="w-6 h-4 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
          ) : (
            <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">
              {filteredEvents.length}
            </span>
          )}
        </div>

        {showFilter && (
          <GithubActivityTimelineFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            events={activeEvents}
            defaultOpen={defaultFilterOpen}
          />
        )}
      </div>

      {/* Events List */}
      <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60 [scrollbar-gutter:stable] subtle-scrollbar pr-1">
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
            />
          ))
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
            No events found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
