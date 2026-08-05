import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const raiz = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // O catalogo e assado em out/catalogo/ pelo build-site, entao todo caminho
  // gerado precisa ser relativo a essa subpasta e nao a raiz do dominio.
  viteFinal: async (config) => {
    config.base = "./";
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(raiz, ".."),
    };
    return config;
  },
};

export default config;
