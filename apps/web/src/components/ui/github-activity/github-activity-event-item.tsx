"use client";

import React, { useState } from "react";
import {
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Tag,
  Star,
  Copy,
  Check,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubActivityEventItemProps, GithubEventType } from "./types";

const EVENT_ICONS: Record<GithubEventType, React.ComponentType<{ className?: string }>> = {
  commit: GitCommit,
  pull_request: GitPullRequest,
  issue: AlertCircle,
  release: Tag,
  star: Star,
};

const EVENT_COLOR_CLASSES: Record<GithubEventType, string> = {
  commit: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  pull_request: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  issue: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  release: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  star: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
};

function highlightMatch(text?: string, query?: string): React.ReactNode {
  if (!text) return null;
  if (!query || !query.trim()) return text;
  const q = query.trim();
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  if (parts.length <= 1) return text;

  const lowerQ = q.toLowerCase();
  return parts.map((part, i) =>
    part.toLowerCase() === lowerQ ? (
      <mark
        key={i}
        className="bg-emerald-500/25 text-emerald-900 dark:text-emerald-200 dark:bg-emerald-500/35 rounded-[2px] px-0.5 font-semibold"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function GithubActivityEventItem({
  event,
  showCopySha = true,
  searchQuery,
  className,
}: GithubActivityEventItemProps) {
  const [copied, setCopied] = useState(false);
  const Icon = EVENT_ICONS[event.type] || GitCommit;
  const iconStyle = EVENT_COLOR_CLASSES[event.type] || EVENT_COLOR_CLASSES.commit;

  const handleCopySha = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!event.sha) return;
    navigator.clipboard.writeText(event.sha);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("group flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-transparent hover:border-zinc-200/60 dark:hover:border-zinc-700/60", className)}>
      {/* Event type badge icon */}
      <div className={cn("p-1.5 rounded-lg border shrink-0 mt-0.5", iconStyle)}>
        <Icon className="w-3.5 h-3.5" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Top header row: repo name, status / additions, and timestamp */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {highlightMatch(event.repo, searchQuery)}
            </span>
            {event.branch && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-700/50">
                <GitBranch className="w-2.5 h-2.5" />
                {highlightMatch(event.branch, searchQuery)}
              </span>
            )}
            {event.status && (
              <span className={cn(
                "text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full border",
                event.status === "merged" && "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
                event.status === "open" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                event.status === "closed" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              )}>
                {event.status}
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
            {event.timestamp}
          </span>
        </div>

        {/* Message body */}
        <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
          {highlightMatch(event.message, searchQuery)}
        </p>

        {/* Footer meta: SHA copy and diff stats */}
        <div className="flex items-center gap-2 pt-0.5 text-[10px]">
          {event.sha && showCopySha && (
            <button
              type="button"
              onClick={handleCopySha}
              className="inline-flex items-center gap-1 font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              title="Copy commit hash"
            >
              <span>{highlightMatch(event.sha, searchQuery)}</span>
              {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
            </button>
          )}

          {(event.additions !== undefined || event.deletions !== undefined) && (
            <div className="flex items-center gap-1 font-mono">
              {event.additions !== undefined && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{event.additions}</span>
              )}
              {event.deletions !== undefined && (
                <span className="text-rose-600 dark:text-rose-400 font-semibold">-{event.deletions}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
