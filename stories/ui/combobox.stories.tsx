import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const meta = {
  title: "UI/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const CONTAS = [
  "Brex",
  "Silicon Valley Bank",
  "Chase Bank",
  "Square",
  "Mercury",
];

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Combobox items={CONTAS}>
      <ComboboxInput
        placeholder="Conta de destino"
        className="w-64"
        aria-label="Conta de destino"
      />
      <ComboboxContent>
        <ComboboxEmpty>Nenhuma conta com esse nome.</ComboboxEmpty>
        <ComboboxList>
          {(conta: string) => (
            <ComboboxItem key={conta} value={conta}>
              {conta}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
