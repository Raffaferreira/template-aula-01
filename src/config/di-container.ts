/**
 * Dependency Injection Container Setup
 * Configuração central do TSyringe para o projeto
 * 
 * @module config/di-container
 * @created 2026-02-11
 */

import 'reflect-metadata'; // OBRIGATÓRIO: Deve ser importado antes de qualquer uso de decorators
import { container } from 'tsyringe';

// Importar repositories
import { UserRepository } from '../repository/UserRepository';

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

  // Registrar UserRepository como transient (nova instância a cada resolve)
  container.register(UserRepository, { useClass: UserRepository });

  // Alternativa: Registrar como singleton (mesma instância sempre)
  // container.registerSingleton(UserRepository);

  console.log('✅ [DI Container] Dependências registradas com sucesso');
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
