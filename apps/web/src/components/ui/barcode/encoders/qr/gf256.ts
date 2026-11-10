// Galois Field GF(256) arithmetic for Reed-Solomon QR encoding
const expTable = new Uint8Array(512);
const logTable = new Uint8Array(256);
let val = 1;

for (let i = 0; i < 255; i++) {
  expTable[i] = val;
  expTable[i + 255] = val;
  logTable[val] = i;
  val = (val << 1) ^ (val & 128 ? 0x11d : 0);
}

export function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return expTable[logTable[a] + logTable[b]];
}

export function rsGeneratorPoly(ecCount: number): number[] {
  let poly = [1];
  for (let i = 0; i < ecCount; i++) {
    const next = new Array(poly.length + 1).fill(0);
    const factor = expTable[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], factor);
    }
    poly = next;
  }
  return poly;
}

export function rsEncode(data: number[], ecCount: number): number[] {
  const gen = rsGeneratorPoly(ecCount);
  const remainder = new Array(ecCount).fill(0);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ remainder[0];
    remainder.shift();
    remainder.push(0);
    if (factor !== 0) {
      for (let j = 0; j < ecCount; j++) {
        remainder[j] ^= gfMul(gen[j + 1], factor);
      }
    }
  }
  return remainder;
}
