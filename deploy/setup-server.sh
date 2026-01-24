#!/bin/bash
# ClayWorks Hetzner Server Setup Script
# Run this on a fresh Ubuntu 22.04 Hetzner server
#
# USAGE:
#   Phase 1 (safe): ./setup-server.sh
#   Phase 2 (after SSH keys): ./setup-server.sh --harden

set -e

# Check if running hardening phase
if [ "$1" = "--harden" ]; then
    echo "=========================================="
    echo "ClayWorks Server Hardening (Phase 2)"
    echo "=========================================="
    
    # Safety check: Ensure deploy user has SSH keys before disabling root
    if [ ! -f /home/deploy/.ssh/authorized_keys ] || [ ! -s /home/deploy/.ssh/authorized_keys ]; then
        echo ""
        echo "❌ ERROR: No SSH keys found for deploy user!"
        echo ""
        echo "You MUST add your SSH public key before hardening:"
        echo "  1. On your LOCAL machine, run:"
        echo "     ssh-copy-id -i ~/.ssh/your_key.pub deploy@YOUR_SERVER_IP"
        echo "  2. Test that you can login as deploy:"
        echo "     ssh deploy@YOUR_SERVER_IP"
        echo "  3. Then run this script again with --harden"
        echo ""
        exit 1
    fi
    
    # Verify deploy user has sudo access
    if ! groups deploy | grep -q sudo; then
        echo "❌ ERROR: deploy user is not in sudo group!"
        echo "Run: usermod -aG sudo deploy"
        exit 1
    fi
    
    echo "✅ Deploy user has SSH keys configured"
    echo "✅ Deploy user has sudo access"
    echo ""
    echo ">>> Hardening SSH (disabling root login)..."
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
    systemctl restart sshd
    
    echo ""
    echo "=========================================="
    echo "✅ SSH Hardening Complete!"
    echo ""
    echo "Root login is now DISABLED."
    echo "Use: ssh deploy@YOUR_SERVER_IP"
    echo "=========================================="
    exit 0
fi

echo "=========================================="
echo "ClayWorks Server Setup (Phase 1)"
echo "=========================================="

# Update system
echo ">>> Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo ">>> Installing essential packages..."
apt install -y \
    curl \
    wget \
    git \
    htop \
    ufw \
    fail2ban \
    unzip \
    apache2-utils

# Install Docker
echo ">>> Installing Docker..."
curl -fsSL https://get.docker.com | sh

# Install Docker Compose plugin
echo ">>> Installing Docker Compose..."
apt install -y docker-compose-plugin

# Enable Docker service
systemctl enable docker
systemctl start docker

# Create deployment user
echo ">>> Creating deploy user..."
if id deploy &>/dev/null; then
    echo "Deploy user already exists, skipping..."
else
    useradd -m -s /bin/bash -G docker,sudo deploy
    echo "deploy ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/deploy
fi
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chown -R deploy:deploy /home/deploy/.ssh

# NOTE: SSH hardening is done separately with --harden flag
# This prevents lockouts if you forget to set up SSH keys first

# Configure firewall
echo ">>> Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Configure fail2ban
echo ">>> Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Create app directory
echo ">>> Creating app directory..."
mkdir -p /opt/clayworks
chown deploy:deploy /opt/clayworks

# Set up log rotation
echo ">>> Configuring log rotation..."
cat > /etc/logrotate.d/clayworks << 'EOF'
/opt/clayworks/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
}
EOF

echo "=========================================="
echo "✅ Phase 1 Complete!"
echo "=========================================="
echo ""
echo "⚠️  CRITICAL NEXT STEPS (in order!):"
echo ""
echo "1. ADD YOUR SSH KEY (from your LOCAL machine):"
echo "   ssh-copy-id -i ~/.ssh/your_key.pub deploy@YOUR_SERVER_IP"
echo ""
echo "2. TEST LOGIN as deploy user:"
echo "   ssh deploy@YOUR_SERVER_IP"
echo ""
echo "3. HARDEN SSH (disables root login - only after step 2 works!):"
echo "   sudo ./setup-server.sh --harden"
echo ""
echo "4. Clone the repo:"
echo "   git clone <REPO_URL> /opt/clayworks"
echo ""
echo "5. Configure and deploy:"
echo "   cp .env.production.example .env.production"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo "=========================================="
