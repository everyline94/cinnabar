import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  ArrowLeftRight,
  CreditCard,
  FileText,
  Landmark,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const meta = {
  title: "UI/Command",
  component: Command,
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Command className="max-w-md rounded-lg shadow-flutuante">
      <CommandInput placeholder="O que você quer fazer?" />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>
        <CommandGroup heading="Movimentar">
          <CommandItem>
            <ArrowLeftRight />
            Transferir fundos
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Criar cartão virtual
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Consultar">
          <CommandItem>
            <Landmark />
            Ver contas conectadas
          </CommandItem>
          <CommandItem>
            <FileText />
            Exportar o mês fechado
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
