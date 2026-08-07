import * as React from "react";

import { cn } from "@/lib/utils";
import { ChipVariacao } from "@/components/chip-variacao";

/**
 * A regua de metricas em vidro sobre a capa pintada.
 *
 * O segundo motivo forte do sistema: uma faixa translucida atravessando o
 * cabecalho, com rotulo miudo em maiuscula, valor grande em mono e o chip de
 * variacao embaixo.
 *
 * O detalhe que muda tudo esta na fracao: os centavos entram menores e mais
 * apagados que os inteiros, entao o olho pega a ordem de grandeza primeiro.
 * Por isso `fracao` e uma prop separada de `valor`, e nao um pedaco da
 * string.
 *
 * O vidro e branco a 12% sobre o veu da capa: 5.21:1 no pior ponto da pintura.
 */

export type Metrica = {
  /** ASCII, porque vira key e ancora. */
  id: string;
  rotulo: string;
  valor: string;
  /** Os centavos, ou qualquer sufixo que deva pesar menos. */
  fracao?: string;
  variacao?: number;
};

type FaixaMetricasProps = React.ComponentProps<"dl"> & {
  metricas: Metrica[];
};

function FaixaMetricas({ metricas, className, ...props }: FaixaMetricasProps) {
  return (
    // Dentro de uma dl so valem dt, dd e div como filhos: por isso cada metrica
    // e um div, e nao um wrapper qualquer com icone solto dentro.
    <dl
      data-slot="faixa-metricas"
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[color-mix(in_oklab,var(--sobre-capa)_22%,transparent)] bg-[color-mix(in_oklab,var(--sobre-capa)_12%,transparent)] backdrop-blur-md sm:grid-cols-3 lg:grid-cols-5",
        className
      )}
      {...props}
    >
      {metricas.map((metrica) => (
        <div
          key={metrica.id}
          className="flex flex-col gap-2 border-[color-mix(in_oklab,var(--sobre-capa)_16%,transparent)] px-4 py-3.5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l"
        >
          <dt className="text-rotulo text-sobre-capa/85 uppercase">
            {metrica.rotulo}
          </dt>
          <dd className="flex flex-col items-start gap-2">
            <span className="font-mono text-h3 leading-none font-semibold tracking-[-0.045em] tabular-nums">
              {metrica.valor}
              {metrica.fracao ? (
                <span className="text-lede text-sobre-capa/65">
                  {metrica.fracao}
                </span>
              ) : null}
            </span>
            {metrica.variacao !== undefined ? (
              <ChipVariacao valor={metrica.variacao} sobre="capa" />
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { FaixaMetricas };
