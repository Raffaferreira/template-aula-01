/**
 * Jest Setup
 * Configurações globais para testes
 * 
 * @created 2026-02-11
 */

import 'reflect-metadata'; // Obrigatório para TSyringe

// Aumentar timeout para testes assíncronos se necessário
jest.setTimeout(10000);

// Suprimir logs durante testes (opcional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };
