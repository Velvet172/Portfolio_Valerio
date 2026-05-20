import { readFileSync, writeFileSync } from "node:fs";

const output = "public/Valerio-Serani-CV.pdf";
const portraitPath = "public/img/CV/valerio-cv-portrait-original.jpg";
const portrait = readFileSync(portraitPath);
const portfolioQrSvg = readFileSync("public/img/CV/portfolio-qr.svg", "utf8");

const pageW = 595.28;
const pageH = 841.89;
const margin = 38;
const leftW = 330;
const sideX = 405;
const sideW = 150;
const lineH = 11.5;

const pages = [[]];
let currentPage = 0;

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function addText(text, x, y, size = 10, font = "F1", color = "0.11 0.16 0.23") {
  pages[currentPage].push({ type: "text", text, x, y, size, font, color });
}

function addLine(x1, y1, x2, y2, color = "0.76 0.88 0.94", width = 1) {
  pages[currentPage].push({ type: "line", x1, y1, x2, y2, color, width });
}

function addRect(x, y, w, h, color = "0.95 0.99 1") {
  pages[currentPage].push({ type: "rect", x, y, w, h, color });
}

function addTagBox(text, x, y, w, h = 12) {
  pages[currentPage].push({ type: "tagBox", text, x, y, w, h });
}

function addQr(segments, viewBoxSize, x, y, size) {
  pages[currentPage].push({ type: "qr", segments, viewBoxSize, x, y, size });
}

function addImage(name, x, y, w, h) {
  pages[currentPage].push({ type: "image", name, x, y, w, h });
}

function addCircleImage(name, x, y, size) {
  pages[currentPage].push({ type: "circleImage", name, x, y, size });
}

function section(title, x, y) {
  addText(title.toUpperCase(), x, y, 9, "F2", "0.05 0.37 0.52");
  addLine(x, y - 4, x + 88, y - 4, "0.32 0.76 0.95", 1.1);
  return y - 21;
}

function widthOf(text, size) {
  return String(text).length * size * 0.47;
}

const helveticaWidths = {
  " ": 278, "!": 278, "\"": 355, "#": 556, "$": 556, "%": 889, "&": 667, "'": 191,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556, "8": 556, "9": 556,
  ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833,
  N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 278, "\\": 278, "]": 278, "^": 469, "_": 556, "`": 333,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833,
  n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  "{": 334, "|": 260, "}": 334, "~": 584,
};

function pdfTextWidth(text, size, bold = false) {
  let total = 0;
  for (const char of String(text)) total += helveticaWidths[char] || 556;
  return (total / 1000) * size * (bold ? 1.08 : 1);
}

function tagWidthOf(text, size) {
  return pdfTextWidth(text, size, true);
}

function wrap(text, maxW, size) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (widthOf(test, size) <= maxW || !line) line = test;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function paragraph(text, x, y, maxW, size = 9.2, color = "0.25 0.31 0.39") {
  for (const line of wrap(text, maxW, size)) {
    addText(line, x, y, size, "F1", color);
    y -= lineH;
  }
  return y - 4;
}

function richTokens(segments) {
  const tokens = [];
  for (const segment of segments) {
    const parts = String(segment.text).match(/\s*\S+\s*/g) || [];
    for (const part of parts) tokens.push({ text: part, bold: !!segment.bold });
  }
  return tokens;
}

function richWidthOf(token, size) {
  return pdfTextWidth(token.text, size, token.bold);
}

function richParagraph(segments, x, y, maxW, size = 9.2, color = "0.25 0.31 0.39") {
  const tokens = richTokens(segments);
  let line = [];
  let lineW = 0;

  const flush = () => {
    let cx = x;
    for (const token of line) {
      if (!token.text) continue;
      addText(token.text, cx, y, size, token.bold ? "F2" : "F1", color);
      cx += richWidthOf(token, size);
    }
    y -= lineH;
    line = [];
    lineW = 0;
  };

  for (const token of tokens) {
    const tokenW = richWidthOf(token, size);
    if (line.length && lineW + tokenW > maxW) flush();
    line.push(token);
    lineW += tokenW;
  }
  if (line.length) flush();
  return y - 4;
}

