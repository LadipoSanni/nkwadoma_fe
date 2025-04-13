#!/bin/bash
set -e

# Set up Node.js
echo "Setting up Node.js..."
# Add commands to set up Node.js if necessary, e.g., installing Node.js via nvm
# Example:
# nvm install 18
# nvm use 18

# Cache Node.js packages
echo "Caching Node.js packages..."
npm install

# Build and analyze
echo "Running build and analyze..."
npm run build
npx sonar-scanner \
  -Dsonar.projectKey=Enum-frontend-tms \
  -Dsonar.projectName='Nkwadoma_fe' \
  -Dsonar.sources=src \
  -Dsonar.tests=tests \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
