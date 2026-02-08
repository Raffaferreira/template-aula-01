---
applyTo: "**/*.{ts,tsx,js,jsx}"
---
# Next.js Bug Fix Instructions

## 🎯 Objetivo
Fornecer diretrizes estruturadas para identificação, análise e correção de bugs em projetos Next.js, garantindo qualidade e consistência.

---

## 🔍 Fase 1: Identificação e Análise do Bug

### 1.1 Coleta de Informações OBRIGATÓRIA
Antes de qualquer correção, você DEVE coletar:

```typescript
// ✅ Informações Essenciais
const bugContext = {
  // Onde o bug ocorre
  file: "caminho/completo/do/arquivo.tsx",
  component: "NomeDoComponente",
  lineNumber: 123,
  
  // Quando ocorre
  trigger: "ação do usuário / mounting / data fetching",
  environment: "desenvolvimento | produção | ambos",
  nextjsVersion: "13.x | 14.x | 15.x",
  
  // Como se manifesta
  errorMessage: "mensagem de erro exata",
  expectedBehavior: "o que deveria acontecer",
  actualBehavior: "o que está acontecendo",
  
  // Impacto
  severity: "crítico | alto | médio | baixo",
  affectedUsers: "todos | alguns | casos específicos"
};
```

### 1.2 Verificações Automáticas PRIMEIRO
Execute estas ferramentas ANTES de tocar no código:

```bash
# ✅ SEMPRE executar nesta ordem
get_errors               # Erros TypeScript/ESLint
grep_search              # Buscar padrões relacionados ao bug
semantic_search          # Entender contexto do código
read_file                # Ler arquivos relacionados
```

### 1.3 Checklist de Análise Next.js
- [ ] É um bug de **Client Component** (`'use client'`)? 
- [ ] É um bug de **Server Component** (padrão)?
- [ ] Envolve **Server Actions** (`'use server'`)?
- [ ] Envolve **API Routes** (`app/api/` ou `pages/api/`)?
- [ ] Está relacionado a **Rendering** (CSR/SSR/SSG/ISR)?
- [ ] Envolve **Data Fetching** (fetch, SWR, React Query)?
- [ ] Problema de **Hydration Mismatch**?
- [ ] Erro de **Metadata** ou **SEO**?
- [ ] Issue de **Roteamento** (App Router vs Pages Router)?
- [ ] Problema de **Middleware** ou **Edge Runtime**?

---

## 🛠️ Fase 2: Estratégias de Correção por Categoria

### 2.1 Bugs de Hydration Mismatch

**Sintoma**: "Text content does not match server-rendered HTML"

```tsx
// ❌ ERRADO - Renderiza diferente no server/client
export default function Page() {
  return <div>{Date.now()}</div>;
}

// ✅ CORRETO - Usa useEffect para sincronizar
'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);
  
  return <div>{timestamp ?? 'Carregando...'}</div>;
}
```

**Checklist de Fix**:
- [ ] Mover lógica client-side para `useEffect`
- [ ] Usar `suppressHydrationWarning` APENAS se inevitável
- [ ] Verificar uso de `localStorage`, `window`, `document`
- [ ] Confirmar que Server e Client renderizam o mesmo HTML inicial

### 2.2 Bugs de Server/Client Component Boundary

**Sintoma**: "You're importing a component that needs X. It only works in a Client Component"

```tsx
// ❌ ERRADO - Hooks em Server Component
export default function Page() {
  const [state, setState] = useState(0); // 💥 ERRO
  return <div>{state}</div>;
}

// ✅ CORRETO - Separar responsabilidades
// app/page.tsx (Server Component)
import ClientCounter from './ClientCounter';

export default async function Page() {
  const data = await fetchData(); // Server-side data fetching
  return <ClientCounter initialData={data} />;
}

// app/ClientCounter.tsx (Client Component)
'use client';
import { useState } from 'react';

export default function ClientCounter({ initialData }: Props) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Checklist de Fix**:
- [ ] Identificar se precisa de `'use client'` ou `'use server'`
- [ ] Mover hooks (useState, useEffect, etc.) para Client Components
- [ ] Passar dados de Server → Client via props
- [ ] Evitar passar funções não-serializáveis via props

### 2.3 Bugs de Data Fetching e Caching

**Sintoma**: Dados desatualizados, cache infinito, revalidação não funciona

```tsx
// ❌ ERRADO - Sem controle de cache
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

// ✅ CORRETO - Com estratégia de cache explícita
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // Opção 1: Revalidar a cada 60 segundos
    next: { revalidate: 60 },
    
    // Opção 2: Sempre buscar dados frescos
    // cache: 'no-store',
    
    // Opção 3: Cache com tag para revalidação sob demanda
    // next: { tags: ['users'] }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  
  return res.json();
}

// Para revalidar sob demanda (em Server Action)
import { revalidateTag } from 'next/cache';