function bullet(text, x, y, maxW) {
  addText("-", x, y, 9, "F2", "0.05 0.37 0.52");
  const lines = wrap(text, maxW - 13, 9);
  lines.forEach((line, idx) => addText(line, x + 12, y - idx * 10.8, 9, "F1", "0.25 0.31 0.39"));
  return y - lines.length * 10.8 - 3;
}

function richBullet(segments, x, y, maxW) {
  addText("-", x, y, 9, "F2", "0.05 0.37 0.52");
  return richParagraph(segments, x + 12, y, maxW - 13, 9, "0.25 0.31 0.39") + 1;
}

function tag(text, x, y) {
  addText(text, x, y, 7.8, "F2", "0.16 0.25 0.34");
}

function tagCloud(items, x, y, maxW, size = 7.4) {
  let cx = x;
  let cy = y;
  for (const item of items) {
    const textW = tagWidthOf(item, size);
    const w = Math.min(maxW, textW + 16);
    if (cx + w > x + maxW) {
      cx = x;
      cy -= 15;
    }
    addTagBox(item, cx, cy - 9.5, w, 13);
    addText(item, cx + ((w - textW) / 2), cy - 6.8, size, "F2", "0.16 0.25 0.34");
    cx += w + 5;
  }
  return cy - 18;
}

function brandLines(items, x, y, maxW, size = 7.4) {
  let cx = x;
  let cy = y;
  items.forEach((item, idx) => {
    const text = idx === items.length - 1 ? item : `${item} ·`;
    const w = pdfTextWidth(text, size, true);
    if (cx + w > x + maxW) {
      cx = x;
      cy -= 12;
    }
    addText(text, cx, cy, size, "F2", "0.16 0.25 0.34");
    cx += w + 5;
  });
  return cy - 18;
}

function parseQrSvg(svg) {
  const viewBox = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const viewBoxSize = viewBox ? Number(viewBox[1]) : 41;
  const path = svg.match(/<path stroke="#000000" d="([^"]+)"/)?.[1] || "";
  const rows = path.split("M").filter(Boolean);
  const segments = [];

  rows.forEach((row) => {
    const start = row.match(/^\s*([\d.]+)\s+([\d.]+)/);
    if (!start) return;
    let x = Number(start[1]);
    let y = Number(start[2]);
    const commands = row.slice(start[0].length);
    const re = /([hm])(-?[\d.]+)(?:\s+(-?[\d.]+))?/g;
    let match;
    while ((match = re.exec(commands))) {
      const cmd = match[1];
      const a = Number(match[2]);
      const b = Number(match[3] || 0);
      if (cmd === "h") {
        segments.push({ x, y: y - 0.5, w: a, h: 1 });
        x += a;
      } else {
        x += a;
        y += b;
      }
    }
  });

  return { viewBoxSize, segments };
}

const portfolioQr = parseQrSvg(portfolioQrSvg);

// Light paper background without heavy header bands.
addRect(0, 0, pageW, pageH, "0.97 0.99 1");

addCircleImage("Im1", margin, 694, 98);
addText("Valerio Serani", 154, 776, 29, "F2", "0.09 0.13 0.20");
addText("Graphic Designer | Visual, ADV, digital layout e video social", 154, 753, 11.5, "F2", "0.05 0.37 0.52");
richParagraph(
  [
    { text: "Graphic designer di Roma con esperienza su " },
    { text: "campagne promozionali,", bold: true },
    { text: " materiali " },
    { text: "print e digital,", bold: true },
    { text: " siti dedicati a concorsi/promozioni e " },
    { text: "contenuti video.", bold: true },
    { text: " Unisco " },
    { text: "cultura pop,", bold: true },
    { text: " sperimentazione e attenzione alla funzione per creare output chiari, coerenti e pronti per il canale finale." },
  ],
  154,
  729,
  386,
  9.1
);
addLine(margin, 671, pageW - margin, 671, "0.74 0.88 0.95", 1.4);

