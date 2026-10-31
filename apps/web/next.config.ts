import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

function syncRegistryConfig() {
  try {
    const dirCandidates = [
      path.resolve(process.cwd(), "../../packages/registry"),
      path.resolve(process.cwd(), "../packages/registry"),
      path.resolve(process.cwd(), "packages/registry"),
    ];
    const registryPkgDir = dirCandidates.find((d) => fs.existsSync(path.join(d, "src/components")));
    if (!registryPkgDir) return;

    const compDir = path.join(registryPkgDir, "src/components");
    const configPath = path.join(registryPkgDir, "registry-config.json");

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
      const content = fs.readFileSync(path.join(compDir, file), "utf8");

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

      const isDraftOrDisabled = /(@disabled|@draft)\b/i.test(content);

      components.push({
        name: slug,
        title,
        description,
        enabled: !isDraftOrDisabled,
      });
    }

    components.sort((a, b) => a.name.localeCompare(b.name));
    const newContent = JSON.stringify(components, null, 2) + "\n";

    let existingContent = "";
    if (fs.existsSync(configPath)) {
      existingContent = fs.readFileSync(configPath, "utf8");
    }

    if (newContent !== existingContent) {
      fs.writeFileSync(configPath, newContent, "utf8");
      console.log(`[registry] Synced registry-config.json (${components.filter((c) => c.enabled).length} active, ${components.filter((c) => !c.enabled).length} drafted/hidden)`);
    }
  } catch (err) {
    console.error("[registry] Error syncing registry-config:", err);
  }
}

// 1. Sync on Next.js startup/build
syncRegistryConfig();

// 2. In dev mode, watch packages/registry/src/components for live changes
if (process.env.NODE_ENV !== "production") {
  const dirCandidates = [
    path.resolve(process.cwd(), "../../packages/registry/src/components"),
    path.resolve(process.cwd(), "../packages/registry/src/components"),
    path.resolve(process.cwd(), "packages/registry/src/components"),
  ];
  const compDir = dirCandidates.find((d) => fs.existsSync(d));

  if (compDir) {
    let watchDebounce: NodeJS.Timeout | null = null;
    try {
      fs.watch(compDir, (_eventType, filename) => {
        if (!filename || !filename.endsWith(".tsx")) return;
        if (watchDebounce) clearTimeout(watchDebounce);
        watchDebounce = setTimeout(() => {
          syncRegistryConfig();
        }, 150);
      });
    } catch {
      // Ignore if fs.watch is not available
    }
  }
}

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/r/:path*",
        destination: "/registry/:path*",
      },
    ];
  },
};

export default nextConfig;
