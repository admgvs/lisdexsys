# MoreiraMix Pedido Eletronico

MVP web responsivo/PWA para pedido eletronico com catalogo, carrinho, bloco de faltas, importacao Excel/CSV e gestao administrativa.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Supabase Auth + PostgreSQL
- Deploy pronto para Vercel
- PWA instalavel com manifest, icone, service worker e tela offline
- Headers de seguranca e cache PWA configurados no Next.js
- Respostas sensiveis de API com `Cache-Control: no-store`
- `robots.txt` privado para evitar indexacao publica do ERP B2B
- Metadados globais com `noindex,nofollow`
- Endpoint de saude `/api/health` para validar configuracao de ambiente no deploy
- Tela administrativa `/admin/diagnostico` para visualizar o healthcheck no painel e seguir o checklist dinamico de go-live

## Modulos incluidos

- Login e primeiro acesso com tela visual MoreiraMix para ERP e PDV
- Primeiro acesso com validacao local de senha, e-mail normalizado e telefone formatado
- Recuperacao de senha por e-mail em `/recuperar-senha` e redefinicao segura em `/redefinir-senha`
- Redirecionamento pos-login restrito a caminhos internos do app
- Controle de perfis: master, admin, gerente, vendedor, caixa, entregador e cliente
- Minha conta `/minha-conta` com dados do perfil, status de acesso, rotas liberadas e ultimos pedidos vinculados
- Dashboard administrativo
- Importacao de produtos por `.xlsx`, `.xls` ou `.csv`
- Acesso direto a importacao em `Cadastros > Importar produtos`.
- Auditoria de importacoes com busca, filtro de status e previa filtrada por erros
- Exportacao CSV da previa de importacao e do historico filtrado
- Cadastro/listagem de produtos
- Busca, filtros e resumo administrativo de produtos por status, estoque e grupo
- Exportacao CSV dos produtos filtrados para conferencia operacional e backup
- Cadastro `/admin/produtos` e grade `/admin/produtos/grade` carregam e gravam produtos, grupos, marcas, principios, parceiros e lotes pelo `company_id` da empresa ativa; somente `master` pode usar a grade com visao multiempresa.
- Cadastro de clientes e usuarios
- Categorias `/admin/categorias` e transportadoras `/admin/transportadoras` carregam, gravam e atualizam registros pelo `company_id` da empresa ativa.
- Grupos de clientes `/admin/grupos-clientes` e promocoes `/admin/promocoes` carregam, gravam e atualizam dados pelo `company_id` da empresa ativa; promocoes validam produto da empresa antes de salvar e faixas promocionais tambem recebem `company_id`.
- Ficha completa de cliente com dados fiscais, comerciais, endereco detalhado, origem, vendedores, limite de credito e anexos PDF/PNG/JPEG
- Busca e resumo administrativo de clientes e usuarios por status
- Exportacao CSV de clientes e usuarios filtrados
- Criacao administrativa de usuarios com validacao de e-mail e senha inicial
- Perfil `caixa` para usuario operacional restrito ao PDV e Minha conta
- Fundacao multiempresa com tabela `companies`, `company_id` nas tabelas operacionais e empresas iniciais da MoreiraMix
- Painel administrativo de avisos de estoque filtrado por `company_id`, incluindo envio server-side por API/WhatsApp restrito a gestores da empresa ativa.
- Fila de avisos com mensagem de WhatsApp preenchida quando o produto volta ao estoque
- Copia em lote de mensagens prontas para avisos de disponibilidade
- Envio server-side opcional de avisos por API/WhatsApp com token privado
- Exportacao CSV dos avisos de estoque filtrados, incluindo mensagem pronta
- Dashboard administrativo com fila comercial de pedidos pendentes, orcamentos abertos e avisos prontos
- Status de diagnostico do ambiente exibido no dashboard administrativo
- Dashboard administrativo com indicadores de PDV, PIX pendente, PIX vinculado, contas, caixa, estoque, agenda e integracoes
- Canais de venda `/admin/canais-venda` mantem cadastro global dos canais, mas metricas de produtos e pedidos sao calculadas somente com dados do `company_id` da empresa ativa.
- Dashboard administrativo inclui fila de entregas PDV abertas, separadas e na rua no funil operacional
- Checklist administrativo de go-live com status real de importacao, produtos, clientes, usuarios, pedidos, orcamentos, avisos e fila comercial
- Relatorio copiavel de go-live com resumo tecnico e operacional
- Painel administrativo de orcamentos salvos, com consulta, clientes e conversao em pedido sempre restritos ao `company_id` da empresa ativa.
- Exportacao CSV dos orcamentos filtrados com resumo de itens e pedido gerado
- Parceiros / representadas `/admin/parceiros-representadas` carregam, cadastram e atualizam registros pelo `company_id` da empresa ativa.
- Pedidos de parceiros `/admin/pedidos-parceiros` carregam apenas pedidos do `company_id` ativo; a migration `082_partner_orders_company_guardrails.sql` reforca as RPCs de criacao, status e dados operacionais para validar parceiro, cliente, vendedor, produtos, itens e pedido pela empresa ativa.
- PDV `/pdv` para admin e vendedor com caixa livre, busca por codigo/EAN/descricao, desconto, formas de pagamento e baixa transacional de estoque
- PDV exibe subtotal bruto por item e permite editar desconto por percentual ou valor em reais, incluindo valor negativo para acrescimo
- PDV exige recebimento antes de finalizar e permite dividir o valor entre dinheiro, PIX, cartao de debito, cartao de credito, crediario e outros
- No PDV, formas configuradas para nao permitir promocao/oferta continuam liberando a venda do produto, mas removem o desconto promocional e cobram o preco normal; essas formas aparecem com fundo amarelo suave e texto dourado na area de pagamento.
- PDV exige caixa aberto para finalizar venda e vincula a venda/movimento financeiro a sessao de caixa do operador
- PDV organiza a lateral com resumo da venda, recebimentos, finalizacao, acoes rapidas e campos auxiliares em sequencia operacional
- PDV reorganiza o caixa para manter pedido, cliente, vendedor, itens, totais, recebimentos e acoes sempre em leitura direta
- PDV recebeu layout visual escuro com identidade MoreiraMix, sidebar ampla, cards de atendimento e painel de pagamento em destaque
- PDV aprimorado com busca em destaque, estado vazio orientado ao operador, miniaturas de medicamentos, glow visual, total dominante e indicadores farmaceuticos
- PDV possui acao visivel para trocar usuario no cabecalho do caixa
- PDV mostra a empresa ativa no cabecalho, ao lado do operador, para evitar venda na empresa errada em operacao multiempresa
- No PDV, usuario com perfil `caixa` pode selecionar o vendedor responsavel; a cada nova venda o campo volta vazio e a finalizacao exige vendedor informado
- No layout interno do PDV, perfis `vendedor` e `caixa` veem menu reduzido com `Operacao > PDV, Vendas, Pedidos` e `Fiscal > NFC-e`
- Rotas operacionais `/admin/vendas` e `/admin/pedidos` ficam acessiveis para `vendedor` e `caixa` quando chamadas pelo fluxo do PDV, mas acoes de gestao de pedidos, separacao e faturamento permanecem restritas a `admin` e `gerente`.
- Em `/admin/vendas`, `admin` e `gerente` consultam vendas da empresa ativa; `vendedor` e `caixa` recebem filtro complementar por participacao na venda (`vendedor_id` ou `usuario_id`), alem da RLS do Supabase.
- Em `/admin/pedidos`, `admin` e `gerente` consultam pedidos da empresa ativa; `vendedor` e `caixa` recebem filtro complementar por participacao no pedido (`vendedor_id` ou `usuario_id`), alem da RLS do Supabase.
- Separacao `/admin/separacao` e faturamento `/admin/faturamento-entrega` carregam e atualizam apenas pedidos da empresa ativa por `company_id`.
- A lista de vendedores do PDV e carregada por `/api/pdv/sellers`, com validacao do token e filtro server-side por empresa ativa, evitando bloqueio por RLS no navegador para operador `caixa`
- A migration `077_pdv_cashier_seller_selection.sql` alinha a RPC `criar_venda_pdv`: vendedor logado vende em proprio nome, enquanto operador `caixa` usa o vendedor selecionado no PDV desde que pertenca a mesma empresa da sessao de caixa
- A migration `078_pdv_seller_guardrail_health.sql` amplia o diagnostico de caixa para validar se a RPC de venda PDV exige vendedor para operador `caixa` e bloqueia vendedor fora da empresa ativa.
- A migration `081_quote_conversion_company_guardrails.sql` reforca a RPC `converter_orcamento_em_pedido`, validando orcamento, cliente, itens, produtos, pedido e baixa de estoque pelo `company_id` da empresa ativa; para reparo imediato no SQL Editor use `supabase/manual_fixes/repair_quote_conversion_company_guardrails.sql`.
- O consolidado `supabase/manual_fixes/restore_full_sql_from_workspace_20260604.sql` foi regenerado com as migrations `001` a `082`, incluindo guardrails de pedidos de parceiros.
- PDV aplica configuracoes do sistema para estoque negativo, limite de desconto, cliente obrigatorio, PIX identificado, observacao padrao e contingencia NFC-e
- PDV usa menu lateral compacto, mantendo os atalhos operacionais dentro da area principal de acoes rapidas
- Formas de pagamento `/admin/formas-pagamento` respeitam `company_id` e, ao salvar codigo ja existente para a empresa, atualizam/reativam o registro em vez de falhar com duplicidade de `tipo + codigo`, inclusive recuperando erro `23505` quando o insert encontra o indice unico antes da busca preventiva.
- PDV permite marcar venda como retirada no balcao ou entrega, coletando cliente, WhatsApp, endereco, bairro, referencia, taxa, observacao e pagamento na entrega
- Rota `/pdv/finalizar-venda` funciona como checkpoint operacional protegido para `admin`, `gerente`, `vendedor` e `caixa`, apontando para o caixa transacional do PDV e exibindo atalhos apenas para rotas permitidas ao perfil logado.
- Entregas PDV `/admin/entregas` com fila Kanban, filtros em tabela, atribuicao de entregador, Google Maps, copia de rota para WhatsApp e controle por status
- Resumo de rotas por entregador em `/admin/entregas`, com abertas, separadas, na rua, bairros, valor a receber na entrega e roteiro consolidado copiavel para WhatsApp
- Visao mobile de entregas PDV com cartoes de rota para entregador, atalhos de Maps, ligacao, copia de rota e confirmacao
- Em `/admin/entregas` e `/admin/entregas/[id]`, gestores consultam entregas da empresa ativa e entregador consulta apenas a propria rota atribuida; prioridade, agenda e atribuicao ficam restritas a gestores.
- Exportacao CSV das entregas PDV filtradas para conferencia, auditoria e apoio operacional da rota
- Detalhe de entrega `/admin/entregas/[id]` com separacao por item, quantidade conferida, confirmacao de entregue/nao entregue, recebedor e historico de status
- Priorizacao e agendamento simples de entregas PDV por prioridade, data e hora
- Impressao de folha de separacao da entrega com cliente, rota, pagamento, itens, quantidades e campos de assinatura interna
- Suprimentos `/admin/estoque` com entradas, saidas, ajustes, inventario e historico de movimentacoes
- Entrada de mercadorias `/admin/entrada-mercadorias` com recebimentos, documentos de compra, entradas recentes e exportacao CSV
- Inventario `/admin/inventario` com contagem final, divergencias, sobras, faltas e historico exportavel
- Compras `/admin/compras` com recebimento de mercadorias, itens, fornecedor e entrada automatica no estoque
- Estoque, entrada de mercadorias, inventario, lotes e compras filtram produtos, fornecedores, saldos, movimentos, contas vinculadas e compras por `company_id`; a migration `079_inventory_purchase_company_guardrails.sql` reforca as RPCs para bloquear produto/fornecedor fora da empresa ativa.
- Financeiro `/admin/financeiro` com contas a receber, contas a pagar, vencimentos, quitacoes e saldo previsto
- Contas a receber `/admin/contas-receber` com cobrancas, vencidos, quitacao, saldo aberto e exportacao CSV
- Contas a pagar `/admin/contas-pagar` com despesas, fornecedores, vencidos, quitacao, saldo aberto e exportacao CSV
- PIX `/admin/pix` com cobrancas, pagamentos, chave, TXID, payload e quitacao vinculada ao financeiro
- Caixa `/admin/caixa` com livro de entradas, saidas, saldo e movimentos automaticos de contas quitadas
- Configuracoes da empresa `/admin/configuracoes/empresa` com dados fiscais, contato, endereco, logo e mensagens padrao
- Aparencia `/admin/configuracoes/aparencia` com marca, cores, densidade e previa visual do menu
- Sistema `/admin/configuracoes/sistema` com parametros operacionais, numeracao, estoque, financeiro e regras comerciais
- Relatorios `/admin/relatorios` com painel consolidado de vendas, compras, financeiro, caixa, estoque e atalhos para todos os relatorios operacionais
- Relatorios de vendas `/admin/relatorios-vendas` com faturamento, ticket medio, origem comercial, status de pedidos, formas de pagamento fracionadas do PDV e vendas por dia
- Relatorios financeiros `/admin/relatorios-financeiros` com contas, caixa, PIX, origens financeiras, vencidos, fluxo diario e saldo previsto
- Empresas `/admin/empresas` para governanca multiempresa pelo perfil master, cadastro de empresas e definicao da empresa padrao
- Usuarios e permissoes `/admin/usuarios` com criacao de acessos, vinculo de empresa, perfis master, admin, gerente, vendedor, caixa e cliente, e bloqueio de usuarios
- Permissoes `/admin/permissoes` com matriz de acesso por perfil, rotas visiveis do menu, usuarios por papel e alteracao de perfil/status
- Agenda `/admin/agenda` com tarefas, visitas, ligacoes, responsaveis, clientes e status, sempre filtrada e gravada pelo `company_id` da empresa ativa.
- Integracoes `/admin/integracoes` com conectores, endpoints, tokens mascarados e status operacional
- WhatsApp `/admin/integracoes/whatsapp` com conector, endpoint, token mascarado e avisos prontos para envio
- Supabase `/admin/integracoes/supabase` com conector, healthcheck, variaveis, tabelas e colunas criticas
- Planilha Excel/CSV `/admin/integracoes/planilhas` com historico de importacoes, modelo CSV, erros e atalhos de importacao
- Futuras APIs `/admin/integracoes/apis` com backlog de conectores, endpoints planejados, status e exportacao CSV
- Base de conhecimento com Central de Ajuda, categorias, tags, artigos, busca, publico-alvo e bootstrap inicial do MVP
- Integracao com pedido eletronico `/admin/ecommerce/pedido-eletronico` com funil catalogo, carrinho, pedidos e pendencias comerciais
- Produtos publicados `/admin/ecommerce/produtos-publicados` com visao de publicacao no catalogo, pendencias e exportacao CSV
- E-commerce administrativo agrupado em `Comercial > E-commerce`.
- Catalogo digital responsivo com busca, filtros laterais e cards de produto
- Catalogo eletronico `/catalogo-eletronico` para admin e vendedor consultarem produtos publicados, estoque, preco e exportacao CSV
- Placeholder visual para produtos sem imagem
- Aviso de disponibilidade para produtos sem estoque
- Carrinho em `localStorage` com painel lateral "Meu Carrinho"
- Persistencia local resiliente para carrinho e Bloco de faltas, com fallback em memoria quando o navegador bloquear armazenamento
- Copia resiliente de mensagens comerciais, com feedback quando o navegador bloquear a area de transferencia
- Temporizador de carrinho iniciado no primeiro item; se expirar, os itens vao para o Bloco de faltas e o carrinho e limpo.
- Bloco de faltas em `localStorage` para orcamento/lista de compra futura
- Orcamentos do Bloco de faltas salvos no Supabase
- Conversao administrativa de orcamento em pedido com baixa de estoque
- Finalizacao de pedido com resumo para WhatsApp
- Carrinho com resumo de linhas, quantidade, cliente selecionado e WhatsApp apos finalizar
- Carrinho aplica configuracoes do sistema para cliente obrigatorio, pedido minimo, PIX identificado, observacao padrao e regra de estoque negativo
- Geracao de PDF do pedido pela tela de detalhe
- Detalhe de pedido com resumo operacional, contato do cliente e WhatsApp preenchido
- Baixa automatica de estoque ao finalizar pedido
- Devolucao automatica de estoque quando admin cancela pedido
- Gestao e acompanhamento de pedidos
- Busca administrativa de pedidos por numero, cliente, vendedor ou contato
- Vendedor e caixa podem consultar pedidos pelo fluxo operacional do PDV; a alteracao de status, separacao e faturamento seguem como responsabilidade de `admin` e `gerente`.
- A consulta administrativa de pedidos aplica filtro explicito por `company_id` para gestao e por `vendedor_id`/`usuario_id` para perfis operacionais, mantendo a mesma politica usada em Vendas do PDV.
- A lista `/pedidos`, o detalhe `/pedidos/[id]` e o PDF do pedido seguem a mesma regra: gestores acessam pedidos da empresa ativa e perfis operacionais acessam apenas pedidos vinculados ao proprio usuario.
- Exportacao CSV dos pedidos filtrados para conferencia operacional e backup
- Busca e filtro de status em `Meus pedidos`
- Suporte PWA com fallback offline para conexoes indisponiveis
- Telas globais amigaveis para erro inesperado e pagina nao encontrada

