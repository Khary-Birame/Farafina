@echo off
echo Nettoyage du projet Next.js...
echo.

echo Suppression du dossier .next...
if exist ".next" (
    rmdir /S /Q ".next"
    echo Dossier .next supprime.
) else (
    echo Dossier .next non trouve.
)

echo.
echo Tentative d'arret des processus Node.js sur le port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Arrêt du processus PID %%a...
    taskkill /F /PID %%a 2>nul
)

echo.
echo Nettoyage termine!
echo.
echo Lancement du serveur de developpement...
npm run dev







