# 🚀 Guia Rápido: Cloud Agents

Referência rápida para usar os Cloud Agents do projeto.

---

## 📋 Quando Usar Cada Agent?

### **Desenvolvimento de Features**

| Situação | Agent | Comando |
|----------|-------|---------|
| Criar componente React | `@UI/UX Frontend` | `@UI/UX Frontend Crie um card de produto responsivo` |
| Otimizar SEO de página | `@SEO Strategist` | `@SEO Strategist Otimize meta tags da página /produtos` |
| Escrever copy/CTA | `@Copywriting Expert` | `@Copywriting Expert Crie CTA para landing page de conversão` |
| Feature complexa | `@Dev Coordinator` | `@Dev Coordinator Implemente sistema de chat em tempo real` |

### **Qualidade e Testes**

| Situação | Agent | Comando |
|----------|-------|---------|
| Revisar código | `@Code Reviewer` | `@Code Reviewer Analise UserService.ts` |
| Adicionar testes | `@Testing Specialist` | `@Testing Specialist Crie testes E2E para checkout` |
| Otimizar performance | `@Performance Optimizer` | `@Performance Optimizer Reduza LCP da home para < 2.5s` |
| Garantir acessibilidade | `@A11y Specialist` | `@A11y Specialist Valide formulário de cadastro (WCAG AA)` |

### **Infraestrutura**

| Situação | Agent | Comando |
|----------|-------|---------|
| Configurar CI/CD | `@Infrastructure & DevOps` | `@Infrastructure Adicione Lighthouse CI ao workflow` |
| Setup de deploy | `@Infrastructure & DevOps` | `@Infrastructure Configure deploy automático na Vercel` |
| Monitoramento | `@Infrastructure & DevOps` | `@Infrastructure Integre Sentry para error tracking` |

### **Pesquisa e Documentação**

| Situação | Agent | Comando |
|----------|-------|---------|
| Pesquisar padrões | `@Research Agent` | (Invocado via Dev Coordinator) |
| Criar README | `@README Agent` | `@README Agent Documente API de notificações` |

---

## 💡 Exemplos Práticos

### **1. Criar Nova Página (Completo)**

```bash
# Etapa 1: SEO
@SEO Strategist Defina estratégia SEO para página /rastreamento

# Etapa 2: UI
@UI/UX Frontend Crie página /rastreamento com mapa interativo

# Etapa 3: Acessibilidade
@A11y Specialist Valide acessibilidade da página /rastreamento

# Etapa 4: Performance
@Performance Optimizer Otimize carregamento do mapa (lazy loading)

# Etapa 5: Testes
@Testing Specialist Adicione testes E2E para /rastreamento
```

### **2. Refatorar Código Existente**

```bash
# Etapa 1: Revisão
@Code Reviewer Analise DeliveryService.ts e sugira melhorias

# Etapa 2: Pesquisa (se necessário)
@Dev Coordinator Pesquise padrões para melhorar DeliveryService.ts

# Etapa 3: Implementação
[Faça as mudanças baseado no feedback]

# Etapa 4: Validação
@Code Reviewer Revise mudanças em DeliveryService.ts
```

### **3. Deploy e Monitoramento**

```bash
# Setup inicial
@Infrastructure Configure deploy automático no GitHub Actions

# Adicionar monitoramento
@Infrastructure Integre Vercel Analytics e Sentry

# Configurar alertas
@Infrastructure Crie workflow de Lighthouse CI com thresholds
```

---

## 🎯 Workflows Recomendados

### **Workflow: Nova Feature (Simples)**

```mermaid
1. @UI/UX Frontend → Implementar
2. @A11y Specialist → Validar acessibilidade
3. @Testing Specialist → Adicionar testes
4. @Code Reviewer → Revisão final
```

### **Workflow: Nova Feature (Complexa)**

```mermaid
1. @Dev Coordinator → Orquestrar tudo
   ├─ @Research Agent → Pesquisar padrões
   ├─ [Implementação camada por camada]
   ├─ @Code Reviewer → Validar cada camada
   ├─ @Testing Specialist → Testes
   └─ @Performance Optimizer → Otimizar
```

### **Workflow: Bug Fix**

