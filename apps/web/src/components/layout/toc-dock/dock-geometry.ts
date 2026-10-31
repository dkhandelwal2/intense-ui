/**
 * Generates a closed SVG path for the dock container.
 * Features a seamless concave scoop notch at coordinate X for the active floating circle.
 * All corners and notch transitions are continuous cubic Beziers with C1 continuity,
 * ensuring a shallow, gentle wave cradle and zero border overlap.
 */
export function generateDockPath(
  X: number,
  W: number,
  H = 66,
  R = 26
): string {
  const Wn = 50;
  const D = 36;
  const k = R * 0.55228475;

  return [
    `M ${R} 0`,
    `L ${X - Wn} 0`,
    `C ${X - 0.8 * Wn} 0, ${X - 0.7 * Wn} ${0.22 * D}, ${X - 0.5 * Wn} ${0.55 * D}`,
    `C ${X - 0.3 * Wn} ${0.88 * D}, ${X - 0.2 * Wn} ${D}, ${X} ${D}`,
    `C ${X + 0.2 * Wn} ${D}, ${X + 0.3 * Wn} ${0.88 * D}, ${X + 0.5 * Wn} ${0.55 * D}`,
    `C ${X + 0.7 * Wn} ${0.22 * D}, ${X + 0.8 * Wn} 0, ${X + Wn} 0`,
    `L ${W - R} 0`,
    `C ${W - R + k} 0, ${W} ${R - k}, ${W} ${R}`,
    `L ${W} ${H - R}`,
    `C ${W} ${H - R + k}, ${W - R + k} ${H}, ${W - R} ${H}`,
    `L ${R} ${H}`,
    `C ${R - k} ${H}, 0 ${H - R + k}, 0 ${H - R}`,
    `L 0 ${R}`,
    `C 0 ${R - k}, ${R - k} 0, ${R} 0`,
    `Z`,
  ].join(" ");
}
