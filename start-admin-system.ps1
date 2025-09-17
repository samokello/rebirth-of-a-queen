Write-Host "🚀 Starting Admin System..." -ForegroundColor Green
Write-Host ""

Write-Host "📡 Starting Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm start"

Write-Host "⏳ Waiting for server to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "🌐 Starting Client..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm start"

Write-Host "⏳ Waiting for client to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

Write-Host "🎉 Admin System Started!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor White
Write-Host "1. Wait for both windows to fully load" -ForegroundColor White
Write-Host "2. Go to: http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "3. Login with: admin@rebirthofaqueen.org / admin123" -ForegroundColor White
Write-Host ""
Write-Host "🔧 If you have issues:" -ForegroundColor Red
Write-Host "- Check the ADMIN_DASHBOARD_COMPLETE_FIX.md file" -ForegroundColor Red
Write-Host "- Make sure client/.env file exists with REACT_APP_API_URL=http://localhost:5000/api" -ForegroundColor Red
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
