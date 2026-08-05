import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChipVariacao } from "@/components/chip-variacao";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const meta = {
  title: "UI/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const LINHAS = [
  { id: "brex", conta: "Brex", saldo: "R$ 150.311,94", variacao: 30.3 },
  { id: "svb", conta: "Silicon Valley Bank", saldo: "R$ 235.665,01", variacao: -1.3 },
  { id: "chase", conta: "Chase Bank", saldo: "R$ 851.099,03", variacao: 56.3 },
  { id: "square", conta: "Square", saldo: "R$ 9.085,03", variacao: 9.3 },
];

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="max-w-2xl rounded-lg bg-papel p-5 shadow-papel">
      <Table>
        <TableCaption>Saldos consolidados na última sincronização.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Conta</TableHead>
            <TableHead className="text-right">Saldo</TableHead>
            <TableHead className="text-right">Variação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LINHAS.map((linha) => (
            <TableRow key={linha.id}>
              <TableCell className="font-medium">{linha.conta}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {linha.saldo}
              </TableCell>
              <TableCell className="text-right">
                <ChipVariacao valor={linha.variacao} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
