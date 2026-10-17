"use client";

import React from "react";
import { HelpCircle, Bug, MessageSquare, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";

interface SupportSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  githubIssuesUrl?: string;
  githubDiscussionsUrl?: string;
  supportEmail?: string;
  variant?: "default" | "compact";
}

export function SupportSection({
  className,
  title = "Still Running Into an Issue?",
  subtitle = "We're here to help you get Intense UI running smoothly",
  githubIssuesUrl = siteConfig.links.issues,
  githubDiscussionsUrl = siteConfig.links.discussions,
  supportEmail = siteConfig.author.email,
  variant = "default",
}: SupportSectionProps) {
  if (variant === "compact") {
    return (
      <div className={cn("space-y-3 w-full min-w-0", className)}>
        {/* Compact Header */}
        <SectionHeader
          icon={HelpCircle}
          colorScheme="purple"
          title={title === "Still Running Into an Issue?" ? "Need Help?" : title}
          subtitle="Community & direct maintainer support"
        />

        {/* Compact 3-Button Action Grid */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={githubIssuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] hover:border-red-500/40 hover:bg-red-500/[0.04] transition-all text-center"
          >
            <Bug className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-red-500 transition-colors">
              Report Bug
            </span>
          </a>

          <a
            href={githubDiscussionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] hover:border-purple-500/40 hover:bg-purple-500/[0.04] transition-all text-center"
          >
            <MessageSquare className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-purple-400 transition-colors">
              Community
            </span>
          </a>

          <a
            href={`mailto:${supportEmail}`}
            className="group flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] transition-all text-center"
          >
            <Mail className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-400 transition-colors">
              Email
            </span>
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("space-y-6 pt-4 border-t border-black/5 dark:border-white/10 w-full min-w-0", className)}>
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">{title}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full min-w-0">
        {/* GitHub Issues */}
        <a
          href={githubIssuesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 sm:p-6 space-y-3 hover:border-[var(--theme-primary)]/40 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
              <Bug className="w-4 h-4" />
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors" />
          </div>
          <h3 className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-[var(--theme-primary)] transition-colors">
            Report a Bug
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Hit a build error or broken styling? Open an issue on GitHub with reproduction steps.
          </p>
          <span className="text-xs font-semibold text-[var(--theme-primary)] flex items-center gap-1">
            <span>Open GitHub Issue</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        {/* GitHub Discussions */}
        <a
          href={githubDiscussionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 sm:p-6 space-y-3 hover:border-purple-500/40 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
          </div>
          <h3 className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-purple-400 transition-colors">
            Community &amp; Ideas
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Request new components, discuss animation physics, or show off what you built.
          </p>
          <span className="text-xs font-semibold text-purple-500 flex items-center gap-1">
            <span>Join Discussion</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        {/* Direct Email Support */}
        <a
          href={`mailto:${supportEmail}`}
          className="group rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 sm:p-6 space-y-3 hover:border-emerald-500/40 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Mail className="w-4 h-4" />
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h3 className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-emerald-400 transition-colors">
            Direct Contact
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Have questions regarding commercial integration or custom requests? Email the maintainers.
          </p>
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
            <span>Send Email</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  );
}
