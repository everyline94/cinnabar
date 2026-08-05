import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const meta = {
  title: "UI/Field",
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Limite do cartão virtual</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="limite-cartao">Valor máximo por mês</FieldLabel>
          <Input
            id="limite-cartao"
            defaultValue="R$ 2.000,00"
            className="font-mono"
          />
          <FieldDescription>
            O cartão é recusado automaticamente acima desse valor.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Switch id="renovar-limite" defaultChecked />
          <FieldLabel htmlFor="renovar-limite">
            Renovar o limite todo dia primeiro
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
