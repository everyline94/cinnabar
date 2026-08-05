import { ArrowUpRight, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BotaoAcao } from "@/components/botao-acao";
import {
  CabecalhoPagina,
  ContainerPagina,
  Secao,
} from "@/components/blocos-pagina";
import { ChipVariacao } from "@/components/chip-variacao";
import { EstadoVazio } from "@/components/estado-vazio";
import { Marca } from "@/components/marca";
import { TileMetrica } from "@/components/tile-metrica";
import { ToggleTema } from "@/components/tema";
import { PaletaConteudo } from "@/stories/fundacao/paleta-conteudo";
import { TipografiaConteudo } from "@/stories/fundacao/tipografia-conteudo";
import { CenaConteudo } from "@/stories/padroes/cena-conteudo";

/**
 * A vitrine.
 *
 * So peças do sistema, nada montado a mao. A paleta, a escala tipografica e a
 * cena principal sao os MESMOS componentes que o catalogo importa: se
 * divergirem, divergem nos dois ao mesmo tempo, que e o unico jeito de nao
 * divergirem em silencio.
 */
export default function Vitrine() {
  return (
    <main className="flex flex-col gap-28 py-14 sm:py-20">
      <ContainerPagina className="flex flex-col gap-12">
        <div className="flex items-center justify-between gap-4">
          <Marca tamanho="md" />
          <ToggleTema />
        </div>

        <CabecalhoPagina
          sobretitulo="Design system"
          titulo={
            <>
              Tinta preta, papel branco e um{" "}
              <span className="text-brasa">pigmento</span> que não pede licença.
            </>
          }
          descricao="O Cinnabar saiu de uma única imagem de referência, medida pixel a pixel. O neutro é absoluto de propósito: é ele que faz o vermelhão saltar da página. Nenhuma cor aqui foi estimada no olho, e nenhum contraste foi chutado."
          acoes={
            // O catalogo NAO e rota do Next: e o build do Storybook assado
            // por cima em out/catalogo/. Com next/link o roteador tenta
            // prefetchar a arvore RSC dessa rota e o console enche de 404.
            // Ancora comum e o caminho certo aqui.
            <Button variant="outline" render={<a href="/catalogo/" />}>
              Abrir o catálogo
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <TileMetrica rotulo="Tokens de cor" valor="30" nota="nomeados pelo papel" />
          <TileMetrica rotulo="Componentes" valor="36" nota="do kit, vestidos" />
          <TileMetrica rotulo="Pares medidos" valor="88" nota="claro e escuro" />
          <TileMetrica rotulo="Violação de axe" valor="0" nota="varrido por script" />
        </div>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="A cena que a referência pedia"
          descricao="Remontada só com peças do sistema. É o único teste que prova que os tokens seguram uma tela inteira, e não apenas um componente isolado numa moldura."
        >
          <CenaConteudo nivelTitulo={2} />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Paleta"
          descricao="Cada token é nomeado pelo papel que cumpre, nunca pela cor que tem. O contraste ao lado foi medido por script, e o mesmo arquivo que alimenta esta lista reprova o build quando um par cai abaixo do mínimo."
        >
          <PaletaConteudo esconderCabecalho />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Tipografia"
          descricao="Instrument Sans no texto e Geist Mono no número. A escala é nomeada pelo papel, e cada degrau já traz entrelinha e espacejamento junto."
        >
          <TipografiaConteudo esconderCabecalho />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Componentes em cena"
          descricao="O kit inteiro fala a língua dos tokens sem que nenhum arquivo de ui tenha sido editado um por um: quem traduz é a ponte no fim do tokens.css."
        >
          <div className="grid items-start gap-5 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Ação e variação</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <BotaoAcao contagem={13}>Ver todos</BotaoAcao>
                  <Button variant="outline">Gerenciar</Button>
                  <Button variant="ghost">Cancelar</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <ChipVariacao valor={30.3} />
                  <ChipVariacao valor={-1.3} />
                  <ChipVariacao valor={56.3} />
                </div>
                <p className="text-corpo text-texto-suave">
                  A ação forte é preta, não colorida. O laranja é pigmento de
                  marca e de pintura: sobre papel ele dá 3.03:1, então preenche
                  e marca, mas nunca escreve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campo e rótulo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="vitrine-limite">Limite mensal</Label>
                  <Input
                    id="vitrine-limite"
                    defaultValue="R$ 2.000,00"
                    className="font-mono"
                  />
                </div>
                <p className="text-corpo text-texto-suave">
                  A borda do campo é um token separado da borda decorativa,
                  calibrado para passar os 3:1 do critério 1.4.11. É a única
                  coisa que diz onde o campo começa.
                </p>
              </CardContent>
            </Card>

            <EstadoVazio
              icone={<Landmark />}
              titulo="Tela sem dado é tela de verdade"
              descricao="O estado vazio ganha o mesmo papel, o mesmo raio e a mesma sombra da tela cheia. O que muda é a densidade, não a superfície."
              acoes={<BotaoAcao seta>Conectar conta</BotaoAcao>}
            />
          </div>
        </Secao>
      </ContainerPagina>

      <ContainerPagina>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-linha pt-8">
          <Marca tamanho="sm" />
          <a
            href="/catalogo/"
            className="text-ui text-texto-suave underline decoration-linha-campo underline-offset-4 hover:text-texto hover:decoration-brasa"
          >
            Catálogo completo, com as stories e o toggle de tema
          </a>
        </footer>
      </ContainerPagina>
    </main>
  );
}
