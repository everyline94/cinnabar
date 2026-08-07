import * as React from "react";

import { cn } from "@/lib/utils";
import { ChipVariacao } from "@/components/chip-variacao";

/**
 * A linha de conta: a parte DENSA do sistema.
 *
 * O cartao e arejado; a lista dentro dele nao. Cada linha tem altura curta,
 * divisoria fina, quadrado colorido a esquerda, numero mascarado embaixo do
 * nome e valor em mono alinhado a direita. Um sistema que so sabe respirar nao
 * aguenta tabela, e um que so sabe apertar cansa. Este componente e o lado
 * denso.
 *
 * Nada de dado nem de fetch aqui dentro: a lista inteira entra por prop.
 */

export type Conta = {
  /** ASCII, porque vira key. */
  id: string;
  nome: string;
  /** Os quatro digitos finais, ja mascarados por quem chama. */
  final: string;
  valor: string;
  valorAnterior?: string;
  variacao?: number;
  /** A cor do quadrado. Um token da marca, nao um hex solto. */
  tinta?: string;
  icone?: React.ReactNode;
};

type LinhaContaProps = React.ComponentProps<"li"> & {
  conta: Conta;
};

function LinhaConta({ conta, className, ...props }: LinhaContaProps) {
  return (
    <li
      data-slot="linha-conta"
      className={cn(
        "flex items-center gap-3.5 py-3.5 not-last:border-b not-last:border-linha",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-sobre-capa"
        style={{ backgroundColor: conta.tinta ?? "var(--pigmento)" }}
      >
        {conta.icone}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-ui font-medium">{conta.nome}</span>
        <span className="font-mono text-rotulo tracking-normal text-texto-tenue tabular-nums">
          {conta.final}
        </span>
      </span>
      <span className="ml-auto flex flex-col items-end gap-1">
        <span className="font-mono text-ui font-semibold tabular-nums">
          {conta.valor}
        </span>
        <span className="flex items-center gap-1.5">
          {conta.valorAnterior ? (
            <span className="font-mono text-rotulo tracking-normal text-texto-tenue tabular-nums">
              {conta.valorAnterior}
            </span>
          ) : null}
          {conta.variacao !== undefined ? (
            <ChipVariacao valor={conta.variacao} />
          ) : null}
        </span>
      </span>
    </li>
  );
}

type ListaContasProps = React.ComponentProps<"ul"> & {
  contas: Conta[];
};

function ListaContas({ contas, className, ...props }: ListaContasProps) {
  return (
    <ul
      data-slot="lista-contas"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {contas.map((conta) => (
        <LinhaConta key={conta.id} conta={conta} />
      ))}
    </ul>
  );
}

export { LinhaConta, ListaContas };
