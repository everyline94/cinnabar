/**
 * A paleta do Cinnabar, em dado.
 *
 * Este arquivo e a unica lista de tokens escrita a mao no projeto. Ele espelha
 * o :root e o .dark do styles/tokens.css, e tres coisas leem daqui:
 *
 *   - scripts/auditar-contraste.mjs, que reprova o build se algum par cair
 *     abaixo do minimo (o Node tira os tipos sozinho, entao o .mjs importa
 *     este .ts direto);
 *   - a story de Fundacao/Paleta, que imprime o contraste medido na tela;
 *   - a vitrine, que importa a MESMA story de conteudo.
 *
 * Duas listas de token escritas a mao divergem em uma semana. Esta e uma so.
 */

export type Grupo =
  | "Superfícies"
  | "Texto"
  | "Linhas"
  | "Ação"
  | "Marca"
  | "Dados"
  | "A pintura";

export type Token = {
  /** O nome do custom property, sem os dois tracos. ASCII. */
  nome: string;
  grupo: Grupo;
  /** O PAPEL do token numa frase. E isto que vira a lingua do sistema. */
  papel: string;
  claro: string;
  escuro: string;
  /** Contra qual token medir o contraste na story. */
  medirSobre?: string;
  /** 4.5 = texto normal. 3.0 = componente de interface e texto grande. */
  minimo?: number;
  /** Por que este token nao se redeclara no tema escuro. */
  fixo?: string;
};

