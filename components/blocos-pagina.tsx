import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Os blocos de pagina: container, cabecalho e secao.
 *
 * A medida de leitura entra em PX e trava a COLUNA, nunca o paragrafo. A
 * diferenca importa: a coluna pode e deve ter teto e ficar centralizada, e o
 * texto corre 100% dela. Cap em `ch` colado no paragrafo dentro de uma coluna
 * larga espreme o texto a esquerda e abre vao a direita, que e exatamente o
 * problema que se tenta resolver.
 */

type ContainerPaginaProps = React.ComponentProps<"div"> & {
  /** larga: painel e grade. media: leitura corrida. estreita: formulario. */
  medida?: "larga" | "media" | "estreita";
};

const medidas = {
  larga: "max-w-[1240px]",
  media: "max-w-[860px]",
  estreita: "max-w-[560px]",
} as const;

function ContainerPagina({
  medida = "larga",
  className,
  ...props
}: ContainerPaginaProps) {
  return (
    <div
      data-slot="container-pagina"
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        medidas[medida],
        className
      )}
      {...props}
    />
  );
}

type CabecalhoPaginaProps = React.ComponentProps<"header"> & {
  /** O rotulo miudo em maiuscula acima do titulo. */
  sobretitulo?: React.ReactNode;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  acoes?: React.ReactNode;
  /** Sobe um nivel quando o cabecalho nao e o titulo da pagina. */
  nivel?: 1 | 2;
};

function CabecalhoPagina({
  sobretitulo,
  titulo,
  descricao,
  acoes,
  nivel = 1,
  className,
  ...props
}: CabecalhoPaginaProps) {
  const Titulo = nivel === 1 ? "h1" : "h2";
  return (
    <header
      data-slot="cabecalho-pagina"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {sobretitulo ? (
          <p className="text-rotulo text-texto-tenue uppercase">
            {sobretitulo}
          </p>
        ) : null}
        <Titulo
          className={cn(
            "font-semibold tracking-tight",
            nivel === 1 ? "text-h2" : "text-h3"
          )}
        >
          {titulo}
        </Titulo>
        {descricao ? (
          <p className="text-lede text-texto-suave">{descricao}</p>
        ) : null}
      </div>
      {acoes ? <div className="flex items-center gap-2">{acoes}</div> : null}
    </header>
  );
}

type SecaoProps = React.ComponentProps<"section"> & {
  titulo?: React.ReactNode;
  descricao?: React.ReactNode;
  acoes?: React.ReactNode;
};

function Secao({
  titulo,
  descricao,
  acoes,
  className,
  children,
  ...props
}: SecaoProps) {
  return (
    <section
      data-slot="secao"
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      {titulo || acoes ? (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex min-w-0 flex-col gap-1">
            {titulo ? (
              <h2 className="text-h3 font-semibold tracking-tight">{titulo}</h2>
            ) : null}
            {descricao ? (
              <p className="text-corpo text-texto-suave">{descricao}</p>
            ) : null}
          </div>
          {acoes ? <div className="flex items-center gap-2">{acoes}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export { CabecalhoPagina, ContainerPagina, Secao };
