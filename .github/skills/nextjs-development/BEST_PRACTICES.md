# Next.js Best Practices

## 🎯 Performance

### 1. Otimização de Imagens
```tsx
import Image from 'next/image';

// ✅ BOM: Usar Next/Image com dimensões
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />

// ❌ RUIM: Usar <img> tag
<img src="/hero.jpg" alt="Hero" />
```

### 2. Code Splitting Automático
```tsx
// ✅ BOM: Dynamic imports para componentes pesados
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Carregando...</p>,
  ssr: false // Desabilita SSR se necessário
});
```

### 3. Font Optimization
```tsx
// app/layout.tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## 🔒 Segurança

### 1. Variáveis de Ambiente
```tsx
// ✅ BOM: Usar variáveis de ambiente
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// ❌ RUIM: Hardcoded secrets
const apiKey = 'abc123';
```

### 2. API Routes com Validação
```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3)
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }
  
  // Processar dados validados
}
```

## 📱 Responsividade

### 1. Mobile-First Design
```tsx
// Tailwind CSS - Mobile First
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* xs: 100%, md: 50%, lg: 33.33% */}
</div>

// Bootstrap 5 - Mobile First
<div className="col-12 col-md-6 col-lg-4">
  {/* xs: 100%, md: 50%, lg: 33.33% */}
</div>
```

## 🎨 Styling

### 1. Tailwind + Bootstrap Híbrido
```tsx
// ✅ BOM: Usar Tailwind para utilidades, Bootstrap para componentes
<Button variant="primary" className="rounded-lg shadow-md">
  Enviar
</Button>

// ❌ RUIM: Misturar sistemas de grid
<div className="container row grid grid-cols-3">
```

## 🔄 Data Fetching

### 1. Server Components para Data Fetching
```tsx
// ✅ BOM: Fetch no Server Component
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### 2. Parallel Data Fetching
```tsx
// ✅ BOM: Fetch paralelo
async function Page() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  
  return <div>{/* ... */}</div>;
}
```

## 🧪 Testing

### 1. Component Tests
```tsx
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

## 📊 SEO

### 1. Metadata Completo
```tsx
export const metadata = {
  title: 'Home - Meu Site',
  description: 'Descrição otimizada para SEO',
  keywords: ['next.js', 'react', 'typescript'],
  authors: [{ name: 'Seu Nome' }],
  openGraph: {
    title: 'Home - Meu Site',
    description: 'Descrição otimizada para SEO',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - Meu Site',
    description: 'Descrição otimizada para SEO',
    images: ['/twitter-image.jpg'],
  },
};
```

### 2. Structured Data (JSON-LD)
```tsx
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Meu Site',
    url: 'https://example.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* conteúdo */}
    </>
  );
}
```
