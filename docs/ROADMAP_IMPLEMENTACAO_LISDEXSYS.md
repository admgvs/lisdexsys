# LisdexSys — Roadmap Mestre de Implementação

**Atualizado em:** 22/06/2026  
**Objetivo:** consolidar a base já existente do LisdexSys com as novas frentes de vendas, varejo, distribuição, farmácias, e-commerce, CRM, fidelização, automação comercial e inteligência artificial.

> Decisão de priorização: primeiro proteger dados, caixa e operação; depois aumentar recorrência e autosserviço; em seguida escalar logística, fidelização e inteligência analítica; por último liberar automações de IA com autonomia progressiva e governança.

---

## 1. Legenda de prioridade e status

- **P0 — Crítico:** requisito de segurança, caixa, conformidade ou fundação técnica.
- **P1 — Alto impacto:** aumenta vendas, produtividade, retenção ou qualidade operacional.
- **P2 — Diferenciação:** cria vantagem competitiva e módulos premium.
- **P3 — Escala:** otimizações para expansão comercial e grande volume.
- **BASE:** existe alguma fundação no repositório e deve ser evoluída, não recriada sem análise.
- **GATE:** condição obrigatória antes de avançar para a fase seguinte.

A confirmação final do status de cada item deve considerar código, migrations, RLS, testes e ambiente implantado; o README não deve ser tratado isoladamente como prova de conclusão.

---

## 2. Base existente que este roadmap deve aproveitar

O projeto já possui fundações importantes que devem ser reutilizadas:

- multiempresa por `company_id`;
- cadastros de produtos, clientes, grupos, promoções, vendedores e condições comerciais;
- ficha de cliente com limite de crédito, desconto e condição de pagamento;
- PDV, pedidos, orçamentos, estoque, lotes, compras, financeiro, caixa e PIX;
- entregas, separação, faturamento e rotas operacionais;
- catálogo eletrônico e pedido eletrônico;
- integrações e conector de WhatsApp para avisos;
- dashboards, relatórios, auditoria em rotinas específicas e diagnóstico de go-live.

As implementações abaixo devem ampliar essas bases com regras centralizadas, histórico unificado, automação, governança e inteligência.

---

# ORDEM MESTRE DE IMPLEMENTAÇÃO

## FASE 0 — Fundação SaaS, segurança, dados e governança

**Prioridade:** P0  
**Objetivo:** garantir que todas as novas funcionalidades cresçam sobre uma arquitetura segura, auditável e multi-tenant.

### EPIC-00.1 — Separar Control Plane e ERP dos contratantes

- [ ] Tratar a LisdexSys como operadora da plataforma, separada das empresas contratantes.
- [ ] Criar ou consolidar conceitos de `tenant`, entidade legal, unidade/filial, assinatura, plano, módulo, feature e entitlement.
- [ ] Separar usuários internos da LisdexSys de usuários dos contratantes.
- [ ] Criar painel administrativo da plataforma para contratantes, assinaturas, módulos, cobrança, suporte, auditoria e saúde operacional.
- [ ] Manter o financeiro do ERP do cliente separado do billing da própria LisdexSys.
- [ ] Implementar feature flags por tenant, unidade, plano e usuário.

### EPIC-00.2 — Isolamento multi-tenant e controle de acesso

- [ ] Garantir `company_id`/`tenant_id` em todas as tabelas operacionais aplicáveis.
- [ ] Revisar e testar RLS para leitura, criação, alteração, exclusão e RPCs.
- [ ] Criar testes automatizados de tentativa de acesso cruzado entre empresas.
- [ ] Aplicar RBAC e regras contextuais por empresa, filial, módulo, perfil, operação e valor.
- [ ] Exigir MFA para perfis críticos da plataforma, financeiro, farmacêutico, RT, ajustes e estornos.
- [ ] Criar acesso de suporte temporário, justificado, limitado e auditado.

### EPIC-00.3 — Auditoria e eventos

- [ ] Padronizar log com usuário, tenant, unidade, data/hora, IP/dispositivo, origem, ação, antes/depois e justificativa.
- [ ] Impedir exclusão destrutiva de eventos críticos; usar estorno, reversão ou evento corretivo.
- [ ] Criar `outbox_events` para integrações confiáveis e reprocessáveis.
- [ ] Versionar regras comerciais, sanitárias, campanhas, planos e políticas de crédito.
- [ ] Criar trilha de aprovação para desconto, limite, condição de pagamento, estorno e alteração sensível.

