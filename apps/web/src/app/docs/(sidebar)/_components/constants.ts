import { Sparkles, Layers, Zap, ShieldCheck } from "lucide-react";
import type { DocPillar, DocFaqItem } from "./types";

export const DOC_PILLARS: DocPillar[] = [
  {
    id: "spatial-motion",
    number: "01",
    title: "Spatial Micro-Interactions",
    tagline: "Natural spring physics & tactile depth",
    description: "Every component is engineered with real-world physical models. Fluid springs, dynamic island notches, and reactive screensavers make your UI feel tactile rather than robotic.",
    icon: Sparkles,
    accentColor: "text-[var(--theme-primary)]",
    glowColor: "from-[var(--theme-primary)]/30 to-pink-500/20",
    gradient: "from-[var(--theme-primary)] via-pink-400 to-purple-400",
    highlights: ["60+ FPS Compositor Motion", "Adaptive Spring Dampening", "Interactive Spatial Dock"],
  },
  {
    id: "direct-ownership",
    number: "02",
    title: "Direct Code Ownership",
    tagline: "Zero monolithic dependency lock-in",
    description: "No opaque npm library abstractions. Components live directly in your codebase via our shadcn-compatible CLI registry or simple copy-paste. You retain 100% control over every line.",
    icon: Layers,
    accentColor: "text-amber-500",
    glowColor: "from-amber-500/30 to-orange-500/20",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    highlights: ["Shadcn-Compatible Registry", "Tailwind 4 Native", "Zero Bloat Runtime"],
  },
  {
    id: "web-vitals",
    number: "03",
    title: "Core Web Vitals First",
    tagline: "Zero CLS & lightning-fast LCP",
    description: "Designed from ground zero to satisfy Staff-level engineering constraints: zero Cumulative Layout Shift, CSS-driven theme toggling, sub-50ms static generation, and lightweight bundles.",
    icon: Zap,
    accentColor: "text-emerald-500",
    glowColor: "from-emerald-500/30 to-teal-500/20",
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    highlights: ["Sub-50ms Edge SSG", "Zero Layout Shift", "Compositor-Only Transforms"],
  },
  {
    id: "typescript-strict",
    number: "04",
    title: "Strict TypeScript & ARIA",
    tagline: "Accessible & enterprise-grade contracts",
    description: "Built on rigorous WAI-ARIA standards and full keyboard navigation. Strictly typed component contracts with zero arbitrary types ensure resilient developer ergonomics.",
    icon: ShieldCheck,
    accentColor: "text-blue-500",
    glowColor: "from-blue-500/30 to-indigo-500/20",
    gradient: "from-blue-400 via-indigo-400 to-violet-400",
    highlights: ["WAI-ARIA Pattern Compliance", "Keyboard Navigation (Tab/Arrows)", "Strict Type Unions"],
  },
];

export const DOC_FAQS: DocFaqItem[] = [
  {
    category: "Architecture",
    question: "How does Intense UI differ from standard Shadcn UI?",
    answer: "Shadcn UI provides clean, minimal design primitives. Intense UI builds on top of that same copy-paste philosophy, but elevates it with spatial interactions: fluid spring animations, interactive dynamic islands, 3D visualizations, and interactive component playgrounds.",
  },
  {
    category: "Integration",
    question: "Can I use Intense UI with Next.js App Router and React Server Components?",
    answer: "Yes, 100%. All client-interactive wrappers are cleanly isolated with 'use client' directives, while documentation and component layouts are pre-rendered statically with zero hydration mismatches.",
  },
  {
    category: "Dependencies",
    question: "Do I have to install all dependencies at once?",
    answer: "No! Each component specifies only the exact minimal dependencies it requires (such as lucide-react or framer-motion). Our CLI automatically inspects and installs only the specific packages needed for that component.",
  },
  {
    category: "Styling",
    question: "How do I customize colors and theme variables?",
    answer: "Intense UI uses CSS custom properties defined in your globals.css (such as --theme-primary and --radius). Modifying these variables instantly cascades through all components, supporting both light and dark modes.",
  },
];
