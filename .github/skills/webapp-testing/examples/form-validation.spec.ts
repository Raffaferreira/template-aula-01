/**
 * Exemplo: Teste de Validação de Formulário
 * Demonstra como testar validações client-side e server-side
 */
import { test, expect } from '@playwright/test';

test.describe('Validação de Formulário de Contato', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('deve exibir erros de validação para campos vazios', async ({ page }) => {
    // Clicar no botão de enviar sem preencher
    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar mensagens de erro
    await expect(page.getByText('Nome é obrigatório')).toBeVisible();
    await expect(page.getByText('Email é obrigatório')).toBeVisible();
    await expect(page.getByText('Mensagem é obrigatória')).toBeVisible();
  });

  test('deve validar formato de email inválido', async ({ page }) => {
    // Preencher com email inválido
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('email-invalido');
    await page.getByLabel('Mensagem').fill('Teste de mensagem');

    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar erro de email
    await expect(page.getByText('Email inválido')).toBeVisible();
  });

  test('deve validar tamanho mínimo da mensagem', async ({ page }) => {
    // Preencher com mensagem curta
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    await page.getByLabel('Mensagem').fill('Oi'); // Muito curto

    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar erro de tamanho
    await expect(page.getByText(/mensagem deve ter no mínimo/i)).toBeVisible();
  });

  test('deve enviar formulário com dados válidos', async ({ page }) => {
    // Preencher todos os campos corretamente
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste com tamanho adequado.');

    // Enviar
    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar mensagem de sucesso
    await expect(page.getByText('Mensagem enviada com sucesso!')).toBeVisible();
  });

  test('deve limpar erros ao corrigir campos', async ({ page }) => {
    // Submeter com campos vazios
    await page.getByRole('button', { name: 'Enviar' }).click();
    await expect(page.getByText('Email é obrigatório')).toBeVisible();

    // Preencher o campo
    await page.getByLabel('Email').fill('joao@example.com');

    // Erro deve desaparecer
    await expect(page.getByText('Email é obrigatório')).not.toBeVisible();
  });

  test('deve prevenir múltiplos envios', async ({ page }) => {
    // Preencher formulário
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    await page.getByLabel('Mensagem').fill('Mensagem de teste');

    const submitButton = page.getByRole('button', { name: 'Enviar' });

    // Clicar múltiplas vezes rapidamente
    await submitButton.click();
    await submitButton.click();

    // Botão deve ficar desabilitado
    await expect(submitButton).toBeDisabled();

    // Apenas uma requisição deve ser enviada
    const requests = [];
    page.on('request', req => {
      if (req.url().includes('/api/contact')) {
        requests.push(req);
      }
    });

    expect(requests.length).toBe(1);
  });

  test('deve mostrar feedback visual durante o envio', async ({ page }) => {
    // Preencher formulário
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    await page.getByLabel('Mensagem').fill('Mensagem de teste');

    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar loading state
    await expect(page.getByRole('button', { name: 'Enviando...' })).toBeVisible();

    // Aguardar conclusão
    await expect(page.getByText('Mensagem enviada com sucesso!')).toBeVisible();
  });

  test('deve lidar com erro de servidor', async ({ page }) => {
    // Interceptar requisição para simular erro
    await page.route('**/api/contact', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });

    // Preencher e enviar
    await page.getByLabel('Nome').fill('João Silva');
    await page.getByLabel('Email').fill('joao@example.com');
    await page.getByLabel('Mensagem').fill('Mensagem de teste');

    await page.getByRole('button', { name: 'Enviar' }).click();

    // Verificar mensagem de erro
    await expect(page.getByText('Erro ao enviar mensagem. Tente novamente.')).toBeVisible();
  });
});
