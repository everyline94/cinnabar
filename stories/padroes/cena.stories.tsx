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
          "Um painel financeiro montado só com peças do sistema. Componente isolado numa moldura sempre parece bom: é aqui que dá pra ver se os tokens aguentam densidade, ou se eles só funcionam bonito no vazio.",
      },
    },
  },
} satisfies Meta<typeof CenaConteudo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Painel: Story = {
  name: "Painel financeiro",
};
