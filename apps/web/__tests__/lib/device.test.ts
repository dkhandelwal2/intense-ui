import { describe, it, expect, vi } from "vitest";
import { checkIsMobileDevice } from "../../src/lib/device";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

import { headers } from "next/headers";

describe("checkIsMobileDevice", () => {
  it("detects mobile user agents (iPhone)", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
      }) as any
    );
    const isMobile = await checkIsMobileDevice();
    expect(isMobile).toBe(true);
  });

  it("detects desktop user agents (Macintosh)", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      }) as any
    );
    const isMobile = await checkIsMobileDevice();
    expect(isMobile).toBe(false);
  });

  it("returns false when user-agent header is absent", async () => {
    vi.mocked(headers).mockResolvedValue(new Headers({}) as any);
    const isMobile = await checkIsMobileDevice();
    expect(isMobile).toBe(false);
  });
});
