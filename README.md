# BA Dashboards - Simple Hosting

Host your BA dashboard HTML files with password protection and link-only access.

## What This Does

- ✅ Host HTML dashboards on your server
- ✅ Password protected access
- ✅ Link-only access (no directory browsing)
- ✅ Each client gets their unique dashboard link
- ✅ Perfect client confidentiality

## Project Structure

```
GNOBADASHBOARDS/
├── dashboards/          # Put your HTML dashboard files here
│   └── supersonic-brands.html
├── assets/              # CSS and JavaScript for dashboards
│   ├── css/
│   └── js/
└── deployment/          # Deployment scripts for server
    ├── server-setup.sh
    ├── deploy.sh
    ├── WINDOWS-QUICKSTART.md
    ├── DEPLOYMENT.md
    └── NAMING-GUIDE.md
```

## Quick Start

### 1. Add Your Dashboards

Place your HTML dashboard files in the `dashboards/` folder:

```
dashboards/
├── client-a-abc123.html
├── client-b-xyz789.html
└── supersonic-brands.html
```

### 2. Deploy to Server

**Server**: `139.59.64.19`

#### First Time Setup (run once)

```bash
# Upload setup script
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/

# SSH and run
ssh root@139.59.64.19
cd ~/gnopartners
chmod +x server-setup.sh
./server-setup.sh
```

Creates username/password for access.

#### Deploy Dashboards (every time you add new ones)

From Windows PowerShell:

```powershell
# Deploy dashboards
scp -r dashboards\* root@139.59.64.19:/var/www/ba-dashboards/generated/

# Deploy assets
scp -r assets\css\* root@139.59.64.19:/var/www/ba-dashboards/assets/css/
scp -r assets\js\* root@139.59.64.19:/var/www/ba-dashboards/assets/js/
```

Fix permissions (in SSH):

```bash
ssh root@139.59.64.19
chown -R www-data:www-data /var/www/ba-dashboards
chmod -R 755 /var/www/ba-dashboards
```

### 3. Share Links with Clients

Each client gets their unique URL:

```
http://139.59.64.19/generated/client-name-abc123.html
```

## How It Works

### Security Model

- 🔒 **Password Protected**: All access requires username/password
- 🔗 **Link-Only**: Clients can ONLY access dashboards via direct link
- 🚫 **No Browsing**: Directory listing disabled
- 👤 **Private**: Each client only sees their own dashboard

### Example

```
Client A: http://139.59.64.19/generated/acme-corp-k7f3m2.html
Client B: http://139.59.64.19/generated/globex-p9x4n1.html

✓ Client A can access their dashboard
✗ Client A cannot browse /generated/
✗ Client A cannot see Client B's dashboard
```

## Dashboard Naming

Use unique names with random codes:

```
✓ GOOD:
client-name-abc123.html
supersonic-brands-k7f3m2.html

✗ AVOID:
client1.html          # Too predictable
my dashboard.html     # Has spaces
```

See [deployment/NAMING-GUIDE.md](deployment/NAMING-GUIDE.md) for details.

## Documentation

- **[deployment/WINDOWS-QUICKSTART.md](deployment/WINDOWS-QUICKSTART.md)** - Windows step-by-step
- **[deployment/DEPLOYMENT.md](deployment/DEPLOYMENT.md)** - Complete reference
- **[deployment/NAMING-GUIDE.md](deployment/NAMING-GUIDE.md)** - Naming best practices

## Common Tasks

### Add New Dashboard
1. Place HTML in `dashboards/`
2. Run deployment commands
3. Share link with client

### Add New User
```bash
ssh root@139.59.64.19
htpasswd /etc/nginx/auth/.htpasswd new-username
```

### View Logs
```bash
ssh root@139.59.64.19
tail -f /var/log/nginx/ba-dashboards-access.log
```

---

**Simple: Add HTML → Deploy → Share link → Done!** 🎉
