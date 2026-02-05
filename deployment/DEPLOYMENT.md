# Deployment Guide - BA Dashboards

Complete guide to deploy your BA dashboards to the server at `139.59.64.19` with password protection.

## Overview

This guide will help you:
1. Set up Nginx web server on your Ubuntu server
2. Configure password protection for dashboards
3. Deploy dashboard files to the server
4. Access your dashboards securely

---

## Prerequisites

- Server: `139.59.64.19` (Ubuntu 24.04 LTS)
- SSH access as root
- Local machine with the BA Dashboards project

---

## Step 1: Initial Server Setup

### Connect to Your Server

From your local machine (Windows PowerShell or CMD):

```bash
ssh root@139.59.64.19
```

Enter your root password when prompted.

### Transfer Setup Script to Server

From your local machine, navigate to your project directory and run:

```bash
# On Windows (PowerShell)
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/

# On Linux/Mac
scp deployment/server-setup.sh root@139.59.64.19:~/gnopartners/
```

---

## Step 2: Run Server Setup Script

SSH into your server and run the setup script:

```bash
ssh root@139.59.64.19

cd ~/gnopartners
chmod +x server-setup.sh
./server-setup.sh
```

The script will:
- ✓ Update system packages
- ✓ Install Nginx web server
- ✓ Create directory structure at `/var/www/ba-dashboards`
- ✓ Prompt you to create username and password
- ✓ Configure Nginx with password protection
- ✓ Set up firewall rules
- ✓ Start the web server

### When Prompted:

```
Enter username for dashboard access: admin
New password: [enter your password]
Re-type new password: [re-enter password]
```

**Save these credentials! You'll need them to access the dashboards.**

---

## Step 3: Deploy Your Dashboards

### Option A: Automated Deployment (Recommended)

From your local machine in the project directory:

```bash
# Make deploy script executable
chmod +x deployment/deploy.sh

# Run deployment
./deployment/deploy.sh
```

This will:
- Create deployment package
- Transfer all dashboard files to server
- Transfer CSS/JS assets to server
- Set proper permissions
- Complete automatically

### Option B: Manual Deployment

If you prefer to deploy manually:

```bash
# Deploy generated dashboards
scp -r generated/* root@139.59.64.19:/var/www/ba-dashboards/generated/

# Deploy assets
scp -r src/assets/css/* root@139.59.64.19:/var/www/ba-dashboards/assets/css/
scp -r src/assets/js/* root@139.59.64.19:/var/www/ba-dashboards/assets/js/
scp -r src/assets/images/* root@139.59.64.19:/var/www/ba-dashboards/assets/images/

# Set permissions
ssh root@139.59.64.19 "chown -R www-data:www-data /var/www/ba-dashboards && chmod -R 755 /var/www/ba-dashboards"
```

---

## Step 4: Access Your Dashboards

### Open in Browser

Navigate to: **http://139.59.64.19**

### Login

You'll be prompted for credentials:
- **Username**: The username you created during setup (e.g., `admin`)
- **Password**: The password you created during setup

### View Dashboards

Once logged in, you can:
- See the main index page at: `http://139.59.64.19`
- Browse all dashboards at: `http://139.59.64.19/generated/`
- Access specific dashboard: `http://139.59.64.19/generated/supersonic-brands.html`

---

## Server Directory Structure

```
/var/www/ba-dashboards/
├── generated/                  # Your dashboard HTML files
│   └── supersonic-brands.html
├── assets/                     # Supporting assets
│   ├── css/
│   │   └── dashboard.css
│   ├── js/
│   │   ├── navigation.js
│   │   └── charts.js
│   └── images/
└── index.html                  # Main landing page
```

---

## Managing the Server

### Add More Users

To add additional users who can access the dashboards:

```bash
ssh root@139.59.64.19
htpasswd /etc/nginx/auth/.htpasswd new-username
```

### Remove a User

```bash
ssh root@139.59.64.19
htpasswd -D /etc/nginx/auth/.htpasswd username
```

### Update Dashboards

