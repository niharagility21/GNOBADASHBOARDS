#!/bin/bash
# Deploy BA Dashboards to Server
# Transfers files from local to remote server

set -e

echo "=========================================="
echo "BA Dashboards Deployment"
echo "=========================================="
echo ""

# Configuration
SERVER_IP="139.59.64.19"
SERVER_USER="root"
REMOTE_DIR="/var/www/ba-dashboards"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if server is reachable
echo "Checking server connection..."
if ! ping -c 1 -W 2 $SERVER_IP &> /dev/null; then
    echo -e "${RED}✗ Cannot reach server at $SERVER_IP${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Server is reachable${NC}"
echo ""

# Create local deployment package
echo "Creating deployment package..."
rm -rf .deploy-temp
mkdir -p .deploy-temp/generated
mkdir -p .deploy-temp/assets/css
mkdir -p .deploy-temp/assets/js
mkdir -p .deploy-temp/assets/images

# Copy files to deployment package
echo "Copying files..."
cp -r generated/* .deploy-temp/generated/ 2>/dev/null || true
cp -r src/assets/css/* .deploy-temp/assets/css/ 2>/dev/null || true
cp -r src/assets/js/* .deploy-temp/assets/js/ 2>/dev/null || true
cp -r src/assets/images/* .deploy-temp/assets/images/ 2>/dev/null || true

# Count files
DASHBOARD_COUNT=$(find .deploy-temp/generated -name "*.html" 2>/dev/null | wc -l)
echo -e "${GREEN}✓ Prepared $DASHBOARD_COUNT dashboard(s) for deployment${NC}"
echo ""

# Transfer files to server
echo "Transferring files to server..."
echo "You will be prompted for the server password..."
echo ""

# Upload generated dashboards
echo "1. Uploading dashboards..."
scp -r .deploy-temp/generated/* $SERVER_USER@$SERVER_IP:$REMOTE_DIR/generated/

# Upload assets
echo "2. Uploading assets..."
scp -r .deploy-temp/assets/* $SERVER_USER@$SERVER_IP:$REMOTE_DIR/assets/

# Set proper permissions on server
echo "3. Setting permissions..."
ssh $SERVER_USER@$SERVER_IP "chown -R www-data:www-data $REMOTE_DIR && chmod -R 755 $REMOTE_DIR"

# Clean up
rm -rf .deploy-temp

echo ""
echo -e "${GREEN}=========================================="
echo "✓ Deployment Complete!"
echo "==========================================${NC}"
echo ""
echo "Dashboards deployed: $DASHBOARD_COUNT"
echo "Server: http://$SERVER_IP"
echo ""
echo "Your dashboards are now live!"
echo ""
