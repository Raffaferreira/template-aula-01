# Script de instalação e configuração do Playwright
# Execute: .\setup-playwright.ps1

Write-Host "🎭 Configurando Playwright..." -ForegroundColor Cyan

# Verificar se Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instale Node.js primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js encontrado: $(node --version)" -ForegroundColor Green

# Instalar Playwright
Write-Host "📦 Instalando Playwright..." -ForegroundColor Yellow
npm install -D @playwright/test

# Instalar browsers
Write-Host "🌐 Instalando browsers..." -ForegroundColor Yellow
npx playwright install

# Criar estrutura de diretórios
Write-Host "📁 Criando estrutura de testes..." -ForegroundColor Yellow
$dirs = @(
    "tests",
    "tests/e2e",
    "tests/integration",
    "tests/fixtures"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  Criado: $dir" -ForegroundColor Gray
    }
}

# Criar playwright.config.ts
$configContent = @"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
"@

if (-not (Test-Path "playwright.config.ts")) {
    Set-Content -Path "playwright.config.ts" -Value $configContent
    Write-Host "✅ Criado: playwright.config.ts" -ForegroundColor Green
}

# Adicionar scripts ao package.json
Write-Host "📝 Atualizando package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

if (-not $packageJson.scripts."test:e2e") {
    $packageJson.scripts | Add-Member -NotePropertyName "test:e2e" -NotePropertyValue "playwright test"
}
if (-not $packageJson.scripts."test:ui") {
    $packageJson.scripts | Add-Member -NotePropertyName "test:ui" -NotePropertyValue "playwright test --ui"
}
if (-not $packageJson.scripts."test:debug") {
    $packageJson.scripts | Add-Member -NotePropertyName "test:debug" -NotePropertyValue "playwright test --debug"
}

$packageJson | ConvertTo-Json -Depth 100 | Set-Content "package.json"

Write-Host ""
Write-Host "✨ Playwright configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Comandos disponíveis:" -ForegroundColor Cyan
Write-Host "  npm run test:e2e     - Executar testes" -ForegroundColor Gray
Write-Host "  npm run test:ui      - Abrir UI mode" -ForegroundColor Gray
Write-Host "  npm run test:debug   - Debug mode" -ForegroundColor Gray
Write-Host ""
