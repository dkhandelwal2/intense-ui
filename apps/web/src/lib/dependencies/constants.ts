import { NPM_LINKS } from "@/config/site";
import { DependencyItem, DependencyMeta } from "./types";

export const NPM_PACKAGE_MAP: Record<string, string> = {
  "framer-motion": NPM_LINKS.FRAMER_MOTION,
  "motion": NPM_LINKS.FRAMER_MOTION,
  "tailwind-merge": NPM_LINKS.TAILWIND_MERGE,
  "tailwind-merger": NPM_LINKS.TAILWIND_MERGE,
  "clsx": NPM_LINKS.CLSX,
  "lucide-react": NPM_LINKS.LUCIDE_REACT,
  "lucide": NPM_LINKS.LUCIDE_REACT,
};

export const KNOWN_DEPENDENCY_META: Record<string, DependencyMeta> = {
  "framer-motion": {
    version: "v11 / v12",
    versionColor: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    description: "Powers spring physics, gestures, fluid layout morphing, and GPU-accelerated enter/exit animations.",
    url: NPM_LINKS.FRAMER_MOTION,
  },
  "lucide-react": {
    version: "^0.400+",
    versionColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    description: "Ultra-crisp, tree-shakeable SVG icon system matching official shadcn ecosystem standards.",
    url: NPM_LINKS.LUCIDE_REACT,
  },
  "clsx": {
    version: "^2.1.0",
    versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: "Constructs className strings conditionally without overhead.",
    url: NPM_LINKS.CLSX,
  },
  "tailwind-merge": {
    version: "^2.5.0",
    versionColor: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    description: "Safely merges Tailwind CSS classes without style conflicts.",
    url: NPM_LINKS.TAILWIND_MERGE,
  },
  "clsx & tailwind-merge": {
    version: "Utility",
    versionColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: "Provides the cn() helper to resolve Tailwind CSS class conflicts safely and conditionally.",
    url: NPM_LINKS.TAILWIND_MERGE,
  },
};

export const DEFAULT_DEPENDENCIES: DependencyItem[] = [
  {
    name: "framer-motion",
    ...KNOWN_DEPENDENCY_META["framer-motion"],
  },
  {
    name: "lucide-react",
    ...KNOWN_DEPENDENCY_META["lucide-react"],
  },
  {
    name: "clsx",
    ...KNOWN_DEPENDENCY_META["clsx"],
  },
  {
    name: "tailwind-merge",
    ...KNOWN_DEPENDENCY_META["tailwind-merge"],
  },
];
