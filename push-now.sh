#!/bin/bash

cd /Users/jack/inventory-scanner

echo "📋 Current repository status:"
git remote -v
echo ""
git branch
echo ""

# Make sure all files are added
git add -A

# Check if there are uncommitted changes
if ! git diff --cached --quiet || ! git diff --quiet; then
    echo "📝 Committing changes..."
    git commit -m "Update inventory scanner"
fi

echo ""
echo "🚀 Pushing to GitHub..."
echo "Repository: https://github.com/jack108510/inventoryintaketool.git"
echo ""

# Try main branch first, then master
if git push -u origin main 2>&1; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View at: https://github.com/jack108510/inventoryintaketool"
else
    echo "❌ Push to 'main' failed, trying 'master'..."
    git push -u origin master 2>&1
fi

