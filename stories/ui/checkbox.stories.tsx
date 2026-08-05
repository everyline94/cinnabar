import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    // Ids em ASCII, rotulos acentuados.
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <Checkbox id="conta-operacional" defaultChecked />
        <Label htmlFor="conta-operacional">Conta operacional</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="conta-reserva" />
        <Label htmlFor="conta-reserva">Conta de reserva</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="conta-encerrada" disabled />
        <Label htmlFor="conta-encerrada">Conta encerrada</Label>
      </div>
    </div>
  ),
};
