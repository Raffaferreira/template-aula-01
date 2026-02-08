# GitHub Copilot - Instruções para Mensagens de Commit

## 🎯 Formato Padrão

Use o formato Conventional Commits com emojis:

```
<emoji> <tipo>(<escopo>): <descrição curta>

<corpo detalhado (opcional)>

<rodapé (opcional)>
```

## 📋 Tipos de Commit

| Tipo | Emoji | Quando Usar |
|------|-------|-------------|
| `feat` | ✨ | Nova funcionalidade |
| `fix` | 🐛 | Correção de bug |
| `docs` | 📝 | Apenas documentação |
| `style` | 💄 | Formatação, espaços em branco |
| `refactor` | ♻️ | Refatoração sem mudar funcionalidade |
| `perf` | ⚡ | Melhoria de performance |
| `test` | ✅ | Adicionar/corrigir testes |
| `chore` | 🔧 | Manutenção, configs, dependências |
| `build` | 📦 | Sistema de build, dependências |
| `ci` | 👷 | CI/CD, Docker, deploy |
| `revert` | ⏪ | Reverter commit anterior |

## 🏗️ Escopos Comuns

- `delivery` - Sistema de rotas de entrega
- `auth` - Autenticação e autorização
- `ui` - Interface do usuário
- `api` - Integrações externas (Mapbox, Supabase)
- `validation` - Camada de validação
- `repository` - Camada de dados
- `service` - Camada de negócio
- `types` - TypeScript types/interfaces
- `i18n` - Internacionalização
- `dashboard` - Páginas do dashboard

## ✍️ Exemplos

### Funcionalidade Nova

```
✨ feat(delivery): adicionar validação completa de rotas

- Implementar DeliveryRouteValidator com 200+ regras
- Validar entregador, endereços e modo de rota
- Retornar errors (bloqueiam) e warnings (alertam)
- Prevenir erros de banco antes de persistir

Refs: VALIDATION_LAYER_GUIDE.md
```

### Correção de Bug

```
🐛 fix(repository): corrigir truncamento do campo state

Campo state aceita apenas 2 caracteres (VARCHAR(2))
APIs retornavam nome completo ("São Paulo")

Solução: .substring(0, 2).toUpperCase()

Arquivos afetados:
- MapboxAutocomplete.jsx
- NominatimAutocomplete.jsx
- DeliveryRouteModel.ts
```

### Conversão TypeScript

```
♻️ refactor(services): migrar notificações de Zenvia para SMSDev/WABA

- Substituir NotificationServiceZenvia por SMSDev e Meta WABA
- Implementar envio dual (SMS + WhatsApp) em todas rotas
- Adicionar tipos completos em notification.types.ts
- Corrigir tratamento de erros unknown no TypeScript
- Zero erros de compilação

Files: DeliveryRouteService.ts, NotificationServiceSMSDev.ts, NotificationServiceMetaWhatsApp.ts
```

### Documentação

```
📝 docs(readme): atualizar guia de migração TypeScript

- Adicionar checklist obrigatório
- Documentar processo de validação com get_errors
- Incluir link para TypeScript Error Reference
- Atualizar status: 11 arquivos convertidos
```

### Configuração

```
🔧 chore(build): configurar obfuscação em produção

- Adicionar vite-plugin-javascript-obfuscator
- Configurar code splitting por vendor
- Remover console.log em build
- Desabilitar sourcemaps
```

## 🎨 Regras de Escrita

1. **Primeira linha**: máximo 72 caracteres
2. **Tempo verbal**: presente do indicativo ("adicionar" não "adicionado")
3. **Idioma**: português (projeto brasileiro)
4. **Corpo**: explicar O QUÊ e POR QUÊ, não COMO
5. **Referências**: mencionar arquivos/issues relevantes
6. **Breaking changes**: iniciar rodapé com `BREAKING CHANGE:`

## 🚫 Evitar

- ❌ "Corrigir bug" (seja específico)
- ❌ "WIP" ou "temp" (não commitar trabalho incompleto)
- ❌ Commits genéricos sem contexto
- ❌ Misturar múltiplas mudanças não relacionadas
- ❌ Inglês misturado com português

## ✅ Boas Práticas

- ✅ Um commit = uma mudança lógica
- ✅ Commits frequentes e pequenos
- ✅ Mensagens descritivas e úteis
- ✅ Mencionar arquivos críticos afetados
- ✅ Referenciar issues/PRs quando aplicável
- ✅ Explicar decisões não-óbvias

## 🔗 Padrões do Projeto

- **Camadas**: Service → Validator → Repository → Database
- **Tipos**: Sempre criar em `src/models/*.types.ts`
- **Logs**: Usar emojis (🔍, 🗄️, 💾, ❌, ⚠️, ✅)
- **Validação**: Sempre validar antes de persistir
- **TypeScript**: Sem erros de compilação (verificar com `get_errors`)
- **Bootstrap 5**: Framework UI padrão (não Tailwind)

## 📖 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji](https://gitmoji.dev/)
- Projeto: `NOTAS_DESENVOLVIMENTO.md`, `.github/copilot-instructions.md`
