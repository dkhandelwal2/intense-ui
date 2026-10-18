"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Terminal, Code } from "lucide-react";
import { PackageManager, PackageManagerSelector } from "@/components/ui/package-manager";
import { CodeBlock } from "@/components/ui/code-block";
import {
  RuntimeDependencies,
  TroubleshootingSection,
  SupportSection,
  SectionHeader,
} from "@/components/docs";
import { Separator } from "@/components/ui/separator";
import { getComponentAddCommand } from "@/config/site";
import { SidebarMotionSection } from "./sidebar-motion-section";

export interface InstallTabContentProps {
  slug?: string;
  installContent?: React.ReactNode;
  usageCode?: string;
  dependencies?: { name: string; command: string }[];
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
}

export function InstallTabContent({
  slug,
  installContent,
  usageCode,
  dependencies,
  packageManager,
  onPackageManagerChange,
}: InstallTabContentProps) {
  return (
    <motion.div
      key="install"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Installation Overview / Guidance Box */}
      <SidebarMotionSection className="flex flex-col gap-2.5 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Installation</h3>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            CLI Recommended
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Choose your preferred installation method:
        </p>
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/15 text-xs text-zinc-600 dark:text-zinc-300">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-[11px] leading-relaxed">
            <p>
              <strong className="text-zinc-900 dark:text-white font-semibold">• Using CLI?</strong> Just run the <strong className="text-zinc-900 dark:text-white font-semibold">CLI Installation</strong> command below — it installs the component and its packages automatically.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-300 font-medium">• Copying code?</strong> Install the packages under <strong className="text-zinc-700 dark:text-zinc-300 font-medium">Core Dependencies</strong>, then copy the component from the <strong className="text-zinc-700 dark:text-zinc-300 font-medium">Code</strong> tab.
            </p>
          </div>
        </div>
      </SidebarMotionSection>

      <div className="text-zinc-800 dark:text-zinc-300">
        {installContent || (slug ? (
          <div className="flex flex-col gap-5">
            {/* Separator */}
            <Separator className="my-1" />

            {/* Component npx shadcn CLI Command */}
            <SidebarMotionSection delay={0.04} className="flex flex-col gap-3">
              <SectionHeader
                icon={Terminal}
                colorScheme="emerald"
                title="CLI Installation"
                badge="Fastest"
                subtitle="Installs component files & auto-configures dependencies"
              />

              <CodeBlock
                code={getComponentAddCommand(packageManager, slug)}
                language="bash"
                packageManager={packageManager}
                onPackageManagerChange={onPackageManagerChange}
              />
            </SidebarMotionSection>

            {/* Usage */}
            {usageCode && (
              <>
                {/* Separator */}
                <Separator className="my-1" />

                <SidebarMotionSection delay={0.04} className="flex flex-col gap-3">
                  <SectionHeader
                    icon={Code}
                    colorScheme="blue"
                    title="Usage"
                    subtitle="Import and render the component in your layout"
                  />
                  <CodeBlock code={usageCode} language="tsx" />
                </SidebarMotionSection>
              </>
            )}

            {/* Separator */}
            <Separator className="my-1" />

            {/* Component Dependencies */}
            <SidebarMotionSection delay={0.04}>
              <RuntimeDependencies
                variant="compact"
                dependencies={dependencies}
                packageManager={packageManager}
                onPackageManagerChange={onPackageManagerChange}
                subtitle="Installed automatically by CLI, or manually below"
              />
            </SidebarMotionSection>

            {/* Separator */}
            <Separator className="my-1" />

            {/* 4. Troubleshooting Diagnostic Center */}
            <SidebarMotionSection delay={0.04}>
              <TroubleshootingSection variant="compact" className="border-t-0 pt-0" />
            </SidebarMotionSection>

            {/* Separator */}
            <Separator className="my-1" />

            {/* 5. Need Help? Support & Community */}
            <SidebarMotionSection delay={0.04}>
              <SupportSection variant="compact" className="border-t-0 pt-0" />
            </SidebarMotionSection>
          </div>
        ) : (
          <div className="text-sm text-zinc-500">No installation steps provided.</div>
        ))}
      </div>
    </motion.div>
  );
}
