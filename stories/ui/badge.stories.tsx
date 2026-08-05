import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Ativa</Badge>
      <Badge variant="secondary">Em análise</Badge>
      <Badge variant="outline">Arquivada</Badge>
      <Badge variant="destructive">Bloqueada</Badge>
      <Badge variant="ghost">Rascunho</Badge>
    </div>
  ),
};

export const ComNumero: Story = {
  name: "Com número",
  render: () => (
    // Numero em mono: a contagem alinha com o resto da coluna de dados.
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary" className="font-mono">13</Badge>
      <Badge className="font-mono">4</Badge>
      <Badge variant="outline" className="font-mono">120</Badge>
    </div>
  ),
};
