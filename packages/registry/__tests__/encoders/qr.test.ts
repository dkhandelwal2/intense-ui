import { describe, it, expect } from "vitest";
import { encodeQrCode } from "../../src/components/barcode/encoders/qr";

describe("QR Code Encoder", () => {
  it("encodes a URL into a valid 2D matrix", () => {
    const result = encodeQrCode("https://intenseui.dev");
    expect(result.valid).toBe(true);
    expect(result.is2D).toBe(true);
    expect(result.matrix).toBeDefined();

    const matrix = result.matrix!;
    const size = matrix.length;
    expect(size).toBeGreaterThanOrEqual(21); // Version 1 is 21x21

    // Finder patterns: top-left 7x7 corner outer border is true
    for (let i = 0; i < 7; i++) {
      expect(matrix[0][i]).toBe(true);
      expect(matrix[i][0]).toBe(true);
      expect(matrix[6][i]).toBe(true);
      expect(matrix[i][6]).toBe(true);
    }
  });

  it("handles empty string gracefully", () => {
    const result = encodeQrCode("");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Empty value for QR code");
  });

  it("encodes short ASCII strings", () => {
    const result = encodeQrCode("INTENSE");
    expect(result.valid).toBe(true);
    expect(result.text).toBe("INTENSE");
  });
});
