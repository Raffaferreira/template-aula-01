/**
 * Authentication Internationalization Constants
 * Textos de autenticação em múltiplos idiomas
 * 
 * @module i18n/auth
 */

export const AUTH_TEXTS = {
  // Login Page
  loginTitle: {
    'pt-BR': 'Bem-vindo de Volta!',
    'en-US': 'Welcome Back!',
    'es-ES': '¡Bienvenido de Nuevo!',
  },
  loginSubtitle: {
    'pt-BR': 'Entre para continuar sua jornada',
    'en-US': 'Login to continue your journey',
    'es-ES': 'Ingresa para continuar tu viaje',
  },
  emailLabel: {
    'pt-BR': 'E-mail',
    'en-US': 'Email',
    'es-ES': 'Correo',
  },
  emailPlaceholder: {
    'pt-BR': 'seu@email.com',
    'en-US': 'your@email.com',
    'es-ES': 'tu@correo.com',
  },
  passwordLabel: {
    'pt-BR': 'Senha',
    'en-US': 'Password',
    'es-ES': 'Contraseña',
  },
  passwordPlaceholder: {
    'pt-BR': '••••••••',
    'en-US': '••••••••',
    'es-ES': '••••••••',
  },
  rememberMe: {
    'pt-BR': 'Lembrar de mim',
    'en-US': 'Remember me',
    'es-ES': 'Recuérdame',
  },
  forgotPassword: {
    'pt-BR': 'Esqueceu a senha?',
    'en-US': 'Forgot password?',
    'es-ES': '¿Olvidaste tu contraseña?',
  },
  loginButton: {
    'pt-BR': 'Entrar',
    'en-US': 'Sign In',
    'es-ES': 'Ingresar',
  },
  loginWith: {
    'pt-BR': 'ou entre com',
    'en-US': 'or sign in with',
    'es-ES': 'o ingresa con',
  },
  noAccount: {
    'pt-BR': 'Não tem uma conta?',
    'en-US': "Don't have an account?",
    'es-ES': '¿No tienes cuenta?',
  },
  createAccount: {
    'pt-BR': 'Criar conta',
    'en-US': 'Create account',
    'es-ES': 'Crear cuenta',
  },

  // Signup Page
  signupTitle: {
    'pt-BR': 'Crie Sua Conta',
    'en-US': 'Create Your Account',
    'es-ES': 'Crea Tu Cuenta',
  },
  signupSubtitle: {
    'pt-BR': 'Comece sua jornada de crescimento hoje',
    'en-US': 'Start your growth journey today',
    'es-ES': 'Comienza tu viaje de crecimiento hoy',
  },
  nameLabel: {
    'pt-BR': 'Nome Completo',
    'en-US': 'Full Name',
    'es-ES': 'Nombre Completo',
  },
  namePlaceholder: {
    'pt-BR': 'João Silva',
    'en-US': 'John Doe',
    'es-ES': 'Juan Pérez',
  },
  confirmPasswordLabel: {
    'pt-BR': 'Confirmar Senha',
    'en-US': 'Confirm Password',
    'es-ES': 'Confirmar Contraseña',
  },
  signupButton: {
    'pt-BR': 'Criar Conta',
    'en-US': 'Create Account',
    'es-ES': 'Crear Cuenta',
  },
  signupWith: {
    'pt-BR': 'ou cadastre-se com',
    'en-US': 'or sign up with',
    'es-ES': 'o regístrate con',
  },
  hasAccount: {
    'pt-BR': 'Já tem uma conta?',
    'en-US': 'Already have an account?',
    'es-ES': '¿Ya tienes cuenta?',
  },
  signupBenefit1: {
    'pt-BR': 'Acesso completo a todas as funcionalidades',
    'en-US': 'Full access to all features',
    'es-ES': 'Acceso completo a todas las funciones',
  },
  signupBenefit2: {
    'pt-BR': 'Suporte prioritário 24/7',
    'en-US': '24/7 priority support',
    'es-ES': 'Soporte prioritario 24/7',
  },
  signupBenefit3: {
    'pt-BR': 'Cancelamento gratuito a qualquer momento',
    'en-US': 'Free cancellation anytime',
    'es-ES': 'Cancelación gratuita en cualquier momento',
  },

  // Social Login
  continueGoogle: {
    'pt-BR': 'Continuar com Google',
    'en-US': 'Continue with Google',
    'es-ES': 'Continuar con Google',
  },
  continueGithub: {
    'pt-BR': 'Continuar com GitHub',
    'en-US': 'Continue with GitHub',
    'es-ES': 'Continuar con GitHub',
  },

  // Error Messages
  invalidEmail: {
    'pt-BR': 'Email inválido',
    'en-US': 'Invalid email',
    'es-ES': 'Correo inválido',
  },
  passwordTooShort: {
    'pt-BR': 'Senha deve ter no mínimo 8 caracteres',
    'en-US': 'Password must be at least 8 characters',
    'es-ES': 'La contraseña debe tener al menos 8 caracteres',
  },
  passwordsDontMatch: {
    'pt-BR': 'As senhas não coincidem',
    'en-US': 'Passwords do not match',
    'es-ES': 'Las contraseñas no coinciden',
  },
  loginFailed: {
    'pt-BR': 'Email ou senha inválidos',
    'en-US': 'Invalid email or password',
    'es-ES': 'Correo o contraseña inválidos',
  },
  signupFailed: {
    'pt-BR': 'Erro ao criar conta. Tente novamente.',
    'en-US': 'Failed to create account. Try again.',
    'es-ES': 'Error al crear cuenta. Intenta de nuevo.',
  },
  loginSuccess: {
    'pt-BR': 'Login realizado com sucesso!',
    'en-US': 'Login successful!',
    'es-ES': '¡Inicio de sesión exitoso!',
  },
  signupSuccess: {
    'pt-BR': 'Conta criada com sucesso!',
    'en-US': 'Account created successfully!',
    'es-ES': '¡Cuenta creada con éxito!',
  },
} as const;

export type Language = 'pt-BR' | 'en-US' | 'es-ES';