## Configuracao local

1. Instale dependencias:

```bash
npm install
```

2. Copie as variaveis de ambiente:

```bash
cp .env.example .env.local
```

3. Preencha `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Opcional para envio de avisos de estoque por API/WhatsApp
WHATSAPP_NOTIFY_ENDPOINT=
WHATSAPP_NOTIFY_TOKEN=
```

4. Execute a migration no Supabase:

- Se o SQL montado no editor do Supabase travar ou perder linhas, reabra o consolidado local `supabase/manual_fixes/restore_full_sql_from_workspace_20260604.sql`, gerado a partir do preflight geral e das migrations `001` a `082`.
- Para banco ja existente, prefira rodar primeiro `supabase/manual_fixes/00_run_first_general_sql_preflight.sql` e depois aplicar apenas o diagnostico/reparo necessario. Use o consolidado completo principalmente para reconstruir o script perdido ou preparar banco novo/teste.
- Na auditoria `supabase/manual_fixes/general_schema_repair_audit.sql`, o status `SKIPPED` para `supabase_migrations.schema_migrations` significa apenas que o SQL Editor nao expoe a tabela interna de migrations do Supabase; isso nao indica que tabelas ou linhas do ERP foram perdidas.
- O diagnostico `supabase/manual_fixes/read_only_42p10_diagnostic.sql` segue a mesma regra e retorna `SKIPPED` quando a tabela interna de migrations estiver oculta, mantendo a verificacao segura para o editor.
- Via Supabase SQL Editor: cole o conteudo das migrations em ordem:
  - `supabase/migrations/001_initial_schema.sql`
  - `supabase/migrations/002_product_real_table_fields.sql`
  - `supabase/migrations/003_order_stock_deduction_rpc.sql`
  - `supabase/migrations/004_order_status_rpc.sql`
  - `supabase/migrations/005_shortage_quotes.sql`
  - `supabase/migrations/006_product_arrival_alerts.sql`
  - `supabase/migrations/007_quote_to_order_conversion.sql`
  - `supabase/migrations/008_extended_client_profile.sql`
  - `supabase/migrations/009_pdv_sales.sql`
  - `supabase/migrations/010_suppliers_categories.sql`
  - `supabase/migrations/011_inventory_movements.sql`
  - `supabase/migrations/012_purchases.sql`
  - `supabase/migrations/013_financial_accounts.sql`
  - `supabase/migrations/014_financial_integrations.sql`
  - `supabase/migrations/015_cash_ledger.sql`
  - `supabase/migrations/016_company_settings.sql`
  - `supabase/migrations/017_agenda.sql`
  - `supabase/migrations/018_pix_transactions.sql`
  - `supabase/migrations/019_integrations.sql`
- Continue aplicando todos os arquivos seguintes em ordem numerica ate a migration mais recente do projeto.
- Ou via Supabase CLI, se estiver usando projeto local/remoto.

5. Rode o projeto:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

Para checar a configuracao do ambiente sem expor segredos, acesse:

```bash
curl http://localhost:3000/api/health
```

Sem autenticacao, o endpoint faz uma checagem publica leve das variaveis obrigatorias de frontend, sem expor a existencia da service role. No painel admin, `/admin/diagnostico` envia a sessao de `master`, `admin` ou `gerente`, valida tambem `SUPABASE_SERVICE_ROLE_KEY`, executa a checagem completa de tabelas, colunas criticas, buckets de Storage (`cliente-documentos`, `product-images` e `documents`) e guardrails de caixa, venda PDV e entregas das migrations, mostrando o checklist operacional de go-live com contadores reais do Supabase.

O healthcheck administrativo tambem separa uma camada de compatibilidade operacional para implantação, validando empresa ativa, empresa padrao, ficha empresarial ou fallback basico, configuracoes `sistema` e `aparencia`, alem dos canais B2B/B2C/BALCAO/WHATSAPP. Essa camada ajuda a identificar bancos parcialmente migrados sem misturar dados-base com erro estrutural.