export const TOKENS: Token[] = [
  {
    nome: "mesa",
    grupo: "Superfícies",
    papel: "o fundo da página, onde o papel se apoia",
    claro: "#f7f7f7",
    escuro: "#0c0c0c",
  },
  {
    nome: "papel",
    grupo: "Superfícies",
    papel: "a superfície de conteúdo: cartão, painel, campo",
    claro: "#ffffff",
    escuro: "#171717",
  },
  {
    nome: "papel-fundo",
    grupo: "Superfícies",
    papel: "a superfície recuada dentro do cartão",
    claro: "#f4f4f4",
    escuro: "#212121",
  },
  {
    nome: "tinta",
    grupo: "Superfícies",
    papel: "a superfície forte: o rail, a pílula, a marca",
    claro: "#000000",
    escuro: "#fafafa",
  },
  {
    nome: "sobre-tinta",
    grupo: "Superfícies",
    papel: "o texto que senta em cima da tinta",
    claro: "#ffffff",
    escuro: "#0a0a0a",
    medirSobre: "tinta",
    minimo: 4.5,
  },

  {
    nome: "texto",
    grupo: "Texto",
    papel: "o texto principal",
    claro: "#0a0a0a",
    escuro: "#f5f5f5",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "texto-suave",
    grupo: "Texto",
    papel: "o texto secundário: descrição, nota, apoio",
    claro: "#565656",
    escuro: "#a8a8a8",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "texto-tenue",
    grupo: "Texto",
    papel: "o rótulo miúdo em maiúscula, o degrau mais fraco que ainda lê",
    claro: "#6b6b6b",
    escuro: "#8f8f8f",
    medirSobre: "papel",
    minimo: 4.5,
  },

  {
    nome: "linha",
    grupo: "Linhas",
    papel: "a borda decorativa: divisória de lista, contorno",
    claro: "#e6e6e6",
    escuro: "#282828",
  },
  {
    nome: "linha-campo",
    grupo: "Linhas",
    papel: "a borda de campo de formulário, que carrega informação sozinha",
    claro: "#8a8a8a",
    escuro: "#6a6a6a",
    medirSobre: "papel",
    minimo: 3.0,
  },

  {
    nome: "acao",
    grupo: "Ação",
    papel: "a ação primária, que aqui é preta e não colorida",
    claro: "#000000",
    escuro: "#fafafa",
  },
  {
    nome: "sobre-acao",
    grupo: "Ação",
    papel: "o texto do botão primário",
    claro: "#ffffff",
    escuro: "#0a0a0a",
    medirSobre: "acao",
    minimo: 4.5,
  },
  {
    nome: "foco",
    grupo: "Ação",
    papel: "o anel de foco, reatribuível por superfície",
    claro: "#a83c1e",
    escuro: "#f4693e",
    medirSobre: "papel",
    minimo: 3.0,
  },

  {
    nome: "foco-tinta",
    grupo: "Ação",
    papel: "o anel de foco quando ele cai sobre a superfície de tinta",
    claro: "#f4693e",
    escuro: "#a83c1e",
    medirSobre: "tinta",
    minimo: 3.0,
  },

  {
    nome: "pigmento",
    grupo: "Marca",
    papel: "o laranja vivo da marca: preenche e marca, nunca escreve",
    claro: "#f4693e",
    escuro: "#f4693e",
    medirSobre: "papel",
    minimo: 3.0,
    fixo: "é a cor da marca, não uma superfície: não muda entre os temas",
  },
  {
    nome: "sobre-pigmento",
    grupo: "Marca",
    papel: "o texto sobre o pigmento. Quase-preto, porque branco reprovaria",
    claro: "#180a05",
    escuro: "#180a05",
    medirSobre: "pigmento",
    minimo: 4.5,
    fixo: "o fundo dele não muda, então redeclarar quebraria o par medido",
  },
  {
    nome: "brasa",
    grupo: "Marca",
    papel: "o laranja profundo da pintura. Este é o que carrega texto",
    claro: "#a83c1e",
    escuro: "#e8724a",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "mare",
    grupo: "Marca",
    papel: "o azul-petróleo da pintura, usado em texto",
    claro: "#2c627e",
    escuro: "#8ab8d2",
    medirSobre: "papel",
    minimo: 4.5,
  },

  {
    nome: "alta",
    grupo: "Dados",
    papel: "a variação positiva",
    claro: "#187056",
    escuro: "#3fbc8d",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "sobre-alta",
    grupo: "Dados",
    papel: "o texto sobre o verde cheio",
    claro: "#ffffff",
    escuro: "#062318",
    medirSobre: "alta",
    minimo: 4.5,
  },
  {
    nome: "queda",
    grupo: "Dados",
    papel: "a variação negativa, e o destructive do kit",
    claro: "#b43c3a",
    escuro: "#f0736c",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "sobre-queda",
    grupo: "Dados",
    papel: "o texto sobre o vermelho cheio",
    claro: "#ffffff",
    escuro: "#2a0806",
    medirSobre: "queda",
    minimo: 4.5,
  },
  {
    nome: "aviso",
    grupo: "Dados",
    papel: "o amarelo do tile de atenção",
    claro: "#fce878",
    escuro: "#fce878",
    fixo: "é pigmento, igual ao laranja: não muda entre os temas",
  },
  {
    nome: "sobre-aviso",
    grupo: "Dados",
    papel: "o texto sobre o amarelo",
    claro: "#241a00",
    escuro: "#241a00",
    medirSobre: "aviso",
    minimo: 4.5,
    fixo: "o fundo dele não muda, então redeclarar quebraria o par medido",
  },
  {
    nome: "ametista",
    grupo: "Dados",
    papel: "a primeira série de gráfico, forte o bastante pra virar legenda",
    claro: "#7f50ae",
    escuro: "#ac86d8",
    medirSobre: "papel",
    minimo: 4.5,
  },
  {
    nome: "lagoa",
    grupo: "Dados",
    papel: "a segunda série de gráfico: área, nunca texto",
    claro: "#3c9ea5",
    escuro: "#5fd0d8",
    medirSobre: "papel",
    minimo: 3.0,
  },

  {
    nome: "capa-quente",
    grupo: "A pintura",
    papel: "o vermelhão do corpo da pintura",
    claro: "#a83c1e",
    escuro: "#a83c1e",
    fixo: "a capa é um quadro, não superfície de interface",
  },
  {
    nome: "capa-viva",
    grupo: "A pintura",
    papel: "o laranja aceso dos respingos, o ponto mais claro da pintura",
    claro: "#f4693e",
    escuro: "#f4693e",
    fixo: "a capa é um quadro, não superfície de interface",
  },
  {
    nome: "capa-fria",
    grupo: "A pintura",
    papel: "o petróleo dos riscos frios",
    claro: "#2c627e",
    escuro: "#2c627e",
    fixo: "a capa é um quadro, não superfície de interface",
  },
  {
    nome: "sobre-capa",
    grupo: "A pintura",
    papel: "o texto sobre a pintura velada",
    claro: "#ffffff",
    escuro: "#ffffff",
    fixo: "a pintura embaixo não muda, então este par também não",
  },
];

export const GRUPOS: Grupo[] = [
  "Superfícies",
  "Texto",
  "Linhas",
  "Ação",
  "Marca",
  "Dados",
  "A pintura",
];

