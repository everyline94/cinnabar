import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

/**
 * O catalogo tambem veste a marca, nao so as stories.
 *
 * Atencao: o manager e um app A PARTE do preview. Ele nao carrega o
 * styles/tokens.css e portanto NAO enxerga var(--mesa) nem nenhuma outra
 * variavel do sistema. Por isso cada cor aqui entra como hex literal, copiada
 * do tokens.css a mao. Se um token mudar la, este arquivo precisa ser
 * atualizado junto: e a unica duplicacao consciente do projeto.
 *
 * E o manager so aplica o tema depois de REINICIAR o Storybook. Recarregar a
 * pagina nao basta.
 */

const marca = `
<span style="display:inline-flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-0.02em">
  <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="Cinnabar">
    <defs><clipPath id="cnb-manager"><rect width="24" height="24" rx="7"/></clipPath></defs>
    <g clip-path="url(#cnb-manager)">
      <rect width="24" height="24" fill="#000000"/>
      <path d="M0 24 L15 24 A15 15 0 0 0 0 9 Z" fill="#f4693e"/>
      <path d="M24 0 L14 0 A10 10 0 0 0 24 10 Z" fill="#2c627e"/>
    </g>
  </svg>
  Cinnabar
</span>`;

addons.setConfig({
  theme: create({
    base: "light",

    brandTitle: marca,
    // A marca do catalogo volta pra vitrine.
    brandUrl: "/",
    brandTarget: "_self",

    // --mesa e --papel
    appBg: "#f7f7f7",
    appContentBg: "#ffffff",
    appPreviewBg: "#ffffff",
    // --linha na moldura, --linha-campo no campo: sao tokens diferentes no
    // sistema justamente porque o campo precisa dos 3:1 de 1.4.11.
    appBorderColor: "#e6e6e6",
    appBorderRadius: 16, // --raio

    // --texto e --texto-suave
    textColor: "#0a0a0a",
    textInverseColor: "#ffffff",
    textMutedColor: "#565656",

    // Barra e selecao na tinta forte: branco sobre #000000 da 21:1. O pigmento
    // #f4693e fica FORA de area pequena com texto por cima, porque branco
    // sobre ele da so 3.03:1 e reprovaria em texto.
    barBg: "#ffffff",
    barTextColor: "#565656",
    barSelectedColor: "#0a0a0a",
    barHoverColor: "#a83c1e",
    colorPrimary: "#a83c1e", // --brasa: o laranja que carrega texto
    colorSecondary: "#0a0a0a", // --tinta: fundo do item selecionado

    inputBg: "#ffffff",
    inputBorder: "#8a8a8a", // --linha-campo
    inputTextColor: "#0a0a0a",
    inputBorderRadius: 12, // --radius-md

    fontBase: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Geist Mono", ui-monospace, monospace',
  }),
});
