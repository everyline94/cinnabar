import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A marca.
 *
 * Quadrado de tinta com os cantos arredondados, e dentro dele os dois
 * pigmentos da pintura: o vermelhao subindo do canto inferior esquerdo e o
 * petroleo descendo do superior direito. E o sistema inteiro reduzido a um
 * simbolo: preto absoluto com a tinta invadindo os cantos.
 *
 * O mesmo desenho vive em app/icon.svg e no favicon do catalogo. Se ele mudar
 * aqui, muda nos dois.
 */

type MarcaProps = React.ComponentProps<"span"> & {
  /** So o simbolo, sem o nome escrito ao lado. */
  simbolo?: boolean;
  tamanho?: "sm" | "md" | "lg";
};

const tamanhos = {
  sm: { caixa: "size-6", texto: "text-corpo" },
  md: { caixa: "size-8", texto: "text-lede" },
  lg: { caixa: "size-12", texto: "text-h3" },
} as const;

function Marca({
  simbolo = false,
  tamanho = "md",
  className,
  ...props
}: MarcaProps) {
  const escala = tamanhos[tamanho];
  // O id do clipPath precisa ser unico por instancia, senao duas marcas na
  // mesma pagina compartilham o recorte e a segunda aparece sem canto.
  const id = React.useId();

  return (
    <span
      data-slot="marca"
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(escala.caixa, "shrink-0")}
        role="img"
        aria-label={simbolo ? "Cinnabar" : undefined}
        aria-hidden={simbolo ? undefined : true}
      >
        <defs>
          <clipPath id={id}>
            <rect width="24" height="24" rx="7" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <rect width="24" height="24" fill="var(--tinta)" />
          <path d="M0 24 L15 24 A15 15 0 0 0 0 9 Z" fill="var(--pigmento)" />
          <path d="M24 0 L14 0 A10 10 0 0 0 24 10 Z" fill="var(--capa-fria)" />
        </g>
      </svg>
      {simbolo ? null : (
        <span
          className={cn(
            escala.texto,
            "font-semibold tracking-tight text-texto"
          )}
        >
          Cinnabar
        </span>
      )}
    </span>
  );
}

export { Marca };