## Primeiro admin

Crie um usuario no Supabase Auth ou pela tela de primeiro acesso. Depois promova o usuario para admin no SQL Editor:

```sql
update public.usuarios
set perfil = 'admin', status = 'ativo'
where email = 'admin@empresa.com';
```

Com esse admin logado, acesse `/admin/clientes` para cadastrar vendedores, clientes e outros admins. A criacao de usuarios pelo painel usa `SUPABASE_SERVICE_ROLE_KEY` em rota server-side.

## Autenticacao

Rotas:

- `/login`: entrada do ERP, primeiro acesso e redirecionamento seguro por `next`.
- `/recuperar-senha`: solicita envio de link de recuperacao pelo Supabase Auth.
- `/redefinir-senha`: recebe o link de recuperacao e grava a nova senha do usuario.
- `/minha-conta`: exibe perfil, empresa, status e ultimos pedidos do usuario logado.

Regras:

- Caminhos de retorno usam apenas URLs internas iniciadas por `/`.
- Rotas renderizadas dentro do `AppShell` redirecionam usuarios sem sessao para `/login?next=...`.
- Rotas administrativas exibem bloqueio visual premium, com identidade da Central de Personalizacao, quando o perfil nao possui permissao para a area.
- `MASTER` herda acesso administrativo; `GERENTE` possui acesso operacional explicito, sem herdar usuarios, permissoes, empresas e configuracoes sensiveis.
- Senhas precisam ter ao menos 6 caracteres.
- Primeiro acesso cria perfil `cliente`.
- Alteracao administrativa de senha continua disponivel em `/admin/usuarios` para perfis autorizados.

## Importacao de produtos

Rota: `/admin/importar-produtos`

Campos esperados:

```text
codigo, descricao, marca, grupo, estoque, preco, unidade, fabricante,
custo, preco_unitario, desconto_maximo, aplicacao, complemento, ativo
```

Campos adicionais suportados para a planilha real da MoreiraMix:

```text
ean, ean_trib, informacao_adicional, tipo, classificacao,
comissao_percentual, markup, margem_bruta, peso, comprimento,
altura, largura, palavras_chave, catalogo, imagem_url,
lote, data_fabricacao, data_validade, registro_ms_anvisa, local_deposito
```

Obrigatorios:

```text
codigo, descricao, grupo, estoque, preco
```

Regras implementadas:

- A tela oferece o botao `Baixar modelo CSV`, gerado pela rota `/api/modelos/produtos`, com cabecalho e linha de exemplo sempre alinhados aos campos aceitos pelo sistema.
- Produto existente pelo `codigo` e atualizado via upsert.
- Produto inexistente e criado.
- Previa exibida antes da confirmacao.
- Linhas invalidas aparecem com erros.
- Previa filtrada pode ser exportada em CSV para corrigir a planilha fora do sistema.
- Historico salvo em `importacoes`.
- Historico filtrado de importacoes pode ser exportado em CSV.
- Mapeamento visual de colunas para planilhas com nomes reais diferentes.
- Aliases comuns detectados automaticamente, como `Cod`, `Produto`, `Familia`, `Saldo` e `Preco Venda`.
- Aliases da planilha real detectados automaticamente, como `EAN`, `EAN.TRIB`, `Informacao Adicional`, `Comissao (%)`, `Margem Bruta`, `Desc. Max. (%)`, `Palavras Chave`, `Catalogo`/`Cataloto`, `Foto`, `Lote`, `Validade`, `MS`/`Registro ANVISA` e `Local`/`Deposito`.
- Marca e fabricante ficam preservados, mas a marca comercial usa o fabricante como fallback quando a coluna `marca` vier vazia.
- Regras de importacao configuraveis para grupo padrao, unidade padrao, ativo por padrao, grupo em maiusculas e estoque disponivel.

Arquivo de teste:

```text
samples/produtos-moreiramix-exemplo.csv
```

## Importacao ZIP de imagens de produtos

Rota: `/admin/produtos/importar-imagens`

Regras implementadas:

- Upload processado server-side pela API `/api/admin/product-images/import`.
- Apenas `MASTER` e `ADMIN` ativos podem importar imagens.
- Cada arquivo deve usar o codigo do produto no nome. Exemplo: `12345.jpg`.
- Formatos aceitos: JPG, JPEG, PNG e WEBP.
- Limite do ZIP: 100 MB.
- Limite por imagem: 6 MB.
- Limite operacional: ate 2.000 arquivos por ZIP.
- Limite de seguranca: ate 300 MB de volume descompactado declarado.
- Arquivos executaveis, caminhos suspeitos e conteudo com assinatura diferente da extensao sao bloqueados.
- Produtos sao localizados por `company_id` + `codigo`, impedindo atualizacao de outra empresa.
- Imagens sao enviadas para o bucket `product-images` em `{company_id}/{codigo}.{ext}` com substituicao ativada.
- Resultado da importacao e gravado em `image_imports` e `image_import_items`.

## Grade inteligente de produtos

Rota: `/admin/produtos/grade`

Recursos implementados:

- Busca por codigo, descricao, marca e fabricante.
- Filtros por empresa, grupo, marca, status, estoque, e-commerce, promocao e filtros rapidos.
- Edicao direta em tabela ampla no desktop.
- Modo cards editaveis em telas menores.
- Selecao multipla de produtos.
- Acoes em lote para status, catalogo, grupo, marca, reajuste de preco, desconto, estoque e promocao.
- Celulas alteradas recebem destaque visual.
- Card de resumo antes de salvar com produtos e campos afetados.
- Validacao antes de salvar para campos obrigatorios e valores numericos nao negativos.
- Botao para desfazer todas as alteracoes pendentes.
- Salvamento server-side por `/api/admin/products/grid`.
- Log de auditoria em `product_change_logs`.
- A grade carrega produtos, empresas e logs por `company_id` para perfis nao-master; `master` mantem visao consolidada e a API de salvamento valida a empresa de todos os produtos alterados.

## Cadastro de clientes

Rota: `/admin/clientes`

O cadastro administrativo de clientes inclui ficha comercial/fiscal ampliada:

- Identificacao: codigo, nome, fantasia, razao social, tipo pessoa, CNPJ, CPF e documento legado.
- Mascara de CPF/CNPJ e busca automatica do cadastro da pessoa juridica ao preencher o CNPJ.
- Endereco e contato: e-mail, WhatsApp, telefone, site, CEP, endereco, numero, bairro, cidade, UF, codigo municipio e complemento.
- Mascara de CEP e preenchimento automatico de endereco, bairro, cidade, UF e codigo municipio.
- Documentos fiscais: inscricao estadual, inscricao municipal, bombeiros, alvara sanitario e CRF.
- Anexos privados em `cliente-documentos` para PDF, PNG ou JPEG dos documentos fiscais.
- Bucket privado `documents` reservado para novos documentos multiempresa, usando o caminho `documents/{company_id}/...` em uploads server-side.
- Comercial: grupo, perfil fiscal, origem, transportadora, modalidade de frete CIF/FOB, condicao de pagamento, desconto, chave Pix e limite de credito.
- Equipe: vendedor, vendedor 2 e percentuais de comissao.
- Datas: data de cadastro, fundacao, bloqueio e inativacao.
- Exportacao CSV dos clientes filtrados com os dados cadastrais, comerciais e fiscais.

## Grade inteligente de clientes

Rota: `/admin/clientes/grade`

Recursos implementados:

- Busca por codigo, cliente, documento, cidade, e-mail e WhatsApp.
- Filtros por empresa, grupo, status, tipo de pessoa, tipo de cliente e filtros rapidos.
- Edicao direta em tabela ampla no desktop.
- Modo cards editaveis em telas menores.
- Selecao multipla de clientes.
- Acoes em lote para status, PF/PJ, grupo, perfil fiscal, transportadora, condicao de pagamento, desconto, limite de credito e origem.
- Celulas alteradas recebem destaque visual.
- Card de resumo antes de salvar com clientes e campos afetados.
- Validacao antes de salvar para nome obrigatorio, PF/PJ, UF, frete, status e numeros nao negativos.
- Botao para desfazer todas as alteracoes pendentes.
- Salvamento server-side por `/api/admin/clients/grid`.
- Log de auditoria em `client_change_logs`.

## Cadastro de fornecedores e categorias

Rotas:

- `/admin/fornecedores`
- `/admin/categorias`

O ERP agora possui cadastros base para fornecedores e categorias:

- Fornecedores: codigo, nome, fantasia, CNPJ, inscricao estadual, contatos, endereco, condicao de pagamento, observacoes e status.
- Cadastro de fornecedores com mascara de CNPJ/CEP e preenchimento automatico por CNPJ e CEP.
- Parceiros / Representadas: empresas representadas pela MoreiraMix, com preenchimento automatico por CNPJ, politicas comerciais e financeiras, pedido minimo, comissao, prazo de entrega, frete, modelo de faturamento e status.
- Pedidos de parceiros `/admin/pedidos-parceiros` acompanham pedidos apartados por representada, cliente, vendedor, politica comercial/financeira, faturamento, itens e status operacional com atualizacao por RPC `atualizar_status_pedido_parceiro`.
- A tela de pedidos de parceiros tambem permite salvar dados operacionais por RPC `atualizar_dados_pedido_parceiro`: forma de entrega, nota fiscal, rastreio, transportadora, previsao de entrega e observacao.
- Alteracoes em pedidos de parceiros geram auditoria em `parceiro_pedido_historico`, registrando usuario, data/hora, resumo e dados anteriores/novos para status e operacao.
- Catalogo online possui modo `Parceiros`, filtrando produtos representados por representada e finalizando em `parceiro_pedidos` via RPC `criar_pedido_parceiro_com_itens`, sem misturar com pedidos MoreiraMix.
- Analise de parceiros `/admin/analise-parceiros` consolida desempenho por representada: pedidos, abertos, valor em aberto, faturados, entregues, itens, valor total, ticket medio e ultimo pedido, com filtros por periodo/status/faturamento, pendencias comerciais e detalhe por parceiro exibindo ultimos pedidos, produtos em destaque e exportacao CSV por pedidos ou itens da representada.
- Categorias: nome, descricao, tipo (`produto`, `cliente` ou `financeiro`) e status ativo/inativo.
- Ambos possuem busca, filtros, edicao, resumo operacional e exportacao CSV.

## Suprimentos e estoque

Rota: `/admin/estoque`

O modulo de Suprimentos iniciou com controle operacional de estoque:

