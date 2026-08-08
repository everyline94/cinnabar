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
 * So pecas do sistema, nada montado a mao. A paleta, a escala tipografica e a
 * tela de exemplo sao os MESMOS componentes que o catalogo importa: se
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
          descricao="Cinábrio é a pedra de onde sai o vermelhão. Cara e venenosa, e os pintores usaram por dois mil anos assim mesmo, porque nada mais era tão vermelho. Fiz o sistema em cima disso: preto, branco e uma cor só. Ela não divide espaço com ninguém."
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
          <TileMetrica rotulo="Pares de contraste" valor="88" nota="medidos, não estimados" />
          <TileMetrica rotulo="Violação de axe" valor="0" nota="varrido por script" />
        </div>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Uma tela inteira, não um componente solto"
          descricao="Componente isolado numa moldura sempre parece bom. Montei um painel financeiro de verdade só com peças daqui, porque é o único jeito de descobrir se os tokens aguentam densidade, ou se eles só funcionam bonito no vazio."
        >
          <CenaConteudo nivelTitulo={2} />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Paleta"
          descricao="Cada token é nomeado pelo papel que cumpre, nunca pela cor que tem. Ninguém precisa saber que --mesa é cinza, precisa saber que é onde o papel se apoia. O contraste ao lado é medido por script, e o mesmo arquivo que alimenta esta lista reprova o build quando um par cai abaixo do mínimo."
        >
          <PaletaConteudo esconderCabecalho />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Tipografia"
          descricao="Instrument Sans no texto e Geist Mono no número. A escala é nomeada pelo papel, não pelo tamanho, e cada degrau já vem com entrelinha e espacejamento. Tamanho sem entrelinha não é um degrau, é uma sugestão."
        >
          <TipografiaConteudo esconderCabecalho />
        </Secao>
      </ContainerPagina>

      <ContainerPagina className="flex flex-col gap-8">
        <Secao
          titulo="Componentes em cena"
          descricao="São 36 componentes do shadcn falando a língua dos tokens sem que eu tenha editado arquivo por arquivo. Quem traduz é a ponte no fim do tokens.css, e é ela que faz trocar uma cor ser uma linha em vez de uma tarde."
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
                  marca: sobre papel ele dá 3.03:1, então preenche e assina, mas
                  nunca escreve. Botão laranja com texto branco reprovaria, e
                  quase todo mundo faz isso mesmo assim.
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
                  calibrado pra passar os 3:1 do critério 1.4.11. Ela é a única
                  coisa que diz onde o campo começa, então não pode ser o mesmo
                  cinza fraquinho que desenha divisória de lista.
                </p>
              </CardContent>
            </Card>

            <EstadoVazio
              icone={<Landmark />}
              titulo="Tela sem dado é tela de verdade"
              descricao="O estado vazio ganha o mesmo papel, o mesmo raio e a mesma sombra da tela cheia. O que muda é a densidade, não a superfície. É a primeira tela que todo mundo vê e a última que alguém desenha."
              acoes={<BotaoAcao seta>Conectar conta</BotaoAcao>}
            />
          </div>
        </Secao>
      </ContainerPagina>

      <ContainerPagina>
        <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-linha pt-8">
          <Marca tamanho="sm" />
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/catalogo/"
              className="text-ui text-texto-suave underline decoration-linha-campo underline-offset-4 hover:text-texto hover:decoration-brasa"
            >
              O catálogo completo, com as stories e o toggle de tema
            </a>
            <a
              href="https://github.com/everyline94/cinnabar"
              className="text-ui text-texto-suave underline decoration-linha-campo underline-offset-4 hover:text-texto hover:decoration-brasa"
            >
              O código no GitHub
            </a>
          </nav>
        </footer>
      </ContainerPagina>
    </main>
  );
}
