import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  args: { value: 72 },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Progress value={72}>
        <div className="flex items-center justify-between">
          <ProgressLabel>Meta do trimestre</ProgressLabel>
          <ProgressValue className="font-mono tabular-nums" />
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <Progress value={24}>
        <div className="flex items-center justify-between">
          <ProgressLabel>Fôlego de caixa</ProgressLabel>
          <ProgressValue className="font-mono tabular-nums" />
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  ),
};