- Entrada de mercadorias com fornecedor, documento, custo unitario e observacao.
- Entrada de mercadorias mostra compras recebidas, movimentos de estoque e conta a pagar vinculada ao recebimento.
- Saida manual para perdas, ajustes operacionais ou baixa administrativa.
- Ajuste positivo ou negativo com validacao para evitar estoque final negativo.
- Inventario com contagem final, atualizando o saldo do produto.

## Caixa operacional

Rota: `/admin/caixa`

O caixa possui base para abertura e fechamento por sessao:

- Sessao de caixa por terminal e operador, com numero automatico, valor inicial, abertura e fechamento.
- Movimentos vinculados a sessao para abertura, suprimento, sangria, PDV, contas a receber e contas a pagar.
- Vendas finalizadas no PDV entram no fechamento apenas quando existe sessao aberta para o operador.
- Quando o operador logado e `caixa`, o vendedor responsavel deve ser escolhido no PDV a cada nova venda; a sessao de caixa e os movimentos continuam vinculados ao operador logado.
- O PDV diferencia terminal aberto de caixa autorizado: uma sessao aberta em `PDV-01` para outro operador nao libera venda no login atual; a tela exibe o operador dono da sessao para orientar fechamento ou abertura correta.
- Fechamento com conferencia por forma de pagamento, calculando valor esperado, informado e diferenca.
- Historico da sessao para auditoria basica de abertura, movimentos e fechamento.
- A migration `075_cash_session_profile_guardrails.sql` atualiza permissoes de caixa para o modelo multiempresa: `master`, `admin` e `gerente` gerenciam sessoes; `vendedor` e `caixa` operam apenas a propria sessao.
- A migration `076_cash_session_guardrail_health.sql` expoe `cash_session_guardrail_health()` para o Diagnostico validar funcoes, indices unicos e RLS criticos do caixa.
- Validacao pos-importacao em 04/06/2026 confirmou todos os guardrails de caixa ativos no Supabase: abertura, fechamento, sangria/suprimento, movimento manual, perfil real, indices unicos por terminal/operador e RLS de sessoes.
- Historico em `estoque_movimentos`, com produto, fornecedor, usuario, quantidade, saldo anterior, saldo novo e origem.
- Atualizacao transacional de `estoque` e `estoque_disponivel` via RPC `registrar_movimento_estoque`.
- Cadastro de produtos exibe estoque apenas para consulta; alteracoes de saldo devem ser feitas por `Suprimentos > Estoque`.
- Movimentacoes aceitam `Lote -> Deposito -> Quantidade -> Validade`, mantendo historico transacional e saldo por lote/local em `produto_estoque_lotes`.
- Resumo de produtos ativos, estoque total, itens sem estoque, valor estimado e movimentos recentes.
- Busca, filtro por tipo e exportacao CSV dos movimentos filtrados.
- A tela filtra produtos, fornecedores e `estoque_movimentos` pelo `company_id` do perfil logado.
- Entrada de mercadorias `/admin/entrada-mercadorias`, inventario `/admin/inventario` e lotes `/admin/lotes` seguem o mesmo isolamento por `company_id`, incluindo compras recebidas, contas a pagar vinculadas, saldos por lote e movimentos recentes.
- A migration `079_inventory_purchase_company_guardrails.sql` atualiza a RPC `registrar_movimento_estoque` para validar produto, fornecedor, lote/local e movimento sempre pela empresa ativa.

## Compras

Rota: `/admin/compras`

O fluxo de compras permite receber mercadorias de fornecedores e alimentar o estoque:

- Compra com numero, fornecedor, documento, data de emissao e observacao.
- Painel do fornecedor selecionado com CNPJ, contato, condicao de pagamento e atalho para contas a pagar.
- Itens com produto, quantidade e custo unitario.
- Total calculado automaticamente antes do recebimento.
- RPC `receber_compra` cria a compra, grava os itens, atualiza custo do produto quando informado e soma o estoque.
- Cada item recebido tambem grava uma entrada em `estoque_movimentos` com origem `compra`.
- Listagem com busca, resumo operacional e exportacao CSV.
- A tela filtra compras, produtos e fornecedores por `company_id`.
- A migration `079_inventory_purchase_company_guardrails.sql` atualiza a RPC `receber_compra` para gravar `company_id` em `compras`, `compra_itens` e movimentos, bloqueando fornecedor ou produto de outra empresa.

## Financeiro

Rota: `/admin/financeiro`

O modulo financeiro iniciou com controle de contas a receber e contas a pagar:

- Lancamento manual de contas com numero, cliente/fornecedor, descricao, valor, vencimento, forma de pagamento e observacao.
- Abas separadas para contas a receber e contas a pagar.
- Filtros por busca e status (`aberto`, `parcial`, `pago`, `cancelado`).
- Contas a receber identificam origem manual, pedido ou PDV, com filtro especifico para conferencia de vendas.
- Contas a pagar identificam origem manual ou compra, com filtro especifico para conferencia de recebimentos.
- Quitacao manual com RPCs `quitar_conta_receber` e `quitar_conta_pagar`, aceitando pagamento parcial ou total.
- Integracao automatica por gatilhos:
  - Compra recebida gera conta a pagar.
  - Pedido com valor gera conta a receber.
  - Venda PDV finalizada gera conta a receber ja paga.
  - Cancelamento de compra, pedido ou venda cancela o titulo aberto relacionado.
- Resumo de valores abertos a receber, abertos a pagar, saldo previsto e vencidos.
- Exportacao CSV dos lancamentos filtrados.
- A tela `/admin/financeiro` usa visual dark premium com atalhos executivos, KPIs financeiros, formulario tematico, abas de recebiveis/pagaveis e tabela escura conectada a Central de Personalizacao.
- As telas dedicadas `/admin/contas-receber` e `/admin/contas-pagar` tambem usam visual dark premium, mantendo KPIs, filtros, baixa parcial, exportacao CSV e origem dos titulos em badges semanticos.

## PIX

Rota: `/admin/pix`

O modulo PIX controla cobrancas e pagamentos:

- PIX de recebimento ou pagamento com TXID unico.
- Chave PIX, valor, vencimento, descricao, observacao e payload copiavel.
- Vinculo opcional com conta a receber, conta a pagar, cliente ou fornecedor.
- Filtro e etiqueta de vinculo para separar PIX de conta a receber, conta a pagar e PIX manual/solto.
- Ao marcar PIX vinculado como pago, a conta financeira relacionada e quitada via RPC.
- Status pendente, pago e cancelado.
- Resumo de pendentes, valores a receber, recebidos e pagos.
- Exportacao CSV das transacoes filtradas.
- A chave PIX e carregada da ficha da empresa por `company_id` e, quando o banco ainda esta no formato legado da migration 016, usa fallback por `id`, sem bloquear a listagem financeira.

## Caixa

Rota: `/admin/caixa`

O livro caixa registra entradas e saidas financeiras:

- Movimento manual de entrada ou saida com descricao, valor, forma de pagamento, data e observacao.
- Movimentos automaticos quando uma conta a receber ou a pagar e quitada.
- Vendas PDV finalizadas entram no caixa com origem `PDV` quando o titulo financeiro pago e gerado.
- Resumo de entradas, saidas, saldo em caixa e movimentos manuais.
- Caixa destaca movimentos automaticos, PDV e origem colorida de cada lancamento.
- Caixa separa recebimentos fracionados do PDV por forma para conferencia financeira.
- Busca, filtros por tipo/origem e exportacao CSV.
- A tela `/admin/caixa` usa visual dark premium com KPIs, abertura/fechamento de sessao, sangria, suprimento, recebimentos por forma, movimento manual e tabela de movimentos com badges semanticos.
- Decisao arquitetural: a operacao de caixa usa o perfil real do usuario no banco; gestores podem administrar sessoes e operadores ficam restritos ao proprio caixa aberto.

## Vendas do PDV

Rota: `/admin/vendas`

A tela de Vendas do PDV consolida auditoria e reimpressao das vendas realizadas no atendimento:

- Filtros por periodo, status e busca textual por venda, cliente, vendedor, forma de pagamento ou produto.
- Metricas de vendas filtradas, valor total, itens vendidos e canceladas.
- Tabela executiva escura com selecao de venda e acao rapida de reimpressao.
- Painel lateral com cliente, vendedor, pagamento, status, itens, subtotal, desconto, total e observacao.
- Exportacao CSV das vendas filtradas.
- Reimpressao usa `buildPdvSalePrintHtml` e a Central de Personalizacao para aplicar marca, cores e informacoes visuais configuradas.
- O comprovante de reimpressao do PDV usa layout de cupom termico com cabecalho, identificacao da venda, descricao dos itens, detalhes de item e totais em hierarquia visual de negrito/italico para facilitar leitura e conferencia.
- A tela usa visual dark premium alinhado aos paineis administrativos recentes.
- A consulta aplica filtro explicito por `company_id` para gestao e por `vendedor_id`/`usuario_id` para perfis operacionais, evitando depender apenas da RLS em bancos parcialmente migrados.

## Pedidos Operacionais

Rota: `/admin/pedidos`

A gestao de pedidos fica disponivel como consulta operacional para o fluxo do PDV:

- `admin` e `gerente` consultam os pedidos da empresa ativa.
- `vendedor` e `caixa` consultam apenas pedidos em que participaram como `vendedor_id` ou `usuario_id`.
- Alteracao de status, links para separacao e faturamento continuam restritos a `admin` e `gerente`.
- A consulta aplica `company_id` e participacao diretamente na UI, reforcando a RLS do Supabase e mantendo comportamento previsivel em bancos parcialmente migrados.
- O detalhe `/pedidos/[id]` e a geracao de PDF aplicam a mesma politica de empresa e participacao; a API server-side do PDF nao libera pedidos de outra empresa para gestores.
- Separacao e faturamento seguem a mesma politica de empresa ativa: `/admin/separacao` filtra `pedidos` e `pedido_separacao_itens` por `company_id`, enquanto `/admin/faturamento-entrega` filtra e grava dados fiscais/logisticos somente no pedido da empresa do perfil logado.

## Entregas PDV

Rotas: `/admin/entregas`, `/admin/entregas/[id]`, `/pdv/finalizar-venda`

O controle inicial de entregas do PDV cobre a operacao simples e funcional:

