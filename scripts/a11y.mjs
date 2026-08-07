#!/usr/bin/env node
// Cinnabar: a varredura de acessibilidade.
//
// Acessibilidade conferida a mao e acessibilidade conferida ate cansar. Aqui o
// axe passa em TODAS as stories, nos DOIS temas, mais a vitrine inteira, e o
// script sai com erro se sobrar qualquer violacao.
//
// Alem do axe, ele mede o pixel mais claro da capa pintada renderizada. Esse
// teste existe porque o modelo de contraste em lib/paleta.ts so conhece as
// manchas de tinta: quem estourou o piso na primeira versao foi o branco das
// pinceladas, que o modelo nao via. Afirmacao de contraste que ninguem mede
// vira comentario mentiroso em duas semanas, e aqui ela e medida no pixel.
//
// Precisa do build pronto:
//   npm run build-site && npm run a11y
//
// O servidor aqui e LITERAL de proposito (serve o arquivo que existe, e nada
// mais). Servidor com clean-URL redireciona iframe.html e faz o catalogo
// parecer quebrado quando nao esta.

import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createRequire } from "node:module";

import { chromium } from "playwright";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const requerer = createRequire(import.meta.url);
const CAMINHO_AXE = requerer.resolve("axe-core/axe.min.js");

const SAIDA = join(raiz, "out");
const PORTA = 4319;

// O assentamento. Sem ele o axe mede antes da fonte trocar e antes do tema
// cair, e reporta contraste que nao existe na tela de ninguem.
const ASSENTAMENTO = 600;

/* ------------------------------------------------------- servidor ---- */

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function servir(pasta, porta) {
  const servidor = createServer((req, res) => {
    const caminho = decodeURIComponent(new URL(req.url, "http://l").pathname);
    let alvo = join(pasta, normalize(caminho).replace(/^(\.\.[/\\])+/, ""));
    if (existsSync(alvo) && statSync(alvo).isDirectory()) {
      alvo = join(alvo, "index.html");
    }
    if (!existsSync(alvo)) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("404");
      return;
    }
    res.writeHead(200, { "content-type": TIPOS[extname(alvo)] ?? "application/octet-stream" });
    createReadStream(alvo).pipe(res);
  });
  return new Promise((ok) => servidor.listen(porta, () => ok(servidor)));
}

/* ----------------------------------------------------------- regras ---- */

// A vitrine roda o conjunto COMPLETO, porque ela e uma pagina de verdade: tem
// um main, tem regioes, tem um h1.
const REGRAS_VITRINE = {};

// A story nao e pagina: e uma peca isolada dentro de um iframe. Estas tres
// regras cobram estrutura de documento inteiro e reprovariam toda story do
// catalogo por um motivo que nao existe no lugar onde a peca vai ser usada.
const REGRAS_STORY = {
  "landmark-one-main": { enabled: false },
  region: { enabled: false },
  "page-has-heading-one": { enabled: false },
};

const TEMAS = ["claro", "escuro"];

/* ------------------------------------------------------------ axe ---- */

async function varrer(page, url, regras) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(ASSENTAMENTO);
  await page.addScriptTag({ path: CAMINHO_AXE });
  return page.evaluate(
    async (r) =>
      // eslint-disable-next-line no-undef
      await window.axe.run(document, { rules: r, resultTypes: ["violations"] }),
    regras
  );
}

/* ------------------------------------------- a capa, em pixel ---- */

async function medirCapa(page, urlCena) {
  await page.goto(urlCena, { waitUntil: "networkidle" });
  await page.waitForTimeout(ASSENTAMENTO);

  // A medicao acontece na story em que a CapaPintada e renderizada SOZINHA,
  // sem filho nenhum. Duas tentativas anteriores falharam e valem o registro:
  // esconder o conteudo por CSS injetado falhou em silencio, e recortar a area
  // da camada de tinta nao adianta porque page.screenshot({clip}) fotografa a
  // pagina COMPOSTA, entao o texto que esta por cima entra no recorte de
  // qualquer jeito. Nos dois casos o script mediu o branco de um botao e
  // reportou 1.00:1. Com a capa sozinha nao ha o que entrar por cima.
  const tinta = page.locator('[data-slot="capa-tinta"]').first();
  if ((await tinta.count()) === 0) return null;

  const caixa = await tinta.boundingBox();
  // Recua 34px: o pai tem canto arredondado, e o pixel de mesa que aparece na
  // curva falsearia o "pior ponto" da pintura.
  const R = 34;
  const png = await page.screenshot({
    clip: {
      x: caixa.x + R,
      y: caixa.y + R,
      width: caixa.width - 2 * R,
      height: caixa.height - 2 * R,
    },
  });

  const { PNG_LEITOR } = await import("./png-minimo.mjs");
  if (process.env.CINNABAR_DUMP) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(process.env.CINNABAR_DUMP, png);
  }
  const img = PNG_LEITOR(png);
  const canal = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const lum = (r, g, b) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
  const cr = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

  let pior = 0;
  let piorPx = [0, 0, 0];
  for (let y = 0; y < img.alt; y++) {
    for (let x = 0; x < img.larg; x++) {
      const o = y * img.passo + x * img.canais;
      const l = lum(img.px[o], img.px[o + 1], img.px[o + 2]);
      if (l > pior) {
        pior = l;
        piorPx = [img.px[o], img.px[o + 1], img.px[o + 2]];
      }
    }
  }
  const branco = lum(255, 255, 255);
  // A faixa de metricas poe vidro branco a 12% por cima antes do texto.
  const vidro = piorPx.map((v) => Math.round(255 * 0.12 + v * 0.88));
  return {
    hex: "#" + piorPx.map((v) => v.toString(16).padStart(2, "0")).join(""),
    semVidro: cr(branco, pior),
    comVidro: cr(branco, lum(vidro[0], vidro[1], vidro[2])),
  };
}

