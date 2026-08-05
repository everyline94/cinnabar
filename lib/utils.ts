import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * O tailwind-merge nao conhece a escala tipografica nomeada do Cinnabar.
 *
 * Sem este registro ele classifica `text-corpo` como COR (porque `text-*` e
 * ambiguo) e descarta a cor de verdade que veio antes, sem erro nenhum:
 *
 *   cn("text-sobre-acao", "text-corpo")  ->  "text-corpo"
 *
 * O resultado e um botao preto com texto preto que passa em toda revisao de
 * codigo, porque o bug nao esta no que voce escreveu e sim no que foi jogado
 * fora. Registrar os degraus em `font-size` e o que faz o merge entender que
 * `text-corpo` e tamanho e deixar a cor em paz.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["rotulo", "ui", "corpo", "lede", "h3", "h2", "display"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