- Fechamento da venda no PDV com escolha entre retirada no balcao e entrega.
- Entrega coleta cliente/recebedor, telefone/WhatsApp, endereco, bairro, referencia, taxa, observacao e indicador de pagamento na entrega.
- Toda venda marcada como entrega atualiza `pdv_vendas` com `delivery_required`, `delivery_status`, `delivery_fee` e `delivery_notes`, cria registro em `deliveries`, cria itens em `delivery_items` e registra historico em `delivery_status_logs`.
- Painel Kanban por status: pendente, separacao, separado, saiu e entregue.
- Tabela operacional com filtros por data, status, bairro, entregador, forma de pagamento e cliente.
- Resumo operacional por entregador para gestores, calculado sobre a visao filtrada, mostrando carga aberta, separadas, na rua, bairros, pagamentos a receber na entrega e roteiro consolidado para WhatsApp.
- Exportacao CSV da visao filtrada, incluindo venda, cliente, telefone, status, prioridade, agenda, entregador, endereco, pagamento, taxa, recebedor e observacao.
- Tela de detalhe com conferencia de quantidade por item, marcador de conferido, atribuicao de entregador, link do Google Maps, copia de rota para WhatsApp e confirmacao de entrega.
- Em telas pequenas, a listagem e o detalhe exibem cartoes e atalhos de rua para entregador, preservando as mesmas rotas `/admin/entregas` e `/admin/entregas/[id]`.
- A UI reforca o escopo da RLS: `master`, `admin` e `gerente` carregam entregas por `company_id`; `entregador` carrega apenas registros com `delivery_person_id` igual ao proprio usuario.
- A alteracao de prioridade, agenda e atribuicao de entregador e funcao de gestor; entregador atribuido pode conferir itens, copiar rota e atualizar status/confirmacao da propria entrega.
- Priorizacao e agendamento usam `deliveries.priority`, `scheduled_date` e `scheduled_time`, evitando nova tabela de roteirizacao nesta fase do MVP.
- Impressao operacional da folha de separacao para conferencia fisica antes da saida para entrega.
- Regras aplicadas na UI e no banco: entrega so pode ser marcada como separada com todos os itens conferidos, so sai para rua quando estiver separada, entrega entregue exige recebedor e registra `delivered_at`, entrega nao entregue exige motivo, exclusao de entrega vinculada a venda nao e exposta, e tudo respeita `company_id`.
- A migration `069_delivery_status_guardrails.sql` reforca no banco as transicoes criticas de entrega e sincroniza `pdv_vendas.delivery_status`, evitando depender apenas da interface.
- A migration `070_delivery_person_profile.sql` adiciona o perfil `entregador` e restringe a fila: gestores veem/alteram entregas da empresa, entregador ativo ve/atualiza apenas entregas atribuidas, e vendedor/caixa seguem autorizados a criar entrega no fechamento do PDV.
- A migration `071_delivery_item_check_guardrails.sql` impede quantidade conferida maior que a solicitada e bloqueia status `separado`, `saiu_entrega` e `entregue` quando houver item pendente de conferencia.
- A migration `072_delivery_status_log_trigger.sql` grava historico de mudanca de status diretamente no banco em updates de `deliveries`, mantendo o log inicial do PDV apenas na criacao da entrega.
- A migration `074_delivery_confirmation_guardrails.sql` exige recebedor para `entregue` e motivo para `nao_entregue`, evitando confirmacao final sem evidencia operacional minima.
- A migration `080_delivery_updated_at_trigger_fix.sql` corrige os triggers `deliveries_set_updated_at` e `delivery_items_set_updated_at` para atualizarem `updated_at`, evitando o erro `record "new" has no field "atualizado_em"` ao alterar status, prioridade, entregador ou conferencia. Em bancos ja importados, o reparo isolado `supabase/manual_fixes/repair_delivery_updated_at_triggers.sql` pode ser executado diretamente no SQL Editor.
- Validacao pos-importacao das migrations em 04/06/2026 confirmou `delivery_status_guard_trigger`, `delivery_sale_sync_trigger`, `delivery_status_log_trigger`, `delivery_item_check_trigger`, `delivery_item_quantity_constraint`, `delivery_permission_functions` e `delivery_item_full_check_function` ativos no Supabase.
- A migration `073_delivery_guardrail_health.sql` expõe o resumo dos triggers, constraints e funcoes de entrega para o healthcheck admin.
- Decisao arquitetural: o projeto usa `pdv_vendas` como tabela real de vendas PDV, por isso os campos solicitados para `sales` foram aplicados em `pdv_vendas`.
- Decisao arquitetural: entregador virou perfil operacional proprio, em vez de reutilizar vendedor/caixa, para separar venda, caixa e logistica sem criar uma matriz granular de permissoes antes do MVP.
- Decisao arquitetural: a experiencia mobile do entregador fica dentro das rotas administrativas existentes do PWA, evitando um segundo app de entregas antes do MVP e mantendo RLS, logs e layout compartilhados.
- Decisao arquitetural: o resumo por entregador e o roteiro copiavel usam agregacao client-side da fila ja carregada, sem criar tabela de roteirizacao antes do MVP; roteirizacao formal fica para fase posterior.
- Decisao arquitetural: logs de alteracao de status de entregas sao responsabilidade do banco, nao das telas, para evitar historico ausente em atualizacoes fora da interface e reduzir falhas parciais entre update e auditoria.
- Decisao arquitetural: nesta primeira fase a taxa de entrega fica registrada separadamente em `pdv_vendas.delivery_fee` e `deliveries.delivery_fee`, sem compor automaticamente `valor_total` da venda; a integracao fiscal/financeira da taxa fica para etapa posterior.
- Decisao arquitetural: a confirmacao final fica concentrada em `/admin/entregas/[id]`, pois os status `entregue` e `nao_entregue` precisam capturar recebedor ou motivo; a listagem serve para avanco de fluxo e roteirizacao.
- Decisao arquitetural: `/pdv/finalizar-venda` permanece como checkpoint e atalho operacional protegido pelos mesmos perfis do PDV; seus atalhos respeitam permissoes do usuario para evitar botoes que levam a acesso restrito. A unica fonte transacional de finalizacao e a tela `/pdv` usando a RPC `criar_venda_pdv`, evitando dois fluxos concorrentes de baixa de estoque, caixa e entrega.
- Foto, assinatura e rastreamento em tempo real permanecem fora do MVP inicial e foram preservados como evolucao futura.

## Configuracoes da empresa

Rota: `/admin/configuracoes/empresa`

O ERP possui uma ficha central da empresa:

- Dados fiscais: razao social, nome fantasia, CNPJ, inscricoes e regime tributario.
- Contato: e-mail, telefone, WhatsApp, website e chave Pix.
- Endereco completo com CEP, numero, bairro, cidade, UF e complemento.
- Busca automatica de endereco pelo CEP na ficha da empresa.
- Logo por URL e mensagem padrao de pedido.
- Tabela singleton `configuracoes_empresa` para uso futuro em PDFs, pedidos e documentos.
- Tabela generica `configuracoes` para chaves administrativas futuras.
- A tela usa superficie dark premium e componentes compartilhados conectados a Central de Personalizacao, mantendo consistencia com Sistema e Aparencia.
- A tela tenta salvar primeiro no formato multiempresa de `configuracoes_empresa` por `company_id`; se o banco ainda estiver no formato legado da migration 016, tenta salvar a ficha completa por `id`; se a tabela nao estiver disponivel, usa fallback seguro em `companies` para dados basicos (`razao_social`, `nome_fantasia` e `cnpj`).

## Multiempresa

O ERP nasce preparado para operar multiplas empresas no mesmo sistema e no mesmo banco de dados.

- Tabela central: `companies`.
- Tela administrativa: `/admin/empresas`.
- Todas as tabelas operacionais passam a possuir `company_id`.
- A empresa padrao inicial e usada para registros existentes e novos cadastros sem selecao explicita.
- Chaves unicas relevantes foram preparadas por empresa, permitindo que cada empresa tenha seus proprios codigos, numeracoes e configuracoes.
- As configuracoes passam a ser preparadas por empresa, incluindo `configuracoes_empresa` e `configuracoes`.
- Funcoes auxiliares: `default_company_id()`, `current_company_id()`, `current_user_is_master()` e `current_user_can_access_company(company_id)`.
- Isolamento RLS por empresa: a migration `059_multi_company_rls_isolation.sql` adiciona policies restritivas por `company_id`, mantendo `MASTER` com acesso global.
- Compatibilidade de perfis no banco: `MASTER` e `GERENTE` sao tratados como nivel administrativo nas policies antigas por meio de `current_user_profile()`, enquanto `current_user_actual_profile()` preserva o perfil real, incluindo `ENTREGADOR`.
- A tela `/admin/empresas` usa visual dark premium com cards executivos, formulario tematico, tabela escura e bloqueio visual consistente para perfis diferentes de `MASTER`.

Empresas iniciais:

- Empresa 1: MBS Comercio de Medicamentos Ltda.
- Empresa 2: MoreiraMix Marketing e Representacoes Ltda.

Niveis de acesso:

- `MASTER`: acesso global, preparado para administrar todas as empresas.
- `ADMIN`: administracao completa da empresa vinculada.
- `GERENTE`: gestao operacional e relatorios da empresa vinculada.
- `VENDEDOR`: vendas, catalogo, pedidos e PDV conforme permissao.
- `CAIXA`: perfil operacional mantido para compatibilidade do PDV.
- `ENTREGADOR`: visualiza entregas atribuidas, abre rota e confirma status de entrega.
- `CLIENTE`: catalogo, carrinho e pedidos vinculados.

Novas empresas poderao ser cadastradas futuramente sem alterar a estrutura do banco.

## Central de Personalizacao

Rota: `/admin/configuracoes/aparencia`

A Central de Personalizacao e a fonte oficial de identidade visual do ERP. A regra arquitetural do MVP e manter defaults e normalizacao em `src/lib/appearance.ts`, evitando que login, shell, dashboard, impressoes e futuras telas dupliquem regras de marca.

A configuracao visual permite ajustar:

- Identidade visual: nome da marca, subtitulo, iniciais, logos, favicon, slogan e contatos.
- Cores e temas: cor principal, secundaria, menu, destaque, status de sucesso, alerta e erro.
- Layout: menu lateral, cabecalho, dashboard, densidade, raio, fonte e tamanho base.
- Componentes: botoes, cards, tabelas e formularios com variantes premium, glass, neomorphism, outline e enterprise.
- Relatorios e impressoes: cabecalho, rodape, slogan, redes sociais, QR Code e estilo de impressao.
- Login e portal: fundo, mensagem de entrada, titulo do portal, subtitulo e parametros mobile/PWA.
- Pre-visualizacao local antes de salvar.

Aplicacoes ja conectadas:

