import fs from "fs";
import path from "path";
import registryConfig from "@registry-config";
import { siteConfig } from "@/config/site";

export interface RegistryFile {
  name?: string;
  path?: string;
  type?: string;
  target?: string;
  content?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const KNOWN_PACKAGES: Record<string, RegExp> = {
  "framer-motion": /from\s+["']framer-motion/,
  "lucide-react": /from\s+["']lucide-react/,
  clsx: /from\s+["']clsx/,
  "tailwind-merge": /from\s+["']tailwind-merge/,
  "react-icons": /from\s+["']react-icons/,
  "@radix-ui/react-slot": /from\s+["']@radix-ui\/react-slot/,
  "class-variance-authority": /from\s+["']class-variance-authority/,
  cmdk: /from\s+["']cmdk/,
  sonner: /from\s+["']sonner/,
  zustand: /from\s+["']zustand/,
};

export function detectDependencies(content: string): string[] {
  const deps: string[] = [];
  for (const [pkg, regex] of Object.entries(KNOWN_PACKAGES)) {
    if (regex.test(content)) {
      deps.push(pkg);
    }
  }
  return deps;
}

export function detectRegistryDependencies(content: string): string[] {
  const deps: string[] = [];
  const regex = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    deps.push(match[1]);
  }
  return [...new Set(deps)];
}

export function getComponentSource(name: string): string {
  const candidates = [
    path.resolve(process.cwd(), `../../packages/registry/src/components/${name}.tsx`),
    path.resolve(process.cwd(), `packages/registry/src/components/${name}.tsx`),
    path.resolve(process.cwd(), `src/components/ui/${name}.tsx`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, "utf-8");
    }
  }
  return "";
}

export function getDynamicRegistry(): RegistryIndex {
  const enabledComponents = registryConfig.filter((c) => c.enabled);

  const items: RegistryItem[] = enabledComponents.map((comp) => {
    const source = getComponentSource(comp.name);
    const dependencies = detectDependencies(source);
    const registryDependencies = detectRegistryDependencies(source);

    return {
      name: comp.name,
      type: "registry:ui",
      title: comp.title,
      description: comp.description,
      dependencies,
      registryDependencies,
      files: [
        {
          path: `packages/registry/src/components/${comp.name}.tsx`,
          type: "registry:file",
          target: `components/ui/${comp.name}.tsx`,
        },
      ],
    };
  });

  return {
    $schema: siteConfig.registry.SCHEMA.REGISTRY_INDEX,
    name: siteConfig.name,
    homepage: siteConfig.url,
    items,
  };
}

export function getDynamicComponentItem(name: string): (RegistryItem & { $schema: string }) | null {
  const cleanName = name.replace(/\.json$/, "");
  const comp = registryConfig.find((c) => c.name === cleanName && c.enabled);
  if (!comp) return null;

  const content = getComponentSource(comp.name);
  const dependencies = detectDependencies(content);
  const registryDependencies = detectRegistryDependencies(content);

  return {
    $schema: siteConfig.registry.SCHEMA.REGISTRY_ITEM,
    name: comp.name,
    type: "registry:ui",
    title: comp.title,
    description: comp.description,
    dependencies,
    registryDependencies,
    files: [
      {
        name: `${comp.name}.tsx`,
        content,
        target: `components/ui/${comp.name}.tsx`,
      },
    ],
  };
}
