import { describe, it, expect } from "vitest";
import { encodeCode39 } from "../../src/components/barcode/encoders/code39";

describe("Code 39 Encoder", () => {
  it("encodes valid uppercase alphanumeric input", () => {
    const result = encodeCode39("PART-8924-X");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("PART-8924-X");
    expect(result.binary.startsWith("0000000000")).toBe(true);
    expect(result.binary.endsWith("000000000")).toBe(true);
  });

  it("automatically converts lowercase letters to uppercase", () => {
    const result = encodeCode39("abc");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("ABC");
  });

  it("handles empty string gracefully", () => {
    const result = encodeCode39("");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Empty value");
    expect(result.binary).toBe("");
  });

  it("sanitizes unsupported symbols with dash replacement", () => {
    const result = encodeCode39("CODE#123");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("CODE-123");
  });
});
