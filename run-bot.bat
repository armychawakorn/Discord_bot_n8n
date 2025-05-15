@echo off
REM สคริปต์นี้ช่วยในการเริ่มต้นและจัดการบอท Discord webhook

echo บอท Discord Webhook - สคริปต์จัดการ
echo =======================================
echo.

:menu
echo โปรดเลือกตัวเลือก:
echo 1. สร้างโปรเจค (Build)
echo 2. เรียกใช้ในโหมดพัฒนา (Development)
echo 3. เรียกใช้ในโหมดผลิตภัณฑ์ (Production)
echo 4. สร้างอิมเมจ Docker
echo 5. เรียกใช้ด้วย Docker
echo 6. ออกจากโปรแกรม
echo.

set /p choice=กรุณาใส่ตัวเลือกของคุณ (1-6): 

if "%choice%"=="1" goto build
if "%choice%"=="2" goto dev
if "%choice%"=="3" goto prod
if "%choice%"=="4" goto docker_build
if "%choice%"=="5" goto docker_run
if "%choice%"=="6" goto end

echo ตัวเลือกไม่ถูกต้อง โปรดลองอีกครั้ง
goto menu

:build
echo กำลังสร้างโปรเจค...
call npm run build
echo.
goto menu

:dev
echo กำลังเรียกใช้ในโหมดพัฒนา...
start cmd /k npm run dev
echo บอทกำลังทำงานในหน้าต่างใหม่
echo.
goto menu

:prod
echo กำลังสร้างและเรียกใช้ในโหมดผลิตภัณฑ์...
call npm run build
start cmd /k npm start
echo บอทกำลังทำงานในหน้าต่างใหม่
echo.
goto menu

:docker_build
echo กำลังสร้างอิมเมจ Docker...
docker build -t discord-webhook-bot .
echo.
goto menu

:docker_run
echo กำลังเรียกใช้บอทใน Docker...
docker run -d --name discord-webhook-bot --env-file .env discord-webhook-bot
echo.
goto menu

:end
echo กำลังออกจากโปรแกรม...
exit /b 0
