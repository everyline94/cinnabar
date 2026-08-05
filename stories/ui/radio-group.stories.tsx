import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <RadioGroup defaultValue="mensal" className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="semanal" id="periodo-semanal" />
        <Label htmlFor="periodo-semanal">Semanal</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="mensal" id="periodo-mensal" />
        <Label htmlFor="periodo-mensal">Mensal</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="trimestral" id="periodo-trimestral" />
        <Label htmlFor="periodo-trimestral">Trimestral</Label>
      </div>
    </RadioGroup>
  ),
};
