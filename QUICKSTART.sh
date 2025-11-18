#!/bin/bash
# Quick Start Script for Nikhire

echo "======================================"
echo "Nikhire - Campus Recruitment System"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js installed: $(node --version)"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found in PATH"
    echo "Please ensure MongoDB is running on localhost:27017"
else
    echo "✓ MongoDB found"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "To start the application:"
echo ""
echo "Option 1: Run both server and client"
echo "  npm run dev"
echo ""
echo "Option 2: Run separately in different terminals"
echo "  Terminal 1: npm run server"
echo "  Terminal 2: npm run client"
echo ""
echo "Then open your browser to http://localhost:8000"
echo ""
echo "Make sure MongoDB is running on localhost:27017"
echo ""
