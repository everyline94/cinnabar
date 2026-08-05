"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * O tema.
 *
 * O provedor entra por CLASSE, que e o que o @custom-variant dark do
 * tokens.css espera (&:is(.dark *)). Ele vive na vitrine, em app/layout.tsx.
 *
 * No catalogo ele NAO entra: la quem manda no tema e o seletor da toolbar do
 * Storybook. Montar os dois ao mesmo tempo faz um brigar com o outro, e ainda
 * por cima o next-themes injeta uma tag de script que o React 19 acusa no
 * console de toda story.
 */

function ProvedorTema({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

function ToggleTema() {
  const { resolvedTheme, setTheme } = useTheme();
  // Ate o provedor hidratar, resolvedTheme e undefined. Renderizar o icone
  // errado no servidor e trocar no cliente da mismatch, entao o botao nasce
  // neutro e so ganha estado depois da montagem.
  const [montado, setMontado] = React.useState(false);
  React.useEffect(() => setMontado(true), []);

  const escuro = montado && resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(escuro ? "light" : "dark")}
      aria-label={escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
    >
      {escuro ? <Moon aria-hidden /> : <Sun aria-hidden />}
    </Button>
  );
}

export { ProvedorTema, ToggleTema };
