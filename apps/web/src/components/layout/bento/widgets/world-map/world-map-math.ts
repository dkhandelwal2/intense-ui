import { WorldDot } from "./types";
import {
  WORLD_MAP_ROWS,
  OPACITY_BUCKETS,
  IANA_COORDINATES,
  CITY_NAME_OVERRIDES,
} from "./world-map-data";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Projects latitude/longitude to equirectangular SVG coordinate space [0..720] x [0..260].
 * Latitude +75° -> y=0, -55° -> y=260
 * Longitude -180° -> x=0, +180° -> x=720
 */
export function projectEquirectangular(lat: number, lon: number): [number, number] {
  return [(lon + 180) * 2, (75 - lat) * 2];
}

/**
 * Parses the 53-row hex bitmask into precomputed dot matrix nodes.
 */
export function parseLandDots(rows: readonly string[] = WORLD_MAP_ROWS): WorldDot[] {
  const dots: WorldDot[] = [];
  for (let rIndex = 0; rIndex < rows.length; rIndex++) {
    const hexRow = rows[rIndex];
    if (!hexRow) continue;
    const lat = 75 - 2.5 * rIndex;
    const sinLat = Math.sin(lat * DEG_TO_RAD);
    const cosLat = Math.cos(lat * DEG_TO_RAD);

    let colIndex = 0;
    for (let i = 0; i < hexRow.length; i++) {
      const nibble = Number.parseInt(hexRow[i] ?? "0", 16);
      for (let bit = 3; bit >= 0; bit--) {
        if (((nibble >> bit) & 1) === 1 && colIndex < 144) {
          const lon = -178.75 + 2.5 * colIndex;
          const [x, y] = projectEquirectangular(lat, lon);
          dots.push({
            sinLat,
            cosLat,
            lonRad: lon * DEG_TO_RAD,
            seg: `M${x.toFixed(1)} ${y.toFixed(1)}h0`,
          });
        }
        colIndex++;
      }
    }
  }
  return dots;
}

// Memoized precomputed static dots
export const PRECOMPUTED_LAND_DOTS = parseLandDots();

/**
 * Calculates current subsolar point coordinates [lat_sun, lon_sun] in degrees.
 */
export function getSolarPosition(date: Date): [number, number] {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = (date.getTime() - startOfYear) / 864e5;

  // Solar declination (-23.44° to +23.44°)
  const latSun = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));

  // Subsolar longitude: 12:00 UTC = 0° lon (solar noon at prime meridian)
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const lonSun = (((12 - utcHours) * 15 + 540) % 360) - 180;

  return [latSun, lonSun];
}

/**
 * Generates the SVG path for the sinusoidal day/night terminator curve across 181 longitude samples.
 */
export function getTerminatorPath([latSun, lonSun]: [number, number]): string {
  const safeLat = Math.abs(latSun) < 0.1 ? 0.1 : latSun;
  const tanLat = Math.tan(safeLat * DEG_TO_RAD);

  let path = "";
  for (let r = 0; r <= 180; r++) {
    const lon = -180 + 2 * r;
    const termLatRad = Math.atan(-Math.cos((lon - lonSun) * DEG_TO_RAD) / tanLat);
    const termLat = Math.max(-55, Math.min(75, termLatRad * RAD_TO_DEG));
    const [x, y] = projectEquirectangular(termLat, lon);
    path += `${r === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return path;
}

/**
 * Buckets land dots into 5 distinct illumination opacity groups based on solar zenith angle.
 */
export function getDotBuckets(
  dots: WorldDot[],
  [latSun, lonSun]: [number, number]
): string[] {
  const sinSun = Math.sin(latSun * DEG_TO_RAD);
  const cosSun = Math.cos(latSun * DEG_TO_RAD);
  const lonSunRad = lonSun * DEG_TO_RAD;

  const buckets: string[][] = OPACITY_BUCKETS.map(() => []);

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (!dot) continue;
    // Cosine of solar zenith angle
    const cosZenith =
      dot.sinLat * sinSun + dot.cosLat * cosSun * Math.cos(dot.lonRad - lonSunRad);

    let bucketIdx = OPACITY_BUCKETS.length - 1;
    while (bucketIdx > 0 && cosZenith < (OPACITY_BUCKETS[bucketIdx]?.min ?? 0)) {
      bucketIdx--;
    }
    buckets[bucketIdx]?.push(dot.seg);
  }

  return buckets.map((segs) => segs.join(""));
}

/**
 * Quadratic Bézier flight arc path between start and end screen coordinates.
 */
export function getFlightArc(
  start: [number, number],
  end: [number, number]
): string {
  const distance = Math.hypot(end[0] - start[0], end[1] - start[1]);
  const midX = (start[0] + end[0]) / 2;
  const midY = Math.min(start[1], end[1]) - 0.28 * distance;

  return `M${start[0].toFixed(1)} ${start[1].toFixed(1)}Q${midX.toFixed(1)} ${midY.toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)}`;
}

/**
 * Extracts numeric UTC offset hours from a timezone string (e.g. +5.5 for Asia/Kolkata).
 */
export function getTimezoneOffsetHours(timeZone: string, date: Date): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    const tzValue = parts.find((p) => p.type === "timeZoneName")?.value;
    const match = tzValue?.match(/GMT([+-])(\d+)(?::(\d+))?/);
    if (!match) return 0;
    const sign = match[1] === "-" ? -1 : 1;
    const hours = Number(match[2]);
    const minutes = Number(match[3] ?? 0) / 60;
    return sign * (hours + minutes);
  } catch {
    return 0;
  }
}

/**
 * Resolves [lat, lon] coordinates for an IANA timezone string.
 */
export function resolveTimezoneCoords(timeZone: string, date: Date): [number, number] {
  if (IANA_COORDINATES[timeZone]) {
    return IANA_COORDINATES[timeZone];
  }
  // Approximate latitude 25°, longitude from offset
  const offsetHours = getTimezoneOffsetHours(timeZone, date);
  return [25, 15 * offsetHours];
}

/**
 * Formats a clean display name for a timezone.
 */
export function formatCityName(timeZone: string): string {
  const rawCity = (timeZone.split("/").at(-1) ?? timeZone).replaceAll("_", " ");
  return CITY_NAME_OVERRIDES[rawCity] ?? rawCity;
}
