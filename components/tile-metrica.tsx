import * as React from "react";

import { cn } from "@/lib/utils";
import { ChipVariacao } from "@/components/chip-variacao";

/**
 * O tile de metrica: a mesma anatomia da faixa da capa, so que em papel.
 *
 * Rotulo miudo em maiuscula, numero grande em mono com a fracao mais leve, e o
 * chip de variacao embaixo. Serve pra quando o numero precisa sair da capa e
 * viver dentro do conteudo.
 */

type TileMetricaProps = React.ComponentProps<"div"> & {
  rotulo: string;
  valor: string;
  fracao?: string;
  variacao?: number;
  nota?: React.ReactNode;
};

function TileMetrica({
  rotulo,
  valor,
  fracao,
  variacao,
  nota,
  className,
  ...props
}: TileMetricaProps) {
  return (
    <div
      data-slot="tile-metrica"
      className={cn(
        "flex flex-col gap-2.5 rounded-lg bg-papel p-5 shadow-papel",
        className
      )}
      {...props}
    >
      <p className="text-rotulo text-texto-tenue uppercase">{rotulo}</p>
      <p className="font-mono text-h3 leading-none font-semibold tracking-[-0.045em] tabular-nums">
        {valor}
        {fracao ? (
          <span className="text-lede text-texto-tenue">{fracao}</span>
        ) : null}
      </p>
      {variacao !== undefined || nota ? (
        <div className="flex flex-wrap items-center gap-2">
          {variacao !== undefined ? <ChipVariacao valor={variacao} /> : null}
          {nota ? (
            <span className="text-ui text-texto-suave">{nota}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { TileMetrica };
