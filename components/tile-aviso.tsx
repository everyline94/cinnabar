import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * O tile de aviso: o quadrado amarelo com a linha de pulso.
 *
 * O amarelo e pigmento, igual ao laranja: NAO muda entre os temas, e por isso
 * --sobre-aviso tambem nao muda. O par continua 13.86:1 no claro e no escuro.
 *
 * A linha de pulso e desenhada, nao decorativa: ela repete visualmente o que o
 * texto ja diz. Por isso ela e aria-hidden e o aviso vive no texto.
 */

type TileAvisoProps = React.ComponentProps<"div"> & {
  rotulo: React.ReactNode;
  /** Some a linha de pulso quando o tile e so texto. */
  pulso?: boolean;
};

function TileAviso({
  rotulo,
  pulso = true,
  className,
  ...props
}: TileAvisoProps) {
  return (
    <div
      data-slot="tile-aviso"
      className={cn(
        "relative flex size-24 shrink-0 flex-col justify-end gap-1 overflow-hidden rounded-lg bg-aviso p-2.5 text-sobre-aviso shadow-tile",
        className
      )}
      {...props}
    >
      {pulso ? (
        <svg
          aria-hidden
          viewBox="0 0 96 40"
          className="absolute inset-x-0 top-1 h-10 w-full"
          fill="none"
        >
          <path
            d="M2 24 H20 L26 24 L31 9 L37 33 L43 17 L48 24 H68 L74 24 L79 15 L84 24 H94"
            // --capa-quente e nao --queda de proposito: o tile amarelo e fixo
            // nos dois temas, e --queda clareia no escuro (#f0736c daria 2.30:1
            // sobre o amarelo). A brasa da pintura, que tambem e fixa, da
            // 5.09:1 no claro e no escuro.
            stroke="var(--capa-quente)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      <span className="relative text-rotulo leading-tight font-semibold">
        {rotulo}
      </span>
    </div>
  );
}

export { TileAviso };
