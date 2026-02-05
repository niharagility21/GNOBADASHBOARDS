#!/bin/bash
# Run this script to fix the GitHub Actions SSH authentication error

echo "=== Fixing GitHub Actions SSH Authentication ==="
echo ""

echo "Step 1: Adding SSH public key to server..."
sshpass -p 'TN@qwe4321n' ssh -o StrictHostKeyChecking=no root@139.59.64.19 \
  "mkdir -p ~/.ssh && chmod 700 ~/.ssh && grep -q 'AAAAC3NzaC1lZDI1NTE5AAAAIBGnFTobYY/xvb0tsU8yA1R/hETq9bW2BT83xnuhyDxO' ~/.ssh/authorized_keys || echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBGnFTobYY/xvb0tsU8yA1R/hETq9bW2BT83xnuhyDxO github-actions-deploy' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys" && echo "✅ Public key added to server"

echo ""
echo "Step 2: Updating GitHub Secret SSH_PRIVATE_KEY..."
gh secret set SSH_PRIVATE_KEY < github-deploy-key && echo "✅ GitHub Secret updated"

echo ""
echo "Step 3: Testing SSH connection..."
ssh -i github-deploy-key -o StrictHostKeyChecking=no root@139.59.64.19 "echo '✅ SSH connection works!'"

echo ""
echo "✅ All done! GitHub Actions deploy workflow should now work."
