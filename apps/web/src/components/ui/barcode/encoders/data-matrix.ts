import { EncodedBarcode } from "../types";

const DM_EXP = new Uint8Array(512);
const DM_LOG = new Uint8Array(256);
let val = 1;
for (let i = 0; i < 255; i++) {
  DM_EXP[i] = val;
  DM_EXP[i + 255] = val;
  DM_LOG[val] = i;
  val = (val << 1) ^ (val & 128 ? 301 : 0);
}

function dmMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return DM_EXP[(DM_LOG[a] + DM_LOG[b]) % 255];
}

function dmRs(data: number[], ecCount: number): number[] {
  let gen = [1];
  for (let i = 1; i <= ecCount; i++) {
    const next = new Array(gen.length + 1).fill(0);
    const factor = DM_EXP[i];
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j];
      next[j + 1] ^= dmMul(gen[j], factor);
    }
    gen = next;
  }
  const rem = new Array(ecCount).fill(0);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ rem[0];
    rem.shift();
    rem.push(0);
    if (factor !== 0) {
      for (let j = 0; j < ecCount; j++) {
        rem[j] ^= dmMul(gen[j + 1], factor);
      }
    }
  }
  return rem;
}

const DM_SIZES = [
  { size: 12, dataCap: 5, ecCap: 7 },
  { size: 14, dataCap: 8, ecCap: 10 },
  { size: 16, dataCap: 12, ecCap: 12 },
  { size: 18, dataCap: 18, ecCap: 14 },
  { size: 20, dataCap: 22, ecCap: 18 },
  { size: 22, dataCap: 30, ecCap: 20 },
  { size: 24, dataCap: 36, ecCap: 24 },
  { size: 26, dataCap: 44, ecCap: 28 },
];

export function encodeDataMatrix(text: string): EncodedBarcode {
  if (!text) {
    return { text: "", binary: "", valid: false, error: "Empty Data Matrix value", is2D: true };
  }

  const codewords: number[] = [];
  for (let i = 0; i < text.length; i++) {
    codewords.push(text.charCodeAt(i) + 1);
  }

  const cfg = DM_SIZES.find((s) => s.dataCap >= codewords.length) || DM_SIZES[DM_SIZES.length - 1];
  if (codewords.length > cfg.dataCap) {
    return { text, binary: "", valid: false, error: `Value exceeds max Data Matrix capacity (${cfg.dataCap})`, is2D: true };
  }

  // Padding
  if (codewords.length < cfg.dataCap) {
    codewords.push(129);
    while (codewords.length < cfg.dataCap) {
      const pad = (149 * (codewords.length + 1)) % 253 + 1;
      codewords.push((129 + pad) % 254);
    }
  }

  const ec = dmRs(codewords, cfg.ecCap);
  const allWords = [...codewords, ...ec];
  const size = cfg.size;
  const innerSize = size - 2;

  // Build matrix with L finder and clock tracks
  const matrix: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false));

  // Solid left & bottom borders
  for (let i = 0; i < size; i++) {
    matrix[size - 1][i] = true;
    matrix[i][0] = true;
  }
  // Alternating top & right borders
  for (let i = 0; i < size; i++) {
    matrix[0][i] = i % 2 === 0;
    matrix[i][size - 1] = i % 2 !== 0;
  }

  // Populate data in simple inner grid layout
  let bitIdx = 0;
  const allBits: boolean[] = [];
  for (const w of allWords) {
    for (let b = 7; b >= 0; b--) {
      allBits.push(((w >> b) & 1) === 1);
    }
  }

  for (let r = 1; r < size - 1; r++) {
    for (let c = 1; c < size - 1; c++) {
      if (bitIdx < allBits.length) {
        matrix[r][c] = allBits[bitIdx++];
      }
    }
  }

  return {
    text,
    binary: "",
    matrix,
    is2D: true,
    valid: true,
  };
}
