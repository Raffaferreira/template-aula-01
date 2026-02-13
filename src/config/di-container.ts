/**
 * Dependency Injection Container Setup
 * Configuração central do TSyringe para o projeto
 * 
 * @module config/di-container
 * @created 2026-02-11
 * @updated 2026-02-13
 */

import 'reflect-metadata'; // OBRIGATÓRIO: Deve ser importado antes de qualquer uso de decorators
import { container } from 'tsyringe';

// Importar repositories
import { UserRepository } from '../repository/UserRepository';

// Importar validators
import { AuthValidator } from '../validators/AuthValidator';
import { InputValidator } from '../validators/InputValidator';

// Importar services
import { AuthService } from '../services/AuthService';

/**
 * Registra todas as dependências no container
 * 
 * IMPORTANTE: Chamar esta função no início da aplicação (main.tsx, layout.tsx, etc)
 * 
 * @example
 * // Em app/layout.tsx ou main.tsx
 * import { setupDependencyInjection } from '@/config/di-container';
 * setupDependencyInjection();
 */
export function setupDependencyInjection(): void {
  console.log('🏗️ [DI Container] Configurando Dependency Injection...');

  // Registrar Repositories
  container.register(UserRepository, { useClass: UserRepository });

  // Registrar Validators
  container.register(AuthValidator, { useClass: AuthValidator });
  container.register(InputValidator, { useClass: InputValidator });

  // Registrar Services
  container.register(AuthService, { useClass: AuthService });

  // Alternativa: Registrar como singleton (mesma instância sempre)
  // container.registerSingleton(UserRepository);
  // container.registerSingleton(AuthService);

  console.log('✅ [DI Container] Dependências registradas com sucesso');
  console.log('   📦 Repositories: UserRepository');
  console.log('   🔍 Validators: AuthValidator, InputValidator');
  console.log('   💼 Services: AuthService');
}

/**
 * Limpa todas as instâncias do container
 * Útil para testes
 */
export function clearDependencyInjection(): void {
  container.clearInstances();
  console.log('🧹 [DI Container] Container limpo');
}

/**
 * Exportar container para uso direto quando necessário
 */
export { container };

