import { tr } from "framer-motion/client";

export type ComponentConfig = {
  name: string;
  href: string;
  enabled: boolean;
  description: string;
};

export const componentsConfig: ComponentConfig[] = [
  {
    name: "Accordion",
    href: "/docs/components/accordion",
    enabled: true,
    description: "A beautifully animated accordion component."
  },
  {
    name: "Switch",
    href: "/docs/components/switch",
    enabled: true,
    description: "A highly customizable 3D rocker switch."
  },
  {
    name: "Slider",
    href: "/docs/components/slider",
    enabled: true,
    description: "A highly customizable 3D slider."
  },
  {
    name: "Tooltip",
    href: "/docs/components/tooltip",
    enabled: true,
    description: "A highly customizable 3D tooltip."
  },
  {
    name: "Glowing Button",
    href: "/docs/components/glowing-button",
    enabled: true,
    description: "A button with a smooth glowing hover effect."
  },
  {
    name: "Bento Grid",
    href: "/docs/components/bento-grid",
    enabled: true,
    description: "A flexible and responsive grid for dashboard layouts."
  },
  {
    name: "Magnetic Card",
    href: "/docs/components/magnetic-card",
    enabled: true,
    description: "A card that magnetically interacts with the user's cursor."
  }
];
