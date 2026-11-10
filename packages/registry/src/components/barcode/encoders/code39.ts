import { EncodedBarcode } from "../types";

const CODE39_PATTERNS: Record<string, string> = {
  "0": "NNNWWNWNN", "1": "WNNWNNNNW", "2": "NNWWNNNNW", "3": "WNWWNNNNN",
  "4": "NNNWWNNNW", "5": "WNNWWNNNN", "6": "NNWWWNNNN", "7": "NNNWWNNWN",
  "8": "WNNWWNNWN", "9": "NNWWWNNWN", "A": "WNNNNWNNW", "B": "NNWNNWNNW",
  "C": "WNWNNWNNN", "D": "NNNNWWNNW", "E": "WNNNWWNNN", "F": "NNWNWWNNN",
  "G": "NNNNNWWNW", "H": "WNNNNWWNN", "I": "NNWNNWWNN", "J": "NNNNWWWNN",
  "K": "WNNNNNNWW", "L": "NNWNNNNWW", "M": "WNWNNNNWN", "N": "NNNNWNNWW",
  "O": "WNNNWNNWN", "P": "NNWNWNNWN", "Q": "NNNNNNWWW", "R": "WNNNNNWWN",
  "S": "NNWNNNWWN", "T": "NNNNWNWWN", "U": "WWNNNNNNW", "V": "NWWNNNNNW",
  "W": "WWWNNNNNN", "X": "NWNNWNNNW", "Y": "WWNNWNNNN", "Z": "NWWNWNNNN",
  "-": "NWNNNNNWN", ".": "WWNNNNNWN", " ": "NWWNNNNWN", "*": "NWNNWNWNN",
  "$": "NWNWNWNNN", "/": "NWNWNNNWN", "+": "NWNNNWNWN", "%": "NNNWNWNWN",
};

/**
 * Encodes uppercase alphanumeric text into Code 39 binary bitstream
 */
export function encodeCode39(text: string): EncodedBarcode {
  if (!text || text.length === 0) {
    return { binary: "", text: "", valid: false, error: "Empty value" };
  }

  const clean = text.toUpperCase().replace(/[^0-9A-Z\-. $/+%]/g, "-");
  const fullText = `*${clean}*`;
  let binary = "0000000000"; // 10-module left quiet zone

  for (let i = 0; i < fullText.length; i++) {
    const pattern = CODE39_PATTERNS[fullText[i]] || CODE39_PATTERNS["-"];
    for (let j = 0; j < 9; j++) {
      const isBar = j % 2 === 0;
      const isWide = pattern[j] === "W";
      const bit = isBar ? "1" : "0";
      binary += bit.repeat(isWide ? 2 : 1);
    }
    binary += "0"; // Inter-character gap space
  }

  binary += "000000000"; // Right quiet zone
  return {
    binary,
    text: clean,
    valid: true,
  };
}
