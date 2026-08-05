import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "UI/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    // O id vai em ASCII: htmlFor nao casa com espaco nem acento, e o par
    // Label/controle quebraria em silencio. O rotulo visivel fica acentuado.
    <div className="grid max-w-xs gap-2">
      <Label htmlFor="conta-destino">Conta de destino</Label>
      <Input id="conta-destino" placeholder="Selecione a conta" />
    </div>
  ),
};

export const ComControle: Story = {
  name: "Com controle",
  render: () => (
    <div className="flex items-center gap-2.5">
      <Checkbox id="notificar-vao" />
      <Label htmlFor="notificar-vao">Avisar sobre vão de caixa</Label>
    </div>
  ),
};
