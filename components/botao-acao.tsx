import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * A UNICA receita de acao forte do sistema.
 *
 * Existe pra que ninguem remonte a pilula na mao em cada tela. A cor da acao
 * aqui e a TINTA, nao o pigmento: na referencia o botao forte e a pilula preta
 * ("See all", "Transfer funds"), e o laranja fica na pintura e na marca. Botao
 * laranja daria 3.03:1 com texto branco e reprovaria.
 *
 * A contagem opcional reproduz o "See all 13" da referencia: um contador em
 * mono dentro de uma pastilha translucida, do lado direito do rotulo.
 */

type BotaoAcaoProps = React.ComponentProps<typeof Button> & {
  /** O numero da pastilha. Sem ele, o botao e so o rotulo. */
  contagem?: number;
  /** A seta a direita, como no "Transfer funds" da referencia. */
  seta?: boolean;
};

function BotaoAcao({
  contagem,
  seta = false,
  className,
  children,
  ...props
}: BotaoAcaoProps) {
  return (
    <Button
      data-slot="botao-acao"
      // A pilula e uma superficie de tinta: o anel de foco em brasa nao se le
      // sobre preto, entao ela reatribui --foco pro pigmento (6.94:1).
      data-superficie="tinta"
      className={cn("gap-2.5", className)}
      {...props}
    >
      {children}
      {contagem !== undefined ? (
        <span className="rounded-sm bg-sobre-acao/18 px-1.5 py-0.5 font-mono text-rotulo tabular-nums">
          {contagem}
        </span>
      ) : null}
      {seta ? <ArrowRight data-icon="inline-end" /> : null}
    </Button>
  );
}

export { BotaoAcao };
