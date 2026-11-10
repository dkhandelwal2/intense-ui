import { EncodedBarcode } from "../types";

const L_PATTERNS = [
  "0001101", "0011001", "0010011", "0111101", "0100011",
  "0110001", "0101111", "0111011", "0110111", "0001011",
];

const G_PATTERNS = [
  "0100111", "0110011", "0011011", "0100001", "0011101",
  "0111001", "0000101", "0010001", "0001001", "0010111",
];

const R_PATTERNS = [
  "1110010", "1100110", "1101100", "1000010", "1011100",
  "1001110", "1010000", "1000100", "1001000", "1110100",
];

const STRUCTURES = [
  "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
  "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL",
];

function calculateChecksum(digits: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Encodes numeric string into standard EAN-13 / UPC-A binary bitstream
 */
export function encodeEan13(raw: string): EncodedBarcode {
  let digits = raw.replace(/\D/g, "");

  if (digits.length === 11 || digits.length === 12) {
    // Automatically pad or compute missing 13th modulo-10 check digit
    if (digits.length === 11) digits = "0" + digits;
    digits += calculateChecksum(digits);
  } else if (digits.length !== 13) {
    return {
      binary: "",
      text: raw,
      valid: false,
      error: "EAN-13 requires 12 or 13 numeric digits",
    };
  }

  const firstDigit = parseInt(digits[0], 10);
  const structure = STRUCTURES[firstDigit];
  let binary = "0000000101"; // Left quiet zone + start guard (101)

  // Left 6 digits
  for (let i = 1; i <= 6; i++) {
    const d = parseInt(digits[i], 10);
    binary += structure[i - 1] === "L" ? L_PATTERNS[d] : G_PATTERNS[d];
  }

  binary += "01010"; // Center guard bar pattern

  // Right 6 digits
  for (let i = 7; i <= 12; i++) {
    const d = parseInt(digits[i], 10);
    binary += R_PATTERNS[d];
  }

  binary += "1010000000"; // Stop guard pattern (101) + right quiet zone

  return {
    binary,
    text: digits,
    valid: true,
  };
}
