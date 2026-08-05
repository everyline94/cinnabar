import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ptBR } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="w-fit rounded-lg bg-papel p-2 shadow-papel">
      {/* Data fixa: calendario que abre no "hoje" muda a cada dia e faz a
          varredura de acessibilidade e o print de revisao divergirem. */}
      <Calendar
        locale={ptBR}
        mode="single"
        defaultMonth={new Date(2023, 2, 1)}
        selected={new Date(2023, 2, 25)}
      />
    </div>
  ),
};
