# BA Dashboards - Automated Hosting

Host your BA dashboard HTML files with password protection and link-only access. **Push to GitHub and auto-deploy!**

## How It Works

1. **Add HTML files** to `dashboards/` folder
2. **Push to GitHub** (main branch)
3. **GitHub Actions auto-deploys** to your server
4. **Share links** with clients

That's it! No manual deployment needed.

## Quick Start

### One-Time Setup (5 minutes)

1. **Run server setup script**:
   ```bash
   scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/
   ssh root@139.59.64.19
   cd ~/gnopartners
   ./server-setup.sh
   ```

2. **Setup GitHub Actions** - Follow [SETUP-LINKS.md](SETUP-LINKS.md) ⭐ **CLICK HERE**
   - Generate SSH key
   - Add to server
   - Add 3 secrets to GitHub (direct links provided!)

### Daily Workflow

```bash
# 1. Add your dashboard HTML
dashboards/client-name-abc123.html

# 2. Commit and push
git add dashboards/
git commit -m "Add client dashboard"
git push

# 3. Done! GitHub Actions deploys automatically
# Check Actions tab on GitHub for deployment status
```

## Project Structure

```
GNOBADASHBOARDS/
├── dashboards/              # 👈 Put your HTML files here
│   └── client-name.html
├── assets/                  # CSS & JavaScript
│   ├── css/
│   └── js/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml      # 🤖 Auto-deployment workflow
│   └── SETUP.md            # Setup instructions
└── deployment/
    ├── server-setup.sh     # Server setup (run once)
    └── *.md                # Documentation
```

## Security Features

- 🔒 **Password Protected**: HTTP Basic Auth on all dashboards
- 🔗 **Link-Only Access**: No directory browsing enabled
- 🚫 **Private**: Each client only sees their own dashboard
- 🤖 **Secure Deployment**: SSH keys stored in GitHub Secrets

## Access Model

```
Client A: http://139.59.64.19/generated/acme-corp-k7f3m2.html
Client B: http://139.59.64.19/generated/globex-p9x4n1.html

✓ Client A can access their dashboard (with password)
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

## Documentation

- **[.github/SETUP.md](.github/SETUP.md)** - GitHub Actions setup (one-time)
- **[deployment/WINDOWS-QUICKSTART.md](deployment/WINDOWS-QUICKSTART.md)** - Manual deployment (backup)
- **[deployment/NAMING-GUIDE.md](deployment/NAMING-GUIDE.md)** - Dashboard naming tips

## GitHub Actions Workflow

The `.github/workflows/deploy.yml` automatically:

1. ✅ Triggers on push to main branch
2. ✅ Connects to server via SSH
3. ✅ Deploys dashboards and assets
4. ✅ Sets correct permissions
5. ✅ Creates `.hosted` marker file (tracks deployment)
6. ✅ Sends email notifications to team
7. ✅ Dashboards go live instantly

**View deployment status**: Go to GitHub → Actions tab

**Email notifications sent to:**
- ansh.t@agilitytech.ai
- preet.d@agilitytech.ai
- nihar.t@agilitytech.ai

## Common Tasks

### Add New Dashboard
```bash
# 1. Create HTML file
dashboards/new-client-xyz789.html

# 2. Push to GitHub
git add dashboards/new-client-xyz789.html
git commit -m "Add new client dashboard"
git push

# 3. GitHub Actions deploys automatically!
# Share link: http://139.59.64.19/generated/new-client-xyz789.html
```

### Add New User (Password Access)
```bash
ssh root@139.59.64.19
htpasswd /etc/nginx/auth/.htpasswd new-username
```

### View Deployment Logs
Go to: `GitHub → Your Repo → Actions → Click on latest run`

### View Server Logs
```bash
ssh root@139.59.64.19
tail -f /var/log/nginx/ba-dashboards-access.log
```

## Manual Deployment (Backup)

If GitHub Actions is down, deploy manually:

```bash
scp -r dashboards/* root@139.59.64.19:/var/www/ba-dashboards/generated/
scp -r assets/* root@139.59.64.19:/var/www/ba-dashboards/assets/
ssh root@139.59.64.19 "chown -R www-data:www-data /var/www/ba-dashboards"
```

---

**Workflow: Add HTML → Push → Auto-Deploy → Share Link → Done!** 🚀