### EPIC-00.4 — Qualidade e governança de dados

- [ ] Criar score de completude para produtos, clientes e fornecedores.
- [ ] Definir campos obrigatórios por segmento e tipo de operação.
- [ ] Detectar duplicidades de CPF/CNPJ, EAN, código interno, telefone e e-mail.
- [ ] Manter dicionário de dados, responsáveis por domínio e regras de validação.
- [ ] Criar monitor de filas, webhooks, falhas de integração, jobs e reprocessamentos.

### GATE DA FASE 0

- Nenhuma consulta ou RPC pode expor dados entre tenants.
- Toda alteração crítica deve ser auditável.
- Integrações precisam suportar idempotência, retentativa e fila de erros.
- Funcionalidades novas devem nascer atrás de feature flags quando houver risco operacional.

**Impacto:** reduz risco de vazamento, retrabalho e bloqueios futuros de escala.  
**Risco se ignorado:** automatizar e integrar sobre dados inseguros ou inconsistentes.

---

## FASE 1 — Proteção comercial, crédito e cobrança

**Prioridade:** P0  
**Objetivo:** vender mais sem aumentar inadimplência, margem negativa ou exposição financeira.

### EPIC-01.1 — Score interno de cliente

- [ ] Criar score explicável com histórico de pagamento, atrasos, saldo vencido, exposição, frequência, ticket, margem, devoluções e tempo de relacionamento.
- [ ] Separar score cadastral, score comportamental e score financeiro.
- [ ] Exibir os fatores que elevaram ou reduziram o score.
- [ ] Permitir revisão humana e justificativa de exceção.
- [ ] Registrar versão do modelo e data do cálculo.

### EPIC-01.2 — Motor de política comercial

- [ ] Definir limite total, limite disponível e exposição comprometida em pedidos ainda não faturados.
- [ ] Configurar condição de pagamento por cliente, grupo, canal, unidade e faixa de risco.
- [ ] Configurar formas permitidas, entrada mínima, prazo máximo, pedido mínimo e tolerância de atraso.
- [ ] Aplicar teto de desconto e piso de margem por produto, grupo, cliente e vendedor.
- [ ] Bloquear ou encaminhar para aprovação vendas fora da política.
- [ ] Criar validade para liberações excepcionais.

### EPIC-01.3 — Aprovação e régua de cobrança

- [ ] Criar fila de solicitações de crédito, desconto, prazo e desbloqueio.
- [ ] Exigir motivo, aprovador, prazo de validade e evidências.
- [ ] Criar régua multicanal de lembrete preventivo, vencimento, atraso e negociação.
- [ ] Gerar tarefas para financeiro e vendedor responsável.
- [ ] Integrar boletos, PIX, recibos, baixa e conciliação.
- [ ] Medir DSO, atraso médio, recuperação, promessas de pagamento e reincidência.

### GATE DA FASE 1

- O PDV, pedido eletrônico, orçamento e pedido de representante devem consultar a mesma política comercial.
- Nenhum desbloqueio ou exceção deve ocorrer sem trilha de auditoria.
- O sistema deve explicar por que uma venda foi liberada, bloqueada ou enviada para aprovação.

**Impacto:** proteção de caixa, redução de inadimplência e padronização da decisão comercial.  
**Risco:** score mal calibrado pode bloquear bons clientes; iniciar em modo recomendação e acompanhar falsos positivos.

---

## FASE 2 — CRM 360° e WhatsApp comercial

**Prioridade:** P0/P1  
**Objetivo:** transformar a base de clientes em recorrência, recompra, retenção e produtividade de vendas.

### EPIC-02.1 — Visão 360° do cliente

- [ ] Criar linha do tempo única com cadastro, contatos, orçamentos, pedidos, PDV, pagamentos, cobranças, entregas, devoluções, avisos e mensagens.
- [ ] Exibir situação financeira, limite disponível, última compra, frequência, ticket, margem e produtos recorrentes.
- [ ] Criar responsáveis comerciais, carteira, tarefas, notas, anexos e próximos passos.
- [ ] Registrar origem, campanha, canal e motivo de perda/inatividade.

