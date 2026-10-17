"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, AlertCircle, HelpCircle, ChevronDown, ArrowUpRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";

interface TroubleshootingSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
}

export function TroubleshootingSection({
  className,
  title = "Troubleshooting Diagnostic Center",
  subtitle = "Quick fixes for common first-time installation errors",
  variant = "default",
}: TroubleshootingSectionProps) {
  const [openCard, setOpenCard] = useState<number | null>(null);

  if (variant === "compact") {
    return (
      <div className={cn("space-y-3 w-full min-w-0", className)}>
        {/* Compact Header */}
        <SectionHeader
          icon={Wrench}
          colorScheme="amber"
          title={title === "Troubleshooting Diagnostic Center" ? "Troubleshooting" : title}
          subtitle="Quick fixes for common CLI errors"
          action={
            <Link
              href={siteConfig.routes.INSTALLATION}
              className="text-[11px] text-[var(--theme-primary)] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              <span>Guide</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          }
        />

        {/* Collapsible Issue 1: Missing components.json */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] dark:bg-red-500/[0.03] overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenCard(openCard === 1 ? null : 1)}
            className="w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-red-500/[0.04]"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 min-w-0 pr-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">&quot;Missing components.json&quot;</span>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200", openCard === 1 && "rotate-180")} />
          </button>
          {openCard === 1 && (
            <div className="px-3 pb-3 pt-1 space-y-2 border-t border-red-500/10 text-xs">
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                Run the initialization command before installing components:
              </p>
              <CodeBlock code="npx shadcn@latest init" language="bash" />
            </div>
          )}
        </div>

        {/* Collapsible Issue 2: Path Alias Missing */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-500/[0.03] overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenCard(openCard === 2 ? null : 2)}
            className="w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-amber-500/[0.04]"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 min-w-0 pr-2">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">&quot;Cannot find module &apos;@/lib/utils&apos;&quot;</span>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200", openCard === 2 && "rotate-180")} />
          </button>
          {openCard === 2 && (
            <div className="px-3 pb-3 pt-1 space-y-2 border-t border-amber-500/10 text-xs">
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                Add the path alias to your <code className="font-mono text-zinc-800 dark:text-zinc-200">tsconfig.json</code>:
              </p>
              <CodeBlock
                filename="tsconfig.json"
                language="json"
                code={`"paths": { "@/*": ["./src/*"] }`}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={cn("space-y-6 pt-4 border-t border-black/5 dark:border-white/10 w-full min-w-0", className)}>
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">{title}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
        {/* Card 1: Missing components.json */}
        <div className="rounded-2xl sm:rounded-3xl border border-red-500/20 bg-red-500/[0.02] dark:bg-red-500/[0.03] p-5 sm:p-6 space-y-3 hover:border-red-500/40 transition-colors w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">&quot;You need to create a components.json file&quot;</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <strong>Why it happens:</strong> You ran{" "}
            <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">
              shadcn add
            </code>{" "}
            before setting up shadcn in your project root.
          </p>
          <div className="pt-1 w-full max-w-full overflow-hidden">
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Run this fix:
            </span>
            <CodeBlock code="npx shadcn@latest init" language="bash" />
          </div>
        </div>

        {/* Card 2: Path Alias Missing */}
        <div className="rounded-2xl sm:rounded-3xl border border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-500/[0.03] p-5 sm:p-6 space-y-3 hover:border-amber-500/40 transition-colors w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">&quot;Cannot find module &apos;@/lib/utils&apos;&quot;</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <strong>Why it happens:</strong> Your TypeScript config does not recognize the{" "}
            <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">
              @/*
            </code>{" "}
            path alias mapping.
          </p>
          <div className="pt-1 w-full max-w-full overflow-hidden">
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Add to tsconfig.json:
            </span>
            <CodeBlock
              filename="tsconfig.json"
              language="json"
              code={`"compilerOptions": {
  "paths": {
    "@/*": ["./src/*"]
  }
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
