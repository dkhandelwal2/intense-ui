const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../../../');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'apps/web/src/components/ui');
const ASSETS_DIR = path.join(ROOT_DIR, 'apps/web/src/assets/svg');
const SYNC_DIR = path.join(__dirname, '../src/components');
const SYNC_ASSETS_DIR = path.join(__dirname, '../src/assets/svg');
const DIST_DIR = path.join(__dirname, '../dist');
const CONFIG_PATH = path.join(__dirname, '../registry-config.json');

function loadSiteConfig() {
  const p = path.join(ROOT_DIR, 'apps/web/src/config/site.ts');
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    const u = c.match(/SITE_URL\s*=\s*["']([^"']+)["']/);
    const idx = c.match(/REGISTRY_INDEX:\s*["']([^"']+)["']/);
    const itm = c.match(/REGISTRY_ITEM:\s*["']([^"']+)["']/);
    const pkg = c.match(/PACKAGE_NAME:\s*["']([^"']+)["']/);
    return {
      name: pkg ? pkg[1] : 'intense-ui',
      homepage: process.env.NEXT_PUBLIC_SITE_URL || (u ? u[1] : ''),
      schema: { registry: idx ? idx[1] : '', registryItem: itm ? itm[1] : '' },
    };
  }
  return { name: 'intense-ui', homepage: '', schema: { registry: '', registryItem: '' } };
}

const registryMeta = loadSiteConfig();

