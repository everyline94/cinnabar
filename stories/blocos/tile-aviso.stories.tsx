import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Card, CardContent } from "@/components/ui/card";
import { TileAviso } from "@/components/tile-aviso";

const meta = {
  title: "Blocos/TileAviso",
  component: TileAviso,
  parameters: {
    docs: {
      description: {
        component:
          "O amarelo é pigmento, igual ao laranja: não muda entre os temas, e por isso o texto que senta em cima dele também não muda. A linha de pulso usa a brasa da pintura, que também é fixa, porque a queda clareia no escuro e cairia para 2.30:1 sobre o amarelo.",
      },
    },
  },
  args: { rotulo: "Caixa zera em abr 2023" },
} satisfies Meta<typeof TileAviso>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Card className="max-w-md">
      <CardContent className="flex items-center gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-rotulo text-texto-tenue uppercase">
            <span className="mr-1.5 font-mono text-h3 leading-none font-semibold text-texto">
              9
            </span>
            meses de fôlego
          </p>
          <p className="text-ui text-texto-suave">
            O fôlego ideal fica entre doze e dezoito meses.
          </p>
        </div>
        <TileAviso rotulo={<>Caixa zera em abr 2023</>} />
      </CardContent>
    </Card>
  ),
};
