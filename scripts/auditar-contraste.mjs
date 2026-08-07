#!/usr/bin/env node
// Cinnabar: a auditoria de contraste.
//
// Todo numero que aparece comentado no styles/tokens.css sai daqui. A ideia e
// simples: contraste que ninguem mede vira comentario mentiroso em duas
// semanas, e ninguem descobre ate alguem reclamar que nao consegue ler.
//
// Este script mede, com a formula de luminancia relativa da WCAG 2.x:
//
//   1. Cada PAR declarado em lib/paleta.ts, nos dois temas. Texto sobre
//      superficie, borda sobre fundo, anel de foco sobre o que estiver embaixo.
//
//   2. Os COMPOSTOS. Uma tinta translucida como `alta/12` (o chip de variacao)
//      so vale medida DEPOIS de composta sobre o fundo: o olho le a mistura,
//      nao a tinta. Quatro dos seis erros da primeira rodada eram exatamente
//      isso, cores que passavam sozinhas e reprovavam dentro do proprio chip.
//
//   3. As CADEIAS da capa pintada, que tem duas camadas antes do texto (o veu
//      escuro e o vidro claro da faixa). Medir so a de cima mente, porque quem
//      decide a legibilidade e o pior ponto la embaixo.
//
// Sai com codigo 1 se qualquer par cair abaixo do minimo declarado, entao ele
// serve de porta: token novo que nao passa nao entra.
//
// A lista de tokens NAO vive aqui, vive em lib/paleta.ts, que a story da
// paleta e a vitrine tambem importam. O Node tira os tipos sozinho, entao este
// .mjs importa o .ts direto. Uma lista so, tres leitores.
//
// Rode com: npm run contraste

import { compor, contraste } from "../lib/contraste.ts";
import { CADEIAS, COMPOSTOS, PARES_EXTRA, TOKENS, paleta } from "../lib/paleta.ts";

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

const falhas = relatorio("claro") + relatorio("escuro");
console.log(
  falhas === 0
    ? "\nTodos os pares passam no minimo declarado."
    : `\n${falhas} par(es) abaixo do minimo declarado.`
);
process.exit(falhas === 0 ? 0 : 1);
