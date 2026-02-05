# GitHub Actions Setup

This repository uses GitHub Actions to automatically deploy dashboards to your server when you push changes.

## One-Time Setup

### 1. Server Setup (Run Once)

First, set up your server with Nginx:

```bash
# Upload and run server setup script
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/
ssh root@139.59.64.19
cd ~/gnopartners
chmod +x server-setup.sh
./server-setup.sh
```

This creates the directory structure and password protection.

### 2. Generate SSH Key for GitHub Actions

On your local machine:

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -f github-deploy-key -N ""

# This creates two files:
# - github-deploy-key (private key) - for GitHub Secrets
# - github-deploy-key.pub (public key) - for server
```

### 3. Add Public Key to Server

Copy the public key to your server:

```bash
# View public key
cat github-deploy-key.pub

# Add to server's authorized_keys
ssh root@139.59.64.19
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key, save and exit
chmod 600 ~/.ssh/authorized_keys
```

### 4. Add Secrets to GitHub

Go to your repository settings: `Settings → Secrets and variables → Actions → New repository secret`

Add these **3 secrets**:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `SSH_PRIVATE_KEY` | Contents of `github-deploy-key` file (private key) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_IP` | Your server IP address | `139.59.64.19` |
| `SERVER_USER` | SSH user (usually `root`) | `root` |

#### How to get SSH_PRIVATE_KEY value:

```bash
# On your local machine
cat github-deploy-key

# Copy EVERYTHING including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# [all the lines]
# -----END OPENSSH PRIVATE KEY-----
```

Paste the entire content into the `SSH_PRIVATE_KEY` secret.

### 5. Test the Connection

Test that GitHub can connect to your server:

```bash
# Test SSH connection with the key
ssh -i github-deploy-key root@139.59.64.19 "echo 'Connection successful!'"
```

If this works, GitHub Actions will work too!

---

## How It Works

Once setup is complete, the workflow is simple:

1. **Add HTML files** to `dashboards/` folder
2. **Commit and push** to GitHub (main branch)
3. **GitHub Actions automatically**:
   - Connects to your server via SSH
   - Deploys dashboards to `/root/gnopartners/generated/`
   - Deploys assets to `/root/gnopartners/assets/`
   - Sets correct permissions
   - Dashboards go live instantly!

---

## Viewing Deployment Status

1. Go to your GitHub repository
2. Click **Actions** tab
3. See deployment status for each push
4. Green checkmark ✅ = deployed successfully

---

## Troubleshooting

### Deployment fails with "Permission denied"

**Fix**: Check that the SSH public key is in the server's `~/.ssh/authorized_keys`

```bash
ssh root@139.59.64.19
cat ~/.ssh/authorized_keys
```

### Deployment fails with "Host key verification failed"

**Fix**: The workflow handles this automatically with `ssh-keyscan`

### Need to update secrets

Go to: `Repository Settings → Secrets and variables → Actions → Update secret`

---

## Security Notes

- ✅ Private SSH key is stored securely in GitHub Secrets
- ✅ Never commit private keys to the repository
- ✅ SSH key is only used during deployment and deleted after
- ✅ Server remains password-protected for dashboard access

---

## Manual Deployment (Backup Method)

If GitHub Actions is down, you can still deploy manually:

```bash
scp -r dashboards/* root@139.59.64.19:/root/gnopartners/generated/
scp -r assets/* root@139.59.64.19:/root/gnopartners/assets/
```

---

**After setup, just push to deploy! 🚀**
