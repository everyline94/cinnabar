import * as React from "react";

import { cn } from "@/lib/utils";
import { contraste, formatarContraste } from "@/lib/contraste";
import { GRUPOS, TOKENS, paleta } from "@/lib/paleta";

/**
 * A paleta, com o contraste medido impresso na tela.
 *
 * Este arquivo NAO e uma story: e o conteudo que a story de Fundacao/Paleta e
 * a vitrine importam. Duas listas de token escritas a mao divergem em uma
 * semana, entao existe uma so, e ela vem de lib/paleta.ts, o mesmo arquivo que
 * o `npm run tokens` usa pra reprovar o build.
 *
 * Os dois numeros aparecem juntos (claro e escuro) de proposito. Imprimir so o
 * do tema atual esconde justamente o caso que costuma quebrar: o token que
 * passa num tema e reprova no outro.
 */

const CLARO = paleta("claro");
const ESCURO = paleta("escuro");

type PaletaConteudoProps = React.ComponentProps<"div"> & {
  /** A vitrine ja tem o proprio h2, entao ela esconde este. */
  esconderCabecalho?: boolean;
};

function PaletaConteudo({
  esconderCabecalho = false,
  className,
  ...props
}: PaletaConteudoProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      {esconderCabecalho ? null : (
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 font-semibold tracking-tight">Paleta</h2>
          <p className="text-lede text-texto-suave">
            Cada token é nomeado pelo papel que cumpre, nunca pela cor que tem.
            O contraste ao lado foi medido por script, não estimado.
          </p>
        </div>
      )}

      {GRUPOS.map((grupo) => (
        <section key={grupo} className="flex flex-col gap-4">
          <h3 className="text-rotulo text-texto-tenue uppercase">{grupo}</h3>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TOKENS.filter((token) => token.grupo === grupo).map((token) => {
              const medido =
                token.medirSobre && token.minimo !== undefined
                  ? {
                      claro: contraste(
                        CLARO[token.nome],
                        CLARO[token.medirSobre]
                      ),
                      escuro: contraste(
                        ESCURO[token.nome],
                        ESCURO[token.medirSobre]
                      ),
                    }
                  : null;

              return (
                <li
                  key={token.nome}
                  className="flex gap-3.5 rounded-lg bg-papel p-4 shadow-papel"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 size-10 shrink-0 rounded-md border border-linha"
                    style={{ backgroundColor: `var(--${token.nome})` }}
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <code className="font-mono text-ui font-medium tracking-normal">
                      --{token.nome}
                    </code>
                    <p className="text-ui text-texto-suave">{token.papel}</p>
                    <p className="font-mono text-rotulo tracking-normal text-texto-tenue tabular-nums">
                      {CLARO[token.nome]}
                      {token.claro === token.escuro
                        ? " nos dois temas"
                        : ` / ${ESCURO[token.nome]}`}
                    </p>
                    {medido ? (
                      <p className="text-rotulo text-texto-tenue">
                        sobre{" "}
                        <code className="font-mono tracking-normal">
                          --{token.medirSobre}
                        </code>
                        :{" "}
                        <span
                          className={cn(
                            "font-mono tabular-nums",
                            medido.claro >= token.minimo!
                              ? "text-alta"
                              : "text-queda"
                          )}
                        >
                          {formatarContraste(medido.claro)}
                        </span>{" "}
                        no claro,{" "}
                        <span
                          className={cn(
                            "font-mono tabular-nums",
                            medido.escuro >= token.minimo!
                              ? "text-alta"
                              : "text-queda"
                          )}
                        >
                          {formatarContraste(medido.escuro)}
                        </span>{" "}
                        no escuro. Mínimo {token.minimo!.toFixed(1)}.
                      </p>
                    ) : null}
                    {token.fixo ? (
                      <p className="text-rotulo text-texto-tenue normal-case">
                        Fixo: {token.fixo}.
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export { PaletaConteudo };
