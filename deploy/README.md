# ClayWorks Hetzner Deployment Guide

Complete step-by-step guide to deploy ClayWorks on Hetzner CX52.

## Prerequisites

- ✅ Hetzner Cloud account with CX52 server
- ✅ Hostinger domain with DNS access
- ✅ GitHub repository with your code
- ✅ Local machine with SSH client and `openssl`

---

## Quick Reference

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
   - **Type**: CX52 (16 vCPU, 32 GB RAM)
   - **SSH Key**: Add your public key
4. **Note the server IP address** - you'll need this for DNS

---

## Step 2: Initial Server Setup

```bash
# SSH into server as root
ssh root@YOUR_SERVER_IP

# Download and run setup script
curl -O https://raw.githubusercontent.com/YOUR_REPO/main/deploy/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

**What this does:**
- Installs Docker & Docker Compose
- Configures firewall (UFW) - allows only SSH, HTTP, HTTPS
- Creates `deploy` user with Docker access
- Configures fail2ban for SSH protection
- Disables root SSH login

---

## Step 3: DNS Configuration (Hostinger)

1. Go to Hostinger → Domains → DNS Zone
2. **Add A records** pointing to your Hetzner server IP:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | app | YOUR_SERVER_IP | 3600 |
| A | cms.app | YOUR_SERVER_IP | 3600 |
| A | api.app | YOUR_SERVER_IP | 3600 |
| A | traefik.app | YOUR_SERVER_IP | 3600 |
| A | www.app | YOUR_SERVER_IP | 3600 |

⚠️ **Wait 5-30 minutes** for DNS propagation before proceeding.

**Verify DNS:**
```bash
dig app.yourdomain.com +short
# Should return your server IP
```

---

## Step 4: Generate SSH Key for GitHub Actions

```bash
# On your LOCAL machine (not the server)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/clayworks-deploy

# Copy public key to server
ssh-copy-id -i ~/.ssh/clayworks-deploy.pub deploy@YOUR_SERVER_IP

# Test connection
ssh -i ~/.ssh/clayworks-deploy deploy@YOUR_SERVER_IP
```

---

## Step 5: Clone Repository on Server

```bash
# SSH as deploy user
ssh deploy@YOUR_SERVER_IP

# Clone repository
git clone https://github.com/YOUR_ORG/clayworks.git /opt/clayworks
cd /opt/clayworks
```

---

## Step 6: Configure Environment Variables

```bash
cd /opt/clayworks

# Copy the example file
cp .env.production.example .env.production

# Edit the file
nano .env.production
```

### Required Variables

#### Domain Configuration
```env
# Your actual domain (without https://)
DOMAIN=app.yourdomain.com

# Email for Let's Encrypt SSL certificate notifications
# Use an email you monitor - only receives SSL expiry warnings
ACME_EMAIL=admin@yourcompany.com
```

#### Generate Secrets (run these commands locally)
```bash
# Generate each secret with:
openssl rand -base64 32

# Example output: K8x9mZ2pL5qR7sT1vW3yA6cE8gI0jM4nO
```

**Fill in these values:**
```env
POSTGRES_PASSWORD=<generated>
REDIS_PASSWORD=<generated>
APP_KEYS=<generated1>,<generated2>,<generated3>,<generated4>
ADMIN_JWT_SECRET=<generated>
API_TOKEN_SALT=<generated>
TRANSFER_TOKEN_SALT=<generated>
JWT_SECRET=<generated>
API_KEY=<generated>
```

#### Traefik Dashboard Auth
```bash
# Generate password hash (replace 'admin' and 'yourpassword')
htpasswd -nb admin yourpassword

# Output: admin:$apr1$xyz123$hashedpassword
# Double the $ signs for docker-compose:
# admin:$$apr1$$xyz123$$hashedpassword
```

```env
TRAEFIK_DASHBOARD_AUTH=admin:$$apr1$$xyz123$$hashedpassword
```

#### Leave Blank Initially (set after first deploy)
```env
# Generate after Strapi is running (Step 8)
STRAPI_API_TOKEN=

# Generate after Crowdsec is running (Step 9)
CROWDSEC_BOUNCER_KEY=
```

---

## Step 7: First Deployment

```bash
cd /opt/clayworks

