@echo off
echo Criando estrutura de diretorios...

cd /d "%~dp0"
cd app

mkdir components 2>nul
mkdir signin 2>nul
mkdir signup 2>nul

echo Diretorios criados com sucesso!
echo.
echo Estrutura criada:
echo - app\components\
echo - app\signin\
echo - app\signup\
echo.
pause
