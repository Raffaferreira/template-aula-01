# Make.com Integration Guide

## 🔗 Métodos de Integração

### 1. Extensão Make Apps Editor (Recomendado para Desenvolvedores de Apps)

**Instalação:**
```bash
code --install-extension integromat.apps-sdk
```

**Uso:**
- Desenvolver apps customizados para Make
- Criar módulos e ações personalizadas
- Testar e fazer deploy de integrações

---

### 2. Webhooks (Melhor para Automação de Projetos)

#### Setup Webhook no Make:

1. **No Make.com:**
   - Crie um novo Scenario
   - Adicione o módulo "Webhooks > Custom Webhook"
   - Copie a URL do webhook

2. **No VS Code:**
   - Configure webhooks para eventos Git
   - Envie dados do projeto para Make
   - Receba notificações de automações

#### Exemplo: Webhook no package.json

```json
{
  "scripts": {
    "deploy:notify": "curl -X POST https://hook.make.com/xxx -H 'Content-Type: application/json' -d '{\"event\":\"deploy\",\"project\":\"template-aula-01\"}'"
  }
}
```

---

### 3. API REST do Make

#### Usar a API do Make diretamente:

```typescript
// make-client.ts
const MAKE_API_KEY = process.env.MAKE_API_KEY;
const MAKE_TEAM_ID = process.env.MAKE_TEAM_ID;

async function triggerScenario(scenarioId: string, data: any) {
  const response = await fetch(
    `https://eu1.make.com/api/v2/scenarios/${scenarioId}/run`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Token ${MAKE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  
  return response.json();
}
```

#### Obter API Token:
1. Make.com → Profile → API
2. Gerar novo API token
3. Adicionar ao `.env`

---

### 4. GitHub Actions + Make (CI/CD)

#### Workflow Example:

```yaml
# .github/workflows/make-integration.yml
name: Make Integration

on:
  push:
    branches: [ main ]

jobs:
  notify-make:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Make Scenario
        run: |
          curl -X POST ${{ secrets.MAKE_WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{"event":"push","branch":"${{ github.ref }}"}'
```

---

### 5. VS Code Tasks (Integração Local)

#### Configurar em `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Notify Make on Build",
      "type": "shell",
      "command": "curl",
      "args": [
        "-X", "POST",
        "https://hook.make.com/YOUR_WEBHOOK_ID",
        "-H", "Content-Type: application/json",
        "-d", "{\"event\":\"build\",\"status\":\"success\"}"
      ],
      "problemMatcher": []
    }
  ]
}
```

---

## 🎯 Casos de Uso Comuns

### 1. Deploy Notification
Notificar Make quando fazer deploy da aplicação

### 2. Error Monitoring
Enviar erros de build para Make → Slack/Discord

### 3. Database Sync
Sincronizar dados do Supabase via Make após commits

### 4. Code Quality Reports
Enviar relatórios de lint/tests para Make → Google Sheets

### 5. Pull Request Automation
Disparar workflows Make quando criar PRs

---

## 📚 Recursos Make.com

- [Make API Documentation](https://www.make.com/en/api-documentation)
- [Webhooks Guide](https://www.make.com/en/help/tools/webhooks)
- [Apps SDK Documentation](https://docs.make.com/apps)
- [Make Academy](https://www.make.com/en/academy)

---

## 🔐 Segurança

**NUNCA commitar:**
- ❌ API tokens do Make
- ❌ URLs de webhooks com IDs sensíveis
- ❌ Credenciais de integração

**SEMPRE usar:**
- ✅ Variáveis de ambiente (`.env`)
- ✅ GitHub Secrets (para workflows)
- ✅ `.gitignore` para arquivos sensíveis

---

## 🚀 Quick Start

1. Instalar extensão Make Apps Editor
2. Criar conta em Make.com
3. Configurar webhook para eventos Git
4. Testar integração com curl/Postman
5. Automatizar com VS Code Tasks

---

**Última Atualização:** Fevereiro 2026
