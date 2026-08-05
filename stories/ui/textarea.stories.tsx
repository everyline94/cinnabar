import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="grid max-w-md gap-2">
      <Label htmlFor="nota-transferencia">Observação da transferência</Label>
      <Textarea
        id="nota-transferencia"
        placeholder="Escreva o que essa movimentação representa."
      />
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      {/* Todo campo tem nome acessivel: placeholder NAO conta como rotulo. */}
      <Textarea placeholder="Vazio" aria-label="Observação vazia" />
      <Textarea
        defaultValue="Repasse do fornecedor referente a março."
        aria-label="Observação preenchida"
      />
      <Textarea placeholder="Desabilitado" disabled aria-label="Observação desabilitada" />
      <Textarea defaultValue="" aria-invalid aria-label="Observação inválida" />
    </div>
  ),
};
