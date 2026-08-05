import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CapaPintada } from "@/components/capa-pintada";
import { FaixaMetricas } from "@/components/faixa-metricas";

const meta = {
  title: "Blocos/FaixaMetricas",
  component: FaixaMetricas,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A régua de KPIs em vidro sobre a pintura. O detalhe que faz a referência parecer a referência está na fração: os centavos entram menores e mais apagados, e por isso são uma prop separada do valor.",
      },
    },
  },
  args: { metricas: [] },
} satisfies Meta<typeof FaixaMetricas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <CapaPintada altura="min-h-40" className="flex items-end p-6">
      <FaixaMetricas
        metricas={[
          { id: "saldo", rotulo: "Saldo total", valor: "R$ 1.230.340", fracao: ",69", variacao: 7.3 },
          { id: "ebitda", rotulo: "EBITDA", valor: "R$ 253.110", fracao: ",25", variacao: -5.3 },
          { id: "entrada", rotulo: "Entradas", valor: "R$ 455.770", fracao: ",88", variacao: 11.2 },
          { id: "saida", rotulo: "Saídas", valor: "-R$ 567.000", fracao: ",03", variacao: -1.3 },
          { id: "crescimento", rotulo: "Crescimento no mês", valor: "9,56%", variacao: 2.1 },
        ]}
      />
    </CapaPintada>
  ),
};