export async function updateUser() {
  'use server';
  // ... atualizar usuário
  revalidateTag('users');
}
```

**Checklist de Fix**:
- [ ] Definir estratégia de cache apropriada (`revalidate`, `no-store`, `tags`)
- [ ] Verificar se `fetch` é usado corretamente (Next.js estende nativo)
- [ ] Implementar error handling para falhas de rede
- [ ] Considerar `loading.tsx` e `error.tsx` para UX
- [ ] Testar comportamento em dev (cache desabilitado) vs prod

### 2.4 Bugs de Roteamento (App Router)

**Sintoma**: 404 inesperado, redirecionamento incorreto, params undefined

```tsx
// ❌ ERRADO - Acessar params diretamente (Next.js 15+)
export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id); // Pode dar erro de acesso assíncrono
  return <div>User {params.id}</div>;
}

// ✅ CORRETO - Await params (Next.js 15+)
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <div>User {id}</div>;
}

// ✅ CORRETO - Para Client Components, use useParams
'use client';
import { useParams } from 'next/navigation';

export default function ClientPage() {
  const params = useParams<{ id: string }>();
  return <div>User {params.id}</div>;
}
```

**Checklist de Fix**:
- [ ] Verificar versão do Next.js (comportamento de `params` mudou)
- [ ] Usar `await params` em Server Components (Next.js 15+)
- [ ] Usar `useParams()` em Client Components
- [ ] Confirmar estrutura de pastas (`app/[id]/page.tsx`)
- [ ] Validar `searchParams` com mesma lógica

### 2.5 Bugs de Metadata e SEO

**Sintoma**: Tags `<head>` duplicadas, metadata não aparece, OG images quebrados

```tsx
// ❌ ERRADO - Usar <Head> do next/head no App Router
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Minha Página</title> {/* 💥 Não funciona no App Router */}
      </Head>
      <div>Conteúdo</div>
    </>
  );
}

// ✅ CORRETO - Usar Metadata API (App Router)
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Página',
  description: 'Descrição da página',
  openGraph: {
    title: 'Minha Página',
    description: 'Descrição da página',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return <div>Conteúdo</div>;
}

// ✅ CORRETO - Metadata dinâmica
export async function generateMetadata({ 
  params 
}: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);
  
  return {
    title: product.name,
    description: product.description,
  };
}
```

**Checklist de Fix**:
- [ ] Usar `Metadata` export para metadata estática
- [ ] Usar `generateMetadata` para metadata dinâmica
- [ ] Nunca usar `<Head>` do `next/head` no App Router
- [ ] Verificar caminhos de imagens OG (`public/` ou URL absoluta)
- [ ] Testar com validadores (Facebook Debugger, Twitter Card Validator)

### 2.6 Bugs de API Routes e Server Actions

**Sintoma**: 500 Internal Server Error, CORS issues, dados não salvam

```tsx
// ❌ ERRADO - Server Action sem 'use server'
export async function createUser(formData: FormData) {
  const name = formData.get('name'); // 💥 Pode não funcionar
  // ... salvar no DB
}

// ✅ CORRETO - Server Action com validação
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const userSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
});

export async function createUser(formData: FormData) {
  // 1. Validar dados
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
  };
  
  const validation = userSchema.safeParse(rawData);
  if (!validation.success) {
    return { 
      error: validation.error.flatten().fieldErrors 
    };
  }
  
  // 2. Executar ação
  try {
    const user = await db.users.create({
      data: validation.data,
    });
    
    // 3. Revalidar cache
    revalidatePath('/users');
    
    return { success: true, user };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { error: 'Falha ao criar usuário' };
  }
}
```

**Checklist de Fix**:
- [ ] Sempre usar `'use server'` em Server Actions
- [ ] Validar dados de entrada (zod, yup, etc.)
- [ ] Implementar error handling com try/catch
- [ ] Retornar objetos serializáveis (sem funções, classes)
- [ ] Revalidar cache quando dados mudarem
- [ ] Nunca expor segredos (API keys, tokens) no client

---

## ⚡ Fase 3: Implementação da Correção

### 3.1 Workflow de Correção Seguro

```bash
# 1. ANTES de editar
get_errors                    # Estado atual de erros
grep_search "bug_related_code" # Entender escopo

# 2. DURANTE edição
multi_replace_string_in_file  # Fazer mudanças
# OU
replace_string_in_file        # Mudanças individuais

# 3. APÓS edição
get_errors                    # Verificar se fix introduziu novos erros
run_in_terminal "npm run build" # Build de produção
run_in_terminal "npm run lint"  # Linting
```

### 3.2 Template de Commit Message

```
fix(scope): descrição curta do bug (máx 72 chars)

- Problema: [descrição do bug original]
- Causa raiz: [o que causava o bug]
- Solução: [como foi corrigido]
- Teste: [como verificar que está funcionando]

