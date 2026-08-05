/**
 * Contraste WCAG 2.x por luminancia relativa.
 *
 * Vive aqui, e nao dentro do script, porque tres lugares precisam do mesmo
 * numero: o `npm run tokens` que reprova o build, a story da paleta que
 * imprime o valor na tela, e a vitrine. Duas implementacoes divergem em uma
 * semana e uma delas passa a mentir.
 */

export function paraRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

export function luminancia(hex: string): number {
  const [r, g, b] = paraRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a: string, b: string): number {
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Compoe uma tinta translucida sobre um fundo opaco.
 *
 * Sem isto, medir algo como `destructive/10` e ficcao: quem le a tela enxerga
 * a MISTURA, nao a tinta. Foi assim que quatro dos seis erros da primeira
 * rodada apareceram.
 */
export function compor(frente: string, alfa: number, fundo: string): string {
  const f = paraRgb(frente);
  const t = paraRgb(fundo);
  return (
    "#" +
    f
      .map((v, i) => Math.round(v * alfa + t[i] * (1 - alfa)))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Formata pro jeito que a gente le em revisao: "6.31:1". */
export function formatarContraste(valor: number): string {
  return `${valor.toFixed(2)}:1`;
}
