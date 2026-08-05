import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 rounded-lg bg-papel p-5 shadow-papel">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-20" />
    </div>
  ),
};

export const LinhaDeLista: Story = {
  name: "Linha de lista",
  render: () => (
    <div className="flex max-w-md flex-col gap-4 rounded-lg bg-papel p-5 shadow-papel">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3.5">
          <Skeleton className="size-9 rounded-md" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  ),
};
