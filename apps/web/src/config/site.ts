export const APP_ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  INSTALLATION: "/docs/installation",
  COMPONENTS: "/docs/components",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export const SITE_URL = "https://intense-ui.com";
export const GITHUB_REPO = "dkhandelwal2/intense-ui";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

export const SHADCN_SCHEMAS = {
  REGISTRY_INDEX: "https://ui.shadcn.com/schema/registry.json",
  REGISTRY_ITEM: "https://ui.shadcn.com/schema/registry-item.json",
} as const;

export const NPM_LINKS = {
  BASE_URL: "https://www.npmjs.com/package",
  FRAMER_MOTION: "https://www.npmjs.com/package/framer-motion",
  TAILWIND_MERGE: "https://www.npmjs.com/package/tailwind-merge",
  CLSX: "https://www.npmjs.com/package/clsx",
  LUCIDE_REACT: "https://www.npmjs.com/package/lucide-react",
} as const;

export const EXTERNAL_LINKS = {
  GITHUB: GITHUB_URL,
  GITHUB_API: `https://api.github.com/repos/${GITHUB_REPO}`,
  GITHUB_ISSUES: `${GITHUB_URL}/issues`,
  GITHUB_DISCUSSIONS: `${GITHUB_URL}/discussions`,
  TWITTER: "https://twitter.com/",
  X: "https://x.com/",
  LINKEDIN: "https://linkedin.com",
  INSTAGRAM: "https://instagram.com",
  EMAIL: "intenseui.official@gmail.com",
  MAILTO: "mailto:intenseui.official@gmail.com",
  NPM: NPM_LINKS,
  getGitHubApiUrl: (repo: string = GITHUB_REPO) => `https://api.github.com/repos/${repo}`,
} as const;

export const REGISTRY_CONFIG = {
  NAME: GITHUB_REPO,
  PACKAGE_NAME: "intense-ui",
  HOMEPAGE: SITE_URL,
  BASE_URL: `${SITE_URL}/r`,
  DEFAULT_DEPENDENCIES_INSTALL: "npm install framer-motion lucide-react clsx tailwind-merge",
  SCHEMA: SHADCN_SCHEMAS,
} as const;

export type SupportedPackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function getComponentAddCommand(
  pm: SupportedPackageManager | string,
  componentSlug: string
): string {
  const registry = REGISTRY_CONFIG.NAME;
  switch (pm) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${registry}/${componentSlug}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${registry}/${componentSlug}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${registry}/${componentSlug}`;
    default:
      return `npx shadcn@latest add ${registry}/${componentSlug}`;
  }
}

export function getShadcnInitCommand(pm: SupportedPackageManager | string): string {
  switch (pm) {
    case "pnpm":
      return "pnpm dlx shadcn@latest init";
    case "bun":
      return "bunx --bun shadcn@latest init";
    case "yarn":
      return "yarn dlx shadcn@latest init";
    default:
      return "npx shadcn@latest init";
  }
}

export interface HeaderNavItem {
  label: string;
  href: string;
  matchExact?: boolean;
  isFeatured?: boolean;
}

export const HEADER_NAV_ITEMS: readonly HeaderNavItem[] = [
  { label: "Home", href: "/", matchExact: true },
  { label: "Documentation", href: "/docs", matchExact: true },
  { label: "Components", href: "/docs/components", isFeatured: true },
  { label: "Installation", href: "/docs/installation" },
] as const;

export const HEADER_CONFIG = {
  /**
   * Navigation links displayed in the header pill and mobile menu overlay.
   * Fully configurable: reorder, add, or customize links here.
   */
  navItems: HEADER_NAV_ITEMS,
  /**
   * Scroll distance (in pixels) over which the header dynamic island collapses.
   * Header uses 80px for responsive compacting.
   */
  scrollDistance: 80,
} as const;

export const SIDEBAR_CONFIG = {
  /**
   * Whether manual open/close sidebar toggle button is enabled.
   * Disabled as of now via config.
   */
  enableManualToggle: false,
  /**
   * Whether the sidebar collapses on scroll.
   */
  collapseOnScroll: false,
  /**
   * Whether scroll collapse is restricted to component documentation pages only.
   * When true, pages like /docs and /docs/installation stay expanded on scroll.
   */
  collapseOnlyOnComponentPages: true,
  /**
   * Scroll distance (in pixels) over which the sidebar collapses smoothly.
   * At 0px: fully expanded (250px). At scrollDistance: fully compact (68px).
   * Direct 1:1 scrubbed tracking with scroll position.
   * 180px provides a comfortable, smooth and gradual pacing.
   */
  scrollDistance: 250,
  /**
   * Whether the collapsed sidebar expands on hover.
   */
  expandOnHover: true,
  /**
   * Whether component status badges (e.g. "New", "Hot") are shown in the sidebar.
   * Configurable: currently disabled (removed as of now). Set to true to re-enable.
   */
  showBadges: false,
  /**
   * Configurable component badges mapping (slug -> { badge, color }).
   */
  componentBadges: {
    accordion: { badge: "Hot", color: "rose" },
    button: { badge: "New", color: "emerald" },
    "animated-button": { badge: "New", color: "emerald" },
  } as Record<string, { badge: string; color?: "rose" | "emerald" | "blue" | "zinc" }>,
} as const;

export const siteConfig = {
  name: REGISTRY_CONFIG.PACKAGE_NAME,
  url: SITE_URL,
  githubRepo: GITHUB_REPO,
  description:
    "Beautifully designed animated components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  author: {
    name: "dkhandelwal",
    twitter: EXTERNAL_LINKS.TWITTER,
    email: EXTERNAL_LINKS.EMAIL,
  },
  links: {
    twitter: EXTERNAL_LINKS.TWITTER,
    x: EXTERNAL_LINKS.X,
    linkedin: EXTERNAL_LINKS.LINKEDIN,
    instagram: EXTERNAL_LINKS.INSTAGRAM,
    github: EXTERNAL_LINKS.GITHUB,
    githubApi: EXTERNAL_LINKS.GITHUB_API,
    issues: EXTERNAL_LINKS.GITHUB_ISSUES,
    discussions: EXTERNAL_LINKS.GITHUB_DISCUSSIONS,
    email: EXTERNAL_LINKS.MAILTO,
  },
  routes: APP_ROUTES,
  registry: REGISTRY_CONFIG,
  header: HEADER_CONFIG,
  sidebar: SIDEBAR_CONFIG,
};

export type SiteConfig = typeof siteConfig;
