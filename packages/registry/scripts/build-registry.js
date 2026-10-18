const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const DIST_DIR = path.join(__dirname, '../dist');
const CONFIG_PATH = path.join(__dirname, '../registry-config.json');
const ROOT_DIR = path.join(__dirname, '../../');

// Dynamically read site configuration from the single source of truth: apps/web/src/config/site.ts
function loadSiteConfig() {
  const siteConfigPath = path.join(ROOT_DIR, 'apps/web/src/config/site.ts');
  if (fs.existsSync(siteConfigPath)) {
    const content = fs.readFileSync(siteConfigPath, 'utf8');
    const siteUrlMatch = content.match(/SITE_URL\s*=\s*["']([^"']+)["']/);
    const registryIndexMatch = content.match(/REGISTRY_INDEX:\s*["']([^"']+)["']/);
    const registryItemMatch = content.match(/REGISTRY_ITEM:\s*["']([^"']+)["']/);
    const packageNameMatch = content.match(/PACKAGE_NAME:\s*["']([^"']+)["']/);

    return {
      name: packageNameMatch ? packageNameMatch[1] : 'intense-ui',
      homepage: process.env.NEXT_PUBLIC_SITE_URL || (siteUrlMatch ? siteUrlMatch[1] : ''),
      schema: {
        registry: registryIndexMatch ? registryIndexMatch[1] : '',
        registryItem: registryItemMatch ? registryItemMatch[1] : '',
      },
    };
  }
  return {
    name: 'intense-ui',
    homepage: process.env.NEXT_PUBLIC_SITE_URL || '',
    schema: { registry: '', registryItem: '' },
  };
}

const registryMeta = loadSiteConfig();

// Known npm packages that can appear in component imports
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
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Auto-detect npm dependencies by scanning import statements in the source file.
 */
function detectDependencies(content) {
  const deps = [];
  for (const [pkg, regex] of Object.entries(KNOWN_PACKAGES)) {
    if (regex.test(content)) {
      deps.push(pkg);
    }
  }
  return deps;
}

/**
 * Auto-detect shadcn registryDependencies (e.g. imports from @/components/ui/button)
 */
function detectRegistryDependencies(content) {
  const deps = [];
  const regex = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    deps.push(match[1]);
  }
  return [...new Set(deps)];
}

function discoverComponents() {
  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(
      (f) =>
        f.endsWith('.tsx') &&
        !f.startsWith('_') &&
        !f.includes('.draft.') &&
        !f.includes('.test.')
    );
  const components = [];

  for (const file of files) {
    const slug = file.replace(/\.tsx$/, '');
    const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8');

    // Skip pure re-exports / alias files (e.g. export * from "./...")
    if (/^\s*export\s+\*\s+from\s+["']\.\//.test(content.trim())) {
      continue;
    }

    const title = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    // Extract description from JSDoc or use fallback
    const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\*\//);
    let description = '';
    if (jsdocMatch) {
      const cleaned = jsdocMatch[1]
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, '').trim())
        .filter((l) => l && !l.startsWith('@'))
        .join(' ');
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

  // Sort components alphabetically for consistency
  components.sort((a, b) => a.name.localeCompare(b.name));
  return components;
}

function buildRegistry() {
  // 1. Dynamically discover all components from the filesystem
  const discoveredComponents = discoverComponents();
  const availableComponents = discoveredComponents.filter(c => c.enabled);

  // 2. Auto-sync registry-config.json so client bundles stay 100% in sync without manual editing
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(discoveredComponents, null, 2) + '\n');

  // 3. Build
  ensureDir(DIST_DIR);
  ensureDir(path.join(DIST_DIR, 'components'));

  const registryIndex = [];

  for (const comp of availableComponents) {
    const componentPath = path.join(COMPONENTS_DIR, `${comp.name}.tsx`);
    const content = fs.readFileSync(componentPath, 'utf8');

    // Auto-detect dependencies from source
    const dependencies = detectDependencies(content);
    const registryDependencies = detectRegistryDependencies(content);

    // Individual component JSON (for hosted registry / API route serving)
    const componentJSON = {
      $schema: registryMeta.schema.registryItem,
      name: comp.name,
      type: "registry:ui",
      title: comp.title,
      description: comp.description,
      dependencies,
      registryDependencies,
      files: [
        {
          name: `${comp.name}.tsx`,
          content: content,
          target: `components/ui/${comp.name}.tsx`
        }
      ]
    };

    fs.writeFileSync(
      path.join(DIST_DIR, 'components', `${comp.name}.json`),
      JSON.stringify(componentJSON, null, 2)
    );

    // Registry index entry (for GitHub-based registry)
    registryIndex.push({
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
          target: `components/ui/${comp.name}.tsx`
        }
      ]
    });
  }

  // 4. Write dist index
  fs.writeFileSync(
    path.join(DIST_DIR, 'index.json'),
    JSON.stringify(registryIndex, null, 2)
  );

  // 5. Write dist registry.json
  fs.writeFileSync(
    path.join(DIST_DIR, 'registry.json'),
    JSON.stringify({
      $schema: registryMeta.schema.registry,
      name: registryMeta.name,
      homepage: registryMeta.homepage,
      items: registryIndex
    }, null, 2)
  );

  console.log(`✅ Registry built! ${availableComponents.length} components published.`);
  availableComponents.forEach(c => console.log(`   • ${c.name} — ${c.title}`));
}

buildRegistry();
