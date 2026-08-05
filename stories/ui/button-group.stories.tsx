import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

const meta = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline">Semana</Button>
        <Button variant="outline">Mês</Button>
        <Button variant="outline">Ano</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Exportar</Button>
        <ButtonGroupSeparator />
        <Button aria-label="Mais opções de exportação">CSV</Button>
      </ButtonGroup>
    </div>
  ),
};
