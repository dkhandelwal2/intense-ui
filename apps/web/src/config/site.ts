export const APP_ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  INSTALLATION: "/docs/installation",
  COMPONENTS: "/components",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/dkhandelwal2/intense-ui",
  GITHUB_ISSUES: "https://github.com/dkhandelwal2/intense-ui/issues",
  GITHUB_DISCUSSIONS: "https://github.com/dkhandelwal2/intense-ui/discussions",
  TWITTER: "https://twitter.com/dkhandelwal",
  EMAIL: "khandelwal.deepak2@gmail.com",
  MAILTO: "mailto:khandelwal.deepak2@gmail.com",
} as const;

export const REGISTRY_CONFIG = {
  NAME: "dkhandelwal2/intense-ui",
  BASE_URL: "https://intense-ui.com/r",
  DEFAULT_DEPENDENCIES_INSTALL: "npm install framer-motion lucide-react clsx tailwind-merge",
} as const;

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
