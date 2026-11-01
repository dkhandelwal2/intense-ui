import type { DependencyItem } from "../../types";
import { KNOWN_VERSIONS, PEER_DEPENDENCIES } from "../../constants";

export const DEFAULT_DEPENDENCIES: DependencyItem[] = [
  { name: "framer-motion", version: "^11.18.2", type: "direct" },
  { name: "lucide-react", version: "^1.52.0", type: "direct" },
  { name: "clsx", version: "^2.1.1", type: "direct" },
  { name: "tailwind-merge", version: "^2.6.1", type: "direct" },
];

export const FILTER_TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "direct" as const, label: "DIRECT" },
  { id: "peer" as const, label: "PEER" },
];

export const MARQUEE_TRACKS = [
  { id: "track-1", direction: "ltr" as const, rowIdx: 0 },
  { id: "track-2", direction: "rtl" as const, rowIdx: 1 },
  { id: "track-3", direction: "ltr" as const, rowIdx: 2 },
];

/**
 * Resolves direct dependencies for a component, falling back to standard dependencies.
 */
export function resolveDirectDependencies(
  dependencies?: { name: string; command: string }[]
): DependencyItem[] {
  if (dependencies && dependencies.length > 0) {
    return dependencies.map((d) => ({
      name: d.name,
      version: KNOWN_VERSIONS[d.name] || "^1.0.0",
      type: "direct" as const,
    }));
  }
  return DEFAULT_DEPENDENCIES;
}

/**
 * Returns package manager command to install a single package
 */
export function getPackageInstallCommand(pkg: string, packageManager = "pnpm"): string {
  switch (packageManager) {
    case "npm":
      return `npm i ${pkg}`;
    case "yarn":
      return `yarn add ${pkg}`;
    case "bun":
      return `bun add ${pkg}`;
    case "pnpm":
    default:
      return `pnpm add ${pkg}`;
  }
}

/**
 * Fills a track row with repeated items until at least length 6 for seamless marquee looping
 */
export function fillTrack(items: DependencyItem[]): DependencyItem[] {
  let res = [...items];
  while (res.length < 6) {
    res = [...res, ...items];
  }
  return res;
}

/**
 * Builds 3 balanced rows mixing direct and peer dependencies for marquee tracks
 */
export function buildMarqueeRows(
  directDeps: DependencyItem[]
): [DependencyItem[], DependencyItem[], DependencyItem[]] {
  return [
    [
      directDeps[0] || PEER_DEPENDENCIES[0],
      PEER_DEPENDENCIES[0],
      directDeps[2] || PEER_DEPENDENCIES[4],
      PEER_DEPENDENCIES[4],
    ],
    [
      directDeps[1] || PEER_DEPENDENCIES[1],
      PEER_DEPENDENCIES[1],
      directDeps[3] || PEER_DEPENDENCIES[5],
    ],
    [
      PEER_DEPENDENCIES[2],
      PEER_DEPENDENCIES[3],
      PEER_DEPENDENCIES[5],
    ],
  ];
}
