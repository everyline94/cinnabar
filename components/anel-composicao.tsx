import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * O anel de composicao: o donut da referencia.
 *
 * Duas decisoes que nao sao estetica:
 *
 * 1. Os gomos sao separados por um fio de --papel. --ametista e --lagoa ficam
 *    a 1.8:1 um do outro, entao cor sozinha nao distingue gomo vizinho. O fio
 *    resolve, e e o que a referencia faz.
 * 2. Cada fatia aparece tambem na legenda, escrita. Cor nunca e a unica forma
 *    de ler o dado (WCAG 1.4.1). O anel em si e aria-hidden, e quem carrega o
 *    numero pra tecnologia assistiva e a lista.
 */

export type Fatia = {
  /** ASCII, porque vira key. */
  id: string;
  rotulo: string;
  valor: number;
  /** Um token da marca, nao um hex solto. */
  tinta: string;
};

type AnelComposicaoProps = React.ComponentProps<"div"> & {
  fatias: Fatia[];
  /** O que fica escrito no buraco do anel. */
  centro?: React.ReactNode;
  espessura?: number;
};

function AnelComposicao({
  fatias,
  centro,
  espessura = 18,
  className,
  ...props
}: AnelComposicaoProps) {
  const total = fatias.reduce((soma, fatia) => soma + fatia.valor, 0) || 1;
  const raio = 50 - espessura / 2;
  const perimetro = 2 * Math.PI * raio;
  // O fio de separacao, em unidades de perimetro.
  const respiro = 1.6;

  let acumulado = 0;

  return (
    <div
      data-slot="anel-composicao"
      className={cn("relative aspect-square w-full max-w-56", className)}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        {fatias.map((fatia) => {
          const trecho = (fatia.valor / total) * perimetro;
          const deslocamento = -acumulado;
          acumulado += trecho;
          return (
            <circle
              key={fatia.id}
              cx="50"
              cy="50"
              r={raio}
              fill="none"
              stroke={fatia.tinta}
              strokeWidth={espessura}
              strokeDasharray={`${Math.max(trecho - respiro, 0.5)} ${perimetro}`}
              strokeDashoffset={deslocamento}
            />
          );
        })}
      </svg>
      {centro ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-center">
          {centro}
        </div>
      ) : null}
    </div>
  );
}

type LegendaComposicaoProps = React.ComponentProps<"dl"> & {
  fatias: Fatia[];
  formatar?: (valor: number) => string;
};

function LegendaComposicao({
  fatias,
  formatar = (valor) => valor.toLocaleString("pt-BR"),
  className,
  ...props
}: LegendaComposicaoProps) {
  return (
    // Dentro de uma dl so entram dt, dd e div. O quadradinho de cor mora
    // DENTRO do dt, nunca solto num wrapper irmao.
    <dl
      data-slot="legenda-composicao"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {fatias.map((fatia) => (
        <div key={fatia.id} className="flex items-center justify-between gap-4">
          <dt className="flex items-center gap-2 text-rotulo text-texto-tenue uppercase">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: fatia.tinta }}
            />
            {fatia.rotulo}
          </dt>
          <dd className="font-mono text-ui font-semibold tabular-nums">
            {formatar(fatia.valor)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { AnelComposicao, LegendaComposicao };
