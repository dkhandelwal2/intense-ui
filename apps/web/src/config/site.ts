export const APP_ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  INSTALLATION: "/docs/installation",
  COMPONENTS: "/components",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export const NPM_LINKS = {
  BASE_URL: "https://www.npmjs.com/package",
  FRAMER_MOTION: "https://www.npmjs.com/package/framer-motion",
  TAILWIND_MERGE: "https://www.npmjs.com/package/tailwind-merge",
  CLSX: "https://www.npmjs.com/package/clsx",
  LUCIDE_REACT: "https://www.npmjs.com/package/lucide-react",
} as const;

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/dkhandelwal2/intense-ui",
  GITHUB_ISSUES: "https://github.com/dkhandelwal2/intense-ui/issues",
  GITHUB_DISCUSSIONS: "https://github.com/dkhandelwal2/intense-ui/discussions",
  TWITTER: "https://twitter.com/dkhandelwal",
  EMAIL: "intenseui.official@gmail.com",
  MAILTO: "mailto:intenseui.official@gmail.com",
  NPM: NPM_LINKS,
} as const;

export const REGISTRY_CONFIG = {
  NAME: "dkhandelwal2/intense-ui",
  BASE_URL: "https://intense-ui.com/r",
  DEFAULT_DEPENDENCIES_INSTALL: "npm install framer-motion lucide-react clsx tailwind-merge",
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

export const siteConfig = {
  name: "intense-ui",
  url: "https://intense-ui.com",
  description:
    "Beautifully designed animated components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  author: {
    name: "dkhandelwal",
    twitter: EXTERNAL_LINKS.TWITTER,
    email: EXTERNAL_LINKS.EMAIL,
  },
  links: {
    twitter: EXTERNAL_LINKS.TWITTER,
    github: EXTERNAL_LINKS.GITHUB,
    issues: EXTERNAL_LINKS.GITHUB_ISSUES,
    discussions: EXTERNAL_LINKS.GITHUB_DISCUSSIONS,
    email: EXTERNAL_LINKS.MAILTO,
  },
  routes: APP_ROUTES,
  registry: REGISTRY_CONFIG,
};

export type SiteConfig = typeof siteConfig;
