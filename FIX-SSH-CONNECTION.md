# Fix SSH Connection Timeout

## Problem
GitHub Actions can't connect to server: `ssh: connect to host 139.59.64.19 port 22: Connection timed out`

## Solution
The server firewall is blocking GitHub Actions. Run these commands on your server (139.59.64.19):

```bash
# Allow SSH from anywhere (if using UFW firewall)
ufw allow 22/tcp

# OR allow specific GitHub Actions IP ranges
# GitHub Actions uses multiple IP ranges, easiest to allow all or use specific ranges
# See: https://api.github.com/meta for current ranges
```

## Alternative: Use DigitalOcean Firewall
If using DigitalOcean, add firewall rule:
- Type: SSH
- Protocol: TCP
- Port: 22
- Sources: All IPv4, All IPv6

## Test
After opening port 22, test from your local machine:
```bash
ssh root@139.59.64.19
```

Then re-run the GitHub Actions workflow.

---

# Fix Gmail Authentication

## Problem
Email sending fails: `Invalid login: 535-5.7.8 Username and Password not accepted`

## Solution
Update the Gmail App Password in `.github/workflows/deploy.yml`:

1. Go to Google Account: https://myaccount.google.com/apppasswords
2. Generate new App Password for "Mail"
3. Update line 100 in deploy.yml with new password

OR use a different email service (SendGrid, Mailgun, etc.)
