export const EXTERNAL_LINKS = {
  GOOGLE_MAPS: "https://maps.google.com/?q=",
  getGoogleMapsUrl: (query: string) => `https://maps.google.com/?q=${encodeURIComponent(query)}`,
} as const;

export const siteConfig = {
  links: {
    googleMaps: EXTERNAL_LINKS.GOOGLE_MAPS,
  },
} as const;