### EPIC-02.2 — Segmentação e jornadas

- [ ] Classificar clientes como novo, recorrente, VIP, alto potencial, em risco, inativo, inadimplente, bloqueado e recompra provável.
- [ ] Criar segmentos por RFM, canal, cidade, categoria, margem, frequência, ticket e comportamento.
- [ ] Criar jornadas para onboarding, orçamento sem retorno, carrinho abandonado, pós-venda, recompra, reativação e cobrança.
- [ ] Criar lead, oportunidade, etapa de funil, probabilidade, valor e previsão de fechamento.

### EPIC-02.3 — WhatsApp integrado

- [ ] Integrar API oficial ou provedor homologado com tokens privados e isolamento por tenant.
- [ ] Registrar opt-in, opt-out, finalidade e origem do consentimento.
- [ ] Armazenar conversas, templates, status de envio, leitura, erro e responsável pelo atendimento.
- [ ] Permitir transbordo do bot para atendente humano com contexto completo.
- [ ] Criar templates para orçamento, pedido, disponibilidade, cobrança, entrega, pós-venda e reativação.
- [ ] Aplicar frequência máxima, janela de contato e listas de supressão para evitar spam.

### EPIC-02.4 — Campanhas e automações

- [ ] Criar campanhas segmentadas com público estimado, custo, conversão, receita, margem e descadastro.
- [ ] Automatizar follow-up de orçamento, pedido incompleto, produto que voltou ao estoque e cliente inativo.
- [ ] Criar tarefas automáticas para vendedor quando houver alta intenção ou risco de perda.
- [ ] Permitir teste A/B de mensagem, oferta e horário.

### GATE DA FASE 2

- Toda mensagem deve estar associada a finalidade, consentimento e tenant.
- Campanhas devem medir receita e margem incremental, não apenas mensagens enviadas.
- O CRM deve consumir eventos reais do ERP, evitando cadastro paralelo e divergente.

**Impacto:** maior recompra, conversão e produtividade da equipe.  
**Risco:** automação sem contexto vira spam e reduz confiança.

---

## FASE 3 — Portal do cliente e autosserviço B2B

**Prioridade:** P1  
**Objetivo:** reduzir atendimento manual e aumentar conveniência, recorrência e transparência.

### EPIC-03.1 — Conta do cliente

- [ ] Criar login seguro do cliente com usuários e permissões por empresa compradora.
- [ ] Exibir cadastro, contatos, endereços, compradores autorizados e preferências.
- [ ] Permitir atualização de dados sujeita a validação quando necessário.

### EPIC-03.2 — Compras e pedidos

- [ ] Exibir catálogo, preço personalizado, estoque, promoções e condições liberadas.
- [ ] Permitir repetir pedido, usar listas frequentes e enviar orçamento.
- [ ] Mostrar histórico, itens, notas, separação, faturamento, entrega e ocorrências.
- [ ] Permitir anexar pedido de compra e importar lista por planilha.

### EPIC-03.3 — Financeiro do cliente

- [ ] Exibir limite total, utilizado, comprometido e disponível.
- [ ] Exibir contas em aberto, vencidas, pagas, extrato e comprovantes.
- [ ] Disponibilizar boleto, PIX, segunda via, recibo e negociação conforme política.
- [ ] Mostrar bloqueios e orientar a ação necessária sem expor regras internas sensíveis.

### EPIC-03.4 — Atendimento e entrega

- [ ] Abrir chamados e acompanhar SLA.
- [ ] Acompanhar rota/status da entrega quando aplicável.
- [ ] Confirmar recebimento, divergência, falta, avaria ou devolução.
- [ ] Disponibilizar documentos fiscais e comerciais autorizados.

**Impacto:** redução de custos operacionais, maior retenção e aceleração do ciclo do pedido.  
**Risco:** exposição indevida de preços, documentos ou dados financeiros; aplicar autorização por cliente e usuário.

---

## FASE 4 — Cadastro AI-ready, PIM e e-commerce omnichannel

**Prioridade:** P1  
**Objetivo:** tornar produtos localizáveis, comparáveis e recomendáveis em catálogo, marketplace, busca e agentes de IA.

