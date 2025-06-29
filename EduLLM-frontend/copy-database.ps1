# Database Copy Script for EduLLM
Write-Host "📁 EduLLM Database Copy Tool" -ForegroundColor Cyan

$containerName = "edullm-frontend-dev"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

# Check if container is running
$containerStatus = docker ps --filter "name=$containerName" --format "{{.Status}}"
if (-not $containerStatus) {
    Write-Host "❌ Frontend container '$containerName' is not running." -ForegroundColor Red
    Write-Host "💡 Start it with: .\run-docker.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Container is running: $containerStatus" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Database Copy Options:" -ForegroundColor Magenta
Write-Host "1. 📥 Copy database from container to local (overwrites existing)" -ForegroundColor Cyan
Write-Host "2. 📥 Copy database with timestamp (keeps backup)" -ForegroundColor Cyan
Write-Host "3. 📤 Copy local database to container (restore)" -ForegroundColor Cyan
Write-Host "4. 📊 Show current database info" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Select an option (1-4)"

switch ($choice) {
    "1" {
        Write-Host "📥 Copying database from container..." -ForegroundColor Green
        docker cp "${containerName}:/app/prisma/dev.db" "./dev-copy.db"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Database copied to: ./dev-copy.db" -ForegroundColor Green
            Write-Host "📁 Full path: $((Get-Location).Path)\dev-copy.db" -ForegroundColor Yellow
        } else {
            Write-Host "❌ Copy failed" -ForegroundColor Red
        }
    }
    "2" {
        $backupName = "dev-backup-$timestamp.db"
        Write-Host "📥 Copying database with timestamp..." -ForegroundColor Green
        docker cp "${containerName}:/app/prisma/dev.db" "./$backupName"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Database copied to: ./$backupName" -ForegroundColor Green
            Write-Host "📁 Full path: $((Get-Location).Path)\$backupName" -ForegroundColor Yellow
        } else {
            Write-Host "❌ Copy failed" -ForegroundColor Red
        }
    }
    "3" {
        if (Test-Path "./dev-copy.db") {
            Write-Host "📤 Copying local database to container..." -ForegroundColor Yellow
            $confirm = Read-Host "⚠️ This will overwrite the container database. Continue? (y/N)"
            if ($confirm -eq "y" -or $confirm -eq "Y") {
                docker cp "./dev-copy.db" "${containerName}:/app/prisma/dev.db"
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Local database copied to container" -ForegroundColor Green
                    Write-Host "🔄 You may need to restart the container for changes to take effect" -ForegroundColor Yellow
                } else {
                    Write-Host "❌ Copy failed" -ForegroundColor Red
                }
            } else {
                Write-Host "❌ Copy cancelled" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ Local database file './dev-copy.db' not found" -ForegroundColor Red
        }
    }
    "4" {
        Write-Host "📊 Database Information:" -ForegroundColor Green
        Write-Host ""
        
        # Container database info
        Write-Host "🐳 Container Database:" -ForegroundColor Cyan
        $containerDbInfo = docker exec $containerName ls -la /app/prisma/dev.db 2>$null
        if ($containerDbInfo) {
            Write-Host "   Path: /app/prisma/dev.db" -ForegroundColor White
            Write-Host "   Info: $containerDbInfo" -ForegroundColor White
        } else {
            Write-Host "   ❌ Not found or not accessible" -ForegroundColor Red
        }
        
        Write-Host ""
        
        # Local database info
        Write-Host "💻 Local Database Copies:" -ForegroundColor Cyan
        $localDbs = Get-ChildItem -Filter "*.db" | Sort-Object LastWriteTime -Descending
        if ($localDbs) {
            foreach ($db in $localDbs) {
                $sizeKB = [math]::Round($db.Length / 1KB, 2)
                Write-Host "   📁 $($db.Name) - ${sizeKB}KB - Modified: $($db.LastWriteTime)" -ForegroundColor White
            }
        } else {
            Write-Host "   📂 No .db files found in current directory" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "📁 Current directory: $((Get-Location).Path)" -ForegroundColor Gray
    }
    default {
        Write-Host "❌ Invalid option" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Blue
Write-Host "   1. Open VS Code" -ForegroundColor White
Write-Host "   2. Install 'SQLite Viewer' extension if not already installed" -ForegroundColor White
Write-Host "   3. Open the .db file in VS Code" -ForegroundColor White
Write-Host "   4. VS Code will show the database structure and data" -ForegroundColor White
