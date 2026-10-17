/**
 * Single source of truth: packages/registry/registry-config.json
 * This file imports from the shared config so web app and registry stay in sync.
 */
import registryConfig from "@registry-config";

export type ComponentConfig = {
  name: string;
  slug: string;
  href: string;
  enabled: boolean;
  description: string;
};

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const componentsConfig: ComponentConfig[] = registryConfig.map((c) => {
  const slug = toSlug(c.name);
  return {
    name: c.title,
    slug,
    href: `/docs/components/${slug}`,
    enabled: c.enabled,
    description: c.description,
  };
});
