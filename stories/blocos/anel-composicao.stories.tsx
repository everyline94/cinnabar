import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AnelComposicao,
  LegendaComposicao,
  type Fatia,
} from "@/components/anel-composicao";

const FATIAS: Fatia[] = [
  { id: "novos", rotulo: "Novos", valor: 14833, tinta: "var(--ametista)" },
  { id: "pagantes", rotulo: "Pagantes", valor: 9204, tinta: "var(--lagoa)" },
  { id: "dormentes", rotulo: "Dormentes", valor: 3117, tinta: "var(--brasa)" },
];

const meta = {
  title: "Blocos/AnelComposicao",
  component: AnelComposicao,
  parameters: {
    docs: {
      description: {
        component:
          "Os gomos são separados por um fio de papel porque ametista e lagoa ficam a 1.8:1 um do outro: cor sozinha não distingue gomo vizinho. E cada fatia aparece escrita na legenda, porque cor nunca é a única forma de ler o dado.",
      },
    },
  },
  args: { fatias: FATIAS },
} satisfies Meta<typeof AnelComposicao>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Composição de usuários</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
        <AnelComposicao
          fatias={FATIAS}
          className="max-w-44"
          centro={
            <>
              <span className="font-mono text-lede font-semibold tabular-nums">
                27.154
              </span>
              <span className="text-rotulo text-texto-tenue uppercase">
                no total
              </span>
            </>
          }
        />
        <LegendaComposicao fatias={FATIAS} className="w-full" />
      </CardContent>
    </Card>
  ),
};
