import { describe, it, expect } from "vitest";
import { cn } from "../../src/lib/utils";

describe("cn utility", () => {
  it("merges simple class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("handles conditional class values", () => {
    const isPrimary = true;
    const isLarge = false;
    expect(cn("btn", isPrimary && "btn-primary", isLarge && "btn-lg")).toBe(
      "btn btn-primary"
    );
  });

  it("resolves Tailwind conflicting classes using twMerge", () => {
    // px-4 should override px-2
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles undefined, null, and empty inputs cleanly", () => {
    expect(cn("base", undefined, null, false, "")).toBe("base");
  });
});
