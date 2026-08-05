// Um leitor de PNG minimo, so o suficiente pra medir pixel.
//
// Existe pra que nem o script de token nem o de acessibilidade precisem de
// Canvas ou de dependencia de imagem: os dois so precisam do buffer de pixels
// e o zlib do proprio Node ja resolve.

import { inflateSync } from "node:zlib";

export function PNG_LEITOR(buf) {
  let i = 8;
  const idat = [];
  let larg = 0;
  let alt = 0;
  let tipoCor = 0;
  while (i < buf.length) {
    const tam = buf.readUInt32BE(i);
    const tipo = buf.toString("ascii", i + 4, i + 8);
    const dados = buf.subarray(i + 8, i + 8 + tam);
    if (tipo === "IHDR") {
      larg = dados.readUInt32BE(0);
      alt = dados.readUInt32BE(4);
      tipoCor = dados[9];
    } else if (tipo === "IDAT") {
      idat.push(dados);
    }
    i += 12 + tam;
  }
  const canais = tipoCor === 6 ? 4 : 3;
  const bruto = inflateSync(Buffer.concat(idat));
  const passo = larg * canais;
  const px = Buffer.alloc(alt * passo);
  let anterior = Buffer.alloc(passo);
  let pos = 0;
  for (let y = 0; y < alt; y++) {
    const filtro = bruto[pos++];
    const linha = Buffer.from(bruto.subarray(pos, pos + passo));
    pos += passo;
    for (let x = 0; x < passo; x++) {
      const a = x >= canais ? linha[x - canais] : 0;
      const b = anterior[x];
      const c = x >= canais ? anterior[x - canais] : 0;
      if (filtro === 1) linha[x] = (linha[x] + a) & 255;
      else if (filtro === 2) linha[x] = (linha[x] + b) & 255;
      else if (filtro === 3) linha[x] = (linha[x] + ((a + b) >> 1)) & 255;
      else if (filtro === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        linha[x] = (linha[x] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    linha.copy(px, y * passo);
    anterior = linha;
  }
  return { larg, alt, canais, passo, px };
}
