"use client";

import React from "react";
import { Gem } from "lucide-react";
import {
  RuntimeDependencies,
  SectionHeader,
  OpenSourceCard,
  LicenseCard,
  ContactCard,
} from "@/components/docs";
import { Separator } from "@/components/ui/separator";
import { ScrollMotionSection as SidebarMotionSection } from "@/components/ui/scroll-motion-section";

export interface PreviewTabContentProps {
  description?: React.ReactNode;
  dependencies?: { name: string; command: string }[];
  propsTable?: React.ReactNode;
}

export function PreviewTabContent({
  description,
  dependencies,
  propsTable,
}: PreviewTabContentProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Description */}
      {description && (
        <SidebarMotionSection className="flex flex-col gap-4">
          <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal mt-1">
            {description}
          </div>
        </SidebarMotionSection>
      )}

      {/* Separator */}
      <Separator className="my-1" />

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
          <Separator className="my-1" />
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
      <Separator className="my-1" />

      {/* Open Source */}
      <SidebarMotionSection delay={0.04}>
        <OpenSourceCard />
      </SidebarMotionSection>

      {/* Separator */}
      <Separator className="my-1" />

      {/* License: MIT */}
      <SidebarMotionSection delay={0.04}>
        <LicenseCard />
      </SidebarMotionSection>

      {/* Separator */}
      <Separator className="my-1" />

      {/* Contact Us */}
      <SidebarMotionSection delay={0.04}>
        <ContactCard />
      </SidebarMotionSection>
    </div>
  );
}