let y = 646;
y = section("Esperienza", margin, y);
addText("Graphic Designer Jr - Cube Proemotion", margin, y, 12, "F2");
addText("Gen 2024 - Gen 2026 | Roma", margin, y - 14, 8.3, "F2", "0.40 0.47 0.55");
y -= 32;
y = richBullet([{ text: "Creazione di " }, { text: "materiali grafici", bold: true }, { text: " per campagne pubblicitarie, promozioni, social e canali digitali." }], margin, y, leftW);
y = richBullet([{ text: "Progettazione di " }, { text: "layout", bold: true }, { text: " per siti promozionali, landing, newsletter e " }, { text: "materiali Winsmart", bold: true }, { text: "." }], margin, y, leftW);
y = richBullet([{ text: "Adattamento di visual " }, { text: "multi-formato", bold: true }, { text: " per print e digital, mantenendo coerenza con le direttive dei " }, { text: "brand", bold: true }, { text: "." }], margin, y, leftW);
y = richBullet([{ text: "Supporto a team creativi e marketing su " }, { text: "concept,", bold: true }, { text: " gerarchia visiva, leggibilità e preparazione file." }], margin, y, leftW);
y = richBullet([{ text: "Produzione di contenuti " }, { text: "video social", bold: true }, { text: " e promozionali, con attenzione a ritmo, montaggio e output finale." }], margin, y, leftW);
y -= 5;
addText("Creator social/video freelance", margin, y, 11, "F2");
addText("Feb 2025 - Presente | Roma", margin, y - 13, 8.1, "F2", "0.40 0.47 0.55");
y -= 29;
y = richBullet([{ text: "Sperimentazione su contenuti " }, { text: "social", bold: true }, { text: " e video verticali, curando " }, { text: "fotografia, regia e montaggio", bold: true }, { text: "." }], margin, y, leftW);
y = richBullet([{ text: "Ideazione di " }, { text: "format brevi", bold: true }, { text: " con attenzione a ritmo, mood, storytelling e resa multi-piattaforma." }], margin, y, leftW);

y -= 7;
y = section("Metodo di lavoro", margin, y);
y = richParagraph([{ text: "Parto dal " }, { text: "messaggio", bold: true }, { text: " e dal contesto d'uso: cosa deve capire l'utente, dove vedrà il contenuto e quale azione deve compiere. Da qui costruisco " }, { text: "gerarchia,", bold: true }, { text: " ritmo visivo e adattamenti per formato." }], margin, y, leftW, 9.1);
y = richParagraph([{ text: "Lavoro in dialogo con " }, { text: "team creativi", bold: true }, { text: " e marketing: raccolgo vincoli, linee guida e asset esistenti, poi li trasformo in materiali " }, { text: "leggibili, coerenti e pronti per produzione", bold: true }, { text: "." }], margin, y, leftW, 9.1);
y = richParagraph([{ text: "Uso " }, { text: "sperimentazione,", bold: true }, { text: " " }, { text: "AI workflow", bold: true }, { text: " e cultura visiva come acceleratori, mantenendo sempre controllo umano su tono, qualità e funzione finale." }], margin, y, leftW, 9.1);

y -= 8;
y = section("Aziende e brand", margin, y);
y = brandLines([
  "M&M's", "Monini", "Cesar", "Ferrari Hypercar", "Control", "BOEM",
  "Angelini", "OKI", "Sensodyne", "Mentadent", "L'Or", "Kellogg's",
  "Lavazza", "Mutti", "Peroni", "TIM", "Telepass", "CIF",
  "AMUCHINA", "Multicentrum", "Algida", "WIQO", "Sunsilk", "Sagre Autentiche"
], margin, y, leftW, 6.4);

y -= 7;
y = section("Formazione e certificazioni", margin, y);
y = paragraph("AANT - Accademia delle Arti e Nuove Tecnologie, Graphic Design, Nov 2019 - Giu 2022, Roma.", margin, y, leftW, 9);
y = paragraph("LEARNN - Percorsi su marketing digitale, social media, AI e produttività creativa.", margin, y, leftW, 9);
y = paragraph("Corsi di Digital Skills, Marketing, SEO - LV8 Certification Badge.", margin, y, leftW, 9);

