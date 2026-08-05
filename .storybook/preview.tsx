import * as React from "react";
import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "../styles/tokens.css";
import "./fontes.css";

/**
 * Toda story nasce dentro de uma moldura com o fundo do sistema. Sem isso a
 * peca aparece sobre o branco do Storybook, que nao e a --mesa: um cartao
 * branco sobre branco parece sem sombra, e um erro de token passa batido.
 */
const comMoldura: Decorator = (Story) => (
  <div className="bg-mesa text-texto font-texto p-8">
    <Story />
  </div>
);

const preview: Preview = {
  // Todo componente ganha pagina de docs de graca.
  tags: ["autodocs"],
  decorators: [
    comMoldura,
    withThemeByClassName({
      themes: { claro: "", escuro: "dark" },
      defaultTheme: "claro",
      parentSelector: "html",
    }),
  ],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    options: {
      // A ordem casa com o titulo ACENTUADO das stories, porque e por ele que
      // o storySort compara. Tirar o acento daqui quebraria a ordenacao em
      // silencio: Fundacao nunca casaria com Fundação.
      storySort: {
        order: ["Fundação", "UI", "Blocos", "Padrões"],
      },
    },
  },
};

export default preview;
