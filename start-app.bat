@echo off
title AI Form Assistant for Elderly Users
echo ===================================================
echo   Starting AI Form Assistant for Elderly Users...
echo ===================================================
echo.
cd /d "d:\ai-form-assistant"

echo Checking and opening browser in 3 seconds...
start "" http://localhost:3000

echo Starting development server on port 3000...
npm run dev
pause
