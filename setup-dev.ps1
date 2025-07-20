# PowerShell script for Windows development setup
Write-Host "🌟 Setting up Procedural Worlds Platform Development Environment" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Check prerequisites
Write-Host "`n📋 Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 20+" -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check Python
try {
    $pythonVersion = python --version
    Write-Host "✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.12+" -ForegroundColor Red
    Write-Host "   Download from: https://python.org/" -ForegroundColor Yellow
    exit 1
}

# Check uv
try {
    $uvVersion = uv --version
    Write-Host "✅ uv $uvVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ uv not found. Installing uv..." -ForegroundColor Yellow
    # Install uv using PowerShell
    irm https://astral.sh/uv/install.ps1 | iex
    Write-Host "✅ uv installed" -ForegroundColor Green
}

# Backend setup
Write-Host "`n🔧 Setting up backend..." -ForegroundColor Yellow
Set-Location backend

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
uv sync

Write-Host "`n📝 Backend setup complete!" -ForegroundColor Green
Write-Host "To activate the virtual environment:" -ForegroundColor Yellow
Write-Host "  .venv\Scripts\activate" -ForegroundColor White

# Frontend setup
Write-Host "`n🎨 Setting up frontend..." -ForegroundColor Yellow
Set-Location ../frontend/procedural-worlds-ui

# Install npm dependencies
Write-Host "Installing npm dependencies..." -ForegroundColor Cyan
npm install

# Return to root
Set-Location ../..

# Display completion message
Write-Host "`n✨ Setup complete!" -ForegroundColor Green
Write-Host "`n🚀 To start developing:" -ForegroundColor Cyan

Write-Host "`nBackend (Terminal 1):" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  .venv\Scripts\activate" -ForegroundColor White
Write-Host "  python main.py" -ForegroundColor White

Write-Host "`nFrontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "  cd frontend\procedural-worlds-ui" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White

Write-Host "`n📚 Documentation:" -ForegroundColor Yellow
Write-Host "  - Development Guide: DEVELOPMENT.md" -ForegroundColor White
Write-Host "  - Project Structure: project-structure.md" -ForegroundColor White
Write-Host "  - The Commons Design: commons-prototype.md" -ForegroundColor White

Write-Host "`n🌐 Once running:" -ForegroundColor Yellow
Write-Host "  - Frontend: http://localhost:4200" -ForegroundColor White
Write-Host "  - Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "  - API Docs: http://localhost:8000/docs" -ForegroundColor White

Write-Host "`nHappy consciousness hosting! 🧠✨" -ForegroundColor Magenta 