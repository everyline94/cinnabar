import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // CUSTOMIZADO. Tres coisas: altura de 32 pra 36px e raio md (12px), que e
        // o formato de campo de valor do sistema; fundo em --papel em vez
        // de transparente, pra que o campo se leia como campo mesmo caindo
        // dentro de um cartao ja branco; e o disabled/dark saindo de
        // --papel-fundo em vez de input/30 (o input aqui e a linha de campo, e
        // usar ela como FUNDO pintava a caixa de cinza medio).
        "h-9 w-full min-w-0 rounded-md border border-input bg-papel px-3 py-1 text-corpo transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-ui file:font-medium file:text-foreground placeholder:text-texto-tenue focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-papel-fundo disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-ui dark:bg-papel dark:disabled:bg-papel-fundo dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
