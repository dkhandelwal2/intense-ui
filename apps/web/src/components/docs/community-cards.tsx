"use client";

import React from "react";
import { Heart, Scale, Mail, Check, Bug, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig, EXTERNAL_LINKS } from "@/config/site";
import { GithubIcon, XTwitterIcon } from "@/icons";

export { GithubIcon, XTwitterIcon };

export function OpenSourceCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SectionHeader
        icon={Heart}
        colorScheme="rose"
        title="Open Source"
        subtitle="Free, community-driven & open codebase"
      />
      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Intense UI is 100% free and open-source. Contributions, pull requests, and component ideas are always warmly welcomed!
      </p>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between px-3 py-2 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] hover:border-rose-500/40 hover:bg-rose-500/[0.04] transition-all"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
            <GithubIcon className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-rose-500 transition-colors block truncate">
              Star &amp; Contribute
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
              github.com/dkhandelwal2/intense-ui
            </span>
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
      </a>
    </div>
  );
}

export function LicenseCard({ className }: { className?: string }) {
  const permissions = [
    "Commercial Use",
    "Personal Projects",
    "Modify & Adapt",
    "Free Distribution",
  ];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SectionHeader
        icon={Scale}
        colorScheme="emerald"
        title="License"
        badge="MIT"
        subtitle="Free for commercial & personal projects"
      />
      <div className="grid grid-cols-2 gap-2">
        {permissions.map((perm) => (
          <div
            key={perm}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">{perm}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Published under standard MIT terms. Requires copyright notice preservation. No warranty provided.
      </p>
    </div>
  );
}

export function ContactCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SectionHeader
        icon={Mail}
        colorScheme="blue"
        title="Contact Us"
        subtitle="Feedback, component requests & direct support"
      />
      <div className="grid grid-cols-3 gap-2">
        <a
          href={EXTERNAL_LINKS.TWITTER}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] hover:border-sky-500/40 hover:bg-sky-500/[0.04] transition-all text-center"
        >
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 transition-transform">
            <XTwitterIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-sky-500 transition-colors">
            Twitter / X
          </span>
        </a>

        <a
          href={EXTERNAL_LINKS.MAILTO}
          className="group flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-all text-center"
        >
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
            Email Us
          </span>
        </a>

        <a
          href={EXTERNAL_LINKS.GITHUB_ISSUES}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] hover:border-red-500/40 hover:bg-red-500/[0.04] transition-all text-center"
        >
          <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform">
            <Bug className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-red-500 transition-colors">
            Report Bug
          </span>
        </a>
      </div>
    </div>
  );
}