let sy = 646;
sy = section("Contatti", sideX, sy);
sy = paragraph("Roma, Italia\nvalerioserani@gmail.com\n+39 346 969 7747", sideX, sy, sideW, 8.8);
sy = paragraph("LinkedIn: valerio-serani-682a48215\nBehance: velvet172", sideX, sy, sideW, 8.3);
addQr(portfolioQr.segments, portfolioQr.viewBoxSize, sideX, sy - 82, 78);
addText("Portfolio online", sideX, sy - 94, 8.5, "F2", "0.05 0.37 0.52");
addText("velvet172.github.io/Portfolio_Valerio", sideX, sy - 106, 6.5, "F1", "0.25 0.31 0.39");
sy -= 120;

sy -= 7;
sy = section("Competenze", sideX, sy);
[
  "Visual design",
  "ADV",
  "Art direction",
  "Layout digital",
  "Print design",
  "UX/UI",
  "Landing page",
  "Materiali Winsmart",
  "Social content",
  "Video editing",
  "Copywriting",
  "AI workflow",
].forEach((item) => {
  tag(item, sideX, sy);
  sy -= 13;
});

sy -= 6;
sy = section("Tool", sideX, sy);
sy = paragraph("Adobe Photoshop, Illustrator, InDesign, After Effects, Premiere Pro. Figma, Mural, Whimsical, CapCut, editor video social.", sideX, sy, sideW, 8.5);
sy = paragraph("Prompting, ricerca, scrittura creativa e produzione assistita da AI.", sideX, sy, sideW, 8.5);

sy -= 6;
sy = section("Punti forti", sideX, sy);
sy = richParagraph([{ text: "Adattamento rapido", bold: true }, { text: " tra print, digital e video. Attenzione a " }, { text: "coerenza brand,", bold: true }, { text: " leggibilità e output finale. " }, { text: "Curiosità tecnica", bold: true }, { text: " e uso consapevole dell'AI." }], sideX, sy, sideW, 8.5);

sy -= 6;
sy = section("Lingue", sideX, sy);
paragraph("Italiano C2\nEnglish B2", sideX, sy, sideW, 9);

const objects = [];

function addObject(content) {
  objects.push(content);
  return objects.length;
}

function objectBuffer(content) {
  if (Buffer.isBuffer(content)) return content;
  if (Array.isArray(content)) return Buffer.concat(content.map(objectBuffer));
  return Buffer.from(String(content), "latin1");
}

const fontRegular = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
const fontBold = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
const imageRef = addObject([
  `<< /Type /XObject /Subtype /Image /Width 800 /Height 800 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${portrait.length} >>\nstream\n`,
  portrait,
  "\nendstream",
]);

const pageRefs = [];

