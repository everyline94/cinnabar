import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A capa pintada: o motivo grafico do sistema.
 *
 * Na referencia, o que faz a tela ser reconhecivel nao e o cartao nem o rail:
 * e a pintura em vermelhao e petroleo atras do cabecalho. Por isso ela e
 * componente, e nao decoracao solta dentro de uma story.
 *
 * A pintura e feita so em CSS, sem imagem. A primeira tentativa empilhou
 * gradientes lineares num angulo unico e o resultado leu como metal corrugado,
 * nao como tinta: listra regular demais. O que resolve e forma organica em vez
 * de listra, entao aqui cada mancha e um elemento girado com raio proprio e
 * desfoque proprio, e as pinceladas claras tem ponta afinada e larguras
 * diferentes.
 *
 * O veu (--capa-veu, preto a 38%) nao e estetica, e o piso de contraste: sem
 * ele o texto branco sobre o ponto mais claro da pintura daria 2.7:1. Com ele,
 * 6.77:1. Ver scripts/tokens-da-referencia.mjs, bloco CADEIAS.
 */

type CapaPintadaProps = React.ComponentProps<"div"> & {
  /** Altura minima da capa. Quem enquadra e quem chama. */
  altura?: string;
};

/** As manchas de tinta. Cada uma e uma elipse girada e desfocada. */
const MANCHAS: React.CSSProperties[] = [
  {
    // o campo frio, a esquerda do centro, que e a marca da referencia
    inset: "-30% 30% -34% 8%",
    background:
      "radial-gradient(closest-side, var(--capa-fria) 0%, color-mix(in oklab, var(--capa-fria) 82%, transparent) 62%, transparent 100%)",
    transform: "rotate(-14deg)",
    filter: "blur(22px)",
  },
  {
    // o nucleo frio mais fechado, dentro do campo
    inset: "-4% 50% 6% 24%",
    background:
      "radial-gradient(closest-side, color-mix(in oklab, var(--capa-fria) 78%, black) 0%, transparent 100%)",
    transform: "rotate(-24deg)",
    filter: "blur(18px)",
  },
  {
    // o respingo aceso no alto a direita
    inset: "-34% -10% 30% 58%",
    background:
      "radial-gradient(closest-side, var(--capa-viva) 0%, color-mix(in oklab, var(--capa-viva) 55%, transparent) 55%, transparent 100%)",
    transform: "rotate(12deg)",
    filter: "blur(34px)",
  },
  {
    // a sombra funda embaixo a esquerda, que da peso
    inset: "44% 62% -34% -14%",
    background:
      "radial-gradient(closest-side, color-mix(in oklab, var(--capa-quente) 55%, black) 0%, transparent 100%)",
    transform: "rotate(-8deg)",
    filter: "blur(30px)",
  },
  {
    // o calor rasteiro a direita, pra pintura nao ficar simetrica
    inset: "38% -18% -20% 62%",
    background:
      "radial-gradient(closest-side, color-mix(in oklab, var(--capa-quente) 80%, black) 0%, transparent 100%)",
    transform: "rotate(16deg)",
    filter: "blur(26px)",
  },
];

/**
 * As pinceladas claras. Cada uma e uma faixa girada com as duas pontas
 * afinando por gradiente, que e o que separa pincelada de listra.
 *
 * A opacidade aqui NAO e escolha estetica: e teto de contraste. A primeira
 * versao usava ate 0.85 e o ponto mais claro da capa RENDERIZADA caia pra
 * 3.70:1, furando o piso de 4.5:1 que o veu garante pro resto da pintura. O
 * modelo em CADEIAS nao pegava isso porque so media as manchas de tinta, e
 * quem estourava era o branco da pincelada. O scripts/a11y.mjs agora mede o
 * pixel mais claro da capa de verdade, entao mexer nestes numeros pra cima
 * reprova o build.
 */
const PINCELADAS: Array<React.CSSProperties & { opacity: number }> = [
  {
    top: "-18%",
    left: "24%",
    width: "5px",
    height: "150%",
    transform: "rotate(19deg)",
    filter: "blur(1.5px)",
    opacity: 0.4,
  },
  {
    top: "-24%",
    left: "40%",
    width: "2px",
    height: "160%",
    transform: "rotate(23deg)",
    filter: "blur(1px)",
    opacity: 0.26,
  },
  {
    top: "-20%",
    left: "69%",
    width: "8px",
    height: "150%",
    transform: "rotate(17deg)",
    filter: "blur(2.5px)",
    opacity: 0.3,
  },
  {
    top: "-26%",
    left: "84%",
    width: "3px",
    height: "165%",
    transform: "rotate(21deg)",
    filter: "blur(1px)",
    opacity: 0.18,
  },
];

function CapaPintada({
  className,
  children,
  altura = "min-h-64",
  ...props
}: CapaPintadaProps) {
  return (
    <div
      data-slot="capa-pintada"
      // A capa e uma superficie forte e fixa nos dois temas: por isso ela
      // reatribui --foco pra branco, que e o unico anel que se le em cima da
      // pintura velada.
      data-superficie="capa"
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-capa-quente text-sobre-capa",
        altura,
        className
      )}
      {...props}
    >
      {/* Tinta e veu vivem juntos dentro de uma camada SEM texto nenhum.
          Ficam juntos por causa da medicao: o scripts/a11y.mjs fotografa este
          elemento direto pra descobrir o pixel mais claro que um texto pode
          pegar. A primeira versao do script escondia o conteudo por CSS
          injetado e media o pai; injecao de estilo falhou em silencio e o
          script passou a medir o branco do proprio botao, reportando 1.00:1.
          Uma camada dedicada nao tem como falhar assim. */}
      <div
        data-slot="capa-tinta"
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        {/* O veu de 38% e o piso de contraste, e ele DESSATURA a pintura.
            Compensar no veu quebraria a medicao, entao a compensacao entra na
            tinta: esta camada sobe saturacao e contraste ANTES de passar por
            baixo do veu, e o numero final e conferido no pixel renderizado. */}
        <div
          className="absolute inset-0"
          style={{ filter: "saturate(1.55) contrast(1.08)" }}
        >
          {MANCHAS.map((mancha, i) => (
            <div key={i} className="absolute" style={mancha} />
          ))}
          {PINCELADAS.map(({ opacity, ...pincelada }, i) => (
            <div
              key={i}
              className="absolute origin-center"
              style={{
                ...pincelada,
                borderRadius: "9999px",
                background:
                  "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--sobre-capa) 88%, transparent) 26%, color-mix(in oklab, var(--sobre-capa) 88%, transparent) 68%, transparent 100%)",
                opacity,
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(0 0 0 / var(--capa-veu))` }}
        />
      </div>
      {children}
    </div>
  );
}

export { CapaPintada };
