import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meta = {
  title: "UI/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Select defaultValue="mensal">
      {/* O gatilho e um botao: sem rotulo o axe reprova em button-name,
          porque o valor selecionado sozinho nao diz o que ele controla. */}
      <SelectTrigger className="w-56" aria-label="Período do relatório">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semanal">Semanal</SelectItem>
        <SelectItem value="mensal">Mensal</SelectItem>
        <SelectItem value="trimestral">Trimestral</SelectItem>
        <SelectItem value="anual">Anual</SelectItem>
      </SelectContent>
    </Select>
  ),
};
