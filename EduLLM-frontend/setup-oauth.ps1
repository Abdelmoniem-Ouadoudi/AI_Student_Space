# OAuth Setup Script for EduLLM
# Run this script to configure your OAuth credentials

Write-Host "=== EduLLM OAuth Configuration Setup ===" -ForegroundColor Green
Write-Host ""

$envFile = ".env.docker"

# Check if .env.docker exists
if (-not (Test-Path $envFile)) {
    Write-Host "Error: $envFile file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Current OAuth configuration status:" -ForegroundColor Yellow
Write-Host ""

# Read current values
$content = Get-Content $envFile
$googleClientId = ($content | Where-Object { $_ -match "^GOOGLE_CLIENT_ID=" }) -replace "GOOGLE_CLIENT_ID=", ""
$googleClientSecret = ($content | Where-Object { $_ -match "^GOOGLE_CLIENT_SECRET=" }) -replace "GOOGLE_CLIENT_SECRET=", ""
$azureClientId = ($content | Where-Object { $_ -match "^AZURE_AD_CLIENT_ID=" }) -replace "AZURE_AD_CLIENT_ID=", ""
$azureClientSecret = ($content | Where-Object { $_ -match "^AZURE_AD_CLIENT_SECRET=" }) -replace "AZURE_AD_CLIENT_SECRET=", ""
$nextAuthSecret = ($content | Where-Object { $_ -match "^NEXTAUTH_SECRET=" }) -replace "NEXTAUTH_SECRET=", ""

# Check status
Write-Host "Google OAuth:" -NoNewline
if ($googleClientId -match "your-google-client-id") {
    Write-Host " ❌ Not configured" -ForegroundColor Red
} else {
    Write-Host " ✅ Configured" -ForegroundColor Green
}

Write-Host "Microsoft OAuth:" -NoNewline
if ($azureClientId -match "your-azure-ad-client-id") {
    Write-Host " ❌ Not configured" -ForegroundColor Red
} else {
    Write-Host " ✅ Configured" -ForegroundColor Green
}

Write-Host "NextAuth Secret:" -NoNewline
if ($nextAuthSecret -match "your-super-secret-key") {
    Write-Host " ❌ Not configured" -ForegroundColor Red
} else {
    Write-Host " ✅ Configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Instructions ===" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Follow the OAuth setup guide: OAUTH_SETUP.md"
Write-Host "2. For Google OAuth:"
Write-Host "   - Go to: https://console.cloud.google.com/"
Write-Host "   - Redirect URI should be: http://localhost:3000/api/auth/callback/google"
Write-Host ""
Write-Host "3. For Microsoft OAuth:"
Write-Host "   - Go to: https://portal.azure.com/"
Write-Host "   - Redirect URI should be: http://localhost:3000/api/auth/callback/azure-ad"
Write-Host ""
Write-Host "4. Generate a secure NextAuth secret:"
Write-Host ""

# Generate NextAuth secret
Write-Host "Generated NextAuth Secret (copy this):" -ForegroundColor Green
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)
Write-Host $secret -ForegroundColor Cyan
Write-Host ""

Write-Host "5. Update the .env.docker file with your credentials"
Write-Host "6. Restart the Docker container:"
Write-Host "   docker-compose -f docker-compose.dev.yml down"
Write-Host "   docker-compose -f docker-compose.dev.yml up -d"
Write-Host ""

# Offer to open the env file
$openFile = Read-Host "Would you like to open the .env.docker file for editing? (y/n)"
if ($openFile -eq "y" -or $openFile -eq "Y") {
    if (Get-Command "code" -ErrorAction SilentlyContinue) {
        code $envFile
    } else {
        notepad $envFile
    }
}

Write-Host ""
Write-Host "=== Quick Test ===" -ForegroundColor Yellow
Write-Host "After updating credentials, test the setup:"
Write-Host "1. Restart Docker containers"
Write-Host "2. Visit: http://localhost:3000/en/auth/signin"
Write-Host "3. Try logging in with Google or Microsoft"
