# Database Management Script for EduLLM
Write-Host "🗄️ EduLLM Database Management Tools" -ForegroundColor Cyan

$containerName = "edullm-frontend-dev"

# Check if container is running
$containerStatus = docker ps --filter "name=$containerName" --format "{{.Status}}"
if (-not $containerStatus) {
    Write-Host "❌ Frontend container is not running. Please start it first." -ForegroundColor Red
    Write-Host "Run: .\run-docker.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Container is running: $containerStatus" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Database Management Options:" -ForegroundColor Magenta
Write-Host "1. 🎨 Open Prisma Studio (Web GUI)" -ForegroundColor Cyan
Write-Host "2. 📊 View Database Schema" -ForegroundColor Cyan  
Write-Host "3. 🔍 Access SQLite CLI" -ForegroundColor Cyan
Write-Host "4. 📁 Copy Database File to Host" -ForegroundColor Cyan
Write-Host "5. 🔄 Reset Database" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Select an option (1-5)"

switch ($choice) {
    "1" {
        Write-Host "🎨 Starting Prisma Studio..." -ForegroundColor Green
        Write-Host "📖 Prisma Studio will open at: http://localhost:5555" -ForegroundColor Yellow
        Write-Host "⚠️ Keep this terminal open while using Prisma Studio" -ForegroundColor Red
        docker exec -it $containerName pnpm prisma studio --port 5555
    }
    "2" {
        Write-Host "📊 Database Schema:" -ForegroundColor Green
        docker exec -it $containerName pnpm prisma db pull
        docker exec -it $containerName cat prisma/schema.prisma
    }
    "3" {
        Write-Host "🔍 Opening SQLite CLI..." -ForegroundColor Green
        Write-Host "Use SQL commands like: SELECT * FROM User;" -ForegroundColor Yellow
        Write-Host "Type .exit to quit" -ForegroundColor Yellow
        docker exec -it $containerName sqlite3 prisma/dev.db
    }
    "4" {
        Write-Host "📁 Copying database file to current directory..." -ForegroundColor Green
        docker cp "${containerName}:/app/prisma/dev.db" "./dev.db"
        Write-Host "✅ Database copied to: ./dev.db" -ForegroundColor Green
        Write-Host "You can now open it with any SQLite viewer" -ForegroundColor Yellow
    }
    "5" {
        Write-Host "🔄 Resetting database..." -ForegroundColor Yellow
        $confirm = Read-Host "⚠️ This will delete all data. Continue? (y/N)"
        if ($confirm -eq "y" -or $confirm -eq "Y") {
            docker exec -it $containerName pnpm prisma migrate reset --force
            Write-Host "✅ Database reset complete" -ForegroundColor Green
        } else {
            Write-Host "❌ Reset cancelled" -ForegroundColor Red
        }
    }
    default {
        Write-Host "❌ Invalid option" -ForegroundColor Red
    }
}
