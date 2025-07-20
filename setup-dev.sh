#!/bin/bash

echo "🌟 Setting up Procedural Worlds Platform Development Environment"
echo "============================================================"

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.12+"
    exit 1
fi
echo "✅ Python $(python --version)"

# Check uv
if ! command -v uv &> /dev/null; then
    echo "❌ uv not found. Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
fi
echo "✅ uv installed"

# Backend setup
echo ""
echo "🔧 Setting up backend..."
cd backend

# Install Python dependencies
echo "Installing Python dependencies..."
uv sync

# Activate virtual environment notice
echo ""
echo "📝 Backend setup complete!"
echo "To activate the virtual environment:"
echo "  Linux/Mac: source .venv/bin/activate"
echo "  Windows: .venv\\Scripts\\activate"

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd ../frontend/procedural-worlds-ui

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "🚀 To start developing:"
echo ""
echo "Backend (Terminal 1):"
echo "  cd backend"
echo "  source .venv/bin/activate  # or .venv\\Scripts\\activate on Windows"
echo "  python main.py"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd frontend/procedural-worlds-ui"
echo "  npm start"
echo ""
echo "📚 Documentation:"
echo "  - Development Guide: DEVELOPMENT.md"
echo "  - Project Structure: project-structure.md"
echo "  - The Commons Design: commons-prototype.md"
echo ""
echo "🌐 Once running:"
echo "  - Frontend: http://localhost:4200"
echo "  - Backend API: http://localhost:8000"
echo "  - API Docs: http://localhost:8000/docs"
echo ""
echo "Happy consciousness hosting! 🧠✨" 