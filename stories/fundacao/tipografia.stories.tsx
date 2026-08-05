import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TipografiaConteudo } from "./tipografia-conteudo";

const meta = {
  title: "Fundação/Tipografia",
  component: TipografiaConteudo,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TipografiaConteudo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Escala: Story = {
  name: "Escala",
};
