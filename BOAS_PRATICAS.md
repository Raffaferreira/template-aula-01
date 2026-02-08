# 🎯 Guia de Boas Práticas - Template Aula 01

## 📋 Índice
1. [Nomenclatura](#nomenclatura)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [TypeScript](#typescript)
4. [React/Next.js](#reactnextjs)
5. [Acessibilidade](#acessibilidade)
6. [Performance](#performance)
7. [SEO](#seo)

---

## 📝 Nomenclatura

### Arquivos e Pastas
```
✅ CORRETO:
- page.tsx (Next.js App Router)
- layout.tsx (Next.js App Router)
- HeroSection.tsx (Componentes PascalCase)
- useAuth.ts (Hooks camelCase com prefixo "use")
- api/users/route.ts (API Routes)

❌ INCORRETO:
- Page.tsx
- Layout.tsx
- hero-section.tsx
- Auth.ts (sem "use" em hook)
```

### Variáveis e Funções
```typescript
// ✅ CORRETO
const userName = "João";
function handleSubmit() {}
const UserProfile = () => {};

// ❌ INCORRETO
const user_name = "João"; // snake_case
function HandleSubmit() {} // PascalCase em função
const userProfile = () => {}; // camelCase em componente
```

---

## 📁 Estrutura de Arquivos

### Recomendada para Next.js App Router
```
project/
├── app/
│   ├── (marketing)/          # Route Group
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── users/
│   │       └── route.ts
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Home Page
│   └── globals.css
├── components/
│   ├── ui/                   # Componentes genéricos
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── sections/             # Seções específicas
│       ├── HeroSection.tsx
│       └── Footer.tsx
├── lib/                      # Utilitários
│   ├── utils.ts
│   └── constants.ts
├── public/                   # Assets estáticos
│   ├── images/
│   └── videos/
├── types/                    # Type definitions
│   └── index.ts
└── hooks/                    # Custom hooks
    └── useAuth.ts
```

---

## 🔷 TypeScript

### Type vs Interface
```typescript
// ✅ Use TYPE para:
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ApiResponse<T> = { data: T; error?: string };

// ✅ Use INTERFACE para:
interface User {
  id: string;
  name: string;
  email: string;
}

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
}
```

### Evitar `any`
```typescript
// ❌ INCORRETO
function processData(data: any) {
  return data.value;
}

// ✅ CORRETO
interface DataInput {
  value: string;
}

function processData(data: DataInput) {
  return data.value;
}

// ✅ Se realmente não souber o tipo
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

### Return Types
```typescript
// ✅ SEMPRE especifique return type em funções
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

async function fetchUser(id: string): Promise<User | null> {
  // ...
}
```

---

## ⚛️ React/Next.js

### Client vs Server Components
```tsx
// ✅ Server Component (padrão)
// app/page.tsx
export default async function Page() {
  const data = await fetch('...').then(r => r.json());
  return <div>{data.title}</div>;
}

// ✅ Client Component (quando necessário)
// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Quando usar 'use client'
Use APENAS quando precisar de:
- `useState`, `useEffect`, outros hooks
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `localStorage`)
- Bibliotecas que dependem do navegador

### Props Drilling vs Context
```tsx
// ❌ Props Drilling excessivo
<PageWrapper>
  <Header user={user} />
  <Content user={user} />
  <Sidebar user={user} />
</PageWrapper>

// ✅ Context para dados globais
'use client';

import { createContext, useContext } from 'react';

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) throw new Error('useUser must be used within UserProvider');
  return user;
}
```

---

## ♿ Acessibilidade

### WCAG 2.1 - Checklist Essencial

#### Botões
```tsx
// ✅ CORRETO
<button type="button" aria-label="Fechar modal" onClick={handleClose}>
  <X />
</button>

// ❌ INCORRETO
<div onClick={handleClose}>
  <X />
</div>
```

#### Formulários
```tsx
// ✅ CORRETO
<form onSubmit={handleSubmit}>
  <label htmlFor="email">E-mail</label>
  <input 
    id="email" 
    type="email" 
    required 
    aria-describedby="email-hint"
  />
  <span id="email-hint">Usaremos apenas para contato</span>
</form>

// ❌ INCORRETO
<form>
  <input type="email" placeholder="E-mail" />
</form>
```

#### Imagens
```tsx
// ✅ CORRETO
<img src="/logo.png" alt="Logo da Empresa" />
<img src="/decoracao.png" alt="" /> {/* Decorativa */}

// ❌ INCORRETO
<img src="/logo.png" /> {/* Sem alt */}
<img src="/logo.png" alt="imagem" /> {/* Genérico */}
```

#### Navegação
```tsx
// ✅ CORRETO
<nav aria-label="Principal">
  <ul>
    <li><a href="/">Início</a></li>
    <li><a href="/sobre">Sobre</a></li>
  </ul>
</nav>

// ❌ INCORRETO
<div className="nav">
  <a href="#">Início</a>
  <a href="#">Sobre</a>
</div>
```

---

## ⚡ Performance

### Otimização de Imagens
```tsx
// ✅ CORRETO - Use next/image
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={1200} 
  height={600}
  priority // Para above-the-fold
/>

// ❌ INCORRETO
<img src="/hero.jpg" alt="Hero" />
```

### Lazy Loading
```tsx
// ✅ CORRETO
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Carregando...</p>,
  ssr: false // Se não precisar de SSR
});

// ❌ INCORRETO
import HeavyComponent from './HeavyComponent';
```

### Memoização
```tsx
// ✅ CORRETO
import { useMemo, useCallback } from 'react';

function ProductList({ products }) {
  const sortedProducts = useMemo(
    () => products.sort((a, b) => a.price - b.price),
    [products]
  );
  
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

---

## 🔍 SEO

### Metadata Estática
```tsx
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Título da Página | Marca',
  description: 'Descrição concisa de até 160 caracteres',
  keywords: ['palavra1', 'palavra2'],
  openGraph: {
    title: 'Título para redes sociais',
    description: 'Descrição para compartilhamento',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Título para Twitter',
    description: 'Descrição para Twitter',
    images: ['/twitter-image.jpg'],
  },
};
```

### Metadata Dinâmica
```tsx
// app/produtos/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const produto = await fetchProduto(params.id);
  
  return {
    title: `${produto.nome} | Sua Loja`,
    description: produto.descricao,
    openGraph: {
      images: [produto.imagem],
    },
  };
}
```

### Structured Data (JSON-LD)
```tsx
export default function ProductPage({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'BRL',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Conteúdo */}
    </>
  );
}
```

---

## 🔐 Segurança

### Links Externos
```tsx
// ✅ CORRETO
<a 
  href="https://external.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Link Externo
</a>

// ❌ INCORRETO
<a href="https://external.com" target="_blank">
  Link Externo
</a>
```

### Sanitização de Input
```tsx
// ✅ CORRETO
import DOMPurify from 'isomorphic-dompurify';

function UserComment({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// ❌ INCORRETO
function UserComment({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

---

## 📚 Recursos Adicionais

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Web Vitals](https://web.dev/vitals/)

---

**Mantenha este guia atualizado conforme o projeto evolui!**
