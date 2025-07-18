# Script de Backup e Upload - Radio 4M Contabilidade
# Autor: Gabriell12321

Write-Host "========================================" -ForegroundColor Green
Write-Host "    BACKUP E UPLOAD - RADIO 4M" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Adicionar Git ao PATH
$env:PATH += ";C:\Program Files\Git\bin"

Write-Host "[1/4] Verificando mudanças..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "[2/4] Adicionando mudanças..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "[3/4] Salvando versão..." -ForegroundColor Yellow
$data = Get-Date -Format "dd/MM/yyyy HH:mm"
git commit -m "Backup automático - $data"

Write-Host ""
Write-Host "[4/4] Enviando para GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    BACKUP CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Repositório: https://github.com/Gabriell12321/radio-4m-contabilidade" -ForegroundColor Cyan
Write-Host ""
Read-Host "Pressione Enter para continuar..." 