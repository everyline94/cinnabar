import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A escala tipografica, nomeada pelo papel.
 *
 * Cada degrau carrega line-height e letter-spacing junto: tamanho sem
 * entrelinha nao e um degrau, e uma sugestao. Os valores vivem no
 * styles/tokens.css, dentro do primeiro @theme inline.
 *
 * Igual a paleta, este arquivo e conteudo, nao story: o catalogo e a vitrine
 * importam o mesmo componente.
 */

const DEGRAUS = [
  {
    classe: "text-display",
    nome: "display",
    papel: "o título de abertura, uma vez por página",
    amostra: "Tinta preta, papel branco",
  },
  {
    classe: "text-h2",
    nome: "h2",
    papel: "o título de seção",
    amostra: "A cor toda mora na pintura",
  },
  {
    classe: "text-h3",
    nome: "h3",
    papel: "o título de cartão e de bloco",
    amostra: "Fluxo de caixa deste mês",
  },
  {
    classe: "text-lede",
    nome: "lede",
    papel: "o parágrafo de abertura e a descrição forte",
    amostra:
      "O neutro é absoluto de propósito: é ele que faz o vermelhão saltar da página.",
  },
  {
    classe: "text-corpo",
    nome: "corpo",
    papel: "o texto corrido",
    amostra:
      "As entradas e saídas dos últimos noventa dias, já descontadas as transferências entre contas próprias, e considerando apenas as contas marcadas como operacionais.",
  },
  {
    classe: "text-ui",
    nome: "ui",
    papel: "o rótulo de controle, a linha de lista, o botão",
    amostra: "Silicon Valley Bank",
  },
  {
    classe: "text-rotulo",
    nome: "rotulo",
    papel: "o rótulo miúdo em maiúscula, sobre número",
    amostra: "SALDO TOTAL",
  },
];

type TipografiaConteudoProps = React.ComponentProps<"div"> & {
  esconderCabecalho?: boolean;
};

function TipografiaConteudo({
  esconderCabecalho = false,
  className,
  ...props
}: TipografiaConteudoProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      {esconderCabecalho ? null : (
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 font-semibold tracking-tight">Tipografia</h2>
          <p className="text-lede text-texto-suave">
            Instrument Sans no texto e Geist Mono no número. A escala é nomeada
            pelo papel, não pelo tamanho, e cada degrau já traz entrelinha e
            espacejamento.
          </p>
        </div>
      )}

      <dl className="flex flex-col divide-y divide-linha">
        {DEGRAUS.map((degrau) => (
          <div
            key={degrau.nome}
            className="grid gap-3 py-7 lg:grid-cols-[200px_1fr] lg:gap-8"
          >
            <dt className="flex flex-col gap-1">
              <code className="font-mono text-ui font-medium tracking-normal">
                {degrau.classe}
              </code>
              <span className="text-ui text-texto-suave">{degrau.papel}</span>
            </dt>
            <dd
              className={cn(
                degrau.classe,
                degrau.nome === "rotulo" && "text-texto-tenue uppercase",
                ["display", "h2", "h3"].includes(degrau.nome) &&
                  "font-semibold tracking-tight"
              )}
            >
              {degrau.amostra}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-4 rounded-lg bg-papel p-6 shadow-papel">
        <h3 className="text-h3 font-semibold tracking-tight">
          O número tem tipo próprio
        </h3>
        <p className="text-corpo text-texto-suave">
          Todo valor monetário sai em Geist Mono com largura de dígito fixa. Uma
          coluna de valores que dança a cada atualização é o jeito mais rápido
          de fazer um painel parecer quebrado.
        </p>
        <p className="font-mono text-h2 font-semibold tabular-nums">
          R$ 1.230.340
          <span className="text-h3 text-texto-tenue">,69</span>
        </p>
      </div>
    </div>
  );
}

export { TipografiaConteudo };
