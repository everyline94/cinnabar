import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "@/components/ui/separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm rounded-lg bg-papel p-5 shadow-papel">
      <p className="text-ui font-medium">Contas conectadas</p>
      <Separator className="my-4" />
      <p className="text-ui text-texto-suave">Cinco instituições</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 rounded-lg bg-papel px-4 shadow-papel">
      <span className="text-ui">Entradas</span>
      <Separator orientation="vertical" />
      <span className="text-ui">Saídas</span>
      <Separator orientation="vertical" />
      <span className="text-ui">Projeções</span>
    </div>
  ),
};
