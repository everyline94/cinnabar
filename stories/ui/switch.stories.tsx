import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="alerta-vao" defaultChecked />
        <Label htmlFor="alerta-vao">Alertar sobre vão de caixa</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="relatorio-semanal" />
        <Label htmlFor="relatorio-semanal">Relatório semanal por e-mail</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="modo-auditoria" disabled />
        <Label htmlFor="modo-auditoria">Modo auditoria</Label>
      </div>
    </div>
  ),
};
