#!/bin/bash

# Script to push inventory-scanner to GitHub
# Usage: ./push-to-github.sh

REPO_NAME="inventory-scanner"
GITHUB_USERNAME="jack108510"
REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🚀 Preparing to push to GitHub..."
echo "Repository: ${REMOTE_URL}"
echo ""

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo "✓ Remote 'origin' already exists"
    git remote set-url origin "${REMOTE_URL}"
else
    echo "✓ Adding remote 'origin'"
    git remote add origin "${REMOTE_URL}"
fi

echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: ${REPO_NAME}"
echo "   - Set visibility: Public or Private"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo "2. Once the repo is created, run:"
echo "   git push -u origin main"
echo ""
echo "Or push now if the repo already exists:"
read -p "Push to GitHub now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 View your repo at: ${REMOTE_URL}"
    else
        echo "❌ Push failed. Make sure the repository exists on GitHub first."
        echo "   Create it at: https://github.com/new"
    fi
fi