Closes #123
```

### 3.3 Checklist Pré-Commit (OBRIGATÓRIO)

- [ ] ✅ `get_errors` retorna 0 erros no arquivo modificado
- [ ] ✅ `npm run build` passa sem erros
- [ ] ✅ `npm run lint` passa sem warnings críticos
- [ ] ✅ Comportamento esperado foi testado manualmente
- [ ] ✅ Não introduziu novos bugs (regression testing)
- [ ] ✅ Código segue padrões do projeto (TSyringe, i18n, etc.)
- [ ] ✅ Commit message é descritivo

---

## 🚨 Red Flags - Quando NÃO Corrigir Diretamente

### Casos que Requerem Discussão Prévia

1. **Bug afeta arquitetura core**
   - Mudança em `AuthContext`, `SupabaseClient`, rotas principais
   - → Discutir com equipe antes

2. **Bug está em dependência externa**
   - Problema no Next.js, React, ou biblioteca third-party
   - → Pesquisar issues no GitHub, considerar workaround temporário

3. **Bug requer migração de dados**
   - Mudança em schema do banco, formato de cache
   - → Criar migration script separado

4. **Bug está em múltiplos lugares**
   - Código duplicado com mesmo problema
   - → Refatorar para DRY antes de corrigir

5. **Correção requer breaking change**
   - Mudança de API pública, remoção de prop
   - → Versionar corretamente, documentar deprecation

---

## 📚 Recursos de Referência

### Documentação Oficial Next.js
- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

### Debugging Tools
- `console.log` com emojis (padrão do projeto: 🐛 para bugs)
- Next.js Dev Overlay (aparece automaticamente em dev)
- React DevTools (browser extension)
- Network tab (para API calls)
- Vercel Logs (se deploy em Vercel)

### Common Pitfalls
- Não misturar App Router (`app/`) com Pages Router (`pages/`)
- Não usar `useRouter` do `next/router` no App Router (usar `next/navigation`)
- Não esquecer `'use client'` quando usar hooks
- Não fazer data fetching em Client Components sem SWR/React Query

---

## 🎓 Exemplos Práticos de Bugs Reais

### Exemplo 1: useEffect Infinito

```tsx
// ❌ BUG - Loop infinito
'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData); // 💥 Re-renderiza → useEffect roda → loop
  }); // ❌ Faltou dependency array
  
  return <div>{JSON.stringify(data)}</div>;
}

// ✅ CORREÇÃO - Dependency array vazio
useEffect(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(setData);
}, []); // ✅ Roda apenas uma vez
```

### Exemplo 2: Async Component sem Await

```tsx
// ❌ BUG - Promessa não resolvida
export default async function Page() {
  const data = fetchData(); // 💥 Retorna Promise, não os dados
  return <div>{data.name}</div>; // 💥 undefined
}

// ✅ CORREÇÃO - Await
export default async function Page() {
  const data = await fetchData(); // ✅ Aguarda resolução
  return <div>{data.name}</div>;
}
```

### Exemplo 3: Props Não-Serializáveis

```tsx
// ❌ BUG - Passar função de Server → Client
// app/page.tsx (Server Component)
export default function Page() {
  const handleClick = () => console.log('clicked'); // 💥 Função
  return <ClientButton onClick={handleClick} />; // 💥 Não serializável
}

// ✅ CORREÇÃO - Usar Server Action
// app/page.tsx
import ClientButton from './ClientButton';

export default function Page() {
  async function handleClick() {
    'use server';
    console.log('clicked on server');
  }
  
  return <ClientButton action={handleClick} />; // ✅ Server Action
}

// app/ClientButton.tsx
'use client';
export default function ClientButton({ 
  action 
}: { 
  action: () => Promise<void> 
}) {
  return <button onClick={() => action()}>Click</button>;
}
```

---

## ✅ Checklist Final de Qualidade

Antes de considerar o bug como **RESOLVIDO**, confirme:

- [ ] 🔍 Bug foi reproduzido localmente
- [ ] 📝 Causa raiz foi identificada e documentada
- [ ] 🛠️ Correção foi implementada seguindo padrões do projeto
- [ ] ✅ `get_errors` não mostra erros no arquivo
- [ ] 🏗️ `npm run build` passa sem warnings
- [ ] 🧹 `npm run lint` está limpo
- [ ] 🧪 Comportamento correto foi testado manualmente
- [ ] 🔄 Não introduziu regressões (bugs novos)
- [ ] 📚 Código segue convenções Next.js e do projeto
- [ ] 💬 Commit message é claro e descritivo
- [ ] 🎯 Usuário/time foi notificado da correção

---

**Última Atualização**: 28 de Novembro de 2025  
**Versão**: 1.0.0  
**Autor**: GitHub Copilot Instructions System
