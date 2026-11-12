import { describe, it, expect } from "vitest";
import { encodeEan13 } from "../../src/components/barcode/encoders/ean13";

describe("EAN-13 Encoder", () => {
  it("computes modulo-10 check digit for a 12-digit input", () => {
    // 9780201379624 is standard EAN-13
    const result = encodeEan13("978020137962");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("9780201379624");
    expect(typeof result.binary).toBe("string");
  });

  it("encodes valid 13-digit EAN-13", () => {
    const result = encodeEan13("9780201379624");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("9780201379624");
    // Starts with left quiet zone + guard (101)
    expect(result.binary.includes("0000000101")).toBe(true);
    // Includes center guard (01010)
    expect(result.binary.includes("01010")).toBe(true);
  });

  it("rejects invalid lengths", () => {
    const result = encodeEan13("12345");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("requires 12 or 13 numeric digits");
  });

  it("pads 11-digit UPC-A to 13 digits", () => {
    const result = encodeEan13("01234567890");
    expect(result.valid).toBe(true);
    expect(result.text.length).toBe(13);
  });
});
