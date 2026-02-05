#!/bin/bash
# BA Dashboards Server Setup Script
# Installs and configures Nginx to host BA dashboards with password protection

set -e  # Exit on any error

echo "=========================================="
echo "BA Dashboards Server Setup"
echo "=========================================="
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)"
   exit 1
fi

# Update system packages
echo "1. Updating system packages..."
apt-get update -y
apt-get upgrade -y

# Install required packages
echo "2. Installing Nginx and required tools..."
apt-get install -y nginx apache2-utils

# Create directory structure
echo "3. Creating directory structure..."
mkdir -p /var/www/ba-dashboards
mkdir -p /var/www/ba-dashboards/generated
mkdir -p /var/www/ba-dashboards/assets
mkdir -p /etc/nginx/auth

# Set permissions
chown -R www-data:www-data /var/www/ba-dashboards
chmod -R 755 /var/www/ba-dashboards

echo "4. Setting up password protection..."
# Prompt for username and password
read -p "Enter username for dashboard access: " USERNAME
htpasswd -c /etc/nginx/auth/.htpasswd "$USERNAME"

# Copy Nginx configuration
echo "5. Configuring Nginx..."
cat > /etc/nginx/sites-available/ba-dashboards << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name _;  # Replace with your domain if you have one

    root /var/www/ba-dashboards;
    index index.html;

    # Enable password protection for entire site
    auth_basic "BA Dashboards - Restricted Access";
    auth_basic_user_file /etc/nginx/auth/.htpasswd;

    # Main location
    location / {
        try_files $uri $uri/ =404;
        autoindex on;  # Enable directory listing
        autoindex_exact_size off;
        autoindex_localtime on;
    }

    # Serve generated dashboards
    location /generated/ {
        alias /var/www/ba-dashboards/generated/;
        try_files $uri $uri/ =404;
    }

    # Serve assets (CSS, JS, images)
    location /assets/ {
        alias /var/www/ba-dashboards/assets/;
        try_files $uri $uri/ =404;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/ba-dashboards-access.log;
    error_log /var/log/nginx/ba-dashboards-error.log;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/ba-dashboards /etc/nginx/sites-enabled/ba-dashboards

# Remove default Nginx site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "6. Testing Nginx configuration..."
nginx -t

# Restart Nginx
echo "7. Restarting Nginx..."
systemctl restart nginx
systemctl enable nginx

# Configure firewall (if UFW is installed)
if command -v ufw &> /dev/null; then
    echo "8. Configuring firewall..."
    ufw allow 'Nginx Full'
    ufw --force enable
fi

# Create index page
echo "9. Creating index page..."
cat > /var/www/ba-dashboards/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BA Dashboards</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
            font-weight: 800;
        }
        .subtitle {
            color: #666;
            margin-bottom: 40px;
            font-size: 1.1em;
        }
        .dashboards {
            margin-top: 30px;
        }
        .dashboard-link {
            display: block;
            padding: 20px 25px;
            margin: 15px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 1.1em;
        }
        .dashboard-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        .status {
            background: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .status p {
            color: #1e40af;
            font-size: 0.95em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 BA Dashboards</h1>
        <p class="subtitle">Business Analytics & Strategic Reports</p>

        <div class="status">
            <p><strong>✓ Server Online</strong> - All dashboards are accessible below</p>
        </div>

        <div class="dashboards">
            <h3 style="margin-bottom: 15px; color: #333;">Available Dashboards:</h3>
            <a href="/generated/" class="dashboard-link">
                📁 View All Dashboards
            </a>
        </div>
    </div>
</body>
</html>
EOF

# Get server IP
SERVER_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "Your BA Dashboards server is now running!"
echo ""
echo "Access URL: http://$SERVER_IP"
echo "Username: $USERNAME"
echo "Password: (the password you just set)"
echo ""
echo "Next steps:"
echo "1. Upload your dashboard files to: /var/www/ba-dashboards/generated/"
echo "2. Upload your assets to: /var/www/ba-dashboards/assets/"
echo "3. Access your dashboards at: http://$SERVER_IP/generated/"
echo ""
echo "To add more users, run:"
echo "htpasswd /etc/nginx/auth/.htpasswd <new-username>"
echo ""
echo "=========================================="