### EPIC-04.1 — PIM e qualidade do cadastro

- [ ] Consolidar EAN/GTIN, NCM, CEST, marca, fabricante, princípio ativo, registro MS/Anvisa, embalagem, unidade e conversões.
- [ ] Criar título comercial, descrição curta, descrição completa, benefícios, aplicação, composição, atributos e palavras-chave.
- [ ] Manter imagens padronizadas, documento técnico, peso, dimensões, lote, validade e condições de armazenagem.
- [ ] Criar sinônimos, equivalentes, substitutos, complementares e produtos relacionados.
- [ ] Criar score de completude e fila de correção; impedir publicação quando faltar dado crítico.

### EPIC-04.2 — Publicação multicanal

- [ ] Centralizar regras de preço, estoque, catálogo e disponibilidade por canal.
- [ ] Criar feeds/APIs estruturados para site, B2B, marketplace, busca e futuras integrações com agentes de IA.
- [ ] Sincronizar estoque e preço com idempotência e fila de erros.
- [ ] Registrar canal de origem, campanha e atribuição da venda.

### EPIC-04.3 — Conversão digital

- [ ] Recuperar carrinho e orçamento abandonado.
- [ ] Criar busca tolerante a erro, sinônimos, EAN, marca e princípio ativo.
- [ ] Recomendar reposição, similares e complementares com regras de estoque e margem.
- [ ] Criar pedido rápido B2B por código, leitor, planilha e histórico.

**Impacto:** maior alcance, conversão e prontidão para comércio assistido por IA.  
**Risco:** cadastro incompleto gera recomendação errada e divergência entre canais.

---

## FASE 5 — Automação de distribuição, representantes e logística

**Prioridade:** P1  
**Objetivo:** reduzir erros, tempo de ciclo, ruptura e custo por pedido.

### EPIC-05.1 — Força de vendas e representantes

- [ ] Criar PWA/app do representante com carteira, rota, histórico, limite, condição e pedidos.
- [ ] Permitir operação offline com sincronização segura.
- [ ] Exibir pedido sugerido, itens recorrentes, ruptura provável e oportunidades por cliente.
- [ ] Aplicar preço, promoção, comissão, desconto e política comercial no servidor.
- [ ] Registrar visita, geolocalização quando autorizada, motivo de não venda e próximo contato.

### EPIC-05.2 — Separação e expedição

- [ ] Criar ondas de separação por rota, prioridade, transportadora, temperatura ou tipo de produto.
- [ ] Aplicar FEFO para itens com validade e rastrear produto + lote + validade + depósito + status.
- [ ] Conferir por código de barras/QR Code com divergência bloqueante.
- [ ] Gerar etiqueta por volume, caixa, pedido, rota e destinatário.
- [ ] Criar packing, lacre, quantidade de volumes, peso e conferência final.

### EPIC-05.3 — Romaneio, rota e prova de entrega

- [ ] Criar romaneio por veículo, motorista, entregador, rota e sequência.
- [ ] Sugerir roteirização respeitando janela, prioridade, capacidade e região.
- [ ] Registrar saída, chegada, entrega, não entrega, motivo e reentrega.
- [ ] Capturar prova de entrega com recebedor, assinatura, foto e geolocalização quando permitida.
- [ ] Controlar valores a receber na entrega e conciliação do retorno.

### EPIC-05.4 — Devolução e logística reversa

- [ ] Criar solicitação, autorização, coleta, conferência e destino da devolução.
- [ ] Separar reintegração, quarentena, avaria, vencido e descarte.
- [ ] Reverter estoque, comissão, fidelidade e financeiro de forma transacional.

### Indicadores

- OTIF, fill rate, tempo de separação, acuracidade, custo por entrega, devolução, reentrega e perda por validade.

**Impacto:** menor retrabalho e maior capacidade de escala da distribuidora.  
**Risco:** automatizar processo não padronizado; mapear e testar o fluxo físico antes da automação total.

---

## FASE 6 — Fidelização e retenção inteligente

**Prioridade:** P1/P2  
**Objetivo:** elevar frequência, ticket, retenção e LTV sem destruir margem.

### EPIC-06.1 — Motor de fidelidade

