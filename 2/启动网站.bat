@echo off
title 个人主页 - 本地服务器
cd /d "%~dp0"

echo ==========================================
echo   个人主页 本地服务器启动中...
echo   地址: http://localhost:8000
echo   如需停止服务器，请关闭此窗口
echo ==========================================
echo.

REM ===== 检测 Python 环境 =====
where python >nul 2>nul
if errorlevel 1 (
    echo [错误] 未找到 Python，请先安装 Python 并勾选 "Add to PATH"
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM ===== 自动清理占用 8000 端口的旧进程，避免端口冲突 =====
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000" ^| findstr "LISTENING"') do (
    echo   检测到旧服务器进程 (PID %%a)，正在关闭...
    taskkill /F /PID %%a >nul 2>nul
)

REM ===== 后台延时 2 秒打开浏览器（等待服务器就绪）=====
start "" /b powershell -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:8000'"

REM ===== 启动本地服务器（阻塞运行，关闭本窗口即停止）=====
python -m http.server 8000

echo.
echo 服务器已停止。
pause