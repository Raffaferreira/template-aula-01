/**
 * Language Context
 * Gerencia o idioma da aplicação e fornece funções de tradução
 * 
 * @module contexts/LanguageContext
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

interface LanguageContextData {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends Record<Language, string>>(translations: T) => string;
}

const LanguageContext = createContext<LanguageContextData>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'pt-BR' 
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Carregar idioma do localStorage no mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('app-language') as Language;
      if (savedLanguage && ['pt-BR', 'en-US', 'es-ES'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  // Salvar idioma no localStorage quando mudar
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', lang);
    }
  }, []);

  // Função de tradução genérica
  const t = useCallback(
    <T extends Record<Language, string>>(translations: T): string => {
      return translations[language] || translations['pt-BR'];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