- [ ] Criar pontos, cashback interno, cupons, níveis e benefícios.
- [ ] Definir regras por produto, categoria, canal, cliente, margem, campanha e forma de pagamento.
- [ ] Controlar validade, expiração, saldo, resgate, estorno e cancelamento.
- [ ] Impedir benefício em item proibido, margem insuficiente ou operação suspeita.

### EPIC-06.2 — Ofertas personalizadas

- [ ] Usar histórico, frequência, categoria e ciclo de recompra para selecionar ofertas.
- [ ] Criar campanhas de aniversário, reativação, progressão de nível e recompra.
- [ ] Permitir desafios, combos e metas com teto de custo.
- [ ] Medir receita incremental, margem incremental, retenção e canibalização.

### EPIC-06.3 — Antifraude e governança

- [ ] Detectar múltiplas contas, resgates anormais, devoluções oportunistas e manipulação interna.
- [ ] Exigir auditoria em ajustes manuais de saldo.
- [ ] Reverter automaticamente pontos/cashback em cancelamentos e devoluções.

**Impacto:** aumento de recorrência e valor do cliente.  
**Risco:** programa mal calculado vira desconto permanente e passivo financeiro.

---

## FASE 7 — Farmácias, cuidado contínuo e conformidade sanitária

**Prioridade:** P1/P2; torna-se **P0** para operações que comercializam medicamentos controlados.  
**Objetivo:** diferenciar o LisdexSys no segmento farmacêutico com segurança regulatória e operacional.

### EPIC-07.1 — Recompra e cuidado contínuo

- [ ] Identificar produtos de uso contínuo e janela provável de recompra.
- [ ] Criar lembretes consentidos, tarefas farmacêuticas e acompanhamento de adesão.
- [ ] Registrar atendimento e orientação sem substituir avaliação profissional.
- [ ] Aplicar controle rigoroso de acesso a dados de saúde.

### EPIC-07.2 — LisdexSys Controlados

- [ ] Criar cadastro sanitário versionado por substância, lista, receituário e regra.
- [ ] Controlar estoque por lote, validade, depósito e subdepósito sanitário.
- [ ] Criar receituário como entidade própria vinculada a paciente, comprador, prescritor, farmacêutico, venda e lote.
- [ ] Bloquear dispensação sem validação, lote, estoque, receita ou autorização exigida.
- [ ] Criar Central SNGPC com geração, validação, fila, transmissão, protocolo, rejeição e correção.
- [ ] Preparar Central SNCR desacoplada, com validação, baixa, bloqueio de reutilização, logs e feature flag.
- [ ] Gerar etiquetas e rastreabilidade por QR Code com minimização de dados.

### EPIC-07.3 — LGPD e segurança de dados de saúde

- [ ] Aplicar finalidade, necessidade, retenção, mascaramento e criptografia.
- [ ] Registrar acesso a dados sensíveis e impressão de documentos.
- [ ] Criar permissões por farmacêutico, RT, unidade, depósito e operação.
- [ ] Homologar regras com responsável técnico e vigilância aplicável antes de produção.

**Impacto:** aderência ao segmento farma, redução de risco sanitário e novo módulo premium.  
**Risco:** regra regulatória desatualizada; manter parâmetros versionados e validação profissional.

---

## FASE 8 — BI executivo, dados analíticos e previsões

**Prioridade:** P1/P2  
**Objetivo:** criar uma camada confiável de decisão antes de ampliar a autonomia da IA.

### EPIC-08.1 — Modelo analítico

- [ ] Padronizar eventos de cliente, produto, pedido, venda, pagamento, estoque, entrega, campanha e atendimento.
- [ ] Criar camada semântica com definições únicas de faturamento, receita líquida, margem, cliente ativo e inadimplência.
- [ ] Implementar cargas incrementais, reconciliação e monitor de qualidade.

### EPIC-08.2 — Dashboards

- [ ] Executivo: vendas, margem, caixa, estoque, inadimplência e projeção.
- [ ] Comercial: funil, conversão, carteira, recompra, vendedor e canal.
- [ ] CRM: coortes, RFM, churn, reativação, LTV e campanha.
- [ ] Crédito: exposição, atraso, DSO, recuperação e exceções.
- [ ] Logística: OTIF, fill rate, acuracidade, devolução e custo.
- [ ] Estoque: giro, ruptura, excesso, validade e capital parado.
- [ ] Fidelidade: adesão, resgate, custo, margem e receita incremental.

