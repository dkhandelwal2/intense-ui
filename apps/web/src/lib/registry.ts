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
  return Object.entries(KNOWN_PACKAGES).filter(([, regex]) => regex.test(content)).map(([pkg]) => pkg);
}

export function detectRegistryDependencies(content: string): string[] {
  const deps: string[] = [];
  const regex = /from\s+["']@\/components\/ui\/([^"'/]+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) deps.push(match[1]);
  return [...new Set(deps)];
}

function resolveCompDir(): string {
  const dirCandidates = [
    path.resolve(process.cwd(), "../../packages/registry/src/components"),
    path.resolve(process.cwd(), "packages/registry/src/components"),
    path.resolve(process.cwd(), "../packages/registry/src/components"),
    path.resolve(process.cwd(), "apps/web/src/components/ui"),
    path.resolve(process.cwd(), "src/components/ui"),
  ];
  return dirCandidates.find((d) => fs.existsSync(d)) || "";
}

export function getComponentFiles(name: string): { name: string; content: string; target: string }[] {
  const compDir = resolveCompDir();
  if (!compDir) return [];

  const subDirPath = path.join(compDir, name);
  if (fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory()) {
    const subFiles = fs.readdirSync(subDirPath).filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes(".test."));
    return subFiles.map((sf) => ({
      name: sf,
      content: fs.readFileSync(path.join(subDirPath, sf), "utf-8"),
      target: `components/ui/${name}/${sf}`,
    }));
  }

  const filePath = path.join(compDir, `${name}.tsx`);
  if (fs.existsSync(filePath)) {
    return [{ name: `${name}.tsx`, content: fs.readFileSync(filePath, "utf-8"), target: `components/ui/${name}.tsx` }];
  }
  return [];
}

export function getComponentSource(name: string): string {
  const files = getComponentFiles(name);
  const indexFile = files.find((f) => f.name === "index.tsx") || files[0];
  return indexFile ? indexFile.content : "";
}

export function discoverRegistryComponents(): { name: string; title: string; description: string; enabled: boolean }[] {
  const compDir = resolveCompDir();
  if (!compDir) return registryConfig;

  const entries = fs.readdirSync(compDir, { withFileTypes: true });
  const components: { name: string; title: string; description: string; enabled: boolean }[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.includes(".draft.") || entry.name.includes(".test.")) continue;

    let slug = "", content = "";
    if (entry.isDirectory()) {
      const idx = path.join(compDir, entry.name, "index.tsx");
      if (!fs.existsSync(idx)) continue;
      slug = entry.name;
      content = fs.readFileSync(idx, "utf-8");
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      slug = entry.name.replace(/\.tsx$/, "");
      content = fs.readFileSync(path.join(compDir, entry.name), "utf-8");
      if (/^\s*export\s+\*\s+from\s+["']\.\//.test(content.trim())) continue;
    } else {
      continue;
    }

    const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\*\//);
    let description = "";
    if (jsdocMatch) {
      const cleaned = jsdocMatch[1].split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim()).filter((l) => l && !l.startsWith("@")).join(" ");
      if (cleaned) description = cleaned;
    }
    if (!description) description = `A beautifully designed, accessible ${title} component.`;

    components.push({ name: slug, title, description, enabled: !/(@disabled|@draft)\b/i.test(content) });
  }

  components.sort((a, b) => a.name.localeCompare(b.name));
  return components.length > 0 ? components : registryConfig;
}

export function getDynamicRegistry(): RegistryIndex {
  const enabledComponents = discoverRegistryComponents().filter((c) => c.enabled);

  const items: RegistryItem[] = enabledComponents.map((comp) => {
    const files = getComponentFiles(comp.name);
    let deps: string[] = [], regDeps: string[] = [];
    for (const f of files) {
      deps = [...new Set([...deps, ...detectDependencies(f.content)])];
      regDeps = [...new Set([...regDeps, ...detectRegistryDependencies(f.content)])];
    }
    regDeps = regDeps.filter((d) => d !== comp.name);

    return {
      name: comp.name,
      type: "registry:ui",
      title: comp.title,
      description: comp.description,
      dependencies: deps,
      registryDependencies: regDeps,
      files: files.map((f) => ({
        path: `packages/registry/src/components/${comp.name}${f.name === `${comp.name}.tsx` ? ".tsx" : `/${f.name}`}`,
        type: "registry:file",
        target: f.target,
      })),
    };
  });

  return { $schema: siteConfig.registry.SCHEMA.REGISTRY_INDEX, name: siteConfig.name, homepage: siteConfig.url, items };
}

export function getDynamicComponentItem(name: string): (RegistryItem & { $schema: string }) | null {
  const cleanName = name.replace(/\.json$/, "");
  const comp = discoverRegistryComponents().find((c) => c.name === cleanName && c.enabled);
  if (!comp) return null;

  const files = getComponentFiles(comp.name);
  let deps: string[] = [], regDeps: string[] = [];
  for (const f of files) {
    deps = [...new Set([...deps, ...detectDependencies(f.content)])];
    regDeps = [...new Set([...regDeps, ...detectRegistryDependencies(f.content)])];
  }
  regDeps = regDeps.filter((d) => d !== comp.name);

  return {
    $schema: siteConfig.registry.SCHEMA.REGISTRY_ITEM,
    name: comp.name,
    type: "registry:ui",
    title: comp.title,
    description: comp.description,
    dependencies: deps,
    registryDependencies: regDeps,
    files,
  };
}