/** Mapa nome -> hex, por tema. Usado pelo script e pela story. */
export function paleta(tema: "claro" | "escuro"): Record<string, string> {
  return Object.fromEntries(TOKENS.map((t) => [t.nome, t[tema]]));
}

/**
 * Compostos: tinta translúcida já misturada com a superfície de baixo.
 * `alfa` é a fração que o utilitário do Tailwind aplica (queda/12 -> 0.12).
 */
export const COMPOSTOS = [
  {
    tinta: "queda",
    alfa: 0.1,
    base: "papel",
    frente: "queda",
    minimo: 4.5,
    papel: "o texto do botão destructive do shadcn, dentro do próprio fundo",
  },
  {
    tinta: "alta",
    alfa: 0.12,
    base: "papel",
    frente: "alta",
    minimo: 4.5,
    papel: "o chip de variação positiva",
  },
  {
    tinta: "queda",
    alfa: 0.12,
    base: "papel",
    frente: "queda",
    minimo: 4.5,
    papel: "o chip de variação negativa",
  },
  {
    tinta: "ametista",
    alfa: 0.14,
    base: "papel",
    frente: "ametista",
    minimo: 4.5,
    papel: "o chip de legenda do gráfico",
  },
  {
    tinta: "aviso",
    alfa: 0.35,
    base: "papel",
    frente: "texto",
    minimo: 4.5,
    papel: "o halo do tile de aviso",
  },
] as const;

/**
 * Cadeias: a pintura tem duas camadas antes do texto. Medir só a de cima
 * mente, porque quem decide a legibilidade é o pior ponto da pintura embaixo.
 * Aqui o véu entra em preto literal e o vidro em branco literal, de propósito:
 * a capa é fixa nos dois temas, e usar --tinta faria o véu CLAREAR a pintura
 * no escuro em vez de escurecê-la.
 */
export const CADEIAS = [
  {
    base: "capa-viva",
    camadas: [["#000000", 0.38]],
    frente: "sobre-capa",
    minimo: 4.5,
    papel: "texto branco sobre o ponto mais claro da pintura",
  },
  {
    base: "capa-viva",
    camadas: [
      ["#000000", 0.38],
      ["#ffffff", 0.12],
    ],
    frente: "sobre-capa",
    minimo: 4.5,
    papel: "a faixa de métricas sobre o ponto mais claro da pintura",
  },
  {
    base: "capa-quente",
    camadas: [
      ["#000000", 0.38],
      ["#ffffff", 0.12],
    ],
    frente: "sobre-capa",
    minimo: 4.5,
    papel: "a faixa de métricas sobre o corpo quente da pintura",
  },
  {
    base: "capa-fria",
    camadas: [
      ["#000000", 0.38],
      ["#ffffff", 0.12],
    ],
    frente: "sobre-capa",
    minimo: 4.5,
    papel: "a faixa de métricas sobre o risco frio da pintura",
  },
] as const;

/** Pares extras que os TOKENS sozinhos não cobrem (mesma cor, outro fundo). */
export const PARES_EXTRA = [
  { frente: "texto", fundo: "mesa", minimo: 4.5, papel: "texto na página" },
  {
    frente: "texto-suave",
    fundo: "mesa",
    minimo: 4.5,
    papel: "texto secundário na página",
  },
  {
    frente: "texto-tenue",
    fundo: "mesa",
    minimo: 4.5,
    papel: "rótulo maiúsculo na página",
  },
  {
    frente: "texto-tenue",
    fundo: "papel-fundo",
    minimo: 4.5,
    papel: "rótulo na superfície recuada",
  },
  {
    frente: "linha-campo",
    fundo: "mesa",
    minimo: 3.0,
    papel: "borda de campo na página",
  },
  { frente: "brasa", fundo: "mesa", minimo: 4.5, papel: "laranja na página" },
  { frente: "alta", fundo: "mesa", minimo: 4.5, papel: "verde na página" },
  { frente: "queda", fundo: "mesa", minimo: 4.5, papel: "vermelho na página" },
  { frente: "foco", fundo: "mesa", minimo: 3.0, papel: "anel de foco na página" },
  {
    frente: "capa-quente",
    fundo: "aviso",
    minimo: 3.0,
    papel: "a linha de pulso dentro do tile amarelo",
  },
] as const;
