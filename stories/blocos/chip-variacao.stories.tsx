import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChipVariacao } from "@/components/chip-variacao";
import { CapaPintada } from "@/components/capa-pintada";

const meta = {
  title: "Blocos/ChipVariacao",
  component: ChipVariacao,
  parameters: {
    docs: {
      description: {
        component:
          "A cor não é a única informação: a seta muda de direção junto com o sinal. Quem não distingue verde de vermelho continua lendo o dado.",
      },
    },
  },
  args: { valor: 7.3 },
} satisfies Meta<typeof ChipVariacao>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SobrePapel: Story = {
  name: "Sobre papel",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ChipVariacao valor={30.3} />
      <ChipVariacao valor={7.3} />
      <ChipVariacao valor={-1.3} />
      <ChipVariacao valor={-56.3} />
    </div>
  ),
};

export const SobreCapa: Story = {
  name: "Sobre a capa",
  render: () => (
    <CapaPintada altura="min-h-32" className="flex items-center gap-3 p-6">
      <ChipVariacao valor={7.3} sobre="capa" />
      <ChipVariacao valor={-5.3} sobre="capa" />
      <ChipVariacao valor={11.2} sobre="capa" />
    </CapaPintada>
  ),
};
