import React from "react";

/**
 * Computes an exact SVG path for a card with rounded corners and a scooped
 * concave cutout notch in the top-right corner.
 */
export function getScoopedCardPath(
  w: number,
  h: number,
  r = 24,
  notchW = 100,
  notchH = 44,
  f = 14,
  inset = 0
): string {
  if (w <= 0 || h <= 0) return "";
  const x0 = inset;
  const y0 = inset;
  const x1 = w - inset;
  const y1 = h - inset;
  const rad = Math.max(0, r - inset);
  const nLeft = Math.max(rad + 20, x1 - notchW);
  const nBottom = notchH + inset;

  return [
    `M ${x0 + rad} ${y0}`,
    `L ${Math.max(x0 + rad, nLeft - f)} ${y0}`,
    `Q ${nLeft} ${y0} ${nLeft} ${y0 + f}`,
    `L ${nLeft} ${nBottom - f}`,
    `Q ${nLeft} ${nBottom} ${nLeft + f} ${nBottom}`,
    `L ${x1 - f} ${nBottom}`,
    `Q ${x1} ${nBottom} ${x1} ${nBottom + f}`,
    `L ${x1} ${y1 - rad}`,
    `A ${rad} ${rad} 0 0 1 ${x1 - rad} ${y1}`,
    `L ${x0 + rad} ${y1}`,
    `A ${rad} ${rad} 0 0 1 ${x0} ${y1 - rad}`,
    `L ${x0} ${y0 + rad}`,
    `A ${rad} ${rad} 0 0 1 ${x0 + rad} ${y0}`,
    `Z`,
  ].join(" ");
}

export interface CurvedPodSvgProps {
  id?: string;
}

export const CurvedPodSvg = React.memo(function CurvedPodSvg({
  id = "curved-pod-shape",
}: CurvedPodSvgProps) {
  return (
    <svg
      aria-hidden="true"
      className="absolute w-px h-px overflow-hidden pointer-events-none -left-full -top-full opacity-0"
      style={{ position: "absolute", width: 1, height: 1 }}
    >
      <defs>
        {/* Organic curved pod shape matching reference design */}
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d="M 0 0.08 C 0 0.03, 0.03 0, 0.12 0 L 0.65 0 C 0.78 0, 0.92 0.08, 0.98 0.22 C 1.02 0.32, 1.02 0.42, 0.98 0.50 C 0.93 0.62, 0.85 0.76, 0.76 0.87 C 0.68 0.96, 0.60 1.0, 0.52 1.0 L 0.12 1.0 C 0.03 1.0, 0 0.97, 0 0.92 Z" />
        </clipPath>
      </defs>
    </svg>
  );
});

// Backward-compatible alias
export const PlaygroundHeroShapeSvg = CurvedPodSvg;
export type PlaygroundHeroShapeSvgProps = CurvedPodSvgProps;
