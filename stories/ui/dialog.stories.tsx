import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Transferir fundos</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transferir fundos</DialogTitle>
          <DialogDescription>
            O valor sai da conta operacional e entra no cartão pessoal em até
            um dia útil.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="valor-transferencia">Valor</Label>
          <Input
            id="valor-transferencia"
            defaultValue="R$ 2.000,00"
            className="font-mono"
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancelar</DialogClose>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
