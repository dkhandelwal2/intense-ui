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

export function discoverRegistryComponents(): { name: string; title: string; description: string; enabled: boolean }[] {
  const dirCandidates = [
    path.resolve(process.cwd(), "../../packages/registry/src/components"),
    path.resolve(process.cwd(), "packages/registry/src/components"),
    path.resolve(process.cwd(), "../packages/registry/src/components"),
  ];
  const compDir = dirCandidates.find((d) => fs.existsSync(d));
  if (!compDir) return registryConfig;

  const files = fs
    .readdirSync(compDir)
    .filter(
      (f) =>
        f.endsWith(".tsx") &&
        !f.startsWith("_") &&
        !f.includes(".draft.") &&
        !f.includes(".test.")
    );
  const components = [];

  for (const file of files) {
    const slug = file.replace(/\.tsx$/, "");
    const filePath = path.join(compDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Skip pure re-exports / alias files
    if (/^\s*export\s+\*\s+from\s+["']\.\//.test(content.trim())) {
      continue;
    }

    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\*\//);
    let description = "";
    if (jsdocMatch) {
      const cleaned = jsdocMatch[1]
        .split("\n")
        .map((l) => l.replace(/^\s*\*\s?/, "").trim())
        .filter((l) => l && !l.startsWith("@"))
        .join(" ");
      if (cleaned) description = cleaned;
    }
    if (!description) {
      description = `A beautifully designed, accessible ${title} component.`;
    }

    // Support drafting/hiding via '@draft' or '@disabled' annotations
    const isDraftOrDisabled = /(@disabled|@draft)\b/i.test(content);

    components.push({
      name: slug,
      title,
      description,
      enabled: !isDraftOrDisabled,
    });
  }

  components.sort((a, b) => a.name.localeCompare(b.name));
  return components.length > 0 ? components : registryConfig;
}

export function getDynamicRegistry(): RegistryIndex {
  const enabledComponents = discoverRegistryComponents().filter((c) => c.enabled);

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
  const comp = discoverRegistryComponents().find((c) => c.name === cleanName && c.enabled);
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
