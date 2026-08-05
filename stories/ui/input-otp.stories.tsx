import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const meta = {
  title: "UI/InputOTP",
  component: InputOTP,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-ui font-medium" id="rotulo-codigo">
        Código enviado por SMS
      </p>
      <InputOTP maxLength={6} aria-labelledby="rotulo-codigo">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};
