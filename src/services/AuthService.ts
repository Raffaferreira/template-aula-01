/**
 * Authentication Service
 * Gerencia autenticação de usuários (login, signup, logout)
 * 
 * @module services/AuthService
 */

import { injectable, inject } from 'tsyringe';
import { AuthValidator, LoginDto, SignupDto } from '@/src/validators/AuthValidator';
import { supabase, isSupabaseConfigured } from '@/src/config/supabase';

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: any;
}

@injectable()
export class AuthService {
  constructor(
    @inject(AuthValidator) private validator: AuthValidator
  ) {}

  /**
   * Realiza login do usuário
   * @param data - Dados de login (email, password)
   * @returns Resultado da operação
   */
  async login(data: LoginDto): Promise<AuthResponse> {
    console.log('🔐 [AuthService] Starting login...');

    // 1. Validar dados antes de enviar
    const validation = this.validator.validateLogin(data);
    if (!validation.isValid) {
      console.error('❌ [AuthService] Validation failed:', validation.errors);
      return { 
        success: false, 
        error: validation.errors[0] 
      };
    }

    // 2. Verificar se Supabase está configurado
    if (!isSupabaseConfigured()) {
      console.error('❌ [AuthService] Supabase not configured');
      return {
        success: false,
        error: 'Autenticação não disponível. Configure as variáveis de ambiente.',
      };
    }

    try {
      // 3. Chamar Supabase Auth
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('❌ [AuthService] Login error:', error.message);
        return { 
          success: false, 
          error: 'Email ou senha inválidos' 
        };
      }

      console.log('✅ [AuthService] Login successful');
      return { success: true, data: authData };
    } catch (error) {
      console.error('❌ [AuthService] Unexpected error:', error);
      return { 
        success: false, 
        error: 'Erro inesperado. Tente novamente.' 
      };
    }
  }

  /**
   * Realiza cadastro de novo usuário
   * @param data - Dados de cadastro (name, email, password)
   * @returns Resultado da operação
   */
  async signup(data: SignupDto): Promise<AuthResponse> {
    console.log('🔐 [AuthService] Starting signup...');

    // 1. Validar dados antes de enviar
    const validation = this.validator.validateSignup(data);
    if (!validation.isValid) {
      console.error('❌ [AuthService] Validation failed:', validation.errors);
      return { 
        success: false, 
        error: validation.errors[0] 
      };
    }

    // 2. Verificar se Supabase está configurado
    if (!isSupabaseConfigured()) {
      console.error('❌ [AuthService] Supabase not configured');
      return {
        success: false,
        error: 'Cadastro não disponível. Configure as variáveis de ambiente.',
      };
    }

    try {
      // 3. Chamar Supabase Auth
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { 
            name: data.name,
          },
        },
      });

      if (error) {
        console.error('❌ [AuthService] Signup error:', error.message);
        
        // Mensagens específicas para erros comuns
        if (error.message.includes('already registered')) {
          return { 
            success: false, 
            error: 'Este email já está cadastrado' 
          };
        }
        
        return { 
          success: false, 
          error: 'Erro ao criar conta. Tente novamente.' 
        };
      }

      console.log('✅ [AuthService] Signup successful');
      return { success: true, data: authData };
    } catch (error) {
      console.error('❌ [AuthService] Unexpected error:', error);
      return { 
        success: false, 
        error: 'Erro inesperado. Tente novamente.' 
      };
    }
  }

  /**
   * Realiza logout do usuário
   * @returns Resultado da operação
   */
  async logout(): Promise<AuthResponse> {
    console.log('🔐 [AuthService] Starting logout...');

    if (!isSupabaseConfigured()) {
      return { success: true }; // Sem Supabase, logout é apenas local
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ [AuthService] Logout error:', error.message);
        return { 
          success: false, 
          error: 'Erro ao fazer logout' 
        };
      }

      console.log('✅ [AuthService] Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ [AuthService] Unexpected error:', error);
      return { 
        success: false, 
        error: 'Erro inesperado ao fazer logout' 
      };
    }
  }

  /**
   * Obtém o usuário autenticado atualmente
   * @returns Dados do usuário ou null
   */
  async getCurrentUser() {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('❌ [AuthService] Get user error:', error.message);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('❌ [AuthService] Unexpected error:', error);
      return null;
    }
  }
}