```mermaid
1. Reproduzir bug
2. @Code Reviewer → Analisar código problemático
3. [Implementar fix]
4. @Testing Specialist → Adicionar teste de regressão
5. @Code Reviewer → Validar fix
```

---

## 📐 Combinações Poderosas

### **Landing Page Completa**

```bash
@SEO Strategist Estratégia SEO para landing de "rastreamento de pedidos"
@Copywriting Expert Copy persuasivo com AIDA
@UI/UX Frontend Implementar landing com copy fornecido
@Performance Optimizer Garantir LCP < 2s
@A11y Specialist Validar WCAG 2.1 AA
```

### **Sistema Completo (Feature Grande)**

```bash
@Dev Coordinator Implemente sistema de notificações push

# Dev Coordinator automaticamente:
# 1. Research Agent pesquisa
# 2. Planeja arquitetura
# 3. Implementa: Model → Repo → Validator → Service → Component
# 4. Code Reviewer valida
# 5. Testing Specialist adiciona testes
# 6. Performance Optimizer revisa impacto
```

---

## ⚡ Atalhos e Dicas

### **Para Desenvolvimento Rápido**

```bash
# Componente completo (UI + A11y + Tests)
@UI/UX Frontend Crie ProductCard.tsx
@A11y Specialist Valide ProductCard.tsx
@Testing Specialist Teste ProductCard.tsx
```

### **Para Qualidade Máxima**

```bash
# Feature com todas as validações
@Dev Coordinator [Feature] + garantir qualidade máxima

# Manualmente:
@Code Reviewer → @Performance Optimizer → @A11y Specialist → @Testing Specialist
```

### **Para Deploy Seguro**

```bash
@Infrastructure Configure:
- CI/CD com cache
- Deploy preview automático
- Lighthouse CI (score > 90)
- Rollback automático em falhas
```

---

## 🚨 Troubleshooting

### **Agent Não Responde?**

1. Verifique sintaxe: `@Nome Agent` (exato como no README)
2. Confirme que agent existe em `.github/agents/`
3. Alguns agents são `user-invokable: false` (use via Dev Coordinator)

### **Resposta Genérica?**

Forneça mais contexto:
```bash
❌ @Code Reviewer revise
✅ @Code Reviewer revise UserService.ts focando em segurança
```

### **Agent Sugeriu Código Incompatível?**

Mencione padrões do projeto:
```bash
@UI/UX Frontend Crie modal seguindo padrões em .github/instructions/
```

---

## 📊 Checklist de Qualidade

Use esta sequência para garantir qualidade:

```bash
✅ @Code Reviewer - Correção lógica
✅ @Performance Optimizer - Web Vitals
✅ @A11y Specialist - WCAG 2.1 AA
✅ @Testing Specialist - Cobertura de testes
✅ @Infrastructure (se houver deploy) - CI/CD
```

---

## 🎓 Aprendizado Progressivo

### **Nível 1: Iniciante**

Use agents individualmente:
```bash
@UI/UX Frontend Crie botão
@Testing Specialist Teste botão
```

### **Nível 2: Intermediário**

Combine agents em workflows:
```bash
1. @UI/UX Frontend Crie formulário
2. @A11y Specialist Valide acessibilidade
3. @Testing Specialist Adicione testes
```

### **Nível 3: Avançado**

Use Dev Coordinator para orquestração:
```bash
@Dev Coordinator Implemente autenticação com Supabase
(Dev Coordinator invoca Research, implementa, valida com Code Reviewer, adiciona testes)
```

---

## 📞 Comandos Úteis

```bash
# Listar agents disponíveis
ls .github/agents/

# Ver detalhes de um agent
cat .github/agents/ui-ux-frontend.md

# Verificar configuração
cat .github/copilot/hooks.json
```

---

## 🔗 Links Rápidos

- [README Completo](README.md) - Documentação detalhada
- [Agents Directory](./) - Todos os agents
- [Copilot Instructions](../copilot-instructions.md) - Visão geral do projeto

---

**Dica Final**: Comece com agents individuais para tarefas simples. À medida que ganhar confiança, use `@Dev Coordinator` para features complexas que requerem orquestração de múltiplos agents.

---

**Última atualização**: 11 de Fevereiro de 2026
