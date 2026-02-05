#!/bin/bash

# Fix SSH authentication for GitHub Actions
# This script adds the public key to the server and updates GitHub Secret

PUBLIC_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBGnFTobYY/xvb0tsU8yA1R/hETq9bW2BT83xnuhyDxO github-actions-deploy"
SERVER_USER="root"
SERVER_IP="139.59.64.19"
SERVER_PASS="TN@qwe4321n"

echo "Step 1: Adding public key to server..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP \
  "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo 'Public key added successfully'"

if [ $? -eq 0 ]; then
  echo "✅ Public key added to server"
else
  echo "❌ Failed to add public key to server"
  exit 1
fi

echo ""
echo "Step 2: Updating GitHub Secret SSH_PRIVATE_KEY..."
gh secret set SSH_PRIVATE_KEY < github-deploy-key

if [ $? -eq 0 ]; then
  echo "✅ GitHub Secret updated"
else
  echo "❌ Failed to update GitHub Secret"
  echo ""
  echo "Please run: gh auth login"
  echo "Then run this script again"
  exit 1
fi

echo ""
echo "✅ SSH authentication fixed!"
echo ""
echo "Testing SSH connection..."
ssh -i github-deploy-key -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "echo 'SSH connection works!'"

if [ $? -eq 0 ]; then
  echo "✅ SSH connection successful!"
else
  echo "❌ SSH connection failed"
fi
