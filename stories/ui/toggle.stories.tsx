import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Negrito">
        <Bold />
      </Toggle>
      <Toggle aria-label="Itálico" defaultPressed>
        <Italic />
      </Toggle>
      <Toggle aria-label="Sublinhado" disabled>
        <Underline />
      </Toggle>
    </div>
  ),
};
