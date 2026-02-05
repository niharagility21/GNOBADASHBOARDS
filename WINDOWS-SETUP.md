# Quick Setup for Windows - Copy & Paste Ready!

## Step 1: Get Your Public Key

You already generated the SSH key! Now get the public key:

### On Windows (PowerShell or CMD):
```powershell
type github-deploy-key.pub
```

**Copy the ENTIRE output** (starts with `ssh-ed25519` and ends with your computer name)

---

## Step 2: Add Public Key to Server

You're already SSH'd into the server! Now run these commands:

```bash
cd /root/gnopartners

# Create or edit authorized_keys
nano ~/.ssh/authorized_keys
```

**Paste the public key** you copied from step 1, then:
- Press `Ctrl+X`
- Press `Y`
- Press `Enter`

```bash
# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Test it works
cat ~/.ssh/authorized_keys
```

You should see your public key listed!

---

## Step 3: Run Server Setup

Still in the server SSH session:

```bash
cd /root/gnopartners

# Make setup script executable
chmod +x server-setup.sh

# Run setup
./server-setup.sh
```

Follow the prompts to create username and password.

---

## Step 4: Add GitHub Secrets

Open these links one by one and add the secrets:

### Secret 1: SSH_PRIVATE_KEY
👉 https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new

On your Windows computer, run:
```powershell
type github-deploy-key
```

Copy **EVERYTHING** including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
[all the lines]
-----END OPENSSH PRIVATE KEY-----
```

- Name: `SSH_PRIVATE_KEY`
- Secret: [paste the entire private key]
- Click "Add secret"

### Secret 2: SERVER_IP
👉 https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new

- Name: `SERVER_IP`
- Secret: `139.59.64.19`
- Click "Add secret"

### Secret 3: SERVER_USER
👉 https://github.com/niharagility21/GNOBADASHBOARDS/settings/secrets/actions/new

- Name: `SERVER_USER`
- Secret: `root`
- Click "Add secret"

---

## ✅ Done! Test It

### Test SSH connection:
```powershell
# On your Windows computer
ssh -i github-deploy-key root@139.59.64.19
```

If it connects WITHOUT asking for password, you're good!

### Test deployment:
```powershell
# Create test dashboard
echo "<h1>Test Dashboard</h1>" > dashboards\test.html

# Push to GitHub
git add dashboards\
git commit -m "Test deployment"
git push
```

**Check GitHub Actions:** https://github.com/niharagility21/GNOBADASHBOARDS/actions

You should receive an email when deployment completes!

---

## Your Dashboards Are At

http://139.59.64.19/generated/[filename].html

Example: http://139.59.64.19/generated/test.html

---

**Need help? All paths now use `/root/gnopartners/` on the server!** 🚀
