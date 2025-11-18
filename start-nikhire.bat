@echo off
REM NikHire Quick Launch Script for Windows

echo.
echo =====================================
echo  NikHire - Campus Recruitment System
echo =====================================
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Change to project directory
cd /d "c:\Users\David\Documents\Octahire_App\NikHire"

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

echo.
echo Starting NikHire...
echo.
echo [1] Backend Server will start on http://localhost:3000
echo [2] Frontend Client will start on http://localhost:8000
echo.
echo Ctrl+C to stop either service
echo.

REM Start backend and frontend in separate windows
start "NikHire Backend (Port 3000)" cmd /k "cd /d c:\Users\David\Documents\Octahire_App\NikHire && npm run server"
timeout /t 2 /nobreak

start "NikHire Frontend (Port 8000)" cmd /k "cd /d c:\Users\David\Documents\Octahire_App\NikHire && npm run client"

echo.
echo ✓ Starting services...
echo ✓ Open http://localhost:8000 in your browser
echo.
pause
