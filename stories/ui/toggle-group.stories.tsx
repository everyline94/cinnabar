import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <ToggleGroup defaultValue={["esquerda"]}>
      <ToggleGroupItem value="esquerda" aria-label="Alinhar à esquerda">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="centro" aria-label="Centralizar">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="direita" aria-label="Alinhar à direita">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ComTexto: Story = {
  name: "Com texto",
  render: () => (
    <ToggleGroup defaultValue={["mes"]}>
      <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
      <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
      <ToggleGroupItem value="ano">Ano</ToggleGroupItem>
    </ToggleGroup>
  ),
};