- Login publico carrega marca, slogan, mensagem, cores e fundo quando a configuracao estiver disponivel.
- Recuperacao e redefinicao de senha carregam marca, cores e destaque configurados para manter a experiencia de autenticacao consistente.
- `AppShell` administrativo aplica cores, fonte, densidade, raio, menu e estilos de componentes.
- Loja B2C publica `/loja` carrega marca, cores, titulo do portal, subtitulo e mensagem da Central de Personalizacao.
- Manifest PWA dinamico `/api/manifest`, metatags mobile e favicon em runtime usam nome, subtitulo, cores e icone mobile/favicon/logo definidos na Central de Personalizacao.
- Central de Ajuda `/ajuda` carrega marca e cores da Central de Personalizacao para manter a experiencia unificada.
- Estado global de pagina nao encontrada usa marca e cores configuradas, mantendo consistencia mesmo em falhas de rota.
- Estado global de erro inesperado usa marca e cores configuradas, mantendo consistencia em falhas de renderizacao.
- Estados de acesso restrito, usuario inativo e perfil ausente usam marca e cores configuradas.
- Estado compartilhado de carregamento usa variaveis da Central de Personalizacao quando disponiveis, com fallback premium MoreiraMix.
- Estado compartilhado de lista vazia usa variaveis da Central de Personalizacao quando disponiveis, com fallback premium MoreiraMix.
- Alertas compartilhados usam variaveis da Central de Personalizacao quando disponiveis, preservando tons de informacao, sucesso, erro e aviso.
- Botao compartilhado `Button` usa variantes premium conectadas as variaveis da Central de Personalizacao quando disponiveis, preservando estilos locais quando a tela define superficie propria via `className`.
- Campos compartilhados `Field` e `inputClass` usam superficie dark premium, labels claros e foco conectado ao destaque da Central de Personalizacao.
- Dashboard administrativo respeita toggles de indicadores, financeiro, contas, estoque critico e ultimos pedidos.
- PDF de pedido, PDF do bloco de faltas e reimpressao do PDV usam marca, slogan, rodape, redes sociais e QR Code quando configurados.
- A Central tenta salvar primeiro no formato multiempresa de `configuracoes` por `company_id + chave`; se o banco ainda estiver no formato legado da migration 016, salva por `chave`. O hook `useAppearance` tambem carrega primeiro por empresa e depois por chave legado.
- O PDF de pedido tambem carrega aparencia por empresa e cai para a chave legada quando `configuracoes.company_id` ainda nao estiver disponivel.

Decisao arquitetural:

- Toda nova tela visual ou documento imprimivel deve consumir `normalizeAppearance` de `src/lib/appearance.ts`.
- Todo componente client-side que precisar carregar a configuracao visual deve usar `useAppearance` em `src/hooks/use-appearance.ts`, com `companyId` para telas autenticadas ou `publicFallback` para login/loja publica.
- Metadados e recursos server-side publicos devem usar fallback seguro via `defaultAppearance`; quando precisarem de configuracao publicada, podem usar `getSupabaseAdmin` com `Cache-Control: no-store`, como em `/api/manifest`. Metatags client-side devem ser sincronizadas por `PwaAppearanceSync`.
- Nao criar novos defaults locais de marca sem necessidade. Quando houver lacuna de configuracao, usar `defaultAppearance`.
- Campos ainda nao suportados por uma tela podem ser salvos normalmente, mas a conexao deve ser feita de forma incremental e documentada nesta secao.

## Sistema

Rota: `/admin/configuracoes/sistema`

Os parametros operacionais ficam salvos na chave `sistema` da tabela `configuracoes`:

- Ambiente de homologacao ou producao.
- Prefixos de pedido, orcamento e PDV.
- Fuso horario operacional.
- Dias de vencimento padrao e janela de backup operacional.
- Regras de estoque minimo e estoque negativo.
- Desconto maximo padrao e comissao padrao.
- Bloqueio de cliente inativo, exigencia de cliente no pedido e pedido minimo.
- Exigencia de PIX identificado e controle de PDV/NFC-e em contingencia.
- Observacao padrao para atendimento e pedidos.
- A tela usa superficie dark premium, cards executivos, toggles escuros e componentes compartilhados conectados a Central de Personalizacao.
- A tela tenta salvar primeiro no formato multiempresa de `configuracoes` por `company_id + chave`; se o banco ainda estiver no formato legado da migration 016, salva por `chave`.
- PDV e carrinho tambem leem a chave `sistema` primeiro por `company_id + chave` e depois por `chave`, mantendo regras operacionais ativas durante a transicao de migrations.

## Relatorios

Rota: `/admin/relatorios`

O painel consolidado de relatorios acompanha:

- Faturamento por pedidos e PDV.
- Compras recebidas no periodo.
- Contas abertas a receber e a pagar.
- Saldo do caixa por entradas e saidas.
- Produtos ativos e produtos sem estoque.
- Vendas por dia e produtos mais movimentados.
- Ultimos pedidos, compras e movimentos de caixa.
- Filtro por periodo e exportacao CSV do resumo geral.
- A aba Relatorios agrupa Painel geral, Relatorio de vendas, Relatorio financeiro, Vendas do PDV, Avisos de estoque e Diagnostico do ERP.
- Painel geral `/admin/relatorios` usa visual dark premium com atalhos executivos, KPIs comerciais/financeiros/logisticos, barras de desempenho e resumos recentes em superficies escuras.
- Relatorios de vendas `/admin/relatorios-vendas` usa visual dark premium com KPIs comerciais, funil operacional, canais B2B/B2C/Balcao/WhatsApp, vendas por dia, ultimos pedidos, ultimas vendas PDV e quebras executivas em superficies escuras.
- Avisos de estoque `/admin/avisos-estoque` usa visual dark premium com KPIs de demanda, ponte para WhatsApp, filtros, tabela escura e acoes de copia, notificacao, cancelamento e envio por API.
- Relatorios financeiros `/admin/relatorios-financeiros` usa visual dark premium com KPIs executivos, aging de recebiveis/pagaveis, fluxo de caixa diario, resumo de PIX e tabelas de pendencias em superfícies escuras.

## Usuarios e permissoes

Rota: `/admin/usuarios`

O controle de acessos possui uma tela dedicada:

- Criacao administrativa de usuarios com nome, e-mail, telefone, senha inicial, perfil e status.
- Perfis disponiveis: master, admin, gerente, vendedor, caixa, entregador e cliente.
- Usuarios podem ser vinculados a uma empresa por `company_id`; usuarios criados por admin seguem a empresa do proprio admin, enquanto master pode escolher a empresa.
- A listagem administrativa de usuarios usa `/api/admin/users` com service role no servidor e filtro por permissao do operador, evitando que um cadastro valido fique invisivel por alguma policy RLS do navegador.
- A criacao administrativa e idempotente para e-mails ja existentes: se o usuario estiver no Supabase Auth ou na tabela `usuarios`, a API recupera o cadastro, atualiza senha/perfil/status e recria o vinculo publico ausente quando permitido pela empresa do operador.
- O e-mail do proprio usuario logado nao pode ser usado para criar outro acesso; para criar um vendedor, o e-mail precisa ser diferente porque o Supabase Auth mantem e-mail unico.
- Antes de rodar scripts SQL acumulados no Supabase, execute primeiro e isoladamente `supabase/manual_fixes/00_run_first_general_sql_preflight.sql`. Ele cria `pgcrypto` se necessario, normaliza constraints conhecidas (`usuarios.perfil` e `caixa_movimentos.origem`) e reduz falhas por ordem de migrations.
- Se o Supabase acusar violacao de `usuarios_perfil_check`, o reparo especifico `supabase/manual_fixes/00_run_first_unlock_usuarios_perfil_check.sql` tambem pode ser usado antes de reaplicar qualquer script acumulado; ele normaliza aliases como `caix`, `administrador` e valores em maiusculas para os perfis oficiais. O conjunto canonico final de perfis e `master`, `admin`, `gerente`, `vendedor`, `caixa`, `entregador` e `cliente`; migrations antigas que recriam o constraint tambem foram alinhadas para essa lista.
- Edicao rapida de perfil e status.
- Busca por nome, e-mail, telefone ou perfil.
- Filtros por perfil e status.
- Resumo de usuarios, ativos, admins, vendedores e clientes.
- Resumo de rotas visiveis por perfil usando o mesmo menu lateral do ERP.
- Lista de usuarios com perfil, quantidade de rotas visiveis e grupos liberados.
- Exportacao CSV dos usuarios filtrados.
- Permissoes `/admin/permissoes` usa visual dark premium com matriz de perfis, rotas liberadas, metricas executivas e tabela escura conectadas a linguagem da Central de Personalizacao.
- Decisao arquitetural: e-mail continua unico no Auth, entao o ERP nao tenta duplicar acesso; a tela `/admin/usuarios` trata novo cadastro com e-mail repetido como recuperacao/reativacao operacional, respeitando `company_id` e permissao `MASTER` para trocar empresa, mas bloqueia o e-mail da propria sessao para evitar autoalteracao acidental.
- Decisao operacional: toda correcao estrutural de SQL deve ser salva em `supabase/migrations` ou `supabase/manual_fixes` e registrada no `README.md` e `CHANGELOG.md` no mesmo ciclo, evitando reparos soltos que se perdem entre execucoes.

## Agenda

Rota: `/admin/agenda`

A agenda organiza a rotina comercial e administrativa:

- Eventos dos tipos tarefa, reuniao, ligacao, visita, financeiro e outro.
- Status pendente, concluido e cancelado.
- Prioridade baixa, media e alta.
- Vinculo opcional com cliente e responsavel.
- Admins visualizam e atribuem para toda equipe; vendedores acessam a propria agenda.
- Filtros por status, tipo e busca textual.
- Resumo de eventos pendentes, de hoje e atrasados.
- Exportacao CSV dos eventos filtrados.

## Auditoria e Logs

Rota: `/admin/logs`

O painel de auditoria consolida eventos operacionais recentes:

- Logs de alteracao da grade inteligente de produtos.
- Logs de alteracao da grade inteligente de clientes.
- Historico de tabelas auxiliares, com usuario quando disponivel.
- Filtro por fonte, busca textual e exportacao CSV.
- Metricas executivas por origem de evento.
- Visual dark premium conectado as variaveis da Central de Personalizacao.

## Integracoes

Rota: `/admin/integracoes`

O cadastro de integracoes organiza conectores internos e externos:

- Tipos: WhatsApp, Supabase, planilha, e-commerce, financeiro, API e outro.
- Status ativa, inativa ou erro.
- Endpoint, token mascarado, descricao, ultimo status e ultima sincronizacao.
- Registros iniciais para WhatsApp, Supabase, Planilha Excel/CSV e Futuras APIs.
- Ativacao/inativacao rapida e edicao completa.
- Busca, filtros por tipo/status e exportacao CSV.

## Base de conhecimento

Objetivo: manter uma Central de Ajuda integrada ao ERP MoreiraMix, com conteudo operacional por empresa para usuarios internos e clientes.

