import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="ghost" size="icon" aria-label="O que é EBITDA" />}
          >
            <Info />
          </TooltipTrigger>
          <TooltipContent>Lucro antes de juros e impostos</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Exportar
          </TooltipTrigger>
          <TooltipContent>Baixa o mês fechado em CSV</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
