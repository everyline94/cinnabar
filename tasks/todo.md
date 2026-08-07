# Cinnabar

Design system de tinta preta pura, papel branco, mesa cinza sem tempero e uma
pintura em vermelhão e petróleo. O nome vem do cinábrio, a pedra de onde sai o
pigmento vermelho-alaranjado.

## 1. Fundação

- [x] Fechar a paleta e nomear cada token pelo papel que cumpre
- [x] Medir o contraste de cada par e de cada composto (WCAG 2.x)
- [x] `scripts/auditar-contraste.mjs` commitado, `npm run contraste` reproduz
- [x] Scaffold à mão: package, tsconfig, postcss, next.config, gitignore
- [x] `components.json` escrito à mão (style base-nova, neutral, lucide)
- [x] `styles/tokens.css` com as seis camadas na ordem
- [x] `lib/utils.ts` com `cn` sobre `extendTailwindMerge`
- [x] Nunca rodar `shadcn init`

## 2. Prova de três

- [x] Button vestido (ação preta, pílula, link em brasa)
- [x] Card vestido (sombra no lugar do anel)
- [x] Input vestido (borda de campo em token separado)
- [x] Story de cada um, conferido no claro e no escuro

## 3. O kit inteiro

- [x] Onda 1: label, badge, separator, skeleton, avatar, kbd, textarea
- [x] Onda 2: checkbox, switch, radio-group, select, toggle, toggle-group
- [x] Onda 3: alert, alert-dialog, dialog, sheet, popover, tooltip
- [x] Onda 4: table, tabs, progress, pagination, breadcrumb, scroll-area
- [x] Onda 5: command, combobox, calendar, input-otp, field, input-group,
      button-group, dropdown-menu
- [x] Story por componente, escuro conferido em cada onda
- [x] Tabela puro vs. customizado no README

## 4. A camada da marca

- [x] `Marca` (o logotipo)
- [x] `BotaoAcao` (a única receita de ação forte)
- [x] `ContainerPagina`, `CabecalhoPagina`, `Secao`
- [x] `TileMetrica`, `EstadoVazio`
- [x] `CapaPintada` (o motivo gráfico do sistema, em gradiente)
- [x] `FaixaMetricas` (a régua de KPIs em vidro sobre a capa)
- [x] `ChipVariacao`, `LinhaConta`, `AnelComposicao`, `TileAviso`
- [x] `ToggleTema` e `Toaster`

## 5. Catálogo

- [x] `.storybook/main.ts`, `preview.tsx`, `fontes.css`
- [x] `manager.ts` e `manager-head.html` com a marca
- [x] Story da paleta com contraste impresso
- [x] Story da escala tipográfica
- [x] Story de padrão com uma tela inteira montada só com o sistema
- [x] Conteúdo extraído pra componente irmão, story e vitrine importam o mesmo

## 6. Vitrine

- [x] `app/layout.tsx` com next/font nas mesmas duas fontes
- [x] `app/icon.svg`
- [x] `app/page.tsx` de rolagem longa, só com peças do sistema

## 7. Fechamento

- [x] `scripts/a11y.mjs` e `npm run a11y` com zero violação
- [x] `npx tsc --noEmit` limpo
- [x] `npm run build-site` gera `out/` e `out/catalogo/`
- [x] Conferido servido por `python3 -m http.server`
- [x] Deploy no Vercel, link aberto no navegador nos dois temas:
      https://cinnabar-catalogo.vercel.app
- [x] `git init` e commit
- [x] README curto
