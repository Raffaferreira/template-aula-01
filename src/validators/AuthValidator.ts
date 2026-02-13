/**
 * Authentication Validator
 * Valida dados de autenticação (login/signup)
 * 
 * @module validators/AuthValidator
 */

import { injectable } from 'tsyringe';
import { InputValidator } from './InputValidator';

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

@injectable()
export class AuthValidator {
  /**
   * Valida dados de login
   * @param data - Dados de login (email, password)
   * @returns Resultado da validação
   */
  validateLogin(data: LoginDto): ValidationResult {
    const errors: string[] = [];

    console.log('🔍 [AuthValidator] Validating login data...');

    // Validar email
    if (!data.email) {
      errors.push('Email é obrigatório');
    } else if (!InputValidator.validateEmail(data.email)) {
      errors.push('Email inválido');
    }

    // Validar senha
    if (!data.password) {
      errors.push('Senha é obrigatória');
    } else if (data.password.length < 8) {
      errors.push('Senha deve ter no mínimo 8 caracteres');
    }

    const isValid = errors.length === 0;

    if (isValid) {
      console.log('✅ [AuthValidator] Login validation passed');
    } else {
      console.warn('⚠️ [AuthValidator] Login validation failed:', errors);
    }

    return { isValid, errors };
  }

  /**
   * Valida dados de cadastro
   * @param data - Dados de cadastro (name, email, password, confirmPassword)
   * @returns Resultado da validação
   */
  validateSignup(data: SignupDto): ValidationResult {
    const errors: string[] = [];

    console.log('🔍 [AuthValidator] Validating signup data...');

    // Validar nome
    if (!data.name) {
      errors.push('Nome é obrigatório');
    } else if (!InputValidator.validateName(data.name, 3)) {
      errors.push('Nome deve ter no mínimo 3 caracteres');
    }

    // Validar email
    if (!data.email) {
      errors.push('Email é obrigatório');
    } else if (!InputValidator.validateEmail(data.email)) {
      errors.push('Email inválido');
    }

    // Validar senha
    if (!data.password) {
      errors.push('Senha é obrigatória');
    } else {
      const passwordValidation = InputValidator.validatePassword(data.password);
      if (!passwordValidation.isValid && passwordValidation.message) {
        errors.push(passwordValidation.message);
      }
    }

    // Validar confirmação de senha
    if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
      errors.push('As senhas não coincidem');
    }

    const isValid = errors.length === 0;

    if (isValid) {
      console.log('✅ [AuthValidator] Signup validation passed');
    } else {
      console.warn('⚠️ [AuthValidator] Signup validation failed:', errors);
    }

    return { isValid, errors };
  }

  /**
   * Sanitiza dados de entrada antes de processar
   * @param data - Dados a serem sanitizados
   * @returns Dados sanitizados
   */
  sanitizeAuthData<T extends { email?: string; name?: string }>(data: T): T {
    const sanitized = { ...data };
    
    if (sanitized.email) {
      sanitized.email = InputValidator.sanitizeString(sanitized.email).toLowerCase();
    }
    
    if (sanitized.name) {
      sanitized.name = InputValidator.sanitizeString(sanitized.name);
    }
    
    return sanitized;
  }
}
