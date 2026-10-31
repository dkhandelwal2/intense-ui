import { DependencyItem, KNOWN_VERSIONS } from "@/components/layout/bento";

export const DEFAULT_DEPENDENCIES: DependencyItem[] = [
  { name: "framer-motion", version: "^11.18.2", type: "direct" },
  { name: "lucide-react", version: "^1.52.0", type: "direct" },
  { name: "clsx", version: "^2.1.1", type: "direct" },
  { name: "tailwind-merge", version: "^2.6.1", type: "direct" },
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
