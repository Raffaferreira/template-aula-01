/**
 * Template: Server Component Page
 * Use este template para criar páginas com data fetching
 */
import { Metadata } from 'next';

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Título da Página',
  description: 'Descrição da página para SEO',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Título da Página',
    description: 'Descrição da página',
    type: 'website',
  },
};

// Data fetching (Server Side)
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidar a cada hora
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados');
  }

  return res.json();
}

// Página (Server Component)
export default async function PageName() {
  const data = await getData();

  return (
    <div className="container py-5">
      <h1 className="mb-4">Título da Página</h1>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Conteúdo principal */}
          <p>Conteúdo da página aqui...</p>
        </div>
        
        <div className="col-lg-4">
          {/* Sidebar */}
          <aside>
            <h3>Informações Adicionais</h3>
          </aside>
        </div>
      </div>
    </div>
  );
}
