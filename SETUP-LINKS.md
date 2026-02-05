# Complete Setup Guide - Click These Links!

## Required Setup - Do These 3 Things

### 1. Generate SSH Key (On Your Computer)

Run this command in PowerShell or Git Bash:

```bash
ssh-keygen -t ed25519 -f github-deploy-key -N ""
```

This creates two files:
- `github-deploy-key` (private key) - for GitHub
- `github-deploy-key.pub` (public key) - for server

---

### 2. Add Public Key to Server

```bash
# View the public key
cat github-deploy-key.pub

# Copy the output, then SSH to server
ssh root@139.59.64.19

# Add the public key
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key, save (Ctrl+X, Y, Enter)

# Set permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

### 3. Add GitHub Secrets - CLICK THESE LINKS ⬇️

**Your Repository:** https://github.com/niharagility21/GNOBADASHBOARDS

Go to: **Settings → Secrets and variables → Actions → New repository secret**

Or click directly:
👉 **https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new**

Add these **3 secrets**:

#### Secret 1: SSH_PRIVATE_KEY
```bash
# On your computer, run:
cat github-deploy-key

# Copy EVERYTHING including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# [all lines]
# -----END OPENSSH PRIVATE KEY-----
```

**Add here:** https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new
- Name: `SSH_PRIVATE_KEY`
- Value: [paste entire private key]

#### Secret 2: SERVER_IP
**Add here:** https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new
- Name: `SERVER_IP`
- Value: `139.59.64.19`

#### Secret 3: SERVER_USER
**Add here:** https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new
- Name: `SERVER_USER`
- Value: `root`

---

## ✅ That's It!

Now when you push dashboards, GitHub Actions will:
1. Auto-deploy to server
2. Send emails to:
   - ansh.t@agilitytech.ai
   - preet.d@agilitytech.ai
   - nihar.t@agilitytech.ai
3. Mark deployment with ".hosted" file

---

## Server Setup (First Time Only)

```bash
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/
ssh root@139.59.64.19
cd ~/gnopartners
chmod +x server-setup.sh
./server-setup.sh
```

---

## Test Deployment

```bash
# Add a test dashboard
echo "<h1>Test Dashboard</h1>" > dashboards/test-abc123.html

# Push
git add dashboards/
git commit -m "Test deployment"
git push

# Check GitHub Actions
```

**View Actions:** https://github.com/niharagility21/GNOBADASHBOARDS/actions

---

## Quick Links

- **Add Secrets:** https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions
- **View Actions:** https://github.com/niharagility21/GNOBADASHBOARDS/actions
- **Repository Settings:** https://github.com/niharagility21/GNOBADASHBOARDS/settings

---

## Troubleshooting

### Test SSH Connection
```bash
ssh -i github-deploy-key root@139.59.64.19 "echo 'Connection works!'"
```

### Check GitHub Secrets
Go to: https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions

You should see 3 secrets:
- ✅ SSH_PRIVATE_KEY
- ✅ SERVER_IP
- ✅ SERVER_USER

---

**All setup? Just push to deploy!** 🚀
