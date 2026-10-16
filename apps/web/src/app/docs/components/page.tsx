"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Layers } from "lucide-react";
import { componentsConfig } from "@/config/components";
import { componentPreviews } from "@/components/component-previews";
import { siteConfig } from "@/config/site";

export default function ComponentsPage() {
  const enabledComponents = componentsConfig.filter((c) => c.enabled);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 overflow-x-hidden min-w-0">
      {/* Ambient background glows */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-[var(--theme-primary)]/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-[600px] right-0 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-[var(--theme-primary)]/8 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Standalone Showcase Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex flex-col space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Components Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Components
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Beautifully crafted, physics-driven animated components. Built on top of Radix UI primitives and Tailwind CSS.
          </p>
        </div>

        {/* Quick action buttons & stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            <span>{enabledComponents.length} Components</span>
          </div>
          <Link
            href={siteConfig.routes.INSTALLATION}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Installation Guide</span>
          </Link>
        </div>
      </div>

      {/* Full-width Responsive Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {enabledComponents.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#0c0c0e]/80 text-card-foreground shadow-xs transition-all duration-200 hover:shadow-lg hover:border-[var(--theme-primary)]/40 hover:-translate-y-0.5"
          >
            {/* Interactive Preview Canvas */}
            <div className="flex h-[220px] w-full items-center justify-center bg-white/80 dark:bg-zinc-900/40 p-6 border-b border-zinc-200/80 dark:border-zinc-800/60 backdrop-blur-xs group-hover:bg-zinc-50/50 dark:group-hover:bg-zinc-900/60 transition-colors">
              {componentPreviews[component.name] || (
                <div className="text-sm text-zinc-400 dark:text-zinc-500">
                  Interactive preview coming soon
                </div>
              )}
            </div>

            {/* Component Metadata & Navigation CTA */}
            <div className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-lg flex items-center justify-between group-hover:text-[var(--theme-primary)] transition-colors">
                  <span>{component.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--theme-primary)]" />
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {component.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                <span>View component & code</span>
                <span className="ml-1 text-[var(--theme-primary)] group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
