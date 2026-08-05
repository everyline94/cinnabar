import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Building2, CreditCard, Landmark, Square } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListaContas, type Conta } from "@/components/linha-conta";

const CONTAS: Conta[] = [
  { id: "brex", nome: "Brex", final: "•••• 3472", valor: "R$ 150.311,94", valorAnterior: "R$ 50.981,29", variacao: 30.3, tinta: "var(--pigmento)", icone: <CreditCard className="size-4" /> },
  { id: "svb", nome: "Silicon Valley Bank", final: "•••• 2349", valor: "R$ 235.665,01", valorAnterior: "-R$ 1.983,55", variacao: -1.3, tinta: "var(--capa-fria)", icone: <Landmark className="size-4" /> },
  { id: "chase", nome: "Chase Bank", final: "•••• 9907", valor: "R$ 851.099,03", valorAnterior: "R$ 1.251.090,67", variacao: 56.3, tinta: "var(--mare)", icone: <Building2 className="size-4" /> },
  { id: "square", nome: "Square", final: "•••• 8976", valor: "R$ 9.085,03", valorAnterior: "R$ 2.530,08", variacao: 9.3, tinta: "var(--tinta)", icone: <Square className="size-4" /> },
];

const meta = {
  title: "Blocos/LinhaConta",
  component: ListaContas,
  parameters: {
    docs: {
      description: {
        component:
          "A parte densa do sistema. O cartão é arejado; a lista dentro dele não. O sistema precisa dos dois climas, e este é o denso.",
      },
    },
  },
  args: { contas: CONTAS },
} satisfies Meta<typeof ListaContas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Contas</CardTitle>
      </CardHeader>
      <CardContent>
        <ListaContas contas={CONTAS} />
      </CardContent>
    </Card>
  ),
};
