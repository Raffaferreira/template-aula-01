// Playwright Test Template
// Use este template como ponto de partida para criar novos testes

import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  // Executa antes de cada teste
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('https://example.com');
  });

  test('should perform basic user action', async ({ page }) => {
    // 1. Localizar elemento (preferir role-based selectors)
    const button = page.getByRole('button', { name: 'Submit' });
    
    // 2. Interagir com elemento
    await button.click();
    
    // 3. Verificar resultado esperado
    await expect(page.getByText('Success')).toBeVisible();
  });

  test('should handle form submission', async ({ page }) => {
    // Preencher formulário
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    
    // Submeter
    await page.getByRole('button', { name: 'Enviar' }).click();
    
    // Verificar
    await expect(page.getByText('Formulário enviado com sucesso')).toBeVisible();
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Simular erro
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Verificar mensagem de erro
    await expect(page.getByText('Erro ao processar solicitação')).toBeVisible();
  });
});
