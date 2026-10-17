"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import {
  RuntimeDependencies,
  SectionHeader,
  OpenSourceCard,
  LicenseCard,
  ContactCard,
} from "@/components/docs";
import { SidebarMotionSection } from "./sidebar-motion-section";

export interface PreviewTabContentProps {
  description: React.ReactNode;
  dependencies?: { name: string; command: string }[];
  propsTable?: React.ReactNode;
}

export function PreviewTabContent({
  description,
  dependencies,
  propsTable,
}: PreviewTabContentProps) {
  return (
    <motion.div
      key="info"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5"
    >
      {/* Description */}
      <SidebarMotionSection className="flex flex-col gap-4">
        <div className="text-md leading-relaxed text-zinc-600 dark:text-zinc-300 font-light mt-1">
          {description}
        </div>
      </SidebarMotionSection>

      {/* Separator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent my-1 shrink-0" />

      {/* Component Dependencies */}
      <SidebarMotionSection delay={0.04}>
        <RuntimeDependencies
          variant="compact"
          dependencies={dependencies}
          showInstallCommand={false}
          subtitle="Required packages for this component"
        />
      </SidebarMotionSection>

      {/* Component Props */}
      {propsTable && (
        <>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent my-1 shrink-0" />
          <div className="flex flex-col gap-3">
            <SidebarMotionSection>
              <SectionHeader
                icon={Gem}
                colorScheme="purple"
                title="Props"
                subtitle="Component API and property reference"
              />
            </SidebarMotionSection>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {propsTable}
            </div>
          </div>
        </>
      )}

      {/* Separator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent my-1 shrink-0" />

      {/* Open Source */}
      <SidebarMotionSection delay={0.04}>
        <OpenSourceCard />
      </SidebarMotionSection>

      {/* Separator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent my-1 shrink-0" />

      {/* License: MIT */}
      <SidebarMotionSection delay={0.04}>
        <LicenseCard />
      </SidebarMotionSection>

      {/* Separator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent my-1 shrink-0" />

      {/* Contact Us */}
      <SidebarMotionSection delay={0.04}>
        <ContactCard />
      </SidebarMotionSection>
    </motion.div>
  );
}
