export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

export const DEFAULT_TRANSITION_DURATION = 450;
export const DEFAULT_TRANSITION_VARIANT: TransitionVariant = "circle";

export const VT_DATA_ATTRIBUTE = "themeVt";
export const VT_DURATION_CSS_VAR = "--theme-toggle-vt-duration";
export const VT_CLIP_FROM_CSS_VAR = "--theme-vt-clip-from";

/**
 * Checks if the View Transitions API is supported and active (not reduced motion).
 */
export function isViewTransitionSupported(): boolean {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }
  const hasApi =
    "startViewTransition" in document &&
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === "function";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return hasApi && !prefersReducedMotion;
}

/**
 * Calculates transition origin coordinates and max expansion radius across the viewport.
 */
export function calculateTransitionOrigin(
  button: HTMLElement | null,
  fromCenter = false
) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x: number;
  let y: number;

  if (fromCenter || !button) {
    x = viewportWidth / 2;
    y = viewportHeight / 2;
  } else {
    const { top, left, width, height } = button.getBoundingClientRect();
    x = left + width / 2;
    y = top + height / 2;
  }

  const maxRadius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y)
  );

  return { x, y, maxRadius, viewportWidth, viewportHeight };
}

/**
 * Returns a collapsed polygon string where all vertices converge on a single point.
 */
export function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ");
  return `polygon(${pairs})`;
}

/**
 * Generates initial and final clip-path strings for the specified transition variant.
 */
export function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case "circle":
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ];

    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }

    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
    }

    case "diamond": {
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }

    case "hexagon": {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ];
    }

    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }

    case "star": {
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA)
            )
          );
          const innerA = outerA + Math.PI / 5;
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          );
        }
        return `polygon(${verts.join(", ")})`;
      };
      const startR = Math.max(2, R * 0.025);
      return [starPolygon(startR), starPolygon(R)];
    }
  }
}

/**
 * Returns the recommended animation easing for each variant.
 */
export function getVariantEasing(variant: TransitionVariant): string {
  switch (variant) {
    case "star":
      return "linear";
    default:
      return "ease-in-out";
  }
}

/**
 * Sets CSS properties on the root element before starting the view transition.
 */
export function setupViewTransitionRoot(duration: number, clipFrom: string): void {
  const root = document.documentElement;
  root.dataset[VT_DATA_ATTRIBUTE] = "active";
  root.style.setProperty(VT_DURATION_CSS_VAR, `${duration}ms`);
  root.style.setProperty(VT_CLIP_FROM_CSS_VAR, clipFrom);
}

/**
 * Cleans up temporary CSS properties from the root element after the transition.
 */
export function cleanupViewTransitionRoot(): void {
  const root = document.documentElement;
  delete root.dataset[VT_DATA_ATTRIBUTE];
  root.style.removeProperty(VT_DURATION_CSS_VAR);
  root.style.removeProperty(VT_CLIP_FROM_CSS_VAR);
}