When you generate new dashboards, re-run the deployment:

```bash
./deployment/deploy.sh
```

### Check Nginx Status

```bash
ssh root@139.59.64.19
systemctl status nginx
```

### View Nginx Logs

```bash
ssh root@139.59.64.19
tail -f /var/log/nginx/ba-dashboards-access.log
tail -f /var/log/nginx/ba-dashboards-error.log
```

### Restart Nginx

If you make configuration changes:

```bash
ssh root@139.59.64.19
nginx -t                # Test configuration
systemctl restart nginx # Restart if test passes
```

---

## Troubleshooting

### Problem: Cannot Connect to Server

**Solution**: Check if Nginx is running
```bash
ssh root@139.59.64.19
systemctl status nginx
systemctl start nginx  # If not running
```

### Problem: Password Not Working

**Solution**: Reset the password
```bash
ssh root@139.59.64.19
htpasswd /etc/nginx/auth/.htpasswd admin
```

### Problem: Dashboard Shows 404 Error

**Solution**: Verify files are deployed
```bash
ssh root@139.59.64.19
ls -la /var/www/ba-dashboards/generated/
```

If empty, re-run deployment script.

### Problem: CSS/JS Not Loading

**Solution**: Check assets directory
```bash
ssh root@139.59.64.19
ls -la /var/www/ba-dashboards/assets/
```

Ensure files are present and permissions are correct:
```bash
chown -R www-data:www-data /var/www/ba-dashboards
chmod -R 755 /var/www/ba-dashboards
```

### Problem: Firewall Blocking Access

**Solution**: Open port 80
```bash
ssh root@139.59.64.19
ufw allow 80
ufw status
```

---

## Security Best Practices

### 1. Use HTTPS (Recommended for Production)

Install Let's Encrypt SSL certificate:

```bash
ssh root@139.59.64.19
apt-get install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

### 2. Change Default Password Regularly

```bash
htpasswd /etc/nginx/auth/.htpasswd admin
```

### 3. Limit SSH Access

Edit SSH config to disable password authentication (use SSH keys):

```bash
nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
systemctl restart sshd
```

### 4. Keep Server Updated

```bash
apt-get update
apt-get upgrade
```

---

## Continuous Deployment

### Automate Dashboard Updates

Create a cron job to automatically deploy new dashboards:

```bash
# On your local machine, add to crontab:
0 2 * * * cd /path/to/GNOBADASHBOARDS && ./deployment/deploy.sh >> deploy.log 2>&1
```

This deploys new dashboards daily at 2 AM.

---

## DNS Setup (Optional)

If you have a domain name, point it to your server:

1. Go to your domain registrar
2. Create an A record:
   - **Name**: `dashboards` (or `@` for root domain)
   - **Type**: A
   - **Value**: `139.59.64.19`
   - **TTL**: 300 (or default)

3. Update Nginx configuration:
```bash
ssh root@139.59.64.19
nano /etc/nginx/sites-available/ba-dashboards
# Change: server_name _;
# To: server_name dashboards.yourdomain.com;
nginx -t
systemctl restart nginx
```

---

## Support

For issues or questions:
1. Check the [README.md](../README.md) for project documentation
2. Review Nginx logs: `/var/log/nginx/ba-dashboards-error.log`
3. Verify server status: `systemctl status nginx`

---

## Quick Reference

| Action | Command |
|--------|---------|
| Deploy dashboards | `./deployment/deploy.sh` |
| Check server status | `ssh root@139.59.64.19 'systemctl status nginx'` |
| View access logs | `ssh root@139.59.64.19 'tail -f /var/log/nginx/ba-dashboards-access.log'` |
| Add user | `ssh root@139.59.64.19 'htpasswd /etc/nginx/auth/.htpasswd username'` |
| Restart Nginx | `ssh root@139.59.64.19 'systemctl restart nginx'` |
| Update server | `ssh root@139.59.64.19 'apt-get update && apt-get upgrade'` |

---

**Your dashboards are now live and secured! 🎉**
