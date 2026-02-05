# How to Open Port 22 on Your Server

## Step 1: Connect to Your Server

Open your terminal (Command Prompt/PowerShell on Windows, Terminal on Mac/Linux) and run:

```bash
ssh root@139.59.64.19
```

When prompted for password, enter: `TN@qwe4321n`

## Step 2: Check Current Firewall Status

Once connected, run:

```bash
ufw status
```

## Step 3: Open Port 22 (SSH)

Run this command:

```bash
ufw allow 22/tcp
```

If UFW is not active, you might need to enable it first:

```bash
ufw enable
ufw allow 22/tcp
```

**IMPORTANT:** Always allow port 22 BEFORE enabling UFW, otherwise you'll lock yourself out!

## Step 4: Verify Port is Open

Check the firewall status again:

```bash
ufw status
```

You should see:
```
22/tcp                     ALLOW       Anywhere
```

## Alternative: Using DigitalOcean Dashboard

If your server is on DigitalOcean and you can't SSH in, use their web dashboard:

1. Go to https://cloud.digitalocean.com/
2. Click on your Droplet (139.59.64.19)
3. Click "Networking" tab
4. Click "Firewalls"
5. Edit firewall rules to allow SSH (port 22) from all sources

OR use the "Console" button in the dashboard to access your server without SSH.

## Step 5: Test from GitHub Actions

After opening port 22, go to your GitHub repository and manually trigger the workflow:

1. Go to Actions tab
2. Click "Deploy Dashboards"
3. Click "Run workflow"
4. Select "main" branch
5. Click "Run workflow"

Done! Your deployment should work now.
