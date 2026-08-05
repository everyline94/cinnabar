import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CapaPintada } from "@/components/capa-pintada";
import { FaixaMetricas } from "@/components/faixa-metricas";

const meta = {
  title: "Blocos/CapaPintada",
  component: CapaPintada,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "O motivo gráfico do sistema, feito só em CSS. O véu de preto a 38% por baixo do conteúdo não é estética: é o piso de contraste. Sem ele, texto branco sobre o ponto mais claro da pintura daria 2.7:1; com ele, 6.77:1 medido no pixel renderizado.",
      },
    },
  },
} satisfies Meta<typeof CapaPintada>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sozinha: Story = {
  render: () => <CapaPintada className="p-8" />,
};

export const ComConteudo: Story = {
  name: "Com conteúdo",
  render: () => (
    <CapaPintada className="flex flex-col justify-between gap-8 p-8">
      <h2 className="text-h2 font-semibold tracking-tight">
        Visão geral <span className="text-sobre-capa/70">deste mês</span>
      </h2>
      <FaixaMetricas
        metricas={[
          { id: "saldo", rotulo: "Saldo total", valor: "R$ 1.230.340", fracao: ",69", variacao: 7.3 },
          { id: "ebitda", rotulo: "EBITDA", valor: "R$ 253.110", fracao: ",25", variacao: -5.3 },
          { id: "entrada", rotulo: "Entradas", valor: "R$ 455.770", fracao: ",88", variacao: 11.2 },
        ]}
      />
    </CapaPintada>
  ),
};
