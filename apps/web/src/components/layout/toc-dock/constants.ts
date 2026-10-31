export const DOCK_DIMENSIONS = {
  BUTTON_WIDTH: 72,
  PADDING_X: 42,
  DOCK_HEIGHT: 66,
  CORNER_RADIUS: 26,
} as const;

export const DOCK_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 280,
  damping: 20,
  mass: 0.75,
} as const;
