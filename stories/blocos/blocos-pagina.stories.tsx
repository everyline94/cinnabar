import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import { BotaoAcao } from "@/components/botao-acao";
import {
  CabecalhoPagina,
  ContainerPagina,
  Secao,
} from "@/components/blocos-pagina";
import { TileMetrica } from "@/components/tile-metrica";

const meta = {
  title: "Blocos/BlocosPagina",
  component: ContainerPagina,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ContainerPagina>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <ContainerPagina className="flex flex-col gap-12 py-4">
      <CabecalhoPagina
        sobretitulo="Março de 2023"
        titulo="Visão geral"
        descricao="O consolidado das quatro contas operacionais, com as projeções dos próximos trinta dias."
        acoes={
          <>
            <Button variant="outline">Exportar</Button>
            <BotaoAcao seta>Transferir</BotaoAcao>
          </>
        }
      />
      <Secao
        titulo="Indicadores"
        descricao="O que mudou desde o fechamento anterior."
        acoes={<Button variant="ghost" size="sm">Ver histórico</Button>}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TileMetrica rotulo="Saldo total" valor="R$ 1.230.340" fracao=",69" variacao={7.3} />
          <TileMetrica rotulo="Entradas" valor="R$ 455.770" fracao=",88" variacao={11.2} />
          <TileMetrica rotulo="Saídas" valor="-R$ 567.000" fracao=",03" variacao={-1.3} />
        </div>
      </Secao>
    </ContainerPagina>
  ),
};

export const Medidas: Story = {
  name: "Medidas de coluna",
  parameters: {
    docs: {
      description: {
        story:
          "O teto da coluna entra em px e trava o LAYOUT, nunca o parágrafo. A diferença importa: a coluna pode ter teto e centralizar, com o texto correndo 100% dela. Cap de medida em ch colado no parágrafo espreme o texto à esquerda e abre vão à direita.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 py-4">
      {(["larga", "media", "estreita"] as const).map((medida) => (
        <ContainerPagina key={medida} medida={medida}>
          <div className="rounded-lg bg-papel p-5 shadow-papel">
            <p className="text-rotulo text-texto-tenue uppercase">{medida}</p>
            <p className="text-corpo text-texto-suave">
              O texto corre a largura inteira da coluna, e a coluna é que tem
              teto.
            </p>
          </div>
        </ContainerPagina>
      ))}
    </div>
  ),
};
