@echo off
echo ==========================================
echo      XAMPP MySQL Fixer by Antigravity
echo ==========================================
echo.
echo 1. Stopping any stuck MySQL processes...
taskkill /F /IM mysqld.exe >nul 2>&1

echo.
echo 2. Deleting corrupt XAMPP log files...
if exist "C:\xampp\mysql\data\ib_logfile0" (
    del "C:\xampp\mysql\data\ib_logfile0"
    echo    - Deleted ib_logfile0
) else (
    echo    - ib_logfile0 not found (OK)
)

if exist "C:\xampp\mysql\data\ib_logfile1" (
    del "C:\xampp\mysql\data\ib_logfile1"
    echo    - Deleted ib_logfile1
) else (
    echo    - ib_logfile1 not found (OK)
)

echo.
echo ==========================================
echo               FIX COMPLETE
echo ==========================================
echo.
echo Now please:
echo 1. Open XAMPP Control Panel
echo 2. Click START on MySQL
echo.
pause
