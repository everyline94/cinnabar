#!/usr/bin/env node
// Cinnabar: de onde vem cada token.
//
// Este script existe porque token sem medicao rastreavel vira chute na proxima
// revisao. Ele faz duas coisas:
//
//   1. AMOSTRA a imagem de referencia (referencia/dashboard.png) por regiao,
//      decodificando o PNG na mao com zlib. Sem dependencia, sem Canvas.
//      O olho erra: o "cinza claro" de um dashboard pode ser #f4, #f7 ou #fa,
//      e a diferenca entre eles decide se o cartao branco flutua ou some.
//
//   2. MEDE o contraste (WCAG 2.x) de cada par que a paleta declara, inclusive
//      os COMPOSTOS (uma tinta translucida como queda/12 so vale se voce
//      compos ela sobre o fundo antes de medir) e as CADEIAS (a pintura da
//      capa tem duas camadas antes do texto).
//
// A lista de tokens NAO vive aqui: vive em lib/paleta.ts, que a story da
// paleta e a vitrine tambem importam. O Node tira os tipos sozinho, entao este
// .mjs importa o .ts direto. Uma lista so.
//
// Rode com: npm run tokens
// Sai com codigo 1 se qualquer par cair abaixo do minimo declarado.

import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { compor, contraste } from "../lib/contraste.ts";
import { CADEIAS, COMPOSTOS, PARES_EXTRA, TOKENS, paleta } from "../lib/paleta.ts";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------------------------------------------------------- PNG ---- */

function lerPng(caminho) {
  const buf = readFileSync(caminho);
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
  if (tipoCor !== 2 && tipoCor !== 6) {
    throw new Error(`tipo de cor ${tipoCor} nao suportado (esperado 2 ou 6)`);
  }
  const canais = tipoCor === 2 ? 3 : 4;
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

function amostrar(img, x0, y0, x1, y1) {
  const contagem = new Map();
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const o = y * img.passo + x * img.canais;
      const chave = (img.px[o] << 16) | (img.px[o + 1] << 8) | img.px[o + 2];
      contagem.set(chave, (contagem.get(chave) ?? 0) + 1);
    }
  }
  const total = (x1 - x0) * (y1 - y0);
  return [...contagem.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, n]) => ({
      hex: "#" + k.toString(16).padStart(6, "0"),
      pct: (100 * n) / total,
    }));
}

/* --------------------------------------------------------------- saida ---- */

const ok = (v, min) => (v >= min ? "passa" : "REPROVA");
const linha = (rotulo, v, min, papel, extra = "") =>
  `  ${rotulo.padEnd(34)} ${v.toFixed(2).padStart(5)}:1  min ${min.toFixed(1)}  ${ok(v, min).padEnd(8)} ${papel}${extra}`;

function relatorio(tema) {
  const p = paleta(tema);
  console.log(`\n=== contraste, tema ${tema} ===`);
  let falhas = 0;

  for (const token of TOKENS) {
    if (!token.medirSobre || token.minimo === undefined) continue;
    const v = contraste(p[token.nome], p[token.medirSobre]);
    if (v < token.minimo) falhas++;
    console.log(
      linha(`${token.nome} / ${token.medirSobre}`, v, token.minimo, token.papel)
    );
  }

  for (const par of PARES_EXTRA) {
    const v = contraste(p[par.frente], p[par.fundo]);
    if (v < par.minimo) falhas++;
    console.log(linha(`${par.frente} / ${par.fundo}`, v, par.minimo, par.papel));
  }

  for (const c of COMPOSTOS) {
    const misto = compor(p[c.tinta], c.alfa, p[c.base]);
    const v = contraste(p[c.frente], misto);
    if (v < c.minimo) falhas++;
    console.log(
      linha(
        `${c.frente} / ${c.tinta}/${Math.round(c.alfa * 100)}`,
        v,
        c.minimo,
        c.papel,
        ` (composto ${misto})`
      )
    );
  }

  for (const c of CADEIAS) {
    let atual = p[c.base];
    for (const [tinta, alfa] of c.camadas) atual = compor(tinta, alfa, atual);
    const v = contraste(p[c.frente], atual);
    if (v < c.minimo) falhas++;
    console.log(
      linha(`cadeia sobre ${c.base}`, v, c.minimo, c.papel, ` (composto ${atual})`)
    );
  }

  return falhas;
}

/* --------------------------------------------------------------- roda ---- */

if (!process.argv.includes("--so-contraste")) {
  const img = lerPng(join(raiz, "referencia", "dashboard.png"));
  console.log(`=== amostragem da referencia (${img.larg}x${img.alt}) ===`);
  const REGIOES = [
    ["mesa: faixa livre a direita", 946, 620, 972, 712],
    ["papel: corpo do cartao Accounts", 300, 320, 420, 336],
    ["tinta: rail lateral", 55, 300, 110, 600],
    ["tinta: pilula See all", 600, 490, 690, 508],
    ["pigmento: icone Brex", 194, 340, 214, 362],
    ["capa-quente: nucleo da pintura", 780, 60, 900, 120],
    ["capa-fria: pincelada fria", 520, 140, 600, 200],
    ["aviso: tile Cash out", 676, 570, 724, 602],
    ["ametista: donut", 420, 650, 452, 700],
    ["lagoa: donut", 470, 688, 500, 708],
  ];
  for (const [nome, ...caixa] of REGIOES) {
    const top = amostrar(img, ...caixa);
    console.log(
      `  ${nome.padEnd(34)} ` +
        top.map((t) => `${t.hex} ${t.pct.toFixed(0)}%`).join("  |  ")
    );
  }
  console.log(
    "\n  (o pigmento e a lagoa aparecem misturados porque a referencia esta\n" +
      "   comprimida: o valor cravado no token e a moda da regiao limpa, e a\n" +
      "   lagoa foi escurecida de #43b0b7 pro minimo que passa 3:1.)"
  );
}

const falhas = relatorio("claro") + relatorio("escuro");
console.log(
  falhas === 0
    ? "\nTodos os pares passam no minimo declarado."
    : `\n${falhas} par(es) abaixo do minimo declarado.`
);
process.exit(falhas === 0 ? 0 : 1);