### EPIC-08.3 — Alertas e previsões

- [ ] Alertar ruptura, excesso, validade próxima, queda de venda, atraso e cliente em risco.
- [ ] Criar previsão de demanda por produto/unidade com intervalo de confiança.
- [ ] Comparar previsão com realizado e monitorar erro do modelo.

**Impacto:** decisões mais rápidas e base mensurável para IA.  
**Risco:** indicadores conflitantes; manter glossário e reconciliação com o transacional.

---

## FASE 9 — Inteligência artificial aplicada a vendas e operação

**Prioridade:** P2  
**Dependência:** Fases 0, 1, 2 e 8 maduras.  
**Objetivo:** aumentar produtividade e qualidade de decisão sem retirar controle humano prematuramente.

### EPIC-09.1 — Copiloto comercial

- [ ] Resumir cliente, histórico, situação financeira e oportunidades.
- [ ] Sugerir próxima melhor ação, produtos, quantidade e momento de contato.
- [ ] Montar rascunho de orçamento, pedido, mensagem e tarefa.
- [ ] Explicar quais dados sustentaram cada recomendação.

### EPIC-09.2 — IA de estoque e compras

- [ ] Prever demanda, ruptura, excesso e risco de vencimento.
- [ ] Sugerir compra por fornecedor, lead time, lote mínimo, giro, margem e caixa.
- [ ] Simular cenários antes de confirmar pedido de compra.
- [ ] Exigir aprovação humana nas primeiras versões.

### EPIC-09.3 — IA para CRM e fidelização

- [ ] Prever recompra, churn e melhor canal/horário.
- [ ] Sugerir segmento, campanha, oferta e conteúdo.
- [ ] Controlar margem, frequência e consentimento antes de disparar.
- [ ] Medir uplift real contra grupo de controle.

### EPIC-09.4 — IA para crédito e preço

- [ ] Usar IA como apoio ao score, nunca como decisão opaca e exclusiva.
- [ ] Exibir justificativas, variáveis relevantes e possibilidade de revisão.
- [ ] Sugerir preço e desconto respeitando custo, imposto, contrato, piso de margem e política comercial.
- [ ] Bloquear decisões fora dos limites autorizados.

### EPIC-09.5 — Assistente interno de conhecimento

- [ ] Consultar manuais, políticas, procedimentos, base de ajuda e documentação autorizada.
- [ ] Aplicar controle de acesso por tenant, perfil e documento.
- [ ] Citar a fonte usada na resposta interna.
- [ ] Registrar feedback e taxa de resolução.

### EPIC-09.6 — Governança de IA

- [ ] Registrar modelo, versão, prompt, contexto, resposta, usuário, custo e ação executada.
- [ ] Mascarar dados pessoais e sensíveis quando possível.
- [ ] Criar avaliações de qualidade, segurança, viés, alucinação e regressão.
- [ ] Definir limites de autonomia por ação e valor.
- [ ] Manter aprovação humana para crédito, preço crítico, pagamento, estorno, compra relevante e dados de saúde.
- [ ] Criar fallback quando o provedor/modelo estiver indisponível.

### Escada de autonomia

1. **Informar:** IA apenas resume e consulta.
2. **Recomendar:** IA sugere, usuário decide.
3. **Preparar:** IA cria rascunho, usuário confirma.
4. **Executar com limite:** IA age dentro de política e registra tudo.
5. **Autonomia ampliada:** somente após métricas, auditoria e reversão comprovadas.

**Impacto:** produtividade, aumento de conversão, melhor compra e redução de ruptura.  
**Risco:** automação de erro, viés ou dado ruim; autonomia deve crescer apenas com evidência.

---

## FASE 10 — Escala comercial da plataforma

**Prioridade:** P2/P3  
**Objetivo:** transformar o LisdexSys em SaaS replicável para farmácias, distribuidoras e outros segmentos.

### EPIC-10.1 — Planos, módulos e billing

