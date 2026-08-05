import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

const meta = {
  title: "UI/Kbd",
  component: Kbd,
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-corpo text-texto-suave">
        Abra a paleta de comandos com{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        e confirme com <Kbd>Enter</Kbd>.
      </p>
      <div className="flex items-center gap-3">
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <Kbd>Tab</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Esc</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};
