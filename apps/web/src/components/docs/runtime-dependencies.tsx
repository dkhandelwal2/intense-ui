"use client";

import React from "react";
import { Boxes, ShieldCheck, ChevronDown } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PackageManagerLogo } from "@/components/ui/package-manager";
import { cn } from "@/lib/utils";
import { REGISTRY_CONFIG } from "@/config/site";

export interface DependencyItem {
  name: string;
  version?: string;
  versionColor?: string;
  description?: React.ReactNode;
  command?: string;
}

interface RuntimeDependenciesProps {
  className?: string;
  title?: string;
  subtitle?: string;
  dependencies?: DependencyItem[];
  installCommand?: string;
  packageManager?: "npm" | "pnpm" | "yarn" | "bun";
  onPackageManagerChange?: (pm: "npm" | "pnpm" | "yarn" | "bun") => void;
  stepNumber?: string;
  variant?: "default" | "compact";
}

export function getDependencyLogo(name: string) {
  const normalized = name.toLowerCase().trim();

  // Motion / Framer Motion
  if (normalized.includes("framer-motion") || normalized.includes("motion") || normalized === "framer") {
    return (
      <svg
        viewBox="0 0 25.364 9"
        fill="currentColor"
        className="h-2.5 w-auto shrink-0 text-zinc-900 dark:text-white"
        aria-hidden="true"
      >
        <path d="M 9.587 0 L 4.57 9 L 0 9 L 3.917 1.972 C 4.524 0.883 6.039 0 7.301 0 Z M 20.794 2.25 C 20.794 1.007 21.817 0 23.079 0 C 24.341 0 25.364 1.007 25.364 2.25 C 25.364 3.493 24.341 4.5 23.079 4.5 C 21.817 4.5 20.794 3.493 20.794 2.25 Z M 10.443 0 L 15.013 0 L 9.997 9 L 5.427 9 Z M 15.841 0 L 20.411 0 L 16.494 7.028 C 15.887 8.117 14.372 9 13.11 9 L 10.825 9 Z" />
      </svg>
    );
  }

  // Lucide Icons
  if (normalized.includes("lucide")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 shrink-0"
      >
        <path
          d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557"
          className="stroke-zinc-800 dark:stroke-white"
        />
        <path
          d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21"
          stroke="#F56565"
        />
      </svg>
    );
  }

  // Tailwind CSS / Tailwind Merge
  if (normalized.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-sky-400 shrink-0">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // clsx
  if (normalized === "clsx") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-indigo-400 shrink-0">
        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
        <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
      </svg>
    );
  }

  // Radix UI
  if (normalized.includes("radix")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400 shrink-0">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      </svg>
    );
  }

  return <Boxes className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
}

const KNOWN_DEPENDENCY_META: Record<string, { version: string; versionColor: string; description: React.ReactNode }> = {
  "framer-motion": {
    version: "v11 / v12",
    versionColor: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    description: "Powers spring physics, gestures, fluid layout morphing, and GPU-accelerated enter/exit animations.",
  },
  "lucide-react": {
    version: "^0.400+",
    versionColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    description: "Ultra-crisp, tree-shakeable SVG icon system matching official shadcn ecosystem standards.",
  },
  "clsx": {
    version: "^2.1.0",
    versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: "Constructs className strings conditionally without overhead.",
  },
  "tailwind-merge": {
    version: "^2.5.0",
    versionColor: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    description: "Safely merges Tailwind CSS classes without style conflicts.",
  },
  "clsx & tailwind-merge": {
    version: "Utility",
    versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: (
      <>
        Provides the <code className="font-mono text-zinc-700 dark:text-zinc-300">cn()</code> helper to resolve Tailwind CSS class conflicts safely and conditionally.
      </>
    ),
  },
};

const DEFAULT_DEPENDENCIES: DependencyItem[] = [
  {
    name: "framer-motion",
    version: "v11 / v12",
    versionColor: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    description: "Powers spring physics, gestures, fluid layout morphing, and GPU-accelerated enter/exit animations.",
  },
  {
    name: "lucide-react",
    version: "^0.400+",
    versionColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    description: "Ultra-crisp, tree-shakeable SVG icon system matching official shadcn ecosystem standards.",
  },
  {
    name: "clsx",
    version: "^2.1.0",
    versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: "Constructs className strings conditionally without overhead.",
  },
  {
    name: "tailwind-merge",
    version: "^2.5.0",
    versionColor: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    description: "Safely merges Tailwind CSS classes without style conflicts.",
  },
];

