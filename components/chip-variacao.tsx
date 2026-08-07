import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * O chip de variacao: seta mais porcentagem, em mono.
 *
 * Toda linha de valor do sistema carrega um destes. A cor NAO e a unica
 * informacao: a seta muda de direcao junto, senao quem nao distingue verde de
 * vermelho perde o dado (WCAG 1.4.1).
 *
 * Contraste medido: --alta da 5.07:1 dentro do proprio chip a 12% no claro e
 * 6.18:1 no escuro; --queda da 4.83:1 e 5.34:1. Medir a cor pura sobre papel
 * teria dado um numero maior e falso, porque ninguem le a cor pura: le ela
 * dentro do chip.
 */

type ChipVariacaoProps = React.ComponentProps<"span"> & {
  /** Positivo sobe, negativo cai. O sinal decide a seta e a cor. */
  valor: number;
  /** Sobre a pintura o chip vira vidro branco, porque alta e queda somem la. */
  sobre?: "papel" | "capa";
  formatar?: (valor: number) => string;
};

const padrao = (valor: number) =>
  `${Math.abs(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

function ChipVariacao({
  valor,
  sobre = "papel",
  formatar = padrao,
  className,
  ...props
}: ChipVariacaoProps) {
  const subiu = valor >= 0;
  const Seta = subiu ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      data-slot="chip-variacao"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-mono text-rotulo tabular-nums",
        sobre === "papel" &&
          (subiu
            ? "bg-alta/12 text-alta dark:bg-alta/12 dark:text-alta"
            : "bg-queda/12 text-queda dark:bg-queda/12 dark:text-queda"),
        // Sobre a capa nao existe tema: a pintura e a mesma nos dois. Por isso
        // o vidro e o texto entram fixos, sem par dark:.
        sobre === "capa" &&
          "bg-[color-mix(in_oklab,var(--sobre-capa)_18%,transparent)] text-sobre-capa",
        className
      )}
      {...props}
    >
      <Seta aria-hidden className="size-3" />
      <span className="sr-only">{subiu ? "alta de" : "queda de"} </span>
      {formatar(valor)}
    </span>
  );
}

export { ChipVariacao };
