import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "O papel do sistema. Cartão aqui não tem contorno: quem separa o papel da mesa é uma sombra baixa e larga. Por isso o anel do shadcn saiu e entrou a --sombra-papel.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Contas</CardTitle>
        <CardDescription>Cinco instituições conectadas.</CardDescription>
      </CardHeader>
      <CardContent className="text-corpo text-texto-suave">
        O saldo consolidado atualiza a cada sincronização e considera as contas
        marcadas como operacionais.
      </CardContent>
    </Card>
  ),
};

export const ComAcao: Story = {
  name: "Com ação no cabeçalho",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Fluxo de caixa</CardTitle>
        <CardDescription>Janeiro a março</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Gerenciar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-corpo text-texto-suave">
        Entradas e saídas dos últimos noventa dias, já descontadas as
        transferências entre contas próprias.
      </CardContent>
    </Card>
  ),
};

export const ComRodape: Story = {
  name: "Com rodapé",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Saldo previsto</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-mono text-h2 font-semibold">R$ 1.426.230,54</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Ver as treze projeções</Button>
      </CardFooter>
    </Card>
  ),
};

export const Compacto: Story = {
  render: () => (
    <Card size="sm" className="max-w-sm">
      <CardHeader>
        <CardTitle>Atalho</CardTitle>
      </CardHeader>
      <CardContent className="text-ui text-texto-suave">
        Transferir para o cartão pessoal.
      </CardContent>
    </Card>
  ),
};

export const EmGrade: Story = {
  name: "Em grade",
  render: () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[
        ["Contas", "5 instituições"],
        ["Faturas", "12 em aberto"],
        ["Projeções", "9 meses de caixa"],
      ].map(([titulo, descricao]) => (
        <Card key={titulo}>
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
            <CardDescription>{descricao}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
};
