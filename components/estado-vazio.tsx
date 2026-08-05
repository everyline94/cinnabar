import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * O estado vazio.
 *
 * Tela sem dado e tela de verdade: ela ganha o mesmo papel, o mesmo raio e a
 * mesma sombra que a tela cheia. O que muda e a densidade, nao a superficie.
 *
 * A descricao corre a largura util do bloco. Quem quiser coluna mais curta
 * poe teto EM PX no proprio EstadoVazio, que e largura de layout. Cap de
 * medida em ch colado no paragrafo espreme o texto a esquerda e abre vao a
 * direita, que e o problema, nao a solucao.
 */

type EstadoVazioProps = React.ComponentProps<"div"> & {
  icone?: React.ReactNode;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  acoes?: React.ReactNode;
};

function EstadoVazio({
  icone,
  titulo,
  descricao,
  acoes,
  className,
  ...props
}: EstadoVazioProps) {
  return (
    <div
      data-slot="estado-vazio"
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg bg-papel px-6 py-14 text-center shadow-papel",
        className
      )}
      {...props}
    >
      {icone ? (
        <span
          aria-hidden
          className="mb-1 flex size-11 items-center justify-center rounded-md bg-papel-fundo text-texto-tenue [&_svg]:size-5"
        >
          {icone}
        </span>
      ) : null}
      <h3 className="text-lede font-semibold tracking-tight">{titulo}</h3>
      {descricao ? (
        <p className="text-corpo text-texto-suave">{descricao}</p>
      ) : null}
      {acoes ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {acoes}
        </div>
      ) : null}
    </div>
  );
}

export { EstadoVazio };