for (const page of pages) {
  let stream = "";
  for (const op of page) {
    if (op.type === "text") {
      stream += `BT /${op.font} ${op.size} Tf ${op.color} rg ${op.x.toFixed(2)} ${op.y.toFixed(2)} Td (${esc(op.text)}) Tj ET\n`;
    } else if (op.type === "line") {
      stream += `${op.color} RG ${op.width} w ${op.x1.toFixed(2)} ${op.y1.toFixed(2)} m ${op.x2.toFixed(2)} ${op.y2.toFixed(2)} l S\n`;
    } else if (op.type === "rect") {
      stream += `${op.color} rg ${op.x.toFixed(2)} ${op.y.toFixed(2)} ${op.w.toFixed(2)} ${op.h.toFixed(2)} re f\n`;
    } else if (op.type === "tagBox") {
      stream += `0.94 0.98 1 rg ${op.x.toFixed(2)} ${op.y.toFixed(2)} ${op.w.toFixed(2)} ${op.h.toFixed(2)} re f\n`;
      stream += `0.75 0.88 0.95 RG 0.65 w ${op.x.toFixed(2)} ${op.y.toFixed(2)} ${op.w.toFixed(2)} ${op.h.toFixed(2)} re S\n`;
    } else if (op.type === "qr") {
      const scale = op.size / op.viewBoxSize;
      stream += `1 1 1 rg ${op.x.toFixed(2)} ${op.y.toFixed(2)} ${op.size.toFixed(2)} ${op.size.toFixed(2)} re f\n`;
      stream += `0.74 0.88 0.95 RG 0.7 w ${op.x.toFixed(2)} ${op.y.toFixed(2)} ${op.size.toFixed(2)} ${op.size.toFixed(2)} re S\n`;
      stream += `0.09 0.13 0.20 rg\n`;
      op.segments.forEach((seg) => {
        const rx = op.x + seg.x * scale;
        const ry = op.y + op.size - (seg.y + seg.h) * scale;
        stream += `${rx.toFixed(3)} ${ry.toFixed(3)} ${(seg.w * scale).toFixed(3)} ${(seg.h * scale).toFixed(3)} re f\n`;
      });
    } else if (op.type === "image") {
      stream += `q ${op.w.toFixed(2)} 0 0 ${op.h.toFixed(2)} ${op.x.toFixed(2)} ${op.y.toFixed(2)} cm /${op.name} Do Q\n`;
    } else if (op.type === "circleImage") {
      const r = op.size / 2;
      const cx = op.x + r;
      const cy = op.y + r;
      const k = 0.5522847498 * r;
      stream += `q\n`;
      stream += `${cx.toFixed(2)} ${(cy + r).toFixed(2)} m\n`;
      stream += `${(cx + k).toFixed(2)} ${(cy + r).toFixed(2)} ${(cx + r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx + r).toFixed(2)} ${cy.toFixed(2)} c\n`;
      stream += `${(cx + r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx + k).toFixed(2)} ${(cy - r).toFixed(2)} ${cx.toFixed(2)} ${(cy - r).toFixed(2)} c\n`;
      stream += `${(cx - k).toFixed(2)} ${(cy - r).toFixed(2)} ${(cx - r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx - r).toFixed(2)} ${cy.toFixed(2)} c\n`;
      stream += `${(cx - r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx - k).toFixed(2)} ${(cy + r).toFixed(2)} ${cx.toFixed(2)} ${(cy + r).toFixed(2)} c W n\n`;
      stream += `${op.size.toFixed(2)} 0 0 ${op.size.toFixed(2)} ${op.x.toFixed(2)} ${op.y.toFixed(2)} cm /${op.name} Do Q\n`;
      stream += `0.32 0.76 0.95 RG 1.7 w ${cx.toFixed(2)} ${(cy + r).toFixed(2)} m\n`;
      stream += `${(cx + k).toFixed(2)} ${(cy + r).toFixed(2)} ${(cx + r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx + r).toFixed(2)} ${cy.toFixed(2)} c\n`;
      stream += `${(cx + r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx + k).toFixed(2)} ${(cy - r).toFixed(2)} ${cx.toFixed(2)} ${(cy - r).toFixed(2)} c\n`;
      stream += `${(cx - k).toFixed(2)} ${(cy - r).toFixed(2)} ${(cx - r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx - r).toFixed(2)} ${cy.toFixed(2)} c\n`;
      stream += `${(cx - r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx - k).toFixed(2)} ${(cy + r).toFixed(2)} ${cx.toFixed(2)} ${(cy + r).toFixed(2)} c S\n`;
    }
  }
  const contentRef = addObject(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}endstream`);
  const pageRef = addObject(`<< /Type /Page /Parent PAGES_REF 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> /XObject << /Im1 ${imageRef} 0 R >> >> /Contents ${contentRef} 0 R >>`);
  pageRefs.push(pageRef);
}

const pagesRef = addObject(`<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`);
const catalogRef = addObject(`<< /Type /Catalog /Pages ${pagesRef} 0 R >>`);

const chunks = [Buffer.from("%PDF-1.4\n", "latin1")];
const offsets = [0];
let byteLength = chunks[0].length;
objects.forEach((object, idx) => {
  offsets.push(byteLength);
  const head = Buffer.from(`${idx + 1} 0 obj\n`, "latin1");
  let obj = objectBuffer(object);
  if (obj.includes(Buffer.from("PAGES_REF", "latin1"))) {
    obj = Buffer.from(obj.toString("latin1").replaceAll("PAGES_REF", pagesRef), "latin1");
  }
  const tail = Buffer.from("\nendobj\n", "latin1");
  chunks.push(head, obj, tail);
  byteLength += head.length + obj.length + tail.length;
});
const body = Buffer.concat(chunks.map((chunk) => Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, "latin1")));
let trailer = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i < offsets.length; i += 1) {
  trailer += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
trailer += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} 0 R >>\nstartxref\n${body.length}\n%%EOF\n`;

writeFileSync(output, Buffer.concat([body, Buffer.from(trailer, "latin1")]));
