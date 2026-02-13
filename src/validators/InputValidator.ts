/**
 * Input Validator
 * Valida e sanitiza inputs do usuário
 * 
 * @module validators/InputValidator
 */

import { injectable } from 'tsyringe';

@injectable()
export class InputValidator {
  /**
   * Sanitiza string removendo caracteres perigosos (XSS básico)
   * @param input - String a ser sanitizada
   * @returns String sanitizada
   */
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove < e > (XSS básico)
      .substring(0, 255); // Limita tamanho máximo
  }

  /**
   * Valida formato de email
   * @param email - Email a ser validado
   * @returns true se válido, false caso contrário
   */
  static validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Valida força da senha
   * @param password - Senha a ser validada
   * @returns Objeto com status de validação e mensagem de erro
   */
  static validatePassword(password: string): { 
    isValid: boolean; 
    message?: string 
  } {
    if (password.length < 8) {
      return { 
        isValid: false, 
        message: 'Senha deve ter no mínimo 8 caracteres' 
      };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Senha deve conter pelo menos 1 letra maiúscula' 
      };
    }
    
    if (!/[0-9]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Senha deve conter pelo menos 1 número' 
      };
    }
    
    return { isValid: true };
  }

  /**
   * Valida comprimento mínimo de nome
   * @param name - Nome a ser validado
   * @param minLength - Comprimento mínimo (padrão: 3)
   * @returns true se válido, false caso contrário
   */
  static validateName(name: string, minLength: number = 3): boolean {
    return name.trim().length >= minLength;
  }

  /**
   * Remove caracteres não numéricos de string
   * @param input - String com números
   * @returns String apenas com dígitos
   */
  static sanitizeNumeric(input: string): string {
    return input.replace(/\D/g, '');
  }
}