const KNOWN_PACKAGES = {
  'framer-motion': /from\s+["']framer-motion/,
  'lucide-react': /from\s+["']lucide-react/,
  'clsx': /from\s+["']clsx/,
  'tailwind-merge': /from\s+["']tailwind-merge/,
  'react-icons': /from\s+["']react-icons/,
  '@radix-ui/react-slot': /from\s+["']@radix-ui\/react-slot/,
  'class-variance-authority': /from\s+["']class-variance-authority/,
  'cmdk': /from\s+["']cmdk/,
  'sonner': /from\s+["']sonner/,
  'zustand': /from\s+["']zustand/,
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function detectDependencies(content) {
  return Object.entries(KNOWN_PACKAGES).filter(([, r]) => r.test(content)).map(([p]) => p);
}

function detectRegistryDependencies(content) {
  const deps = [], regex = /from\s+["']@\/components\/ui\/([^"'/]+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) deps.push(match[1]);
  return [...new Set(deps)];
}

function getTitleAndDesc(name, content) {
  const title = name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const jsdoc = content.match(/\/\*\*\s*([\s\S]*?)\*\//);
  let description = `A beautifully designed, accessible ${title} component.`;
  if (jsdoc) {
    const cleaned = jsdoc[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trim()).filter((l) => l && !l.startsWith('@')).join(' ');
    if (cleaned) description = cleaned;
  }
  return { title, description };
}

function discoverComponents() {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  const components = [];

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.includes('.draft.') || entry.name.includes('.test.')) continue;
    if (entry.isDirectory()) {
      const idx = path.join(COMPONENTS_DIR, entry.name, 'index.tsx');
      if (!fs.existsSync(idx)) continue;
      const content = fs.readFileSync(idx, 'utf8');
      const { title, description } = getTitleAndDesc(entry.name, content);
      components.push({ name: entry.name, title, description, enabled: !/(@disabled|@draft)\b/i.test(content), isDir: true });
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      const slug = entry.name.replace(/\.tsx$/, '');
      const content = fs.readFileSync(path.join(COMPONENTS_DIR, entry.name), 'utf8');
      if (/^\s*export\s+\*\s+from\s+["']\.\//.test(content.trim())) continue;
      const { title, description } = getTitleAndDesc(slug, content);
      components.push({ name: slug, title, description, enabled: !/(@disabled|@draft)\b/i.test(content), isDir: false });
    }
  }
  return components.sort((a, b) => a.name.localeCompare(b.name));
}

function syncAssets() {
  if (!fs.existsSync(ASSETS_DIR)) return;
  ensureDir(SYNC_ASSETS_DIR);
  for (const file of fs.readdirSync(ASSETS_DIR)) {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fs.writeFileSync(path.join(SYNC_ASSETS_DIR, file), fs.readFileSync(path.join(ASSETS_DIR, file)));
    }
  }
}

function buildRegistry() {
  const discovered = discoverComponents();
  const available = discovered.filter((c) => c.enabled);
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(discovered, null, 2) + '\n');

  ensureDir(DIST_DIR);
  ensureDir(path.join(DIST_DIR, 'components'));
  ensureDir(SYNC_DIR);
  syncAssets();

  const registryIndex = [];

  for (const comp of available) {
    let deps = [], regDeps = [], files = [], indexFiles = [];

    if (comp.isDir) {
      const dirPath = path.join(COMPONENTS_DIR, comp.name);
      const subFiles = fs.readdirSync(dirPath).filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes('.test.'));
      const targetSubDir = path.join(SYNC_DIR, comp.name);
      ensureDir(targetSubDir);
      const oldFlat = path.join(SYNC_DIR, `${comp.name}.tsx`);
      if (fs.existsSync(oldFlat)) fs.unlinkSync(oldFlat);

      for (const sf of subFiles) {
        const fileContent = fs.readFileSync(path.join(dirPath, sf), 'utf8');
        deps = [...new Set([...deps, ...detectDependencies(fileContent)])];
        regDeps = [...new Set([...regDeps, ...detectRegistryDependencies(fileContent)])];
        fs.writeFileSync(path.join(targetSubDir, sf), fileContent);
        files.push({ name: sf, content: fileContent, target: `components/ui/${comp.name}/${sf}` });
        indexFiles.push({ path: `packages/registry/src/components/${comp.name}/${sf}`, type: 'registry:file', target: `components/ui/${comp.name}/${sf}` });
      }
    } else {
      const content = fs.readFileSync(path.join(COMPONENTS_DIR, `${comp.name}.tsx`), 'utf8');
      deps = detectDependencies(content);
      regDeps = detectRegistryDependencies(content);
      fs.writeFileSync(path.join(SYNC_DIR, `${comp.name}.tsx`), content);
      files.push({ name: `${comp.name}.tsx`, content, target: `components/ui/${comp.name}.tsx` });
      indexFiles.push({ path: `packages/registry/src/components/${comp.name}.tsx`, type: 'registry:file', target: `components/ui/${comp.name}.tsx` });
    }

    regDeps = regDeps.filter((d) => d !== comp.name);

    const compJSON = {
      $schema: registryMeta.schema.registryItem,
      name: comp.name,
      type: 'registry:ui',
      title: comp.title,
      description: comp.description,
      dependencies: deps,
      registryDependencies: regDeps,
      files,
    };

    fs.writeFileSync(path.join(DIST_DIR, 'components', `${comp.name}.json`), JSON.stringify(compJSON, null, 2));
    registryIndex.push({
      name: comp.name,
      type: 'registry:ui',
      title: comp.title,
      description: comp.description,
      dependencies: deps,
      registryDependencies: regDeps,
      files: indexFiles,
    });
  }

  fs.writeFileSync(path.join(DIST_DIR, 'index.json'), JSON.stringify(registryIndex, null, 2));
  fs.writeFileSync(path.join(DIST_DIR, 'registry.json'), JSON.stringify({
    $schema: registryMeta.schema.registry,
    name: registryMeta.name,
    homepage: registryMeta.homepage,
    items: registryIndex,
  }, null, 2));

  const indexExports = available.map((c) => `export * from "./components/${c.name}";`).join('\n');
  fs.writeFileSync(path.join(__dirname, '../src/index.ts'), indexExports + '\n');

  console.log(`✅ Registry built! ${available.length} components published.`);
  available.forEach((c) => console.log(`   • ${c.name} — ${c.title}`));
}

buildRegistry();
