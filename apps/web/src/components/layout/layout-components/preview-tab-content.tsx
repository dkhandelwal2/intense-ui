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
        <div className="flex flex-col gap-4">
          <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal mt-1">
            {description}
          </div>
        </div>
      )}

      {/* Separator */}
      <Separator className="my-1" />

      {/* Component Dependencies */}
      <div>
        <RuntimeDependencies
          variant="compact"
          dependencies={dependencies}
          showInstallCommand={false}
          subtitle="Required packages for this component"
        />
      </div>

      {/* Component Props */}
      {propsTable && (
        <>
          <Separator className="my-1" />
          <div className="flex flex-col gap-3">
            <div>
              <SectionHeader
                icon={Gem}
                colorScheme="purple"
                title="Props"
                subtitle="Component API and property reference"
              />
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {propsTable}
            </div>
          </div>
        </>
      )}

      {/* Separator */}
      <Separator className="my-1" />

      {/* Open Source */}
      <div>
        <OpenSourceCard />
      </div>

      {/* Separator */}
      <Separator className="my-1" />

      {/* License: MIT */}
      <div>
        <LicenseCard />
      </div>

      {/* Separator */}
      <Separator className="my-1" />

      {/* Contact Us */}
      <div>
        <ContactCard />
      </div>
    </div>
  );
}
