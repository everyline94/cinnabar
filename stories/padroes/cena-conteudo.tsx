import * as React from "react";
import {
  Building2,
  CircleAlert,
  CreditCard,
  Landmark,
  Settings,
  Square,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnelComposicao, LegendaComposicao } from "@/components/anel-composicao";
import { BotaoAcao } from "@/components/botao-acao";
import { CapaPintada } from "@/components/capa-pintada";
import { ChipVariacao } from "@/components/chip-variacao";
import { FaixaMetricas, type Metrica } from "@/components/faixa-metricas";
import { ListaContas, type Conta } from "@/components/linha-conta";
import { TileAviso } from "@/components/tile-aviso";

/**
 * A cena: a referencia remontada com as pecas do sistema.
 *
 * E o unico teste que prova que os tokens seguram uma TELA inteira, e nao so
 * um componente isolado numa moldura. Componente isolado sempre parece bem.
 *
 * Este arquivo e conteudo compartilhado: a story de Padroes e a vitrine
 * importam o mesmo componente. E ele nao decide a propria moldura (nada de
 * min-h-dvh nem margem negativa aqui dentro): quem enquadra e quem chama, pela
 * className.
 *
 * Os dados sao inventados e entram por constante local, nunca por dentro dos
 * componentes do sistema.
 */

const METRICAS: Metrica[] = [
  { id: "saldo", rotulo: "Saldo total", valor: "R$ 1.230.340", fracao: ",69", variacao: 7.3 },
  { id: "ebitda", rotulo: "EBITDA", valor: "R$ 253.110", fracao: ",25", variacao: -5.3 },
  { id: "entrada", rotulo: "Entradas", valor: "R$ 455.770", fracao: ",88", variacao: 11.2 },
  { id: "saida", rotulo: "Saídas", valor: "-R$ 567.000", fracao: ",03", variacao: -1.3 },
  { id: "crescimento", rotulo: "Crescimento no mês", valor: "9,56%", variacao: 2.1 },
];

const CONTAS: Conta[] = [
  {
    id: "brex",
    nome: "Brex",
    final: "•••• 3472",
    valor: "R$ 150.311,94",
    valorAnterior: "R$ 50.981,29",
    variacao: 30.3,
    tinta: "var(--pigmento)",
    icone: <CreditCard className="size-4" />,
  },
  {
    id: "svb",
    nome: "Silicon Valley Bank",
    final: "•••• 2349",
    valor: "R$ 235.665,01",
    valorAnterior: "-R$ 1.983,55",
    variacao: -1.3,
    tinta: "var(--capa-fria)",
    icone: <Landmark className="size-4" />,
  },
  {
    id: "chase",
    nome: "Chase Bank",
    final: "•••• 9907",
    valor: "R$ 851.099,03",
    valorAnterior: "R$ 1.251.090,67",
    variacao: 56.3,
    tinta: "var(--mare)",
    icone: <Building2 className="size-4" />,
  },
  {
    id: "square",
    nome: "Square",
    final: "•••• 8976",
    valor: "R$ 9.085,03",
    valorAnterior: "R$ 2.530,08",
    variacao: 9.3,
    tinta: "var(--tinta)",
    icone: <Square className="size-4" />,
  },
];

const FATIAS = [
  { id: "novos", rotulo: "Novos", valor: 14833, tinta: "var(--ametista)" },
  { id: "pagantes", rotulo: "Pagantes", valor: 9204, tinta: "var(--lagoa)" },
  { id: "dormentes", rotulo: "Dormentes", valor: 3117, tinta: "var(--brasa)" },
];

const ATALHOS = [
  {
    id: "paypal",
    rotulo: "Atalho",
    titulo: "Transferir para o meu cartão pessoal",
    campo: "R$ 2.000,00",
  },
  {
    id: "virtual",
    rotulo: "Atalho",
    titulo: "Criar um cartão virtual para fornecedor",
    campo: "",
  },
];

type CenaConteudoProps = React.ComponentProps<"div"> & {
  /** A vitrine ja tem o proprio h1, entao a cena desce pra h2. */
  nivelTitulo?: 1 | 2;
};

