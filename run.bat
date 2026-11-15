@echo off
title Meeting Viewer - Split-Flap Board
cd /d "%~dp0"

echo =======================================================
echo   Iniciant Meeting Viewer (Split-Flap Station Board)...
echo =======================================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [AVIS] Node.js no s'ha trobat al PATH. S'obre index.html directament al navegador...
    start "" "www\index.html"
    pause
    exit /b
)

echo Engegant servidor web local a http://localhost:8080 ...
start "" cmd /c "timeout /t 2 /nobreak >nul && (start chrome --app=http://localhost:8080 2>nul || start msedge --app=http://localhost:8080 2>nul || start http://localhost:8080)"

node server.js

pause