Tabelas:

- `knowledge_categories`
- `knowledge_articles`
- `knowledge_tags`

Rotas:

- `/ajuda`
- `/admin/base-conhecimento`

Funcionalidades atuais:

- Cadastro administrativo de categorias, tags e artigos.
- Status de artigo: rascunho, publicado e arquivado.
- Publico-alvo por artigo: interno, cliente ou todos.
- Busca por titulo, resumo, conteudo, categoria e tags.
- Video de apoio opcional por artigo.
- Central `/ajuda` filtrada por perfil do usuario autenticado.
- Bootstrap administrativo idempotente para publicar a base inicial do MVP por empresa.

Decisao arquitetural:

- O conteudo pertence a uma empresa via `company_id` e respeita RLS multiempresa.
- O botao `Gerar base inicial` em `/admin/base-conhecimento` usa `upsert` por `company_id + slug`, evitando duplicidade ao executar novamente.
- Artigos do bootstrap cobrem primeiros passos, pedido eletronico, PDV/caixa e checklist administrativo de go-live.
- A integracao com assistente IA continua fora do MVP atual; a base textual ja prepara o conteudo para essa evolucao.
- A rota `/ajuda` usa a Central de Personalizacao para marca e cores, mantendo consistencia visual com login, loja, dashboard e PWA.

## Cadastro de produtos

Rota: `/admin/produtos`

O cadastro manual de produtos tambem acompanha os campos da planilha real:

- Identificacao: codigo, EAN, EAN tributario, descricao, tipo, classificacao fiscal, grupo, marca, fabricante, unidade, catalogo e MS/Registro ANVISA.
- Marca comercial e fabricante aparecem juntos: marca e usada no catalogo/filtros, fabricante fica preservado como origem/industria e vira fallback quando marca estiver vazia.
- Representacao/parceiro: produto pode ser classificado como `MoreiraMix` ou `Parceiro / Representada`, com vinculo a empresa representada, produto representado, comissao e prazo comercial especificos.
- Estoque e precos: estoque e estoque disponivel ficam somente para consulta, com quadro de estoque atual por deposito, lote, quantidade, validade, fabricacao e GS1-128; precos seguem editaveis no cadastro.
- No formulario manual, `preco_unitario` + `desconto_maximo` recalculam o `preco`; `preco`, `preco_unitario` e `custo` atualizam desconto, markup e margem bruta quando possivel.
- Dimensoes: peso, comprimento, altura e largura.
- Textos complementares: aplicacao, complemento, informacao adicional e palavras chave.
- Imagem: URL da imagem, com placeholder automatico no catalogo quando vazio.
- Principios ativos: cadastro reutilizavel e vinculo multiplo por produto, permitindo combinacoes como Paracetamol, Carisoprodol, Cafeina e Diclofenaco Sodico sem redigitar em cada cadastro.
- Listagem administrativa com busca por codigo, EAN, descricao, marca, fabricante, grupo, origem, parceiro/representada, tipo, classificacao, catalogo, palavras chave, lote, local/deposito, principio ativo e MS/Registro ANVISA.
- Lote e local/deposito no cadastro do produto funcionam como referencia principal. Produtos com multiplos lotes ou multiplos depositos usam controle de saldos por lote/local em `Suprimentos > Estoque`.

## Catalogo atual

Rota: `/catalogo`

O catalogo esta em fase de evolucao comercial, com layout mais proximo de um pedido B2B:

- Barra superior de acoes com `Todos`, `Digite seu pedido`, `Meus pedidos`, `Bloco de faltas`, `Cupons` e `Ofertas exclusivas`.
- O botao `Digite seu pedido` abre um painel de pedido rapido por codigo, EAN ou descricao, com sugestoes, envio direto para o carrinho e inclusao em lote por linhas `codigo quantidade`.
- O botao `Cupons` filtra produtos com desconto cadastrado e resume a maior condicao comercial disponivel.
- O botao `Ofertas exclusivas` filtra produtos com `desconto_maximo` cadastrado e mostra a contagem real de ofertas.
- Tema Indigo vivido `#1800ad` na barra principal e nos botoes de adicionar produtos.
- Estado ativo/hover em `#120078`.
- Busca por codigo, descricao, marca e principio ativo.
- Filtros laterais por marcas, principio ativo, grupos e top vendas com base nos itens de pedidos acessiveis ao usuario.
- Cards responsivos em ate 3 colunas no desktop, exibindo imagem, codigo, marca, descricao, preco, estoque, informacoes do produto e botao de adicionar.
- A exibicao comercial de preco usa `preco_unitario` como valor "De" quando ele for maior que `preco`, `preco` como valor "Por" e `desconto_maximo` como selo percentual.
- O seletor de quantidade no card aparece somente depois que o produto entra no carrinho ou no bloco de faltas.
- O botao `Informacoes` abre um modal com detalhes comerciais e cadastrais do produto.
- Produtos sem `imagem_url` usam o placeholder `public/images/product-placeholder.png`.
- Produtos inativos nao aparecem no catalogo.
- Produtos sem estoque aparecem como indisponiveis no modo pedido e exibem a opcao `Avise-me quando chegar`.
- O aviso de disponibilidade salva um registro em `produto_alertas`; no painel admin, produtos que voltaram ao estoque aparecem como prontos para aviso com mensagem de WhatsApp preenchida.

### Painel "Meu Carrinho"

No desktop, o catalogo exibe um painel lateral direito para o carrinho:

- Titulo "Meu Carrinho" com topo laranja.
- Faixa informativa "Seu carrinho fica salvo neste navegador" em Indigo vivido `#1800ad`.
- Total do pedido.
- Temporizador de expiracao do carrinho no formato `3D 12h59:00`.
- Botao "Fechar Carrinho" para ir para `/carrinho`.
- Lista de itens com descricao, preco unitario, controle de quantidade, subtotal e remocao.
- Na tela `/carrinho`, o resumo separa linhas e quantidade total, mostra contato do cliente selecionado e abre WhatsApp apos finalizar.

No mobile, o painel lateral fica oculto e o usuario acessa o carrinho pelo botao/link responsivo.

## Loja B2C mobile-first

Rotas:

- `/loja`
- `/mobile`

Decisao arquitetural:

- A loja B2C nao cria um sistema separado.
- `/loja` apresenta uma entrada mobile-first para o cliente final e direciona para o catalogo com `canal=b2c` apos login.
- `/mobile` aponta para a experiencia B2C, preservando o conceito PWA.
- Produtos, estoque, clientes, carrinho, pedidos, auditoria e `company_id` continuam compartilhados com o ERP.
- A publicacao e o preco B2C usam os campos `publicar_b2c` e `preco_b2c`.
- Pedidos gerados pelo fluxo B2C usam `sales_channel = B2C`.

## Bloco de faltas

O botao `Bloco de faltas` no catalogo ativa um modo separado do pedido.

Objetivo:

- Guardar produtos para uma compra futura.
- Gerar um orcamento/lista sem criar pedido no banco.
- Nao misturar os itens com o carrinho real.

Comportamento atual:

- Usa `localStorage` separado do carrinho, com a chave `moreiramix-shortage-list-v1`.
- Altera os cards para o botao `Adicionar falta`.
- Permite adicionar produtos mesmo quando a intencao e compra futura, sem baixa de estoque.
- Exibe o painel lateral `Bloco de faltas`.
- Mostra acoes `Gerar Orcamento`, `Gerar PDF` e `Imprimir faltas`.
- Permite buscar dentro dos itens do bloco, copiar resumo e conferir linhas, quantidade e total estimado.
- `Gerar Orcamento` salva o orcamento no Supabase pela RPC `criar_orcamento_com_itens` e copia o resumo com numero do orcamento.
- `Gerar PDF` baixa um orcamento em PDF somente com os produtos do Bloco de faltas.
- `Imprimir faltas` abre a impressao de um orcamento limpo, sem imprimir a tela inteira do catalogo.
- A lista lateral permite alterar quantidade, remover item, marcar `Ja comprei` e `Remover todos`.

## Perfis

Admin:

- Importa planilha.
- Audita historico de importacoes e linhas invalidas antes de confirmar.
- Cadastra/edita produtos.
- Filtra produtos por status, estoque e grupo na listagem administrativa.
- Exporta produtos filtrados em CSV.
- Acompanha a fila comercial pelo dashboard.
- Ve todos os pedidos.
- Altera status de pedidos.
- Filtra e busca pedidos na gestao administrativa.
- Exporta pedidos filtrados em CSV para conferencia e backup operacional.
- Cadastra clientes e usuarios.
- Busca clientes e usuarios por dados comerciais, contato, perfil e status.
- Exporta clientes e usuarios filtrados em CSV.
- Consulta e altera status de orcamentos salvos.
- Exporta orcamentos filtrados em CSV para acompanhamento comercial.
- Acompanha avisos de estoque de produtos indisponiveis.
- Marca avisos com estoque disponivel como notificados em lote.
- Copia mensagens prontas de avisos com estoque disponivel para disparo manual.
- Envia avisos prontos por API server-side quando `WHATSAPP_NOTIFY_ENDPOINT` estiver configurado.
- Exporta avisos de estoque filtrados em CSV com contatos e mensagem pronta.

Vendedor:

- Acessa catalogo.
- Seleciona cliente.
- Monta pedido.
- Ve seus proprios pedidos.
- Busca e filtra seus pedidos por status.

Cliente:

- Acessa catalogo.
- Monta pedido.
- Ve seus proprios pedidos.
- Busca e filtra seus pedidos por status.

## Rotas

