import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TileMetrica } from "@/components/tile-metrica";

const meta = {
  title: "Blocos/TileMetrica",
  component: TileMetrica,
  args: { rotulo: "Saldo total", valor: "R$ 1.230.340" },
} satisfies Meta<typeof TileMetrica>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <TileMetrica rotulo="Saldo total" valor="R$ 1.230.340" fracao=",69" variacao={7.3} />
      <TileMetrica rotulo="EBITDA" valor="R$ 253.110" fracao=",25" variacao={-5.3} />
      <TileMetrica
        rotulo="Fôlego de caixa"
        valor="9"
        nota="meses, contra os doze a dezoito recomendados"
      />
    </div>
  ),
};