/* ----------------------------------------------------------- roda ---- */

if (!existsSync(SAIDA) || !existsSync(join(SAIDA, "catalogo", "index.json"))) {
  console.error(
    "out/ ou out/catalogo/ nao existe. Rode `npm run build-site` antes de `npm run a11y`."
  );
  process.exit(1);
}

const servidor = await servir(SAIDA, PORTA);
const base = `http://127.0.0.1:${PORTA}`;
const navegador = await chromium.launch();
const contexto = await navegador.newContext({ viewport: { width: 1360, height: 900 } });

const erroConsole = [];
contexto.on("page", (page) => {
  page.on("console", (m) => {
    if (m.type() === "error") erroConsole.push(`${page.url()}\n      ${m.text()}`);
  });
  page.on("pageerror", (e) => erroConsole.push(`${page.url()}\n      ${e.message}`));
});

const page = await contexto.newPage();
const indice = JSON.parse(await readFile(join(SAIDA, "catalogo", "index.json"), "utf8"));
const SO_CAPA = process.argv.includes("--so-capa");
// As paginas de Docs sao geradas pelo autodocs e agregam varias stories na
// mesma tela; varrer as stories uma a uma ja cobre o conteudo delas.
const stories = Object.values(indice.entries).filter((e) => e.type === "story");

let total = 0;
const problemas = [];

console.log(`Varrendo ${stories.length} stories x ${TEMAS.length} temas, mais a vitrine.\n`);

for (const story of SO_CAPA ? [] : stories) {
  for (const tema of TEMAS) {
    const url = `${base}/catalogo/iframe.html?id=${encodeURIComponent(story.id)}&globals=theme:${tema}`;
    const r = await varrer(page, url, REGRAS_STORY);
    total++;
    if (r.violations.length) {
      problemas.push({
        onde: `${story.title} / ${story.name} [${tema}]`,
        violacoes: r.violations,
      });
      process.stdout.write("x");
    } else {
      process.stdout.write(".");
    }
  }
}
console.log();

for (const tema of SO_CAPA ? [] : ["light", "dark"]) {
  // A vitrine e controlada pelo next-themes, que le a classe no html.
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate((t) => {
    localStorage.setItem("theme", t);
  }, tema);
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(ASSENTAMENTO);
  await page.addScriptTag({ path: CAMINHO_AXE });
  const r = await page.evaluate(
    async (regras) => await window.axe.run(document, { rules: regras, resultTypes: ["violations"] }),
    REGRAS_VITRINE
  );
  total++;
  if (r.violations.length) {
    problemas.push({ onde: `vitrine [${tema}]`, violacoes: r.violations });
    process.stdout.write("x");
  } else {
    process.stdout.write(".");
  }
}
console.log("\n");

// A capa, medida no pixel.
const idCena = stories.find(
  (s) => s.title.includes("CapaPintada") && s.name === "Sozinha"
)?.id;
let capa = null;
if (idCena) {
  capa = await medirCapa(
    page,
    `${base}/catalogo/iframe.html?id=${encodeURIComponent(idCena)}&globals=theme:claro`
  );
}

await navegador.close();
servidor.close();

/* ---------------------------------------------------------- saida ---- */

console.log(`${total} varreduras concluidas.`);

if (capa) {
  const ok = capa.semVidro >= 4.5 && capa.comVidro >= 4.5;
  console.log(
    `\nCapa pintada, pixel mais claro ${capa.hex}: texto branco da ` +
      `${capa.semVidro.toFixed(2)}:1 direto e ${capa.comVidro.toFixed(2)}:1 sob o vidro da faixa. ` +
      (ok ? "Piso mantido." : "PISO ROMPIDO (minimo 4.5:1).")
  );
  if (!ok) problemas.push({ onde: "capa pintada", violacoes: [] });
}

if (erroConsole.length) {
  console.log(`\n${erroConsole.length} erro(s) no console:`);
  for (const e of erroConsole.slice(0, 20)) console.log("  - " + e);
}

if (problemas.length) {
  console.log(`\n${problemas.length} tela(s) com violacao:\n`);
  for (const p of problemas) {
    console.log(`  ${p.onde}`);
    for (const v of p.violacoes) {
      console.log(`    [${v.impact}] ${v.id}: ${v.help}`);
      for (const no of v.nodes.slice(0, 3)) {
        console.log(`      ${no.target.join(" ")}`);
        const resumo = (no.failureSummary ?? "").split("\n").filter(Boolean)[1];
        if (resumo) console.log(`      ${resumo.trim()}`);
      }
    }
  }
}

const limpo = problemas.length === 0 && erroConsole.length === 0;
console.log(limpo ? "\nZero violacao e console limpo." : "\nFalhou.");
process.exit(limpo ? 0 : 1);
