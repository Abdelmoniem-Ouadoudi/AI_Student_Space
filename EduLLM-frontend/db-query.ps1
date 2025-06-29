# Database Query Script for EduLLM
Write-Host "🔍 EduLLM Database Query Tool" -ForegroundColor Cyan

# Check if SQLite3 is available locally
$sqliteExists = Get-Command sqlite3 -ErrorAction SilentlyContinue
if (-not $sqliteExists) {
    Write-Host "⚠️ SQLite3 not found locally. Installing via winget..." -ForegroundColor Yellow
    
    # Try to install SQLite via winget
    try {
        winget install sqlite.sqlite
        Write-Host "✅ SQLite3 installed!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not install SQLite3 automatically." -ForegroundColor Red
        Write-Host "📥 Please download from: https://sqlite.org/download.html" -ForegroundColor Yellow
        Write-Host "Or use the DB Browser for SQLite instead" -ForegroundColor Yellow
        exit 1
    }
}

$dbFile = "./dev-copy.db"
if (-not (Test-Path $dbFile)) {
    Write-Host "📁 Copying database from container..." -ForegroundColor Yellow
    docker cp edullm-frontend-dev:/app/prisma/dev.db $dbFile
}

Write-Host "🗄️ Database file: $dbFile" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Quick Commands:" -ForegroundColor Magenta
Write-Host "1. View all users: SELECT * FROM User;" -ForegroundColor Cyan
Write-Host "2. View all sessions: SELECT * FROM Session;" -ForegroundColor Cyan
Write-Host "3. View all accounts: SELECT * FROM Account;" -ForegroundColor Cyan
Write-Host "4. Count users: SELECT COUNT(*) FROM User;" -ForegroundColor Cyan
Write-Host "5. Schema info: .schema" -ForegroundColor Cyan
Write-Host "6. List tables: .tables" -ForegroundColor Cyan
Write-Host "7. Exit: .exit" -ForegroundColor Cyan
Write-Host ""

# Start SQLite CLI
Write-Host "🚀 Starting SQLite CLI..." -ForegroundColor Green
sqlite3 $dbFile
