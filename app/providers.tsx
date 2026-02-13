/**
 * Providers Component
 * Gerencia todos os Context Providers e inicialização do DI Container
 * 
 * @component
 */

'use client';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { setupDependencyInjection } from '@/src/config/di-container';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Inicializar Dependency Injection Container
  useEffect(() => {
    setupDependencyInjection();
    console.log('✅ [Providers] Dependency Injection initialized');
  }, []);

  return (
    <LanguageProvider defaultLanguage="pt-BR">
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </LanguageProvider>
  );
}
