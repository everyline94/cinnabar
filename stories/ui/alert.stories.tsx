import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CircleAlert, Info } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Alert>
        <Info />
        <AlertTitle>Sincronização concluída</AlertTitle>
        <AlertDescription>
          As quatro contas conectadas foram atualizadas há dois minutos.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Risco de vão de caixa</AlertTitle>
        <AlertDescription>
          A projeção indica saldo negativo em 25 de março se as saídas
          previstas se confirmarem.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
