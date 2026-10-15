const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const DIST_DIR = path.join(__dirname, '../dist');

// Map of components and their dependencies
const components = {
  'animated-button': {
    name: 'animated-button',
    dependencies: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
    registryDependencies: [],
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildRegistry() {
  ensureDir(DIST_DIR);
  ensureDir(path.join(DIST_DIR, 'components'));

  const registryIndex = [];

  for (const [name, metadata] of Object.entries(components)) {
    const componentPath = path.join(COMPONENTS_DIR, `${name}.tsx`);
    
    let content = '';
    if (fs.existsSync(componentPath)) {
      content = fs.readFileSync(componentPath, 'utf8');
    } else {
      console.warn(`Warning: File not found for component ${name}`);
      continue;
    }

    const componentJSON = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: metadata.name,
      type: "registry:ui",
      dependencies: metadata.dependencies,
      registryDependencies: metadata.registryDependencies,
      files: [
        {
          name: `${name}.tsx`,
          content: content
        }
      ]
    };

    // Write individual component JSON
    fs.writeFileSync(
      path.join(DIST_DIR, 'components', `${name}.json`),
      JSON.stringify(componentJSON, null, 2)
    );

    // Add to index
    registryIndex.push({
      name: metadata.name,
      type: "registry:ui",
      dependencies: metadata.dependencies,
      registryDependencies: metadata.registryDependencies,
      files: [`${name}.tsx`]
    });
  }

  // Write full registry index
  fs.writeFileSync(
    path.join(DIST_DIR, 'index.json'),
    JSON.stringify(registryIndex, null, 2)
  );

  console.log('Registry built successfully in dist/ !');
}

buildRegistry();
