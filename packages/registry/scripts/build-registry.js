const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const DIST_DIR = path.join(__dirname, '../dist');
const CONFIG_PATH = path.join(__dirname, '../registry-config.json');
const ROOT_DIR = path.join(__dirname, '../../../');

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

function buildRegistry() {
  // 1. Load the shared config
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ registry-config.json not found! Create it at packages/registry/registry-config.json');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const enabledComponents = config.filter(c => c.enabled);

  if (enabledComponents.length === 0) {
    console.warn('⚠️  No enabled components found in registry-config.json');
  }

  // 2. Validate that each enabled component has a source file
  const missingFiles = [];
  for (const comp of enabledComponents) {
    const filePath = path.join(COMPONENTS_DIR, `${comp.name}.tsx`);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(comp.name);
    }
  }

  if (missingFiles.length > 0) {
    console.error(`❌ Missing source files for enabled components: ${missingFiles.join(', ')}`);
    console.error(`   Expected at: packages/registry/src/components/<name>.tsx`);
    process.exit(1);
  }

  // 3. Build
  ensureDir(DIST_DIR);
  ensureDir(path.join(DIST_DIR, 'components'));

  const registryIndex = [];

  for (const comp of enabledComponents) {
    const componentPath = path.join(COMPONENTS_DIR, `${comp.name}.tsx`);
    const content = fs.readFileSync(componentPath, 'utf8');

    // Auto-detect dependencies from source
    const dependencies = detectDependencies(content);
    const registryDependencies = detectRegistryDependencies(content);

    // Individual component JSON (for hosted registry / API route serving)
    const componentJSON = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
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

  // 5. Write root registry.json
  fs.writeFileSync(
    path.join(ROOT_DIR, 'registry.json'),
    JSON.stringify({
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "intense-ui",
      homepage: "https://intense-ui.com",
      items: registryIndex
    }, null, 2)
  );

  console.log(`✅ Registry built! ${enabledComponents.length} components published.`);
  enabledComponents.forEach(c => console.log(`   • ${c.name} — ${c.title}`));
}

buildRegistry();
