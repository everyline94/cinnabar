import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CenaConteudo } from "./cena-conteudo";

const meta = {
  title: "Padrões/Painel",
  component: CenaConteudo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A referência remontada só com peças do sistema. É o único teste que prova que os tokens seguram uma tela inteira, e não apenas um componente isolado numa moldura.",
      },
    },
  },
} satisfies Meta<typeof CenaConteudo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Painel: Story = {
  name: "Painel financeiro",
};
