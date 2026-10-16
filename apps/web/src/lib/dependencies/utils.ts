import { PackageManager } from "@/components/ui/package-manager";
import { NPM_LINKS } from "@/config/site";
import { DependencyItem } from "./types";
import {
  NPM_PACKAGE_MAP,
  KNOWN_DEPENDENCY_META,
  DEFAULT_DEPENDENCIES,
} from "./constants";

export function getNpmPackageUrl(name: string): string {
  const normalized = name.toLowerCase().trim();

  if (NPM_PACKAGE_MAP[normalized]) {
    return NPM_PACKAGE_MAP[normalized];
  }
  if (normalized.includes("tailwind-merge") || normalized.includes("tailwind-merger")) {
    return NPM_LINKS.TAILWIND_MERGE;
  }
  if (normalized.includes("framer-motion") || normalized.includes("motion")) {
    return NPM_LINKS.FRAMER_MOTION;
  }
  if (normalized.includes("lucide")) {
    return NPM_LINKS.LUCIDE_REACT;
  }
  if (normalized.includes("clsx")) {
    return NPM_LINKS.CLSX;
  }
  return `${NPM_LINKS.BASE_URL}/${encodeURIComponent(normalized)}`;
}

export function resolveActiveDependencies(
  dependencies?: DependencyItem[]
): DependencyItem[] {
  if (!dependencies || dependencies.length === 0) {
    return DEFAULT_DEPENDENCIES;
  }

  const list: DependencyItem[] = dependencies.map((dep) => {
    const meta = KNOWN_DEPENDENCY_META[dep.name];
    return {
      name: dep.name,
      version: dep.version || meta?.version || "External",
      versionColor:
        dep.versionColor ||
        meta?.versionColor ||
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      description: dep.description || meta?.description || "Required component dependency.",
      command: dep.command,
      url: dep.url || meta?.url || getNpmPackageUrl(dep.name),
    };
  });

  // Always ensure foundational clsx and tailwind-merge are present for the cn() helper
  const hasClsx = list.some((d) => d.name === "clsx" || d.name.includes("clsx"));
  const hasTwMerge = list.some((d) => d.name === "tailwind-merge" || d.name.includes("tailwind-merge"));

  if (!hasClsx) {
    list.push({
      name: "clsx",
      ...KNOWN_DEPENDENCY_META["clsx"],
    });
  }

  if (!hasTwMerge) {
    list.push({
      name: "tailwind-merge",
      ...KNOWN_DEPENDENCY_META["tailwind-merge"],
    });
  }

  return list;
}

export function extractPackageNames(
  activeDependencies: DependencyItem[],
  installCommand?: string
): string {
  if (installCommand) {
    const stripped = installCommand
      .replace(/^(npm install|npm i|pnpm add|pnpm i|yarn add|bun add)\s+/, "")
      .trim();
    if (stripped) return stripped;
  }

  const names = activeDependencies
    .flatMap((d) => (d.name.includes("&") ? d.name.split("&").map((s) => s.trim()) : [d.name]))
    .filter(Boolean);

  return Array.from(new Set(names)).join(" ");
}

export function generateManualInstallCommands(packages: string): Record<PackageManager, string> {
  return {
    npm: `npm install ${packages}`,
    pnpm: `pnpm add ${packages}`,
    yarn: `yarn add ${packages}`,
    bun: `bun add ${packages}`,
  };
}
