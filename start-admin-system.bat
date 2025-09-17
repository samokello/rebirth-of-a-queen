@echo off
echo 🚀 Starting Admin System...
echo.

echo 📡 Starting Server...
start "Server" cmd /k "cd /d "%~dp0server" && npm start"

echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak > nul

echo 🌐 Starting Client...
start "Client" cmd /k "cd /d "%~dp0client" && npm start"

echo ⏳ Waiting for client to start...
timeout /t 10 /nobreak > nul

echo 🎉 Admin System Started!
echo.
echo 📝 Next Steps:
echo 1. Wait for both windows to fully load
echo 2. Go to: http://localhost:3000/admin/login
echo 3. Login with: admin@rebirthofaqueen.org / admin123
echo.
echo 🔧 If you have issues:
echo - Check the ADMIN_DASHBOARD_COMPLETE_FIX.md file
echo - Make sure client/.env file exists with REACT_APP_API_URL=http://localhost:5000/api
echo.
pause
