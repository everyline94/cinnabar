import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A ação do sistema é PRETA, não colorida. O laranja é pigmento de marca e de pintura, e nunca vira botão: sobre papel branco ele dá 3.03:1 e reprovaria em texto. Com o raio de 16px, um controle de 36px de altura fecha em pílula sozinho.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
    },
  },
  args: { children: "Ver tudo" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Ver tudo</Button>
      <Button variant="outline">Gerenciar</Button>
      <Button variant="secondary">Exportar</Button>
      <Button variant="ghost">Cancelar</Button>
      <Button variant="destructive">Encerrar conta</Button>
      <Button variant="link">Ler a política</Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra pequeno</Button>
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

export const ComIcone: Story = {
  name: "Com ícone",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus data-icon="inline-start" />
        Nova conta
      </Button>
      <Button variant="outline">
        <Settings data-icon="inline-start" />
        Gerenciar espaço
      </Button>
      <Button>
        Transferir
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button size="icon" aria-label="Adicionar aba">
        <Plus />
      </Button>
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Ver tudo</Button>
      <Button variant="outline" disabled>
        Gerenciar
      </Button>
      <Button variant="secondary" disabled>
        Exportar
      </Button>
    </div>
  ),
};