function CenaConteudo({
  nivelTitulo = 1,
  className,
  ...props
}: CenaConteudoProps) {
  const Titulo = nivelTitulo === 1 ? "h1" : "h2";

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <CapaPintada className="flex flex-col justify-between gap-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-5">
            <Titulo className="text-h2 font-semibold tracking-tight">
              Visão geral{" "}
              <span className="text-sobre-capa/70">deste mês</span>
            </Titulo>
            <Tabs defaultValue="principal">
              <TabsList
                variant="line"
                className="text-sobre-capa/70 [&_[data-slot=tabs-trigger]]:text-sobre-capa/70 [&_[data-slot=tabs-trigger]]:after:bg-sobre-capa [&_[data-slot=tabs-trigger][data-active]]:text-sobre-capa"
              >
                <TabsTrigger value="principal">Principal</TabsTrigger>
                <TabsTrigger value="unidade">Unidade</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="investidores">Investidores</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[color-mix(in_oklab,var(--sobre-capa)_45%,transparent)] bg-[color-mix(in_oklab,var(--sobre-capa)_14%,transparent)] text-sobre-capa hover:bg-[color-mix(in_oklab,var(--sobre-capa)_24%,transparent)] hover:text-sobre-capa dark:border-[color-mix(in_oklab,var(--sobre-capa)_45%,transparent)] dark:bg-[color-mix(in_oklab,var(--sobre-capa)_14%,transparent)] dark:hover:bg-[color-mix(in_oklab,var(--sobre-capa)_24%,transparent)]"
          >
            <Settings data-icon="inline-start" />
            Gerenciar espaço
          </Button>
        </div>
        <FaixaMetricas metricas={METRICAS} />
      </CapaPintada>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Contas
              <Badge variant="secondary" className="font-mono">
                {CONTAS.length}
              </Badge>
            </CardTitle>
            <div className="col-start-2 row-start-1 justify-self-end">
              <Button variant="outline" size="sm">
                <Settings data-icon="inline-start" />
                Gerenciar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ListaContas contas={CONTAS} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de caixa</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <dl className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ui text-texto-suave">
                    Entradas{" "}
                    <span className="font-mono text-rotulo tracking-normal text-texto-tenue">
                      2
                    </span>
                  </dt>
                  <dd className="font-mono text-ui font-semibold text-alta tabular-nums">
                    R$ 552.230
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ui text-texto-suave">
                    Saídas{" "}
                    <span className="font-mono text-rotulo tracking-normal text-texto-tenue">
                      11
                    </span>
                  </dt>
                  <dd className="font-mono text-ui font-semibold tabular-nums">
                    -R$ 200.340
                  </dd>
                </div>
              </dl>

              <p className="flex items-center gap-2 rounded-md bg-queda/10 px-3 py-2 text-ui text-queda dark:bg-queda/10 dark:text-queda">
                <CircleAlert aria-hidden className="size-4 shrink-0" />
                Risco de vão de caixa em 25 de março
              </p>

              <div className="flex flex-col gap-3 rounded-md bg-papel-fundo p-4">
                <p className="text-rotulo text-texto-tenue uppercase">
                  Saldo total previsto
                </p>
                <p className="font-mono text-h3 font-semibold tabular-nums">
                  R$ 1.426.230
                  <span className="text-lede text-texto-tenue">,54</span>
                </p>
                <BotaoAcao contagem={13} className="w-full">
                  Ver todos
                </BotaoAcao>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-rotulo text-texto-tenue uppercase">
                  <span className="mr-1.5 font-mono text-h3 leading-none font-semibold text-texto">
                    9
                  </span>
                  meses de fôlego
                </p>
                <p className="text-ui text-texto-suave">
                  O fôlego ideal fica entre doze e dezoito meses.
                </p>
              </div>
              <TileAviso rotulo={<>Caixa zera em abr 2023</>} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card className="bg-tinta text-sobre-tinta" data-superficie="tinta">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-sobre-tinta">
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sobre-tinta/15"
                >
                  <CreditCard className="size-4" />
                </span>
                Transferir fundos
              </CardTitle>
            </CardHeader>
          </Card>

          {ATALHOS.map((atalho) => (
            <Card key={atalho.id} size="sm">
              <CardContent className="flex flex-col gap-3">
                <p className="text-rotulo text-texto-tenue uppercase">
                  {atalho.rotulo}
                </p>
                <p className="text-ui font-semibold">{atalho.titulo}</p>
                <div className="flex items-center gap-2">
                  {/* id em ASCII: htmlFor nao casa com acento nem espaco. */}
                  <label htmlFor={`atalho-${atalho.id}`} className="sr-only">
                    Valor para {atalho.titulo}
                  </label>
                  <Input
                    id={`atalho-${atalho.id}`}
                    defaultValue={atalho.campo}
                    placeholder="Informe o limite"
                    className="font-mono"
                  />
                  <BotaoAcao
                    size="icon"
                    seta
                    aria-label={`Confirmar: ${atalho.titulo}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Composição de usuários</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
              <AnelComposicao
                fatias={FATIAS}
                className="max-w-40"
                centro={
                  <>
                    <span className="font-mono text-lede font-semibold tabular-nums">
                      27.154
                    </span>
                    <span className="text-rotulo text-texto-tenue uppercase">
                      no total
                    </span>
                  </>
                }
              />
              <LegendaComposicao fatias={FATIAS} className="w-full" />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardContent className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-rotulo text-texto-tenue uppercase">
                  Receita recorrente
                </p>
                <p className="font-mono text-h3 font-semibold tabular-nums">
                  R$ 256.953
                </p>
              </div>
              <ChipVariacao valor={9.3} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { CenaConteudo };