export function RuntimeDependencies({
  className,
  title,
  subtitle,
  dependencies,
  installCommand,
  packageManager,
  onPackageManagerChange,
  stepNumber,
  variant = "default",
}: RuntimeDependenciesProps) {
  const [internalPm, setInternalPm] = React.useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [showManualInstall, setShowManualInstall] = React.useState(true);

  const activePm = packageManager || internalPm;
  const setPm = onPackageManagerChange || setInternalPm;

  const hasCustomDeps = Boolean(dependencies && dependencies.length > 0);

  const activeDependencies: DependencyItem[] = React.useMemo(() => {
    let list: DependencyItem[] = [];

    if (hasCustomDeps && dependencies) {
      list = dependencies.map((dep) => {
        const meta = KNOWN_DEPENDENCY_META[dep.name];
        return {
          name: dep.name,
          version: dep.version || meta?.version || "External",
          versionColor: dep.versionColor || meta?.versionColor || "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          description: dep.description || meta?.description || "Required component dependency.",
          command: dep.command,
        };
      });

      // Always ensure foundational clsx and tailwind-merge are included for the cn() helper
      const hasClsx = list.some((d) => d.name === "clsx" || d.name.includes("clsx"));
      const hasTwMerge = list.some((d) => d.name === "tailwind-merge" || d.name.includes("tailwind-merge"));

      if (!hasClsx) {
        list.push({
          name: "clsx",
          version: "^2.1.0",
          versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
          description: "Constructs className strings conditionally without overhead.",
        });
      }
      if (!hasTwMerge) {
        list.push({
          name: "tailwind-merge",
          version: "^2.5.0",
          versionColor: "bg-sky-500/10 text-sky-500 border-sky-500/20",
          description: "Safely merges Tailwind CSS classes without style conflicts.",
        });
      }
    } else {
      list = DEFAULT_DEPENDENCIES;
    }

    return list;
  }, [hasCustomDeps, dependencies]);

  const resolvedTitle = title || (hasCustomDeps ? "Component Dependencies" : "Core Runtime Dependencies");
  const resolvedSubtitle = subtitle || (hasCustomDeps ? "Required packages for this component" : "Ultra-lean, production-grade ecosystem that powers Intense UI");

  const packages = React.useMemo(() => {
    if (installCommand) {
      const stripped = installCommand.replace(/^(npm install|npm i|pnpm add|pnpm i|yarn add|bun add)\s+/, "").trim();
      if (stripped) return stripped;
    }
    const names = activeDependencies
      .flatMap((d) => (d.name.includes("&") ? d.name.split("&").map((s) => s.trim()) : [d.name]))
      .filter(Boolean);
    return Array.from(new Set(names)).join(" ");
  }, [activeDependencies, installCommand]);

  const manualCommands: Record<"npm" | "pnpm" | "yarn" | "bun", string> = {
    npm: `npm install ${packages}`,
    pnpm: `pnpm add ${packages}`,
    yarn: `yarn add ${packages}`,
    bun: `bun add ${packages}`,
  };

  const packageManagers = [
    { pm: "npm" as const, cmd: manualCommands.npm },
    { pm: "pnpm" as const, cmd: manualCommands.pnpm },
    { pm: "yarn" as const, cmd: manualCommands.yarn },
    { pm: "bun" as const, cmd: manualCommands.bun },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("relative space-y-3 pt-5 border-t border-black/5 dark:border-white/10 w-full min-w-0 overflow-hidden", className)}>
        {stepNumber && (
          <span className="pointer-events-none select-none absolute -top-1.5 right-1 font-black text-6xl text-zinc-900/[0.05] dark:text-white/[0.05] tracking-tighter leading-none z-0">
            {stepNumber}
          </span>
        )}
        {/* Compact Header */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 shadow-sm shrink-0">
            <Boxes className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              {resolvedTitle === "Core Runtime Dependencies" ? "Core Dependencies" : resolvedTitle}
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{resolvedSubtitle}</p>
          </div>
        </div>

        {/* Single Row of Dependencies with Logo and Name */}
        <div className="flex items-center gap-1.5 w-full overflow-x-auto py-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {activeDependencies.map((dep) => (
            <div
              key={dep.name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 shrink-0 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              {getDependencyLogo(dep.name)}
              <span>{dep.name}</span>
            </div>
          ))}
        </div>

        {/* Collapsible Manual Install Command */}
        <div className="pt-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Installed automatically via CLI</span>
            </span>
            <button
              type="button"
              onClick={() => setShowManualInstall(!showManualInstall)}
              className="text-[11px] text-[var(--theme-primary)] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Manual install</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", showManualInstall && "rotate-180")} />
            </button>
          </div>
          {showManualInstall && (
            <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c] mt-2">
              <CodeBlock code={manualCommands[activePm]} language="bash" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 pt-4 border-t border-black/5 dark:border-white/10 w-full min-w-0", className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 shadow-sm">
          <Boxes className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">{resolvedTitle}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{resolvedSubtitle}</p>
        </div>
      </div>

      {/* Dependency Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        {activeDependencies.map((dep) => (
          <div
            key={dep.name}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 space-y-2.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDependencyLogo(dep.name)}
                <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">{dep.name}</span>
              </div>
              <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border", dep.versionColor)}>
                {dep.version}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {dep.description}
            </p>
          </div>
        ))}
      </div>

      {/* Manual dependency install block with tabs for npm, pnpm, yarn, bun */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 space-y-3">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Installed automatically by the CLI. Manual install command:</span>
        </span>
        <Tabs value={activePm} onValueChange={(val) => setPm(val as any)} className="w-full">
          <TabsList className="mb-3 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
            {["npm", "pnpm", "yarn", "bun"].map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className="text-xs data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white inline-flex items-center gap-1.5"
              >
                <PackageManagerLogo pm={pm} colored={activePm !== pm} className="w-3.5 h-3.5" />
                <span>{pm}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {packageManagers.map(({ pm, cmd }) => (
            <TabsContent key={pm} value={pm} className="mt-0">
              <div className="w-full max-w-full overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
                <CodeBlock code={cmd} language="bash" />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
