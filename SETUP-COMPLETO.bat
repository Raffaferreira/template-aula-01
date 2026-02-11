@echo off
echo ========================================
echo   SETUP COMPLETO - AUTH PAGES
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Criando diretorios...
cd app
mkdir components 2>nul
mkdir signin 2>nul
mkdir signup 2>nul
cd ..

echo [2/4] Movendo Navbar.tsx...
move /Y "Navbar.tsx.temp" "app\components\Navbar.tsx" >nul 2>&1

echo [3/4] Movendo signin page.tsx...
move /Y "signin-page.tsx.temp" "app\signin\page.tsx" >nul 2>&1

echo [4/4] Movendo signup page.tsx...
move /Y "signup-page.tsx.temp" "app\signup\page.tsx" >nul 2>&1

echo.
echo ========================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ========================================
echo.
echo Estrutura criada:
echo   - app\components\Navbar.tsx
echo   - app\signin\page.tsx
echo   - app\signup\page.tsx
echo.
echo Proximos passos:
echo   1. Execute: npm run dev
echo   2. Acesse: http://localhost:3000
echo   3. Teste as rotas:
echo      - / (landing page)
echo      - /signin (login)
echo      - /signup (cadastro)
echo.
echo ========================================
pause
