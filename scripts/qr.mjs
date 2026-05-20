const VERSION = 4;
const SIZE = VERSION * 4 + 17;
const DATA_CODEWORDS = 80;
const ECC_CODEWORDS = 20;
const FORMAT_L_MASK_0 = 0b111011111000100;

function gfMul(a, b) {
  let p = 0;
  for (let i = 0; i < 8; i += 1) {
    if (b & 1) p ^= a;
    const hi = a & 0x80;
    a = (a << 1) & 0xff;
    if (hi) a ^= 0x1d;
    b >>= 1;
  }
  return p;
}

function gfPow(x, power) {
  let result = 1;
  for (let i = 0; i < power; i += 1) result = gfMul(result, x);
  return result;
}

function rsGenerator(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i += 1) {
    const next = Array(poly.length + 1).fill(0);
    const root = gfPow(2, i);
    for (let j = 0; j < poly.length; j += 1) {
      next[j] ^= gfMul(poly[j], root);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

function rsRemainder(data, degree) {
  const gen = rsGenerator(degree);
  const rem = Array(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ rem.shift();
    rem.push(0);
    for (let i = 0; i < degree; i += 1) rem[i] ^= gfMul(gen[i], factor);
  }
  return rem;
}

function pushBits(bits, value, len) {
  for (let i = len - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
}

function makeCodewords(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const bits = [];
  pushBits(bits, 0b0100, 4);
  pushBits(bits, bytes.length, 8);
  bytes.forEach((byte) => pushBits(bits, byte, 8));
  const capacityBits = DATA_CODEWORDS * 8;
  pushBits(bits, 0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8) bits.push(0);

  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    data.push(parseInt(bits.slice(i, i + 8).join(""), 2));
  }
  for (let pad = 0xec; data.length < DATA_CODEWORDS; pad ^= 0xfd) data.push(pad);
  return data.concat(rsRemainder(data, ECC_CODEWORDS));
}

function makeMatrix() {
  return {
    modules: Array.from({ length: SIZE }, () => Array(SIZE).fill(false)),
    reserved: Array.from({ length: SIZE }, () => Array(SIZE).fill(false)),
  };
}

function setCell(qr, x, y, dark, reserve = true) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
  qr.modules[y][x] = !!dark;
  if (reserve) qr.reserved[y][x] = true;
}

function placeFinder(qr, x, y) {
  for (let dy = -1; dy <= 7; dy += 1) {
    for (let dx = -1; dx <= 7; dx += 1) {
      const xx = x + dx;
      const yy = y + dy;
      const inFinder = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
      const dark = inFinder && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
      setCell(qr, xx, yy, dark);
    }
  }
}

function placeAlignment(qr, cx, cy) {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const dark = Math.max(Math.abs(dx), Math.abs(dy)) !== 1;
      setCell(qr, cx + dx, cy + dy, dark);
    }
  }
}

function reserveFormat(qr) {
  for (let i = 0; i < 9; i += 1) {
    if (i !== 6) {
      qr.reserved[8][i] = true;
      qr.reserved[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i += 1) {
    qr.reserved[SIZE - 1 - i][8] = true;
    qr.reserved[8][SIZE - 1 - i] = true;
  }
}

function placeFunctionPatterns(qr) {
  placeFinder(qr, 0, 0);
  placeFinder(qr, SIZE - 7, 0);
  placeFinder(qr, 0, SIZE - 7);
  placeAlignment(qr, 26, 26);

  for (let i = 8; i < SIZE - 8; i += 1) {
    setCell(qr, i, 6, i % 2 === 0);
    setCell(qr, 6, i, i % 2 === 0);
  }
  setCell(qr, 8, VERSION * 4 + 9, true);
  reserveFormat(qr);
}

function placeData(qr, codewords) {
  const bits = [];
  codewords.forEach((byte) => pushBits(bits, byte, 8));
  let bitIndex = 0;
  let upward = true;

  for (let right = SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vert = 0; vert < SIZE; vert += 1) {
      const y = upward ? SIZE - 1 - vert : vert;
      for (let x = right; x >= right - 1; x -= 1) {
        if (qr.reserved[y][x]) continue;
        const raw = bitIndex < bits.length ? bits[bitIndex] === 1 : false;
        const masked = raw !== ((x + y) % 2 === 0);
        setCell(qr, x, y, masked, false);
        bitIndex += 1;
      }
    }
    upward = !upward;
  }
}

function placeFormat(qr) {
  const bit = (i) => ((FORMAT_L_MASK_0 >>> i) & 1) === 1;
  const first = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];
  const second = [
    [SIZE - 1, 8], [SIZE - 2, 8], [SIZE - 3, 8], [SIZE - 4, 8], [SIZE - 5, 8], [SIZE - 6, 8], [SIZE - 7, 8],
    [8, SIZE - 8], [8, SIZE - 7], [8, SIZE - 6], [8, SIZE - 5], [8, SIZE - 4], [8, SIZE - 3], [8, SIZE - 2], [8, SIZE - 1],
  ];
  first.forEach(([x, y], i) => setCell(qr, x, y, bit(i)));
  second.forEach(([x, y], i) => setCell(qr, x, y, bit(i)));
}

export function makeQrMatrix(text) {
  const qr = makeMatrix();
  placeFunctionPatterns(qr);
  placeData(qr, makeCodewords(text));
  placeFormat(qr);
  return qr.modules;
}

export function qrToSvg(matrix, { scale = 8, border = 4 } = {}) {
  const size = matrix.length + border * 2;
  const rects = [];
  matrix.forEach((row, y) => {
    row.forEach((dark, x) => {
      if (dark) rects.push(`<rect x="${x + border}" y="${y + border}" width="1" height="1"/>`);
    });
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * scale}" height="${size * scale}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><g fill="#172235">${rects.join("")}</g></svg>\n`;
}
