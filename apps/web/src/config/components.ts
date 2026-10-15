/**
 * Single source of truth: packages/registry/registry-config.json
 * This file imports from the shared config so web app and registry stay in sync.
 */
import registryConfig from "../../../../packages/registry/registry-config.json";

export type ComponentConfig = {
  name: string;
  href: string;
  enabled: boolean;
  description: string;
};

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const componentsConfig: ComponentConfig[] = registryConfig.map((c) => ({
  name: c.title,
  href: `/docs/components/${toSlug(c.name)}`,
  enabled: c.enabled,
  description: c.description,
}));