- `/login`
- `/` como alias para `/catalogo`
- `/admin/dashboard`
- `/admin/agenda`
- `/admin/categorias`
- `/admin/clientes`
- `/admin/grupos-clientes`
- `/admin/fornecedores`
- `/admin/parceiros-representadas`
- `/admin/transportadoras`
- `/admin/produtos`
- `/admin/importar-produtos`
- `/admin/tabelas-auxiliares`
- `/admin/promocoes`
- `/admin/pedidos-parceiros`
- `/admin/estoque`
- `/admin/entrada-mercadorias`
- `/admin/compras`
- `/admin/inventario`
- `/admin/financeiro`
- `/admin/contas-receber`
- `/admin/contas-pagar`
- `/admin/caixa`
- `/admin/contas-correntes`
- `/admin/pix`
- `/admin/formas-pagamento`
- `/admin/condicoes-pagamento`
- `/admin/cfop`
- `/admin/classificacao-fiscal`
- `/admin/regras-imposto`
- `/admin/icms-por-estado`
- `/admin/pedidos`
- `/admin/orcamentos`
- `/admin/separacao`
- `/admin/faturamento-entrega`
- `/admin/entregas`
- `/admin/entregas/[id]`
- `/pdv`
- `/pdv/finalizar-venda`
- `/admin/pdv` como alias para `/pdv`
- `/admin/ecommerce/pedido-eletronico`
- `/admin/ecommerce/produtos-publicados`
- `/catalogo-eletronico`
- `/admin/relatorios`
- `/admin/relatorios-vendas`
- `/admin/relatorios-financeiros`
- `/admin/vendas`
- `/admin/avisos-estoque`
- `/admin/diagnostico`
- `/admin/configuracoes/empresa`
- `/admin/configuracoes/aparencia`
- `/admin/configuracoes/sistema`
- `/admin/integracoes`
- `/admin/integracoes/whatsapp`
- `/admin/integracoes/supabase`
- `/admin/integracoes/planilhas`
- `/admin/integracoes/apis`
- `/ajuda`
- `/admin/base-conhecimento`
- `/admin/permissoes`
- `/admin/usuarios`
- `/minha-conta`
- `/catalogo`
- `/carrinho`
- `/pedidos`
- `/pedidos/[id]`
- `/offline`
- `/_not-found` via fallback global para paginas inexistentes

Rotas agregadoras como `/admin/financeiro`, `/admin/relatorios` e `/admin/integracoes`
continuam disponiveis como paineis de acesso rapido. Elas agrupam atalhos para os
modulos operacionais correspondentes, como contas, caixa, relatorios, planilhas,
WhatsApp, Supabase e futuras APIs.

## Erros e estados globais

O app inclui:

- `src/app/error.tsx` para falhas inesperadas de renderizacao, com botao de tentar novamente e identidade da Central de Personalizacao.
- `src/app/not-found.tsx` para paginas inexistentes, com retorno rapido para catalogo ou login e identidade da Central de Personalizacao.
- `LoadingState` compartilhado em `src/components/ui.tsx`, com visual premium e suporte a variaveis CSS de aparencia.
- `EmptyState` compartilhado em `src/components/ui.tsx`, com visual premium e suporte a variaveis CSS de aparencia.
- `Alert` compartilhado em `src/components/ui.tsx`, com visual premium e tons semanticos baseados nas variaveis de aparencia.

## PWA

O app inclui:

- Manifest dinamico em `/api/manifest`, com `/manifest.webmanifest` mantido apenas como fallback estatico.
- Icone em `/mm-icon.svg`.
- Service worker em `/sw.js`, registrado somente em producao.
- Tela `/offline` usada como fallback quando a navegacao falha sem conexao.

O catalogo, pedidos e dados administrativos continuam dependendo do Supabase online; o modo offline serve para manter o app instalavel e orientar o usuario quando a conexao cair. O service worker nao persiste paginas navegadas em cache, evitando respostas antigas de areas autenticadas. A identidade mobile/PWA e sincronizada em runtime por `src/components/pwa-appearance-sync.tsx`, que atualiza `theme-color`, titulo mobile e favicon conforme a Central de Personalizacao.

## PDF de pedido

Na tela `/pedidos/[id]`, o botao `Gerar PDF` baixa um arquivo `.pdf` com cabecalho comercial, dados do cliente, itens, totais, forma de pagamento, entrega, vendedor e status.

A tela de detalhe tambem mostra totais operacionais do pedido, contato do cliente, copia o resumo comercial e abre WhatsApp com mensagem preenchida.

O PDF e gerado por rota server-side em `/api/pedidos/[id]/pdf`, validando o token do usuario logado antes de liberar o arquivo. `master`, `admin` e `gerente` geram pedidos conforme escopo de empresa; `vendedor`, `caixa` e `cliente` geram apenas pedidos vinculados ao proprio usuario.

A rota aplica a Central de Personalizacao primeiro pela configuracao multiempresa e usa fallback legado por `chave` quando necessario, garantindo documentos comerciais com marca mesmo em bancos ainda nao migrados.

## Deploy na Vercel

1. Crie o projeto na Vercel apontando para este repositorio.
2. Configure as mesmas variaveis de ambiente em Project Settings > Environment Variables.
3. Rode a migration no Supabase antes do primeiro acesso.
4. Deploy automatico com build Next.js.
5. Depois do deploy, valide `https://seu-dominio/api/health` antes do primeiro uso.
6. Acesse `/admin/diagnostico` com um admin logado e siga o checklist de go-live.

Por ser um ERP/PWA B2B privado, `/robots.txt` bloqueia indexacao publica de todas as rotas e os metadados globais do HTML usam `noindex,nofollow`.

O `next.config.ts` aplica headers conservadores para producao:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` bloqueando camera, microfone, geolocalizacao e pagamento
- Cache sem persistencia para `/sw.js`
- Cache curto/sem persistencia para recursos PWA publicos como `/api/manifest`

As rotas sensiveis tambem retornam `Cache-Control: no-store`, incluindo `/api/health`, criacao administrativa de usuarios e geracao de PDF de pedidos.

## Checklist de go-live

Rota: `/admin/diagnostico`

Use o checklist antes de liberar o MVP para a equipe. A tela calcula o status com dados reais do Supabase:

- Healthcheck administrativo completo para `master`, `admin` e `gerente`, cobrindo variaveis, tabelas, colunas, Storage, compatibilidade operacional e guardrails de entregas PDV e caixa.
- Produtos ativos importados.
- Historico com importacao aceita.
- Clientes ativos cadastrados.
- Fornecedores ativos cadastrados.
- Ao menos um admin e um vendedor ativo.
- Ficha da empresa configurada em `configuracoes_empresa` ou cadastro basico ativo em `companies`.
- Pedido teste criado.
- Orcamento convertido em pedido.
- Compra recebida e entrada de estoque registrada.
- Aviso de estoque registrado.
- Venda de PDV registrada.
- Venda PDV com entrega registrada e fila de entregas criada.
- Financeiro operacional com contas ou caixa movimentado.
- PIX cadastrado e vinculado a titulo financeiro.
- Integracoes ativas cadastradas.
- Central de Ajuda com ao menos um artigo publicado.
- Fila comercial revisada no dashboard.

A tela tambem permite copiar um relatorio de go-live com status do healthcheck, escopo, total de checagens tecnicas, compatibilidade operacional, guardrails de entregas e pendencias do checklist. O diagnostico exibe variaveis, tabelas, colunas criticas, buckets de Storage e dados-base essenciais em visual dark premium conectado a Central de Personalizacao.

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```

`npm run typecheck` executa `next typegen` antes do `tsc --noEmit` para manter os tipos de rotas do Next 16 sincronizados e evitar falso negativo local em `.next/types`.

## Continuidade automatica do projeto

O ERP MoreiraMix deve evoluir como uma unica plataforma multiempresa, multiusuario, B2B e preparada para B2C mobile/PWA, sem criar sistemas separados.

Diretrizes de desenvolvimento:

- Avancar pela proxima tarefa logica do MVP sem depender de confirmacao a cada etapa.
- Quando houver lacuna de definicao, tomar a decisao arquitetural mais conservadora e documentar aqui.
- Priorizar banco de dados, autenticacao, produtos, importacoes, grade inteligente, clientes, catalogo, carrinho, pedidos, dashboard e base de conhecimento.
- Manter `company_id` nas tabelas operacionais novas e respeitar isolamento por empresa.
- Telas administrativas compartilhadas que gravam ou consomem cadastros, indicadores e relatorios operacionais por empresa (`tabelas_auxiliares`, contas correntes, financeiro, PIX, clientes, fornecedores, follow-ups, dashboard, relatorios e logs operacionais) devem filtrar e persistir explicitamente pelo `company_id` do perfil logado, mesmo com defaults e RLS no banco. Telas de governanca master com filtro multiempresa podem manter a visao consolidada quando isso for parte da experiencia.
- Respeitar perfis `MASTER`, `ADMIN`, `GERENTE`, `VENDEDOR`, `CAIXA` e `CLIENTE`.
- Registrar mudancas relevantes em `CHANGELOG.md`.
- Validar alteracoes com `npm run typecheck`, `npm run lint` e `npm run build` sempre que houver mudanca de codigo.

Estado consolidado do MVP:

- Banco de dados: multiempresa, canais de venda, produtos, clientes, pedidos, estoque, financeiro, PDV, logs e base de conhecimento inicial.
- Autenticacao: login, logout, primeiro acesso, protecao de rotas, usuarios, perfis e permissoes.
- Produtos: CRUD, importacao Excel/CSV, importacao ZIP de imagens, grupos, marcas, principios ativos, lotes/depositos e grade inteligente.
- Clientes: CRUD PF/PJ, mascaras, buscas automaticas, grupos, aniversarios, follow-up e grade inteligente.
- Catalogo e carrinho: B2B/B2C por canal, filtros, carrinho local resiliente, cliente compativel por canal e finalizacao de pedido.
- Pedidos: acompanhamento, status, relatorios, PDF, resumo comercial e canal de origem.
- Dashboard e relatorios: paineis administrativos, indicadores operacionais e exportacoes CSV.
- Base de conhecimento: Central de Ajuda funcional com artigos por perfil, categorias, tags e bootstrap inicial do MVP.

## Observacoes do MVP

- Carrinho usa `localStorage`.
- O prazo inicial do carrinho e de 3 dias e 13 horas a partir do primeiro item.
- Bloco de faltas ainda usa `localStorage` para a lista em andamento.
- Se o navegador bloquear ou corromper o armazenamento local, carrinho e Bloco de faltas continuam funcionando em memoria durante a sessao.
- O orcamento gerado no Bloco de faltas pode ser salvo no banco, copiado, impresso ou baixado em PDF.
- Orcamentos salvos podem ser consultados em `/admin/orcamentos` e convertidos em pedidos pendentes por admins, com baixa transacional de estoque.
- Na conversao de orcamento, o admin pode preencher pagamento, entrega e observacao antes de gerar o pedido.
- Avisos de disponibilidade sao gravados no banco e podem ser tratados manualmente por WhatsApp em `/admin/avisos-estoque`; quando `WHATSAPP_NOTIFY_ENDPOINT` estiver configurado, admins podem enviar os avisos prontos por uma rota server-side.
- A finalizacao do pedido usa a RPC `criar_pedido_com_itens`, que cria pedido, itens e baixa `estoque`/`estoque_disponivel` em uma unica transacao.
- A gestao administrativa de status usa a RPC `atualizar_status_pedido`; ao mudar para `cancelado`, o estoque dos itens e devolvido uma unica vez.
- Admins podem alterar o status tanto em `/admin/pedidos` quanto no detalhe `/pedidos/[id]`.
- PIX, boleto, nota fiscal e app nativo nao foram implementados nesta etapa.
