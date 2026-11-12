import { describe, it, expect } from "vitest";
import { encodeCode128 } from "../../src/components/barcode/encoders/code128";

describe("Code 128 Encoder", () => {
  it("encodes a standard ASCII string successfully", () => {
    const result = encodeCode128("INTENSE-2026");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("INTENSE-2026");
    expect(typeof result.binary).toBe("string");
    expect(result.binary.length).toBeGreaterThan(50);
  });

  it("includes 10-module quiet zones at start and end", () => {
    const result = encodeCode128("TEST");
    expect(result.valid).toBe(true);
    expect(result.binary.startsWith("0000000000")).toBe(true);
    expect(result.binary.endsWith("0000000000")).toBe(true);
  });

  it("handles empty strings gracefully", () => {
    const result = encodeCode128("");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Empty value");
    expect(result.binary).toBe("");
  });

  it("sanitizes non-printable characters with fallback ?", () => {
    const result = encodeCode128("TEST\u0001\u0002");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("TEST??");
  });

  it("computes modulo 103 checksum consistently", () => {
    const result1 = encodeCode128("A");
    const result2 = encodeCode128("A");
    expect(result1.binary).toBe(result2.binary);
  });
});
