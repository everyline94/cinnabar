import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BotaoAcao } from "@/components/botao-acao";
import { EstadoVazio } from "@/components/estado-vazio";

const meta = {
  title: "Blocos/EstadoVazio",
  component: EstadoVazio,
  args: { titulo: "Nenhuma conta conectada" },
} satisfies Meta<typeof EstadoVazio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <EstadoVazio
      className="max-w-lg"
      icone={<Landmark />}
      titulo="Nenhuma conta conectada"
      descricao="Conecte a primeira instituição para o painel começar a consolidar saldos e projetar o fôlego de caixa."
      acoes={
        <>
          <BotaoAcao seta>Conectar conta</BotaoAcao>
          <Button variant="ghost">Importar extrato</Button>
        </>
      }
    />
  ),
};