# Build and start all services (this takes 10-15 minutes first time)
docker compose -f docker-compose.prod.yml up -d --build

# Watch logs (Ctrl+C to exit)
docker compose -f docker-compose.prod.yml logs -f

# Check all services are running
docker compose -f docker-compose.prod.yml ps
```

**Expected output:**
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

## Step 8: Create Strapi API Token (REQUIRED)

⚠️ **This step is MANUAL and REQUIRED for the site to work!**

1. **Open Strapi Admin:**
   ```
   https://cms.app.yourdomain.com/admin
   ```

2. **Create admin account** (first-time setup)
   - Email: your email
   - Password: strong password
   - First/Last name

3. **Create API Token:**
   - Go to: **Settings** → **API Tokens** → **Create new API Token**
   - Name: `Frontend Access`
   - Token type: **Full access**
   - Click **Save**
   - **Copy the token** (you won't see it again!)

4. **Add token to environment:**
   ```bash
   nano /opt/clayworks/.env.production
   
   # Add the token:
   STRAPI_API_TOKEN=your_copied_token_here
   ```

5. **Restart middleware:**
   ```bash
   docker compose -f docker-compose.prod.yml restart middleware
   ```

---

## Step 9: Configure Crowdsec Bouncer

```bash
# Generate bouncer API key
docker exec clayworks-crowdsec cscli bouncers add traefik-bouncer

# Copy the displayed key and add to .env.production:
nano /opt/clayworks/.env.production

# Add:
CROWDSEC_BOUNCER_KEY=your_generated_key_here

# Restart bouncer
docker compose -f docker-compose.prod.yml restart crowdsec-bouncer
```

---

## Step 10: Setup GitHub Actions CI/CD

Add these secrets to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value |
|-------------|-------|
| `HETZNER_HOST` | Your server IP (e.g., `65.108.xxx.xxx`) |
| `HETZNER_USER` | `deploy` |
| `HETZNER_SSH_KEY` | Contents of `~/.ssh/clayworks-deploy` (private key) |
| `DEPLOY_PATH` | `/opt/clayworks` |
| `DOMAIN` | `app.yourdomain.com` |

**To copy private key:**
```bash
cat ~/.ssh/clayworks-deploy
# Copy entire output including BEGIN and END lines
```

---

## Step 11: Verify Everything Works

### Check URLs
```bash
# Frontend
curl -I https://app.yourdomain.com

# API Health
curl https://api.app.yourdomain.com/health

# Strapi Health
curl https://cms.app.yourdomain.com/_health
```

### Check SSL Certificates
```bash
# Should show Let's Encrypt certificate
openssl s_client -connect app.yourdomain.com:443 -servername app.yourdomain.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer -dates
```

### Access Traefik Dashboard
```
https://traefik.app.yourdomain.com/dashboard/
# Username: admin
# Password: what you set in TRAEFIK_DASHBOARD_AUTH
```

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
# Check Traefik logs
docker logs clayworks-traefik

# Common issues:
# - DNS not propagated yet (wait longer)
# - Firewall blocking port 80/443
# - Rate limited by Let's Encrypt (wait 1 hour)
```

### Service Won't Start
```bash
# Check specific service logs
docker compose -f docker-compose.prod.yml logs SERVICE_NAME

# Check container status
docker compose -f docker-compose.prod.yml ps
```

### Check Environment Variables
```bash
docker compose -f docker-compose.prod.yml config
```

### Reset Everything
```bash
docker compose -f docker-compose.prod.yml down -v  # WARNING: Deletes all data!
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Security Checklist

- [ ] Changed all default passwords in `.env.production`
- [ ] Strapi API token created and added
- [ ] Crowdsec bouncer key generated and added
- [ ] Traefik dashboard has strong password
- [ ] SSH root login disabled
- [ ] UFW firewall enabled
- [ ] fail2ban running
- [ ] SSL certificates verified working

---

## Architecture Reference

```
Internet
    ↓
Crowdsec WAF (blocks malicious IPs)
    ↓
Traefik (SSL termination, routing)
    ├── app.domain.com → Next.js (port 3000)
    ├── api.domain.com → Go Middleware (port 8080)
    └── cms.domain.com → Strapi (port 1337)
                              ↓
                         PostgreSQL
```
