import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PaletaConteudo } from "./paleta-conteudo";

const meta = {
  title: "Fundação/Paleta",
  component: PaletaConteudo,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaletaConteudo>;

export default meta;
type Story = StoryObj<typeof meta>;

// O export vai sem acento porque o Storybook remove acento ao gerar o rotulo.
// O acento entra pelo campo name.
export const Tokens: Story = {
  name: "Tokens",
};
