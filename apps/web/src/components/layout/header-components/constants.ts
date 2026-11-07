export const OVERLAY_OPEN_TRANSITION = {
  duration: 0.48,
  ease: [0.16, 1, 0.3, 1], // Smooth, energetic drop down
} as const;

export const OVERLAY_CLOSE_TRANSITION = {
  duration: 0.42,
  ease: [0.32, 0, 0.67, 0], // Smooth glide up into the ceiling
} as const;

export const ITEM_ENTER_TRANSITION = (idx: number) => ({
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
  delay: idx * 0.07, // Stagger in from top to bottom
});

export const ITEM_EXIT_TRANSITION = (idx: number) => ({
  duration: 0.18,
  ease: [0.4, 0, 1, 1],
  delay: (3 - idx) * 0.04, // Stagger out from bottom to top
});
