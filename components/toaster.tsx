"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * O toaster.
 *
 * O sonner desenha fora da arvore do Tailwind, entao ele nao herda os
 * utilitarios da marca: as cores entram pelas variaveis que ele mesmo le
 * (--normal-bg e companhia), apontadas pros tokens do sistema. Assim o toast
 * segue o tema sem uma segunda paleta escrita a mao.
 */

function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps["theme"]) ?? "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--papel)",
          "--normal-text": "var(--texto)",
          "--normal-border": "var(--linha)",
          "--success-bg": "var(--papel)",
          "--success-text": "var(--alta)",
          "--error-bg": "var(--papel)",
          "--error-text": "var(--queda)",
          "--border-radius": "var(--radius-md)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
