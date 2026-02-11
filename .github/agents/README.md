# 🤖 Sistema de Cloud Agents

Este repositório utiliza **GitHub Copilot Cloud Agents** - agentes especializados de IA que auxiliam no desenvolvimento, revisão e manutenção do código.

## 📋 Índice

1. [O que são Cloud Agents?](#o-que-são-cloud-agents)
2. [Agents Disponíveis](#agents-disponíveis)
3. [Como Usar](#como-usar)
4. [Como Criar Novos Agents](#como-criar-novos-agents)
5. [Configuração](#configuração)
6. [Boas Práticas](#boas-práticas)

---

## 🎯 O que são Cloud Agents?

Cloud Agents são assistentes de IA especializados que:
- Automatizam tarefas repetitivas
- Garantem padrões de código consistentes
- Aceleram desenvolvimento com contexto especializado
- Revisam código sob múltiplas perspectivas
- Fornecem guidance arquitetural

Cada agent é um especialista em uma área específica (SEO, UI/UX, Testing, etc.) e pode ser invocado conforme necessário.

---

## 🤖 Agents Disponíveis

### 📊 **Agents de Desenvolvimento**

#### 1. **SEO Strategist** (`agent-seo.md`)
**Quando usar**: Criando páginas públicas, otimizando para busca, definindo meta tags

**Especialidades:**
- Otimização de search intent
- Estrutura de conteúdo SEO-friendly
- Titles, meta descriptions e headings
- Internal linking strategy

**Ferramentas**: `read`, `search`

---

#### 2. **UI/UX Frontend** (`agent-ui-ux-frontend.md`)
**Quando usar**: Criando componentes, páginas, design system, animações

**Especialidades:**
- Next.js App Router
- React components e hooks
- Bootstrap 5 + Tailwind CSS
- UX Writing e microcopy
- Acessibilidade (A11y)
- Performance frontend

**Ferramentas**: `read`, `search`, `edit`, `create`

---

#### 3. **UX Writer / Copywriter** (`agent-ux-seo.md`)
**Quando usar**: Escrevendo copy, CTAs, mensagens de erro/sucesso

**Especialidades:**
- Tom de voz consistente (autoridade, clareza)
- Gatilhos mentais (prova social, escassez)
- Copywriting frameworks (AIDA, PAS, FAB)
- Microcopy para UI

**Ferramentas**: `read`, `search`

---

### 🔍 **Agents de Qualidade**

#### 4. **Code Reviewer** (`code-reviewer.agent.md`)
**Quando usar**: Revisando código antes de commit, analisando PRs

**Perspectivas de análise:**
- ✅ Correção lógica e edge cases
- ✅ Qualidade e legibilidade
- ✅ Segurança (XSS, SQL injection, RLS)
- ✅ Performance (re-renders, queries)
- ✅ Aderência aos padrões do projeto
- ✅ Next.js e React best practices

**Ferramentas**: `read`, `search`  
**User-invokable**: `false` (invocado por Dev Coordinator)

---

#### 5. **Testing Specialist** (`testing-agent.md`)
**Quando usar**: Criando testes E2E, unitários, configurando Playwright

**Especialidades:**
- Playwright (E2E testing)
- Jest (unit testing)
- React Testing Library
- Test patterns por camada (Validator, Service, Repository, Component)
- Fixtures e mocks
- Coverage analysis

**Ferramentas**: `read`, `search`, `edit`, `create`

---

#### 6. **Performance Optimizer** (`performance-agent.md`)
**Quando usar**: Otimizando carregamento, reduzindo bundle, melhorando Web Vitals

**Especialidades:**
- Core Web Vitals (LCP, FID, CLS)
- Server vs Client Components
- Code splitting e lazy loading
- Image optimization (next/image)
- Font optimization
- React performance (useMemo, useCallback, React.memo)
- Bundle analysis

**Ferramentas**: `read`, `search`, `edit`

---

#### 7. **A11y Specialist** (`a11y-agent.md`)
**Quando usar**: Garantindo acessibilidade (WCAG 2.1 AA)

**Especialidades:**
- Navegação por teclado
- Leitores de tela (NVDA, VoiceOver)
- Contraste de cores
- Semântica HTML e ARIA
- Formulários acessíveis
- Modals e interações acessíveis
- Testes automatizados (axe-core)

**Ferramentas**: `read`, `search`, `edit`

---

### 🛠️ **Agents de Infraestrutura**

#### 8. **Infrastructure & DevOps** (`infrastructure-agent.md`)
**Quando usar**: Configurando CI/CD, deploy, monitoramento

**Especialidades:**
- Deploy (Vercel, Azure, AWS)
- GitHub Actions workflows
- Secrets management
- Monitoring (Sentry, Analytics)
- Rollback strategies
- Security headers
- Lighthouse CI

**Ferramentas**: `read`, `search`, `edit`, `create`

---

### 📚 **Agents de Coordenação**

#### 9. **Dev Coordinator** (`dev-coordinator.agent.md`)
**Quando usar**: Features complexas que precisam orquestração de múltiplos agents

**Workflow:**
1. 🔎 **Discovery**: Research Agent pesquisa padrões
2. 📋 **Planning**: Quebra feature em tasks incrementais
3. 🛠️ **Implementation**: Implementa camada por camada
4. ✅ **Review**: Code Reviewer valida qualidade
5. 🔄 **Refinement**: Itera até convergir

**Subagents**: Research Agent, Code Reviewer

---

#### 10. **Research Agent** (`research.agent.md`)
**Quando usar**: Pesquisando documentação, padrões, bibliotecas

**Fontes priorizadas:**
- Workspace local (código existente)
- Documentação oficial (Next.js, React, Supabase)
- GitHub repositories
- Stack Overflow (último recurso)

**Ferramentas**: `read`, `search`, `githubRepo`  
**User-invokable**: `false` (invocado por Dev Coordinator)

---

#### 11. **README Agent** (`readme-agent.md`)
**Quando usar**: Criando ou atualizando documentação

**Especialidades:**
- Documentação técnica clara
- Exemplos de código
- Guias de setup
- API documentation

**Ferramentas**: `read`, `search`, `edit`, `create`

---

#### 12. **Copywriting Expert** (`copywriting.agent.md`)
**Quando usar**: Escrevendo copy para landing pages, marketing, emails

**Frameworks:**
- AIDA (Atenção → Interesse → Desejo → Ação)
- PAS (Problema → Agitação → Solução)
- FAB (Features → Advantages → Benefits)

**Ferramentas**: `read`, `search`

---

## 🚀 Como Usar

### **Método 1: Invocação Direta no Chat**

```
@SEO Strategist Otimize a meta description da página /dashboard
```

```
@UI/UX Frontend Crie um modal acessível para confirmar exclusão
```

```
@Testing Specialist Adicione testes E2E para o fluxo de login
```

### **Método 2: Via Comentários no Código**

```typescript
// @Code Reviewer Revise este service antes do commit
export class DeliveryRouteService {
  // ...
}
```

### **Método 3: Workflow Orquestrado**

```
@Dev Coordinator Implemente autenticação com Supabase

→ Dev Coordinator invoca:
  → Research Agent: Pesquisa padrões
  → Implementa camada por camada
  → Code Reviewer: Valida segurança
  → Testing Specialist: Adiciona testes
```

---

## 🛠️ Como Criar Novos Agents

### **1. Estrutura do Arquivo**

Crie um novo arquivo em `.github/agents/nome-do-agent.md`:

```markdown
---
name: Nome do Agent
description: Breve descrição do que o agent faz
tools: ['read', 'search', 'edit', 'create']
model: Claude Sonnet 4.5 (opcional)
user-invokable: true (padrão) ou false
agents: ['Agent1', 'Agent2'] (se usar subagents)
---

# Nome do Agent

Você é um [descrição da especialidade].

Você é SEMPRE invocado quando:
- Situação 1
- Situação 2
- Situação 3

---

## 🎯 FILOSOFIA

[Princípios que guiam o agent]

---

## 📐 PADRÕES E PRÁTICAS

[Guidelines, exemplos de código, checklists]

---

## ⚠️ ANTI-PATTERNS

[O que evitar, exemplos de código ruim vs bom]

---

## 📚 RECURSOS

[Links para documentação relevante]

---

**REGRA FINAL:**

> [Frase de síntese que resume a filosofia do agent]
```

### **2. Tools Disponíveis**

- `read` - Ler arquivos e diretórios
- `search` - Buscar código e conteúdo
- `edit` - Editar arquivos existentes
- `create` - Criar novos arquivos
- `agent` - Invocar outros agents (subagents)
- `githubRepo` - Pesquisar em repositórios GitHub

### **3. Boas Práticas para Agents**

✅ **DO:**
- Seja específico na descrição
- Forneça exemplos práticos (código)
- Inclua checklists acionáveis
- Mostre anti-patterns (o que evitar)
- Referencie documentação oficial
- Mantenha tom consistente (segunda pessoa: "você")

❌ **DON'T:**
- Não seja vago ou genérico
- Não assuma conhecimento prévio sem explicar
- Não misture múltiplas responsabilidades em um agent
- Não duplique conteúdo de outros agents

---

## ⚙️ Configuração

### **GitHub Copilot Hooks**

O projeto usa hooks configurados em `.github/copilot/hooks.json`:

```json
{
  "onCodeEdit": {
    "instruction": "Verificações automáticas durante edição..."
  },
  "onCodeComplete": {
    "instruction": "Sugestões de código..."
  },
  "onFileCreate": {
    "instruction": "Padrões para novos arquivos..."
  }
}
```

### **Contextual Instructions**

Instruções são carregadas automaticamente baseado no arquivo sendo editado:

| Arquivo | Instruction File |
|---------|------------------|
| `src/services/**/*.ts` | `typescript-services.instructions.md` |
| `src/validators/**/*.ts` | `typescript-validators.instructions.md` |
| `src/components/**/*.tsx` | `react-components.instructions.md` |

Veja `.github/copilot-instructions.md` para lista completa.

---

## 📊 Boas Práticas

### **1. Escolha o Agent Certo**

```
Feature simples → Agent específico (@UI/UX Frontend)
Feature complexa → Dev Coordinator (orquestra múltiplos agents)
```

### **2. Forneça Contexto**

```
❌ Ruim: @Code Reviewer revise
✅ Bom: @Code Reviewer revise DeliveryRouteService.ts focando em segurança e performance
```

### **3. Iteração**

```
1. @Research Agent pesquise autenticação Supabase
2. Leia achados
3. @UI/UX Frontend implemente login page baseado na pesquisa
4. @Testing Specialist adicione testes E2E
5. @Code Reviewer valide implementação final
```

### **4. Validação Contínua**

Sempre execute após mudanças:
```bash
npm run lint
npm run type-check
npm run build
npm test
```

---

## 🎯 Exemplos de Uso

### **Exemplo 1: Criar Nova Feature**

```
@Dev Coordinator Implemente sistema de notificações push

→ Workflow automático:
  1. Research Agent pesquisa bibliotecas
  2. Dev Coordinator planeja arquitetura
  3. Implementa: Model → Repository → Validator → Service → Component
  4. Code Reviewer valida cada camada
  5. Testing Specialist adiciona testes
  6. Performance Optimizer revisa bundle impact
```

### **Exemplo 2: Otimizar Página Existente**

```
@Performance Optimizer Analise /dashboard e reduza LCP para < 2.5s

→ Agent analisa:
  - Imagens não otimizadas → next/image
  - Client Component desnecessário → Server Component
  - Bundle size grande → dynamic imports
```

### **Exemplo 3: Garantir Acessibilidade**

```
@A11y Specialist Revise LoginForm.tsx para WCAG 2.1 AA

→ Agent verifica:
  - Labels associados a inputs
  - Contraste de cores adequado
  - Navegação por teclado
  - Mensagens de erro anunciadas
```

---

## 📚 Recursos Adicionais

- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [Next.js Docs](https://nextjs.org/docs)
- [Playwright Docs](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Contribuindo

Para adicionar novos agents:

1. Crie arquivo em `.github/agents/nome-agent.md`
2. Siga estrutura padrão (veja seção "Como Criar Novos Agents")
3. Adicione entrada neste README
4. Teste invocação: `@Nome Agent comando de teste`

---

## 📞 Suporte

Dúvidas sobre agents?
- Consulte `.github/copilot-instructions.md` para visão geral do projeto
- Veja agents existentes como referência
- Teste com `@Dev Coordinator` para features complexas

---

**Última atualização**: 11 de Fevereiro de 2026

**Agents ativos**: 12  
**Linguagens suportadas**: TypeScript, JavaScript, React, Next.js  
**Frameworks**: Next.js 16, React 19, Bootstrap 5, Tailwind CSS
