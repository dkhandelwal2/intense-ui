import { QrVersionConfig, QR_FORMAT_BITS } from "./constants";

export function createQrMatrix(cfg: QrVersionConfig, dataStream: number[]): boolean[][] {
  const size = cfg.size;
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () => new Array(size).fill(null));
  const reserved: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false));

  const setFinder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const row = r0 + r;
        const col = c0 + c;
        if (row >= 0 && row < size && col >= 0 && col < size) {
          reserved[row][col] = true;
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            matrix[row][col] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          } else {
            matrix[row][col] = false;
          }
        }
      }
    }
  };

  setFinder(0, 0);
  setFinder(0, size - 7);
  setFinder(size - 7, 0);

  if (cfg.align.length > 0) {
    for (const r of cfg.align) {
      for (const c of cfg.align) {
        if (reserved[r][c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            reserved[r + dr][c + dc] = true;
            matrix[r + dr][c + dc] = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
          }
        }
      }
    }
  }

  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) {
      reserved[6][i] = true;
      matrix[6][i] = i % 2 === 0;
    }
    if (!reserved[i][6]) {
      reserved[i][6] = true;
      matrix[i][6] = i % 2 === 0;
    }
  }

  reserved[4 * cfg.version + 9][8] = true;
  matrix[4 * cfg.version + 9][8] = true;

  for (let i = 0; i < 9; i++) {
    if (i !== 6) {
      reserved[8][i] = true;
      reserved[i][8] = true;
    }
  }
  for (let i = size - 8; i < size; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
  }

  const dataBits: number[] = [];
  for (const byte of dataStream) {
    for (let b = 7; b >= 0; b--) {
      dataBits.push((byte >> b) & 1);
    }
  }

  let bitIdx = 0;
  let upwards = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--;
    const left = right - 1;
    const rows = upwards
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (const col of [right, left]) {
        if (!reserved[row][col]) {
          const bit = bitIdx < dataBits.length ? dataBits[bitIdx++] : 0;
          const mask = (row + col) % 2 === 0 ? 1 : 0;
          matrix[row][col] = (bit ^ mask) === 1;
        }
      }
    }
    upwards = !upwards;
  }

  applyFormatBits(matrix, size);
  return matrix.map((row) => row.map((cell) => cell ?? false));
}

function applyFormatBits(matrix: (boolean | null)[][], size: number) {
  const formatPosTL = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = formatPosTL[i];
    matrix[r][c] = QR_FORMAT_BITS[i] === 1;
  }

  const formatPosOther = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = formatPosOther[i];
    matrix[r][c] = QR_FORMAT_BITS[i] === 1;
  }
}
