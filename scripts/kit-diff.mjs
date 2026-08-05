#!/usr/bin/env node
// Cinnabar: o que ainda e shadcn puro e o que ja foi vestido.
//
// A tabela do README so vale se alguem conseguir refaze-la. Este script baixa
// cada item do registry base-nova, desfaz as transformacoes que a propria CLI
// faz na instalacao, e compara com o arquivo que esta no disco.
//
// Serve pra responder a unica pergunta que importa antes de mexer em
// components/ui/: posso rodar `shadcn add <x> --overwrite` sem apagar marca?
//
//   PURO        pode. O arquivo e identico ao registry.
//   CUSTOMIZADO nao. Rode o diff, veja o que mudou e reaplique a mao.
//
// Rode com: npm run kit-diff

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(raiz, "components", "ui");
const ESTILO = "base-nova";

/**
 * Desfaz o que a CLI faz na instalacao, pra que so a diferenca DELIBERADA
 * apareca. Sem isto, componente que so tem icone aparece como customizado:
 * o registry guarda um IconPlaceholder e a CLI troca por lucide na hora de
 * escrever o arquivo.
 */
function normalizar(fonte) {
  return fonte
    .replaceAll(`@/registry/${ESTILO}/lib/utils`, "@/lib/utils")
    .replaceAll(`@/registry/${ESTILO}/ui/`, "@/components/ui/")
    .replaceAll(`@/registry/${ESTILO}/hooks/`, "@/hooks/")
    // a substituicao de biblioteca de icone
    .replace(/import \{ IconPlaceholder \} from "[^"]+"\n/g, "")
    .replace(/import \{[^}]+\} from "lucide-react"\n/g, "")
    .replace(/<IconPlaceholder[\s\S]*?\/>/g, "<ICONE />")
    .replace(/<[A-Z][A-Za-z]*Icon[\s\S]{0,200}?\/>/g, "<ICONE />")
    .replace(/\s+/g, " ")
    .trim();
}

const nomes = readdirSync(DIR)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""))
  .sort();

const puros = [];
const vestidos = [];

for (const nome of nomes) {
  const resposta = await fetch(`https://ui.shadcn.com/r/styles/${ESTILO}/${nome}.json`);
  if (!resposta.ok) {
    vestidos.push([nome, "sem item no registry"]);
    continue;
  }
  const item = await resposta.json();
  const arquivo =
    item.files.find((f) => f.path.endsWith(`/ui/${nome}.tsx`)) ?? item.files[0];
  const meu = readFileSync(join(DIR, `${nome}.tsx`), "utf8");

  if (normalizar(arquivo.content) === normalizar(meu)) {
    puros.push(nome);
  } else {
    const notas = (meu.match(/CUSTOMIZADO/g) ?? []).length;
    vestidos.push([
      nome,
      notas ? `${notas} decisao(oes) anotada(s) no arquivo` : "vestido pela varredura de tokens",
    ]);
  }
}

console.log(`PURO (${puros.length}) — pode rodar shadcn add --overwrite:\n`);
console.log("  " + puros.join(", ") + "\n");
console.log(`CUSTOMIZADO (${vestidos.length}) — NUNCA overwrite, apaga a marca:\n`);
for (const [nome, motivo] of vestidos) {
  console.log(`  ${nome.padEnd(16)} ${motivo}`);
}
