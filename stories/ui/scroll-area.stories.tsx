import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ScrollArea } from "@/components/ui/scroll-area";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOVIMENTOS = Array.from({ length: 18 }, (_, i) => ({
  id: `mov-${i}`,
  descricao: `Repasse de fornecedor ${String(i + 1).padStart(2, "0")}`,
  valor: `R$ ${(1200 + i * 337).toLocaleString("pt-BR")},00`,
}));

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <ScrollArea className="h-64 w-96 rounded-lg bg-papel p-5 shadow-papel">
      <ul className="flex flex-col">
        {MOVIMENTOS.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between gap-4 py-2.5 not-last:border-b not-last:border-linha"
          >
            <span className="text-ui">{m.descricao}</span>
            <span className="font-mono text-ui tabular-nums">{m.valor}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  ),
};
