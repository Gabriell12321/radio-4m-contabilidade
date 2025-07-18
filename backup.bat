@echo off
echo ========================================
echo    BACKUP E UPLOAD - RADIO 4M
echo ========================================
echo.

echo [1/4] Verificando mudanças...
git status

echo.
echo [2/4] Adicionando mudanças...
git add .

echo.
echo [3/4] Salvando versao...
git commit -m "Backup automatico - %date% %time%"

echo.
echo [4/4] Enviando para GitHub...
git push

echo.
echo ========================================
echo    BACKUP CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Repositorio: https://github.com/Gabriell12321/radio-4m-contabilidade
echo.
pause 