import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Marca } from "@/components/marca";

const meta = {
  title: "Blocos/Marca",
  component: Marca,
} satisfies Meta<typeof Marca>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <Marca tamanho="sm" />
      <Marca tamanho="md" />
      <Marca tamanho="lg" />
    </div>
  ),
};

export const Simbolo: Story = {
  name: "Só o símbolo",
  parameters: {
    docs: {
      description: {
        story:
          "O quadrado de tinta com os dois pigmentos da pintura invadindo os cantos. No tema escuro o quadrado inverte junto com a tinta, porque a marca lê o mesmo token que o rail.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Marca simbolo tamanho="sm" />
      <Marca simbolo tamanho="md" />
      <Marca simbolo tamanho="lg" />
    </div>
  ),
};
