import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BotaoAcao } from "@/components/botao-acao";

const meta = {
  title: "Blocos/BotaoAcao",
  component: BotaoAcao,
  parameters: {
    docs: {
      description: {
        component:
          "A única receita de ação forte do sistema. A cor é a tinta, não o pigmento: na referência o botão forte é a pílula preta, e um botão laranja daria 3.03:1 com texto branco.",
      },
    },
  },
} satisfies Meta<typeof BotaoAcao>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <BotaoAcao>Ver todos</BotaoAcao>
      <BotaoAcao contagem={13}>Ver todos</BotaoAcao>
      <BotaoAcao seta>Transferir fundos</BotaoAcao>
      <BotaoAcao size="lg" seta contagem={4}>
        Aprovar pendências
      </BotaoAcao>
    </div>
  ),
};
