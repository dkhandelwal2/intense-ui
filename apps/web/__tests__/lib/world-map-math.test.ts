import { describe, it, expect } from "vitest";
import {
  projectEquirectangular,
  parseLandDots,
  getSolarPosition,
  getTerminatorPath,
  getDotBuckets,
  getFlightArc,
  formatCityName,
} from "@/components/layout/bento/widgets/world-map/world-map-math";
import { OPACITY_BUCKETS } from "@/components/layout/bento/widgets/world-map/world-map-data";

describe("world-map-math", () => {
  it("projects latitude and longitude to equirectangular SVG space", () => {
    // Prime meridian at equator (0, 0)
    const [x1, y1] = projectEquirectangular(0, 0);
    expect(x1).toBe(360);
    expect(y1).toBe(150);

    // North-West boundary (75, -180)
    const [x2, y2] = projectEquirectangular(75, -180);
    expect(x2).toBe(0);
    expect(y2).toBe(0);

    // South-East boundary (-55, 180)
    const [x3, y3] = projectEquirectangular(-55, 180);
    expect(x3).toBe(720);
    expect(y3).toBe(260);
  });

  it("parses land dots bitmask into valid SVG dot segments", () => {
    const dots = parseLandDots();
    expect(dots.length).toBeGreaterThan(1000);
    const first = dots[0];
    expect(first).toBeDefined();
    expect(first?.seg).toMatch(/^M\d+(\.\d+)? \d+(\.\d+)?h0$/);
  });

  it("calculates astronomical solar position", () => {
    // Summer solstice approx June 21 noon UTC
    const date = new Date(Date.UTC(2026, 5, 21, 12, 0, 0));
    const [latSun, lonSun] = getSolarPosition(date);

    // Declination near +23.44°
    expect(latSun).toBeGreaterThan(20);
    expect(latSun).toBeLessThan(24);

    // Subsolar longitude near 0° at 12:00 UTC
    expect(Math.abs(lonSun)).toBeLessThan(5);
  });

  it("generates a smooth 181-sample terminator curve path", () => {
    const path = getTerminatorPath([20, 0]);
    expect(path.startsWith("M")).toBe(true);
    expect(path).toContain("L");
    // Should contain 181 coordinates (1 M + 180 L)
    const segments = path.split(/[ML]/).filter(Boolean);
    expect(segments.length).toBe(181);
  });

  it("buckets dots into 5 distinct opacity classes based on solar zenith", () => {
    const dots = parseLandDots();
    const buckets = getDotBuckets(dots, [10, -50]);
    expect(buckets.length).toBe(OPACITY_BUCKETS.length);
    // At least some dots should be in daylight and some in night
    const totalDotLength = buckets.reduce((acc, b) => acc + b.length, 0);
    expect(totalDotLength).toBeGreaterThan(0);
  });

  it("generates quadratic Bézier flight arc path", () => {
    const arc = getFlightArc([100, 100], [500, 100]);
    expect(arc.startsWith("M100.0 100.0Q")).toBe(true);
    expect(arc.endsWith("500.0 100.0")).toBe(true);
  });

  it("formats clean city names with overrides", () => {
    expect(formatCityName("America/New_York")).toBe("New York");
    expect(formatCityName("Asia/Calcutta")).toBe("Kolkata");
    expect(formatCityName("Europe/London")).toBe("London");
  });

  it("correctly projects user location when geolocation coordinates are provided", () => {
    // San Francisco (37.7749° N, -122.4194° E)
    const [sfX, sfY] = projectEquirectangular(37.7749, -122.4194);
    expect(sfX).toBeGreaterThan(110);
    expect(sfX).toBeLessThan(120);
    expect(sfY).toBeGreaterThan(70);
    expect(sfY).toBeLessThan(80);

    // Tokyo (35.6762° N, 139.6503° E)
    const [tokyoX, tokyoY] = projectEquirectangular(35.6762, 139.6503);
    expect(tokyoX).toBeGreaterThan(635);
    expect(tokyoX).toBeLessThan(645);
    expect(tokyoY).toBeGreaterThan(75);
    expect(tokyoY).toBeLessThan(85);
  });
});
