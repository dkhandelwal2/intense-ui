import type { Metadata } from "next";
import {
  DocsHero,
  DocsHolodeckStage,
  DocsInteractiveBento,
  DocsPillars,
  DocsFaq,
} from "./_components";
import { ExploreBanner, SupportSection } from "@/components/docs";

export const metadata: Metadata = {
  title: "Documentation - Intense UI",
  description:
    "Explore the architecture, spatial physics, and implementation guides for Intense UI components.",
};

export default function DocumentationPage() {
  return (
    <div className="relative w-full min-w-0">
      {/* Main Documentation Container (Strictly unified max-w-5xl) */}
      <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-6 md:px-8 space-y-16 sm:space-y-24 overflow-x-clip min-w-0">
        {/* Ambient background glows for spatial atmosphere */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[700px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[var(--theme-primary)]/15 via-pink-500/10 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-[1100px] right-0 w-[260px] sm:w-[480px] h-[260px] sm:h-[480px] bg-purple-500/10 blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-[2200px] left-0 w-[260px] sm:w-[480px] h-[260px] sm:h-[480px] bg-emerald-500/8 blur-3xl -z-10 rounded-full" />

        {/* 2. Iridescent Spatial Hero */}
        <div className="w-full">
          <DocsHero />
        </div>

        {/* 3. The Spatial Holodeck */}
        <div className="w-full">
          <DocsHolodeckStage />
        </div>

        {/* 4. Touch, Drag & Draw: Live Interactive Bento Matrix */}
        <div className="w-full">
          <DocsInteractiveBento />
        </div>

        {/* 5. Core Architectural Pillars (Apple/Linear Stacking Cards) */}
        <div className="w-full">
          <DocsPillars />
        </div>

        {/* 6. Architecture & Integration FAQ */}
        <div className="w-full">
          <DocsFaq />
        </div>

        {/* 7. Maintainer Support & Community */}
        <div className="w-full">
          <SupportSection />
        </div>

        {/* 8. Next Steps Banner */}
        <div className="w-full">
          <ExploreBanner />
        </div>
      </div>
    </div>
  );
}
