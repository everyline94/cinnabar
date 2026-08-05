import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Tabs defaultValue="principal" className="max-w-lg">
      <TabsList>
        <TabsTrigger value="principal">Principal</TabsTrigger>
        <TabsTrigger value="unidade">Unidade</TabsTrigger>
        <TabsTrigger value="marketing">Marketing</TabsTrigger>
      </TabsList>
      <TabsContent value="principal" className="pt-4 text-corpo text-texto-suave">
        A visão consolidada de todas as contas operacionais.
      </TabsContent>
      <TabsContent value="unidade" className="pt-4 text-corpo text-texto-suave">
        Uma unidade de negócio por vez, sem consolidar.
      </TabsContent>
      <TabsContent value="marketing" className="pt-4 text-corpo text-texto-suave">
        Só o que sai pelo centro de custo de aquisição.
      </TabsContent>
    </Tabs>
  ),
};

export const Sublinhado: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A variante de linha é a que a referência usa no cabeçalho: o item ativo ganha um traço embaixo, sem pastilha nem fundo.",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="principal" className="max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="principal">Principal</TabsTrigger>
        <TabsTrigger value="unidade">Unidade</TabsTrigger>
        <TabsTrigger value="investidores">Investidores</TabsTrigger>
      </TabsList>
      <TabsContent value="principal" className="pt-5 text-corpo text-texto-suave">
        A visão consolidada de todas as contas operacionais.
      </TabsContent>
      <TabsContent value="unidade" className="pt-5 text-corpo text-texto-suave">
        Uma unidade de negócio por vez, sem consolidar.
      </TabsContent>
      <TabsContent value="investidores" className="pt-5 text-corpo text-texto-suave">
        O recorte que vai para o relatório trimestral.
      </TabsContent>
    </Tabs>
  ),
};
