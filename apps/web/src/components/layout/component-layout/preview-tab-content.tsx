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
      className="flex flex-col gap-10"
    >
      {/* Description */}
      <SidebarMotionSection className="flex flex-col gap-4">
        <div className="text-md leading-relaxed text-zinc-600 dark:text-zinc-300 font-light mt-2">
          {description}
        </div>
      </SidebarMotionSection>

      {/* Component Dependencies */}
      <SidebarMotionSection delay={0.04}>
        <RuntimeDependencies
          variant="compact"
          dependencies={dependencies}
          showInstallCommand={false}
          subtitle="Required packages for this component"
          className="border-t border-black/5 dark:border-white/10 pt-6"
        />
      </SidebarMotionSection>

      {/* Component Props */}
      {propsTable && (
        <div className="flex flex-col gap-3 border-t border-black/5 dark:border-white/10 pt-6">
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
      )}

      {/* Open Source */}
      <SidebarMotionSection delay={0.04} className="border-t border-black/5 dark:border-white/10 pt-6">
        <OpenSourceCard />
      </SidebarMotionSection>

      {/* License: MIT */}
      <SidebarMotionSection delay={0.04} className="border-t border-black/5 dark:border-white/10 pt-6">
        <LicenseCard />
      </SidebarMotionSection>

      {/* Contact Us */}
      <SidebarMotionSection delay={0.04} className="border-t border-black/5 dark:border-white/10 pt-6">
        <ContactCard />
      </SidebarMotionSection>
    </motion.div>
  );
}
