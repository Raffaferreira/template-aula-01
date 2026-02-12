# 💡 Exemplos Práticos de Uso dos Cloud Agents

Este documento demonstra cenários reais de como usar os Cloud Agents no desenvolvimento diário.

---

## 📋 Índice

1. [Desenvolvimento de Features](#desenvolvimento-de-features)
2. [Manutenção e Refatoração](#manutenção-e-refatoração)
3. [Quality Assurance](#quality-assurance)
4. [Deploy e Infraestrutura](#deploy-e-infraestrutura)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Desenvolvimento de Features

### **Cenário 1: Criar Landing Page do Zero**

**Objetivo**: Criar landing page para "Rastreamento de Pedidos" otimizada para conversão e SEO.

#### **Passo 1: Estratégia SEO**
```
@SEO Strategist 

Defina estratégia SEO para landing page de "rastreamento de pedidos online". 
Público-alvo: consumidores finais que compram online e querem acompanhar entregas.
```

**Resposta esperada:**
- Search intent identificado
- H1 otimizado: "Como rastrear pedidos online em tempo real"
- Estrutura de H2s
- Meta title e description
- Keywords secundárias

#### **Passo 2: Copywriting Persuasivo**
```
@Copywriting Expert

Crie copy para landing page de rastreamento usando framework AIDA.
Gatilhos: controle, tranquilidade, clareza.
CTA principal: "Baixar app grátis"
```

**Resposta esperada:**
- Headlines persuasivos
- CTAs claros
- Prova social
- Benefícios vs features

#### **Passo 3: Implementação UI**
```
@UI/UX Frontend

Implemente landing page /rastreamento com:
- Hero section com H1 fornecido pelo SEO Strategist
- Copy do Copywriting Expert
- Design responsivo (mobile-first)
- Bootstrap 5 para layout
- Animações sutis (scroll reveal)
```

**Resposta esperada:**
- Código React/Next.js completo
- Componentes reutilizáveis
- Responsivo (todas breakpoints)
- Loading states

#### **Passo 4: Validação de Acessibilidade**
```
@A11y Specialist

Valide /rastreamento para WCAG 2.1 Level AA:
- Contraste de cores
- Navegação por teclado
- Screen reader compatibility
- Formulários acessíveis (se houver)
```

**Resposta esperada:**
- Issues críticos identificados
- Correções sugeridas
- Checklist de conformidade

#### **Passo 5: Otimização de Performance**
```
@Performance Optimizer

Otimize /rastreamento para:
- LCP < 2.5s
- CLS < 0.1
- Lighthouse score > 90
```

**Resposta esperada:**
- Análise de bundle size
- Sugestões de lazy loading
- Otimizações de imagem
- Estratégias de caching

#### **Passo 6: Testes Automatizados**
```
@Testing Specialist

Adicione testes E2E para /rastreamento:
- Hero section renderiza
- CTAs funcionam
- Formulário (se houver) valida
- Responsividade mobile
```

**Resposta esperada:**
- Testes Playwright completos
- Fixtures para dados de teste
- Screenshots em falhas

#### **Resultado Final:**
✅ Landing page completa, otimizada, acessível e testada em ~2-3 horas (vs ~2-3 dias manual)

---

### **Cenário 2: Adicionar Feature de Chat em Tempo Real**

**Objetivo**: Sistema de chat entre usuários e suporte usando Supabase Realtime.

#### **Usar Dev Coordinator (Orquestração)**
```
@Dev Coordinator

Implemente sistema de chat em tempo real usando Supabase Realtime:
- Usuários podem iniciar conversa
- Suporte responde em tempo real
- Histórico de mensagens persistido
- Notificações de novas mensagens
- UI com indicador de "digitando..."

Requisitos:
- Autenticação obrigatória
- Validação de mensagens (XSS prevention)
- Performance (virtualize lista de mensagens)
- Acessibilidade (screen reader friendly)
```

**Workflow automatizado do Dev Coordinator:**

1. **Research Phase** (via Research Agent):
   - Pesquisa Supabase Realtime patterns
   - Exemplos de chat UI
   - Bibliotecas de virtualização (react-window)

2. **Planning Phase**:
   - Arquitetura: Model → Repository → Validator → Service → Component
   - Identifica arquivos a criar:
     - `models/message.types.ts`
     - `repository/ChatRepository.ts`
     - `validators/MessageValidator.ts`
     - `services/ChatService.ts`
     - `components/ChatWidget.tsx`

3. **Implementation Phase** (camada por camada):
   ```typescript
   // messages.types.ts
   export interface Message {
     id: string;
     user_id: string;
     content: string;
     created_at: string;
   }
   
   // ChatRepository.ts
   export class ChatRepository {
     async sendMessage(message: Message) { /* Supabase insert */ }
     subscribeToMessages(callback) { /* Supabase realtime */ }
   }
   ```

4. **Validation Phase** (via Code Reviewer):
   - Revisa segurança (XSS, SQL injection via RLS)
   - Verifica performance (virtualization)
   - Valida padrões do projeto

5. **Testing Phase** (via Testing Specialist):
   - Testes unitários (MessageValidator, ChatService)
   - Testes E2E (enviar mensagem, receber resposta)

6. **Performance Phase** (via Performance Optimizer):
   - Virtualização de lista de mensagens
   - Debounce do indicador "digitando..."
   - Lazy load de histórico antigo

**Resultado:**
✅ Feature completa, segura, performática e testada em ~4-6 horas

---

## 🔧 Manutenção e Refatoração

### **Cenário 3: Refatorar Código Legacy**

**Objetivo**: Refatorar `DeliveryService.js` para TypeScript e melhorar qualidade.

#### **Passo 1: Análise Inicial**
```
@Code Reviewer

Analise DeliveryService.js e identifique:
- Code smells
- Vulnerabilidades de segurança
- Oportunidades de refatoração
- Compliance com padrões do projeto
```

**Resposta esperada:**
- Lista de issues por prioridade (crítico → sugestão)
- Específico com números de linha

#### **Passo 2: Pesquisa de Padrões**
```
@Research Agent (via Dev Coordinator)

Pesquise melhores práticas para:
- Migração JS → TS em services
- Patterns de error handling
- Dependency Injection com TSyringe
```

#### **Passo 3: Implementação**
```
# Você faz as mudanças baseado no feedback

# Exemplo:
// Antes (DeliveryService.js)
class DeliveryService {
  constructor() {
    this.validator = new DeliveryValidator();
    this.repo = new DeliveryRepository();
  }
  
  async create(data) {
    // Sem validação de tipos
    // Error handling genérico
  }
}

// Depois (DeliveryService.ts)
import { injectable, inject } from 'tsyringe';

@injectable()
export class DeliveryService {
  constructor(
    @inject(DeliveryValidator) private validator: DeliveryValidator,
    @inject(DeliveryRepository) private repo: DeliveryRepository
  ) {}
  
  async create(data: DeliveryDTO): Promise<ServiceResponse<Delivery>> {
    const validation = this.validator.validateAll(data);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    
    try {
      const result = await this.repo.insert(data);
      return { success: true, data: result };
    } catch (error) {
      logger.error('Failed to create delivery', error);
      return { success: false, error: error.message };
    }
  }
}
```

#### **Passo 4: Validação Pós-Refatoração**
```
@Code Reviewer

Revise DeliveryService.ts refatorado:
- Melhorias aplicadas?
- Novos problemas introduzidos?
- Testes necessários?
```

#### **Passo 5: Testes de Regressão**
```
@Testing Specialist

Adicione testes unitários para DeliveryService.ts garantindo:
- Comportamento existente mantido
- Casos de borda cobertos
- Mocks de dependências
```

**Resultado:**
✅ Código refatorado, type-safe, testado, seguindo padrões do projeto

---

## ✅ Quality Assurance

### **Cenário 4: Garantir Qualidade Antes de Production**

**Objetivo**: Validar feature completa antes de merge para main.

#### **Checklist Completo:**

```bash
# 1. Code Review
@Code Reviewer Analise todos os arquivos modificados nesta PR focando em:
- Segurança (XSS, SQL injection)
- Performance (N+1 queries, re-renders)
- Aderência aos padrões do projeto

# 2. Performance Audit
@Performance Optimizer Valide que:
- Bundle size não aumentou > 10%
- LCP < 2.5s em páginas modificadas
- Nenhum Client Component desnecessário

# 3. Acessibilidade
@A11y Specialist Confirme WCAG 2.1 AA em:
- Novos componentes
- Formulários modificados
- Modals/interações adicionadas

# 4. Cobertura de Testes
@Testing Specialist Verifique:
- Testes E2E para happy path
- Testes unitários para lógica crítica
- Edge cases cobertos

# 5. Infraestrutura
@Infrastructure & DevOps Confirme:
- CI passa (lint, type-check, build, tests)
- Preview deploy funcional
- Variáveis de ambiente corretas
```

**Resultado:**
✅ Feature validada em múltiplas dimensões antes de produção

---

## 🚀 Deploy e Infraestrutura

### **Cenário 5: Setup de CI/CD do Zero**

**Objetivo**: Configurar pipeline completo de CI/CD com quality gates.

```
@Infrastructure & DevOps

Configure CI/CD para o projeto com:

1. **Build Pipeline:**
   - Install dependencies (cache npm)
   - Lint (ESLint)
   - Type-check (TypeScript)
   - Build (Next.js)
   - Unit tests (Jest)
   - E2E tests (Playwright)

2. **Quality Gates:**
   - Lighthouse CI (score > 90)
   - Bundle size check (< limite)
   - Security audit (npm audit)

3. **Deploy Stages:**
   - Pull Request → Preview deploy (Vercel)
   - Merge to develop → Staging deploy
   - Merge to main → Production deploy (com approval manual)

4. **Monitoring:**
   - Vercel Analytics
   - Sentry error tracking
   - Alertas para erros críticos

5. **Rollback:**
   - Automático se health check falhar
   - Manual via workflow_dispatch
```

**Resposta esperada:**
- Workflows YAML completos
- Documentação de secrets necessários
- Runbook de rollback

**Resultado:**
✅ CI/CD production-ready em ~2 horas

---

## 🐛 Troubleshooting

### **Cenário 6: Debugar Bug em Produção**

**Objetivo**: Investigar e corrigir erro reportado por usuários.

#### **Sintoma:**
"Formulário de cadastro não envia dados - erro 500"

#### **Investigação:**

```
# Etapa 1: Análise do código
@Code Reviewer

Analise RegisterForm.tsx e UserService.ts procurando:
- Validação de dados
- Error handling
- Possíveis race conditions
- Logs adequados
```

```
# Etapa 2: Pesquisa de causa raiz
@Research Agent (via Dev Coordinator)

Pesquise issues conhecidos relacionados a:
- Supabase RLS em operações de insert
- Validação de email uniqueness
- Formulários Next.js App Router
```

```
# Etapa 3: Implementar fix
[Baseado no achado, implementar correção]

# Exemplo: Adicionar validação de email único antes de insert
async register(email: string) {
  // Verificar se email já existe
  const existing = await this.repo.findByEmail(email);
  if (existing) {
    return { success: false, error: 'Email já cadastrado' };
  }
  
  // Prosseguir com registro
}
```

```
# Etapa 4: Adicionar teste de regressão
@Testing Specialist

Adicione teste E2E que reproduz o bug:
- Tentar cadastrar com email duplicado
- Verificar mensagem de erro adequada
- Confirmar que não houve insert no banco
```

```
# Etapa 5: Validação final
@Code Reviewer

Revise o fix:
- Resolve o problema?
- Introduz novos bugs?
- Logs adequados para debug futuro?
```

**Resultado:**
✅ Bug corrigido, teste de regressão adicionado, documentado

---

## 📊 Métricas de Impacto

### **Antes dos Cloud Agents:**
- Landing page completa: **2-3 dias**
- Refatoração de service: **1 dia**
- Setup CI/CD: **1 semana**
- Debug de bug complexo: **4-6 horas**

### **Com Cloud Agents:**
- Landing page completa: **2-3 horas** (↓ 80%)
- Refatoração de service: **2 horas** (↓ 75%)
- Setup CI/CD: **2 horas** (↓ 95%)
- Debug de bug complexo: **1 hora** (↓ 75%)

### **Qualidade:**
- Acessibilidade: ↑ 40% conformidade WCAG
- Performance: ↑ 30% Lighthouse score médio
- Cobertura de testes: ↑ 50%
- Vulnerabilidades: ↓ 70%

---

## 🎓 Dicas Finais

### **1. Contexto é Rei**
```bash
❌ @Code Reviewer revise
✅ @Code Reviewer revise UserService.ts focando em segurança e validação de inputs
```

### **2. Combine Agents Estrategicamente**
```bash
Feature simples: Agent individual
Feature complexa: Dev Coordinator (orquestra múltiplos)
```

### **3. Itere Baseado em Feedback**
```bash
1. @Agent faça X
2. Leia resposta
3. Refine prompt se necessário
4. Aplique mudanças
5. @Agent valide resultado
```

### **4. Use Workflows Prontos**
Consulte [QUICK-START.md](QUICK-START.md) para workflows testados.

---

## 📞 Próximos Passos

1. **Experimente**: Comece com cenário simples (criar componente)
2. **Documente**: Anote workflows que funcionam bem para seu time
3. **Customize**: Crie agents específicos para seu domínio se necessário
4. **Compartilhe**: Ensine o time os workflows mais eficazes

---

**Recursos Adicionais:**
- [README.md](README.md) - Documentação completa
- [QUICK-START.md](QUICK-START.md) - Referência rápida
- [Agents Directory](./) - Todos os agents disponíveis

---

**Última atualização**: 11 de Fevereiro de 2026
