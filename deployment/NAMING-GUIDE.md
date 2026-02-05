# Dashboard Naming Convention Guide

## Overview

Dashboards are accessible **ONLY by direct link** - no directory browsing is enabled. This means each dashboard filename acts as part of the security model.

---

## Why Naming Matters

Since dashboards are protected by:
1. **Password authentication** (username/password required)
2. **Unique URLs** (no directory listing)
3. **Direct link access only**

The filename becomes an important part of your security:
- ✓ Hard-to-guess names add security through obscurity
- ✓ Descriptive names help you manage multiple clients
- ✓ Consistent naming makes dashboards easy to organize

---

## Recommended Naming Patterns

### Pattern 1: Client Name + Random Code (Recommended)

Best for client privacy and security:

```
client-name-abc123.html
supersonic-brands-k7f3m2.html
meow-mates-p9x4n1.html
acme-corp-report-5h8j2k.html
```

**Pros:**
- Hard to guess
- Client-specific
- Professional appearance
- Good security

**Generate random codes:**
```bash
# On Linux/Mac/Git Bash
echo "client-name-$(openssl rand -hex 3).html"

# Or manually: use random letters/numbers like a7f3k2
```

### Pattern 2: Client Name + Date + Code

Good for tracking dashboard versions:

```
supersonic-brands-2024-02-abc123.html
client-name-jan-2024-x7k2m.html
```

**Pros:**
- Easy to track versions
- Time-stamped
- Still secure with random code

### Pattern 3: Simple Client Name (Less Secure)

Only if you need simple URLs:

```
supersonic-brands.html
meow-mates-dashboard.html
```

**Cons:**
- Easier to guess
- Less secure
- Not recommended for sensitive data

---

## Naming Rules

### DO:
- ✓ Use lowercase letters
- ✓ Use hyphens (-) instead of spaces
- ✓ Keep names under 100 characters
- ✓ Include random characters for security
- ✓ Make names descriptive enough for your tracking

### DON'T:
- ✗ Use spaces in filenames
- ✗ Use special characters like: & ? # % @ ! *
- ✗ Use only numbers (hard to remember)
- ✗ Use sequential names (client-1.html, client-2.html)
- ✗ Include sensitive information in filename

---

## Examples by Use Case

### For Client Confidentiality (High Security)
```
rpt-7k3m2x.html
dash-p9f4n1.html
analytics-h8j2k5.html
```
Client name not in filename - you maintain a separate mapping.

### For Easy Client Identification (Medium Security)
```
acme-corporation-m7k3x2.html
globex-industries-p9n4f1.html
initech-report-k5h8j2.html
```
Client name + random code for balance.

### For Internal/Demo Use (Lower Security)
```
demo-dashboard.html
sample-report.html
test-analytics.html
```
Only for non-sensitive demos.

---

## Managing Dashboard URLs

### Create a Dashboard Registry

Keep a private spreadsheet or file to track your dashboards:

| Client Name | Dashboard URL | Date Created | Password |
|-------------|--------------|--------------|----------|
| Supersonic Brands | http://139.59.64.19/generated/supersonic-brands-k7f3m2.html | 2024-02-05 | admin/pass123 |
| Meow Mates | http://139.59.64.19/generated/meow-mates-p9x4n1.html | 2024-02-05 | admin/pass123 |

### URL Sharing Templates

**Email Template:**
```
Subject: Your Business Analytics Dashboard

Hi [Client Name],

Your custom analytics dashboard is now ready. Access it here:

Dashboard URL: http://139.59.64.19/generated/[filename].html
Username: [username]
Password: [password]

Please keep this link confidential. If you need any assistance, let me know.

Best regards,
[Your Name]
```

**Slack/Teams Message:**
```
🔒 Your BA Dashboard is Ready!

Link: http://139.59.64.19/generated/[filename].html
User: [username]
Pass: [password]

(Keep this link private - it's unique to your dashboard)
```

---

## Updating Naming After Generation

If you want to rename a dashboard:

### On Server:
```bash
ssh root@139.59.64.19
cd /var/www/ba-dashboards/generated/
mv old-name.html new-name-abc123.html
```

### Or Re-generate with New Name:

When generating dashboards, specify the output name:

```bash
node src/generator/generator.js uploads/document.pdf client-name-abc123
```

---

## Best Practices Checklist

Before deploying a dashboard:

- [ ] Filename uses lowercase and hyphens
- [ ] Includes random characters for security
- [ ] Name is descriptive enough for your tracking
- [ ] You've recorded the URL in your dashboard registry
- [ ] No sensitive info in the filename itself
- [ ] Filename matches your naming convention

---

## Security Tips

### Additional Security Layers:

1. **IP Whitelisting** (Optional):
   Restrict access to specific IPs in Nginx config

2. **Expiring Links** (Advanced):
   Use timestamped filenames and delete old versions

3. **Per-Client Passwords** (Recommended):
   Create separate user accounts for each client:
   ```bash
   htpasswd /etc/nginx/auth/.htpasswd client-username
   ```

4. **HTTPS** (Highly Recommended):
   Always use HTTPS in production to encrypt passwords

---

## Quick Reference

```bash
# Good Examples:
supersonic-brands-k7f3m2.html
client-abc-p9x4n1.html
report-2024-h8j2k5.html

# Avoid:
client 1.html          # Has space
client&report.html     # Special characters
12345.html            # Only numbers
client-name.html      # Too predictable
```

---

**Remember: Your filename + password = two layers of security!**
