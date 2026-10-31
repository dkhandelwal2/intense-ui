"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, ShieldCheck, ChevronDown, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { PackageManager } from "@/components/ui/package-manager";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { DependencyItem } from "./dependency-constants";
import { getDependencyLogo } from "./dependency-logos";
import {
  getNpmPackageUrl,
  resolveActiveDependencies,
  extractPackageNames,
  generateManualInstallCommands,
} from "./dependency-utils";

export type { DependencyItem };
export { getDependencyLogo, getNpmPackageUrl };

export interface RuntimeDependenciesProps {
  className?: string;
  title?: string;
  subtitle?: string;
  dependencies?: DependencyItem[];
  installCommand?: string;
  packageManager?: PackageManager;
  onPackageManagerChange?: (pm: PackageManager) => void;
  stepNumber?: string;
  variant?: "default" | "compact";
  showInstallCommand?: boolean;
}

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
  showInstallCommand = true,
}: RuntimeDependenciesProps) {
  const [internalPm, setInternalPm] = React.useState<PackageManager>("npm");
  const [showManualInstall, setShowManualInstall] = React.useState(true);

  const activePm = packageManager || internalPm;
  const setPm = onPackageManagerChange || setInternalPm;
  const hasCustomDeps = Boolean(dependencies && dependencies.length > 0);

  const activeDependencies = React.useMemo(
    () => resolveActiveDependencies(dependencies),
    [dependencies]
  );

  const resolvedTitle =
    title || (hasCustomDeps ? "Component Dependencies" : "Core Runtime Dependencies");
  const resolvedSubtitle =
    subtitle ||
    (hasCustomDeps
      ? "Required packages for this component"
      : "Ultra-lean, production-grade ecosystem that powers Intense UI");

  const packages = React.useMemo(
    () => extractPackageNames(activeDependencies, installCommand),
    [activeDependencies, installCommand]
  );

  const manualCommands = React.useMemo(
    () => generateManualInstallCommands(packages),
    [packages]
  );

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "relative space-y-3 w-full min-w-0",
          className
        )}
      >
        {stepNumber && (
          <span className="pointer-events-none select-none absolute -top-1.5 right-1 font-black text-6xl text-zinc-900/[0.05] dark:text-white/[0.05] tracking-tighter leading-none z-0">
            {stepNumber}
          </span>
        )}

        {/* Compact Header */}
        <SectionHeader
          icon={Boxes}
          colorScheme="primary"
          title={resolvedTitle === "Core Runtime Dependencies" ? "Core Dependencies" : resolvedTitle}
          subtitle={resolvedSubtitle}
          className="relative z-10"
        />

        {/* Dependency Pills */}
        <div
          className={cn(
            "w-full py-0.5",
            showInstallCommand
              ? "flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              : "flex flex-wrap items-center gap-1.5"
          )}
        >
          {activeDependencies.map((dep) => (
            <a
              key={dep.name}
              href={dep.url || getNpmPackageUrl(dep.name)}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${dep.name} on npm`}
              className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 shrink-0 hover:bg-zinc-100 dark:hover:bg-white/[0.06] hover:border-[var(--theme-primary)]/40 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-primary)] transition-all cursor-pointer"
            >
              {getDependencyLogo(dep.name)}
              <span className="whitespace-nowrap">{dep.name}</span>
              <ExternalLink className="w-2.5 h-2.5 text-zinc-400 group-hover:text-[var(--theme-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Collapsible Manual Install Command */}
        {showInstallCommand && (
          <div className="pt-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Installed automatically via CLI</span>
              </span>
              <button
                type="button"
                onClick={() => setShowManualInstall(!showManualInstall)}
                className="text-[11px] text-[var(--theme-primary)] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer select-none"
              >
                <span>Manual install</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-300 ease-out",
                    showManualInstall && "rotate-180"
                  )}
                />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {showManualInstall && (
                <motion.div
                  key="manual-install-container"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <CodeBlock
                      code={manualCommands[activePm]}
                      language="bash"
                      packageManager={activePm}
                      onPackageManagerChange={setPm}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-6 pt-4 border-t border-black/5 dark:border-white/10 w-full min-w-0",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 shadow-sm">
          <Boxes className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
            {resolvedTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {resolvedSubtitle}
          </p>
        </div>
      </div>

      {/* Dependency Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full min-w-0">
        {activeDependencies.map((dep) => (
          <a
            key={dep.name}
            href={dep.url || getNpmPackageUrl(dep.name)}
            target="_blank"
            rel="noopener noreferrer"
            title={`View ${dep.name} on npm`}
            className="group block rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 space-y-2.5 transition-all hover:border-[var(--theme-primary)]/40 hover:bg-zinc-100/60 dark:hover:bg-white/[0.04] cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2.5 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                {getDependencyLogo(dep.name)}
                <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap">
                  {dep.name}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[var(--theme-primary)] opacity-0 group-hover:opacity-100 transition-all shrink-0" />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {dep.description}
            </p>
          </a>
        ))}
      </div>

      {/* Manual dependency install block */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-5 space-y-3">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Installed automatically by the CLI. Manual install command:</span>
        </span>
        <CodeBlock
          code={manualCommands[activePm]}
          language="bash"
          packageManager={activePm}
          onPackageManagerChange={setPm}
        />
      </div>
    </div>
  );
}
