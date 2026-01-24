# ClayWorks Hetzner Deployment Guide

Complete step-by-step guide to deploy ClayWorks on Hetzner.

---

## Prerequisites

Before you begin, make sure you have:

- [ ] Hetzner Cloud account
- [ ] A domain with DNS access (e.g., Hostinger, Cloudflare, GoDaddy)
- [ ] SSH client on your local machine
- [ ] `openssl` installed locally (for generating secrets)

---

## Quick Reference

After deployment, your services will be available at:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `https://app.yourdomain.com` | Main website |
| Strapi CMS | `https://cms.app.yourdomain.com/admin` | Content management |
| API | `https://api.app.yourdomain.com/health` | Go middleware |
| Traefik | `https://traefik.app.yourdomain.com/dashboard/` | Reverse proxy dashboard |

---

## Step 1: Create Hetzner Server

1. Go to [Hetzner Cloud Console](https://console.hetzner.cloud)
2. Create new project or select existing
3. **Add Server:**
   - **Location**: Nuremberg (or your preferred)
   - **Image**: Ubuntu 22.04
   - **Type**: CX52 (16 vCPU, 32 GB RAM) — or smaller for testing
   - **SSH Key**: Add your public key from your local machine

4. **Copy the server IP address** — you'll need this for everything below

> [!TIP]
> If you don't have an SSH key yet, generate one on your local machine:
> ```bash
> ssh-keygen -t ed25519 -C "your-email@example.com"
> cat ~/.ssh/id_ed25519.pub  # Copy this to Hetzner
> ```

---

## Step 2: Configure DNS

> [!IMPORTANT]
> **Do this step BEFORE deploying!** DNS can take 5-30 minutes to propagate. Setting it up first means SSL certificates will work when you deploy.

Go to your domain provider's DNS settings and add these A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `app` | YOUR_SERVER_IP | 3600 |
| A | `cms.app` | YOUR_SERVER_IP | 3600 |
| A | `api.app` | YOUR_SERVER_IP | 3600 |
| A | `traefik.app` | YOUR_SERVER_IP | 3600 |

**Example:** If your domain is `clayworks.io` and server IP is `65.108.123.45`:
- `app.clayworks.io` → `65.108.123.45`
- `cms.app.clayworks.io` → `65.108.123.45`
- etc.

**Verify DNS propagation** (wait until this works before Step 5):
```bash
dig app.yourdomain.com +short
# Should return your server IP
```

---

## Step 3: Setup Server

SSH into your server and run the setup script:

```bash
# SSH into server as root
ssh root@YOUR_SERVER_IP

# Download and run setup script
curl -O https://raw.githubusercontent.com/YOUR_REPO/main/deploy/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

**What this installs:**
- Docker & Docker Compose
- UFW firewall (allows SSH, HTTP, HTTPS only)
- fail2ban (blocks brute-force attacks)
- Creates `/opt/clayworks` directory

> [!NOTE]
> This does NOT disable root login. You can optionally harden SSH later (see [Security Hardening](#optional-security-hardening) at the end).

---

## Step 4: Prepare Environment Variables

> [!CAUTION]
> **Read this entire section before editing!** You'll need to generate secrets and understand each variable.

```bash
# Clone the repository
cd /opt/clayworks
git clone https://github.com/YOUR_ORG/clayworks.git .

# Create your environment file
cp .env.production.example .env.production
nano .env.production
```

### 4.1: Domain Settings

```env
# Your domain (without https://)
DOMAIN=app.yourdomain.com

# Email for SSL certificate expiry notifications
ACME_EMAIL=your-email@example.com
```

### 4.2: Generate Secrets

Run this command **on your local machine** for each secret you need:
```bash
openssl rand -base64 32
```

Fill in these values in `.env.production`:
```env
POSTGRES_PASSWORD=<paste-generated-secret>
REDIS_PASSWORD=<paste-generated-secret>
APP_KEYS=<secret1>,<secret2>,<secret3>,<secret4>
ADMIN_JWT_SECRET=<paste-generated-secret>
API_TOKEN_SALT=<paste-generated-secret>
TRANSFER_TOKEN_SALT=<paste-generated-secret>
JWT_SECRET=<paste-generated-secret>
API_KEY=<paste-generated-secret>
```

### 4.3: Traefik Dashboard Password

Generate a password hash:
```bash
# On the server (htpasswd was installed by setup script)
htpasswd -nb admin your-secure-password
```

Output: `admin:$apr1$xyz123$hashedpassword`

**Important:** Double the `$` signs when pasting into `.env.production`:
```env
TRAEFIK_DASHBOARD_AUTH=admin:$$apr1$$xyz123$$hashedpassword
```

### 4.4: Leave These Blank For Now

These tokens are generated AFTER deployment:
```env
# Set in Step 6 after Strapi is running
STRAPI_API_TOKEN=

# Set in Step 7 after Crowdsec is running
CROWDSEC_BOUNCER_KEY=
```

---

## Step 5: Deploy

> [!IMPORTANT]
> Make sure DNS is propagated (Step 2) before deploying! Run `dig app.yourdomain.com +short` — if it doesn't return your server IP, wait longer.

```bash
cd /opt/clayworks

# Build and start all services (takes 10-15 minutes first time)
docker compose -f docker-compose.prod.yml up -d --build

# Watch the logs to see progress (Ctrl+C to exit)
docker compose -f docker-compose.prod.yml logs -f
```

**Wait for all services to show "Up":**
```bash
docker compose -f docker-compose.prod.yml ps
```

Expected output:
```
NAME                    STATUS    PORTS
clayworks-frontend      Up        3000/tcp
clayworks-middleware    Up        8080/tcp
clayworks-strapi        Up        1337/tcp
clayworks-postgres      Up        5432/tcp
clayworks-redis         Up        6379/tcp
clayworks-traefik       Up        0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
clayworks-crowdsec      Up        
clayworks-bouncer       Up
```

---

## Step 6: Create Strapi API Token

> [!WARNING]
> **The frontend will NOT work until you complete this step!** The middleware needs this token to fetch content from Strapi.

1. **Open Strapi Admin** in your browser:
   ```
   https://cms.app.yourdomain.com/admin
   ```

2. **Create your admin account** (first-time setup):
   - Email, password, name

3. **Generate API Token:**
   - Go to: **Settings** → **API Tokens** → **Create new API Token**
   - Name: `Frontend Access`
   - Token type: **Full access**
   - Click **Save**
   - **Copy the token immediately** — you won't see it again!

4. **Add token to environment:**
   ```bash
   nano /opt/clayworks/.env.production
   
   # Paste your token:
   STRAPI_API_TOKEN=your_copied_token_here
   ```

5. **Restart middleware to pick up the token:**
   ```bash
   docker compose -f docker-compose.prod.yml restart middleware
   ```

---

## Step 7: Configure Crowdsec (Security)

Crowdsec protects your site from malicious traffic. Generate its API key:

```bash
# Generate bouncer API key
docker exec clayworks-crowdsec cscli bouncers add traefik-bouncer

# Copy the displayed key
```

Add to environment:
```bash
nano /opt/clayworks/.env.production

# Paste:
CROWDSEC_BOUNCER_KEY=your_generated_key_here
```

Restart the bouncer:
```bash
docker compose -f docker-compose.prod.yml restart crowdsec-bouncer
```

---

## Step 8: Verify Deployment

### Check all URLs work:

```bash
# Frontend (should return 200)
curl -I https://app.yourdomain.com

# API health check
curl https://api.app.yourdomain.com/health

# Strapi health check
curl https://cms.app.yourdomain.com/_health
```

### Check SSL certificates:
```bash
openssl s_client -connect app.yourdomain.com:443 -servername app.yourdomain.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer -dates
```

Should show "Let's Encrypt" as issuer.

### Access Traefik Dashboard:
```
https://traefik.app.yourdomain.com/dashboard/
```
Login with the credentials you set in Step 4.3.

---

## ✅ Deployment Complete!

Your site should now be live at `https://app.yourdomain.com`

---

## Common Commands

### View Logs
```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f strapi
docker compose -f docker-compose.prod.yml logs -f traefik
```

### Restart Services
```bash
# All services
docker compose -f docker-compose.prod.yml restart

# Specific service
docker compose -f docker-compose.prod.yml restart frontend
```

### Update Deployment
```bash
cd /opt/clayworks
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

### Database Backup
```bash
docker exec clayworks-postgres pg_dump -U strapi clayworks_strapi > backup_$(date +%Y%m%d).sql
```

### Database Restore
```bash
cat backup.sql | docker exec -i clayworks-postgres psql -U strapi -d clayworks_strapi
```

---

## Troubleshooting

### SSL Certificate Not Working

```bash
docker logs clayworks-traefik
```

**Common causes:**
- DNS not propagated yet → wait longer, verify with `dig`
- Firewall blocking ports → check `ufw status`
- Let's Encrypt rate limit → wait 1 hour

### Service Won't Start

```bash
# Check logs for the failing service
docker compose -f docker-compose.prod.yml logs strapi

# Check container status
docker compose -f docker-compose.prod.yml ps
```

### Frontend Shows Errors / No Content

- Did you complete Step 6 (Strapi API Token)?
- Check middleware logs: `docker compose -f docker-compose.prod.yml logs middleware`

### Reset Everything (Nuclear Option)

```bash
# WARNING: This deletes ALL data including database!
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Optional: GitHub Actions CI/CD

To enable automatic deployments when you push to main:

1. **Create a deploy SSH key** (on your local machine):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/clayworks-deploy
   ssh-copy-id -i ~/.ssh/clayworks-deploy.pub root@YOUR_SERVER_IP
   ```

2. **Add secrets to GitHub** (Settings → Secrets → Actions):

   | Secret Name | Value |
   |-------------|-------|
   | `HETZNER_HOST` | Your server IP |
   | `HETZNER_USER` | `root` |
   | `HETZNER_SSH_KEY` | Contents of `~/.ssh/clayworks-deploy` (private key) |
   | `DEPLOY_PATH` | `/opt/clayworks` |
   | `DOMAIN` | `app.yourdomain.com` |

---

## Optional: Security Hardening

> [!NOTE]
> This is **optional** and can be done later. Only proceed if you want to disable root SSH login.

### Create Deploy User with SSH Access

```bash
# On your LOCAL machine - generate deploy key
ssh-keygen -t ed25519 -C "deploy-user" -f ~/.ssh/clayworks-deploy

# Copy to server
ssh-copy-id -i ~/.ssh/clayworks-deploy.pub deploy@YOUR_SERVER_IP

# Test login (MUST work before proceeding!)
ssh -i ~/.ssh/clayworks-deploy deploy@YOUR_SERVER_IP
sudo whoami  # Should output: root
```

### Disable Root Login

Only run this AFTER confirming you can SSH as `deploy`:

```bash
ssh -i ~/.ssh/clayworks-deploy deploy@YOUR_SERVER_IP
sudo ./setup-server.sh --harden
```

This disables root SSH login. You can still `sudo su` to become root after logging in as `deploy`.

---

## Architecture

```
Internet
    ↓
Crowdsec WAF (blocks malicious IPs)
    ↓
Traefik (SSL termination, routing)
    ├── app.domain.com      → Next.js Frontend (port 3000)
    ├── api.domain.com      → Go Middleware (port 8080)
    └── cms.domain.com      → Strapi CMS (port 1337)
                                  ↓
                             PostgreSQL + Redis
```
