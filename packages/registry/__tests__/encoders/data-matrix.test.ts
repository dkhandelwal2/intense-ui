import { describe, it, expect } from "vitest";
import { encodeDataMatrix } from "../../src/components/barcode/encoders/data-matrix";

describe("Data Matrix Encoder", () => {
  it("encodes valid string into 2D boolean matrix with L-finder pattern", () => {
    const result = encodeDataMatrix("DM-SN-99482-X");
    expect(result.valid).toBe(true);
    expect(result.is2D).toBe(true);
    expect(result.matrix).toBeDefined();

    const matrix = result.matrix!;
    const size = matrix.length;
    expect(size).toBeGreaterThanOrEqual(12);

    // Left and bottom borders should be solid true (L-finder pattern)
    for (let i = 0; i < size; i++) {
      expect(matrix[size - 1][i]).toBe(true); // bottom border solid
      expect(matrix[i][0]).toBe(true);        // left border solid
    }
  });

  it("handles empty string safely", () => {
    const result = encodeDataMatrix("");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Empty Data Matrix value");
  });

  it("fails gracefully on oversized payload exceeding capacity", () => {
    const hugeText = "A".repeat(500);
    const result = encodeDataMatrix(hugeText);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("exceeds max Data Matrix capacity");
  });
});
