"use client";

import React from "react";
import { MessageCircle, ShieldAlert, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { SupportCardProps } from "./types";

interface SupportLinkItem {
  id: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  hoverBorder: string;
  arrowHoverColor: string;
  title: string;
  subtitle: string;
}

const SUPPORT_LINKS: SupportLinkItem[] = [
  {
    id: "discord",
    href: siteConfig.links.discord,
    icon: MessageCircle,
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    iconBorder: "border-indigo-500/30",
    iconColor: "text-indigo-500",
    hoverBorder: "hover:border-indigo-500/40",
    arrowHoverColor: "group-hover:text-indigo-400",
    title: "Discord Community",
    subtitle: "1,800+ Devs • Live QA",
  },
  {
    id: "issues",
    href: siteConfig.links.issues,
    icon: ShieldAlert,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    iconBorder: "border-rose-500/30",
    iconColor: "text-rose-500",
    hoverBorder: "hover:border-rose-500/40",
    arrowHoverColor: "group-hover:text-rose-400",
    title: "Report an Issue",
    subtitle: "Bugs & Features",
  },
];

export function SupportCard({ componentName, className, style }: SupportCardProps) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-[30px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-3.5 shadow-sm flex flex-col justify-between relative overflow-hidden",
        className
      )}
      style={style}
    >
      <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between shrink-0 mb-0.5">
        <div className="flex items-center gap-1.5">
          <div className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-bold text-foreground flex items-center gap-1.5 shadow-xs">
            <MessageCircle className="w-3 h-3 text-indigo-500" />
            <span>Developer Support</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Community</span>
          </div>
          <a
            href={siteConfig.links.discussions}
            target="_blank"
            rel="noopener noreferrer"
            className="w-5 h-5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Community Discussions"
          >
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Support links mapped dynamically */}
      <div className="relative z-10 flex items-center justify-between gap-2.5 my-auto">
        <div className="flex flex-col gap-1.5 w-[175px] 2xl:w-[190px] shrink-0">
          {SUPPORT_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-2 py-1 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-200/90 dark:border-zinc-700/80 text-xs text-foreground flex items-center justify-between transition-all group cursor-pointer shadow-xs active:scale-98",
                  item.hoverBorder
                )}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform",
                      item.iconBg,
                      item.iconBorder
                    )}
                  >
                    <Icon className={cn("w-3 h-3", item.iconColor)} />
                  </div>
                  <div className="flex flex-col leading-tight min-w-0">
                    <span className="font-bold text-[10.5px] truncate">{item.title}</span>
                    <span className="text-[9px] text-muted-foreground truncate">{item.subtitle}</span>
                  </div>
                </div>
                <ArrowUpRight
                  className={cn(
                    "w-2.5 h-2.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0",
                    item.arrowHoverColor
                  )}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Fanned Cards on Right */}
      <div className="absolute right-3 bottom-2 pointer-events-none select-none z-0">
        <div className="relative w-[110px] 2xl:w-[125px] h-[82px] 2xl:h-[95px]">
          <div className="absolute inset-0 rounded-xl bg-zinc-200/90 dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-700/80 rotate-[18deg] transform translate-x-1.5 -translate-y-1 shadow-xs" />
          <div className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rotate-[10deg] transform translate-x-1 -translate-y-0.5 shadow-sm" />
          <div className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-md flex flex-col justify-between p-2 rotate-[2deg]">
            <div className="flex items-center justify-between">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-mono text-muted-foreground font-semibold">v0.1.0</span>
            </div>
            <div className="font-mono text-[10px] font-bold text-foreground truncate">
              &lt;{componentName} /&gt;
            </div>
            <div className="h-1 w-10 rounded-full bg-pink-500" />
          </div>
        </div>
      </div>

      {/* Bottom repo bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-1 border-t border-border shrink-0">
        <div className="flex-1 flex items-center gap-1.5">
          <div className="h-1 w-12 rounded-full bg-muted-foreground/30" />
          <div className="flex-1 border-b border-dashed border-border h-0.5" />
        </div>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 border border-border text-[9.5px] 2xl:text-[10px] font-mono text-foreground flex items-center gap-1 transition-colors cursor-pointer"
        >
          <GithubIcon className="w-2.5 h-2.5" />
          <span>{siteConfig.name} / core</span>
        </a>
      </div>
    </div>
  );
}
