"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageManager } from "@/components/ui/package-manager";
import {
  RuntimeDependencies,
  TroubleshootingSection,
  SupportSection,
  ExploreBanner,
} from "@/components/docs";
import {
  InstallationHero,
  StepInitProject,
  StepPullComponent,
  StepInteractiveLab,
  ScrollMotionSection,
  SetupMode,
} from "./_components";

export default function InstallationPage() {
  const [setupMode, setSetupMode] = useState<SetupMode>("fresh");
  const [selectedPm, setSelectedPm] = useState<PackageManager>("npm");

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-6 md:px-8 space-y-14 sm:space-y-20 overflow-x-hidden min-w-0">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-[var(--theme-primary)]/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-[800px] right-0 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-[var(--theme-primary)]/8 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Hero Header with Persona Switcher */}
      <InstallationHero
        setupMode={setupMode}
        onSetupModeChange={setSetupMode}
      />

      {/* Scroll-driven Steps */}
      <div className="space-y-8 sm:space-y-12 w-full min-w-0">
        {/* Step 1: Initialize Project (Fresh setup only) */}
        <AnimatePresence>
          {setupMode === "fresh" && (
            <motion.div
              key="step-01"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StepInitProject
                selectedPm={selectedPm}
                onSelectPm={setSelectedPm}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Pull Component with CLI Simulator */}
        <StepPullComponent
          stepNumber={setupMode === "fresh" ? "02" : "01"}
          selectedPm={selectedPm}
          onSelectPm={setSelectedPm}
        />

        {/* Step 3: Interactive Demo Sandbox */}
        <StepInteractiveLab
          stepNumber={setupMode === "fresh" ? "03" : "02"}
        />
      </div>

      {/* Dependencies Ecosystem Overview */}
      <ScrollMotionSection>
        <RuntimeDependencies />
      </ScrollMotionSection>

      {/* Troubleshooting Diagnostic Center */}
      <ScrollMotionSection>
        <TroubleshootingSection />
      </ScrollMotionSection>

      {/* Maintainer Support & Community */}
      <ScrollMotionSection>
        <SupportSection />
      </ScrollMotionSection>

      {/* Explore Components Banner */}
      <ScrollMotionSection>
        <ExploreBanner />
      </ScrollMotionSection>
    </div>
  );
}
