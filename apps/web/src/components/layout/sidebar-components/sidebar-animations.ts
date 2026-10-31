import type { Variants } from "framer-motion";

export const sidebarContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.06,
    },
  },
};

export const sidebarItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
