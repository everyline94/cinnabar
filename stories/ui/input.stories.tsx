import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "A borda do campo é um token separado da borda decorativa (--linha-campo, 3.45:1 no claro e 3.31:1 no escuro sobre o papel). Ela precisa passar 3:1 porque é a única coisa que diz onde o campo começa.",
      },
    },
  },
  args: { placeholder: "Informe o limite" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
};

export const ComRotulo: Story = {
  name: "Com rótulo",
  render: () => (
    // O id fica em ASCII porque htmlFor nao casa com espaco nem acento e o par
    // quebraria em silencio. O rotulo visivel continua acentuado.
    <div className="grid max-w-xs gap-2">
      <label htmlFor="limite-mensal" className="text-ui font-medium">
        Limite mensal
      </label>
      <Input id="limite-mensal" placeholder="R$ 2.000,00" />
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="grid max-w-xs gap-4">
      {/* Todo campo tem nome acessivel: placeholder NAO conta como rotulo. */}
      <Input placeholder="Vazio" aria-label="Campo vazio" />
      <Input
        defaultValue="R$ 2.000,00"
        className="font-mono"
        aria-label="Valor preenchido"
      />
      <Input placeholder="Desabilitado" disabled aria-label="Campo desabilitado" />
      <Input
        defaultValue="conta-invalida"
        aria-invalid
        aria-label="Conta de destino"
      />
    </div>
  ),
};
