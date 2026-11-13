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

function resolveAssetsDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "../../packages/registry/src/assets/svg"),
    path.resolve(process.cwd(), "packages/registry/src/assets/svg"),
    path.resolve(process.cwd(), "../packages/registry/src/assets/svg"),
    path.resolve(process.cwd(), "apps/web/src/assets/svg"),
    path.resolve(process.cwd(), "src/assets/svg"),
  ];
  return candidates.find((d) => fs.existsSync(d)) || "";
}

function resolveConfigDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "packages/registry/src/config"),
    path.resolve(process.cwd(), "../packages/registry/src/config"),
    path.resolve(process.cwd(), "apps/web/src/config"),
    path.resolve(process.cwd(), "src/config"),
  ];
  return candidates.find((d) => fs.existsSync(d)) || "";
}

function detectConfigDependencies(content: string): string[] {
  const configs = new Set<string>();
  if (/from\s+["']@\/config\/site["']/.test(content)) {
    configs.add("site.ts");
  }
  return Array.from(configs);
}

function getFilesRecursively(dir: string, base = ""): string[] {
  let res: string[] = [];
  if (!fs.existsSync(path.join(dir, base))) return res;
  for (const e of fs.readdirSync(path.join(dir, base), { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) res = res.concat(getFilesRecursively(dir, rel));
    else if (/\.(ts|tsx)$/.test(e.name) && !e.name.includes(".test.")) res.push(rel);
  }
  return res;
}

function detectAssetDependencies(content: string, assetsDir: string): string[] {
  const assetFiles = new Set<string>();
  if (!assetsDir || !fs.existsSync(assetsDir)) return [];

  const directRegex = /from\s+["']@\/assets\/svg\/([^"'/]+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = directRegex.exec(content)) !== null) {
    const base = m[1];
    for (const ext of [".tsx", ".ts"]) {
      const fileName = base.endsWith(ext) ? base : base + ext;
      if (fs.existsSync(path.join(assetsDir, fileName))) {
        assetFiles.add(fileName);
      }
    }
  }

  const barrelRegex = /import\s*\{([^}]+)\}\s*from\s*["']@\/assets\/svg["']/g;
  while ((m = barrelRegex.exec(content)) !== null) {
    if (fs.existsSync(path.join(assetsDir, "index.ts"))) {
      assetFiles.add("index.ts");
    }
    const identifiers = m[1].split(",").map((id) => id.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
    for (const id of identifiers) {
      for (const assetFile of fs.readdirSync(assetsDir)) {
        if (assetFile === "index.ts" || (!assetFile.endsWith(".ts") && !assetFile.endsWith(".tsx"))) continue;
        const assetSrc = fs.readFileSync(path.join(assetsDir, assetFile), "utf8");
        if (new RegExp(`export\\s+(function|const|class|interface|type)\\s+${id}\\b`).test(assetSrc)) {
          assetFiles.add(assetFile);
          const subRelRegex = /from\s+["']\.\/([^"'/]+)["']/g;
          let subM: RegExpExecArray | null;
          while ((subM = subRelRegex.exec(assetSrc)) !== null) {
            for (const subExt of [".ts", ".tsx"]) {
              const subFileName = subM[1].endsWith(subExt) ? subM[1] : subM[1] + subExt;
              if (fs.existsSync(path.join(assetsDir, subFileName))) {
                assetFiles.add(subFileName);
              }
            }
          }
        }
      }
    }
  }

  return Array.from(assetFiles);
}

export function getComponentFiles(name: string): { name: string; content: string; target: string }[] {
  const compDir = resolveCompDir();
  const assetsDir = resolveAssetsDir();
  const configDir = resolveConfigDir();
  if (!compDir) return [];

  const resultFiles: { name: string; content: string; target: string }[] = [];
  const referencedAssets = new Set<string>();
  const referencedConfigs = new Set<string>();

  const subDirPath = path.join(compDir, name);
  if (fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory()) {
    const subFiles = getFilesRecursively(subDirPath);
    for (const sf of subFiles) {
      const content = fs.readFileSync(path.join(subDirPath, sf), "utf-8");
      resultFiles.push({
        name: sf,
        content,
        target: `components/ui/${name}/${sf}`,
      });
      detectAssetDependencies(content, assetsDir).forEach((af) => referencedAssets.add(af));
      detectConfigDependencies(content).forEach((cf) => referencedConfigs.add(cf));
    }
  } else {
    const filePath = path.join(compDir, `${name}.tsx`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      resultFiles.push({
        name: `${name}.tsx`,
        content,
        target: `components/ui/${name}.tsx`,
      });
      detectAssetDependencies(content, assetsDir).forEach((af) => referencedAssets.add(af));
      detectConfigDependencies(content).forEach((cf) => referencedConfigs.add(cf));
    }
  }

  for (const af of referencedAssets) {
    if (assetsDir && fs.existsSync(path.join(assetsDir, af))) {
      resultFiles.push({
        name: `assets/svg/${af}`,
        content: fs.readFileSync(path.join(assetsDir, af), "utf-8"),
        target: `assets/svg/${af}`,
      });
    }
  }

  for (const cf of referencedConfigs) {
    if (configDir && fs.existsSync(path.join(configDir, cf))) {
      resultFiles.push({
        name: `config/${cf}`,
        content: fs.readFileSync(path.join(configDir, cf), "utf-8"),
        target: `config/${cf}`,
      });
    }
  }

  return resultFiles;
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
