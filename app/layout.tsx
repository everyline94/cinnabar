import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";

import { ProvedorTema } from "@/components/tema";
import { Toaster } from "@/components/toaster";

import "@/styles/tokens.css";

/**
 * As MESMAS duas fontes que o .storybook/fontes.css carrega no catalogo, e
 * preenchendo as MESMAS variaveis que o styles/tokens.css espera. Se um dos
 * dois lados trocar de fonte sem o outro, a vitrine e o catalogo passam a
 * mostrar sistemas diferentes.
 */
const fonteTexto = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fonte-texto",
  display: "swap",
});

const fonteMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--fonte-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinnabar",
  description:
    "Um design system de tinta preta, papel branco e pigmento vermelhão, tirado por medição de uma única imagem de referência.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: o next-themes escreve a classe do tema no html
    // antes do React hidratar, de proposito, pra pagina nao piscar branca.
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fonteTexto.variable} ${fonteMono.variable}`}
    >
      <body>
        <ProvedorTema>
          {children}
          <Toaster />
        </ProvedorTema>
      </body>
    </html>
  );
}
