/**
 * Navigation Internationalization Constants
 * Textos de navegação em múltiplos idiomas
 * 
 * @module i18n/navigation
 */

export const NAVIGATION = {
  home: {
    'pt-BR': 'Início',
    'en-US': 'Home',
    'es-ES': 'Inicio',
  },
  resources: {
    'pt-BR': 'Recursos',
    'en-US': 'Features',
    'es-ES': 'Recursos',
  },
  pricing: {
    'pt-BR': 'Preços',
    'en-US': 'Pricing',
    'es-ES': 'Precios',
  },
  testimonials: {
    'pt-BR': 'Depoimentos',
    'en-US': 'Testimonials',
    'es-ES': 'Testimonios',
  },
  faq: {
    'pt-BR': 'FAQ',
    'en-US': 'FAQ',
    'es-ES': 'FAQ',
  },
  login: {
    'pt-BR': 'Entrar',
    'en-US': 'Login',
    'es-ES': 'Ingresar',
  },
  signup: {
    'pt-BR': 'Começar Grátis',
    'en-US': 'Start Free',
    'es-ES': 'Empezar Gratis',
  },
  brandName: {
    'pt-BR': 'EmpresaPro',
    'en-US': 'EmpresaPro',
    'es-ES': 'EmpresaPro',
  },
} as const;

export type Language = 'pt-BR' | 'en-US' | 'es-ES';
