# Windows Quick Start - Deploy BA Dashboards

**Simple step-by-step guide for deploying from Windows to your server.**

---

## What You Need

- ✓ Windows computer with PowerShell
- ✓ Server access: `139.59.64.19`
- ✓ Root password for the server
- ✓ This project downloaded on your computer

---

## Step 1: Connect to Your Server

Open **PowerShell** (or Command Prompt) and connect:

```powershell
ssh root@139.59.64.19
```

Type `yes` when asked about authenticity, then enter your root password.

---

## Step 2: Upload Setup Script

**Important**: Open a NEW PowerShell window (don't close the SSH connection).

Navigate to your project folder:

```powershell
cd C:\path\to\GNOBADASHBOARDS
```

Upload the setup script:

```powershell
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/
```

Enter your root password when prompted.

---

## Step 3: Run Setup on Server

Go back to your SSH window (from Step 1) and run:

```bash
cd ~/gnopartners
chmod +x server-setup.sh
./server-setup.sh
```

### Setup Will Ask You:

```
Enter username for dashboard access: admin
New password: [your-chosen-password]
Re-type new password: [same-password]
```

**Write these down! You need them to access your dashboards.**

Wait for setup to complete (about 2-3 minutes).

---

## Step 4: Deploy Your Dashboards

### Option A: Using Git Bash (If Installed)

If you have Git Bash installed on Windows:

```bash
cd /c/path/to/GNOBADASHBOARDS
chmod +x deployment/deploy.sh
./deployment/deploy.sh
```

### Option B: Manual Deployment (Recommended for Windows)

From PowerShell in your project folder:

```powershell
# Deploy dashboard files
scp -r generated\* root@139.59.64.19:/var/www/ba-dashboards/generated/

# Deploy CSS files
scp -r src\assets\css\* root@139.59.64.19:/var/www/ba-dashboards/assets/css/

# Deploy JavaScript files
scp -r src\assets\js\* root@139.59.64.19:/var/www/ba-dashboards/assets/js/
```

Enter your root password each time when prompted.

### Fix Permissions (Required)

After uploading, run this in your SSH window:

```bash
chown -R www-data:www-data /var/www/ba-dashboards
chmod -R 755 /var/www/ba-dashboards
```

---

## Step 5: Access Your Dashboards

1. Open your web browser
2. Go to: **http://139.59.64.19**
3. Enter the username and password you created in Step 3
4. You're in! 🎉

### View Your Dashboards:

- **Main page**: http://139.59.64.19
- **All dashboards**: http://139.59.64.19/generated/
- **Specific dashboard**: http://139.59.64.19/generated/supersonic-brands.html

---

## Common Issues

### "Permission denied" when using SCP

**Solution**: Make sure you're using the correct password and the files exist.

Check if files exist:
```powershell
dir generated\
```

### Dashboard shows broken layout

**Solution**: Make sure you deployed the assets folder:

```powershell
scp -r src\assets\* root@139.59.64.19:/var/www/ba-dashboards/assets/
```

### "Connection refused" in browser

**Solution**: Check if Nginx is running:

```bash
# In SSH window
systemctl status nginx
systemctl start nginx
```

---

## Adding New Dashboards Later

Whenever you generate new dashboards:

1. Place them in the `generated/` folder
2. Run the deployment commands from Step 4 again
3. Refresh your browser

---

## Using WinSCP (Alternative - Easier for Windows Users)

If you prefer a GUI instead of command line:

1. **Download WinSCP**: https://winscp.net/
2. **Install and open** WinSCP
3. **Connect to server**:
   - Host name: `139.59.64.19`
   - User name: `root`
   - Password: [your root password]
   - Click "Login"

4. **Navigate on server** to: `/var/www/ba-dashboards/`

5. **Drag and drop**:
   - Drag `generated/*` to `/var/www/ba-dashboards/generated/`
   - Drag `src/assets/*` to `/var/www/ba-dashboards/assets/`

6. **Fix permissions** (in SSH window):
   ```bash
   chown -R www-data:www-data /var/www/ba-dashboards
   chmod -R 755 /var/www/ba-dashboards
   ```

Much easier! 😊

---

## Security Note

⚠️ **Always use HTTPS in production!**

For production use, install SSL certificate:

```bash
# In SSH window
apt-get install certbot python3-certbot-nginx
certbot --nginx
```

Follow the prompts to get a free SSL certificate.

---

## Quick Commands Reference

| Task | Command (PowerShell) |
|------|---------------------|
| Connect to server | `ssh root@139.59.64.19` |
| Upload files | `scp -r generated\* root@139.59.64.19:/var/www/ba-dashboards/generated/` |
| Check if server is running | `ssh root@139.59.64.19 'systemctl status nginx'` |
| Add new user | `ssh root@139.59.64.19 'htpasswd /etc/nginx/auth/.htpasswd newuser'` |

---

**You're all set! Your dashboards are now live and password-protected.** 🚀

For more details, see [DEPLOYMENT.md](DEPLOYMENT.md)
