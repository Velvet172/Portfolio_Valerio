import { writeFileSync } from "node:fs";
import { makeQrMatrix, qrToSvg } from "./qr.mjs";

const url = "https://velvet172.github.io/Portfolio_Valerio/";
const matrix = makeQrMatrix(url);

writeFileSync("public/img/CV/portfolio-qr.svg", qrToSvg(matrix));
