# EduLLM Docker Setup Guide

## Overview

This guide shows how to run the EduLLM project using Docker containers. This approach solves Node.js version compatibility issues and provides a clean, isolated environment.

## Prerequisites

- Docker Desktop installed and running
- PowerShell (Windows)

## Quick Start

### Option 1: Run Everything (Recommended)
```powershell
# From the project root directory
.\run-complete-setup.ps1
```

### Option 2: Manual Setup

#### Frontend with Docker
```powershell
# Navigate to frontend directory
cd EduLLM-frontend

# Build the container (first time only)
docker-compose -f docker-compose.dev.yml build

# Run the container
.\run-docker.ps1

# Or manually:
docker run -d --name edullm-frontend-dev -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://host.docker.internal:8000 edullm-frontend-frontend-dev
```

#### Backend (Local Python)
```powershell
# Navigate to backend directory
cd EduLLM-backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start the server
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

## File Structure

```
EduLLM-frontend/
├── Dockerfile              # Production Docker build
├── Dockerfile.dev          # Development Docker build
├── docker-compose.yml      # Production Docker Compose
├── docker-compose.dev.yml  # Development Docker Compose
├── run-docker.ps1          # PowerShell script to run frontend
└── .dockerignore           # Docker ignore file
```

## Environment Variables

The Docker container automatically sets:
- `NEXT_PUBLIC_API_URL=http://host.docker.internal:8000`
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET=some_development_secret_key_replace_in_production`

## Container Management

### View logs
```powershell
docker logs edullm-frontend-dev -f
```

### Stop container
```powershell
docker stop edullm-frontend-dev
```

### Restart container
```powershell
docker restart edullm-frontend-dev
```

### Remove container
```powershell
docker stop edullm-frontend-dev
docker rm edullm-frontend-dev
```

### Rebuild container (after code changes)
```powershell
docker-compose -f docker-compose.dev.yml build --no-cache
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

## Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check that `host.docker.internal` resolves properly

### Container won't start
```powershell
# Check Docker is running
docker ps

# Check container logs
docker logs edullm-frontend-dev

# Rebuild if necessary
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Port conflicts
```powershell
# Check what's using port 3000
netstat -ano | findstr :3000

# Use different ports if needed
docker run -p 3001:3000 --name edullm-frontend-dev edullm-frontend-frontend-dev
```

## Development Workflow

1. **Code Changes**: Edit files normally
2. **Hot Reload**: Changes are automatically detected (volume mounted)
3. **Database Changes**: Restart container if Prisma schema changes
4. **Dependency Changes**: Rebuild container if package.json changes

## Benefits of Docker Approach

✅ **No Node.js version conflicts**
✅ **Isolated environment**
✅ **Consistent across different machines**
✅ **Easy to reset/clean**
✅ **No impact on other projects**

## Alternative: Full Docker Setup

You can also run the backend in Docker. Check if there's a `docker-compose.yml` in the backend directory for a complete containerized setup.