- [ ] Versionar planos e preços sem alterar contratos antigos.
- [ ] Liberar módulos e features por entitlement.
- [ ] Criar trial, upgrade, downgrade, suspensão, reativação e cancelamento.
- [ ] Integrar gateway por adaptador, mantendo o Billing Core como fonte de verdade.
- [ ] Criar cobrança recorrente, webhooks, conciliação e régua de inadimplência da plataforma.

### EPIC-10.2 — Provisionamento e operação

- [ ] Automatizar criação de tenant, empresa, unidade, usuário inicial, storage e configurações.
- [ ] Criar checklist de onboarding e go-live por segmento.
- [ ] Monitorar consumo, erros, filas, integrações e saúde por tenant.
- [ ] Preparar isolamento dedicado para clientes enterprise quando necessário.

### EPIC-10.3 — White-label e segmentação

- [ ] Aplicar temas por segmento sem duplicar telas.
- [ ] Permitir identidade, domínio, logo e configurações autorizadas por tenant.
- [ ] Criar pacotes específicos para farmácia, distribuidora, varejo e serviços.

### EPIC-10.4 — Marketplace B2B

- [ ] Evoluir catálogo/pedido eletrônico para marketplace segmentado quando a operação estiver madura.
- [ ] Separar seller, buyer, catálogo, comissão, pedido, pagamento, logística e disputa.
- [ ] Implantar somente após catálogo, crédito, portal, logística e conciliação estarem estáveis.

**Impacto:** receita recorrente e expansão do produto.  
**Risco:** escalar suporte e complexidade antes de estabilizar o núcleo operacional.

---

# 3. Sequência recomendada de execução

## Ciclo A — Proteger a fundação e o caixa

1. Fase 0: isolamento, auditoria, eventos, feature flags e qualidade de dados.
2. Fase 1: score, limite disponível, política comercial, aprovação e cobrança.
3. Itens críticos da Fase 7 para tenants que operam medicamentos controlados.

## Ciclo B — Criar recorrência comercial

4. Fase 2: CRM 360°, segmentação, funil e WhatsApp integrado.
5. Fase 3: portal do cliente com pedido e financeiro.
6. Fase 4: PIM/cadastro AI-ready e publicação omnichannel.

## Ciclo C — Ganhar eficiência operacional

7. Fase 5: representantes, separação, QR Code, romaneio e prova de entrega.
8. Fase 6: fidelidade com proteção de margem.
9. Fase 8: BI, alertas e previsões.

## Ciclo D — Diferenciar e escalar

10. Fase 9: copilotos e automações de IA com autonomia gradual.
11. Fase 10: billing SaaS, provisionamento, white-label e marketplace B2B.

---

# 4. Itens que não devem ser antecipados

- IA executando crédito, preço, estorno ou compra relevante sem política e aprovação.
- Disparo massivo de WhatsApp sem consentimento, segmentação e controle de frequência.
- Programa de fidelidade baseado apenas em desconto bruto.
- Marketplace antes de catálogo, estoque, financeiro e logística estarem reconciliados.
- Microserviços, Kubernetes ou bancos separados por tenant sem necessidade operacional comprovada.
- Coleta de dados de saúde sem finalidade, minimização, controle de acesso e validação jurídica/regulatória.
- Preço dinâmico sem piso de margem, contrato e trilha de auditoria.

---

# 5. Critérios de sucesso do roadmap

- Redução da inadimplência e do tempo médio de recebimento.
- Aumento da recompra, retenção, ticket e margem por cliente.
- Aumento da conversão de orçamento, carrinho e oportunidade.
- Redução de ruptura, excesso, perda por validade e erro de separação.
- Redução do tempo entre pedido, faturamento e entrega.
- Maior uso do autosserviço pelo cliente.
- Crescimento da receita recorrente da LisdexSys por módulos e planos.
- Recomendações de IA mensuradas por precisão, uplift, economia e taxa de aceitação.
- Zero incidente de acesso cruzado entre tenants.

---

# 6. Próxima ação operacional

Transformar cada EPIC deste documento em issues menores, vinculando:

- responsável;
- prioridade;
- dependências;
- migration/tabelas afetadas;
- rotas e APIs;
- regras de negócio;
- testes de RLS e autorização;
- critérios de aceite;
- métricas pós-implantação;
- feature flag e plano de rollback.

Este documento passa a ser a referência de ordem e escopo para as novas implementações do LisdexSys.