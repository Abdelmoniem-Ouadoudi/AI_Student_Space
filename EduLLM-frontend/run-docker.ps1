# EduLLM Docker Runner Script for Windows PowerShell

Write-Host "🚀 Starting EduLLM Frontend with Docker..." -ForegroundColor Cyan

# Check if OAuth is configured
Write-Host "� Checking OAuth configuration..." -ForegroundColor Yellow
if (Test-Path ".env.docker") {
    $envContent = Get-Content ".env.docker"
    $googleConfigured = -not ($envContent | Where-Object { $_ -match "GOOGLE_CLIENT_ID=your-google-client-id" })
    $azureConfigured = -not ($envContent | Where-Object { $_ -match "AZURE_AD_CLIENT_ID=your-azure-ad-client-id" })
    
    if (-not $googleConfigured -or -not $azureConfigured) {
        Write-Host "⚠️  OAuth not fully configured!" -ForegroundColor Red
        Write-Host "   Run: .\setup-oauth.ps1 to configure OAuth" -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "⚠️  .env.docker file missing!" -ForegroundColor Red
    Write-Host "   OAuth may not work properly" -ForegroundColor Yellow
}

# Stop any existing containers
Write-Host "🛑 Stopping any existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down 2>$null

# Start the frontend container with docker-compose
Write-Host "🏃 Starting frontend container with docker-compose..." -ForegroundColor Green
docker-compose -f docker-compose.dev.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend container started successfully!" -ForegroundColor Green
    Write-Host "🌐 Frontend URL: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📡 Expected Backend URL: http://localhost:8000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Useful commands:" -ForegroundColor Magenta
    Write-Host "  • Check container logs: docker logs edullm-frontend-dev -f" -ForegroundColor White
    Write-Host "  • Stop container: docker stop edullm-frontend-dev" -ForegroundColor White
    Write-Host "  • Remove container: docker rm edullm-frontend-dev" -ForegroundColor White
} else {
    Write-Host "❌ Failed to start frontend container" -ForegroundColor Red
}
