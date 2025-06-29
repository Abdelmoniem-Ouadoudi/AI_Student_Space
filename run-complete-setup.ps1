# EduLLM Complete Docker Setup Script
Write-Host "🎯 EduLLM Complete Setup with Docker" -ForegroundColor Magenta

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Check if backend is already running
if (Test-Port 8000) {
    Write-Host "✅ Backend is already running on port 8000" -ForegroundColor Green
} else {
    Write-Host "⚠️ Backend is not running on port 8000" -ForegroundColor Yellow
    Write-Host "📋 To start the backend, run in the EduLLM-backend directory:" -ForegroundColor Cyan
    Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
    Write-Host "   python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000" -ForegroundColor White
    Write-Host ""
}

# Check if frontend container is running
$frontendStatus = docker ps --filter "name=edullm-frontend-dev" --format "{{.Status}}"
if ($frontendStatus) {
    Write-Host "✅ Frontend container is running: $frontendStatus" -ForegroundColor Green
} else {
    Write-Host "🚀 Starting frontend container..." -ForegroundColor Cyan
    
    # Stop any existing containers
    docker stop edullm-frontend-dev 2>$null
    docker rm edullm-frontend-dev 2>$null
    
    # Run the frontend container
    docker run -d `
      --name edullm-frontend-dev `
      -p 3000:3000 `
      -e NEXT_PUBLIC_API_URL=http://host.docker.internal:8000 `
      -e NEXTAUTH_URL=http://localhost:3000 `
      -e NEXTAUTH_SECRET=some_development_secret_key_replace_in_production `
      --add-host host.docker.internal:host-gateway `
      edullm-frontend-frontend-dev
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend container started successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to start frontend container" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🎉 EduLLM Setup Status:" -ForegroundColor Magenta
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📡 Backend: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Useful Docker commands:" -ForegroundColor Blue
Write-Host "  • View frontend logs: docker logs edullm-frontend-dev -f" -ForegroundColor White
Write-Host "  • Stop frontend: docker stop edullm-frontend-dev" -ForegroundColor White
Write-Host "  • Restart frontend: docker restart edullm-frontend-dev" -ForegroundColor White
Write-Host "  • Remove frontend: docker rm edullm-frontend-dev" -ForegroundColor White
